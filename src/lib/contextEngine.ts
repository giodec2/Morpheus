import { estimateTokens, calculateBudget } from './tokenCounter';
import { COMPANION_SYSTEM_PROMPT } from './prompts/companion';
import { CONTINUITY_SYSTEM_PROMPT } from './prompts/continuity';
import { PLOT_WEAVER_SYSTEM_PROMPT } from './prompts/plotWeaver';
import { TWIST_FORGE_SYSTEM_PROMPT } from './prompts/twistForge';
import type { AIMode, Book, Chapter, Character, ChatMessage } from '@/types';

const MODE_PROMPTS: Record<AIMode, string> = {
  companion: COMPANION_SYSTEM_PROMPT,
  continuity: CONTINUITY_SYSTEM_PROMPT,
  plotWeaver: PLOT_WEAVER_SYSTEM_PROMPT,
  twistForge: TWIST_FORGE_SYSTEM_PROMPT,
};

const LANGUAGE_INSTRUCTIONS: Record<string, string> = {
  english: '',
  italian: 'IMPORTANTE: L\'autore scrive principalmente in italiano. Rispondi SEMPRE in italiano a meno che non ti venga esplicitamente richiesto diversamente. Mantieni il tono e lo stile naturali per la lingua italiana.',
};

function formatLoreBible(content: Record<string, unknown>): string {
  try {
    const text = extractTextFromTiptap(content);
    if (!text.trim()) return '';
    return `=== LORE BIBLE ===\n${text}\n=== END LORE BIBLE ===\n`;
  } catch {
    return '';
  }
}

function formatCharacterDossier(char: Character): string {
  const lines = [`[${char.name.toUpperCase()}]`];
  if (char.appearance) lines.push(`Appearance: ${char.appearance}`);
  if (char.personality) lines.push(`Personality: ${char.personality}`);
  if (char.notes) lines.push(`Notes: ${char.notes}`);
  if (char.relations.length > 0) {
    const rels = char.relations.map(r => `${r.targetName}: ${r.description}`).join('; ');
    lines.push(`Relations: ${rels}`);
  }
  return lines.join('\n') + '\n';
}

function formatChapterSummary(chapter: Chapter): string {
  const summary = chapter.summary.trim();
  if (!summary) return `Chapter ${chapter.order + 1} "${chapter.title}": [No summary yet]`;
  return `Chapter ${chapter.order + 1} "${chapter.title}": ${summary}`;
}

function extractTextFromTiptap(json: Record<string, unknown>): string {
  let text = '';
  function traverse(node: unknown) {
    if (typeof node !== 'object' || node === null) return;
    const n = node as Record<string, unknown>;
    if (n.type === 'text' && typeof n.text === 'string') {
      text += n.text + ' ';
    }
    if (Array.isArray(n.content)) {
      n.content.forEach(traverse);
    }
  }
  traverse(json);
  return text.trim();
}

export interface ContextPacket {
  system: string;
  messages: { role: 'user' | 'assistant' | 'system'; content: string }[];
  estimatedTokens: number;
  contextInfo: { characters: number; summaries: number; tokens: number };
}

export interface BuildContextParams {
  mode: AIMode;
  book: Book;
  currentChapter: Chapter;
  allChapters: Chapter[];
  allCharacters: Character[];
  loreBibleContent: Record<string, unknown>;
  userMessage: string;
  chatHistory: ChatMessage[];
  model: string;
  maxTokens: number;
  language?: 'english' | 'italian';
}

export function buildContextPacket(params: BuildContextParams): ContextPacket {
  const {
    mode,
    currentChapter,
    allChapters,
    allCharacters,
    loreBibleContent,
    userMessage,
    chatHistory,
    model,
    maxTokens,
    language = 'english',
  } = params;


  const budget = calculateBudget(model, maxTokens);
  let usedTokens = 0;

  // 1. System prompt + language instruction
  const langInstruction = LANGUAGE_INSTRUCTIONS[language] || '';
  const systemPrompt = langInstruction
    ? `${MODE_PROMPTS[mode]}\n\n${langInstruction}`
    : MODE_PROMPTS[mode];
  usedTokens += estimateTokens(systemPrompt);

  // 2. Lore Bible
  const loreText = formatLoreBible(loreBibleContent);
  if (loreText) usedTokens += estimateTokens(loreText);

  // 3. Character relevance scoring
  const currentChapterText = extractTextFromTiptap(currentChapter.content);
  const currentChapterTextLower = currentChapterText.toLowerCase();
  const userMessageLower = userMessage.toLowerCase();

  const scoredCharacters = allCharacters.map(char => {
    let score = 0;
    if (char.isPinned) score += 100;
    if (currentChapter.taggedCharacterIds.includes(char.id)) score += 50;
    if (currentChapterTextLower.includes(char.name.toLowerCase())) score += 30;
    if (userMessageLower.includes(char.name.toLowerCase())) score += 20;
    return { char, score };
  }).sort((a, b) => b.score - a.score);

  // Include characters until budget runs low
  const includedCharacters: Character[] = [];
  for (const { char } of scoredCharacters) {
    const charTokens = estimateTokens(formatCharacterDossier(char));
    if (usedTokens + charTokens < budget.availableForContext * 0.85 || char.isPinned) {
      includedCharacters.push(char);
      usedTokens += charTokens;
    }
  }

  const characterText = includedCharacters.length > 0
    ? '=== CHARACTERS ===\n' + includedCharacters.map(formatCharacterDossier).join('\n') + '=== END CHARACTERS ===\n'
    : '';

  // 4. Previous chapter summaries
  const otherChapters = allChapters.filter(c => c.id !== currentChapter.id).sort((a, b) => a.order - b.order);
  const summariesText = otherChapters.length > 0
    ? '=== PREVIOUS CHAPTERS ===\n' + otherChapters.map(formatChapterSummary).join('\n\n') + '\n=== END PREVIOUS CHAPTERS ===\n'
    : '';
  usedTokens += estimateTokens(summariesText);

  // 5. Current chapter (full or truncated)
  let currentChapterText_full = `=== CURRENT CHAPTER: ${currentChapter.title} ===\n${currentChapterText}\n=== END CURRENT CHAPTER ===\n`;
  let currentChapterTokens = estimateTokens(currentChapterText_full);

  // If over budget, truncate from the top
  if (usedTokens + currentChapterTokens > budget.availableForContext) {
    const remainingBudget = budget.availableForContext - usedTokens;
    const words = currentChapterText.split(/\s+/);
    let truncatedText = '';
    let tokenCount = estimateTokens(`=== CURRENT CHAPTER: ${currentChapter.title} ===\n`);

    // Try to fit from the end backward
    for (let i = words.length - 1; i >= 0; i--) {
      const testText = words.slice(i).join(' ');
      const testTokens = estimateTokens(testText + '\n=== END CURRENT CHAPTER ===\n');
      if (tokenCount + testTokens <= remainingBudget * 0.9) {
        truncatedText = testText;
        break;
      }
    }

    if (truncatedText) {
      currentChapterText_full = `=== CURRENT CHAPTER: ${currentChapter.title} ===\n[... earlier text omitted ...]\n\n${truncatedText}\n=== END CURRENT CHAPTER ===\n`;
      currentChapterTokens = estimateTokens(currentChapterText_full);
    }
  }
  usedTokens += currentChapterTokens;

  // 6. Chat history (recent messages only)
  const recentHistory = chatHistory.slice(-10);
  let historyTokens = 0;
  const historyMessages: { role: 'user' | 'assistant' | 'system'; content: string }[] = [];

  for (let i = recentHistory.length - 1; i >= 0; i--) {
    const msg = recentHistory[i];
    const msgTokens = estimateTokens(msg.content);
    if (usedTokens + historyTokens + msgTokens < budget.availableForContext) {
      historyMessages.unshift({ role: msg.role, content: msg.content });
      historyTokens += msgTokens;
    } else {
      break;
    }
  }
  usedTokens += historyTokens;

  // 7. User message
  usedTokens += estimateTokens(userMessage);

  // Assemble context
  const contextParts = [
    loreText,
    characterText,
    summariesText,
    currentChapterText_full,
  ].filter(Boolean);

  const fullSystem = `${systemPrompt}\n\n${contextParts.join('\n')}`;

  const messages: { role: 'user' | 'assistant' | 'system'; content: string }[] = [
    ...historyMessages,
    { role: 'user', content: userMessage },
  ];

  return {
    system: fullSystem,
    messages,
    estimatedTokens: usedTokens,
    contextInfo: {
      characters: includedCharacters.length,
      summaries: otherChapters.filter(c => c.summary.trim()).length,
      tokens: usedTokens,
    },
  };
}

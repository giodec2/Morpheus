import { estimateTokens, calculateBudget } from './tokenCounter';
import { COMPANION_SYSTEM_PROMPT } from './prompts/companion';
import { CONTINUITY_SYSTEM_PROMPT } from './prompts/continuity';
import { PLOT_WEAVER_SYSTEM_PROMPT } from './prompts/plotWeaver';
import { TWIST_FORGE_SYSTEM_PROMPT } from './prompts/twistForge';
import { GENRE_PROMPTS } from './prompts/genres';
import { buildStyleProfileInjection } from './prompts/adaptiveMemory';
import type { AIMode, Book, Chapter, Character, ChatMessage, Language, WritingGenre } from '@/types';

const MODE_PROMPTS: Record<AIMode, string> = {
  companion: COMPANION_SYSTEM_PROMPT,
  continuity: CONTINUITY_SYSTEM_PROMPT,
  plotWeaver: PLOT_WEAVER_SYSTEM_PROMPT,
  twistForge: TWIST_FORGE_SYSTEM_PROMPT,
};

const LANGUAGE_INSTRUCTIONS: Record<Language, string> = {
  english: '',
  italian: "IMPORTANTE: L'autore scrive principalmente in italiano. Rispondi SEMPRE in italiano a meno che non ti venga esplicitamente richiesto diversamente. Mantieni il tono e lo stile naturali per la lingua italiana.",
  german: 'WICHTIG: Der Autor schreibt hauptsächlich auf Deutsch. Antworte IMMER auf Deutsch, es sei denn, es wird ausdrücklich etwas anderes verlangt. Halte einen natürlichen Ton und Stil für die deutsche Sprache bei.',
  french: 'IMPORTANT : L\'auteur écrit principalement en français. Réponds TOUJOURS en français, sauf demande explicite contraire. Maintiens un ton et un style naturels pour la langue française.',
  spanish: 'IMPORTANTE: El autor escribe principalmente en español. Responde SIEMPRE en español a menos que se te solicite explícitamente lo contrario. Mantén un tono y estilo naturales para el idioma español.',
  portuguese: 'IMPORTANTE: O autor escreve principalmente em português. Responda SEMPRE em português, a menos que seja explicitamente solicitado o contrário. Mantenha o tom e o estilo naturais para a língua portuguesa.',
  dutch: 'BELANGRIJK: De auteur schrijft voornamelijk in het Nederlands. Beantwoord ALTIJD in het Nederlands, tenzij er expliciet om iets anders wordt gevraagd. Houd een natuurlijke toon en stijl aan voor de Nederlandse taal.',
  russian: 'ВАЖНО: Автор пишет преимущественно на русском языке. Отвечай ВСЕГДА на русском языке, если явно не просят иначе. Сохраняй естественный тон и стиль для русского языка.',
  chinese: '重要：作者主要使用中文写作。除非明确要求，否则始终用中文回复。保持中文的自然语气和风格。',
  japanese: '重要：作者は主に日本語で執筆しています。明示的に異なる言語が求められない限り、常に日本語で返答してください。日本語の自然なトーンとスタイルを保ってください。',
  korean: '중요: 작가는 주로 한국어로 글을 씁니다. 명시적으로 다른 언어를 요청하지 않는 한 항상 한국어로 답변하세요. 한국어의 자연스러운 톤과 스타일을 유지하세요.',
  polish: 'WAŻNE: Autor pisze głównie po polsku. Odpowiadaj ZAWSZE po polsku, chyba że zostanie to wyraźnie zmienione. Zachowaj naturalny ton i styl dla języka polskiego.',
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
  genre: WritingGenre;
  styleProfile?: string;
  book: Book;
  currentChapter: Chapter;
  allChapters: Chapter[];
  allCharacters: Character[];
  loreBibleContent: Record<string, unknown>;
  userMessage: string;
  chatHistory: ChatMessage[];
  model: string;
  maxTokens: number;
  language?: Language;
}

export function buildContextPacket(params: BuildContextParams): ContextPacket {
  const {
    mode,
    genre,
    styleProfile,
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

  // 1. System prompt + genre instruction + style profile + language instruction
  const langInstruction = LANGUAGE_INSTRUCTIONS[language] || '';
  const genreInstruction = genre !== 'general' ? GENRE_PROMPTS[genre] : '';
  const styleInstruction = styleProfile ? buildStyleProfileInjection(styleProfile) : '';
  const systemPrompt = [MODE_PROMPTS[mode], genreInstruction, styleInstruction, langInstruction]
    .filter(Boolean)
    .join('\n\n');
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

  // 6. Chat history (bounded by token budget AND max message count)
  const MAX_HISTORY_MESSAGES = 5;
  let historyTokens = 0;
  const historyMessages: { role: 'user' | 'assistant' | 'system'; content: string }[] = [];

  // Walk backward from most recent message until budget or message limit is exhausted
  for (let i = chatHistory.length - 1; i >= 0; i--) {
    const msg = chatHistory[i];
    const msgTokens = estimateTokens(msg.content);
    if (
      usedTokens + historyTokens + msgTokens < budget.availableForContext &&
      historyMessages.length < MAX_HISTORY_MESSAGES
    ) {
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

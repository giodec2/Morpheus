/**
 * Client-side full-text search engine for book content.
 * Indexes chapters, characters, and lore bible for fast querying.
 */

import { extractTextFromContent } from './tiptap';
import type { Chapter, Character, LoreBible } from '@/types';

export type SearchResultType = 'chapter' | 'character' | 'lore';

export interface SearchDocument {
  id: string;
  type: SearchResultType;
  title: string;
  text: string;
  field?: string; // for characters: which field matched
  entityId: string; // chapterId / characterId / loreBibleId
}

export interface SearchMatch {
  start: number;
  end: number;
}

export interface SearchResult {
  document: SearchDocument;
  score: number;
  matches: SearchMatch[];
  snippet: string;
}

const FIELD_WEIGHTS: Record<string, number> = {
  title: 10,
  name: 10,
  content: 4,
  appearance: 2,
  personality: 2,
  notes: 1,
  lore: 2,
};

const TYPE_ORDER: SearchResultType[] = ['chapter', 'character', 'lore'];

function findMatches(text: string, queryWords: string[]): SearchMatch[] {
  const matches: SearchMatch[] = [];
  const lower = text.toLowerCase();

  for (const word of queryWords) {
    let idx = lower.indexOf(word);
    while (idx !== -1) {
      matches.push({ start: idx, end: idx + word.length });
      idx = lower.indexOf(word, idx + 1);
    }
  }

  // Sort and deduplicate overlapping matches
  matches.sort((a, b) => a.start - b.start);
  const deduped: SearchMatch[] = [];
  for (const m of matches) {
    const last = deduped[deduped.length - 1];
    if (last && m.start < last.end) {
      last.end = Math.max(last.end, m.end);
    } else {
      deduped.push({ ...m });
    }
  }
  return deduped;
}

function buildSnippet(text: string, matches: SearchMatch[], maxLen = 140): string {
  if (matches.length === 0) return text.slice(0, maxLen) + (text.length > maxLen ? '...' : '');

  const bestMatch = matches[0];
  const center = Math.floor((bestMatch.start + bestMatch.end) / 2);
  let start = Math.max(0, center - Math.floor(maxLen / 2));
  let end = Math.min(text.length, start + maxLen);

  // Adjust if we're at the end
  if (end - start < maxLen) {
    start = Math.max(0, end - maxLen);
  }

  let snippet = text.slice(start, end);
  let prefix = start > 0 ? '...' : '';
  let suffix = end < text.length ? '...' : '';

  // Adjust match positions for snippet slicing
  const adjustedMatches = matches
    .map((m) => ({ start: m.start - start, end: m.end - start }))
    .filter((m) => m.end > 0 && m.start < snippet.length);

  // Build snippet with mark tags — work backwards to preserve indices
  let highlighted = snippet;
  for (let i = adjustedMatches.length - 1; i >= 0; i--) {
    const m = adjustedMatches[i];
    const s = Math.max(0, m.start);
    const e = Math.min(snippet.length, m.end);
    highlighted =
      highlighted.slice(0, s) +
      `<mark>${highlighted.slice(s, e)}</mark>` +
      highlighted.slice(e);
  }

  return prefix + highlighted + suffix;
}

function safeExtractText(content: unknown): string {
  if (!content) return '';
  // Handle case where content might be a JSON string
  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content);
      return extractTextFromContent(parsed, { addSpaces: true });
    } catch {
      return content;
    }
  }
  if (typeof content === 'object') {
    return extractTextFromContent(content as Record<string, unknown>, { addSpaces: true });
  }
  return '';
}

export function buildSearchIndex(
  chapters: Chapter[],
  characters: Character[],
  loreBible: LoreBible | null
): SearchDocument[] {
  const docs: SearchDocument[] = [];

  // Index chapters
  for (const ch of chapters) {
    const text = safeExtractText(ch.content);
    docs.push({
      id: `ch-title-${ch.id}`,
      type: 'chapter',
      title: ch.title,
      text: ch.title,
      field: 'title',
      entityId: ch.id,
    });
    if (text.trim()) {
      docs.push({
        id: `ch-body-${ch.id}`,
        type: 'chapter',
        title: ch.title,
        text,
        field: 'content',
        entityId: ch.id,
      });
    }
  }

  // Index characters
  for (const char of characters) {
    const fields: { key: string; text: string }[] = [
      { key: 'name', text: char.name },
      { key: 'appearance', text: char.appearance || '' },
      { key: 'personality', text: char.personality || '' },
      { key: 'notes', text: char.notes || '' },
    ];
    for (const f of fields) {
      if (f.text.trim()) {
        docs.push({
          id: `char-${f.key}-${char.id}`,
          type: 'character',
          title: char.name,
          text: f.text,
          field: f.key,
          entityId: char.id,
        });
      }
    }
  }

  // Index lore bible
  if (loreBible) {
    const text = extractTextFromContent(loreBible.content, { addSpaces: true });
    if (text.trim()) {
      docs.push({
        id: `lore-${loreBible.id}`,
        type: 'lore',
        title: 'Lore Bible',
        text,
        field: 'lore',
        entityId: loreBible.id,
      });
    }
  }

  return docs;
}

export function searchIndex(
  index: SearchDocument[],
  query: string
): SearchResult[] {
  const rawQuery = query.trim().toLowerCase();
  if (rawQuery.length < 2) return [];

  const queryWords = rawQuery.split(/\s+/).filter((w) => w.length >= 2);
  if (queryWords.length === 0) return [];

  const results: SearchResult[] = [];

  for (const doc of index) {
    const textLower = doc.text.toLowerCase();

    // Check if any query word matches
    let totalMatches = 0;
    const allMatches: SearchMatch[] = [];

    for (const word of queryWords) {
      const matches = findMatches(doc.text, [word]);
      totalMatches += matches.length;
      allMatches.push(...matches);
    }

    if (totalMatches === 0) continue;

    // Score: weighted by field, number of matches, and title proximity
    const fieldWeight = FIELD_WEIGHTS[doc.field || 'content'] || 1;
    const matchScore = totalMatches * fieldWeight;

    // Bonus for exact phrase match
    const exactPhraseBonus = textLower.includes(rawQuery) ? 5 : 0;

    // Bonus for title/name field
    const isTitleField = doc.field === 'title' || doc.field === 'name';
    const titleBonus = isTitleField ? 3 : 0;

    const score = matchScore + exactPhraseBonus + titleBonus;

    // Deduplicate overlapping matches for snippet
    const dedupedMatches = allMatches
      .sort((a, b) => a.start - b.start)
      .reduce<SearchMatch[]>((acc, m) => {
        const last = acc[acc.length - 1];
        if (last && m.start <= last.end) {
          last.end = Math.max(last.end, m.end);
        } else {
          acc.push({ ...m });
        }
        return acc;
      }, []);

    results.push({
      document: doc,
      score,
      matches: dedupedMatches,
      snippet: buildSnippet(doc.text, dedupedMatches),
    });
  }

  // Sort by score descending, then by type order, then by title
  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const typeDiff = TYPE_ORDER.indexOf(a.document.type) - TYPE_ORDER.indexOf(b.document.type);
    if (typeDiff !== 0) return typeDiff;
    return a.document.title.localeCompare(b.document.title);
  });

  return results;
}

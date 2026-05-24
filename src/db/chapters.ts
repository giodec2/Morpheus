import { db } from './database';
import type { Chapter } from '@/types';
import { pushChapter, deleteChapterCloud } from '@/services/sync';

export async function getChaptersByBook(bookId: string): Promise<Chapter[]> {
  return db.chapters.where('bookId').equals(bookId).sortBy('order');
}

export async function getChapter(id: string): Promise<Chapter | undefined> {
  return db.chapters.get(id);
}

export async function putChapter(chapter: Chapter): Promise<void> {
  await db.chapters.put(chapter);
}

export async function createChapter(bookId: string, title: string, order: number): Promise<Chapter> {
  const now = Date.now();
  const chapter: Chapter = {
    id: crypto.randomUUID(),
    bookId,
    title,
    order,
    content: { type: 'doc', content: [{ type: 'paragraph' }] },
    summary: '',
    summaryPreparedAt: null,
    taggedCharacterIds: [],
    createdAt: now,
    updatedAt: now,
  };
  await db.chapters.add(chapter);
  pushChapter(chapter).catch(() => {});
  return chapter;
}

export async function updateChapter(id: string, updates: Partial<Chapter>): Promise<void> {
  await db.chapters.update(id, { ...updates, updatedAt: Date.now() });
  const chapter = await db.chapters.get(id);
  if (chapter) pushChapter(chapter).catch(() => {});
}

export async function deleteChapter(id: string): Promise<void> {
  await db.chapters.delete(id);
  deleteChapterCloud(id).catch(() => {});
}

export async function reorderChapters(_bookId: string, chapterIds: string[]): Promise<void> {
  await db.transaction('rw', db.chapters, async () => {
    for (let i = 0; i < chapterIds.length; i++) {
      await db.chapters.update(chapterIds[i], { order: i });
    }
  });
  // Push reordered chapters to cloud
  for (let i = 0; i < chapterIds.length; i++) {
    const chapter = await db.chapters.get(chapterIds[i]);
    if (chapter) pushChapter(chapter).catch(() => {});
  }
}

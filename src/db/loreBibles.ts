import { db } from './database';
import type { LoreBible } from '@/types';
import { pushLoreBible } from '@/services/sync';

export async function getLoreBibleByBook(bookId: string): Promise<LoreBible | undefined> {
  return db.loreBibles.where('bookId').equals(bookId).first();
}

export async function putLoreBible(lore: LoreBible): Promise<void> {
  await db.loreBibles.put(lore);
}

export async function createLoreBible(bookId: string): Promise<LoreBible> {
  const now = Date.now();
  const lore: LoreBible = {
    id: crypto.randomUUID(),
    bookId,
    content: { type: 'doc', content: [{ type: 'paragraph' }] },
    updatedAt: now,
  };
  await db.loreBibles.add(lore);
  pushLoreBible(lore).catch(() => {});
  return lore;
}

export async function updateLoreBible(id: string, updates: Partial<LoreBible>): Promise<void> {
  await db.loreBibles.update(id, { ...updates, updatedAt: Date.now() });
  const lore = await db.loreBibles.get(id);
  if (lore) pushLoreBible(lore).catch(() => {});
}

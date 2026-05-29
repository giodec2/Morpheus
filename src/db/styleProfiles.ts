import { db } from './database';
import type { StyleProfile } from '@/types';

export async function getStyleProfile(bookId: string): Promise<StyleProfile | undefined> {
  return db.styleProfiles.get(bookId);
}

export async function setStyleProfile(bookId: string, content: string): Promise<void> {
  const profile: StyleProfile = {
    bookId,
    content,
    updatedAt: Date.now(),
  };
  await db.styleProfiles.put(profile);
}

export async function putStyleProfile(profile: StyleProfile): Promise<void> {
  await db.styleProfiles.put(profile);
}

export async function deleteStyleProfile(bookId: string): Promise<void> {
  await db.styleProfiles.delete(bookId);
}

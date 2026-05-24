import { db } from './database';
import type { Character } from '@/types';
import { pushCharacter, deleteCharacterCloud } from '@/services/sync';

export async function getCharactersByBook(bookId: string): Promise<Character[]> {
  return db.characters.where('bookId').equals(bookId).sortBy('name');
}

export async function getCharacter(id: string): Promise<Character | undefined> {
  return db.characters.get(id);
}

export async function putCharacter(character: Character): Promise<void> {
  await db.characters.put(character);
}

export async function createCharacter(bookId: string, name: string): Promise<Character> {
  const now = Date.now();
  const character: Character = {
    id: crypto.randomUUID(),
    bookId,
    name,
    appearance: '',
    personality: '',
    notes: '',
    isPinned: false,
    relations: [],
    updatedAt: now,
  };
  await db.characters.add(character);
  pushCharacter(character).catch(() => {});
  return character;
}

export async function updateCharacter(id: string, updates: Partial<Character>): Promise<void> {
  await db.characters.update(id, { ...updates, updatedAt: Date.now() });
  const character = await db.characters.get(id);
  if (character) pushCharacter(character).catch(() => {});
}

export async function deleteCharacter(id: string): Promise<void> {
  const char = await db.characters.get(id);
  if (!char) return;

  await db.transaction('rw', db.characters, db.chapters, async () => {
    // Remove this character from all chapter tags
    const chapters = await db.chapters.where('bookId').equals(char.bookId).toArray();
    for (const chapter of chapters) {
      if (chapter.taggedCharacterIds.includes(id)) {
        await db.chapters.update(chapter.id, {
          taggedCharacterIds: chapter.taggedCharacterIds.filter(cid => cid !== id),
        });
      }
    }

    // Remove relations pointing to this character from other characters
    const allChars = await db.characters.where('bookId').equals(char.bookId).toArray();
    for (const other of allChars) {
      if (other.relations.some(r => r.targetId === id)) {
        await db.characters.update(other.id, {
          relations: other.relations.filter(r => r.targetId !== id),
        });
      }
    }

    await db.characters.delete(id);
  });
  deleteCharacterCloud(id).catch(() => {});
}

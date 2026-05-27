import Dexie, { type EntityTable } from 'dexie';
import type { Book, Chapter, Character, LoreBible, ChatMessage, ChatSession, AppSettings, StyleProfile } from '@/types';

const db = new Dexie('MorpheusDB') as Dexie & {
  books: EntityTable<Book, 'id'>;
  chapters: EntityTable<Chapter, 'id'>;
  characters: EntityTable<Character, 'id'>;
  loreBibles: EntityTable<LoreBible, 'id'>;
  chatHistory: EntityTable<ChatMessage, 'id'>;
  chatSessions: EntityTable<ChatSession, 'id'>;
  styleProfiles: EntityTable<StyleProfile, 'bookId'>;
  settings: EntityTable<AppSettings, 'id'>;
};

db.version(1).stores({
  books: 'id, title, updatedAt',
  chapters: 'id, bookId, order, updatedAt',
  characters: 'id, bookId, name',
  loreBibles: 'id, bookId',
  chatHistory: 'id, bookId, timestamp',
  settings: 'id',
});

db.version(2).stores({
  books: 'id, title, updatedAt',
  chapters: 'id, bookId, order, updatedAt',
  characters: 'id, bookId, name',
  loreBibles: 'id, bookId',
  chatHistory: 'id, bookId, sessionId, timestamp',
  chatSessions: 'id, bookId, updatedAt',
  settings: 'id',
}).upgrade(async (tx) => {
  // Migrate existing chat messages to default sessions per book
  const messages: any[] = await tx.table('chatHistory').toArray();
  const bookIds = [...new Set(messages.map((m) => m.bookId))];
  for (const bookId of bookIds) {
    const sessionId = crypto.randomUUID();
    await tx.table('chatSessions').add({
      id: sessionId,
      bookId,
      title: 'Chat',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    await tx.table('chatHistory').where('bookId').equals(bookId).modify((m: any) => {
      m.sessionId = sessionId;
    });
  }
});

// Version 3: added genre field to ChatMessage (no index changes needed)
db.version(3).stores({
  books: 'id, title, updatedAt',
  chapters: 'id, bookId, order, updatedAt',
  characters: 'id, bookId, name',
  loreBibles: 'id, bookId',
  chatHistory: 'id, bookId, sessionId, timestamp',
  chatSessions: 'id, bookId, updatedAt',
  settings: 'id',
}).upgrade(async (tx) => {
  // Backfill existing messages with default genre
  await tx.table('chatHistory').toCollection().modify((m: any) => {
    if (!m.genre) m.genre = 'general';
  });
});

// Version 4: added styleProfiles table for Echo (adaptive memory)
db.version(4).stores({
  books: 'id, title, updatedAt',
  chapters: 'id, bookId, order, updatedAt',
  characters: 'id, bookId, name',
  loreBibles: 'id, bookId',
  chatHistory: 'id, bookId, sessionId, timestamp',
  chatSessions: 'id, bookId, updatedAt',
  styleProfiles: 'bookId',
  settings: 'id',
});

export { db };

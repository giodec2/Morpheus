import { db } from './database';
import { generateId } from '@/lib/utils';
import type { Book } from '@/types';
import { pushBook, deleteBookCloud } from '@/services/sync';

export async function getAllBooks(): Promise<Book[]> {
  return db.books.orderBy('updatedAt').reverse().toArray();
}

export async function getBook(id: string): Promise<Book | undefined> {
  return db.books.get(id);
}

export async function putBook(book: Book): Promise<void> {
  await db.books.put(book);
}

export async function createBook(title: string): Promise<Book> {
  const now = Date.now();
  const book: Book = {
    id: generateId(),
    title,
    createdAt: now,
    updatedAt: now,
  };
  await db.books.add(book);
  pushBook(book).catch(() => {});
  return book;
}

export async function updateBook(id: string, updates: Partial<Book>): Promise<void> {
  await db.books.update(id, { ...updates, updatedAt: Date.now() });
  const book = await db.books.get(id);
  if (book) pushBook(book).catch(() => {});
}

export async function deleteBook(id: string): Promise<void> {
  await db.transaction('rw', [db.books, db.chapters, db.characters, db.loreBibles, db.chatHistory, db.chatSessions, db.styleProfiles], async () => {
    await db.books.delete(id);
    await db.chapters.where('bookId').equals(id).delete();
    await db.characters.where('bookId').equals(id).delete();
    await db.loreBibles.where('bookId').equals(id).delete();
    await db.chatHistory.where('bookId').equals(id).delete();
    await db.chatSessions.where('bookId').equals(id).delete();
    await db.styleProfiles.where('bookId').equals(id).delete();
  });
  deleteBookCloud(id).catch(() => {});
}

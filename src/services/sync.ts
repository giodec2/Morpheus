import { databases, appwriteConfig, userPermissions } from '@/lib/appwrite';
import { useAuthStore } from '@/stores/authStore';
import { Query } from 'appwrite';
import { getBook } from '@/db/books';
import { getChaptersByBook } from '@/db/chapters';
import { getCharactersByBook } from '@/db/characters';
import { getLoreBibleByBook } from '@/db/loreBibles';
import type { Book, Chapter, Character, LoreBible } from '@/types';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getUserId(): string | null {
  return useAuthStore.getState().user?.$id ?? null;
}

function isConfigured(): boolean {
  return !!(appwriteConfig.endpoint && appwriteConfig.projectId);
}

function logSyncError(action: string, err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`[Appwrite Sync] ${action} failed:`, message);
}

/* Appwrite stores JSON blobs as strings */
function toJsonString(value: unknown): string {
  return JSON.stringify(value);
}
function fromJsonString<T>(value: string | undefined): T {
  if (!value) return {} as T;
  try {
    return JSON.parse(value) as T;
  } catch {
    return {} as T;
  }
}

/* ------------------------------------------------------------------ */
/*  PUSH  – local → cloud                                              */
/* ------------------------------------------------------------------ */

export async function pushBook(book: Book): Promise<void> {
  const userId = getUserId();
  if (!userId || !isConfigured()) return;

  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.books,
      book.id,
      {
        title: book.title,
        updatedAt: book.updatedAt,
      }
    );
  } catch {
    // Document may not exist yet — create it
    try {
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.books,
        book.id,
        {
          userId,
          title: book.title,
          createdAt: book.createdAt,
          updatedAt: book.updatedAt,
        },
        userPermissions(userId)
      );
    } catch (err) {
      logSyncError('pushBook', err);
    }
  }
}

export async function deleteBookCloud(bookId: string): Promise<void> {
  if (!getUserId() || !isConfigured()) return;
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.books,
      bookId
    );
  } catch (err) {
    logSyncError('deleteBookCloud', err);
  }
}

async function pushBookById(bookId: string): Promise<void> {
  const book = await getBook(bookId);
  if (book) await pushBook(book);
}

export async function pushChapter(chapter: Chapter): Promise<void> {
  const userId = getUserId();
  if (!userId || !isConfigured()) return;

  // Ensure parent book exists in cloud before pushing chapter
  await pushBookById(chapter.bookId);

  const payload = {
    userId,
    bookId: chapter.bookId,
    title: chapter.title,
    order: chapter.order,
    content: toJsonString(chapter.content),
    summary: chapter.summary,
    summaryPreparedAt: chapter.summaryPreparedAt,
    taggedCharacterIds: toJsonString(chapter.taggedCharacterIds),
    createdAt: chapter.createdAt,
    updatedAt: chapter.updatedAt,
  };

  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.chapters,
      chapter.id,
      payload
    );
  } catch {
    try {
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.chapters,
        chapter.id,
        payload,
        userPermissions(userId)
      );
    } catch (err) {
      logSyncError('pushChapter', err);
    }
  }
}

export async function deleteChapterCloud(chapterId: string): Promise<void> {
  if (!getUserId() || !isConfigured()) return;
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.chapters,
      chapterId
    );
  } catch (err) {
    logSyncError('deleteChapterCloud', err);
  }
}

export async function pushCharacter(character: Character): Promise<void> {
  const userId = getUserId();
  if (!userId || !isConfigured()) return;

  // Ensure parent book exists in cloud before pushing character
  await pushBookById(character.bookId);

  const payload = {
    userId,
    bookId: character.bookId,
    name: character.name,
    appearance: character.appearance,
    personality: character.personality,
    notes: character.notes,
    isPinned: character.isPinned,
    relations: toJsonString(character.relations),
    updatedAt: character.updatedAt || Date.now(),
  };

  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.characters,
      character.id,
      payload
    );
  } catch {
    try {
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.characters,
        character.id,
        payload,
        userPermissions(userId)
      );
    } catch (err) {
      logSyncError('pushCharacter', err);
    }
  }
}

export async function deleteCharacterCloud(characterId: string): Promise<void> {
  if (!getUserId() || !isConfigured()) return;
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.characters,
      characterId
    );
  } catch (err) {
    logSyncError('deleteCharacterCloud', err);
  }
}

export async function pushLoreBible(lore: LoreBible): Promise<void> {
  const userId = getUserId();
  if (!userId || !isConfigured()) return;

  // Ensure parent book exists in cloud before pushing lore
  await pushBookById(lore.bookId);

  const payload = {
    userId,
    bookId: lore.bookId,
    content: toJsonString(lore.content),
    updatedAt: lore.updatedAt || Date.now(),
  };

  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.loreBibles,
      lore.id,
      payload
    );
  } catch {
    try {
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.loreBibles,
        lore.id,
        payload,
        userPermissions(userId)
      );
    } catch (err) {
      logSyncError('pushLoreBible', err);
    }
  }
}

/* ------------------------------------------------------------------ */
/*  PULL  – cloud → local                                              */
/* ------------------------------------------------------------------ */

export async function pullAllBooks(): Promise<Book[]> {
  const userId = getUserId();
  if (!userId || !isConfigured()) return [];

  try {
    const { documents } = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.books,
      [Query.equal('userId', userId), Query.orderDesc('updatedAt')]
    );

    return documents.map((d) => ({
      id: d.$id,
      title: d.title,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    }));
  } catch (err) {
    logSyncError('pullAllBooks', err);
    return [];
  }
}

export async function pullChaptersForBook(bookId: string): Promise<Chapter[]> {
  const userId = getUserId();
  if (!userId || !isConfigured()) return [];

  try {
    const { documents } = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.chapters,
      [Query.equal('bookId', bookId), Query.orderAsc('order')]
    );

    return documents.map((d) => ({
      id: d.$id,
      bookId: d.bookId,
      title: d.title,
      order: d.order,
      content: fromJsonString<Record<string, unknown>>(d.content),
      summary: d.summary,
      summaryPreparedAt: d.summaryPreparedAt,
      taggedCharacterIds: fromJsonString<string[]>(d.taggedCharacterIds),
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    }));
  } catch (err) {
    logSyncError('pullChaptersForBook', err);
    return [];
  }
}

export async function pullCharactersForBook(bookId: string): Promise<Character[]> {
  const userId = getUserId();
  if (!userId || !isConfigured()) return [];

  try {
    const { documents } = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.characters,
      [Query.equal('bookId', bookId)]
    );

    return documents.map((d) => ({
      id: d.$id,
      bookId: d.bookId,
      name: d.name,
      appearance: d.appearance,
      personality: d.personality,
      notes: d.notes,
      isPinned: d.isPinned,
      relations: fromJsonString<Character['relations']>(d.relations),
      updatedAt: d.updatedAt,
    }));
  } catch (err) {
    logSyncError('pullCharactersForBook', err);
    return [];
  }
}

export async function pullLoreBibleForBook(bookId: string): Promise<LoreBible | null> {
  const userId = getUserId();
  if (!userId || !isConfigured()) return null;

  try {
    const { documents } = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.loreBibles,
      [Query.equal('bookId', bookId)]
    );

    if (documents.length === 0) return null;
    const d = documents[0];
    return {
      id: d.$id,
      bookId: d.bookId,
      content: fromJsonString<Record<string, unknown>>(d.content),
      updatedAt: d.updatedAt,
    };
  } catch (err) {
    logSyncError('pullLoreBibleForBook', err);
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  BIDIRECTIONAL SYNC                                                 */
/* ------------------------------------------------------------------ */

export async function syncToCloud(localBooks: Book[]): Promise<void> {
  const { setIsSyncing } = useAuthStore.getState();
  if (!isConfigured()) return;

  setIsSyncing(true);
  try {
    for (const book of localBooks) {
      await pushBook(book);
      const [chapters, characters, lore] = await Promise.all([
        getChaptersByBook(book.id),
        getCharactersByBook(book.id),
        getLoreBibleByBook(book.id),
      ]);
      for (const ch of chapters) await pushChapter(ch);
      for (const c of characters) await pushCharacter(c);
      if (lore) await pushLoreBible(lore);
    }
  } finally {
    setIsSyncing(false);
  }
}

export async function syncFromCloud(
  localBooks: Book[],
  putBook: (b: Book) => Promise<void>,
  putChapter: (c: Chapter) => Promise<void>,
  putCharacter: (c: Character) => Promise<void>,
  putLore: (l: LoreBible) => Promise<void>
): Promise<void> {
  const { setIsSyncing, setLastSyncAt } = useAuthStore.getState();
  if (!isConfigured()) return;

  setIsSyncing(true);
  try {
    const cloudBooks = await pullAllBooks();

    for (const cloudBook of cloudBooks) {
      const local = localBooks.find((b) => b.id === cloudBook.id);
      const bookToSave = !local || cloudBook.updatedAt >= local.updatedAt ? cloudBook : local;
      await putBook(bookToSave);

      const [cloudChapters, cloudChars, cloudLore] = await Promise.all([
        pullChaptersForBook(cloudBook.id),
        pullCharactersForBook(cloudBook.id),
        pullLoreBibleForBook(cloudBook.id),
      ]);

      for (const ch of cloudChapters) await putChapter(ch);
      for (const c of cloudChars) await putCharacter(c);
      if (cloudLore) await putLore(cloudLore);
    }

    setLastSyncAt(Date.now());
  } finally {
    setIsSyncing(false);
  }
}

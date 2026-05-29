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
  } catch (err) {
    console.error('[Sync] Failed to parse JSON:', value, err);
    throw new Error(`Data corruption detected: unable to parse stored value`);
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
  const userId = getUserId();
  if (!userId || !isConfigured()) return;

  try {
    // Cascade-delete all child documents from the cloud first
    const [chapterDocs, charDocs, loreDocs] = await Promise.all([
      databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.chapters,
        [Query.equal('bookId', bookId)]
      ),
      databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.characters,
        [Query.equal('bookId', bookId)]
      ),
      databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.loreBibles,
        [Query.equal('bookId', bookId)]
      ),
    ]);

    for (const doc of chapterDocs.documents) {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.chapters,
        doc.$id
      );
    }
    for (const doc of charDocs.documents) {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.characters,
        doc.$id
      );
    }
    for (const doc of loreDocs.documents) {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.loreBibles,
        doc.$id
      );
    }

    // Finally delete the book itself
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
/*  SINGLE-BOOK SYNC                                                   */
/* ------------------------------------------------------------------ */

export async function getCloudBookIds(): Promise<string[]> {
  const userId = getUserId();
  if (!userId || !isConfigured()) return [];

  try {
    const { documents } = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.books,
      [Query.equal('userId', userId)]
    );
    return documents.map((d) => d.$id);
  } catch (err) {
    logSyncError('getCloudBookIds', err);
    return [];
  }
}

/** Download a single book and all its children from cloud → local */
export async function syncBookFromCloud(
  bookId: string,
  putBook: (b: Book) => Promise<void>,
  putChapter: (c: Chapter) => Promise<void>,
  putCharacter: (c: Character) => Promise<void>,
  putLore: (l: LoreBible) => Promise<void>
): Promise<void> {
  const userId = getUserId();
  if (!userId || !isConfigured()) return;

  try {
    const doc = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.books,
      bookId
    );
    const cloudBook: Book = {
      id: doc.$id,
      title: doc.title,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
    await putBook(cloudBook);

    const [cloudChapters, cloudChars, cloudLore] = await Promise.all([
      pullChaptersForBook(bookId),
      pullCharactersForBook(bookId),
      pullLoreBibleForBook(bookId),
    ]);

    for (const ch of cloudChapters) await putChapter(ch);
    for (const c of cloudChars) await putCharacter(c);
    if (cloudLore) await putLore(cloudLore);
  } catch (err) {
    logSyncError('syncBookFromCloud', err);
  }
}

/** Push a single book and all its children from local → cloud */
export async function pushBookAndChildren(bookId: string): Promise<void> {
  const userId = getUserId();
  if (!userId || !isConfigured()) return;

  try {
    const book = await getBook(bookId);
    if (!book) return;
    await pushBook(book);

    const [chapters, characters, lore] = await Promise.all([
      getChaptersByBook(bookId),
      getCharactersByBook(bookId),
      getLoreBibleByBook(bookId),
    ]);

    for (const ch of chapters) await pushChapter(ch);
    for (const c of characters) await pushCharacter(c);
    if (lore) await pushLoreBible(lore);
  } catch (err) {
    logSyncError('pushBookAndChildren', err);
  }
}

interface ConflictSummary {
  book: 'local' | 'cloud' | 'none';
  chaptersPulled: number;
  chaptersPushed: number;
  charactersPulled: number;
  charactersPushed: number;
  lorePulled: boolean;
  lorePushed: boolean;
}

/** Per-entity last-write-wins conflict resolution for a single book.
 *  Returns a summary of what was synced and in which direction.
 */
export async function resolveBookConflicts(
  bookId: string,
  putBook: (b: Book) => Promise<void>,
  putChapter: (c: Chapter) => Promise<void>,
  putCharacter: (c: Character) => Promise<void>,
  putLore: (l: LoreBible) => Promise<void>
): Promise<ConflictSummary> {
  const summary: ConflictSummary = {
    book: 'none',
    chaptersPulled: 0,
    chaptersPushed: 0,
    charactersPulled: 0,
    charactersPushed: 0,
    lorePulled: false,
    lorePushed: false,
  };

  const userId = getUserId();
  if (!userId || !isConfigured()) return summary;

  try {
    // Fetch cloud book
    let cloudBook: Book | null = null;
    try {
      const doc = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.books,
        bookId
      );
      cloudBook = {
        id: doc.$id,
        title: doc.title,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      };
    } catch {
      // Book doesn't exist in cloud — will push local below
    }

    const localBook = await getBook(bookId);

    // Resolve book-level conflict
    if (cloudBook && localBook) {
      if (cloudBook.updatedAt > localBook.updatedAt) {
        await putBook(cloudBook);
        summary.book = 'cloud';
      } else if (localBook.updatedAt > cloudBook.updatedAt) {
        await pushBook(localBook);
        summary.book = 'local';
      }
    } else if (cloudBook && !localBook) {
      await putBook(cloudBook);
      summary.book = 'cloud';
    } else if (localBook && !cloudBook) {
      await pushBook(localBook);
      summary.book = 'local';
    }

    // Fetch local children
    const [localChapters, localChars, localLore] = await Promise.all([
      getChaptersByBook(bookId),
      getCharactersByBook(bookId),
      getLoreBibleByBook(bookId),
    ]);

    // Fetch cloud children
    const [cloudChapters, cloudChars, cloudLore] = await Promise.all([
      pullChaptersForBook(bookId),
      pullCharactersForBook(bookId),
      pullLoreBibleForBook(bookId),
    ]);

    // Resolve chapters
    const chapterIds = new Set([...localChapters.map((c) => c.id), ...cloudChapters.map((c) => c.id)]);
    for (const id of chapterIds) {
      const local = localChapters.find((c) => c.id === id);
      const cloud = cloudChapters.find((c) => c.id === id);
      if (local && cloud) {
        if (cloud.updatedAt > local.updatedAt) {
          await putChapter(cloud);
          summary.chaptersPulled++;
        } else if (local.updatedAt > cloud.updatedAt) {
          await pushChapter(local);
          summary.chaptersPushed++;
        }
      } else if (cloud && !local) {
        await putChapter(cloud);
        summary.chaptersPulled++;
      } else if (local && !cloud) {
        await pushChapter(local);
        summary.chaptersPushed++;
      }
    }

    // Resolve characters
    const charIds = new Set([...localChars.map((c) => c.id), ...cloudChars.map((c) => c.id)]);
    for (const id of charIds) {
      const local = localChars.find((c) => c.id === id);
      const cloud = cloudChars.find((c) => c.id === id);
      if (local && cloud) {
        if (cloud.updatedAt > local.updatedAt) {
          await putCharacter(cloud);
          summary.charactersPulled++;
        } else if (local.updatedAt > cloud.updatedAt) {
          await pushCharacter(local);
          summary.charactersPushed++;
        }
      } else if (cloud && !local) {
        await putCharacter(cloud);
        summary.charactersPulled++;
      } else if (local && !cloud) {
        await pushCharacter(local);
        summary.charactersPushed++;
      }
    }

    // Resolve lore bible
    if (localLore && cloudLore) {
      if (cloudLore.updatedAt > localLore.updatedAt) {
        await putLore(cloudLore);
        summary.lorePulled = true;
      } else if (localLore.updatedAt > cloudLore.updatedAt) {
        await pushLoreBible(localLore);
        summary.lorePushed = true;
      }
    } else if (cloudLore && !localLore) {
      await putLore(cloudLore);
      summary.lorePulled = true;
    } else if (localLore && !cloudLore) {
      await pushLoreBible(localLore);
      summary.lorePushed = true;
    }

    return summary;
  } catch (err) {
    logSyncError('resolveBookConflicts', err);
    return summary;
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

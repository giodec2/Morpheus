import { useState, useEffect, useRef, type ReactNode } from 'react';
import { useBookStore } from '@/stores/bookStore';
import { useEditorStore } from '@/stores/editorStore';
import { getBook } from '@/db/books';
import { getChaptersByBook } from '@/db/chapters';
import { getCharactersByBook } from '@/db/characters';
import { getLoreBibleByBook } from '@/db/loreBibles';
import TopBar from './TopBar';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import SettingsModal from '@/components/Settings/SettingsModal';

interface AppShellProps {
  bookId: string;
  chapterId?: string;
  children: ReactNode;
}

export default function AppShell({ bookId, chapterId, children }: AppShellProps) {
  useEffect(() => {
    document.body.classList.add('app');
    document.body.classList.remove('landing');
    return () => {
      document.body.classList.remove('app');
    };
  }, []);

  const { setActiveBook, setChapters, setCharacters, setLoreBible } = useBookStore();
  const { setActiveChapter } = useEditorStore();
  const [showSettings, setShowSettings] = useState(false);
  const prevBookIdRef = useRef<string>(bookId);

  useEffect(() => {
    let cancelled = false;
    const switchedBook = prevBookIdRef.current !== bookId;
    prevBookIdRef.current = bookId;

    async function load() {
      try {
        // CRITICAL: Immediately clear stale state when switching books.
        // If the old activeChapter lingers during the async load window,
        // the editor will show the wrong content and auto-save can corrupt data.
        if (switchedBook) {
          setActiveChapter(null);
          setActiveBook(null);
          setChapters([]);
          setCharacters([]);
          setLoreBible(null);
        }

        const [book, chapters, characters, lore] = await Promise.all([
          getBook(bookId),
          getChaptersByBook(bookId),
          getCharactersByBook(bookId),
          getLoreBibleByBook(bookId),
        ]);

        if (cancelled) return;

        if (book) setActiveBook(book);
        setChapters(chapters);
        setCharacters(characters);
        setLoreBible(lore || null);

        if (chapterId) {
          const ch = chapters.find((c) => c.id === chapterId);
          if (ch) setActiveChapter(ch);
        } else if (chapters.length > 0) {
          setActiveChapter(chapters[0]);
        } else {
          setActiveChapter(null);
        }
      } catch (err) {
        console.error('AppShell load error:', err);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [bookId, chapterId, setActiveBook, setChapters, setCharacters, setLoreBible, setActiveChapter]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-950">
      <TopBar onOpenSettings={() => setShowSettings(true)} />
      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar onOpenSettings={() => setShowSettings(true)} />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
        <RightSidebar />
      </div>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}

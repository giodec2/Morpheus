import { useState, useEffect, useRef, lazy, Suspense, type ReactNode } from 'react';
import { useBookStore } from '@/stores/bookStore';
import { useEditorStore } from '@/stores/editorStore';
import { getBook } from '@/db/books';
import { getChaptersByBook } from '@/db/chapters';
import { getCharactersByBook } from '@/db/characters';
import { getLoreBibleByBook } from '@/db/loreBibles';
import TopBar from './TopBar';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
const SettingsModal = lazy(() => import('@/components/Settings/SettingsModal'));

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
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const prevBookIdRef = useRef<string>(bookId);

  useEffect(() => {
    let cancelled = false;
    const switchedBook = prevBookIdRef.current !== bookId;
    prevBookIdRef.current = bookId;

    async function load() {
      try {
        // CRITICAL: Immediately clear stale state when switching books.
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

  // Close sidebars when switching books
  useEffect(() => {
    setShowLeft(false);
    setShowRight(false);
  }, [bookId]);

  const anySidebarOpen = showLeft || showRight;

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-slate-950">
      <TopBar
        onOpenSettings={() => setShowSettings(true)}
        onToggleLeft={() => setShowLeft(!showLeft)}
        onToggleRight={() => setShowRight(!showRight)}
      />
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile backdrop */}
        {anySidebarOpen && (
          <div
            className="absolute inset-0 bg-black/30 z-20 lg:hidden"
            onClick={() => { setShowLeft(false); setShowRight(false); }}
          />
        )}

        {/* Left sidebar */}
        <aside
          className={`w-64 panel flex flex-col overflow-hidden absolute lg:relative z-30 h-full transition-transform duration-200 ease-out ${
            showLeft ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <LeftSidebar
            onOpenSettings={() => { setShowSettings(true); setShowLeft(false); }}
            onCloseMobile={() => setShowLeft(false)}
          />
        </aside>

        <main className="flex-1 overflow-hidden">
          {children}
        </main>

        {/* Right sidebar */}
        <aside
          className={`w-96 panel border-l flex flex-col overflow-hidden absolute lg:relative z-30 h-full right-0 transition-transform duration-200 ease-out ${
            showRight ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          }`}
        >
          <RightSidebar onCloseMobile={() => setShowRight(false)} />
        </aside>
      </div>
      {showSettings && (
        <Suspense fallback={null}>
          <SettingsModal onClose={() => setShowSettings(false)} />
        </Suspense>
      )}
    </div>
  );
}

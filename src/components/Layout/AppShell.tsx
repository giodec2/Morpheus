import { useState, useEffect, useRef, useCallback, lazy, Suspense, type ReactNode } from 'react';
import { useBookStore } from '@/stores/bookStore';
import { useEditorStore } from '@/stores/editorStore';
import { useAuthStore } from '@/stores/authStore';
import { getBook } from '@/db/books';
import { getChaptersByBook } from '@/db/chapters';
import { getCharactersByBook } from '@/db/characters';
import { getLoreBibleByBook } from '@/db/loreBibles';
import { putBook } from '@/db/books';
import { putChapter } from '@/db/chapters';
import { putCharacter } from '@/db/characters';
import { putLoreBible } from '@/db/loreBibles';
import { resolveBookConflicts } from '@/services/sync';
import { toast } from '@/components/common/Toast';
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
  const conflictResolvedRef = useRef<string | null>(null);
  const { user } = useAuthStore();

  /* ---- Resizable right sidebar -------------------------------------- */
  const DEFAULT_SIDEBAR_WIDTH = 384;
  const MIN_SIDEBAR_WIDTH = 307;  // ~80%
  const MAX_SIDEBAR_WIDTH = 576;  // ~150%
  const SIDEBAR_WIDTH_KEY = 'morpheus:rightSidebarWidth';

  const [rightWidth, setRightWidth] = useState(() => {
    try {
      const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
      const parsed = saved ? parseInt(saved, 10) : DEFAULT_SIDEBAR_WIDTH;
      return Math.max(MIN_SIDEBAR_WIDTH, Math.min(MAX_SIDEBAR_WIDTH, parsed));
    } catch {
      return DEFAULT_SIDEBAR_WIDTH;
    }
  });
  const isResizingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(DEFAULT_SIDEBAR_WIDTH);

  const stopResize = useCallback(() => {
    if (!isResizingRef.current) return;
    isResizingRef.current = false;
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
    try {
      localStorage.setItem(SIDEBAR_WIDTH_KEY, String(rightWidth));
    } catch {
      // ignore
    }
  }, [rightWidth]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current) return;
    const delta = e.clientX - startXRef.current;
    const newWidth = Math.max(MIN_SIDEBAR_WIDTH, Math.min(MAX_SIDEBAR_WIDTH, startWidthRef.current - delta));
    setRightWidth(newWidth);
  }, []);

  const startResize = useCallback((e: React.MouseEvent) => {
    isResizingRef.current = true;
    startXRef.current = e.clientX;
    startWidthRef.current = rightWidth;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
  }, [rightWidth]);

  useEffect(() => {
    if (!isResizingRef.current) return;
    const handleUp = () => stopResize();
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [onMouseMove, stopResize]);

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

        // Resolve cloud conflicts per-entity (only once per book, and only if logged in)
        if (user && conflictResolvedRef.current !== bookId) {
          conflictResolvedRef.current = bookId;
          try {
            const summary = await resolveBookConflicts(bookId, putBook, putChapter, putCharacter, putLoreBible);
            const pulled = summary.chaptersPulled + summary.charactersPulled + (summary.lorePulled ? 1 : 0);
            const pushed = summary.chaptersPushed + summary.charactersPushed + (summary.lorePushed ? 1 : 0);

            if (pulled > 0 || summary.book === 'cloud') {
              // Cloud was newer — reload stores with fresh data
              const [freshBook, freshChapters, freshChars, freshLore] = await Promise.all([
                getBook(bookId),
                getChaptersByBook(bookId),
                getCharactersByBook(bookId),
                getLoreBibleByBook(bookId),
              ]);
              if (!cancelled) {
                if (freshBook) setActiveBook(freshBook);
                setChapters(freshChapters);
                setCharacters(freshChars);
                setLoreBible(freshLore || null);
                // Re-select active chapter in case it changed
                if (chapterId) {
                  const ch = freshChapters.find((c) => c.id === chapterId);
                  if (ch) setActiveChapter(ch);
                } else if (freshChapters.length > 0) {
                  setActiveChapter(freshChapters[0]);
                }
              }
              toast(`Synced ${pulled} update${pulled === 1 ? '' : 's'} from cloud`, 'info');
            } else if (pushed > 0 || summary.book === 'local') {
              toast(`Synced ${pushed} update${pushed === 1 ? '' : 's'} to cloud`, 'success');
            }
          } catch (err) {
            console.error('[AppShell] Conflict resolution failed:', err);
          }
        }
      } catch (err) {
        console.error('AppShell load error:', err);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [bookId, chapterId, setActiveBook, setChapters, setCharacters, setLoreBible, setActiveChapter, user]);

  // Close sidebars when switching books
  useEffect(() => {
    setShowLeft(false);
    setShowRight(false);
  }, [bookId]);

  // Reset conflict resolution tracker when user changes (login/logout)
  useEffect(() => {
    conflictResolvedRef.current = null;
  }, [user]);

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

        {/* Resize handle — desktop only */}
        <div
          className="hidden lg:block w-1 cursor-col-resize hover:bg-primary-500/30 active:bg-primary-500/50 z-40 self-stretch shrink-0 transition-colors"
          onMouseDown={startResize}
          title="Drag to resize"
        />

        {/* Right sidebar */}
        <aside
          style={{ width: rightWidth }}
          className={`panel border-l flex flex-col overflow-hidden absolute lg:relative z-30 h-full right-0 transition-transform duration-200 ease-out shrink-0 ${
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

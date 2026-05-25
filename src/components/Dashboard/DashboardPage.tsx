import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Feather, Plus, BookOpen, Clock, Trash2, FileText, Moon, Sun, KeyRound, ArrowRight, Cloud, CloudOff, Loader2, Crown } from 'lucide-react';
import { useSettingsStore } from '@/stores/settingsStore';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/components/common/Toast';
import AuthModal from '@/components/Auth/AuthModal';
import UpgradeModal from '@/components/common/UpgradeModal';
import TierSelectorModal from '@/components/common/TierSelectorModal';
import ConfirmModal from '@/components/common/ConfirmModal';
import { getAllBooks, createBook, deleteBook } from '@/db/books';
import { TIER_DEFAULTS } from '@/services/auth';
import { getChaptersByBook } from '@/db/chapters';
import { createLoreBible } from '@/db/loreBibles';
import { createChapter } from '@/db/chapters';
import type { Book } from '@/types';
import { formatRelativeTime } from '@/lib/utils';

export default function DashboardPage() {
  useEffect(() => {
    document.body.classList.add('app');
    document.body.classList.remove('landing');
    return () => {
      document.body.classList.remove('app');
    };
  }, []);

  const [books, setBooks] = useState<Book[]>([]);
  const [chapterCounts, setChapterCounts] = useState<Record<string, number>>({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const { theme, setTheme, openRouterKey, setOpenRouterKey, setIsConnected, setAiMode } = useSettingsStore();
  const { user, isSyncing, lastSyncAt, profile } = useAuthStore();
  const [apiInput, setApiInput] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showTierSelector, setShowTierSelector] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const isDark = theme === 'dark';

  // Handle checkout success/cancel query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkout = params.get('checkout');
    if (checkout === 'success') {
      toast('Your subscription is being activated! This may take a moment.', 'success');
      window.history.replaceState({}, '', window.location.pathname);
    } else if (checkout === 'cancelled') {
      toast('Checkout cancelled. You can subscribe anytime from your account.', 'info');
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    if (lastSyncAt) loadBooks();
  }, [lastSyncAt]);

  async function loadBooks() {
    const allBooks = await getAllBooks();
    setBooks(allBooks);

    const counts: Record<string, number> = {};
    for (const book of allBooks) {
      const chapters = await getChaptersByBook(book.id);
      counts[book.id] = chapters.length;
    }
    setChapterCounts(counts);
  }

  const tierDefaults = profile ? TIER_DEFAULTS[profile.subscriptionTier] : null;
  const maxBooks = tierDefaults?.maxBooks ?? profile?.maxBooks ?? Infinity;
  const canCreateBook = books.length < maxBooks;

  const handleCreateBook = async () => {
    if (!newTitle.trim()) return;
    if (!canCreateBook) {
      setShowCreateModal(false);
      setShowUpgrade(true);
      toast(`You've reached your book limit (${maxBooks}). Upgrade to create more.`, 'error');
      return;
    }
    const book = await createBook(newTitle.trim());
    await createLoreBible(book.id);
    await createChapter(book.id, 'Chapter 1', 0);
    setNewTitle('');
    setShowCreateModal(false);
    loadBooks();
    toast('Book created successfully', 'success');
  };

  const handleDeleteBook = async (id: string) => {
    setBookToDelete(id);
  };

  const confirmDeleteBook = async () => {
    if (!bookToDelete) return;
    await deleteBook(bookToDelete);
    setBookToDelete(null);
    loadBooks();
    toast('Book deleted', 'info');
  };

  const handleSaveApiKey = async () => {
    if (!apiInput.trim().startsWith('sk-or-')) {
      toast('Please enter a valid OpenRouter API key (starts with sk-or-)', 'error');
      return;
    }
    setIsValidating(true);
    try {
      const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
        headers: { Authorization: `Bearer ${apiInput.trim()}` },
      });
      if (response.ok) {
        setOpenRouterKey(apiInput.trim());
        setIsConnected(true);
        setAiMode('byok');
        toast('API key saved! Switched to BYOK mode.', 'success');
        setApiInput('');
      } else {
        toast('Invalid API key. Please check and try again.', 'error');
      }
    } catch {
      toast('Could not connect to OpenRouter. Check your internet.', 'error');
    }
    setIsValidating(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Feather className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">MORPHEUS</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">AI Co-Writer for Your Dreams</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            {isSyncing && (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400" title="Syncing...">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              </span>
            )}
            {user ? (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                title={user.email}
              >
                <Cloud className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                  {user.name || user.email}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                title="Sign in to sync"
              >
                <CloudOff className="w-4 h-4 text-gray-400" />
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Sync</span>
              </button>
            )}
            {profile && (
              <button
                onClick={() => setShowTierSelector(true)}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors text-xs font-medium"
                title={`${books.length} / ${maxBooks} books used — Click to see upgrade options`}
              >
                <Crown className="w-3.5 h-3.5" />
                <span className="capitalize">{profile.subscriptionTier}</span>
                {profile.subscriptionStatus && profile.subscriptionStatus !== 'active' && (
                  <span className="text-[10px] opacity-70 uppercase">({profile.subscriptionStatus})</span>
                )}
                <span className="text-primary-400 dark:text-primary-500">·</span>
                <span>{books.length}/{maxBooks}</span>
              </button>
            )}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* API Key Banner */}
        {!openRouterKey && (
          <div className="mb-8 p-6 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-800/50 rounded-lg">
                <KeyRound className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-300 mb-1">
                  Welcome to Morpheus!
                </h3>
                <p className="text-sm text-primary-700 dark:text-primary-400 mb-4">
                  To use the AI co-writer, you need an OpenRouter API key. 
                  <a 
                    href="https://openrouter.ai/settings/keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-primary-900 dark:hover:text-primary-200"
                  >
                    Get one free here
                  </a>.
                </p>
                <div className="flex gap-2 max-w-lg">
                  <input
                    type="password"
                    className="input flex-1"
                    placeholder="Paste your OpenRouter API key (sk-or-...)"
                    value={apiInput}
                    onChange={(e) => setApiInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveApiKey();
                    }}
                  />
                  <button
                    onClick={handleSaveApiKey}
                    disabled={isValidating || !apiInput.trim()}
                    className="btn-primary flex items-center gap-2"
                  >
                    {isValidating ? 'Checking...' : <>
                      Save <ArrowRight className="w-4 h-4" />
                    </>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Books</h2>
          {user && !canCreateBook ? (
            <button
              onClick={() => setShowUpgrade(true)}
              className="btn-primary flex items-center gap-2 bg-amber-500 hover:bg-amber-600"
            >
              <Crown className="w-4 h-4" />
              Upgrade to Create More
            </button>
          ) : (
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Book
            </button>
          )}
        </div>

        {books.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">No books yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">Start your first dream. Create a new book to begin writing.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Create New Book
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map(book => (
              <BookCard
                key={book.id}
                book={book}
                chapterCount={chapterCounts[book.id] || 0}
                onDelete={() => handleDeleteBook(book.id)}
              />
            ))}
          </div>
        )}
      </main>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      {showUpgrade && profile && (
        <UpgradeModal
          currentTier={profile.subscriptionTier}
          currentCount={books.length}
          maxCount={maxBooks}
          onClose={() => setShowUpgrade(false)}
        />
      )}

      {showTierSelector && profile && (
        <TierSelectorModal
          currentTier={profile.subscriptionTier}
          onClose={() => setShowTierSelector(false)}
        />
      )}

      {bookToDelete && (
        (() => {
          const book = books.find((b) => b.id === bookToDelete);
          if (!book) return null;
          return (
            <ConfirmModal
              title="Delete Book"
              description={`This will permanently delete "${book.title}" and all its chapters. This action cannot be undone.`}
              itemName={book.title}
              confirmLabel="Delete Book"
              onConfirm={confirmDeleteBook}
              onClose={() => setBookToDelete(null)}
            />
          );
        })()
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create New Book</h3>
            <input
              autoFocus
              className="input mb-4"
              placeholder="Book title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateBook();
                if (e.key === 'Escape') setShowCreateModal(false);
              }}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowCreateModal(false)} className="btn-secondary">Cancel</button>
              <button onClick={handleCreateBook} disabled={!newTitle.trim()} className="btn-primary">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BookCard({ book, chapterCount, onDelete }: { book: Book; chapterCount: number; onDelete: () => void }) {
  return (
    <div className="card p-5 hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between mb-3">
        <Link href={`/book/${book.id}`} className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {book.title}
          </h3>
        </Link>
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
          title="Delete book"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
        </button>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
        <span className="flex items-center gap-1">
          <FileText className="w-3 h-3" />
          {chapterCount} {chapterCount === 1 ? 'chapter' : 'chapters'}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatRelativeTime(book.updatedAt)}
        </span>
      </div>

      <Link href={`/book/${book.id}`}>
        <button className="w-full btn-secondary text-xs">Open Book</button>
      </Link>
    </div>
  );
}

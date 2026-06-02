import { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'wouter';
import { Plus, BookOpen, Clock, Trash2, FileText, Moon, Sun, KeyRound, ArrowRight, ArrowUpRight, Cloud, CloudOff, Loader2, Crown, Eye, EyeOff, Pencil, Trash, AlertTriangle, Upload } from 'lucide-react';
import { useSettingsStore } from '@/stores/settingsStore';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/components/common/Toast';
const AuthModal = lazy(() => import('@/components/Auth/AuthModal'));
const UpgradeModal = lazy(() => import('@/components/common/UpgradeModal'));
const TierSelectorModal = lazy(() => import('@/components/common/TierSelectorModal'));
const ConfirmModal = lazy(() => import('@/components/common/ConfirmModal'));
import { getAllBooks, createBook, deleteBook, putBook, updateBook } from '@/db/books';
import { TIER_DEFAULTS } from '@/services/auth';
import { getChaptersByBook } from '@/db/chapters';
import { createLoreBible } from '@/db/loreBibles';
import { createChapter, putChapter } from '@/db/chapters';
import type { Book } from '@/types';
import { putCharacter } from '@/db/characters';
import { putLoreBible } from '@/db/loreBibles';
import { getCloudBookIds, pushBookAndChildren, syncBookFromCloud } from '@/services/sync';
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
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [orphanedBookIds, setOrphanedBookIds] = useState<Set<string>>(new Set());
  const [syncingOrphanId, setSyncingOrphanId] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [isEditingKey, setIsEditingKey] = useState(false);
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
    if (user) checkCloudSync();
  }, [user]);

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

  async function checkCloudSync() {
    try {
      const cloudIds = await getCloudBookIds();
      const localBooks = await getAllBooks();
      const localIds = new Set(localBooks.map((b) => b.id));
      const cloudIdSet = new Set(cloudIds);

      // Find orphaned local books (local but not in cloud)
      const orphaned = localBooks.filter((b) => !cloudIdSet.has(b.id)).map((b) => b.id);
      setOrphanedBookIds(new Set(orphaned));

      // Find cloud-only books and download them
      const cloudOnly = cloudIds.filter((id) => !localIds.has(id));
      if (cloudOnly.length > 0) {
        toast(`Found ${cloudOnly.length} book(s) in the cloud. Downloading...`, 'info');
        for (const bookId of cloudOnly) {
          await syncBookFromCloud(bookId, putBook, putChapter, putCharacter, putLoreBible);
        }
        await loadBooks();
        toast('Downloaded missing books from cloud', 'success');
      }
    } catch (err) {
      console.error('[Dashboard] Cloud sync check failed:', err);
    }
  }

  async function handleSyncOrphanToCloud(bookId: string) {
    setSyncingOrphanId(bookId);
    try {
      await pushBookAndChildren(bookId);
      setOrphanedBookIds((prev) => {
        const next = new Set(prev);
        next.delete(bookId);
        return next;
      });
      toast('Book synced to cloud successfully', 'success');
    } catch {
      toast('Failed to sync book to cloud', 'error');
    } finally {
      setSyncingOrphanId(null);
    }
  }

  const tierDefaults = profile ? TIER_DEFAULTS[profile.subscriptionTier] : null;
  const maxBooks = tierDefaults?.maxBooks ?? profile?.maxBooks ?? 1; // default to free tier when profile unavailable
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

  const handleStartEdit = (book: Book) => {
    setBookToEdit(book);
    setEditTitle(book.title);
  };

  const confirmEditBook = async () => {
    if (!bookToEdit || !editTitle.trim()) return;
    await updateBook(bookToEdit.id, { title: editTitle.trim() });
    setBookToEdit(null);
    setEditTitle('');
    loadBooks();
    toast('Book renamed', 'success');
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
        setIsEditingKey(false);
      } else {
        toast('Invalid API key. Please check and try again.', 'error');
      }
    } catch {
      toast('Could not connect to OpenRouter. Check your internet.', 'error');
    }
    setIsValidating(false);
  };

  const handleRemoveApiKey = () => {
    setOpenRouterKey('');
    setIsConnected(false);
    setAiMode('hosted');
    setShowKey(false);
    setIsEditingKey(false);
    setApiInput('');
    toast('API key removed. Switched to hosted mode.', 'info');
  };

  const maskedKey = (key: string) => {
    if (key.length <= 12) return '••••••••';
    return key.slice(0, 8) + '••••••••••••' + key.slice(-4);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="Morpheus" className="w-11 h-11 object-contain group-hover:scale-110 transition-transform" />
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
        {/* API Key Section */}
        {openRouterKey && !isEditingKey ? (
          <div className="mb-8 p-5 bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-800/40 rounded-lg">
                <KeyRound className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                  OpenRouter API Key
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                  BYOK mode active — your key is stored locally
                </p>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1.5 rounded-lg text-emerald-700 dark:text-emerald-300 select-all">
                  {showKey ? openRouterKey : maskedKey(openRouterKey)}
                </code>
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-800/40 transition-colors text-emerald-600 dark:text-emerald-400"
                  title={showKey ? 'Hide key' : 'Show key'}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => { setIsEditingKey(true); setApiInput(openRouterKey); }}
                  className="p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-800/40 transition-colors text-emerald-600 dark:text-emerald-400"
                  title="Update key"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={handleRemoveApiKey}
                  className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-red-500 dark:text-red-400"
                  title="Remove key"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : isEditingKey && openRouterKey ? (
          <div className="mb-8 p-5 bg-amber-50 dark:bg-amber-900/15 border border-amber-200 dark:border-amber-800 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-amber-100 dark:bg-amber-800/40 rounded-lg">
                <Pencil className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">
                  Update API Key
                </h3>
                <div className="flex gap-2 max-w-lg">
                  <input
                    type={showKey ? 'text' : 'password'}
                    className="input flex-1"
                    placeholder="Paste your new OpenRouter API key (sk-or-...)"
                    value={apiInput}
                    onChange={(e) => setApiInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveApiKey();
                      if (e.key === 'Escape') { setIsEditingKey(false); setApiInput(''); }
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="p-2 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-800/40 transition-colors text-amber-600 dark:text-amber-400"
                    title={showKey ? 'Hide key' : 'Show key'}
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleSaveApiKey}
                    disabled={isValidating || !apiInput.trim()}
                    className="btn-primary flex items-center gap-2 bg-amber-500 hover:bg-amber-600"
                  >
                    {isValidating ? 'Checking...' : 'Update'}
                  </button>
                  <button
                    onClick={() => { setIsEditingKey(false); setApiInput(''); }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
                    className="underline hover:text-primary-900 dark:hover:text-primary-200 ml-1"
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
          <div className="flex items-center gap-2">
            {user && profile && profile.subscriptionTier !== 'architect' && (
              (() => {
                const tierOrder = ['free', 'scribe', 'novelist', 'architect'];
                const nextTier = tierOrder[tierOrder.indexOf(profile.subscriptionTier) + 1];
                const styles: Record<string, string> = {
                  scribe:    'bg-primary-700 hover:bg-primary-800 text-white shadow-lg shadow-primary-600/30 ring-1 ring-primary-400/50',
                  novelist:  'bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/30 ring-1 ring-amber-400/50',
                  architect: 'bg-purple-700 hover:bg-purple-800 text-white shadow-lg shadow-purple-600/30 ring-1 ring-purple-400/50',
                };
                return (
                  <button
                    onClick={() => setShowTierSelector(true)}
                    className={`flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-lg font-bold transition-all hover:scale-[1.03] hover:shadow-xl ${styles[nextTier]}`}
                    title={`Upgrade to ${nextTier}`}
                  >
                    <Crown className="w-3.5 h-3.5" />
                    Upgrade to {nextTier.charAt(0).toUpperCase() + nextTier.slice(1)}
                    <ArrowUpRight className="w-3 h-3 opacity-80" />
                  </button>
                );
              })()
            )}
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
                onEdit={() => handleStartEdit(book)}
                isOrphaned={orphanedBookIds.has(book.id)}
                isSyncing={syncingOrphanId === book.id}
                onSyncToCloud={() => handleSyncOrphanToCloud(book.id)}
              />
            ))}
          </div>
        )}
      </main>

      <Suspense fallback={null}>
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

        {/* Edit Modal */}
        {bookToEdit && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rename Book</h3>
              <input
                autoFocus
                className="input mb-4"
                placeholder="Book title..."
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmEditBook();
                  if (e.key === 'Escape') { setBookToEdit(null); setEditTitle(''); }
                }}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => { setBookToEdit(null); setEditTitle(''); }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmEditBook}
                  disabled={!editTitle.trim()}
                  className="btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </Suspense>

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

function BookCard({
  book, chapterCount, onDelete, onEdit, isOrphaned, isSyncing, onSyncToCloud,
}: {
  book: Book; chapterCount: number; onDelete: () => void; onEdit: () => void;
  isOrphaned?: boolean; isSyncing?: boolean; onSyncToCloud?: () => void;
}) {
  return (
    <div className={`card p-5 hover:shadow-md transition-shadow group ${isOrphaned ? 'border-amber-300 dark:border-amber-700' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <Link href={`/book/${book.id}`} className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg hover:text-primary-600 dark:hover:text-primary-400 transition-colors truncate">
            {book.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
            title="Rename book"
          >
            <Pencil className="w-4 h-4 text-primary-400" />
          </button>
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
            title="Delete book"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
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
        {isOrphaned && (
          <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
            <AlertTriangle className="w-3 h-3" />
            Not synced
          </span>
        )}
      </div>

      {isOrphaned ? (
        <div className="space-y-2">
          <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
            This book only exists on this device. Sync it to the cloud or delete it.
          </p>
          <div className="flex gap-2">
            <button
              onClick={onSyncToCloud}
              disabled={isSyncing}
              className="flex-1 btn-primary text-xs flex items-center justify-center gap-1.5"
            >
              {isSyncing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
              {isSyncing ? 'Syncing...' : 'Sync to Cloud'}
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <Link href={`/book/${book.id}`}>
          <button className="w-full btn-secondary text-xs">Open Book</button>
        </Link>
      )}
    </div>
  );
}

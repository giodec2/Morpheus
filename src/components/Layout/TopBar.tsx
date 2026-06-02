import { Link, useLocation } from 'wouter';
import {
  Settings, Download, Home, Upload, Cloud, CloudOff, Loader2,
  Menu, MessageSquare
} from 'lucide-react';
import { useBookStore } from '@/stores/bookStore';
import { useEditorStore } from '@/stores/editorStore';
import { useSettingsStore } from '@/stores/settingsStore';
import DarkModeToggle from '@/components/common/DarkModeToggle';
import ResearchPanel from '@/components/Layout/ResearchPanel';

const ExportModal = lazy(() => import('@/components/Settings/ExportModal'));
const ImportModal = lazy(() => import('@/components/Settings/ImportModal'));
const AuthModal = lazy(() => import('@/components/Auth/AuthModal'));
import { useState, lazy, Suspense } from 'react';
import { useAuthStore } from '@/stores/authStore';

interface TopBarProps {
  onOpenSettings?: () => void;
  onToggleLeft?: () => void;
  onToggleRight?: () => void;
}

export default function TopBar({ onOpenSettings, onToggleLeft, onToggleRight }: TopBarProps) {
  const { activeBook } = useBookStore();
  const { activeChapter } = useEditorStore();
  const { isConnected } = useSettingsStore();
  const { user, isSyncing } = useAuthStore();
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [, navigate] = useLocation();

  return (
    <>
      <header className="h-14 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center px-3 lg:px-4 shrink-0 z-20">
        {/* Left: Logo + hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleLeft}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <img src="/logo.png" alt="Morpheus" className="w-6 h-6 object-contain" />
          <Link href="/" className="text-lg font-bold text-gray-900 dark:text-white tracking-tight hover:opacity-80 transition-opacity hidden sm:block">
            MORPHEUS
          </Link>
        </div>

        {/* Home link — hidden on very small screens */}
        <div className="hidden sm:flex items-center gap-1 ml-4 lg:ml-6">
          <Link href="/" className="btn-ghost flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <Home className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </Link>
        </div>

        {/* Center: Project info */}
        <div className="flex-1 flex items-center justify-center gap-2 lg:gap-4 px-2 lg:px-4 min-w-0">
          {activeBook && (
            <>
              <div className="flex items-center gap-1.5 lg:gap-2 min-w-0">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 hidden lg:inline">Project:</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[80px] sm:max-w-[120px] lg:max-w-[200px]">
                  {activeBook.title}
                </span>
                {activeChapter && (
                  <>
                    <span className="text-gray-300 dark:text-gray-700 hidden sm:inline">—</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[60px] sm:max-w-[120px] hidden sm:inline">
                      {activeChapter.title}
                    </span>
                  </>
                )}
                {isConnected && (
                  <span className="ml-1 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hidden md:flex">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Connected
                  </span>
                )}
              </div>
              <div className="hidden md:block">
                <ResearchPanel />
              </div>
            </>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-0.5 lg:gap-1">
          {isSyncing && (
            <span className="hidden sm:flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mr-1" title="Syncing...">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            </span>
          )}

          {/* User / Sync */}
          {user ? (
            <button
              onClick={() => setShowAuth(true)}
              className="flex items-center gap-1.5 px-1.5 lg:px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors mr-0.5"
              title={user.email}
            >
              <Cloud className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 max-w-[60px] lg:max-w-[100px] truncate hidden sm:inline">
                {user.name || user.email}
              </span>
            </button>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="flex items-center gap-1.5 px-1.5 lg:px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors mr-0.5"
              title="Sign in to sync"
            >
              <CloudOff className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 hidden sm:inline">Sync</span>
            </button>
          )}

          <DarkModeToggle />

          <button
            onClick={() => setShowImport(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            title="Import book"
          >
            <Upload className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => setShowExport(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            title="Export book"
          >
            <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => onOpenSettings?.()}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors hidden lg:flex"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Mobile chat toggle */}
          <button
            onClick={onToggleRight}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle chat"
          >
            <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </header>

      {showExport && (
        <Suspense fallback={null}>
          <ExportModal onClose={() => setShowExport(false)} />
        </Suspense>
      )}
      {showImport && (
        <Suspense fallback={null}>
          <ImportModal
            onClose={() => setShowImport(false)}
            onImport={() => { setShowImport(false); navigate('/app'); }}
          />
        </Suspense>
      )}
      {showAuth && (
        <Suspense fallback={null}>
          <AuthModal onClose={() => setShowAuth(false)} />
        </Suspense>
      )}
    </>
  );
}

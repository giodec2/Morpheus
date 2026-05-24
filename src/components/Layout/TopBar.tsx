import { Link } from 'wouter';
import { Feather, Settings, Download, Home, Upload, Cloud, CloudOff, Loader2 } from 'lucide-react';
import { useBookStore } from '@/stores/bookStore';
import { useEditorStore } from '@/stores/editorStore';
import { useSettingsStore } from '@/stores/settingsStore';
import DarkModeToggle from '@/components/common/DarkModeToggle';
import SearchBar from '@/components/Layout/SearchBar';
import ExportModal from '@/components/Settings/ExportModal';
import ImportModal from '@/components/Settings/ImportModal';
import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import AuthModal from '@/components/Auth/AuthModal';

interface TopBarProps {
  onOpenSettings?: () => void;
}

export default function TopBar({ onOpenSettings }: TopBarProps) {
  const { activeBook } = useBookStore();
  const { activeChapter } = useEditorStore();
  const { isConnected } = useSettingsStore();
  const { user, isSyncing } = useAuthStore();
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <header className="h-14 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center px-4 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Feather className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          <Link href="/" className="text-lg font-bold text-gray-900 dark:text-white tracking-tight hover:opacity-80 transition-opacity">
            MORPHEUS
          </Link>
        </div>

        <div className="flex items-center gap-1 ml-6">
          <Link href="/" className="btn-ghost flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <Home className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center gap-4 px-4">
          {activeBook && (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Project:</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{activeBook.title}</span>
                {activeChapter && (
                  <>
                    <span className="text-gray-300 dark:text-gray-700">—</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{activeChapter.title}</span>
                  </>
                )}
                {isConnected && (
                  <span className="ml-2 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Connected
                  </span>
                )}
              </div>
              <SearchBar />
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          {isSyncing && (
            <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mr-1" title="Syncing...">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            </span>
          )}
          {user ? (
            <button
              onClick={() => setShowAuth(true)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors mr-1"
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
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors mr-1"
              title="Sign in to sync"
            >
              <CloudOff className="w-4 h-4 text-gray-400" />
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Sync</span>
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
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </header>

      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
      {showImport && <ImportModal onClose={() => setShowImport(false)} onImport={() => {}} />}
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}

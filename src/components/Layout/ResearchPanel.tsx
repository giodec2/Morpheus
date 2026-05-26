import { useEffect, useRef, useMemo, useCallback } from 'react';
import { Search, X, FileText, User, BookOpen } from 'lucide-react';
import { useBookStore } from '@/stores/bookStore';
import { useEditorStore } from '@/stores/editorStore';
import { useSearchStore } from '@/stores/searchStore';
import { useLocation } from 'wouter';
import { searchIndex, buildSearchIndex } from '@/lib/searchEngine';
import type { SearchResult, SearchResultType } from '@/lib/searchEngine';

const typeConfig: Record<SearchResultType, { icon: typeof FileText; label: string; color: string }> = {
  chapter: { icon: FileText, label: 'Chapter', color: 'text-primary-600 dark:text-primary-400' },
  character: { icon: User, label: 'Character', color: 'text-amber-600 dark:text-amber-400' },
  lore: { icon: BookOpen, label: 'Lore Bible', color: 'text-purple-600 dark:text-purple-400' },
};

const fieldLabels: Record<string, string> = {
  title: 'Title',
  name: 'Name',
  content: 'Content',
  appearance: 'Appearance',
  personality: 'Personality',
  notes: 'Notes',
  lore: 'Lore',
};

function ResultItem({ result, isSelected, onClick }: {
  result: SearchResult;
  isSelected: boolean;
  onClick: () => void;
}) {
  const { document, snippet } = result;
  const config = typeConfig[document.type];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 transition-colors border-b border-gray-100 dark:border-slate-800/60 last:border-0 ${
        isSelected
          ? 'bg-primary-50 dark:bg-primary-900/20'
          : 'hover:bg-gray-50 dark:hover:bg-slate-800/60'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-3.5 h-3.5 ${config.color} shrink-0`} />
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
          {document.title}
        </span>
        <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 font-medium">
          {config.label}
        </span>
        {document.field && document.field !== 'content' && document.field !== 'lore' && (
          <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400">
            {fieldLabels[document.field] || document.field}
          </span>
        )}
      </div>
      <p
        className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2"
        dangerouslySetInnerHTML={{ __html: snippet }}
      />
    </button>
  );
}

export default function ResearchPanel() {
  const { chapters, characters, loreBible, activeBook, setSidebarView, setActiveCharacterId } = useBookStore();
  const { setActiveChapter } = useEditorStore();
  const { isOpen, query, results, index, setOpen, setQuery, setResults, setIndex, setActiveHighlightTerms, selectedResultId, setSelectedResultId } = useSearchStore();
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);


  // Build index when book data changes — synchronous for small books
  useEffect(() => {
    if (!activeBook) return;
    const newIndex = buildSearchIndex(chapters, characters, loreBible);
    setIndex(newIndex);
  }, [chapters, characters, loreBible, activeBook, setIndex]);

  // Search when query changes
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }
    const results = searchIndex(index, query);
    setResults(results);
  }, [query, index, setResults]);

  // Keyboard shortcut: Cmd/Ctrl+K to open, Escape to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setOpen]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, setOpen]);

  const handleSelectResult = useCallback((result: SearchResult) => {
    if (!activeBook) return;

    setSelectedResultId(result.document.id);

    // Set highlight terms from query
    const terms = query.trim().toLowerCase().split(/\s+/).filter((t) => t.length >= 2);
    setActiveHighlightTerms(terms);

    switch (result.document.type) {
      case 'chapter': {
        const ch = chapters.find((c) => c.id === result.document.entityId);
        if (ch) {
          setActiveChapter(ch);
          setLocation(`/book/${activeBook.id}/chapter/${ch.id}`);
        }
        break;
      }
      case 'character': {
        setSidebarView('characters');
        setActiveCharacterId(result.document.entityId);
        break;
      }
      case 'lore': {
        setSidebarView('loreBible');
        break;
      }
    }
  }, [activeBook, chapters, query, setActiveChapter, setActiveCharacterId, setActiveHighlightTerms, setLocation, setSelectedResultId, setSidebarView]);

  // Group results by type
  const groupedResults = useMemo(() => {
    const groups: Record<SearchResultType, SearchResult[]> = {
      chapter: [],
      character: [],
      lore: [],
    };
    for (const r of results) {
      groups[r.document.type].push(r);
    }
    return groups;
  }, [results]);

  const hasResults = results.length > 0;
  const hasQuery = query.length >= 2;

  if (!isOpen) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
        title="Search (Ctrl+K)"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-400 font-mono ml-1">
          <span className="text-[9px]">Ctrl</span> K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[70vh]"
      >
        {/* Header / Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-slate-700 shrink-0">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chapters, characters, lore..."
            className="flex-1 bg-transparent text-base outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
  
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {hasResults ? (
            <div className="py-2">
              {(Object.keys(groupedResults) as SearchResultType[]).map((type) => {
                const group = groupedResults[type];
                if (group.length === 0) return null;
                const config = typeConfig[type];
                const Icon = config.icon;

                return (
                  <div key={type}>
                    <div className="flex items-center gap-2 px-4 py-2 sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm z-10">
                      <Icon className={`w-4 h-4 ${config.color}`} />
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {config.label}s
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
                        {group.length} result{group.length > 1 ? 's' : ''}
                      </span>
                    </div>
                    {group.map((result) => (
                      <ResultItem
                        key={result.document.id}
                        result={result}
                        isSelected={selectedResultId === result.document.id}
                        onClick={() => handleSelectResult(result)}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          ) : hasQuery ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Search className="w-10 h-10 mb-3 opacity-40" />
              <p className="text-sm">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1 opacity-60">Try a different keyword</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Search className="w-10 h-10 mb-3 opacity-40" />
              <p className="text-sm">Search across your entire book</p>
              <p className="text-xs mt-1 opacity-60">Chapters, characters, and lore bible</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-slate-700 text-[11px] text-gray-400 dark:text-gray-500 shrink-0">
          <span>{results.length > 0 ? `${results.length} results across ${new Set(results.map(r => r.document.type)).size} categories` : index.length > 0 ? `${index.length} documents indexed` : 'Indexing...'}</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-gray-100 dark:bg-slate-800 font-mono">↑↓</kbd> Navigate</span>
            <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-gray-100 dark:bg-slate-800 font-mono">Enter</kbd> Open</span>
            <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-gray-100 dark:bg-slate-800 font-mono">Esc</kbd> Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, FileText } from 'lucide-react';
import { useBookStore } from '@/stores/bookStore';
import { useLocation } from 'wouter';

function extractTextFromContent(content: Record<string, unknown>): string {
  let text = '';
  function traverse(node: unknown) {
    if (typeof node !== 'object' || node === null) return;
    const n = node as Record<string, unknown>;
    if (n.type === 'text' && typeof n.text === 'string') text += n.text + ' ';
    if (Array.isArray(n.content)) n.content.forEach(traverse);
  }
  traverse(content);
  return text;
}

export default function SearchBar() {
  const { chapters, activeBook } = useBookStore();
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    return chapters
      .map((ch) => {
        const text = extractTextFromContent(ch.content).toLowerCase();
        const titleMatch = ch.title.toLowerCase().includes(q);
        const contentMatch = text.includes(q);
        if (!titleMatch && !contentMatch) return null;
        // Find snippet around match
        const fullText = extractTextFromContent(ch.content);
        const idx = fullText.toLowerCase().indexOf(q);
        const snippet = idx >= 0
          ? fullText.slice(Math.max(0, idx - 40), idx + 80)
          : fullText.slice(0, 100);
        return { chapter: ch, titleMatch, snippet: snippet.replace(/^\s+/, '') + (snippet.length < fullText.length ? '...' : '') };
      })
      .filter(Boolean) as { chapter: typeof chapters[0]; titleMatch: boolean; snippet: string }[];
  }, [query, chapters]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSelect = (chapterId: string) => {
    if (!activeBook) return;
    setIsOpen(false);
    setQuery('');
    setLocation(`/book/${activeBook.id}/chapter/${chapterId}`);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search...</span>
      </button>
    );
  }

  return (
    <div ref={containerRef} className="relative w-64 sm:w-80">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm">
        <Search className="w-4 h-4 text-gray-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search chapters..."
          className="flex-1 bg-transparent text-sm outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
        />
        <button onClick={() => { setIsOpen(false); setQuery(''); }}>
          <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </button>
      </div>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
          {results.map(({ chapter, titleMatch, snippet }) => (
            <button
              key={chapter.id}
              onClick={() => handleSelect(chapter.id)}
              className="w-full text-left px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border-b border-gray-100 dark:border-slate-800 last:border-0"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                  {chapter.title}
                </span>
                {titleMatch && (
                  <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                    Title match
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 truncate">
                {snippet}
              </p>
            </button>
          ))}
        </div>
      )}

      {query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50 p-4 text-center text-sm text-gray-400">
          No results found
        </div>
      )}
    </div>
  );
}

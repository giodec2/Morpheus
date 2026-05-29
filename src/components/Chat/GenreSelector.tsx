import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { Lock } from 'lucide-react';
import { GENRES, GENRE_DESCRIPTIONS } from '@/lib/prompts/genres';
import type { WritingGenre } from '@/types';

interface GenreSelectorProps {
  activeGenre: WritingGenre;
  show: boolean;
  hoveredGenre: WritingGenre | null;
  genreDescPos: { top: number; right: number } | null;
  canUseGenres: boolean;
  onToggle: () => void;
  onSelect: (genre: WritingGenre) => void;
  onHover: (genre: WritingGenre | null, pos?: { top: number; right: number }) => void;
}

export default function GenreSelector({
  activeGenre, show, hoveredGenre, genreDescPos, canUseGenres, onToggle, onSelect, onHover,
}: GenreSelectorProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const activeConfig = GENRES.find(g => g.id === activeGenre);
  const GenreIcon = activeConfig?.icon || GENRES[0].icon;

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
      >
        <GenreIcon className={`w-4 h-4 ${activeConfig?.color}`} />
        <span className="flex-1 text-left">{activeConfig?.label}</span>
        {!canUseGenres && <Lock className="w-3 h-3 text-gray-400" />}
        <span className="text-xs text-gray-400">▼</span>
      </button>

      {show && (
        <div ref={menuRef} className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-10 overflow-hidden">
          {GENRES.map(genre => {
            const Icon = genre.icon;
            const isLocked = genre.id !== 'general' && !canUseGenres;
            return (
              <button
                key={genre.id}
                onClick={() => { onSelect(genre.id); onHover(null); }}
                onMouseEnter={() => {
                  if (menuRef.current) {
                    const rect = menuRef.current.getBoundingClientRect();
                    onHover(genre.id, { top: rect.top, right: window.innerWidth - rect.left + 8 });
                  }
                }}
                onMouseLeave={() => onHover(null)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors ${
                  activeGenre === genre.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                } ${isLocked ? 'opacity-60' : ''}`}
              >
                <Icon className={`w-4 h-4 ${genre.color}`} />
                <div className="text-left font-medium flex-1">{genre.label}</div>
                {isLocked && <Lock className="w-3 h-3 text-gray-400" />}
              </button>
            );
          })}
        </div>
      )}

      {show && hoveredGenre && GENRE_DESCRIPTIONS[hoveredGenre] && genreDescPos && createPortal(
        <div
          className="fixed z-[100] w-56 p-3 rounded-lg border shadow-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700"
          style={{ top: genreDescPos.top, right: genreDescPos.right }}
        >
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {GENRE_DESCRIPTIONS[hoveredGenre]}
          </p>
        </div>,
        document.body
      )}

      {!canUseGenres && (
        <div className="flex items-center gap-1.5 mt-1.5 px-2 py-1 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <Lock className="w-3 h-3 text-amber-500" />
          <span className="text-[10px] text-amber-700 dark:text-amber-400">
            Genre tuning locked. Upgrade to Novelist to unlock.
          </span>
        </div>
      )}
    </div>
  );
}

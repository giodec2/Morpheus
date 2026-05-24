import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
  badge?: string;
}

interface CustomSelectProps {
  value: string;
  options: Option[];
  descriptions?: Record<string, string>;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function CustomSelect({
  value,
  options,
  descriptions,
  onChange,
  placeholder = 'Select...',
  className,
  disabled,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const [descPos, setDescPos] = useState<{ top: number; right: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);
  const activeDescription = hoveredValue ? descriptions?.[hoveredValue] : null;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Update description panel position when hover changes
  useEffect(() => {
    if (!activeDescription || !menuRef.current) {
      setDescPos(null);
      return;
    }
    const menuRect = menuRef.current.getBoundingClientRect();
    setDescPos({
      top: menuRect.top,
      right: window.innerWidth - menuRect.left + 8,
    });
  }, [activeDescription, hoveredValue, isOpen, openUp]);

  const handleToggle = () => {
    if (disabled) return;
    const next = !isOpen;
    if (next && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const estimatedHeight = Math.min(options.length * 36 + 8, 240);
      setOpenUp(spaceBelow < estimatedHeight && spaceAbove > spaceBelow);
    }
    setIsOpen(next);
    setHoveredValue(null);
    setDescPos(null);
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-lg border transition-colors',
          'bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100',
          'border-gray-200 dark:border-slate-700',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span className="truncate">{selected?.label || placeholder}</span>
        <div className="flex items-center gap-2">
          {selected?.badge && (
            <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500 text-white shadow-sm">
              {selected.badge}
            </span>
          )}
          <ChevronDown
            className={cn(
              'w-4 h-4 text-gray-400 shrink-0 transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </div>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            'absolute z-50 left-0 right-0 max-h-60 overflow-y-auto rounded-lg border shadow-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700',
            openUp ? 'bottom-full mb-1' : 'top-full mt-1'
          )}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
                setHoveredValue(null);
                setDescPos(null);
              }}
              onMouseEnter={() => setHoveredValue(option.value)}
              onMouseLeave={() => setHoveredValue(null)}
              className={cn(
                'w-full flex items-center justify-between gap-2 px-3 py-2 text-sm transition-colors',
                'hover:bg-gray-50 dark:hover:bg-slate-800',
                option.value === value
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300'
              )}
            >
              <span>{option.label}</span>
              {option.badge && (
                <span className="shrink-0 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500 text-white shadow-sm">
                  {option.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Description panel — fixed positioned to escape parent clipping */}
      {isOpen && activeDescription && descPos && (
        <div
          className="fixed z-[100] w-56 p-3 rounded-lg border shadow-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700"
          style={{ top: descPos.top, right: descPos.right }}
        >
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {activeDescription}
          </p>
        </div>
      )}
    </div>
  );
}

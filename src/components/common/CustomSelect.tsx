import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '@/i18n/useI18n';
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
  placeholder,
  className,
  disabled,
}: CustomSelectProps) {
  const { t } = useI18n();
  const placeholderText = placeholder || t('actions.select');
  const [isOpen, setIsOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const [descPos, setDescPos] = useState<{ top: number; right: number } | null>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; width: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);
  const activeDescription = hoveredValue ? descriptions?.[hoveredValue] : null;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        // also allow clicks inside the ported menu
        if (menuRef.current && menuRef.current.contains(target)) return;
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close menu on window resize or scroll so the fixed position doesn't drift.
  // Allow scrolling inside the menu itself without closing.
  useEffect(() => {
    if (!isOpen) return;
    const close = () => setIsOpen(false);
    const handleScroll = (e: Event) => {
      const target = e.target as Node;
      // Don't close if the scroll originates inside the menu or the trigger container
      if (menuRef.current && menuRef.current.contains(target)) return;
      if (containerRef.current && containerRef.current.contains(target)) return;
      setIsOpen(false);
    };
    window.addEventListener('resize', close);
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('resize', close);
      window.removeEventListener('scroll', handleScroll, true);
    };
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
      const up = spaceBelow < estimatedHeight && spaceAbove > spaceBelow;
      setOpenUp(up);
      setMenuPos({
        top: up ? rect.top - estimatedHeight - 4 : rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
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
        <span className="truncate">{selected?.label || placeholderText}</span>
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

      {isOpen && menuPos && createPortal(
        <div
          ref={menuRef}
          className={cn(
            'fixed z-[100] max-h-60 overflow-y-auto rounded-lg border shadow-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700',
          )}
          style={{ top: menuPos.top, left: menuPos.left, width: menuPos.width }}
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
        </div>,
        document.body
      )}

      {/* Description panel — portal to body to escape all parent clipping */}
      {isOpen && activeDescription && descPos && createPortal(
        <div
          className="fixed z-[100] w-56 p-3 rounded-lg border shadow-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700"
          style={{ top: descPos.top, right: descPos.right }}
        >
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {activeDescription}
          </p>
        </div>,
        document.body
      )}
    </div>
  );
}

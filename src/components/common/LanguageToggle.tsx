import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useI18n } from '@/i18n/useI18n';
import { cn } from '@/lib/utils';
import type { UILocale } from '@/i18n/types';

const OPTIONS: { value: UILocale; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'it', label: 'Italiano' },
];

export default function LanguageToggle() {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const selected = OPTIONS.find((o) => o.value === locale);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          'flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors text-sm',
          'hover:bg-gray-100 dark:hover:bg-slate-800',
          isOpen && 'bg-gray-100 dark:bg-slate-800'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Change language"
      >
        <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <span className="font-semibold text-gray-700 dark:text-gray-300 hidden sm:inline">
          {selected?.label}
        </span>
        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 text-gray-500 dark:text-gray-400 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-1.5 w-40 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-1 z-50"
          role="listbox"
        >
          {OPTIONS.map((option) => (
            <button
              key={option.value}
              role="option"
              aria-selected={option.value === locale}
              onClick={() => {
                setLocale(option.value);
                setIsOpen(false);
              }}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors',
                option.value === locale
                  ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
              )}
            >
              <span>{option.label}</span>
              {option.value === locale && (
                <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

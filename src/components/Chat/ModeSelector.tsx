import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from '@/i18n/useI18n';
import { MODES, getLocalizedModes, getLocalizedModeDescriptions } from '@/lib/modes';
import type { AIMode } from '@/types';

interface ModeSelectorProps {
  activeMode: AIMode;
  show: boolean;
  hoveredMode: string | null;
  modeDescPos: { top: number; right: number } | null;
  onToggle: () => void;
  onSelect: (mode: AIMode) => void;
  onHover: (mode: string | null, pos?: { top: number; right: number }) => void;
}

export default function ModeSelector({
  activeMode, show, hoveredMode, modeDescPos, onToggle, onSelect, onHover,
}: ModeSelectorProps) {
  const { t } = useI18n();
  const menuRef = useRef<HTMLDivElement>(null);
  const localizedModes = getLocalizedModes(t);
  const modeDescriptions = getLocalizedModeDescriptions(t);
  const activeConfig = localizedModes.find(m => m.id === activeMode);
  const ActiveIcon = activeConfig?.icon || MODES[0].icon;

  return (
    <div className="relative mb-1.5">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
      >
        <ActiveIcon className={`w-4 h-4 ${activeConfig?.color}`} />
        <span className="flex-1 text-left">{activeConfig?.label}</span>
        <span className="text-xs text-gray-400">▼</span>
      </button>

      {show && (
        <div ref={menuRef} className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-10 overflow-hidden">
          {localizedModes.map(mode => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => { onSelect(mode.id); onHover(null); }}
                onMouseEnter={() => {
                  if (menuRef.current) {
                    const rect = menuRef.current.getBoundingClientRect();
                    onHover(mode.id, { top: rect.top, right: window.innerWidth - rect.left + 8 });
                  }
                }}
                onMouseLeave={() => onHover(null)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors ${
                  activeMode === mode.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                }`}
              >
                <Icon className={`w-4 h-4 ${mode.color}`} />
                <div className="text-left font-medium">{mode.label}</div>
              </button>
            );
          })}
        </div>
      )}

      {show && hoveredMode && modeDescriptions[hoveredMode] && modeDescPos && createPortal(
        <div
          className="fixed z-[100] w-56 p-3 rounded-lg border shadow-lg bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700"
          style={{ top: modeDescPos.top, right: modeDescPos.right }}
        >
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {modeDescriptions[hoveredMode]}
          </p>
        </div>,
        document.body
      )}
    </div>
  );
}

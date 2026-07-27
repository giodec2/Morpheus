import { BookOpen, MapPin, ScrollText, Feather } from 'lucide-react';
import { useI18n } from '@/i18n/useI18n';
import { getDemoScript } from './demoScript';
import { useTypewriter } from './useTypewriter';

const kindIcons = {
  elara: BookOpen,
  ashenCoast: MapPin,
  tidePact: ScrollText,
} as const;

/**
 * Hero centerpiece: a mini editor where Morpheus "writes" live, with the
 * lore bible panel lighting up as entities are typed.
 */
export default function HeroDemo() {
  const { t, locale } = useI18n();
  const script = getDemoScript(locale);
  const { visible, activeEntity, done } = useTypewriter(script.segments);

  return (
    <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4 items-stretch">
      {/* ── Editor mock ── */}
      <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-gray-900/5 dark:shadow-black/40 overflow-hidden flex flex-col">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-slate-800">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 text-xs text-gray-400 dark:text-gray-500 truncate">
            {script.bookTitle}
          </span>
        </div>
        {/* Text area */}
        <div className="flex-1 px-6 py-6 sm:px-8 sm:py-7 min-h-[220px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-4">
            {script.chapterLabel}
          </p>
          <p className="font-serif text-lg sm:text-xl leading-relaxed text-gray-800 dark:text-gray-200">
            {visible.map((seg, i) =>
              seg.entity ? (
                <span
                  key={i}
                  className={`lv2-entity text-primary-700 dark:text-primary-300 ${
                    seg.entity === activeEntity ? 'lv2-entity-active' : ''
                  }`}
                >
                  {seg.text}
                </span>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
            {!done && <span className="lv2-caret text-primary-600 dark:text-primary-400" />}
          </p>
        </div>
        {/* Status bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-t border-gray-100 dark:border-slate-800 text-xs text-gray-500 dark:text-gray-400">
          <Feather className={`w-3.5 h-3.5 ${done ? '' : 'animate-pulse'} text-primary-500`} />
          <span aria-live="polite">
            {done ? t('landingV2.hero.statusDone') : t('landingV2.hero.statusWriting')}
          </span>
        </div>
      </div>

      {/* ── Lore bible panel ── */}
      <aside className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-paper-100/60 dark:bg-slate-900/60 p-4 flex flex-col">
        <p className="px-1 pb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
          {t('landingV2.hero.lorePanelTitle')}
        </p>
        <div className="flex flex-col gap-3 flex-1">
          {script.entities.map((entity) => {
            const Icon = kindIcons[entity.id as keyof typeof kindIcons] ?? ScrollText;
            const active = entity.id === activeEntity;
            const dim = activeEntity != null && !active;
            return (
              <div
                key={entity.id}
                className={`lv2-lore-card rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3.5 ${
                  active ? 'lv2-lore-card-active' : ''
                } ${dim ? 'lv2-lore-card-dim' : ''}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${active ? 'text-primary-500' : 'text-gray-400'}`} />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {entity.name}
                  </span>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-1">
                  {entity.kind}
                </p>
                <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                  {entity.detail}
                </p>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

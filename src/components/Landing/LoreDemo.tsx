import { useState } from 'react';
import { BookOpen, MapPin, ScrollText } from 'lucide-react';
import { useI18n } from '@/i18n/useI18n';
import { getDemoScript } from './demoScript';
import Reveal from './Reveal';

const kindIcons = {
  elara: BookOpen,
  ashenCoast: MapPin,
  tidePact: ScrollText,
} as const;

/**
 * Chapter I — interactive lore demo: hover/tap underlined names in the prose
 * and the matching profile card answers.
 */
export default function LoreDemo() {
  const { t, locale } = useI18n();
  const script = getDemoScript(locale);
  const [activeId, setActiveId] = useState<string>('elara');

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* Prose with entity buttons */}
      <Reveal>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-5">
          {t('landingV2.lore.hint')}
        </p>
        <p className="font-serif text-xl sm:text-2xl leading-relaxed text-gray-800 dark:text-gray-200">
          {script.loreParagraph.map((seg, i) =>
            seg.entity ? (
              <button
                key={i}
                type="button"
                onMouseEnter={() => setActiveId(seg.entity!)}
                onFocus={() => setActiveId(seg.entity!)}
                onClick={() => setActiveId(seg.entity!)}
                className={`lv2-entity cursor-pointer font-medium text-primary-700 dark:text-primary-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                  seg.entity === activeId ? 'lv2-entity-active' : ''
                }`}
              >
                {seg.text}
              </button>
            ) : (
              <span key={i}>{seg.text}</span>
            )
          )}
        </p>
      </Reveal>

      {/* Answering cards */}
      <div className="flex flex-col gap-3">
        {script.entities.map((entity, idx) => {
          const Icon = kindIcons[entity.id as keyof typeof kindIcons] ?? ScrollText;
          const active = entity.id === activeId;
          return (
            <Reveal key={entity.id} delay={idx * 60}>
              <button
                type="button"
                onMouseEnter={() => setActiveId(entity.id)}
                onFocus={() => setActiveId(entity.id)}
                onClick={() => setActiveId(entity.id)}
                className={`lv2-lore-card w-full text-left rounded-xl border bg-white dark:bg-slate-900 p-5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                  active
                    ? 'lv2-lore-card-active border-primary-500'
                    : 'border-gray-200 dark:border-slate-800 lv2-lore-card-dim'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <Icon className={`w-5 h-5 ${active ? 'text-primary-500' : 'text-gray-400'}`} />
                  <span className="font-semibold text-gray-900 dark:text-white">{entity.name}</span>
                  <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                    {entity.kind}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {entity.detail}
                </p>
              </button>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

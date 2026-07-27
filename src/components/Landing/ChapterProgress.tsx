import { useEffect, useState } from 'react';
import { useI18n } from '@/i18n/useI18n';

export interface ChapterDef {
  id: string;
  labelKey: string;
}

interface ChapterProgressProps {
  chapters: ChapterDef[];
}

/**
 * Fixed manuscript-margin chapter indicator. Desktop only, decorative nav.
 * Scroll-spy via IntersectionObserver.
 */
export default function ChapterProgress({ chapters }: ChapterProgressProps) {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    for (const ch of chapters) {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [chapters]);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label={t('landingV2.progress.ariaLabel')}
      className="fixed left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4"
    >
      {chapters.map((ch) => {
        const active = ch.id === activeId;
        return (
          <button
            key={ch.id}
            onClick={() => jump(ch.id)}
            className={`lv2-chapter-item flex items-center gap-2.5 group cursor-pointer ${
              active ? 'lv2-chapter-item-active' : ''
            }`}
          >
            <span
              className={`lv2-chapter-dot block w-2 h-2 rounded-full ${
                active
                  ? 'bg-primary-500 scale-125'
                  : 'bg-gray-300 dark:bg-slate-700 group-hover:bg-primary-400'
              }`}
            />
            <span
              className={`lv2-chapter-label text-[10px] font-semibold uppercase tracking-[0.18em] ${
                active ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {t(ch.labelKey as never)}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

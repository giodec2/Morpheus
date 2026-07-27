import { useEffect, useState } from 'react';
import { Gift, BarChart3, Share2, Languages } from 'lucide-react';
import { useI18n } from '@/i18n/useI18n';
import { useInView } from '@/hooks/useInView';
import Reveal from './Reveal';

// Roadmap entries shown in the pricing chapter timeline.
const upcoming = [
  { icon: Gift, key: 'referral', eta: 'Q3 2026' },
  { icon: BarChart3, key: 'analytics', eta: 'Q4 2026' },
  { icon: Share2, key: 'betaSharing', eta: 'Q4 2026' },
  { icon: Languages, key: 'translations', eta: 'Q1 2027' },
] as const;

/**
 * Roadmap as an animated manuscript timeline: the line draws itself on
 * scroll, milestone dots pop in sequence, cards rise one after another.
 * Vertical on mobile, horizontal on desktop. All animation is motion-safe.
 */
export default function RoadmapSection() {
  const { t } = useI18n();
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [entranceDone, setEntranceDone] = useState(false);

  // Stagger delays are only for the entrance — clear them afterwards so
  // hover transitions respond instantly.
  useEffect(() => {
    if (!isInView) return;
    const maxDelay = 450 + (upcoming.length - 1) * 200 + 500;
    const timer = setTimeout(() => setEntranceDone(true), maxDelay);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <div className="mt-24">
      <div className="max-w-2xl mb-12">
        <Reveal>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary-600 dark:text-primary-400 mb-4">
            {t('landing.pricing.roadmap.label')}
          </p>
        </Reveal>
        <Reveal delay={60}>
          <h3 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {t('landing.pricing.roadmap.titlePrefix')}{' '}
            <em className="text-primary-600 dark:text-primary-400">
              {t('landing.pricing.roadmap.titleHighlight')}
            </em>
          </h3>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            {t('landing.pricing.roadmap.intro')}
          </p>
        </Reveal>
      </div>

      <div ref={ref} className="relative">
        {/* The timeline itself — draws in on scroll */}
        <div
          aria-hidden="true"
          className={`absolute bg-gradient-to-b lg:bg-gradient-to-r from-primary-500/50 via-primary-500/25 to-transparent
            left-3.5 top-2 bottom-2 w-px lg:left-0 lg:right-0 lg:top-3.5 lg:bottom-auto lg:w-auto lg:h-px
            origin-top lg:origin-left motion-safe:transition-transform motion-safe:duration-1000 motion-safe:ease-out ${
            isInView ? '' : 'motion-safe:scale-y-0 lg:motion-safe:scale-x-0 lg:motion-safe:scale-y-100'
          }`}
        />

        <ol className="relative flex flex-col gap-10 lg:grid lg:grid-cols-4 lg:gap-6 lg:auto-rows-fr">
          {upcoming.map((feature, idx) => {
            const Icon = feature.icon;
            const dotDelay = 350 + idx * 200;
            const cardDelay = 450 + idx * 200;
            return (
              <li key={feature.key} className="flex gap-5 lg:flex lg:flex-col">
                {/* Milestone dot — pops in sequence */}
                <div className="w-7 flex justify-center flex-shrink-0 lg:w-auto lg:h-7 lg:items-center lg:mb-6">
                  <span
                    className={`relative flex w-3.5 h-3.5 motion-safe:transition-transform motion-safe:duration-300 ${
                      isInView ? '' : 'motion-safe:scale-0'
                    }`}
                    style={{ transitionDelay: `${dotDelay}ms` }}
                  >
                    <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-30" />
                    <span className="relative inline-flex rounded-full w-3.5 h-3.5 border-2 border-primary-500 bg-paper-50 dark:bg-slate-950" />
                  </span>
                </div>

                {/* Milestone card — rises after its dot, then stays alive on hover */}
                <div
                  className={`group relative flex-1 lg:flex lg:flex-col rounded-2xl border border-gray-300 dark:border-slate-700
                    bg-gradient-to-br from-primary-50/60 via-white to-white dark:from-primary-900/20 dark:via-slate-900 dark:to-slate-900 p-6
                    shadow-sm shadow-gray-200/60 dark:shadow-black/30 overflow-hidden
                    transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-primary-900/30
                    hover:border-primary-300 dark:hover:border-primary-600 ${
                    isInView ? '' : 'motion-safe:opacity-0 motion-safe:translate-y-6'
                  }`}
                  style={{ transitionDelay: entranceDone ? undefined : `${cardDelay}ms` }}
                >
                  {/* Accent line — brightens on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-teal-400 to-primary-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-200 to-primary-100 dark:from-primary-800/40 dark:to-primary-900/20 flex items-center justify-center shadow-sm shadow-primary-200/50 dark:shadow-primary-900/20 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-primary-700 dark:text-primary-300" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 px-2.5 py-1 rounded-full whitespace-nowrap shadow-sm shadow-primary-100/50 dark:shadow-primary-900/20">
                      {feature.eta}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-semibold tracking-tight text-gray-900 dark:text-white mb-1.5">
                    {t(`landing.pricing.roadmap.${feature.key}Title` as never)}
                  </h4>
                  <p className="text-[13px] leading-relaxed text-gray-600 dark:text-gray-400 flex-1">
                    {t(`landing.pricing.roadmap.${feature.key}Desc` as never)}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

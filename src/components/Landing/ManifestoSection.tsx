import { CodeXml } from 'lucide-react';
import { useI18n } from '@/i18n/useI18n';
import Reveal from './Reveal';

const PILLAR_KEYS = ['openSource', 'noTraining', 'byok', 'localFirst', 'gdpr', 'flatFee'] as const;

/**
 * Chapter III — the trust pillars as an editorial manifesto:
 * numbered statements, staggered reveals, verifiable on GitHub.
 */
export default function ManifestoSection() {
  const { t } = useI18n();

  return (
    <div>
      <div className="max-w-2xl">
        <Reveal>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {t('landingV2.manifesto.title')}
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
            {t('landingV2.manifesto.intro')}
          </p>
        </Reveal>
      </div>

      <div className="mt-14 border-t border-gray-200 dark:border-slate-800">
        {PILLAR_KEYS.map((key, idx) => (
          <Reveal key={key} delay={idx * 40}>
            <article className="group grid sm:grid-cols-[auto_1fr_auto] gap-x-8 gap-y-2 items-baseline py-7 border-b border-gray-200 dark:border-slate-800">
              <span className="font-serif text-2xl text-primary-500/60 dark:text-primary-400/50 tabular-nums">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-200">
                  {t(`landing.trust.pillars.${key}.title` as never)}
                </h3>
                <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {t(`landing.trust.pillars.${key}.description` as never)}
                </p>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 px-3 py-1.5 rounded-full whitespace-nowrap">
                {t(`landing.trust.pillars.${key}.badge` as never)}
              </span>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120} className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href="https://github.com/giodec2/Morpheus"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
        >
          <CodeXml className="w-4 h-4" />
          {t('landing.trust.auditCode')}
        </a>
        <p className="text-xs text-gray-400 dark:text-gray-500">{t('landing.trust.footer')}</p>
      </Reveal>
    </div>
  );
}

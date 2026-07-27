import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'wouter';
import { useI18n } from '@/i18n/useI18n';
import Reveal from './Reveal';

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const;

/**
 * Chapter V — FAQ as a quiet accordion.
 */
export default function FaqSection() {
  const { t } = useI18n();
  const [openKey, setOpenKey] = useState<string | null>('q1');

  return (
    <div className="max-w-3xl mx-auto">
      <Reveal className="text-center mb-12">
        <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {t('landingV2.faq.title')}
        </h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">{t('landingV2.faq.intro')}</p>
      </Reveal>

      <div className="border-t border-gray-200 dark:border-slate-800">
        {FAQ_KEYS.map((key, idx) => {
          const open = openKey === key;
          return (
            <Reveal key={key} delay={idx * 30}>
              <div className="border-b border-gray-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setOpenKey(open ? null : key)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
                >
                  <span className="font-serif text-lg sm:text-xl font-medium text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                    {t(`landing.faq.${key}.question` as never)}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                      open ? 'rotate-180 text-primary-500' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-8 text-sm sm:text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {t(`landing.faq.${key}.answer` as never)}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={100} className="mt-8 text-center">
        <Link
          href="/faq"
          className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline underline-offset-4"
        >
          {t('landing.faq.allQuestions')} →
        </Link>
      </Reveal>
    </div>
  );
}

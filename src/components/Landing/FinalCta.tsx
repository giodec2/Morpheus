import { useI18n } from '@/i18n/useI18n';
import { useAuthStore } from '@/stores/authStore';
import { Link } from 'wouter';
import Reveal from './Reveal';

interface FinalCtaProps {
  onStartFree: () => void;
}

/** Closing section — the last page of the manuscript. */
export default function FinalCta({ onStartFree }: FinalCtaProps) {
  const { t } = useI18n();
  const { user } = useAuthStore();

  return (
    <div className="text-center max-w-3xl mx-auto">
      <Reveal>
        <h2 className="font-serif text-5xl sm:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white leading-tight">
          {t('landingV2.finalCta.title')}
          <br />
          <em className="text-primary-600 dark:text-primary-400">{t('landingV2.finalCta.titleEm')}</em>
        </h2>
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-6 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          {t('landing.cta.subheadline')}
        </p>
      </Reveal>
      <Reveal delay={180} className="mt-10">
        {user ? (
          <Link href="/app">
            <button className="btn-primary px-8 py-4 text-base font-semibold">
              {t('landing.cta.openApp')}
            </button>
          </Link>
        ) : (
          <button
            onClick={onStartFree}
            className="btn-primary px-8 py-4 text-base font-semibold shadow-xl shadow-primary-500/25 hover:shadow-2xl hover:shadow-primary-500/30 transition-shadow"
          >
            {t('landing.cta.startFree')}
          </button>
        )}
        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">{t('landing.cta.note')}</p>
      </Reveal>
    </div>
  );
}

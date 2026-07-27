import { useMemo, useState } from 'react';
import { useI18n } from '@/i18n/useI18n';
import { GENRE_KEYS, getDemoScript } from './demoScript';
import { useTypewriter } from './useTypewriter';
import Reveal from './Reveal';

/**
 * Chapter II — genre voice switcher: pick a genre, the same scene is
 * re-typed in that genre's voice.
 */
export default function GenreDemo() {
  const { t, locale } = useI18n();
  const script = getDemoScript(locale);
  const [genre, setGenre] = useState<(typeof GENRE_KEYS)[number]>('fantasy');

  const sentence = script.genreVoices[genre] ?? script.genreVoices.generalFiction;
  const segments = useMemo(() => [{ text: sentence }], [sentence]);
  const { visible, done } = useTypewriter(segments, { loop: false });

  return (
    <div>
      {/* Genre chips */}
      <Reveal className="flex flex-wrap gap-2 mb-10">
        {GENRE_KEYS.map((key) => {
          const active = key === genre;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setGenre(key)}
              aria-pressed={active}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                active
                  ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-500/25'
                  : 'border-gray-300 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 bg-white/60 dark:bg-slate-900/60'
              }`}
            >
              {t(`landing.genres.${key}.name` as never)}
            </button>
          );
        })}
      </Reveal>

      {/* Quote card */}
      <Reveal delay={100}>
        <figure className="relative max-w-3xl mx-auto rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 py-10 sm:px-12 shadow-xl shadow-gray-900/5 dark:shadow-black/40">
          <span
            aria-hidden="true"
            className="lv2-quote-mark absolute -top-2 left-7 text-[80px] text-primary-500/30"
          >
            “
          </span>
          <blockquote className="font-serif text-xl sm:text-2xl leading-relaxed text-gray-800 dark:text-gray-200 min-h-[7rem]">
            {visible.map((seg, i) => (
              <span key={i}>{seg.text}</span>
            ))}
            {!done && <span className="lv2-caret text-primary-600 dark:text-primary-400" />}
          </blockquote>
          <figcaption className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
            {t('landingV2.genres.quoteLabel', { genre: t(`landing.genres.${genre}.name` as never) })}
          </figcaption>
        </figure>
      </Reveal>

      <Reveal delay={160}>
        <p className="mt-5 text-center text-xs text-gray-400 dark:text-gray-500">
          {t('landingV2.genres.modelNote')}
        </p>
      </Reveal>
    </div>
  );
}

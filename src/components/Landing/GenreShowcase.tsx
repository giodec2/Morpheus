import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Heart,
  Flame,
  Rocket,
  Wand2,
  Glasses,
  Landmark,
  Sunrise,
} from 'lucide-react';
import { useI18n } from '@/i18n/useI18n';

const genreDefs = [
  {
    key: 'generalFiction',
    icon: BookOpen,
    color: 'from-gray-500 to-slate-400',
    bgColor: 'bg-gray-50 dark:bg-gray-900/10',
    borderColor: 'border-gray-200 dark:border-gray-800/50',
    textColor: 'text-gray-700 dark:text-gray-300',
    iconBg: 'bg-gray-100 dark:bg-gray-800/40',
  },
  {
    key: 'crimeMystery',
    icon: Search,
    color: 'from-slate-500 to-zinc-400',
    bgColor: 'bg-slate-50 dark:bg-slate-900/10',
    borderColor: 'border-slate-200 dark:border-slate-800/50',
    textColor: 'text-slate-700 dark:text-slate-300',
    iconBg: 'bg-slate-100 dark:bg-slate-800/40',
  },
  {
    key: 'romance',
    icon: Heart,
    color: 'from-rose-500 to-pink-400',
    bgColor: 'bg-rose-50 dark:bg-rose-900/10',
    borderColor: 'border-rose-200 dark:border-rose-800/50',
    textColor: 'text-rose-700 dark:text-rose-300',
    iconBg: 'bg-rose-100 dark:bg-rose-800/40',
  },
  {
    key: 'thrillerHorror',
    icon: Flame,
    color: 'from-orange-500 to-red-400',
    bgColor: 'bg-orange-50 dark:bg-orange-900/10',
    borderColor: 'border-orange-200 dark:border-orange-800/50',
    textColor: 'text-orange-700 dark:text-orange-300',
    iconBg: 'bg-orange-100 dark:bg-orange-800/40',
  },
  {
    key: 'scienceFiction',
    icon: Rocket,
    color: 'from-cyan-500 to-blue-400',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/10',
    borderColor: 'border-cyan-200 dark:border-cyan-800/50',
    textColor: 'text-cyan-700 dark:text-cyan-300',
    iconBg: 'bg-cyan-100 dark:bg-cyan-800/40',
  },
  {
    key: 'fantasy',
    icon: Wand2,
    color: 'from-violet-500 to-purple-400',
    bgColor: 'bg-violet-50 dark:bg-violet-900/10',
    borderColor: 'border-violet-200 dark:border-violet-800/50',
    textColor: 'text-violet-700 dark:text-violet-300',
    iconBg: 'bg-violet-100 dark:bg-violet-800/40',
  },
  {
    key: 'literaryFiction',
    icon: Glasses,
    color: 'from-emerald-500 to-teal-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/10',
    borderColor: 'border-emerald-200 dark:border-emerald-800/50',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-800/40',
  },
  {
    key: 'historicalFiction',
    icon: Landmark,
    color: 'from-amber-500 to-yellow-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/10',
    borderColor: 'border-amber-200 dark:border-amber-800/50',
    textColor: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-800/40',
  },
  {
    key: 'youngAdult',
    icon: Sunrise,
    color: 'from-sky-500 to-blue-400',
    bgColor: 'bg-sky-50 dark:bg-sky-900/10',
    borderColor: 'border-sky-200 dark:border-sky-800/50',
    textColor: 'text-sky-700 dark:text-sky-300',
    iconBg: 'bg-sky-100 dark:bg-sky-800/40',
  },
];

function GenreCard({
  genre,
  index,
}: {
  genre: typeof genreDefs[0];
  index: number;
}) {
  const { t } = useI18n();
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [entered, setEntered] = useState(false);
  const Icon = genre.icon;

  useEffect(() => {
    if (isInView && !entered) {
      const timer = setTimeout(() => setEntered(true), index * 80);
      return () => clearTimeout(timer);
    }
  }, [isInView, entered, index]);

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border ${genre.borderColor} ${genre.bgColor} p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
        isInView && entered
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl ${genre.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className={`w-6 h-6 ${genre.textColor}`} />
      </div>

      {/* Genre name with gradient underline on hover */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        {t(`landing.genres.${genre.key}.name` as never)}
        <span
          className={`h-0.5 w-0 group-hover:w-6 bg-gradient-to-r ${genre.color} transition-all duration-500 rounded-full`}
        />
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {t(`landing.genres.${genre.key}.description` as never)}
      </p>
    </div>
  );
}

export default function GenreShowcase() {
  const { t } = useI18n();
  const { ref: titleRef, isInView: titleInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
  });

  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary-500/3 blur-3xl" />
        <div
          className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-teal-500/3 blur-3xl"
          style={{ animation: 'drift 22s ease-in-out infinite' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          ref={titleRef}
          className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-1000 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-4">
            {t('landing.genres.label')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
            {t('landing.genres.titlePrefix')}{' '}
            <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
              {t('landing.genres.titleHighlight')}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t('landing.genres.intro')}
          </p>
        </div>

        {/* Genre grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {genreDefs.map((genre, index) => (
            <GenreCard key={genre.key} genre={genre} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

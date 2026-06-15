import { MessageSquare, Users, Shield, Zap, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useI18n } from '@/i18n/useI18n';

const featureDefs = [
  {
    icon: MessageSquare,
    key: 'loreBible',
    gradient: 'from-primary-500 to-teal-400',
    shadow: 'shadow-primary-500/20',
  },
  {
    icon: Users,
    key: 'structured',
    gradient: 'from-amber-500 to-orange-400',
    shadow: 'shadow-amber-500/20',
  },
  {
    icon: Shield,
    key: 'ownership',
    gradient: 'from-emerald-500 to-teal-400',
    shadow: 'shadow-emerald-500/20',
  },
  {
    icon: Zap,
    key: 'engine',
    gradient: 'from-purple-500 to-pink-400',
    shadow: 'shadow-purple-500/20',
  },
];

function FeatureCard({ feature, index }: { feature: typeof featureDefs[0]; index: number }) {
  const { t } = useI18n();
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [entered, setEntered] = useState(false);
  const Icon = feature.icon;

  useEffect(() => {
    if (isInView && !entered) {
      const timer = setTimeout(() => setEntered(true), index * 150);
      return () => clearTimeout(timer);
    }
  }, [isInView, entered, index]);

  return (
    <div
      ref={ref}
      className={`group relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${feature.shadow} ${
        isInView && entered
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Top gradient bar with shimmer */}
      <div className={`absolute top-0 left-4 right-4 h-1 rounded-b-full bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div
        className={`absolute top-0 left-4 right-4 h-1 rounded-b-full opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s linear infinite',
        }}
      />

      {/* Icon */}
      <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
        <Icon className="w-7 h-7 text-white" />

        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 -z-10`} />
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {t(`landing.features.${feature.key}Title` as never)}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {t(`landing.features.${feature.key}Desc` as never)}
      </p>

      {/* Corner decoration */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-xs font-bold text-gray-400 dark:text-gray-600">0{index + 1}</span>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const { t } = useI18n();
  const { ref: titleRef, isInView: titleInView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [, setLocation] = useLocation();

  return (
    <section id="features" className="py-28 md:py-36 relative">
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(20,184,166,0.3) 25%, rgba(99,102,241,0.2) 50%, rgba(20,184,166,0.3) 75%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 8s linear infinite',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-1000 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-4">
            {t('landing.features.label')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
            {t('landing.features.titlePrefix')}{' '}
            <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
              {t('landing.features.titleHighlight')}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t('landing.features.intro')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {featureDefs.map((feature, index) => (
            <FeatureCard key={feature.key} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA after features */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setLocation('/app')}
            className="group btn-primary text-base px-8 py-4 inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
          >
            {t('landing.cta.startFree')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-500">{t('landing.cta.noCreditCard')}</p>
        </div>
      </div>
    </section>
  );
}

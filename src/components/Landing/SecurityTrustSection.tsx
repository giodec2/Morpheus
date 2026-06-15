import {
  Code2,
  ShieldCheck,
  KeyRound,
  HardDrive,
  Scale,
  Receipt,
  ArrowRight,
  Feather,
} from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';
import AuthModal from '@/components/Auth/AuthModal';
import { useLocation } from 'wouter';
import { useI18n } from '@/i18n/useI18n';

const pillarDefs = [
  {
    icon: Code2,
    key: 'openSource',
    gradient: 'from-primary-500 via-teal-400 to-emerald-400',
    shadow: 'shadow-primary-500/20',
  },
  {
    icon: ShieldCheck,
    key: 'noTraining',
    gradient: 'from-emerald-500 via-teal-400 to-cyan-400',
    shadow: 'shadow-emerald-500/20',
  },
  {
    icon: KeyRound,
    key: 'byok',
    gradient: 'from-amber-500 via-orange-400 to-rose-400',
    shadow: 'shadow-amber-500/20',
  },
  {
    icon: HardDrive,
    key: 'localFirst',
    gradient: 'from-purple-500 via-violet-400 to-pink-400',
    shadow: 'shadow-purple-500/20',
  },
  {
    icon: Scale,
    key: 'gdpr',
    gradient: 'from-blue-500 via-indigo-400 to-violet-400',
    shadow: 'shadow-blue-500/20',
  },
  {
    icon: Receipt,
    key: 'flatFee',
    gradient: 'from-rose-500 via-pink-400 to-fuchsia-400',
    shadow: 'shadow-rose-500/20',
  },
];

function TrustCard({ pillar, index }: { pillar: typeof pillarDefs[0]; index: number }) {
  const { t } = useI18n();
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [entered, setEntered] = useState(false);
  const Icon = pillar.icon;

  useEffect(() => {
    if (isInView && !entered) {
      const timer = setTimeout(() => setEntered(true), index * 120);
      return () => clearTimeout(timer);
    }
  }, [isInView, entered, index]);

  return (
    <div
      ref={ref}
      className={`group relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${pillar.shadow} ${
        isInView && entered
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Top gradient bar */}
      <div
        className={`absolute top-0 left-4 right-4 h-1 rounded-b-full bg-gradient-to-r ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Badge */}
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-5 bg-gradient-to-r ${pillar.gradient} bg-opacity-10 text-white`}
        style={{ background: 'transparent' }}
      >
        <span
          className={`px-2.5 py-0.5 rounded-full bg-gradient-to-r ${pillar.gradient} text-white`}
        >
          {t(`landing.trust.pillars.${pillar.key}.badge` as never)}
        </span>
      </div>

      {/* Icon */}
      <div
        className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>

      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {t(`landing.trust.pillars.${pillar.key}.title` as never)}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {t(`landing.trust.pillars.${pillar.key}.description` as never)}
      </p>

      {/* Corner number */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-xs font-bold text-gray-400 dark:text-gray-600">
          0{index + 1}
        </span>
      </div>
    </div>
  );
}

export default function SecurityTrustSection() {
  const { t } = useI18n();
  const { ref: titleRef, isInView: titleInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
  });
  const [showAuth, setShowAuth] = useState(false);
  const [, navigate] = useLocation();

  return (
    <section id="trust" className="py-28 md:py-36 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-emerald-500/5 blur-3xl" />
        <div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-primary-500/3 blur-3xl"
          style={{ animation: 'drift 25s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/3 blur-3xl"
          style={{ animation: 'drift 20s ease-in-out infinite 5s' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-1000 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-4">
            {t('landing.trust.label')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
            {t('landing.trust.titlePrefix')}{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              {t('landing.trust.titleHighlight')}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t('landing.trust.intro')}
          </p>
        </div>

        {/* Trust pillars grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillarDefs.map((pillar, index) => (
            <TrustCard key={pillar.key} pillar={pillar} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div
            className={`inline-flex flex-col sm:flex-row items-center gap-4 transition-all duration-1000 delay-300 ${
              titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button
              onClick={() => setShowAuth(true)}
              className="group btn-primary text-base px-8 py-4 inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
            >
              <Feather className="w-4 h-4" />
              {t('landing.cta.startFree')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="https://github.com/giodec2/Morpheus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <Code2 className="w-4 h-4" />
              {t('landing.trust.auditCode')}
            </a>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-500">
            {t('landing.trust.footer')}
          </p>
        </div>
      </div>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => navigate('/app')}
        />
      )}
    </section>
  );
}

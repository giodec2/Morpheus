import { Link } from 'wouter';
import { useAuthStore } from '@/stores/authStore';
import { ArrowRight, Feather } from 'lucide-react';
import AuthModal from '@/components/Auth/AuthModal';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { useI18n } from '@/i18n/useI18n';

export default function CTABanner() {
  const { t } = useI18n();
  const { user } = useAuthStore();
  const [showAuth, setShowAuth] = useState(false);
  const [, navigate] = useLocation();

  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-teal-600 to-primary-700">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)',
            animation: 'gradient-shift 8s ease infinite',
            backgroundSize: '200% 200%',
          }}
        />
        {/* Floating shapes with varied drift patterns */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10 blur-xl" style={{ animation: 'drift 14s ease-in-out infinite' }} />
        <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-white/10 blur-xl" style={{ animation: 'drift 18s ease-in-out infinite 3s' }} />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-white/5 blur-lg" style={{ animation: 'drift 10s ease-in-out infinite 1.5s' }} />
        <div className="absolute top-20 right-1/4 w-12 h-12 rounded-full bg-white/5 blur-lg hidden md:block" style={{ animation: 'drift 16s ease-in-out infinite 5s' }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          {t('landing.badge.launchPricing')}
        </div>

        <Feather className="w-14 h-14 text-white/80 mx-auto mb-8" />

        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          {t('landing.cta.headlinePrefix')}<br />
          <span className="text-primary-200">{t('landing.cta.headlineHighlight')}</span>
        </h2>

        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
          {t('landing.cta.subheadline')}
        </p>

        {user ? (
          <Link href="/app">
            <button className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-700 rounded-2xl font-bold text-lg hover:bg-primary-50 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-2xl shadow-black/20">
              {t('landing.cta.openApp')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        ) : (
          <button
            onClick={() => setShowAuth(true)}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-700 rounded-2xl font-bold text-lg hover:bg-primary-50 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-2xl shadow-black/20"
          >
            {t('landing.cta.startFree')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        <p className="mt-6 text-sm text-white/60">
          {t('landing.cta.note')}
        </p>
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

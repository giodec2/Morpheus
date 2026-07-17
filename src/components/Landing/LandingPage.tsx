import { useEffect, useState } from 'react';
import LandingNavbar from './LandingNavbar';
import HeroSection from './HeroSection';
import TrustBar from './TrustBar';
import FeaturesSection from './FeaturesSection';
import SecurityTrustSection from './SecurityTrustSection';
import GenreShowcase from './GenreShowcase';

import PricingSection from './PricingSection';
import FAQSection from './FAQSection';
import CTABanner from './CTABanner';
import Footer from './Footer';
import AuthModal from '@/components/Auth/AuthModal';
import { useLocation } from 'wouter';
import { useI18n } from '@/i18n/useI18n';
import { useSeo } from '@/lib/seo';
import { buildLandingFaqJsonLd } from '@/lib/faqSchema';

const landingFaqJsonLd = buildLandingFaqJsonLd();

export default function LandingPage() {
  const { t } = useI18n();
  useSeo({ path: '/', jsonLd: landingFaqJsonLd });
  const [showAuth, setShowAuth] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    document.body.classList.add('landing');
    document.body.classList.remove('app');
    return () => {
      document.body.classList.remove('landing');
    };
  }, []);

  const scrollToSection = (hash: string) => {
    const id = hash.startsWith('#') ? hash.slice(1) : hash;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <LandingNavbar onNavigate={scrollToSection} />
      <main id="main-content">
        <HeroSection onScrollTo={scrollToSection} />
        <TrustBar />
        <FeaturesSection />
        <SecurityTrustSection />
        <GenreShowcase />
        <PricingSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-t border-gray-200 dark:border-slate-800 md:hidden">
        <button
          onClick={() => setShowAuth(true)}
          className="w-full btn-primary py-3 text-base font-semibold"
        >
          {t('landing.cta.startFree')}
        </button>
        <p className="text-center text-[10px] text-gray-400 mt-1.5">{t('landing.cta.noCreditCard')}</p>
      </div>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => navigate('/app')}
        />
      )}
    </div>
  );
}

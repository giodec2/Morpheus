import { useEffect } from 'react';
import LandingNavbar from './LandingNavbar';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import PricingSection from './PricingSection';
import CTABanner from './CTABanner';
import Footer from './Footer';

export default function LandingPage() {
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
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}

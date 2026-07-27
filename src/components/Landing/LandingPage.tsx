import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import LandingNavbar from './LandingNavbar';
import Footer from './Footer';
import AuthModal from '@/components/Auth/AuthModal';
import { useI18n } from '@/i18n/useI18n';
import { useSeo } from '@/lib/seo';
import { buildLandingFaqJsonLd } from '@/lib/faqSchema';
import { useAuthStore } from '@/stores/authStore';
import ChapterProgress from './ChapterProgress';
import HeroDemo from './HeroDemo';
import LoreDemo from './LoreDemo';
import GenreDemo from './GenreDemo';
import ManifestoSection from './ManifestoSection';
import PricingSection from './PricingSection';
import RoadmapSection from './RoadmapSection';
import FaqSection from './FaqSection';
import FinalCta from './FinalCta';
import Reveal from './Reveal';
import './landing.css';

const landingFaqJsonLd = buildLandingFaqJsonLd();

const CHAPTERS = [
  { id: 'prologue', labelKey: 'landingV2.chapters.hero' },
  { id: 'features', labelKey: 'landingV2.chapters.lore' },
  { id: 'genres', labelKey: 'landingV2.chapters.genres' },
  { id: 'trust', labelKey: 'landingV2.chapters.manifesto' },
  { id: 'pricing', labelKey: 'landingV2.chapters.pricing' },
  { id: 'faq', labelKey: 'landingV2.chapters.faq' },
];

function ChapterHeading({ labelKey, titleKey }: { labelKey: string; titleKey: string }) {
  const { t } = useI18n();
  return (
    <div className="max-w-2xl mb-14">
      <Reveal>
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary-600 dark:text-primary-400 mb-4">
          {t(labelKey as never)}
        </p>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {t(titleKey as never)}
        </h2>
      </Reveal>
    </div>
  );
}

export default function LandingPage() {
  const { t } = useI18n();
  useSeo({ path: '/', jsonLd: landingFaqJsonLd });
  const [showAuth, setShowAuth] = useState(false);
  const [, navigate] = useLocation();
  const { user } = useAuthStore();

  useEffect(() => {
    document.body.classList.add('landing');
    document.body.classList.remove('app');
    return () => {
      document.body.classList.remove('landing');
    };
  }, []);

  const scrollToSection = (hash: string) => {
    const id = hash.startsWith('#') ? hash.slice(1) : hash;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-paper-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
      <LandingNavbar onNavigate={scrollToSection} />
      <ChapterProgress chapters={CHAPTERS} />

      <main id="main-content">
        {/* ── Prologue — hero with live co-writing demo ── */}
        <section id="prologue" className="lv2-paper relative pt-32 pb-24 px-6 scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <Reveal>
                <p className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 px-4 py-1.5 rounded-full mb-8">
                  {t('landing.badge.earlyAccess')}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
                  {t('landingV2.hero.headlineA')}{' '}
                  <em className="text-primary-600 dark:text-primary-400">
                    {t('landingV2.hero.headlineEm')}
                  </em>{' '}
                  {t('landingV2.hero.headlineB')}
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 text-lg sm:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
                  {t('landingV2.hero.sub')}
                </p>
              </Reveal>
              <Reveal delay={240} className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {user ? (
                  <button onClick={() => navigate('/app')} className="btn-primary px-7 py-3.5 text-base font-semibold">
                    {t('landing.cta.openApp')}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowAuth(true)}
                    className="btn-primary px-7 py-3.5 text-base font-semibold shadow-xl shadow-primary-500/25"
                  >
                    {t('landing.cta.startFree')}
                  </button>
                )}
                <button
                  onClick={() => scrollToSection('#features')}
                  className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                >
                  {t('landingV2.hero.scrollHint')} ↓
                </button>
              </Reveal>
            </div>
            <Reveal delay={300}>
              <HeroDemo />
            </Reveal>
          </div>
        </section>

        {/* ── Chapter I — interactive lore demo ── */}
        <section id="features" className="py-28 px-6 scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <ChapterHeading labelKey="landingV2.chapters.lore" titleKey="landingV2.lore.title" />
            <Reveal delay={100} className="max-w-2xl -mt-8 mb-14">
              <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                {t('landingV2.lore.intro')}
              </p>
            </Reveal>
            <LoreDemo />
          </div>
        </section>

        {/* ── Chapter II — genre voices ── */}
        <section id="genres" className="py-28 px-6 lv2-paper scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <ChapterHeading labelKey="landingV2.chapters.genres" titleKey="landingV2.genres.title" />
            <Reveal delay={100} className="max-w-2xl -mt-8 mb-14">
              <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                {t('landingV2.genres.intro')}
              </p>
            </Reveal>
            <GenreDemo />
          </div>
        </section>

        {/* ── Chapter III — manifesto (trust & open source) ── */}
        <section id="trust" className="py-28 px-6 scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary-600 dark:text-primary-400 mb-4">
                {t('landingV2.chapters.manifesto')}
              </p>
            </Reveal>
            <ManifestoSection />
          </div>
        </section>

        {/* ── Chapter IV — pricing ── */}
        <section id="pricing" className="py-28 px-6 lv2-paper scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary-600 dark:text-primary-400 mb-4">
                {t('landingV2.chapters.pricing')}
              </p>
            </Reveal>
            <PricingSection />
            <RoadmapSection />
          </div>
        </section>

        {/* ── Chapter V — FAQ ── */}
        <section id="faq" className="py-28 px-6 scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary-600 dark:text-primary-400 mb-4 text-center">
                {t('landingV2.chapters.faq')}
              </p>
            </Reveal>
            <FaqSection />
          </div>
        </section>

        {/* ── Epilogue — final CTA ── */}
        <section className="py-32 px-6 lv2-paper border-t border-gray-200 dark:border-slate-800">
          <FinalCta onStartFree={() => setShowAuth(true)} />
        </section>
      </main>

      <Footer />

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-paper-50/90 dark:bg-slate-950/90 backdrop-blur-md border-t border-gray-200 dark:border-slate-800 md:hidden">
        <button
          onClick={() => (user ? navigate('/app') : setShowAuth(true))}
          className="w-full btn-primary py-3 text-base font-semibold"
        >
          {user ? t('landing.cta.openApp') : t('landing.cta.startFree')}
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

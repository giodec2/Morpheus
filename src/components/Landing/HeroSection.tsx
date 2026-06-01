import { useSettingsStore } from '@/stores/settingsStore';
import { useAuthStore } from '@/stores/authStore';
import { Link } from 'wouter';
import { ArrowRight, Sparkles, Feather, Clock, Shield } from 'lucide-react';
import { useLocation } from 'wouter';

import AuthModal from '@/components/Auth/AuthModal';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  onScrollTo?: (id: string) => void;
}

export default function HeroSection({ onScrollTo }: HeroSectionProps) {
  const { user } = useAuthStore();
  const { theme } = useSettingsStore();
  const [, navigate] = useLocation();
  const [showAuth, setShowAuth] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-24 pb-8 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute inset-0 transition-colors duration-1000 ${
          isDark
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-primary-950/30'
            : 'bg-gradient-to-br from-primary-50/40 via-white to-paper-50'
        }`} />

        {/* Aurora flow overlay */}
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            background: 'linear-gradient(90deg, rgba(20,184,166,0.08) 0%, rgba(99,102,241,0.06) 25%, rgba(245,158,11,0.05) 50%, rgba(20,184,166,0.08) 75%, rgba(99,102,241,0.06) 100%)',
            backgroundSize: '400% 100%',
            animation: 'aurora-flow 20s ease-in-out infinite',
          }}
        />

        {/* Blob 1 - top right */}
        <div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-20 dark:opacity-[0.15]"
          style={{
            background: 'radial-gradient(circle, rgba(20,184,166,0.5) 0%, transparent 70%)',
            animation: 'blob 20s ease-in-out infinite',
          }}
        />
        {/* Blob 2 - bottom left */}
        <div
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] opacity-[0.15] dark:opacity-[0.10]"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
            animation: 'blob 25s ease-in-out infinite reverse',
          }}
        />
        {/* Blob 3 - center blur */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] opacity-[0.10] dark:opacity-[0.08]"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)',
            animation: 'blob 18s ease-in-out infinite 2s',
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Ambient dust particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary-400/20 dark:bg-primary-400/15"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `drift ${12 + i * 4}s ease-in-out infinite ${i * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* ─── Headline + CTAs (centered) ─── */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/80 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-xs font-semibold mb-8 border border-primary-200 dark:border-primary-800 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Be among the first to write with Morpheus
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.08] tracking-tight mb-6">
            The AI Co-Writer That{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary-600 dark:text-primary-400">Remembers</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 240 12" fill="none" preserveAspectRatio="none">
                <path d="M2 8C60 2 180 2 238 8" stroke="currentColor" strokeWidth="4" className="text-primary-400/40 dark:text-primary-500/30" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary-600 via-teal-500 to-primary-400 bg-clip-text text-transparent">
              Every Character, Every Plot
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            Plan worlds, develop characters, and write chapters in half the time.
            Morpheus reads your lore bible so every suggestion stays true to your vision —
            <span className="font-semibold text-gray-700 dark:text-gray-300"> no generic AI fluff.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {user ? (
              <Link href="/app">
                <button className="group btn-primary text-base px-8 py-4 flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40">
                  Open the App
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="group btn-primary text-base px-8 py-4 flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
              >
                Start Writing Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            <button
              onClick={() => onScrollTo?.('how-it-works')}
              className="btn-secondary text-base px-8 py-4 flex items-center justify-center hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
            >
              See How It Works
            </button>
          </div>

          {/* Credibility bar */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Feather className="w-4 h-4 text-primary-500" />
              <span>Built for <span className="font-semibold text-gray-700 dark:text-gray-300">novelists</span> who world-build</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4 text-primary-500" />
              <span>Cut drafting time <span className="font-semibold text-gray-700 dark:text-gray-300">in half</span></span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
              <Shield className="w-4 h-4 text-primary-500" />
              <span><span className="font-semibold text-gray-700 dark:text-gray-300">Your creations stay yours</span></span>
            </div>
          </div>
        </div>

        {/* ─── Product screenshot (full-width, below headline) ─── */}
        <div className={`relative mt-14 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative max-w-6xl mx-auto">
            {/* Glow behind image */}
            <div className="absolute -inset-2 -z-10 rounded-[2rem] bg-primary-500/10 blur-3xl opacity-50" />

            {/* Light mode screenshot */}
            <img
              src="/assets/hero-editor.png"
              alt="Morpheus editor with AI co-writer — writing The Cartographer of Lost Things"
              className={`w-full rounded-2xl border border-gray-200/60 dark:border-slate-700/60 shadow-2xl shadow-black/10 dark:shadow-black/30 transition-opacity duration-700 ${isDark ? 'opacity-0 absolute inset-0' : 'opacity-100 relative'}`}
              loading="eager"
            />
            {/* Dark mode screenshot */}
            <img
              src="/assets/hero-editor-dark.png"
              alt="Morpheus editor in dark mode with AI co-writer"
              className={`w-full rounded-2xl border border-gray-200/60 dark:border-slate-700/60 shadow-2xl shadow-black/10 dark:shadow-black/30 transition-opacity duration-700 ${isDark ? 'opacity-100 relative' : 'opacity-0 absolute inset-0'}`}
              loading="eager"
            />

            {/* Bottom fade — blends image into the page below */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-950 to-transparent rounded-b-2xl pointer-events-none" />
          </div>
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

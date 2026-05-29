import { useSettingsStore } from '@/stores/settingsStore';
import { useAuthStore } from '@/stores/authStore';
import { Link } from 'wouter';
import { ArrowRight, Sparkles, PenTool, BookOpen } from 'lucide-react';
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
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* ─── Headline + CTAs (centered) ─── */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/80 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-xs font-semibold mb-8 border border-primary-200 dark:border-primary-800 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Start writing for free
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.05] tracking-tight mb-6">
            Write Your{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary-600 dark:text-primary-400">Story</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M2 8C50 2 150 2 198 8" stroke="currentColor" strokeWidth="4" className="text-primary-400/40 dark:text-primary-500/30" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary-600 via-teal-500 to-primary-400 bg-clip-text text-transparent">
              With an AI That Gets It
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            The AI co-writer that learns your voice. Plan worlds, develop characters,
            and banish blank-page syndrome for good.
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

          {/* Social proof mini */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="flex -space-x-2">
              {[PenTool, BookOpen, Sparkles].map((Icon, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 border-2 border-white dark:border-slate-900 flex items-center justify-center"
                >
                  <Icon className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Be among the first</span> to build your world
            </p>
          </div>
        </div>

        {/* ─── Product screenshot (full-width, below headline) ─── */}
        <div className={`relative mt-14 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative max-w-6xl mx-auto">
            {/* Glow behind image */}
            <div className="absolute -inset-2 -z-10 rounded-[2rem] bg-primary-500/10 blur-3xl opacity-50" />

            <img
              src="/assets/hero-editor.png"
              alt="Morpheus editor with AI co-writer — writing The Cartographer of Lost Things"
              className="w-full rounded-2xl border border-gray-200/60 dark:border-slate-700/60 shadow-2xl shadow-black/10 dark:shadow-black/30"
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

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Feather, Menu, X, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useSettingsStore } from '@/stores/settingsStore';
import AuthModal from '@/components/Auth/AuthModal';

interface LandingNavbarProps {
  onNavigate?: (hash: string) => void;
}

export default function LandingNavbar({ onNavigate }: LandingNavbarProps) {
  const { user } = useAuthStore();
  const { theme, setTheme } = useSettingsStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [, navigate] = useLocation();

  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (hash: string) => {
    setMobileOpen(false);
    if (onNavigate) {
      onNavigate(hash);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Feather className="w-7 h-7 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Morpheus</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => handleNavClick('#features')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              Features
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
            </button>
            <button onClick={() => handleNavClick('#how-it-works')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              How It Works
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
            </button>
            <button onClick={() => handleNavClick('#pricing')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              Pricing
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
            </button>
            <Link href="/faq" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              FAQ
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-gray-300" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>

            {user ? (
              <Link href="/app">
                <button className="btn-primary">Open the App</button>
              </Link>
            ) : (
              <>
                <button onClick={() => setShowAuth(true)} className="btn-ghost text-sm font-medium">
                  Sign In
                </button>
                <button onClick={() => setShowAuth(true)} className="btn-primary text-sm">
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4 space-y-3">
            <button onClick={() => handleNavClick('#features')} className="block w-full text-left py-2 text-gray-700 dark:text-gray-300">Features</button>
            <button onClick={() => handleNavClick('#how-it-works')} className="block w-full text-left py-2 text-gray-700 dark:text-gray-300">How It Works</button>
            <button onClick={() => handleNavClick('#pricing')} className="block w-full text-left py-2 text-gray-700 dark:text-gray-300">Pricing</button>
            <Link href="/faq" onClick={() => setMobileOpen(false)} className="block w-full text-left py-2 text-gray-700 dark:text-gray-300">FAQ</Link>
            <div className="pt-3 border-t border-gray-200 dark:border-slate-800 flex flex-col gap-2">
              {user ? (
                <Link href="/app">
                  <button className="btn-primary w-full">Open the App</button>
                </Link>
              ) : (
                <>
                  <button onClick={() => { setShowAuth(true); setMobileOpen(false); }} className="btn-secondary w-full">Sign In</button>
                  <button onClick={() => { setShowAuth(true); setMobileOpen(false); }} className="btn-primary w-full">Get Started</button>
                </>
              )}
              <button
                onClick={() => {
                  setTheme(isDark ? 'light' : 'dark');
                  setMobileOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </header>

      {showAuth && (
        <AuthModal
          onClose={() => setShowAuth(false)}
          onSuccess={() => navigate('/app')}
        />
      )}
    </>
  );
}

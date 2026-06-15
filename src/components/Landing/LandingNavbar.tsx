import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useSettingsStore } from '@/stores/settingsStore';
import AuthModal from '@/components/Auth/AuthModal';
import LanguageToggle from '@/components/common/LanguageToggle';
import { useI18n } from '@/i18n/useI18n';

interface LandingNavbarProps {
  onNavigate?: (hash: string) => void;
}

export default function LandingNavbar({ onNavigate }: LandingNavbarProps) {
  const { t } = useI18n();
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
            <img src="/logo.png" alt="Morpheus" className="w-9 h-9 object-contain group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Morpheus</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => handleNavClick('#features')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              {t('navigation.features')}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
            </button>
            <button onClick={() => handleNavClick('#trust')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              {t('navigation.trustSecurity')}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
            </button>
            <button onClick={() => handleNavClick('#pricing')} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              {t('navigation.pricing')}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
            </button>
            <Link href="/faq" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative group">
              {t('navigation.faq')}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={isDark ? t('landing.navbar.ariaSwitchToLight') : t('landing.navbar.ariaSwitchToDark')}
            >
              {isDark ? <Sun className="w-4 h-4 text-gray-300" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>

            {user ? (
              <Link href="/app">
                <button className="btn-primary">{t('landing.cta.openApp')}</button>
              </Link>
            ) : (
              <>
                <button onClick={() => setShowAuth(true)} className="btn-ghost text-sm font-medium">
                  {t('auth.signIn')}
                </button>
                <button onClick={() => setShowAuth(true)} className="btn-primary text-sm">
                  {t('landing.navbar.getStarted')}
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={t('landing.navbar.toggleMenu')}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4 space-y-3">
            <button onClick={() => handleNavClick('#features')} className="block w-full text-left py-2 text-gray-700 dark:text-gray-300">{t('navigation.features')}</button>
            <button onClick={() => handleNavClick('#trust')} className="block w-full text-left py-2 text-gray-700 dark:text-gray-300">{t('navigation.trustSecurity')}</button>
            <button onClick={() => handleNavClick('#pricing')} className="block w-full text-left py-2 text-gray-700 dark:text-gray-300">{t('navigation.pricing')}</button>
            <Link href="/faq" onClick={() => setMobileOpen(false)} className="block w-full text-left py-2 text-gray-700 dark:text-gray-300">{t('navigation.faq')}</Link>
            <div className="pt-3 border-t border-gray-200 dark:border-slate-800 flex flex-col gap-2">
              {user ? (
                <Link href="/app">
                  <button className="btn-primary w-full">{t('landing.cta.openApp')}</button>
                </Link>
              ) : (
                <>
                  <button onClick={() => { setShowAuth(true); setMobileOpen(false); }} className="btn-secondary w-full">{t('auth.signIn')}</button>
                  <button onClick={() => { setShowAuth(true); setMobileOpen(false); }} className="btn-primary w-full">{t('landing.navbar.getStarted')}</button>
                </>
              )}
              <div className="flex items-center justify-center py-2.5">
                <LanguageToggle />
              </div>
              <button
                onClick={() => {
                  setTheme(isDark ? 'light' : 'dark');
                  setMobileOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDark ? t('landing.navbar.lightMode') : t('landing.navbar.darkMode')}
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

import { lazy, Suspense, useEffect } from 'react';
import { Route, Switch } from 'wouter';
import { useSettingsStore } from '@/stores/settingsStore';
import { getSettings } from '@/db/settings';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { ToastContainer } from '@/components/common/Toast';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import CookieBanner from '@/components/Legal/CookieBanner';
import AuthGuard from '@/components/Auth/AuthGuard';
import { initAuth } from '@/services/auth';
import { client } from '@/lib/appwrite';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

// Eagerly load AppShell since it's the main layout wrapper
import AppShell from '@/components/Layout/AppShell';

// Lazy-load page components for code splitting
const DashboardPage = lazy(() => import('@/components/Dashboard/DashboardPage'));
const EditorPage = lazy(() => import('@/components/Editor/EditorPage'));
const LandingPage = lazy(() => import('@/components/Landing/LandingPage'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/TermsOfService'));
const CookiePolicy = lazy(() => import('@/pages/CookiePolicy'));
const RefundPolicy = lazy(() => import('@/pages/RefundPolicy'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function PageLoader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function App() {
  const { setTheme, loadSettings, openRouterKey, setIsConnected } = useSettingsStore();
  useKeyboardShortcuts();
  useOnlineStatus();

  useEffect(() => {
    initAuth();
    client.ping().catch((err) => {
      console.warn('[App] Appwrite connectivity check failed:', err);
    });
  }, []);

  useEffect(() => {
    getSettings().then((settings) => {
      const merged = {
        ...settings,
        openRouterKey: openRouterKey || settings.openRouterKey,
      };
      loadSettings(merged);
      setTheme(merged.theme);
      if (merged.openRouterKey) {
        setIsConnected(true);
      }
    });
  }, [loadSettings, setTheme, setIsConnected, openRouterKey]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/terms" component={TermsOfService} />
          <Route path="/cookies" component={CookiePolicy} />
          <Route path="/refund" component={RefundPolicy} />
          <Route path="/faq" component={FAQ} />
          <Route path="/app">
            {() => (
              <AuthGuard>
                <DashboardPage />
              </AuthGuard>
            )}
          </Route>
          <Route path="/book/:bookId">
            {(params) => (
              <AuthGuard>
                <AppShell bookId={params.bookId}>
                  <ErrorBoundary>
                    <EditorPage bookId={params.bookId} />
                  </ErrorBoundary>
                </AppShell>
              </AuthGuard>
            )}
          </Route>
          <Route path="/book/:bookId/chapter/:chapterId">
            {(params) => (
              <AuthGuard>
                <AppShell bookId={params.bookId} chapterId={params.chapterId}>
                  <ErrorBoundary>
                    <EditorPage bookId={params.bookId} chapterId={params.chapterId} />
                  </ErrorBoundary>
                </AppShell>
              </AuthGuard>
            )}
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
      <ToastContainer />
      <CookieBanner />
    </ErrorBoundary>
  );
}

export default App;

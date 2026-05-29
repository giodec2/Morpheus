import { useEffect } from 'react';
import { Route, Switch } from 'wouter';
import { useSettingsStore } from '@/stores/settingsStore';
import { getSettings } from '@/db/settings';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { ToastContainer } from '@/components/common/Toast';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import AppShell from '@/components/Layout/AppShell';
import DashboardPage from '@/components/Dashboard/DashboardPage';
import EditorPage from '@/components/Editor/EditorPage';
import LandingPage from '@/components/Landing/LandingPage';
import CookieBanner from '@/components/Legal/CookieBanner';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import CookiePolicy from '@/pages/CookiePolicy';
import RefundPolicy from '@/pages/RefundPolicy';
import FAQ from '@/pages/FAQ';
import NotFound from '@/pages/NotFound';
import AuthGuard from '@/components/Auth/AuthGuard';
import { initAuth } from '@/services/auth';
import { client } from '@/lib/appwrite';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

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
      <ToastContainer />
      <CookieBanner />
    </ErrorBoundary>
  );
}

export default App;

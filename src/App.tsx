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
import { initAuth } from '@/services/auth';
import { client } from '@/lib/appwrite';
import '@/lib/debug/appwriteTest';

function App() {
  const { setTheme, loadSettings, openRouterKey, setIsConnected } = useSettingsStore();
  useKeyboardShortcuts();

  useEffect(() => {
    initAuth();
    client.ping().catch(() => {});
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
        <Route path="/app" component={DashboardPage} />
        <Route path="/book/:bookId">
          {(params) => (
            <AppShell bookId={params.bookId}>
              <ErrorBoundary>
                <EditorPage bookId={params.bookId} />
              </ErrorBoundary>
            </AppShell>
          )}
        </Route>
        <Route path="/book/:bookId/chapter/:chapterId">
          {(params) => (
            <AppShell bookId={params.bookId} chapterId={params.chapterId}>
              <ErrorBoundary>
                <EditorPage bookId={params.bookId} chapterId={params.chapterId} />
              </ErrorBoundary>
            </AppShell>
          )}
        </Route>
      </Switch>
      <ToastContainer />
    </ErrorBoundary>
  );
}

export default App;

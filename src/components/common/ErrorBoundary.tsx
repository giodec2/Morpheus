import { Component, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { dictionary } from '@/i18n/dictionary';
import { useSettingsStore } from '@/stores/settingsStore';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

function t(key: string): string {
  const locale = useSettingsStore.getState().uiLocale;
  const value = key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, dictionary[locale]);
  return typeof value === 'string' ? value : key;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="h-full flex items-center justify-center p-8">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('errors.somethingWentWrong')}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {this.state.error?.message || t('errors.unexpectedError')}
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="btn-primary"
            >
              {t('actions.tryAgain')}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

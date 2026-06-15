import { useCallback } from 'react';
import { useSettingsStore } from '@/stores/settingsStore';
import { translate } from './translate';
import type { TranslationKey, UILocale } from './types';

export function useI18n() {
  const { uiLocale, setUiLocale, setLanguageManuallySet } = useSettingsStore();

  const t = useCallback(
    (key: TranslationKey, interpolations?: Record<string, string | number>): string => {
      return translate(uiLocale, key, interpolations);
    },
    [uiLocale]
  );

  const setLocale = useCallback(
    (locale: UILocale) => {
      setUiLocale(locale);
      setLanguageManuallySet(true);
    },
    [setUiLocale, setLanguageManuallySet]
  );

  const toggleLocale = useCallback(() => {
    setLocale(uiLocale === 'en' ? 'it' : 'en');
  }, [uiLocale, setLocale]);

  return { t, locale: uiLocale, setLocale, toggleLocale };
}

export type I18n = ReturnType<typeof useI18n>;
export type { UILocale };

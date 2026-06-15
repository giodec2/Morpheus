import type { Language } from '@/types';
import type { UILocale } from './types';

export function detectBrowserLocale(): UILocale {
  const preferred = navigator.languages?.[0] || navigator.language || 'en';
  const code = preferred.toLowerCase().split(/-|_/)[0];
  return code === 'it' ? 'it' : 'en';
}

export function mapLocaleToAILanguage(locale: UILocale): Language {
  return locale === 'it' ? 'italian' : 'english';
}

import { dictionary } from './dictionary';
import type { TranslationKey, UILocale } from './types';

export function translate(
  locale: UILocale,
  key: TranslationKey,
  interpolations?: Record<string, string | number>
): string {
  const value = getNestedValue(dictionary[locale], key);
  if (typeof value !== 'string') {
    console.warn(`[i18n] Missing translation for key: ${key} in locale: ${locale}`);
    const fallback = getNestedValue(dictionary.en, key);
    return typeof fallback === 'string' ? fallback : key;
  }
  if (!interpolations) return value;
  return value.replace(/\{\{(\w+)\}\}/g, (_, token) => {
    const replacement = interpolations[token];
    return replacement !== undefined ? String(replacement) : `{{${token}}}`;
  });
}

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

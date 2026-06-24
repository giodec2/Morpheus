import { dictionary } from './dictionary';
import type { PluralForm, TranslationKey, UILocale } from './types';

export function translate(
  locale: UILocale,
  key: TranslationKey,
  interpolations?: Record<string, string | number>
): string {
  const value = getNestedValue(dictionary[locale], key);

  if (isPluralForm(value)) {
    const count = interpolations?.count ?? 1;
    const pluralValue = count === 1 ? value.one : value.other;
    return applyInterpolations(pluralValue, interpolations);
  }

  if (typeof value !== 'string') {
    console.warn(`[i18n] Missing translation for key: ${key} in locale: ${locale}`);
    const fallback = getNestedValue(dictionary.en, key);
    if (isPluralForm(fallback)) {
      const count = interpolations?.count ?? 1;
      return applyInterpolations(count === 1 ? fallback.one : fallback.other, interpolations);
    }
    return typeof fallback === 'string' ? fallback : key;
  }
  return applyInterpolations(value, interpolations);
}

function applyInterpolations(
  value: string,
  interpolations?: Record<string, string | number>
): string {
  if (!interpolations) return value;
  return value.replace(/\{\{(\w+)\}\}/g, (_, token) => {
    const replacement = interpolations[token];
    return replacement !== undefined ? String(replacement) : `{{${token}}}`;
  });
}

function isPluralForm(value: unknown): value is PluralForm {
  return (
    typeof value === 'object' &&
    value !== null &&
    'one' in value &&
    'other' in value &&
    typeof (value as Record<string, unknown>).one === 'string' &&
    typeof (value as Record<string, unknown>).other === 'string'
  );
}

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

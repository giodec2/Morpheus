export type UILocale = 'en' | 'it';

export type PluralForm = { one: string; other: string };
export type TranslationValue = string | PluralForm;

export type TranslationDictionary = typeof import('./dictionary').dictionary.en;
export type TranslationKey = Paths<TranslationDictionary>;

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Paths<T> = T extends object
  ? T extends PluralForm
    ? never
    : {
        [K in keyof T]-?: K extends string | number
          ? T[K] extends object
            ? `${K}` | Join<K, Paths<T[K]>>
            : `${K}`
          : never;
      }[keyof T]
  : never;

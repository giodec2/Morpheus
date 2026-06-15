import { common } from './common';
import { landing } from './landing';
import { app } from './app';
import { settings } from './settings';
import { legal } from './legal';
import { chat } from './chat';
import { editor } from './editor';
import type { UILocale } from './types';

const en = {
  ...common.en,
  ...landing.en,
  ...app.en,
  ...settings.en,
  ...legal.en,
  ...chat.en,
  ...editor.en,
};

const it = {
  ...common.it,
  ...landing.it,
  ...app.it,
  ...settings.it,
  ...legal.it,
  ...chat.it,
  ...editor.it,
};

export const dictionary = { en, it } as const;

export function getDictionary(locale: UILocale) {
  return dictionary[locale];
}

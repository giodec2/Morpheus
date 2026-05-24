import { db } from './database';
import { DEFAULT_STANDARD_MODEL } from '@/lib/models';
import type { AppSettings } from '@/types';

const DEFAULT_SETTINGS: AppSettings = {
  id: 'global',
  openRouterKey: '',
  defaultModel: DEFAULT_STANDARD_MODEL,
  temperature: 0.7,
  maxTokens: 2048,
  theme: 'light',
  advancedMode: false,
  language: 'english',
  modelTier: 'standard',
  aiMode: 'hosted',
};

export async function getSettings(): Promise<AppSettings> {
  const settings = await db.settings.get('global');
  if (!settings) {
    await db.settings.add(DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  }
  return settings;
}

export async function updateSettings(updates: Partial<Omit<AppSettings, 'id'>>): Promise<void> {
  await db.settings.update('global', updates);
}

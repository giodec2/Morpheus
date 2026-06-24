import { Compass, Search, Network, Sparkles } from 'lucide-react';
import type { AIMode } from '@/types';
import type { TranslationKey } from '@/i18n/types';

export interface ModeDef {
  id: AIMode;
  label: TranslationKey;
  icon: typeof Compass;
  color: string;
  baseTemp: number;
  adj: number;
}

export const MODES: ModeDef[] = [
  { id: 'companion', label: 'chat.modes.companion', icon: Compass, color: 'text-primary-600 dark:text-primary-400', baseTemp: 0.7, adj: 0 },
  { id: 'continuity', label: 'chat.modes.continuity', icon: Search, color: 'text-amber-600 dark:text-amber-400', baseTemp: 0.5, adj: -0.2 },
  { id: 'plotWeaver', label: 'chat.modes.plotWeaver', icon: Network, color: 'text-violet-600 dark:text-violet-400', baseTemp: 0.75, adj: 0.05 },
  { id: 'twistForge', label: 'chat.modes.twistForge', icon: Sparkles, color: 'text-rose-600 dark:text-rose-400', baseTemp: 0.85, adj: 0.15 },
];

export const MODE_DESCRIPTION_KEYS: Record<string, TranslationKey> = {
  companion: 'chat.modeDescriptions.companion',
  continuity: 'chat.modeDescriptions.continuity',
  plotWeaver: 'chat.modeDescriptions.plotWeaver',
  twistForge: 'chat.modeDescriptions.twistForge',
};

type TFunction = (key: TranslationKey, interpolations?: Record<string, string | number>) => string;

export interface LocalizedModeDef {
  id: AIMode;
  label: string;
  icon: typeof Compass;
  color: string;
  baseTemp: number;
  adj: number;
}

export function getLocalizedModes(t: TFunction): LocalizedModeDef[] {
  return MODES.map((mode) => ({
    ...mode,
    label: t(mode.label),
  }));
}

export function getLocalizedModeDescriptions(t: TFunction): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [id, key] of Object.entries(MODE_DESCRIPTION_KEYS)) {
    result[id] = t(key);
  }
  return result;
}

import type { TranslationKey } from '@/i18n/types';

export interface ModelDef {
  value: string;
  label: TranslationKey;
  tier: 'standard' | 'premium';
  badge?: TranslationKey;
}

export const STANDARD_MODELS: ModelDef[] = [
  {
    value: 'google/gemma-4-26b-a4b-it',
    label: 'chat.models.gemma4',
    tier: 'standard',
    badge: 'chat.models.recommended',
  },
  {
    value: 'deepseek/deepseek-v4-flash',
    label: 'chat.models.deepseekV4Flash',
    tier: 'standard',
    badge: 'chat.models.recommended',
  },
  {
    value: 'openai/gpt-5-nano',
    label: 'chat.models.gpt5Nano',
    tier: 'standard',
  },
  {
    value: 'google/gemini-2.5-flash-lite',
    label: 'chat.models.geminiFlash',
    tier: 'standard',
  },
  {
    value: 'qwen/qwen3.5-flash-02-23',
    label: 'chat.models.qwenFlash',
    tier: 'standard',
  },
];

export const PREMIUM_MODELS: ModelDef[] = [
  {
    value: 'deepseek/deepseek-v4-pro',
    label: 'chat.models.deepseekV4Pro',
    tier: 'premium',
    badge: 'chat.models.recommended',
  },
  {
    value: 'z-ai/glm-5.1',
    label: 'chat.models.glm',
    tier: 'premium',
    badge: 'chat.models.recommended',
  },
  {
    value: 'openai/gpt-5.6-luna',
    label: 'chat.models.gptLuna',
    tier: 'premium',
  },
  {
    value: 'x-ai/grok-4.3',
    label: 'chat.models.grok',
    tier: 'premium',
  },
  {
    value: 'moonshotai/kimi-k2.5',
    label: 'chat.models.kimi',
    tier: 'premium',
  },
];

export const ALL_MODELS = [...STANDARD_MODELS, ...PREMIUM_MODELS];

export const DEFAULT_STANDARD_MODEL = 'google/gemma-4-26b-a4b-it';
export const DEFAULT_PREMIUM_MODEL = 'deepseek/deepseek-v4-pro';

export const MODEL_DESCRIPTION_KEYS: Record<string, TranslationKey> = {
  // Standard
  'openai/gpt-5-nano': 'chat.modelDescriptions.openai/gpt-5-nano',
  'google/gemma-4-26b-a4b-it': 'chat.modelDescriptions.google/gemma-4-26b-a4b-it',
  'deepseek/deepseek-v4-flash': 'chat.modelDescriptions.deepseek/deepseek-v4-flash',
  'google/gemini-2.5-flash-lite': 'chat.modelDescriptions.google/gemini-2.5-flash-lite',
  'qwen/qwen3.5-flash-02-23': 'chat.modelDescriptions.qwen/qwen3.5-flash-02-23',
  // Premium
  'openai/gpt-5.6-luna': 'chat.modelDescriptions.openai/gpt-5.6-luna',
  'x-ai/grok-4.3': 'chat.modelDescriptions.x-ai/grok-4.3',
  'moonshotai/kimi-k2.5': 'chat.modelDescriptions.moonshotai/kimi-k2.5',
  'z-ai/glm-5.1': 'chat.modelDescriptions.z-ai/glm-5.1',
  'deepseek/deepseek-v4-pro': 'chat.modelDescriptions.deepseek/deepseek-v4-pro',
};

export interface LocalizedModelDef {
  value: string;
  label: string;
  tier: 'standard' | 'premium';
  badge?: string;
}

type TFunction = (key: TranslationKey, interpolations?: Record<string, string | number>) => string;

export function localizeModels(models: ModelDef[], t: TFunction): LocalizedModelDef[] {
  return models.map((m) => ({
    value: m.value,
    label: t(m.label),
    tier: m.tier,
    badge: m.badge ? t(m.badge) : undefined,
  }));
}

export function getLocalizedStandardModels(t: TFunction): LocalizedModelDef[] {
  return localizeModels(STANDARD_MODELS, t);
}

export function getLocalizedPremiumModels(t: TFunction): LocalizedModelDef[] {
  return localizeModels(PREMIUM_MODELS, t);
}

export function getLocalizedModelDescriptions(t: TFunction): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [value, key] of Object.entries(MODEL_DESCRIPTION_KEYS)) {
    result[value] = t(key);
  }
  return result;
}

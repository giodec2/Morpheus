export interface ModelDef {
  value: string;
  label: string;
  tier: 'standard' | 'premium';
  badge?: string;
}

export const STANDARD_MODELS: ModelDef[] = [
  {
    value: 'google/gemma-4-26b-a4b-it',
    label: 'Gemma 4',
    tier: 'standard',
    badge: 'Suggested',
  },
  {
    value: 'deepseek/deepseek-v4-flash',
    label: 'DeepSeek V4 Flash',
    tier: 'standard',
    badge: 'Suggested',
  },
  {
    value: 'openai/gpt-5-nano',
    label: 'GPT-5 Nano',
    tier: 'standard',
  },
  {
    value: 'google/gemini-2.5-flash-lite',
    label: 'Gemini Flash',
    tier: 'standard',
  },
  {
    value: 'qwen/qwen3.5-flash-02-23',
    label: 'Qwen Flash',
    tier: 'standard',
  },
];

export const PREMIUM_MODELS: ModelDef[] = [
  {
    value: 'deepseek/deepseek-v4-pro',
    label: 'DeepSeek V4 Pro',
    tier: 'premium',
    badge: 'Suggested',
  },
  {
    value: 'z-ai/glm-5.1',
    label: 'GLM',
    tier: 'premium',
    badge: 'Suggested',
  },
  {
    value: 'openai/gpt-5.4-mini',
    label: 'GPT-5.4 Mini',
    tier: 'premium',
  },
  {
    value: 'x-ai/grok-4.3',
    label: 'Grok',
    tier: 'premium',
  },
  {
    value: 'moonshotai/kimi-k2.5',
    label: 'Kimi',
    tier: 'premium',
  },
];

export const ALL_MODELS = [...STANDARD_MODELS, ...PREMIUM_MODELS];

export const DEFAULT_STANDARD_MODEL = 'google/gemma-4-26b-a4b-it';
export const DEFAULT_PREMIUM_MODEL = 'deepseek/deepseek-v4-pro';

export const MODEL_DESCRIPTIONS: Record<string, string> = {
  // Standard
  'openai/gpt-5-nano':
    "OpenAI's smallest model. Fast and nimble for quick dialogue passes, brainstorming sparks, and iterative drafting. Best when you want instant feedback without overthinking.",
  'google/gemma-4-26b-a4b-it':
    "Incredibly fast and creative model. Strong narrative coherence and natural character voices. A solid everyday co-writer for any genre.",
  'deepseek/deepseek-v4-flash':
    'Fast model with a massive context window. Perfect for high-volume drafting sessions, honest feedbacks, and processing large manuscripts in one go.',
  'google/gemini-2.5-flash-lite':
    "Google's speed-focused model. Lightning-fast responses ideal for rapid brainstorming, can also reason quickly, to use when momentum matters.",
  'qwen/qwen3.5-flash-02-23':
    "Efficient generalist with strong reasoning. Balanced across creative and analytical tasks — a reliable daily driver.",

  // Premium
  'openai/gpt-5.4-mini':
    "OpenAI's frontier-grade all-rounder. Excellent for structured feedback, continuity checking, and precise prose refinement. When you need reliability above all else.",
  'x-ai/grok-4.3':
    'Fast and opinionated with a bold, distinctive voice. Better for punchy dialogue and irreverent characters than delicate prose. Massive context window.',
  'moonshotai/kimi-k2.5':
    "Sophisticated generalist with a spark of deep creativity. Great for balancing complex, analytical plotting with elegant character dialogue.",
  'z-ai/glm-5.1':
    "A versatile literary powerhouse. Outstanding at rich prose, intricate plot development, and long-horizon story planning. Crafted for ambitious novel writing.",
  'deepseek/deepseek-v4-pro':
    "Flagship-level reasoning model. Excels at complex plot analysis, deep character psychology, and multi-layered continuity checking. For when the story demands nuance.",
};

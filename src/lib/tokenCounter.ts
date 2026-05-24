import { encode } from 'gpt-tokenizer';

export function estimateTokens(text: string): number {
  try {
    return encode(text).length;
  } catch {
    return Math.ceil(text.length / 4);
  }
}

export const MODEL_CONTEXT_WINDOWS: Record<string, number> = {
  'google/gemma-4-26b-a4b-it': 256000,
  'z-ai/glm-5.1': 200000,
  'qwen/qwen3.6-plus': 1000000,
  'google/gemini-3.1-flash-lite': 128000,
  'x-ai/grok-4.3': 1000000,
  'openai/gpt-5.4-mini': 400000,
  'moonshotai/kimi-k2.5': 262000,
  'deepseek/deepseek-v4-flash': 1000000,
  'default': 128000,
};

export function getContextWindow(model: string): number {
  return MODEL_CONTEXT_WINDOWS[model] || MODEL_CONTEXT_WINDOWS.default;
}

export interface TokenBudget {
  maxContext: number;
  reservedForResponse: number;
  reservedForHistory: number;
  availableForContext: number;
}

export function calculateBudget(model: string, maxTokens: number): TokenBudget {
  const maxContext = getContextWindow(model);
  const reservedForResponse = maxTokens;
  const reservedForHistory = Math.floor(maxContext * 0.1);
  const availableForContext = maxContext - reservedForResponse - reservedForHistory;

  return {
    maxContext,
    reservedForResponse,
    reservedForHistory,
    availableForContext,
  };
}

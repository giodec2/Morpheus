import { useState, useCallback, useRef, useMemo } from 'react';
import OpenAI from 'openai';
import { useSettingsStore } from '@/stores/settingsStore';
import type { AIMode } from '@/types';

export function useOpenRouter() {
  const { openRouterKey, defaultModel, temperature, maxTokens } = useSettingsStore();
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const client = useMemo(() => {
    if (!openRouterKey) return null;
    return new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: openRouterKey,
      dangerouslyAllowBrowser: true,
    });
  }, [openRouterKey]);

  const validateKey = useCallback(async (): Promise<boolean> => {
    if (!openRouterKey) return false;
    try {
      const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
        headers: { Authorization: `Bearer ${openRouterKey}` },
      });
      return response.ok;
    } catch {
      return false;
    }
  }, [openRouterKey]);

  const sendMessage = useCallback(async (
    systemPrompt: string,
    messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
    onChunk: (chunk: string) => void,
    onError: (error: string) => void,
    _mode: AIMode
  ): Promise<void> => {
    if (!openRouterKey || !client) {
      onError('Please set your OpenRouter API key in Settings.');
      return;
    }

    setIsStreaming(true);
    abortRef.current = new AbortController();

    try {
      const stream = await client.chat.completions.create({
        model: defaultModel,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature,
        max_tokens: maxTokens,
        stream: true,
      }, { signal: abortRef.current.signal });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          onChunk(content);
        }
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      const msg = (err as Error).message || 'An error occurred while streaming.';
      onError(msg);
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [openRouterKey, client, defaultModel, temperature, maxTokens]);

  const abort = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return { sendMessage, validateKey, isStreaming, abort };
}

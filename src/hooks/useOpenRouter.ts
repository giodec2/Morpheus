import { useState, useCallback, useRef, useMemo } from 'react';
import OpenAI from 'openai';
import { useSettingsStore } from '@/stores/settingsStore';
import { useAuthStore } from '@/stores/authStore';
import { functions } from '@/lib/appwrite';

import type { AIMode } from '@/types';

const HOSTED_AI_FUNCTION_ID = import.meta.env.VITE_APPWRITE_FUNCTION_ID || '';

export function useOpenRouter() {
  const { openRouterKey, defaultModel, temperature, maxTokens, aiMode } = useSettingsStore();
  const { user } = useAuthStore();
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const isByok = aiMode === 'byok';

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

  const sendMessageHosted = useCallback(async (
    systemPrompt: string,
    messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
    onChunk: (chunk: string) => void,
    onError: (error: string) => void,
  ): Promise<void> => {
    if (!user) {
      onError('Please sign in to use Hosted AI.');
      return;
    }
    if (!HOSTED_AI_FUNCTION_ID) {
      onError('Hosted AI is not configured. Please add your own API key (BYOK) in Settings.');
      return;
    }

    setIsStreaming(true);
    abortRef.current = new AbortController();

    try {
      const result = await functions.createExecution(
        HOSTED_AI_FUNCTION_ID,
        JSON.stringify({
          model: defaultModel,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          temperature,
          maxTokens,
        })
      );

      console.log('[Hosted AI] Execution result:', result);

      if (result.responseStatusCode >= 400) {
        let errorMsg = `Hosted AI request failed (HTTP ${result.responseStatusCode}).`;
        let rawBody = result.responseBody || '';
        try {
          const errorBody = JSON.parse(rawBody);
          errorMsg = errorBody.error || errorBody.message || errorMsg;
        } catch {
          errorMsg = rawBody ? `${errorMsg} ${rawBody.slice(0, 300)}` : errorMsg;
        }
        console.error('[Hosted AI] Function error:', {
          status: result.responseStatusCode,
          body: rawBody,
          parsed: errorMsg,
          functionId: HOSTED_AI_FUNCTION_ID,
        });
        onError(errorMsg);
        return;
      }

      let body;
      try {
        body = JSON.parse(result.responseBody);
      } catch {
        console.error('[Hosted AI] Invalid JSON response:', result.responseBody);
        onError('Invalid response from AI server.');
        return;
      }

      if (body.error) {
        onError(body.error);
        return;
      }

      // Simulate streaming by yielding characters one by one
      const content = body.content || '';
      const delay = Math.max(5, Math.min(30, 500 / content.length));
      for (let i = 0; i < content.length; i++) {
        if (abortRef.current?.signal.aborted) return;
        onChunk(content[i]);
        if (content.length > 100) {
          await new Promise((r) => setTimeout(r, delay));
        }
      }

      if (body.tokensUsed) {
        const { profile, setProfile } = useAuthStore.getState();
        if (profile) {
          setProfile({
            ...profile,
            weeklyTokensUsed: body.weeklyTokensUsed ?? (profile.weeklyTokensUsed || 0) + body.tokensUsed,
            weeklyTokensUsedPremium: body.weeklyTokensUsedPremium ?? profile.weeklyTokensUsedPremium ?? 0,
          });
        }
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      const msg = (err as Error).message || 'Hosted AI request failed.';
      console.error('[Hosted AI] Exception:', {
        message: msg,
        functionId: HOSTED_AI_FUNCTION_ID,
        error: err,
      });
      onError(msg);
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [user, defaultModel, temperature, maxTokens]);

  const sendMessageByok = useCallback(async (
    systemPrompt: string,
    messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
    onChunk: (chunk: string) => void,
    onError: (error: string) => void,
  ): Promise<void> => {
    if (!openRouterKey || !client) {
      onError('Please set your OpenRouter API key in Settings.');
      return;
    }

    setIsStreaming(true);
    abortRef.current = new AbortController();

    // Timeout to prevent hung connections
    const timeoutId = setTimeout(() => {
      abortRef.current?.abort();
    }, 30000); // BYOK_TIMEOUT_MS

    try {
      const stream = await client.chat.completions.create({
        model: defaultModel,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        temperature,
        max_completion_tokens: maxTokens,
        stream: true,
      }, { signal: abortRef.current.signal });

      clearTimeout(timeoutId);

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          onChunk(content);
        }
      }
    } catch (err) {
      clearTimeout(timeoutId);
      if ((err as Error).name === 'AbortError') {
        onError('Request timed out. The AI provider took too long to respond.');
        return;
      }
      const msg = (err as Error).message || 'An error occurred while streaming.';
      onError(msg);
    } finally {
      clearTimeout(timeoutId);
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [openRouterKey, client, defaultModel, temperature, maxTokens]);

  const sendMessage = useCallback(async (
    systemPrompt: string,
    messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
    onChunk: (chunk: string) => void,
    onError: (error: string) => void,
    _mode: AIMode
  ): Promise<void> => {
    if (isByok) {
      await sendMessageByok(systemPrompt, messages, onChunk, onError);
    } else {
      await sendMessageHosted(systemPrompt, messages, onChunk, onError);
    }
  }, [isByok, sendMessageByok, sendMessageHosted]);

  const abort = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  return { sendMessage, validateKey, isStreaming, abort };
}

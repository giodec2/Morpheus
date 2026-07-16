import { useState, useCallback, useRef, useMemo } from 'react';
import OpenAI from 'openai';
import { ExecutionMethod } from 'appwrite';
import { useSettingsStore } from '@/stores/settingsStore';
import { useAuthStore } from '@/stores/authStore';
import { functions } from '@/lib/appwrite';
import { translate } from '@/i18n/translate';

import type { AIMode } from '@/types';

const HOSTED_AI_FUNCTION_ID = import.meta.env.VITE_APPWRITE_FUNCTION_ID || '';

export function useOpenRouter() {
  const { openRouterKey, defaultModel, temperature, maxTokens, aiMode, uiLocale } = useSettingsStore();
  const t = useCallback(
    (key: Parameters<typeof translate>[1], interpolations?: Record<string, string | number>) =>
      translate(uiLocale, key, interpolations),
    [uiLocale]
  );
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
      onError(t('errors.signInForHostedAI'));
      return;
    }
    if (!HOSTED_AI_FUNCTION_ID) {
      onError(t('errors.hostedAINotConfigured'));
      return;
    }

    setIsStreaming(true);
    abortRef.current = new AbortController();

    try {
      const exec = await functions.createExecution({
        functionId: HOSTED_AI_FUNCTION_ID,
        body: JSON.stringify({
          model: defaultModel,
          messages: [{ role: 'system', content: systemPrompt }, ...messages],
          temperature,
          maxTokens,
        }),
        async: true, // async execution to avoid 30s sync timeout
        xpath: '/',
        method: ExecutionMethod.POST,
      });

      console.log('[Hosted AI] Async execution started:', exec.$id, 'status:', exec.status);

      // Poll until the async function completes or fails
      const POLL_INTERVAL_MS = 1500;
      const MAX_POLL_MS = 5 * 60 * 1000; // 5 minutes
      const startTime = Date.now();
      let result = exec;

      while (
        result.status !== 'completed' &&
        result.status !== 'failed' &&
        Date.now() - startTime < MAX_POLL_MS
      ) {
        if (abortRef.current?.signal.aborted) {
          console.log('[Hosted AI] Polling aborted by user');
          return;
        }
        await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
        result = await functions.getExecution({
          functionId: HOSTED_AI_FUNCTION_ID,
          executionId: exec.$id,
        });
        console.log('[Hosted AI] Poll status:', result.status);
      }

      if (result.status !== 'completed' && result.status !== 'failed') {
        onError(t('errors.hostedAITimedOut'));
        return;
      }

      console.log('[Hosted AI] Execution result:', result);

      if (result.responseStatusCode >= 400) {
        let errorMsg = t('errors.hostedAIRequestFailed', { code: result.responseStatusCode });
        const rawBody = result.responseBody || '';
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
        onError(t('errors.invalidAIResponse'));
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
  }, [user, defaultModel, temperature, maxTokens, t]);

  const sendMessageByok = useCallback(async (
    systemPrompt: string,
    messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
    onChunk: (chunk: string) => void,
    onError: (error: string) => void,
  ): Promise<void> => {
    if (!openRouterKey || !client) {
      onError(t('errors.setApiKey'));
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
        onError(t('errors.requestTimedOut'));
        return;
      }
      const msg = (err as Error).message || t('errors.streamingError');
      onError(msg);
    } finally {
      clearTimeout(timeoutId);
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [openRouterKey, client, defaultModel, temperature, maxTokens, t]);

  const sendMessage = useCallback(async (
    systemPrompt: string,
    messages: { role: 'user' | 'assistant' | 'system'; content: string }[],
    onChunk: (chunk: string) => void,
    onError: (error: string) => void,
    _mode: AIMode
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

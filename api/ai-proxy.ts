import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client, Account, Databases } from 'node-appwrite';

// ───────────────────────────────────────────────
// Token Estimation (improved for mixed languages)
// ───────────────────────────────────────────────
function estimateTokens(text: string): number {
  if (!text) return 0;
  const cjkCount = (text.match(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/g) || []).length;
  const nonCjk = text.length - cjkCount;
  const wordCount = nonCjk > 0 ? text.split(/\s+/).filter((w) => w.length > 0).length : 0;
  return Math.ceil(cjkCount + wordCount * 1.3 + nonCjk * 0.1);
}

// ───────────────────────────────────────────────
// Simple in-memory rate limiter
// ───────────────────────────────────────────────
const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 30;

function checkRateLimit(userId: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimits.get(userId);
  if (!record || now > record.resetAt) {
    rateLimits.set(userId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.ceil((record.resetAt - now) / 1000) };
  }
  record.count++;
  return { allowed: true };
}

// ───────────────────────────────────────────────
// Env Validation
// ───────────────────────────────────────────────
function validateEnv(): Record<string, string> {
  const required = [
    'APPWRITE_ENDPOINT',
    'APPWRITE_PROJECT_ID',
    'APPWRITE_API_KEY',
    'APPWRITE_DATABASE_ID',
    'APPWRITE_COLLECTION_PROFILES',
    'OPENROUTER_API_KEY',
  ];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
  return {
    endpoint: process.env.APPWRITE_ENDPOINT!,
    projectId: process.env.APPWRITE_PROJECT_ID!,
    apiKey: process.env.APPWRITE_API_KEY!,
    databaseId: process.env.APPWRITE_DATABASE_ID!,
    profilesCollection: process.env.APPWRITE_COLLECTION_PROFILES!,
    openRouterKey: process.env.OPENROUTER_API_KEY!,
  };
}

// ───────────────────────────────────────────────
// Input Validation
// ───────────────────────────────────────────────
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ProxyPayload {
  model: string;
  messages: ChatMessage[];
  temperature: number;
  maxTokens: number;
}

function validatePayload(body: unknown): ProxyPayload {
  const payload = typeof body === 'string' ? JSON.parse(body || '{}') : body || {};
  const { model, messages, temperature, maxTokens } = payload as ProxyPayload;

  if (!model || typeof model !== 'string') {
    throw new Error('Missing or invalid field: model (string required)');
  }
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    throw new Error('Missing or invalid field: messages (non-empty array required)');
  }
  for (const m of messages) {
    if (!m.role || !['user', 'assistant', 'system'].includes(m.role)) {
      throw new Error(`Invalid message role: ${m.role}`);
    }
    if (typeof m.content !== 'string') {
      throw new Error('Message content must be a string');
    }
  }

  const temp = typeof temperature === 'number' ? temperature : 0.7;
  if (temp < 0 || temp > 2) {
    throw new Error('temperature must be between 0 and 2');
  }

  const maxTok = typeof maxTokens === 'number' ? maxTokens : 2048;
  if (maxTok < 1 || maxTok > 32768) {
    throw new Error('maxTokens must be between 1 and 32768');
  }

  return { model, messages, temperature: temp, maxTokens: maxTok };
}

// ───────────────────────────────────────────────
// Main Handler
// ───────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let env: ReturnType<typeof validateEnv>;
  try {
    env = validateEnv();
  } catch (err) {
    console.error(`Env validation failed: ${(err as Error).message}`);
    res.status(500).json({ error: 'Server misconfiguration' });
    return;
  }

  // Verify JWT from Authorization header
  const authHeader = req.headers.authorization || '';
  const jwt = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!jwt) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }

  let userId: string;
  try {
    const jwtClient = new Client().setEndpoint(env.endpoint).setProject(env.projectId).setJWT(jwt);
    const account = new Account(jwtClient);
    const user = await account.get();
    userId = user.$id;
  } catch (err) {
    console.error(`JWT verification failed: ${(err as Error).message || err}`);
    res.status(401).json({ error: 'Invalid or expired session' });
    return;
  }

  // Rate limiting
  const rateCheck = checkRateLimit(userId);
  if (!rateCheck.allowed) {
    res.status(429).json({ error: 'Rate limit exceeded. Please slow down.', retryAfter: rateCheck.retryAfter });
    return;
  }

  let payload: ProxyPayload;
  try {
    payload = validatePayload(req.body);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
    return;
  }

  const adminClient = new Client().setEndpoint(env.endpoint).setProject(env.projectId).setKey(env.apiKey);
  const databases = new Databases(adminClient);

  // Fetch user profile
  let profile: Record<string, unknown>;
  try {
    profile = await databases.getDocument(env.databaseId, env.profilesCollection, userId);
  } catch (err) {
    console.error(`Profile fetch failed: ${(err as { message?: string }).message || err}`);
    const errorObj = err as { code?: number; type?: string };
    const isNotFound = errorObj.code === 404 || errorObj.type === 'document_not_found';
    if (isNotFound) {
      res.status(404).json({ error: 'User profile not found' });
    } else {
      res.status(502).json({ error: 'Database error while fetching profile' });
    }
    return;
  }

  // Tier defaults
  const tierDefaults: Record<string, { maxBooks: number; maxWeeklyTokensStandard: number; maxWeeklyTokensPremium: number }> = {
    free: { maxBooks: 1, maxWeeklyTokensStandard: 50_000, maxWeeklyTokensPremium: 0 },
    scribe: { maxBooks: 3, maxWeeklyTokensStandard: 500_000, maxWeeklyTokensPremium: 0 },
    novelist: { maxBooks: 10, maxWeeklyTokensStandard: 1_000_000, maxWeeklyTokensPremium: 50_000 },
    architect: { maxBooks: Infinity, maxWeeklyTokensStandard: 5_000_000, maxWeeklyTokensPremium: 500_000 },
    maestro: { maxBooks: Infinity, maxWeeklyTokensStandard: 250_000, maxWeeklyTokensPremium: 0 },
  };

  const status = profile.subscriptionStatus as string | undefined;
  const isExplicitlyInactive = status === 'cancelled' || status === 'expired' || status === 'past_due' || status === 'unpaid' || status === 'paused';
  const tier = isExplicitlyInactive ? 'free' : ((profile.subscriptionTier as string) || 'free');
  const defaults = tierDefaults[tier] || tierDefaults.free;

  const premiumModels = [
    'deepseek/deepseek-v4-pro',
    'z-ai/glm-5.1',
    'openai/gpt-5.6-luna',
    'x-ai/grok-4.3',
    'moonshotai/kimi-k2.5',
  ];
  const isPremium = premiumModels.some((m) => payload.model === m);

  if (isPremium && defaults.maxWeeklyTokensPremium === 0) {
    res.status(403).json({ error: 'Premium models require Novelist tier or above.' });
    return;
  }

  // Token limit check
  const inputText = payload.messages.map((m) => m.content).join(' ');
  const estimatedInputTokens = estimateTokens(inputText);
  const estimatedTotal = estimatedInputTokens + payload.maxTokens;

  const weeklyResetAt = profile.weeklyTokensResetAt as number | undefined;
  const now = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  if (!weeklyResetAt || now - weeklyResetAt >= oneWeek) {
    try {
      await databases.updateDocument(env.databaseId, env.profilesCollection, userId, {
        weeklyTokensUsed: 0,
        weeklyTokensUsedPremium: 0,
        weeklyTokensResetAt: now,
      });
    } catch (resetErr) {
      const resetMsg = (resetErr as { message?: string }).message || '';
      const isMissingAttr = resetMsg.includes('Unknown attribute') || resetMsg.includes('document_invalid_structure');
      if (!isMissingAttr) {
        console.error(`Token reset failed: ${resetMsg}`);
      }
    }
    profile.weeklyTokensUsed = 0;
    profile.weeklyTokensUsedPremium = 0;
  }

  const standardUsed = (profile.weeklyTokensUsed as number) || 0;
  const premiumUsed = (profile.weeklyTokensUsedPremium as number) || 0;

  if (isPremium) {
    if (premiumUsed + estimatedTotal > defaults.maxWeeklyTokensPremium) {
      res.status(429).json({ error: 'Premium token limit reached.', limitType: 'premium', used: premiumUsed, limit: defaults.maxWeeklyTokensPremium });
      return;
    }
  } else {
    if (standardUsed + estimatedTotal > defaults.maxWeeklyTokensStandard) {
      res.status(429).json({ error: 'Standard token limit reached.', limitType: 'standard', used: standardUsed, limit: defaults.maxWeeklyTokensStandard });
      return;
    }
  }

  // Call OpenRouter
  const requestBody: Record<string, unknown> = {
    model: payload.model,
    messages: payload.messages,
    temperature: payload.temperature,
    max_completion_tokens: payload.maxTokens,
  };

  const allowFallbacks = process.env.OPENROUTER_ALLOW_FALLBACKS === 'true';
  if (payload.model.startsWith('openai/')) {
    requestBody.provider = { order: ['OpenAI'], allow_fallbacks: allowFallbacks };
  }

  const controller = new AbortController();
  const timeoutMs = parseInt(process.env.REQUEST_TIMEOUT_MS || '120000', 10);
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.openRouterKey}`,
        'HTTP-Referer': env.endpoint || 'https://morpheus.app',
        'X-Title': 'Morpheus AI Co-Writer',
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
  } catch (fetchErr) {
    clearTimeout(timeoutId);
    if ((fetchErr as Error).name === 'AbortError') {
      res.status(504).json({ error: 'AI request timed out. The provider took too long to respond. Please try again.' });
      return;
    }
    throw fetchErr;
  }

  if (!response.ok) {
    const errBody = await response.text();
    console.error(`OpenRouter error ${response.status}: ${errBody.slice(0, 500)}`);
    let parsedError: { error?: { message?: string }; message?: string } | undefined;
    try {
      parsedError = JSON.parse(errBody);
    } catch {
      /* ignore */
    }
    res.status(502).json({
      error: 'AI provider error.',
      providerStatus: response.status,
      providerMessage: parsedError?.error?.message || parsedError?.message || errBody.slice(0, 200),
    });
    return;
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
    usage?: { total_tokens?: number };
  };
  const content = data.choices?.[0]?.message?.content || '';
  const actualTokens = data.usage?.total_tokens || estimateTokens(content) + estimatedInputTokens;

  // Update token counters
  try {
    if (isPremium) {
      await databases.updateDocument(env.databaseId, env.profilesCollection, userId, {
        weeklyTokensUsedPremium: premiumUsed + actualTokens,
      });
    } else {
      await databases.updateDocument(env.databaseId, env.profilesCollection, userId, {
        weeklyTokensUsed: standardUsed + actualTokens,
      });
    }
  } catch (err) {
    const errMsg = (err as { message?: string }).message || '';
    const isMissingAttr = errMsg.includes('Unknown attribute') || errMsg.includes('document_invalid_structure');
    if (isMissingAttr) {
      console.error(`Token usage update skipped — DB schema missing attribute: ${errMsg}`);
    } else {
      console.error(`Failed to update token usage: ${errMsg}`);
      res.status(500).json({ error: 'Failed to record token usage. Please retry.' });
      return;
    }
  }

  res.status(200).json({
    content,
    tokensUsed: actualTokens,
    model: payload.model,
    weeklyTokensUsed: isPremium ? standardUsed : standardUsed + actualTokens,
    weeklyTokensUsedPremium: isPremium ? premiumUsed + actualTokens : premiumUsed,
  });
}

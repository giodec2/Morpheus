import { Client, Databases } from 'node-appwrite';

// ───────────────────────────────────────────────
// Token Estimation (improved for mixed languages)
// ───────────────────────────────────────────────
function estimateTokens(text) {
  if (!text) return 0;
  // CJK characters are roughly 1 token each
  const cjkCount = (text.match(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/g) || []).length;
  const nonCjk = text.length - cjkCount;
  // English words average ~1.3 tokens, other latin text ~chars/4
  const wordCount = nonCjk > 0 ? text.split(/\s+/).filter(w => w.length > 0).length : 0;
  return Math.ceil(cjkCount + (wordCount * 1.3) + (nonCjk * 0.1));
}

// ───────────────────────────────────────────────
// Simple in-memory rate limiter
// ───────────────────────────────────────────────
const rateLimits = new Map(); // userId -> { count, resetAt }
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 30;

function checkRateLimit(userId) {
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
function validateEnv() {
  const required = [
    'APPWRITE_FUNCTION_API_ENDPOINT',
    'APPWRITE_FUNCTION_PROJECT_ID',
    'APPWRITE_API_KEY',
    'APPWRITE_DATABASE_ID',
    'APPWRITE_COLLECTION_PROFILES',
    'OPENROUTER_API_KEY',
  ];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
}

export default async (context) => {
  const { req, res } = context;

  try {
    validateEnv();
  } catch (err) {
    console.error(`Env validation failed: ${err.message}`);
    return res.json({ error: 'Server misconfiguration' }, 500);
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { model, messages, temperature, maxTokens } = payload;

    // ── Input Validation ──
    if (!model || typeof model !== 'string') {
      return res.json({ error: 'Missing or invalid field: model (string required)' }, 400);
    }
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.json({ error: 'Missing or invalid field: messages (non-empty array required)' }, 400);
    }
    for (const m of messages) {
      if (!m.role || !['user', 'assistant', 'system'].includes(m.role)) {
        return res.json({ error: `Invalid message role: ${m.role}` }, 400);
      }
      if (typeof m.content !== 'string') {
        return res.json({ error: 'Message content must be a string' }, 400);
      }
    }

    const temp = typeof temperature === 'number' ? temperature : 0.7;
    if (temp < 0 || temp > 2) {
      return res.json({ error: 'temperature must be between 0 and 2' }, 400);
    }

    const maxTok = typeof maxTokens === 'number' ? maxTokens : 2048;
    if (maxTok < 1 || maxTok > 32768) {
      return res.json({ error: 'maxTokens must be between 1 and 32768' }, 400);
    }

    // Get authenticated user ID from Appwrite context
    const userId = req.headers['x-appwrite-user-id'];
    if (!userId) {
      return res.json({ error: 'Authentication required' }, 401);
    }

    // Rate limiting
    const rateCheck = checkRateLimit(userId);
    if (!rateCheck.allowed) {
      return res.json({ error: 'Rate limit exceeded. Please slow down.', retryAfter: rateCheck.retryAfter }, 429);
    }

    // Admin client to read/update profiles
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);
    const databaseId = process.env.APPWRITE_DATABASE_ID;
    const profilesCollection = process.env.APPWRITE_COLLECTION_PROFILES;

    // Fetch user profile
    let profile;
    try {
      profile = await databases.getDocument(databaseId, profilesCollection, userId);
    } catch (err) {
      console.error(`Profile fetch failed: ${err.message || err}`);
      const isNotFound = err.code === 404 || err.type === 'document_not_found';
      if (isNotFound) {
        return res.json({ error: 'User profile not found' }, 404);
      }
      return res.json({ error: 'Database error while fetching profile' }, 502);
    }

    // Tier defaults
    const tierDefaults = {
      free: { maxBooks: 1, maxWeeklyTokensStandard: 100_000, maxWeeklyTokensPremium: 0 },
      scribe: { maxBooks: 3, maxWeeklyTokensStandard: 1_000_000, maxWeeklyTokensPremium: 0 },
      novelist: { maxBooks: 10, maxWeeklyTokensStandard: 2_000_000, maxWeeklyTokensPremium: 100_000 },
      architect: { maxBooks: 50, maxWeeklyTokensStandard: 10_000_000, maxWeeklyTokensPremium: 1_000_000 },
    };

    // Only enforce free tier when subscription is explicitly inactive
    const status = profile.subscriptionStatus;
    const isExplicitlyInactive = status === 'cancelled' || status === 'expired' || status === 'past_due' || status === 'unpaid' || status === 'paused';
    const tier = isExplicitlyInactive ? 'free' : (profile.subscriptionTier || 'free');
    const defaults = tierDefaults[tier] || tierDefaults.free;

    // Determine if model is standard or premium (exact match)
    const premiumModels = [
      'deepseek/deepseek-v4-pro',
      'z-ai/glm-5.1',
      'openai/gpt-5.4-mini',
      'x-ai/grok-4.3',
      'moonshotai/kimi-k2.5',
    ];
    const isPremium = premiumModels.some((m) => model === m);

    // Check tier allows this model type
    if (isPremium && defaults.maxWeeklyTokensPremium === 0) {
      return res.json({ error: 'Premium models require Novelist tier or above.' }, 403);
    }

    // Calculate estimated tokens for this request
    const inputText = messages.map((m) => m.content).join(' ');
    const estimatedInputTokens = estimateTokens(inputText);
    const estimatedOutputTokens = maxTok;
    const estimatedTotal = estimatedInputTokens + estimatedOutputTokens;

    // Check if weekly tokens need reset
    const weeklyResetAt = profile.weeklyTokensResetAt;
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;

    // Fix: treat null/undefined/0 as "never reset" — set to now on first call
    if (!weeklyResetAt || now - weeklyResetAt >= oneWeek) {
      try {
        await databases.updateDocument(databaseId, profilesCollection, userId, {
          weeklyTokensUsed: 0,
          weeklyTokensUsedPremium: 0,
          weeklyTokensResetAt: now,
        });
      } catch (resetErr) {
        const resetMsg = resetErr.message || '';
        const isMissingAttr = resetMsg.includes('Unknown attribute') || resetMsg.includes('document_invalid_structure');
        if (isMissingAttr) {
          console.error(`Token reset skipped — DB schema missing attribute: ${resetMsg}`);
        } else {
          throw resetErr;
        }
      }
      profile.weeklyTokensUsed = 0;
      profile.weeklyTokensUsedPremium = 0;
    }

    // Check token limits — standard and premium are tracked separately
    const standardUsed = profile.weeklyTokensUsed || 0;
    const premiumUsed = profile.weeklyTokensUsedPremium || 0;

    if (isPremium) {
      const premiumLimit = defaults.maxWeeklyTokensPremium;
      if (premiumUsed + estimatedTotal > premiumLimit) {
        return res.json({
          error: 'Premium token limit reached.',
          limitType: 'premium',
          used: premiumUsed,
          limit: premiumLimit,
        }, 429);
      }
    } else {
      const standardLimit = defaults.maxWeeklyTokensStandard;
      if (standardUsed + estimatedTotal > standardLimit) {
        return res.json({
          error: 'Standard token limit reached.',
          limitType: 'standard',
          used: standardUsed,
          limit: standardLimit,
        }, 429);
      }
    }

    // Call OpenRouter
    const openRouterKey = process.env.OPENROUTER_API_KEY;

    // Build request body
    const requestBody = {
      model,
      messages,
      temperature: temp,
      max_completion_tokens: maxTok,
    };

    // Provider forcing: configurable via env var
    const allowFallbacks = process.env.OPENROUTER_ALLOW_FALLBACKS !== 'true';
    if (model && model.startsWith('openai/')) {
      requestBody.provider = {
        order: ['OpenAI'],
        allow_fallbacks: !allowFallbacks,
      };
    }

    // Timeout to catch hung providers
    const controller = new AbortController();
    const timeoutMs = parseInt(process.env.REQUEST_TIMEOUT_MS || '30000', 10);
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    let response;
    try {
      response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openRouterKey}`,
          'HTTP-Referer': process.env.APPWRITE_FUNCTION_API_ENDPOINT || 'https://morpheus.app',
          'X-Title': 'Morpheus AI Co-Writer',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      if (fetchErr.name === 'AbortError') {
        return res.json({ error: 'AI request timed out. The provider took too long to respond. Please try again.' }, 504);
      }
      throw fetchErr;
    }

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`OpenRouter error ${response.status}: ${errBody.slice(0, 500)}`);
      let parsedError;
      try { parsedError = JSON.parse(errBody); } catch { /* ignore */ }
      return res.json({
        error: 'AI provider error.',
        providerStatus: response.status,
        providerMessage: parsedError?.error?.message || parsedError?.message || errBody.slice(0, 200),
      }, 502);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    // Count actual tokens used (from OpenRouter response or estimate)
    const actualTokens = data.usage?.total_tokens || estimateTokens(content) + estimatedInputTokens;

    // Update the correct token counter
    try {
      if (isPremium) {
        await databases.updateDocument(databaseId, profilesCollection, userId, {
          weeklyTokensUsedPremium: premiumUsed + actualTokens,
        });
      } else {
        await databases.updateDocument(databaseId, profilesCollection, userId, {
          weeklyTokensUsed: standardUsed + actualTokens,
        });
      }
    } catch (err) {
      const errMsg = err.message || '';
      const isMissingAttr = errMsg.includes('Unknown attribute') || errMsg.includes('document_invalid_structure');
      if (isMissingAttr) {
        console.error(`Token usage update skipped — DB schema missing attribute: ${errMsg}`);
        // Continue — deliver AI content even if we can't record tokens
      } else {
        console.error(`Failed to update token usage: ${errMsg}`);
        return res.json({ error: 'Failed to record token usage. Please retry.' }, 500);
      }
    }

    return res.json({
      content,
      tokensUsed: actualTokens,
      model,
      weeklyTokensUsed: isPremium ? standardUsed : standardUsed + actualTokens,
      weeklyTokensUsedPremium: isPremium ? premiumUsed + actualTokens : premiumUsed,
    });
  } catch (err) {
    console.error(`Unhandled error: ${err.message}`);
    return res.json({ error: 'Internal server error' }, 500);
  }
};

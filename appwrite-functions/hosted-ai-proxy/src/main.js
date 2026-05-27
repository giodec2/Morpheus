import { Client, Databases } from 'node-appwrite';

// Simple token estimation: characters / 4 (rough approximation)
function estimateTokens(text) {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

export default async ({ req, res, log, error }) => {
  try {
    log('--- Function started ---');
    log(`req.body type: ${typeof req.body}`);

    const payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { model, messages, temperature, maxTokens } = payload;

    log(`Model: ${model}, Messages count: ${messages?.length}`);

    if (!model || !messages || !Array.isArray(messages)) {
      return res.json({ error: 'Missing required fields: model, messages' }, 400);
    }

    // Get authenticated user ID from Appwrite context
    const userId = req.headers['x-appwrite-user-id'];
    log(`User ID: ${userId}`);
    if (!userId) {
      return res.json({ error: 'Authentication required' }, 401);
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
      log(`Profile loaded. Tier: ${profile.subscriptionTier}`);
    } catch (err) {
      error(`Profile fetch failed: ${err.message || err}`);
      return res.json({ error: 'User profile not found' }, 404);
    }

    // Tier defaults
    const tierDefaults = {
      free: { maxBooks: 1, maxWeeklyTokensStandard: 100_000, maxWeeklyTokensPremium: 0 },
      scribe: { maxBooks: 3, maxWeeklyTokensStandard: 1_000_000, maxWeeklyTokensPremium: 0 },
      novelist: { maxBooks: 10, maxWeeklyTokensStandard: 2_000_000, maxWeeklyTokensPremium: 100_000 },
      architect: { maxBooks: 50, maxWeeklyTokensStandard: 10_000_000, maxWeeklyTokensPremium: 1_000_000 },
    };

    const tier = profile.subscriptionTier || 'free';
    const defaults = tierDefaults[tier] || tierDefaults.free;

    // Determine if model is standard or premium
    const premiumModels = [
      'deepseek/deepseek-v4-pro',
      'z-ai/glm-5.1',
      'openai/gpt-5.4-mini',
      'x-ai/grok-4.3',
      'moonshotai/kimi-k2.5',
    ];
    const isPremium = premiumModels.some((m) => model.includes(m));

    // Check tier allows this model type
    if (isPremium && defaults.maxWeeklyTokensPremium === 0) {
      return res.json({ error: 'Premium models require Novelist tier or above.' }, 403);
    }

    // Calculate estimated tokens for this request
    const inputText = messages.map((m) => m.content).join(' ');
    const estimatedInputTokens = estimateTokens(inputText);
    const estimatedOutputTokens = maxTokens || 2048;
    const estimatedTotal = estimatedInputTokens + estimatedOutputTokens;

    // Check if weekly tokens need reset
    const weeklyResetAt = profile.weeklyTokensResetAt || 0;
    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;

    if (now - weeklyResetAt >= oneWeek) {
      await databases.updateDocument(databaseId, profilesCollection, userId, {
        weeklyTokensUsed: 0,
        weeklyTokensResetAt: now,
      });
      profile.weeklyTokensUsed = 0;
      log('Weekly tokens reset');
    }

    // Check token limits
    const weeklyUsed = profile.weeklyTokensUsed || 0;
    const weeklyLimit = isPremium ? defaults.maxWeeklyTokensPremium : defaults.maxWeeklyTokensStandard;

    if (weeklyUsed + estimatedTotal > weeklyLimit) {
      return res.json({
        error: `Token limit reached. Used ${weeklyUsed.toLocaleString()} / ${weeklyLimit.toLocaleString()} tokens this week.`,
      }, 429);
    }

    // Call OpenRouter
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterKey) {
      error('Missing OPENROUTER_API_KEY env var');
      return res.json({ error: 'Hosted AI not configured. Operator API key missing.' }, 500);
    }
    log('Calling OpenRouter...');

    // Build request body
    const requestBody = {
      model,
      messages,
      temperature: temperature ?? 0.7,
      max_completion_tokens: maxTokens ?? 2048,
    };

    // Force OpenAI provider for OpenAI models to avoid slow fallback providers
    // (e.g. gpt-5-nano has 6s fallback providers vs 2s direct OpenAI)
    if (model && model.startsWith('openai/')) {
      requestBody.provider = {
        order: ['OpenAI'],
        allow_fallbacks: false,
      };
      log(`Provider forced to OpenAI for model: ${model}`);
    }

    // 30s timeout to catch hung providers
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

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
        error('OpenRouter request timed out after 30s');
        return res.json({ error: 'AI request timed out. The provider took too long to respond. Please try again.' }, 504);
      }
      throw fetchErr;
    }

    if (!response.ok) {
      const errBody = await response.text();
      error(`OpenRouter error ${response.status}: ${errBody}`);
      return res.json({ error: 'AI provider error. Please try again later.' }, 502);
    }
    log('OpenRouter responded OK');

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    // Count actual tokens used (from OpenRouter response or estimate)
    const actualTokens = data.usage?.total_tokens || estimateTokens(content) + estimatedInputTokens;

    // Update profile token usage
    try {
      await databases.updateDocument(databaseId, profilesCollection, userId, {
        weeklyTokensUsed: weeklyUsed + actualTokens,
      });
      log(`Token usage updated: +${actualTokens}`);
    } catch (err) {
      error(`Failed to update token usage: ${err.message || err}`);
    }

    return res.json({
      content,
      tokensUsed: actualTokens,
      model,
    });
  } catch (err) {
    error(`Unhandled error: ${err.message}`);
    return res.json({ error: 'Internal server error' }, 500);
  }
};

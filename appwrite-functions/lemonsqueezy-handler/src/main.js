import { Client, Databases } from 'node-appwrite';
import crypto from 'crypto';

/**
 * Appwrite Edge Function: lemonsqueezy-handler
 *
 * Handles BOTH checkout creation (from frontend) AND webhook events (from LemonSqueezy).
 * Auto-routes based on request headers:
 *   - Webhooks: have X-Signature, no X-Appwrite-User-Id
 *   - Checkout: POST with X-Appwrite-User-Id (injected by Appwrite SDK for authenticated users)
 *
 * Required env vars:
 *   APPWRITE_FUNCTION_API_ENDPOINT
 *   APPWRITE_FUNCTION_PROJECT_ID
 *   APPWRITE_API_KEY
 *   APPWRITE_DATABASE_ID
 *   APPWRITE_COLLECTION_PROFILES
 *   LEMONSQUEEZY_API_KEY
 *   LEMONSQUEEZY_STORE_ID
 *   LEMONSQUEEZY_WEBHOOK_SECRET     (required in production)
 *   LEMONSQUEEZY_VARIANT_SCRIBE          (monthly)
 *   LEMONSQUEEZY_VARIANT_SCRIBE_ANNUAL
 *   LEMONSQUEEZY_VARIANT_NOVELIST        (monthly)
 *   LEMONSQUEEZY_VARIANT_NOVELIST_ANNUAL
 *   LEMONSQUEEZY_VARIANT_ARCHITECT       (monthly)
 *   LEMONSQUEEZY_VARIANT_ARCHITECT_ANNUAL
 *   CHECKOUT_SUCCESS_URL                 (optional, defaults to https://your-domain.com/app?checkout=success)
 */

// ───────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────

function verifySignature(body, signature, secret) {
  // In production, require the secret. In dev (localhost), allow skipping.
  const isProduction = !(process.env.APPWRITE_FUNCTION_API_ENDPOINT || '').includes('localhost');
  if (isProduction && !secret) {
    throw new Error('LEMONSQUEEZY_WEBHOOK_SECRET is required in production');
  }
  if (!secret) return true; // Dev only: skip if not configured
  if (!signature) return false;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(body);
  const digest = hmac.digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch {
    return false;
  }
}

function getVariantTierMap() {
  const map = {};
  if (process.env.LEMONSQUEEZY_VARIANT_SCRIBE) {
    map[process.env.LEMONSQUEEZY_VARIANT_SCRIBE] = 'scribe';
  }
  if (process.env.LEMONSQUEEZY_VARIANT_SCRIBE_ANNUAL) {
    map[process.env.LEMONSQUEEZY_VARIANT_SCRIBE_ANNUAL] = 'scribe';
  }
  if (process.env.LEMONSQUEEZY_VARIANT_NOVELIST) {
    map[process.env.LEMONSQUEEZY_VARIANT_NOVELIST] = 'novelist';
  }
  if (process.env.LEMONSQUEEZY_VARIANT_NOVELIST_ANNUAL) {
    map[process.env.LEMONSQUEEZY_VARIANT_NOVELIST_ANNUAL] = 'novelist';
  }
  if (process.env.LEMONSQUEEZY_VARIANT_ARCHITECT) {
    map[process.env.LEMONSQUEEZY_VARIANT_ARCHITECT] = 'architect';
  }
  if (process.env.LEMONSQUEEZY_VARIANT_ARCHITECT_ANNUAL) {
    map[process.env.LEMONSQUEEZY_VARIANT_ARCHITECT_ANNUAL] = 'architect';
  }
  return map;
}

function parseDate(dateStr) {
  if (!dateStr) return null;
  const ts = new Date(dateStr).getTime();
  return isNaN(ts) ? null : ts;
}

function validateEnv() {
  const required = [
    'APPWRITE_FUNCTION_API_ENDPOINT',
    'APPWRITE_FUNCTION_PROJECT_ID',
    'APPWRITE_API_KEY',
    'APPWRITE_DATABASE_ID',
    'APPWRITE_COLLECTION_PROFILES',
    'LEMONSQUEEZY_API_KEY',
    'LEMONSQUEEZY_STORE_ID',
  ];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
}

// ───────────────────────────────────────────────
// Checkout Handler
// ───────────────────────────────────────────────

async function handleCheckout({ req, res, log, error }) {
  try {
    if (req.method !== 'POST') {
      return res.json({ error: 'Method not allowed' }, 405);
    }

    const userId = req.headers['x-appwrite-user-id'];
    if (!userId) {
      return res.json({ error: 'Authentication required' }, 401);
    }

    let payload;
    try {
      payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    } catch {
      return res.json({ error: 'Invalid JSON body' }, 400);
    }

    const { variantId } = payload;
    if (!variantId) {
      return res.json({ error: 'variantId is required' }, 400);
    }

    // Appwrite admin client
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);

    let profile;
    try {
      profile = await databases.getDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_PROFILES,
        userId
      );
    } catch (err) {
      error(`Profile fetch failed: ${err.message || err}`);
      const isNotFound = err.code === 404 || err.type === 'document_not_found';
      if (isNotFound) {
        return res.json({ error: 'User profile not found' }, 404);
      }
      return res.json({ error: 'Database error while fetching profile' }, 502);
    }

    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;

    if (!apiKey || !storeId) {
      return res.json({ error: 'Payment provider not configured' }, 500);
    }

    log(`Creating checkout for user ${userId}, variant ${variantId}`);

    const redirectUrl = process.env.CHECKOUT_SUCCESS_URL || 'https://your-domain.com/app?checkout=success';

    const checkoutResponse = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              email: profile.email || '',
              custom: { user_id: userId },
            },
            product_options: {
              redirect_url: redirectUrl,
            },
          },
          relationships: {
            store: {
              data: { type: 'stores', id: String(storeId) },
            },
            variant: {
              data: { type: 'variants', id: String(variantId) },
            },
          },
        },
      }),
    });

    if (!checkoutResponse.ok) {
      const errText = await checkoutResponse.text();
      error(`LemonSqueezy API error: ${checkoutResponse.status} - ${errText}`);
      let detail = '';
      try {
        const parsed = JSON.parse(errText);
        detail = parsed.errors?.[0]?.detail || parsed.message || '';
      } catch {
        detail = errText;
      }
      return res.json(
        {
          error: `Failed to create checkout session (LemonSqueezy ${checkoutResponse.status}${detail ? `: ${detail}` : ''})`,
        },
        502
      );
    }

    const checkoutData = await checkoutResponse.json();
    const checkoutUrl = checkoutData.data?.attributes?.url;

    if (!checkoutUrl) {
      return res.json({ error: 'Invalid checkout response from provider' }, 500);
    }

    log(`Checkout created successfully`);
    return res.json({ checkoutUrl });
  } catch (err) {
    error(`Unhandled checkout error: ${err.message}`);
    return res.json({ error: 'Internal server error' }, 500);
  }
}

// ───────────────────────────────────────────────
// Webhook Handler
// ───────────────────────────────────────────────

async function handleWebhook({ req, res, log, error }) {
  try {
    const signature = req.headers['x-signature'];
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    const bodyRaw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    try {
      if (!verifySignature(bodyRaw, signature, secret)) {
        return res.json({ error: 'Invalid signature' }, 401);
      }
    } catch (sigErr) {
      error(`Signature verification error: ${sigErr.message}`);
      return res.json({ error: sigErr.message }, 500);
    }

    let payload;
    try {
      payload = JSON.parse(bodyRaw);
    } catch {
      return res.json({ error: 'Invalid JSON payload' }, 400);
    }

    const eventName = payload.meta?.event_name;
    const data = payload.data;

    log(`Webhook received: ${eventName}`);

    if (!eventName || !data) {
      return res.json({ error: 'Invalid payload structure' }, 400);
    }

    const handledEvents = [
      'subscription_created',
      'subscription_updated',
      'subscription_cancelled',
      'subscription_expired',
      'subscription_paused',
      'subscription_resumed',
      'subscription_unpaused',
      'subscription_payment_success',
      'subscription_payment_failed',
      'subscription_payment_recovered',
    ];

    if (!handledEvents.includes(eventName)) {
      log(`Ignoring unhandled event: ${eventName}`);
      return res.json({ received: true });
    }

    const userId = payload.meta?.custom_data?.user_id;
    if (!userId) {
      log('No user_id found in custom_data, skipping');
      return res.json({ received: true });
    }

    const attrs = data.attributes || {};
    const variantId = String(attrs.variant_id || '');
    const status = attrs.status || '';
    const subscriptionId = String(data.id || '');

    const variantMap = getVariantTierMap();
    const tier = variantMap[variantId];

    if (!tier && (eventName === 'subscription_created' || eventName === 'subscription_updated')) {
      log(`Warning: Unknown variant_id ${variantId}, no tier mapping found`);
    }

    // Appwrite admin client
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);

    const updates = {};

    if (eventName === 'subscription_created' || eventName === 'subscription_updated') {
      if (tier) updates.subscriptionTier = tier;
      updates.subscriptionStatus = status;
      updates.subscriptionId = subscriptionId;
      updates.subscriptionRenewsAt = parseDate(attrs.renews_at);
      updates.subscriptionEndsAt = parseDate(attrs.ends_at);
      updates.lemonSqueezyCustomerId = String(attrs.customer_id || '');
      updates.lemonSqueezyVariantId = variantId;
      updates.trialEndsAt = parseDate(attrs.trial_ends_at);
      if (attrs.urls?.customer_portal) {
        updates.customerPortalUrl = attrs.urls.customer_portal;
      }
    } else if (eventName === 'subscription_cancelled') {
      updates.subscriptionStatus = 'cancelled';
      updates.subscriptionEndsAt = parseDate(attrs.ends_at);
    } else if (eventName === 'subscription_expired') {
      updates.subscriptionStatus = 'expired';
      updates.subscriptionEndsAt = parseDate(attrs.ends_at);
    } else if (eventName === 'subscription_paused') {
      updates.subscriptionStatus = 'paused';
    } else if (eventName === 'subscription_resumed' || eventName === 'subscription_unpaused') {
      updates.subscriptionStatus = status || 'active';
    } else if (eventName === 'subscription_payment_success') {
      updates.subscriptionStatus = status || 'active';
    } else if (eventName === 'subscription_payment_failed') {
      updates.subscriptionStatus = 'past_due';
    } else if (eventName === 'subscription_payment_recovered') {
      updates.subscriptionStatus = status || 'active';
    }

    try {
      await databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_PROFILES,
        userId,
        updates
      );
      // Log only non-sensitive fields
      log(`Profile updated for user ${userId}: tier=${updates.subscriptionTier || 'unchanged'}, status=${updates.subscriptionStatus || 'unchanged'}`);
    } catch (err) {
      error(`Failed to update profile: ${err.message || err}`);
      return res.json({ error: 'Failed to update user profile' }, 500);
    }

    return res.json({ received: true });
  } catch (err) {
    error(`Unhandled webhook error: ${err.message}`);
    return res.json({ error: 'Internal server error' }, 500);
  }
}

// ───────────────────────────────────────────────
// Customer Portal URL Generator
// ───────────────────────────────────────────────

async function getStoreUrl(apiKey, storeId, error) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(`https://api.lemonsqueezy.com/v1/stores/${encodeURIComponent(storeId)}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${apiKey}`,
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text();
      error(`LemonSqueezy store API error: ${response.status} - ${errText}`);
      return null;
    }

    const data = await response.json();
    return data.data?.attributes?.url || null;
  } catch (err) {
    error(`Failed to fetch store URL: ${err.message}`);
    return null;
  }
}

async function handlePortal({ req, res, log, error }) {
  try {
    if (req.method !== 'POST') {
      return res.json({ error: 'Method not allowed' }, 405);
    }

    const userId = req.headers['x-appwrite-user-id'];
    if (!userId) {
      return res.json({ error: 'Authentication required' }, 401);
    }

    let payload;
    try {
      payload = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    } catch {
      return res.json({ error: 'Invalid JSON body' }, 400);
    }

    const { customerId } = payload;
    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;

    if (!apiKey || !storeId) {
      return res.json({ error: 'Payment provider not configured' }, 500);
    }

    // If we have a customer ID, try to generate a direct portal URL
    if (customerId) {
      log(`Generating portal URL for user ${userId}, customer ${customerId}`);

      const portalResponse = await fetch('https://api.lemonsqueezy.com/v1/customer-portal-urls', {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          data: {
            type: 'customer-portal-urls',
            attributes: {
              customer_id: String(customerId),
            },
          },
        }),
      });

      if (portalResponse.ok) {
        const portalData = await portalResponse.json();
        const portalUrl = portalData.data?.attributes?.url;
        if (portalUrl) {
          log(`Portal URL generated successfully`);
          return res.json({ portalUrl });
        }
      }

      // If specific portal generation fails, fall through to generic portal
      const errText = await portalResponse.text();
      error(`Direct portal generation failed: ${portalResponse.status} - ${errText}. Falling back to generic portal.`);
    }

    // Generic customer portal fallback — user enters their email on LemonSqueezy's page
    log(`Returning generic portal URL for user ${userId}`);
    const storeUrl = await getStoreUrl(apiKey, storeId, error);
    if (!storeUrl) {
      return res.json({ error: 'Could not retrieve store portal URL' }, 502);
    }

    const genericPortalUrl = storeUrl.endsWith('/') ? `${storeUrl}billing` : `${storeUrl}/billing`;
    return res.json({ portalUrl: genericPortalUrl });
  } catch (err) {
    error(`Unhandled portal error: ${err.message}`);
    return res.json({ error: 'Internal server error' }, 500);
  }
}

// ───────────────────────────────────────────────
// Main Router
// ───────────────────────────────────────────────

export default async (context) => {
  const { req, res } = context;

  try {
    validateEnv();
  } catch (err) {
    context.error(`Env validation failed: ${err.message}`);
    return res.json({ error: 'Server misconfiguration' }, 500);
  }

  // Route based on headers and path:
  // - Webhooks have X-Signature and no X-Appwrite-User-Id
  // - Frontend calls have X-Appwrite-User-Id (auto-injected by Appwrite SDK)
  //   path === '/portal' -> customer portal URL generation
  //   default -> checkout creation

  const hasSignature = req.headers['x-signature'];
  const hasUserId = req.headers['x-appwrite-user-id'];

  if (hasSignature && !hasUserId) {
    return handleWebhook(context);
  }

  if (req.method === 'POST' && hasUserId) {
    const path = req.path || '/';
    if (path === '/portal' || path === 'portal') {
      return handlePortal(context);
    }
    return handleCheckout(context);
  }

  return res.json({ error: 'Invalid request. Expected authenticated checkout, portal request, or signed webhook.' }, 400);
};

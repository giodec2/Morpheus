import { Client, Databases } from 'node-appwrite';
import crypto from 'crypto';

/**
 * Appwrite Edge Function: lemonsqueezy-webhook
 *
 * Receives LemonSqueezy webhook events and updates user subscription status.
 *
 * Required env vars:
 *   APPWRITE_FUNCTION_API_ENDPOINT  - Appwrite API endpoint
 *   APPWRITE_FUNCTION_PROJECT_ID    - Appwrite project ID
 *   APPWRITE_API_KEY                - Appwrite API key
 *   APPWRITE_DATABASE_ID            - Database ID
 *   APPWRITE_COLLECTION_PROFILES    - Profiles collection ID
 *   LEMONSQUEEZY_WEBHOOK_SECRET     - Webhook signing secret (optional but recommended)
 *   LEMONSQUEEZY_VARIANT_SCRIBE     - Scribe variant ID
 *   LEMONSQUEEZY_VARIANT_NOVELIST   - Novelist variant ID
 *   LEMONSQUEEZY_VARIANT_ARCHITECT  - Architect variant ID
 */

function verifySignature(body, signature, secret) {
  if (!secret) {
    // Skip verification if secret not configured (development only)
    return true;
  }
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
  if (process.env.LEMONSQUEEZY_VARIANT_NOVELIST) {
    map[process.env.LEMONSQUEEZY_VARIANT_NOVELIST] = 'novelist';
  }
  if (process.env.LEMONSQUEEZY_VARIANT_ARCHITECT) {
    map[process.env.LEMONSQUEEZY_VARIANT_ARCHITECT] = 'architect';
  }
  if (process.env.LEMONSQUEEZY_VARIANT_MAESTRO) {
    map[process.env.LEMONSQUEEZY_VARIANT_MAESTRO] = 'maestro';
  }
  if (process.env.LEMONSQUEEZY_VARIANT_MAESTRO_ANNUAL) {
    map[process.env.LEMONSQUEEZY_VARIANT_MAESTRO_ANNUAL] = 'maestro';
  }
  return map;
}

function parseDate(dateStr) {
  if (!dateStr) return null;
  const ts = new Date(dateStr).getTime();
  return isNaN(ts) ? null : ts;
}

export default async ({ req, res, log, error }) => {
  try {
    const signature = req.headers['x-signature'];
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    const bodyRaw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    // Verify webhook signature
    if (!verifySignature(bodyRaw, signature, secret)) {
      return res.json({ error: 'Invalid signature' }, 401);
    }

    // Parse payload
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

    // Events we care about
    const handledEvents = [
      'subscription_created',
      'subscription_updated',
      'subscription_cancelled',
      'subscription_expired',
      'subscription_paused',
      'subscription_resumed',
      'subscription_unpaused',
    ];

    if (!handledEvents.includes(eventName)) {
      log(`Ignoring unhandled event: ${eventName}`);
      return res.json({ received: true });
    }

    // Extract user_id from custom_data
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

    // Build update based on event type
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
      // Store customer portal URL if available
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
    }

    try {
      await databases.updateDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_PROFILES,
        userId,
        updates
      );
      log(`Profile updated for user ${userId}: ${JSON.stringify(updates)}`);
    } catch (err) {
      error(`Failed to update profile: ${err.message || err}`);
      return res.json({ error: 'Failed to update user profile' }, 500);
    }

    return res.json({ received: true });
  } catch (err) {
    error(`Unhandled webhook error: ${err.message}`);
    return res.json({ error: 'Internal server error' }, 500);
  }
};

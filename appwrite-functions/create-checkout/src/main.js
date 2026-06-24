import { Client, Databases } from 'node-appwrite';

/**
 * Appwrite Edge Function: create-checkout
 *
 * Creates a LemonSqueezy checkout session for an authenticated user.
 *
 * Required env vars (set in Appwrite Console → Function → Settings → Variables):
 *   APPWRITE_FUNCTION_API_ENDPOINT  - Appwrite API endpoint
 *   APPWRITE_FUNCTION_PROJECT_ID    - Appwrite project ID
 *   APPWRITE_API_KEY                - Appwrite API key (with database read/write)
 *   APPWRITE_DATABASE_ID            - Database ID
 *   APPWRITE_COLLECTION_PROFILES    - Profiles collection ID
 *   LEMONSQUEEZY_API_KEY            - LemonSqueezy API key
 *   LEMONSQUEEZY_STORE_ID           - LemonSqueezy store ID
 */

export default async ({ req, res, log, error }) => {
  try {
    // Only accept POST
    if (req.method !== 'POST') {
      return res.json({ error: 'Method not allowed' }, 405);
    }

    // Authenticate user via Appwrite session
    const userId = req.headers['x-appwrite-user-id'];
    if (!userId) {
      return res.json({ error: 'Authentication required' }, 401);
    }

    // Parse body
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

    // Fetch user profile to get email
    let profile;
    try {
      profile = await databases.getDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_COLLECTION_PROFILES,
        userId
      );
    } catch (err) {
      error(`Profile fetch failed: ${err.message || err}`);
      return res.json({ error: 'User profile not found' }, 404);
    }

    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;

    if (!apiKey || !storeId) {
      return res.json({ error: 'Payment provider not configured' }, 500);
    }

    log(`Creating checkout for user ${userId}, variant ${variantId}`);

    // Call LemonSqueezy API to create checkout
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
              custom: {
                user_id: userId,
              },
            },
            product_options: {
              redirect_url: 'https://your-domain.com/app?checkout=success',
            },
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: String(storeId),
              },
            },
            variant: {
              data: {
                type: 'variants',
                id: String(variantId),
              },
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
    error(`Unhandled error: ${err.message}`);
    return res.json({ error: 'Internal server error' }, 500);
  }
};

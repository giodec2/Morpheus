import { functions } from '@/lib/appwrite';
import { ExecutionMethod } from 'appwrite';

const CREATE_CHECKOUT_FUNCTION_ID = import.meta.env.VITE_APPWRITE_FUNCTION_CREATE_CHECKOUT_ID || '';

export async function createCheckout(variantId: string): Promise<string> {
  if (!CREATE_CHECKOUT_FUNCTION_ID) {
    throw new Error('Payment system is not configured yet. Please try again later.');
  }

  const execution = await functions.createExecution(
    CREATE_CHECKOUT_FUNCTION_ID,
    JSON.stringify({ variantId }),
    false,
    '/',
    ExecutionMethod.POST
  );

  let result: { checkoutUrl?: string; error?: string };
  try {
    result = JSON.parse(execution.responseBody);
  } catch {
    throw new Error('Invalid response from payment server');
  }

  if (result.error) {
    throw new Error(result.error);
  }

  if (!result.checkoutUrl) {
    throw new Error('No checkout URL returned');
  }

  return result.checkoutUrl;
}

/** Map tier names to LemonSqueezy variant IDs */
export const TIER_VARIANT_MAP: Record<string, string> = {
  scribe: import.meta.env.VITE_LEMONSQUEEZY_VARIANT_SCRIBE || '',
  novelist: import.meta.env.VITE_LEMONSQUEEZY_VARIANT_NOVELIST || '',
  architect: import.meta.env.VITE_LEMONSQUEEZY_VARIANT_ARCHITECT || '',
};

export function getVariantIdForTier(tier: string): string | null {
  return TIER_VARIANT_MAP[tier] || null;
}

export async function getCustomerPortalUrl(customerId?: string | null): Promise<string> {
  if (!CREATE_CHECKOUT_FUNCTION_ID) {
    throw new Error('Payment system is not configured yet. Please try again later.');
  }

  const execution = await functions.createExecution(
    CREATE_CHECKOUT_FUNCTION_ID,
    JSON.stringify({ customerId: customerId || undefined }),
    false,
    '/portal',
    ExecutionMethod.POST
  );

  let result: { portalUrl?: string; error?: string };
  try {
    result = JSON.parse(execution.responseBody);
  } catch {
    throw new Error('Invalid response from payment server');
  }

  if (result.error) {
    throw new Error(result.error);
  }

  if (!result.portalUrl) {
    throw new Error('No portal URL returned');
  }

  return result.portalUrl;
}

export function isBillingConfigured(): boolean {
  return Boolean(
    import.meta.env.VITE_APPWRITE_FUNCTION_CREATE_CHECKOUT_ID &&
    TIER_VARIANT_MAP.scribe &&
    TIER_VARIANT_MAP.novelist &&
    TIER_VARIANT_MAP.architect
  );
}

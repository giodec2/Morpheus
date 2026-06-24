import { functions } from '@/lib/appwrite';
import { ExecutionMethod } from 'appwrite';

type TFunction = (key: string, interpolations?: Record<string, string | number>) => string;

const CREATE_CHECKOUT_FUNCTION_ID = import.meta.env.VITE_APPWRITE_FUNCTION_CREATE_CHECKOUT_ID || '';

export async function createCheckout(variantId: string, t?: TFunction): Promise<string> {
  if (!CREATE_CHECKOUT_FUNCTION_ID) {
    throw new Error(t ? t('settings.billing.paymentNotConfigured') : 'Payment system is not configured yet. Please try again later.');
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
    throw new Error(t ? t('settings.billing.invalidResponse') : 'Invalid response from payment server');
  }

  if (result.error) {
    throw new Error(result.error);
  }

  if (!result.checkoutUrl) {
    throw new Error(t ? t('settings.billing.noCheckoutUrl') : 'No checkout URL returned');
  }

  return result.checkoutUrl;
}

export type BillingInterval = 'monthly' | 'annual';

/** Map tier + billing interval to LemonSqueezy variant IDs */
export const TIER_VARIANT_MAP: Record<string, Record<BillingInterval, string>> = {
  scribe: {
    monthly: import.meta.env.VITE_LEMONSQUEEZY_VARIANT_SCRIBE || '',
    annual: import.meta.env.VITE_LEMONSQUEEZY_VARIANT_SCRIBE_ANNUAL || '',
  },
  novelist: {
    monthly: import.meta.env.VITE_LEMONSQUEEZY_VARIANT_NOVELIST || '',
    annual: import.meta.env.VITE_LEMONSQUEEZY_VARIANT_NOVELIST_ANNUAL || '',
  },
  architect: {
    monthly: import.meta.env.VITE_LEMONSQUEEZY_VARIANT_ARCHITECT || '',
    annual: import.meta.env.VITE_LEMONSQUEEZY_VARIANT_ARCHITECT_ANNUAL || '',
  },
};

export function getVariantIdForTier(tier: string, interval: BillingInterval = 'monthly'): string | null {
  return TIER_VARIANT_MAP[tier]?.[interval] || null;
}

export async function getCustomerPortalUrl(customerId?: string | null, t?: TFunction): Promise<string> {
  if (!CREATE_CHECKOUT_FUNCTION_ID) {
    throw new Error(t ? t('settings.billing.paymentNotConfigured') : 'Payment system is not configured yet. Please try again later.');
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
    throw new Error(t ? t('settings.billing.invalidResponse') : 'Invalid response from payment server');
  }

  if (result.error) {
    throw new Error(result.error);
  }

  if (!result.portalUrl) {
    throw new Error(t ? t('settings.billing.noPortalUrl') : 'No portal URL returned');
  }

  return result.portalUrl;
}

export function isBillingConfigured(): boolean {
  return Boolean(
    import.meta.env.VITE_APPWRITE_FUNCTION_CREATE_CHECKOUT_ID &&
    TIER_VARIANT_MAP.scribe.monthly &&
    TIER_VARIANT_MAP.scribe.annual &&
    TIER_VARIANT_MAP.novelist.monthly &&
    TIER_VARIANT_MAP.novelist.annual &&
    TIER_VARIANT_MAP.architect.monthly &&
    TIER_VARIANT_MAP.architect.annual
  );
}

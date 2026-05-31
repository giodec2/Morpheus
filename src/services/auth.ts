import { account, databases, appwriteConfig, userPermissions, ID } from '@/lib/appwrite';
import { useAuthStore, type UserProfile } from '@/stores/authStore';
import { syncFromCloud, syncToCloud } from '@/services/sync';
import { getAllBooks, putBook } from '@/db/books';
import { putChapter } from '@/db/chapters';
import { putCharacter } from '@/db/characters';
import { putLoreBible } from '@/db/loreBibles';
import type { Models } from 'appwrite';

export const TIER_DEFAULTS: Record<UserProfile['subscriptionTier'], { maxBooks: number; maxWeeklyTokensStandard: number; maxWeeklyTokensPremium: number }> = {
  free: { maxBooks: 1, maxWeeklyTokensStandard: 100_000, maxWeeklyTokensPremium: 0 },
  scribe: { maxBooks: 3, maxWeeklyTokensStandard: 1_000_000, maxWeeklyTokensPremium: 0 },
  novelist: { maxBooks: 10, maxWeeklyTokensStandard: 2_000_000, maxWeeklyTokensPremium: 100_000 },
  architect: { maxBooks: 50, maxWeeklyTokensStandard: 10_000_000, maxWeeklyTokensPremium: 1_000_000 },
};

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function normalizeProfile(profile: UserProfile): UserProfile {
  const tier = profile.subscriptionTier;
  const status = profile.subscriptionStatus;

  console.log('[Auth] normalizeProfile raw:', { tier, status, name: profile.name });

  // Only downgrade when subscription is explicitly inactive.
  // Null/undefined status preserves the tier (handles legacy profiles,
  // admin-set tiers, or webhook delays).
  const isExplicitlyInactive = status === 'cancelled' || status === 'expired' || status === 'past_due' || status === 'unpaid' || status === 'paused';
  const effectiveTier = isExplicitlyInactive ? 'free' : tier;

  // Sanitize invalid tier values to 'free' to prevent frontend/backend disagreement
  const validTiers: UserProfile['subscriptionTier'][] = ['free', 'scribe', 'novelist', 'architect'];
  const sanitizedTier = validTiers.includes(effectiveTier) ? effectiveTier : 'free';

  if (sanitizedTier !== tier) {
    console.warn('[Auth] Tier sanitized:', { from: tier, to: sanitizedTier, reason: isExplicitlyInactive ? 'inactive_status' : 'invalid_value' });
  }

  const defaults = TIER_DEFAULTS[sanitizedTier] || TIER_DEFAULTS.free;
  const normalized = {
    ...profile,
    subscriptionTier: sanitizedTier,
    maxBooks: defaults.maxBooks,
    maxWeeklyTokensStandard: defaults.maxWeeklyTokensStandard,
    maxWeeklyTokensPremium: defaults.maxWeeklyTokensPremium,
    weeklyTokensUsedPremium: profile.weeklyTokensUsedPremium || 0,
  };
  console.log('[Auth] normalizeProfile result:', { tier: normalized.subscriptionTier, maxBooks: normalized.maxBooks });
  return normalized;
}

/** Check if weekly tokens need resetting (7 days passed) */
function getTokenResetUpdate(profile: UserProfile): Partial<UserProfile> | null {
  const now = Date.now();
  const resetAt = profile.weeklyTokensResetAt;

  if (!resetAt || now - resetAt >= ONE_WEEK_MS) {
    return {
      weeklyTokensUsed: 0,
      weeklyTokensUsedPremium: 0,
      weeklyTokensResetAt: now,
    };
  }
  return null;
}

export async function getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
  try {
    return await account.get();
  } catch (err) {
    // Only return null for auth errors (no session). Re-throw for other errors.
    const isAuthError = err instanceof Error && (
      err.message?.includes('User (role: guests)') ||
      err.message?.includes('missing scope') ||
      err.message?.includes('Unauthorized')
    );
    if (isAuthError) return null;
    // For network/server errors, log and return null gracefully
    console.warn('[Auth] getCurrentUser error:', err);
    return null;
  }
}

async function postAuthSetup(user: Models.User<Models.Preferences>): Promise<void> {
  const { setProfile } = useAuthStore.getState();
  const profile = await fetchOrCreateProfile(user);
  setProfile(profile);
  const localBooks = await getAllBooks();
  await syncToCloud(localBooks);
  await syncFromCloud(localBooks, putBook, putChapter, putCharacter, putLoreBible);
}

export async function initAuth(): Promise<void> {
  const { setUser, setProfile, setIsLoading } = useAuthStore.getState();
  setIsLoading(true);
  try {
    const user = await getCurrentUser();
    setUser(user);
    if (user) {
      try {
        await postAuthSetup(user);
      } catch (setupErr) {
        console.error('[Auth] postAuthSetup failed:', setupErr);
        // Keep the user logged in but clear the stale profile so UI shows "needs reload"
        setProfile(null);
      }
    }
  } finally {
    setIsLoading(false);
  }
}

export async function login(email: string, password: string): Promise<void> {
  const { setUser } = useAuthStore.getState();
  await account.createEmailPasswordSession(email, password);
  const user = await account.get();
  setUser(user);
  await postAuthSetup(user);
}

export async function register(email: string, password: string, name: string): Promise<void> {
  const { setUser } = useAuthStore.getState();
  await account.create(ID.unique(), email, password, name);
  await account.createEmailPasswordSession(email, password);
  const user = await account.get();
  setUser(user);
  // Run full post-auth setup: create profile, sync local books to cloud, etc.
  await postAuthSetup(user);
}

export async function logout(): Promise<void> {
  const { setUser, setProfile } = useAuthStore.getState();
  await account.deleteSession('current');
  setUser(null);
  setProfile(null);
}

async function fetchOrCreateProfile(user: Models.User<Models.Preferences>): Promise<UserProfile> {
  try {
    console.log('[Auth] Fetching profile for user:', user.$id);
    const doc = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.profiles,
      user.$id
    );
    console.log('[Auth] Profile document fetched:', doc.$id);
    const rawProfile = doc as unknown as UserProfile;
    let normalized = normalizeProfile(rawProfile);

    // Check if weekly tokens need resetting
    const tokenReset = getTokenResetUpdate(normalized);
    if (tokenReset) {
      try {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.collections.profiles,
          user.$id,
          tokenReset
        );
        normalized = { ...normalized, ...tokenReset };
      } catch (tokenErr) {
        const tokenMsg = (tokenErr as Error)?.message || '';
        const isMissingAttr = tokenMsg.includes('Unknown attribute') || tokenMsg.includes('document_invalid_structure');
        if (isMissingAttr) {
          console.warn('[Auth] Token reset skipped — DB schema missing attribute:', tokenMsg);
          // Still apply reset locally so the UI doesn't keep trying
          normalized = { ...normalized, ...tokenReset };
        } else {
          console.error('[Auth] Token reset failed:', tokenErr);
        }
      }
    }

    return normalized;
  } catch (err) {
    const code = (err as Record<string, unknown>)?.code;
    const type = (err as Record<string, unknown>)?.type;
    const message = (err as Error)?.message;
    console.error('[Auth] fetchOrCreateProfile error:', { code, type, message, userId: user.$id });

    // Only create a new profile if the document truly doesn't exist (404)
    const isNotFound = code === 404 || type === 'document_not_found' || message?.includes('Document with the requested ID could not be found');
    if (isNotFound) {
      console.log('[Auth] Profile not found, creating new free profile for:', user.$id);
      return createProfile(user);
    }

    // For permission errors or other issues, re-throw so the caller can handle it
    throw err;
  }
}

async function createProfile(user: Models.User<Models.Preferences>): Promise<UserProfile> {
  const now = Date.now();
  const defaults = TIER_DEFAULTS.free;
  const profile: Omit<UserProfile, '$id'> = {
    email: user.email,
    name: user.name || user.email.split('@')[0],
    subscriptionTier: 'free',
    subscriptionStatus: null,
    subscriptionId: null,
    subscriptionRenewsAt: null,
    subscriptionEndsAt: null,
    lemonSqueezyCustomerId: null,
    lemonSqueezyVariantId: null,
    customerPortalUrl: null,
    trialEndsAt: null,
    weeklyTokensUsed: 0,
    weeklyTokensUsedPremium: 0,
    weeklyTokensResetAt: now,
    maxBooks: defaults.maxBooks,
    maxWeeklyTokensStandard: defaults.maxWeeklyTokensStandard,
    maxWeeklyTokensPremium: defaults.maxWeeklyTokensPremium,
  };

  const doc = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.collections.profiles,
    user.$id,
    profile,
    userPermissions(user.$id)
  );

  return { $id: doc.$id, ...profile };
}

export async function updateProfile(updates: Partial<Omit<UserProfile, '$id'>>): Promise<void> {
  const { user, profile, setProfile } = useAuthStore.getState();
  if (!user || !profile) return;

  await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.collections.profiles,
    user.$id,
    updates
  );

  const updated = { ...profile, ...updates };
  setProfile(normalizeProfile(updated));
}

/** Re-fetch the user's profile from Appwrite and update the store.
 *  Call this periodically or when focus returns to detect subscription changes.
 */
export async function refreshProfile(): Promise<void> {
  const { user, setProfile } = useAuthStore.getState();
  if (!user) return;

  try {
    const doc = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.profiles,
      user.$id
    );
    const rawProfile = doc as unknown as UserProfile;
    let normalized = normalizeProfile(rawProfile);

    // Check if weekly tokens need resetting
    const tokenReset = getTokenResetUpdate(normalized);
    if (tokenReset) {
      try {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.collections.profiles,
          user.$id,
          tokenReset
        );
        normalized = { ...normalized, ...tokenReset };
      } catch (tokenErr) {
        const tokenMsg = (tokenErr as Error)?.message || '';
        const isMissingAttr = tokenMsg.includes('Unknown attribute') || tokenMsg.includes('document_invalid_structure');
        if (isMissingAttr) {
          console.warn('[Auth] Token reset skipped — DB schema missing attribute:', tokenMsg);
          normalized = { ...normalized, ...tokenReset };
        } else {
          console.error('[Auth] Token reset failed:', tokenErr);
        }
      }
    }

    setProfile(normalized);
  } catch (err) {
    console.error('[Auth] refreshProfile failed:', err);
  }
}

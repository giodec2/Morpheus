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

  // Use free tier limits if subscription is not active (expired, cancelled, etc.)
  const hasActiveSub = status === 'active' || status === 'on_trial';
  const effectiveTier = hasActiveSub ? tier : 'free';

  const defaults = TIER_DEFAULTS[effectiveTier] || TIER_DEFAULTS.free;
  return {
    ...profile,
    maxBooks: defaults.maxBooks,
    maxWeeklyTokensStandard: defaults.maxWeeklyTokensStandard,
    maxWeeklyTokensPremium: defaults.maxWeeklyTokensPremium,
  };
}

/** Check if weekly tokens need resetting (7 days passed) */
function getTokenResetUpdate(profile: UserProfile): Partial<UserProfile> | null {
  const now = Date.now();
  const resetAt = profile.weeklyTokensResetAt;

  if (!resetAt || now - resetAt >= ONE_WEEK_MS) {
    return {
      weeklyTokensUsed: 0,
      weeklyTokensResetAt: now,
    };
  }
  return null;
}

export async function getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
  try {
    return await account.get();
  } catch {
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
  const { setUser, setIsLoading } = useAuthStore.getState();
  setIsLoading(true);
  try {
    const user = await getCurrentUser();
    setUser(user);
    if (user) {
      await postAuthSetup(user);
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
  const { setUser, setProfile } = useAuthStore.getState();
  await account.create(ID.unique(), email, password, name);
  await account.createEmailPasswordSession(email, password);
  const user = await account.get();
  setUser(user);
  const profile = await createProfile(user);
  setProfile(profile);
}

export async function logout(): Promise<void> {
  const { setUser, setProfile } = useAuthStore.getState();
  await account.deleteSession('current');
  setUser(null);
  setProfile(null);
}

async function fetchOrCreateProfile(user: Models.User<Models.Preferences>): Promise<UserProfile> {
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
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.profiles,
        user.$id,
        tokenReset
      );
      normalized = { ...normalized, ...tokenReset };
    }

    return normalized;
  } catch {
    return createProfile(user);
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

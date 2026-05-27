import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Models } from 'appwrite';

interface AuthState {
  user: Models.User<Models.Preferences> | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isSyncing: boolean;
  lastSyncAt: number | null;
  setUser: (user: Models.User<Models.Preferences> | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setIsLoading: (loading: boolean) => void;
  setIsSyncing: (syncing: boolean) => void;
  setLastSyncAt: (timestamp: number | null) => void;
}

export interface UserProfile {
  $id: string;
  email: string;
  name: string;
  subscriptionTier: 'free' | 'scribe' | 'novelist' | 'architect';
  subscriptionStatus: 'active' | 'cancelled' | 'past_due' | 'expired' | 'on_trial' | 'unpaid' | 'paused' | null;
  subscriptionId: string | null;
  subscriptionRenewsAt: number | null;
  subscriptionEndsAt: number | null;
  lemonSqueezyCustomerId: string | null;
  lemonSqueezyVariantId: string | null;
  customerPortalUrl: string | null;
  trialEndsAt: number | null;
  weeklyTokensUsed: number;
  weeklyTokensUsedPremium: number;
  weeklyTokensResetAt: number;
  maxBooks: number;
  maxWeeklyTokensStandard: number;
  maxWeeklyTokensPremium: number;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      isLoading: true,
      isSyncing: false,
      lastSyncAt: null,
      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setIsSyncing: (isSyncing) => set({ isSyncing }),
      setLastSyncAt: (lastSyncAt) => set({ lastSyncAt }),
    }),
    {
      name: 'morpheus-auth',
      partialize: (state) => ({
        lastSyncAt: state.lastSyncAt,
      }),
    }
  )
);

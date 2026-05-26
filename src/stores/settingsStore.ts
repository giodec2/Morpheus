import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_STANDARD_MODEL } from '@/lib/models';
import type { AppSettings, Language } from '@/types';

type AIProviderMode = 'byok' | 'hosted';

interface SettingsState extends AppSettings {
  isConnected: boolean;
  modelTier: 'standard' | 'premium';
  aiMode: AIProviderMode;
  setOpenRouterKey: (key: string) => void;
  setDefaultModel: (model: string) => void;
  setTemperature: (temp: number) => void;
  setMaxTokens: (tokens: number) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setAdvancedMode: (advanced: boolean) => void;
  setLanguage: (language: Language) => void;
  setIsConnected: (connected: boolean) => void;
  setModelTier: (tier: 'standard' | 'premium') => void;
  setAiMode: (mode: AIProviderMode) => void;
  loadSettings: (settings: AppSettings) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      id: 'global',
      openRouterKey: '',
      defaultModel: DEFAULT_STANDARD_MODEL,
      temperature: 0.7,
      maxTokens: 2048,
      theme: 'light',
      advancedMode: false,
      language: 'english',
      isConnected: false,
      modelTier: 'standard',
      aiMode: 'hosted',

      setOpenRouterKey: (key) => set({ openRouterKey: key }),
      setDefaultModel: (model) => set({ defaultModel: model }),
      setTemperature: (temp) => set({ temperature: temp }),
      setMaxTokens: (tokens) => set({ maxTokens: tokens }),
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },
      setAdvancedMode: (advanced) => set({ advancedMode: advanced }),
      setLanguage: (language) => set({ language }),
      setIsConnected: (connected) => set({ isConnected: connected }),
      setModelTier: (tier) => set({ modelTier: tier }),
      setAiMode: (mode) => set({ aiMode: mode }),
      loadSettings: (settings) => set({ ...settings }),
    }),
    {
      name: 'morpheus-settings',
      partialize: (state) => ({
        openRouterKey: state.openRouterKey,
        defaultModel: state.defaultModel,
        temperature: state.temperature,
        maxTokens: state.maxTokens,
        theme: state.theme,
        advancedMode: state.advancedMode,
        language: state.language,
        modelTier: state.modelTier,
        aiMode: state.aiMode,
      }),
    }
  )
);

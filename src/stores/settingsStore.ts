import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_STANDARD_MODEL } from '@/lib/models';
import type { AppSettings, Language, WritingGenre } from '@/types';

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
  setUiLocale: (locale: 'en' | 'it') => void;
  setLanguageManuallySet: (value: boolean) => void;
  setIsConnected: (connected: boolean) => void;
  setModelTier: (tier: 'standard' | 'premium') => void;
  setAiMode: (mode: AIProviderMode) => void;
  setWritingGenre: (genre: WritingGenre) => void;
  setAdaptiveMemory: (enabled: boolean) => void;
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
      uiLocale: 'en',
      languageManuallySet: false,
      isConnected: false,
      modelTier: 'standard',
      aiMode: 'hosted',
      writingGenre: 'general',
      adaptiveMemory: false,

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
      setUiLocale: (uiLocale) => set({ uiLocale }),
      setLanguageManuallySet: (languageManuallySet) => set({ languageManuallySet }),
      setIsConnected: (connected) => set({ isConnected: connected }),
      setModelTier: (tier) => set({ modelTier: tier }),
      setAiMode: (mode) => set({ aiMode: mode }),
      setWritingGenre: (genre) => set({ writingGenre: genre }),
      setAdaptiveMemory: (enabled) => set({ adaptiveMemory: enabled }),
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
        uiLocale: state.uiLocale,
        languageManuallySet: state.languageManuallySet,
        modelTier: state.modelTier,
        aiMode: state.aiMode,
        writingGenre: state.writingGenre,
        adaptiveMemory: state.adaptiveMemory,
      }),
    }
  )
);

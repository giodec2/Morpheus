import { useState } from 'react';
import { X, AlertTriangle, Lock, Zap, Cloud } from 'lucide-react';
import CustomSelect from '@/components/common/CustomSelect';
import { useSettingsStore } from '@/stores/settingsStore';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/components/common/Toast';
import DarkModeToggle from '@/components/common/DarkModeToggle';
import { STANDARD_MODELS, PREMIUM_MODELS, MODEL_DESCRIPTIONS, DEFAULT_STANDARD_MODEL, DEFAULT_PREMIUM_MODEL } from '@/lib/models';

interface SettingsModalProps {
  onClose: () => void;
}

const LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'italian', label: 'Italian' },
];

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const {
    openRouterKey, defaultModel, temperature, maxTokens, advancedMode, language, modelTier, aiMode,
    setOpenRouterKey, setDefaultModel, setTemperature, setMaxTokens, setAdvancedMode, setLanguage,
    setIsConnected, setModelTier, setAiMode,
  } = useSettingsStore();

  const { profile } = useAuthStore();
  const [apiInput, setApiInput] = useState(openRouterKey);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const subscriptionTier = profile?.subscriptionTier || 'free';
  const canUsePremium = aiMode === 'byok' || subscriptionTier === 'novelist' || subscriptionTier === 'architect';

  const handleConnect = async () => {
    if (!apiInput.trim()) return;
    setIsValidating(true);
    try {
      const response = await fetch('https://openrouter.ai/api/v1/auth/key', {
        headers: { Authorization: `Bearer ${apiInput.trim()}` },
      });
      if (response.ok) {
        setOpenRouterKey(apiInput.trim());
        setIsConnected(true);
        setAiMode('byok');
        toast('API key verified and saved! Switched to BYOK mode.', 'success');
      } else {
        toast('Invalid API key. Please check and try again.', 'error');
      }
    } catch {
      toast('Could not connect to OpenRouter.', 'error');
    }
    setIsValidating(false);
  };

  const handleClearKey = () => {
    setShowConfirm(false);
    setOpenRouterKey('');
    setApiInput('');
    setIsConnected(false);
    setAiMode('hosted');
    toast('API key removed. Switched to Hosted AI mode.', 'info');
  };

  const handleTierChange = () => {
    if (modelTier === 'standard' && !canUsePremium) {
      toast('Premium models are reserved for Novelist tier and above.', 'error');
      return;
    }
    const next = modelTier === 'standard' ? 'premium' : 'standard';
    setModelTier(next);
    const models = next === 'standard' ? STANDARD_MODELS : PREMIUM_MODELS;
    if (!models.some(m => m.value === defaultModel)) {
      setDefaultModel(next === 'standard' ? DEFAULT_STANDARD_MODEL : DEFAULT_PREMIUM_MODEL);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Appearance</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
              <DarkModeToggle />
            </div>
          </section>

          <hr className="border-gray-200 dark:border-slate-800" />

          {/* AI Provider */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">AI Provider</h3>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
              {/* Hosted AI label */}
              <div className="flex items-center gap-2 min-w-0">
                <Cloud className={`w-4 h-4 shrink-0 ${aiMode === 'hosted' ? 'text-primary-500' : 'text-gray-400 dark:text-gray-600'}`} />
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${aiMode === 'hosted' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'}`}>Hosted AI</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-500 truncate">Tier-based limits</p>
                </div>
              </div>

              {/* Single toggle */}
              <button
                type="button"
                onClick={() => setAiMode(aiMode === 'hosted' ? 'byok' : 'hosted')}
                className={`relative w-12 h-7 rounded-full transition-colors mx-3 shrink-0 ${
                  aiMode === 'hosted' ? 'bg-primary-500' : 'bg-amber-500'
                }`}
                aria-label="Toggle AI mode"
              >
                <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                  aiMode === 'byok' ? 'translate-x-5' : ''
                }`} />
              </button>

              {/* BYOK label */}
              <div className="flex items-center gap-2 min-w-0 text-right">
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${aiMode === 'byok' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'}`}>BYOK</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-500 truncate">Your own key</p>
                </div>
                <Zap className={`w-4 h-4 shrink-0 ${aiMode === 'byok' ? 'text-amber-500' : 'text-gray-400 dark:text-gray-600'}`} />
              </div>
            </div>

            {aiMode === 'hosted' && (
              <p className="text-xs text-primary-600 dark:text-primary-400 mt-2">
                Using Hosted AI. {profile
                  ? `${(profile.weeklyTokensUsed / 1000).toFixed(0)}k / ${(profile.maxWeeklyTokensStandard / 1000).toFixed(0)}k tokens used this week.`
                  : 'Sign in to track token usage.'}
              </p>
            )}
          </section>

          <hr className="border-gray-200 dark:border-slate-800" />

          {/* AI Configuration */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">AI Configuration</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-gray-500">Default Model</label>
                  <div className="flex items-center gap-1.5 relative group">
                    <span className={`text-xs font-medium transition-colors ${
                      modelTier === 'standard' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-600'
                    }`}>
                      Standard
                    </span>
                    <button
                      type="button"
                      onClick={handleTierChange}
                      className={`relative w-9 h-5 rounded-full transition-colors ${
                        modelTier === 'standard' ? 'bg-emerald-500' : 'bg-purple-500'
                      } ${!canUsePremium ? 'opacity-60 cursor-not-allowed' : ''}`}
                      aria-label="Toggle model tier"
                      disabled={!canUsePremium && modelTier === 'standard'}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                        modelTier === 'premium' ? 'translate-x-4' : ''
                      }`} />
                    </button>
                    <span className={`text-xs font-medium transition-colors ${
                      modelTier === 'premium' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400 dark:text-gray-600'
                    }`}>
                      Premium
                    </span>

                    {/* Tooltip for locked premium */}
                    {!canUsePremium && (
                      <div className="absolute -top-8 right-0 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        Premium models reserved for Novelist+
                      </div>
                    )}
                  </div>
                </div>
                {!canUsePremium && modelTier === 'premium' && (
                  <div className="flex items-center gap-1.5 mb-2 px-2 py-1 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <Lock className="w-3 h-3 text-amber-500" />
                    <span className="text-xs text-amber-700 dark:text-amber-400">
                      Premium models locked. Upgrade to Novelist to unlock.
                    </span>
                  </div>
                )}
                <CustomSelect
                  value={defaultModel}
                  options={modelTier === 'standard' ? STANDARD_MODELS : PREMIUM_MODELS}
                  descriptions={MODEL_DESCRIPTIONS}
                  onChange={(val) => setDefaultModel(val)}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">AI Language</label>
                <CustomSelect
                  value={language}
                  options={LANGUAGES}
                  onChange={(val) => setLanguage(val as 'english' | 'italian')}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Sets the language Morpheus uses when responding to you.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-gray-500">Temperature</label>
                  <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={advancedMode}
                      onChange={(e) => setAdvancedMode(e.target.checked)}
                      className="rounded accent-primary-600"
                    />
                    Advanced override
                  </label>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-primary-600"
                />
                <div className="text-xs text-gray-400 text-right">{temperature.toFixed(2)}</div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Max Tokens</label>
                <input
                  type="range"
                  min={512}
                  max={4096}
                  step={256}
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full accent-primary-600"
                />
                <div className="text-xs text-gray-400 text-right">{maxTokens}</div>
              </div>
            </div>
          </section>

          <hr className="border-gray-200 dark:border-slate-800" />

          {/* API Key — BYOK Only */}
          {aiMode === 'byok' && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-semibold text-red-700 dark:text-red-400">API Key</h3>
                <span className="text-xs px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full">Sensitive</span>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                Your OpenRouter API key is stored locally in your browser. Never share it.
              </p>

              <div className="space-y-3">
                <input
                  type="password"
                  className="input font-mono text-xs"
                  placeholder="sk-or-..."
                  value={apiInput}
                  onChange={(e) => setApiInput(e.target.value)}
                />

                <div className="flex gap-2">
                  <button
                    onClick={handleConnect}
                    disabled={isValidating || !apiInput.trim()}
                    className="flex-1 btn-primary"
                  >
                    {isValidating ? 'Verifying...' : 'Save & Verify Key'}
                  </button>
                  {openRouterKey && (
                    <button
                      onClick={() => setShowConfirm(true)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              {/* Confirmation Dialog */}
              {showConfirm && (
                <div className="mt-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <div className="flex items-start gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800 dark:text-red-300">Remove API Key?</p>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        This will switch you back to Hosted AI mode. You can add a new key anytime.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="btn-secondary text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleClearKey}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium transition-colors"
                    >
                      Yes, Remove Key
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="btn-primary">Done</button>
        </div>
      </div>
    </div>
  );
}

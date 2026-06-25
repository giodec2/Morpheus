import { useState } from 'react';
import Modal from '@/components/common/Modal';
import { X, AlertTriangle, Lock, Zap, Cloud, ExternalLink } from 'lucide-react';
import CustomSelect from '@/components/common/CustomSelect';
import { useSettingsStore } from '@/stores/settingsStore';
import { useAuthStore } from '@/stores/authStore';
import { useI18n } from '@/i18n/useI18n';
import { toast } from '@/components/common/Toast';
import DarkModeToggle from '@/components/common/DarkModeToggle';
import LanguageToggle from '@/components/common/LanguageToggle';
import {
  DEFAULT_STANDARD_MODEL,
  DEFAULT_PREMIUM_MODEL,
  getLocalizedStandardModels,
  getLocalizedPremiumModels,
  getLocalizedModelDescriptions,
} from '@/lib/models';
import { getCustomerPortalUrl } from '@/services/billing';
import type { Language } from '@/types';

function formatTokenCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return `${n}`;
}

interface SettingsModalProps {
  onClose: () => void;
}

const LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'italian', label: 'Italiano' },
  { value: 'german', label: 'Deutsch' },
  { value: 'french', label: 'Français' },
  { value: 'spanish', label: 'Español' },
  { value: 'portuguese', label: 'Português' },
  { value: 'dutch', label: 'Nederlands' },
  { value: 'russian', label: 'Русский' },
  { value: 'chinese', label: '中文' },
  { value: 'japanese', label: '日本語' },
  { value: 'korean', label: '한국어' },
  { value: 'polish', label: 'Polski' },
];

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const { t } = useI18n();
  const {
    openRouterKey, defaultModel, temperature, maxTokens, advancedMode, language, modelTier, aiMode, adaptiveMemory,
    setOpenRouterKey, setDefaultModel, setTemperature, setMaxTokens, setAdvancedMode, setLanguage,
    setIsConnected, setModelTier, setAiMode, setAdaptiveMemory,
  } = useSettingsStore();

  const { profile } = useAuthStore();
  const [apiInput, setApiInput] = useState(openRouterKey);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isPortalLoading, setIsPortalLoading] = useState(false);

  const handleManageSubscription = async () => {
    setIsPortalLoading(true);
    try {
      const url = await getCustomerPortalUrl(profile?.lemonSqueezyCustomerId, t as (key: string) => string);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      toast(err instanceof Error ? err.message : t('errors.openPortalFailed'), 'error');
    } finally {
      setIsPortalLoading(false);
    }
  };

  const subscriptionTier = profile?.subscriptionTier || 'free';
  const canUsePremium = aiMode === 'byok' || subscriptionTier === 'novelist' || subscriptionTier === 'architect';
  const canUseEcho = subscriptionTier === 'architect' || subscriptionTier === 'maestro';

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
        toast(t('dashboard.apiKeySaved'), 'success');
      } else {
        toast(t('dashboard.invalidApiKeyVerify'), 'error');
      }
    } catch {
      toast(t('dashboard.couldNotConnect'), 'error');
    }
    setIsValidating(false);
  };

  const handleClearKey = () => {
    setShowConfirm(false);
    setOpenRouterKey('');
    setApiInput('');
    setIsConnected(false);
    setAiMode('hosted');
    toast(t('dashboard.apiKeyRemoved'), 'info');
  };

  const handleTierChange = () => {
    if (modelTier === 'standard' && !canUsePremium) {
      toast(t('settings.premiumReserved'), 'error');
      return;
    }
    const next = modelTier === 'standard' ? 'premium' : 'standard';
    setModelTier(next);
    const models = next === 'standard' ? getLocalizedStandardModels(t) : getLocalizedPremiumModels(t);
    if (!models.some(m => m.value === defaultModel)) {
      setDefaultModel(next === 'standard' ? DEFAULT_STANDARD_MODEL : DEFAULT_PREMIUM_MODEL);
    }
  };

  return (
    <Modal onClose={onClose} className="max-w-lg p-6" ariaLabel={t('settings.title')}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('settings.title')}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{t('settings.appearance')}</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.theme')}</span>
              <DarkModeToggle />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400 block">{t('settings.uiLanguage')}</span>
                <span className="text-xs text-gray-400">{t('settings.uiLanguageHint')}</span>
              </div>
              <LanguageToggle />
            </div>
          </section>

          <hr className="border-gray-200 dark:border-slate-800" />

          {/* AI Provider */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{t('settings.aiProvider')}</h3>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
              {/* Hosted AI label */}
              <div className="flex items-center gap-2 min-w-0">
                <Cloud className={`w-4 h-4 shrink-0 ${aiMode === 'hosted' ? 'text-primary-500' : 'text-gray-400 dark:text-gray-600'}`} />
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${aiMode === 'hosted' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'}`}>{t('settings.hostedAI')}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-500 truncate">{t('settings.tierBased')}</p>
                </div>
              </div>

              {/* Single toggle */}
              <button
                type="button"
                onClick={() => {
                  const next = aiMode === 'hosted' ? 'byok' : 'hosted';
                  if (next === 'hosted' && modelTier === 'premium') {
                    const tier = profile?.subscriptionTier || 'free';
                    const allowsPremium = tier === 'novelist' || tier === 'architect';
                    if (!allowsPremium) {
                      setModelTier('standard');
                      setDefaultModel(DEFAULT_STANDARD_MODEL);
                    }
                  }
                  setAiMode(next);
                }}
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
                  <p className={`text-sm font-medium truncate ${aiMode === 'byok' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'}`}>{t('settings.byok')}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-500 truncate">{t('settings.yourOwnKey')}</p>
                </div>
                <Zap className={`w-4 h-4 shrink-0 ${aiMode === 'byok' ? 'text-amber-500' : 'text-gray-400 dark:text-gray-600'}`} />
              </div>
            </div>

            {aiMode === 'hosted' && profile && (
              <div className="text-xs text-primary-600 dark:text-primary-400 mt-2 space-y-0.5">
                <p>
                  Standard: {formatTokenCount(profile.weeklyTokensUsed)} / {formatTokenCount(profile.maxWeeklyTokensStandard)}
                </p>
                {(profile.subscriptionTier === 'novelist' || profile.subscriptionTier === 'architect') && (
                  <p>
                    Premium: {formatTokenCount(profile.weeklyTokensUsedPremium)} / {formatTokenCount(profile.maxWeeklyTokensPremium)}
                  </p>
                )}
              </div>
            )}
          </section>

          <hr className="border-gray-200 dark:border-slate-800" />

          {/* Subscription */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{t('settings.subscription')}</h3>
            {profile ? (
              <div className="p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize text-gray-900 dark:text-white">
                    {t('settings.plan', { tier: profile.subscriptionTier })}
                  </span>
                  {profile.subscriptionStatus && profile.subscriptionStatus !== 'active' && profile.subscriptionStatus !== 'on_trial' && (
                    <span className="text-xs px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full">
                      {profile.subscriptionStatus}
                    </span>
                  )}
                  {profile.subscriptionStatus === 'active' && (
                    <span className="text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full">
                      {t('states.active')}
                    </span>
                  )}
                </div>

                {profile.subscriptionTier === 'free' ? (
                  <a
                    href="/?scrollTo=pricing"
                    onClick={(e) => { e.preventDefault(); onClose(); window.location.href = '/?scrollTo=pricing'; }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary-700 dark:text-primary-300 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {t('settings.upgradePlan')}
                  </a>
                ) : (
                  <div className="flex items-center gap-3 pt-0.5">
                    <button
                      type="button"
                      onClick={handleManageSubscription}
                      disabled={isPortalLoading}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary-700 dark:text-primary-300 hover:underline disabled:opacity-50"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {isPortalLoading ? t('settings.openingPortal') : t('settings.manageSubscription')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('settings.signInToSeeSubscription')}</p>
            )}
          </section>

          <hr className="border-gray-200 dark:border-slate-800" />

          {/* AI Configuration */}
          <section>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{t('settings.aiConfiguration')}</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-gray-500">{t('settings.defaultModel')}</label>
                  <div className="flex items-center gap-1.5 relative group">
                    <span className={`text-xs font-medium transition-colors ${
                      modelTier === 'standard' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-600'
                    }`}>
                      {t('settings.standard')}
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
                      {t('settings.premium')}
                    </span>

                    {/* Tooltip for locked premium */}
                    {!canUsePremium && (
                      <div className="absolute -top-8 right-0 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {t('settings.premiumReserved')}
                      </div>
                    )}
                  </div>
                </div>
                {!canUsePremium && modelTier === 'premium' && (
                  <div className="flex items-center gap-1.5 mb-2 px-2 py-1 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <Lock className="w-3 h-3 text-amber-500" />
                    <span className="text-xs text-amber-700 dark:text-amber-400">
                      {t('settings.premiumLocked')}
                    </span>
                  </div>
                )}
                <CustomSelect
                  value={defaultModel}
                  options={modelTier === 'standard' ? getLocalizedStandardModels(t) : getLocalizedPremiumModels(t)}
                  descriptions={getLocalizedModelDescriptions(t)}
                  onChange={(val) => setDefaultModel(val)}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">{t('settings.aiLanguage')}</label>
                <CustomSelect
                  value={language}
                  options={LANGUAGES}
                  onChange={(val) => setLanguage(val as Language)}
                />
                <p className="text-xs text-gray-400 mt-1">
                  {t('settings.aiLanguageHint')}
                </p>
              </div>

              {/* Echo (Adaptive Memory) */}
              <div className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{t('settings.echo')}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full font-medium">{t('states.beta')}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!canUseEcho) {
                        toast(t('settings.echoExclusive'), 'error');
                        return;
                      }
                      setAdaptiveMemory(!adaptiveMemory);
                    }}
                    className={`relative w-9 h-5 rounded-full transition-colors ${
                      adaptiveMemory ? 'bg-purple-500' : 'bg-gray-300 dark:bg-slate-600'
                    } ${!canUseEcho ? 'opacity-60 cursor-not-allowed' : ''}`}
                    aria-label="Toggle Echo adaptive memory"
                    disabled={!canUseEcho}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      adaptiveMemory ? 'translate-x-4' : ''
                    }`} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t('settings.echoDesc')}
                </p>
                {!canUseEcho && (
                  <div className="flex items-center gap-1.5 mt-2 px-2 py-1 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded">
                    <Lock className="w-3 h-3 text-amber-500" />
                    <span className="text-[10px] text-amber-700 dark:text-amber-400">
                      {t('settings.echoExclusive')}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-gray-500">{t('settings.temperature')}</label>
                  <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={advancedMode}
                      onChange={(e) => setAdvancedMode(e.target.checked)}
                      className="rounded accent-primary-600"
                    />
                    {t('settings.advancedOverride')}
                  </label>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={temperature}
                  disabled={!advancedMode}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className={`w-full accent-primary-600 ${!advancedMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <div className="text-xs text-gray-400 text-right">{temperature.toFixed(2)}</div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">{t('settings.maxTokens')}</label>
                <input
                  type="range"
                  min={512}
                  max={4096}
                  step={256}
                  value={maxTokens}
                  disabled={!advancedMode}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className={`w-full accent-primary-600 ${!advancedMode ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                <h3 className="text-sm font-semibold text-red-700 dark:text-red-400">{t('settings.apiKey')}</h3>
                <span className="text-xs px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full">{t('states.sensitive')}</span>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                {t('settings.apiKeyWarning')}
              </p>

              <div className="space-y-3">
                <input
                  type="password"
                  className="input font-mono text-xs"
                  placeholder={t('settings.apiKeyPlaceholder')}
                  value={apiInput}
                  onChange={(e) => setApiInput(e.target.value)}
                />

                <div className="flex gap-2">
                  <button
                    onClick={handleConnect}
                    disabled={isValidating || !apiInput.trim()}
                    className="flex-1 btn-primary"
                  >
                    {isValidating ? t('settings.verifying') : t('settings.saveVerifyKey')}
                  </button>
                  {openRouterKey && (
                    <button
                      onClick={() => setShowConfirm(true)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium transition-colors"
                    >
                      {t('actions.remove')}
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
                      <p className="text-sm font-medium text-red-800 dark:text-red-300">{t('settings.removeApiKey')}</p>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        {t('settings.removeApiKeyConfirm')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="btn-secondary text-xs"
                    >
                      {t('actions.cancel')}
                    </button>
                    <button
                      onClick={handleClearKey}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium transition-colors"
                    >
                      {t('settings.removeApiKey')}
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="btn-primary">{t('actions.done')}</button>
        </div>
    </Modal>
  );
}

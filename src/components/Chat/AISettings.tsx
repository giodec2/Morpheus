import { Lock } from 'lucide-react';
import CustomSelect from '@/components/common/CustomSelect';
import { useSettingsStore } from '@/stores/settingsStore';
import { useAuthStore } from '@/stores/authStore';
import { toast } from '@/components/common/Toast';
import { useI18n } from '@/i18n/useI18n';
import { STANDARD_MODELS, PREMIUM_MODELS, MODEL_DESCRIPTIONS, DEFAULT_STANDARD_MODEL, DEFAULT_PREMIUM_MODEL } from '@/lib/models';

export default function AISettings() {
  const { t } = useI18n();
  const {
    defaultModel, maxTokens, modelTier, aiMode,
    setDefaultModel, setMaxTokens, setModelTier,
  } = useSettingsStore();
  const { profile } = useAuthStore();

  const subscriptionTier = profile?.subscriptionTier || 'free';
  const canUsePremium = aiMode === 'byok' || subscriptionTier === 'novelist' || subscriptionTier === 'architect';

  const currentTierModels = modelTier === 'standard' ? STANDARD_MODELS : PREMIUM_MODELS;

  const handleTierChange = (tier: 'standard' | 'premium') => {
    if (tier === 'premium' && !canUsePremium) {
      toast(t('chat.premiumModelsReserved'), 'error');
      return;
    }
    setModelTier(tier);
    const models = tier === 'standard' ? STANDARD_MODELS : PREMIUM_MODELS;
    const stillValid = models.some((m) => m.value === defaultModel);
    if (!stillValid) {
      setDefaultModel(tier === 'standard' ? DEFAULT_STANDARD_MODEL : DEFAULT_PREMIUM_MODEL);
    }
  };

  return (
    <div className="p-3 border-t border-gray-200 dark:border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {t('chat.aiSettings')}
        </h3>
        <div className="flex items-center gap-1.5 relative group">
          <span className={`text-xs font-medium transition-colors ${
            modelTier === 'standard' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-600'
          }`}>
            {t('chat.standard')}
          </span>
          <button
            type="button"
            onClick={() => handleTierChange(modelTier === 'standard' ? 'premium' : 'standard')}
            className={`relative w-9 h-5 rounded-full transition-colors ${
              modelTier === 'standard' ? 'bg-emerald-500' : 'bg-purple-500'
            } ${!canUsePremium ? 'opacity-60 cursor-not-allowed' : ''}`}
            aria-label={t('chat.toggleModelTier')}
            disabled={!canUsePremium && modelTier === 'standard'}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
              modelTier === 'premium' ? 'translate-x-4' : ''
            }`} />
          </button>
          <span className={`text-xs font-medium transition-colors ${
            modelTier === 'premium' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400 dark:text-gray-600'
          }`}>
            {t('chat.premium')}
          </span>

          {!canUsePremium && (
            <div className="absolute -top-7 right-0 px-2 py-0.5 bg-gray-800 dark:bg-gray-700 text-white text-[9px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
              {t('chat.premiumReserved')}
            </div>
          )}
        </div>
      </div>

      {!canUsePremium && modelTier === 'premium' && (
        <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <Lock className="w-3 h-3 text-amber-500" />
          <span className="text-[10px] text-amber-700 dark:text-amber-400">
            {t('chat.premiumLocked')}
          </span>
        </div>
      )}

      <div className="space-y-2">
        <CustomSelect
          value={defaultModel}
          options={currentTierModels}
          descriptions={MODEL_DESCRIPTIONS}
          onChange={(val) => setDefaultModel(val)}
        />

        <div className="space-y-1">
          <label className="text-xs text-gray-500">{t('chat.maxTokens')}</label>
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
    </div>
  );
}

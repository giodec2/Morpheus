import { X, Crown, Check, Sparkles, Star, Zap, Loader2, ExternalLink } from 'lucide-react';
import type { UserProfile } from '@/stores/authStore';
import { useState } from 'react';
import { useI18n } from '@/i18n/useI18n';
import Modal from './Modal';
import { useLemonSqueezy } from '@/hooks/useLemonSqueezy';
import { createCheckout, getVariantIdForTier, getCustomerPortalUrl } from '@/services/billing';
import { toast } from '@/components/common/Toast';
import { useAuthStore } from '@/stores/authStore';

interface TierSelectorModalProps {
  currentTier: UserProfile['subscriptionTier'];
  onClose: () => void;
}

function ManageSubscriptionLink() {
  const { t } = useI18n();
  const { profile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  if (!profile || profile.subscriptionTier === 'free') return null;

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      const url = await getCustomerPortalUrl(profile?.lemonSqueezyCustomerId, t as (key: string) => string);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      toast(err instanceof Error ? err.message : t('errors.openPortalFailed'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors disabled:opacity-50"
    >
      {isLoading ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <ExternalLink className="w-3 h-3" />
      )}
      {isLoading ? t('settings.openingPortal') : t('settings.manageSubscription')}
    </button>
  );
}

export default function TierSelectorModal({ currentTier, onClose }: TierSelectorModalProps) {
  const { t } = useI18n();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const { openCheckout } = useLemonSqueezy();

  const tiers = [
    {
      key: 'free',
      name: 'Free',
      price: 0,
      icon: Zap,
      color: 'text-gray-600 dark:text-gray-400',
      accentBg: 'bg-gray-100 dark:bg-slate-800',
      accentBorder: 'border-gray-200 dark:border-slate-700',
      accentText: 'text-gray-500 dark:text-gray-400',
      checkBg: 'bg-gray-100 dark:bg-slate-800',
      checkColor: 'text-gray-500 dark:text-gray-400',
      btnBg: 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300',
      badgeBg: 'bg-gray-500',
      gradient: 'from-gray-400 to-gray-300',
      features: [
        t('upgrade.features.oneBook'),
        t('upgrade.features.tokens50k'),
        t('upgrade.features.byok'),
        t('upgrade.features.cloudSync'),
      ],
    },
    {
      key: 'scribe',
      name: 'Scribe',
      price: 9,
      icon: Sparkles,
      color: 'text-primary-600 dark:text-primary-400',
      accentBg: 'bg-primary-50 dark:bg-primary-900/20',
      accentBorder: 'border-primary-200 dark:border-primary-800',
      accentText: 'text-primary-600 dark:text-primary-400',
      checkBg: 'bg-primary-100 dark:bg-primary-900/30',
      checkColor: 'text-primary-600 dark:text-primary-400',
      btnBg: 'bg-primary-600 hover:bg-primary-700 text-white',
      badgeBg: 'bg-primary-500',
      gradient: 'from-primary-500 to-teal-400',
      features: [
        t('upgrade.features.threeBooks'),
        t('upgrade.features.tokens500k'),
        t('upgrade.features.byok'),
        t('upgrade.features.cloudSync'),
      ],
      badge: t('states.popular'),
    },
    {
      key: 'novelist',
      name: 'Novelist',
      price: 19,
      icon: Star,
      color: 'text-amber-600 dark:text-amber-400',
      accentBg: 'bg-amber-50 dark:bg-amber-900/20',
      accentBorder: 'border-amber-200 dark:border-amber-800',
      accentText: 'text-amber-600 dark:text-amber-400',
      checkBg: 'bg-amber-100 dark:bg-amber-900/30',
      checkColor: 'text-amber-600 dark:text-amber-400',
      btnBg: 'bg-amber-500 hover:bg-amber-600 text-white',
      badgeBg: 'bg-amber-500',
      gradient: 'from-amber-500 to-orange-400',
      features: [
        t('upgrade.features.tenBooks'),
        t('upgrade.features.premium50k'),
        t('upgrade.features.newFeaturesFirst'),
        t('upgrade.features.signatureFinetunes'),
      ],
    },
    {
      key: 'architect',
      name: 'Architect',
      price: 49,
      icon: Crown,
      color: 'text-purple-600 dark:text-purple-400',
      accentBg: 'bg-purple-50 dark:bg-purple-900/20',
      accentBorder: 'border-purple-200 dark:border-purple-800',
      accentText: 'text-purple-600 dark:text-purple-400',
      checkBg: 'bg-purple-100 dark:bg-purple-900/30',
      checkColor: 'text-purple-600 dark:text-purple-400',
      btnBg: 'bg-purple-600 hover:bg-purple-700 text-white',
      badgeBg: 'bg-purple-500',
      gradient: 'from-purple-500 to-pink-400',
      features: [
        t('upgrade.features.unlimitedBooks'),
        t('upgrade.features.premium500k'),
        t('upgrade.features.selfLearningModels'),
        t('upgrade.features.prioritySupport'),
      ],
      badge: t('states.bestValue'),
    },
  ];

  return (
    <Modal onClose={onClose} className="max-w-2xl rounded-2xl overflow-y-auto" ariaLabel={t('upgrade.title')}>
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('upgrade.title')}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('upgrade.currentPlan', { tier: currentTier })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tiers */}
        <div className="p-6 space-y-4">
          {tiers.map((tier) => {
            const isCurrent = tier.key === currentTier;
            const isUpgrade = tiers.findIndex((t) => t.key === currentTier) < tiers.findIndex((t) => t.key === tier.key);
            const Icon = tier.icon;

            return (
              <div
                key={tier.key}
                className={`relative rounded-xl border-2 p-5 transition-all ${
                  isCurrent
                    ? `${tier.accentBorder} ${tier.accentBg}`
                    : isUpgrade
                    ? `border-transparent hover:border-gray-300 dark:hover:border-slate-600 ${tier.accentBg}`
                    : 'border-gray-100 dark:border-slate-800 opacity-50'
                }`}
              >
                {/* Current badge */}
                {isCurrent && (
                  <span className={`absolute -top-2.5 right-4 px-3 py-1 ${tier.badgeBg} text-white text-[10px] font-bold rounded-full uppercase tracking-wider`}>
                    {t('states.current')}
                  </span>
                )}
                {/* Tier badge */}
                {tier.badge && isUpgrade && (
                  <span className={`absolute -top-2.5 right-4 px-3 py-1 ${tier.badgeBg} text-white text-[10px] font-bold rounded-full uppercase tracking-wider`}>
                    {tier.badge}
                  </span>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${tier.gradient} shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className={`font-bold ${tier.color}`}>{tier.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        {tier.price > 0 ? (
                          <>
                            <span className="text-lg font-black text-gray-900 dark:text-white">
                              €{tier.price}
                            </span>
                            <span className="text-xs text-gray-400">{t('limit.tax')}</span>
                          </>
                        ) : (
                          <span className="text-lg font-black text-gray-900 dark:text-white">{tier.name}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {isUpgrade ? (
                    <button
                      disabled={loadingTier === tier.key}
                      onClick={async () => {
                        const variantId = getVariantIdForTier(tier.key);
                        if (!variantId) {
                          toast(t('upgrade.paymentNotConfigured'), 'error');
                          return;
                        }
                        setLoadingTier(tier.key);
                        try {
                          const url = await createCheckout(variantId, t as (key: string) => string);
                          openCheckout(url);
                          onClose();
                        } catch (err) {
                          toast(err instanceof Error ? err.message : t('upgrade.checkoutFailed'), 'error');
                        } finally {
                          setLoadingTier(null);
                        }
                      }}
                      className={`text-xs px-4 py-2 rounded-xl font-bold transition-all hover:scale-105 ${tier.btnBg} disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5`}
                    >
                      {loadingTier === tier.key ? <Loader2 className="w-3 h-3 animate-spin" /> : t('upgrade.upgrade')}
                    </button>
                  ) : isCurrent ? (
                    <span className={`text-xs font-bold px-4 py-2 ${tier.checkColor}`}>
                      {t('states.active')}
                    </span>
                  ) : null}
                </div>

                {/* Manage subscription link for current paid tier */}
                {isCurrent && tier.key !== 'free' && (
                  <div className="mt-2">
                    <ManageSubscriptionLink />
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {tier.features.map((feature) => (
                    <span key={feature} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                      <div className={`w-4 h-4 rounded-full ${tier.checkBg} flex items-center justify-center flex-shrink-0`}>
                        <Check className={`w-2.5 h-2.5 ${tier.checkColor}`} />
                      </div>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-slate-700 px-6 py-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {t('upgrade.footer')}
          </p>
        </div>
    </Modal>
  );
}

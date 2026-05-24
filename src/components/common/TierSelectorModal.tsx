import { X, Crown, Check, ArrowUpRight, Sparkles, Star, Zap } from 'lucide-react';
import { Link } from 'wouter';
import type { UserProfile } from '@/stores/authStore';

interface TierSelectorModalProps {
  currentTier: UserProfile['subscriptionTier'];
  onClose: () => void;
}

const tiers = [
  {
    key: 'free',
    name: 'Free',
    price: 0,
    icon: Zap,
    color: 'text-gray-600 dark:text-gray-400',
    bg: 'bg-gray-50 dark:bg-slate-800/50',
    border: 'border-gray-200 dark:border-slate-700',
    features: ['1 book', '100k tokens/week', 'Standard models', 'BYOK', 'Cloud sync'],
  },
  {
    key: 'scribe',
    name: 'Scribe',
    price: 9,
    discountPrice: 4.50,
    icon: Sparkles,
    color: 'text-primary-600 dark:text-primary-400',
    bg: 'bg-primary-50/50 dark:bg-primary-900/10',
    border: 'border-primary-200 dark:border-primary-800',
    features: ['3 books', '1M tokens/week', 'All standard models', 'BYOK', 'Cloud sync'],
    badge: 'Popular',
  },
  {
    key: 'novelist',
    name: 'Novelist',
    price: 19,
    discountPrice: 9.50,
    icon: Star,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50/50 dark:bg-amber-900/10',
    border: 'border-amber-200 dark:border-amber-800',
    features: ['10 books', '2M + 100k premium/week', 'Premium models', 'New features first', 'Signature finetunes'],
  },
  {
    key: 'architect',
    name: 'Architect',
    price: 49,
    discountPrice: 24.50,
    icon: Crown,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50/50 dark:bg-purple-900/10',
    border: 'border-purple-200 dark:border-purple-800',
    features: ['50 books', '10M + 1M premium/week', 'Self-learning models', 'Priority support', 'Everything included'],
    badge: 'Best Value',
  },
];

export default function TierSelectorModal({ currentTier, onClose }: TierSelectorModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upgrade Your Plan</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Current plan: <span className="capitalize font-medium text-primary-600 dark:text-primary-400">{currentTier}</span>
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
        <div className="p-6 space-y-3">
          {tiers.map((tier) => {
            const isCurrent = tier.key === currentTier;
            const isUpgrade = tiers.findIndex((t) => t.key === currentTier) < tiers.findIndex((t) => t.key === tier.key);
            const Icon = tier.icon;

            return (
              <div
                key={tier.key}
                className={`relative rounded-xl border-2 p-4 transition-all ${
                  isCurrent
                    ? 'border-primary-500 bg-primary-50/30 dark:bg-primary-900/10'
                    : isUpgrade
                    ? `border-transparent hover:border-gray-300 dark:hover:border-slate-600 ${tier.bg}`
                    : 'border-gray-100 dark:border-slate-800 opacity-50'
                }`}
              >
                {isCurrent && (
                  <span className="absolute -top-2 right-4 px-2 py-0.5 bg-primary-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                    Current
                  </span>
                )}
                {tier.badge && isUpgrade && (
                  <span className={`absolute -top-2 right-4 px-2 py-0.5 text-white text-[10px] font-bold rounded-full uppercase tracking-wider ${
                    tier.key === 'scribe' ? 'bg-primary-500' : 'bg-purple-500'
                  }`}>
                    {tier.badge}
                  </span>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tier.bg} ${tier.border} border`}>
                      <Icon className={`w-5 h-5 ${tier.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{tier.name}</h4>
                      <div className="flex items-center gap-1.5">
                        {tier.price > 0 ? (
                          <>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              ${tier.discountPrice?.toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-400 line-through">${tier.price}</span>
                            <span className="text-[10px] px-1.5 py-0.5 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full font-medium">
                              50% off 1st month
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900 dark:text-white">Free</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {isUpgrade ? (
                    <Link href="/#pricing">
                      <button
                        onClick={onClose}
                        className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1"
                      >
                        Upgrade
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </Link>
                  ) : isCurrent ? (
                    <span className="text-xs text-primary-600 dark:text-primary-400 font-medium px-3 py-1.5">
                      Active
                    </span>
                  ) : null}
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {tier.features.map((feature) => (
                    <span key={feature} className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <Check className="w-3 h-3 text-primary-500" />
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
            All paid plans include a 50% discount on your first month. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

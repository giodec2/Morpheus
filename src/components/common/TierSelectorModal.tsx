import { X, Crown, Check, Sparkles, Star, Zap } from 'lucide-react';
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
    accentBg: 'bg-gray-100 dark:bg-slate-800',
    accentBorder: 'border-gray-200 dark:border-slate-700',
    accentText: 'text-gray-500 dark:text-gray-400',
    checkBg: 'bg-gray-100 dark:bg-slate-800',
    checkColor: 'text-gray-500 dark:text-gray-400',
    btnBg: 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300',
    badgeBg: 'bg-gray-500',
    gradient: 'from-gray-400 to-gray-300',
    features: ['1 book', '100k tokens/week', 'BYOK', 'Cloud sync'],
  },
  {
    key: 'scribe',
    name: 'Scribe',
    price: 9,
    discountPrice: 4.50,
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
    features: ['3 books', '1M tokens/week', 'BYOK', 'Cloud sync'],
    badge: 'Popular',
  },
  {
    key: 'novelist',
    name: 'Novelist',
    price: 19,
    discountPrice: 9.50,
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
    features: ['10 books', '2M + 100k premium/week', 'New features first', 'Signature finetunes'],
  },
  {
    key: 'architect',
    name: 'Architect',
    price: 49,
    discountPrice: 24.50,
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
    features: ['50 books', '10M + 1M premium/week', 'Self-learning models', 'Priority support'],
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
                    Current
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
                              ${tier.discountPrice?.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">${tier.price}</span>
                            <span className={`text-[10px] px-2 py-0.5 ${tier.checkBg} ${tier.checkColor} rounded-full font-bold uppercase tracking-wider`}>
                              50% off 1st month
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-black text-gray-900 dark:text-white">Free</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {isUpgrade ? (
                    <Link href="/#pricing">
                      <button
                        onClick={onClose}
                        className={`text-xs px-4 py-2 rounded-xl font-bold transition-all hover:scale-105 ${tier.btnBg}`}
                      >
                        Upgrade
                      </button>
                    </Link>
                  ) : isCurrent ? (
                    <span className={`text-xs font-bold px-4 py-2 ${tier.checkColor}`}>
                      Active
                    </span>
                  ) : null}
                </div>

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
            All paid plans include a 50% discount on your first month. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

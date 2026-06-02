import { X, ArrowUpRight, BookOpen, Crown, Star, Sparkles, Zap, Loader2 } from 'lucide-react';
import type { UserProfile } from '@/stores/authStore';
import { useState } from 'react';
import { useLemonSqueezy } from '@/hooks/useLemonSqueezy';
import { createCheckout, getVariantIdForTier } from '@/services/billing';
import { toast } from '@/components/common/Toast';

interface UpgradeModalProps {
  currentTier: UserProfile['subscriptionTier'];
  currentCount: number;
  maxCount: number;
  onClose: () => void;
}

const tierOrder: UserProfile['subscriptionTier'][] = ['free', 'scribe', 'novelist', 'architect'];

const tierMeta: Record<string, {
  name: string;
  icon: typeof Zap;
  color: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  btnBg: string;
  dotColor: string;
  gradient: string;
}> = {
  free: {
    name: 'Free',
    icon: Zap,
    color: 'text-gray-600 dark:text-gray-400',
    accentBg: 'bg-gray-50 dark:bg-slate-800/50',
    accentBorder: 'border-gray-200 dark:border-slate-700',
    accentText: 'text-gray-500 dark:text-gray-400',
    btnBg: 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300',
    dotColor: 'bg-gray-400',
    gradient: 'from-gray-400 to-gray-300',
  },
  scribe: {
    name: 'Scribe',
    icon: Sparkles,
    color: 'text-primary-600 dark:text-primary-400',
    accentBg: 'bg-primary-50 dark:bg-primary-900/20',
    accentBorder: 'border-primary-200 dark:border-primary-800',
    accentText: 'text-primary-600 dark:text-primary-400',
    btnBg: 'bg-primary-600 hover:bg-primary-700 text-white',
    dotColor: 'bg-primary-500',
    gradient: 'from-primary-500 to-teal-400',
  },
  novelist: {
    name: 'Novelist',
    icon: Star,
    color: 'text-amber-600 dark:text-amber-400',
    accentBg: 'bg-amber-50 dark:bg-amber-900/20',
    accentBorder: 'border-amber-200 dark:border-amber-800',
    accentText: 'text-amber-600 dark:text-amber-400',
    btnBg: 'bg-amber-500 hover:bg-amber-600 text-white',
    dotColor: 'bg-amber-500',
    gradient: 'from-amber-500 to-orange-400',
  },
  architect: {
    name: 'Architect',
    icon: Crown,
    color: 'text-purple-600 dark:text-purple-400',
    accentBg: 'bg-purple-50 dark:bg-purple-900/20',
    accentBorder: 'border-purple-200 dark:border-purple-800',
    accentText: 'text-purple-600 dark:text-purple-400',
    btnBg: 'bg-purple-600 hover:bg-purple-700 text-white',
    dotColor: 'bg-purple-500',
    gradient: 'from-purple-500 to-pink-400',
  },
};

const nextTierBenefits: Record<string, string[]> = {
  free: ['Up to 3 books', '1M tokens/week', 'All standard models'],
  scribe: ['Up to 10 books', '2M tokens/week', 'Premium models included', 'Signature finetunes'],
  novelist: ['Up to 50 books', '10M tokens/week', '1M premium tokens/week', 'Self-learning models', 'Priority support'],
  architect: [],
};

const prices: Record<string, string> = {
  scribe: '€9',
  novelist: '€19',
  architect: '€49',
};

export default function UpgradeModal({ currentTier, currentCount, maxCount, onClose }: UpgradeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { openCheckout } = useLemonSqueezy();
  const currentIndex = tierOrder.indexOf(currentTier);
  const nextTierKey = currentIndex < tierOrder.length - 1 ? tierOrder[currentIndex + 1] : null;
  const benefits = nextTierKey ? nextTierBenefits[nextTierKey] : [];
  const nextMeta = nextTierKey ? tierMeta[nextTierKey] : null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${tierMeta[currentTier].accentBg} ${tierMeta[currentTier].accentBorder} border flex items-center justify-center`}>
              <BookOpen className={`w-5 h-5 ${tierMeta[currentTier].accentText}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Book Limit Reached</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentCount} of {maxCount} books used
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className={`p-4 rounded-xl mb-6 ${tierMeta[currentTier].accentBg} ${tierMeta[currentTier].accentBorder} border`}>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
            You're writing up a storm! 🌪️
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your <strong className="text-gray-700 dark:text-gray-300">{tierMeta[currentTier].name}</strong> plan includes{' '}
            <strong className="text-gray-700 dark:text-gray-300">{maxCount}</strong> book{maxCount > 1 ? 's' : ''}.
          </p>
        </div>

        {nextTierKey && nextMeta && benefits.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${nextMeta.gradient} flex items-center justify-center`}>
                <nextMeta.icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Upgrade to <span className={nextMeta.color}>{nextMeta.name}</span>:
              </p>
            </div>
            <ul className="space-y-2 mb-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className={`w-1.5 h-1.5 rounded-full ${nextMeta.dotColor}`} />
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-gray-900 dark:text-white">
                {prices[nextTierKey]}/mo
              </span>
              <span className="text-xs text-gray-400">
                + applicable tax
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {nextTierKey && nextMeta ? (
            <button
              disabled={isLoading}
              onClick={async () => {
                const variantId = getVariantIdForTier(nextTierKey);
                if (!variantId) {
                  toast('Payment system is not fully configured yet', 'error');
                  return;
                }
                setIsLoading(true);
                try {
                  const url = await createCheckout(variantId);
                  openCheckout(url);
                  onClose();
                } catch (err) {
                  toast(err instanceof Error ? err.message : 'Failed to open checkout', 'error');
                } finally {
                  setIsLoading(false);
                }
              }}
              className={`w-full py-3 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2 ${nextMeta.btnBg} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>
                Upgrade to {nextMeta.name}
                <ArrowUpRight className="w-4 h-4" />
              </>}
            </button>
          ) : (
            <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-2">
              You're on our highest tier. Contact us for custom limits.
            </p>
          )}
          <button
            onClick={onClose}
            className="w-full btn-secondary py-3 text-sm font-bold"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}

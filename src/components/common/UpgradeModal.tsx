import { X, ArrowUpRight, BookOpen } from 'lucide-react';
import { Link } from 'wouter';
import type { UserProfile } from '@/stores/authStore';

interface UpgradeModalProps {
  currentTier: UserProfile['subscriptionTier'];
  currentCount: number;
  maxCount: number;
  onClose: () => void;
}

const tierOrder: UserProfile['subscriptionTier'][] = ['free', 'scribe', 'novelist', 'architect'];

const tierNames: Record<string, string> = {
  free: 'Free',
  scribe: 'Scribe',
  novelist: 'Novelist',
  architect: 'Architect',
};

const tierPrices: Record<string, string> = {
  free: 'Free',
  scribe: '$9/mo',
  novelist: '$19/mo',
  architect: '$49/mo',
};

const nextTierBenefits: Record<string, string[]> = {
  free: ['Up to 3 books', '1M tokens/week', 'All standard models'],
  scribe: ['Up to 10 books', '2M tokens/week', 'Premium models included', 'Signature finetunes'],
  novelist: ['Up to 50 books', '10M tokens/week', '1M premium tokens/week', 'Self-learning models', 'Priority support'],
  architect: [],
};

export default function UpgradeModal({ currentTier, currentCount, maxCount, onClose }: UpgradeModalProps) {
  const currentIndex = tierOrder.indexOf(currentTier);
  const nextTier = currentIndex < tierOrder.length - 1 ? tierOrder[currentIndex + 1] : null;
  const benefits = nextTier ? nextTierBenefits[nextTier] : [];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
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

        <div className={`p-4 rounded-xl mb-6 ${
          currentTier === 'free'
            ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800'
            : 'bg-gray-50 dark:bg-slate-800/50'
        }`}>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
            You're writing up a storm! <span className="inline-block">🌪️</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Your <strong className="text-gray-700 dark:text-gray-300">{tierNames[currentTier]}</strong> plan includes{' '}
            <strong className="text-gray-700 dark:text-gray-300">{maxCount}</strong> book{maxCount > 1 ? 's' : ''}.
          </p>
        </div>

        {nextTier && benefits.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Upgrade to <span className="text-primary-600 dark:text-primary-400">{tierNames[nextTier]}</span>:
            </p>
            <ul className="space-y-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  {benefit}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
              {tierPrices[nextTier]}{' '}
              <span className="text-xs font-normal text-gray-500 dark:text-gray-400 line-through">
                {nextTier === 'scribe' ? '$9' : nextTier === 'novelist' ? '$19' : '$49'}/mo
              </span>
              {' '}<span className="text-xs font-normal text-primary-600 dark:text-primary-400">50% off first month</span>
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {nextTier ? (
            <Link href="/#pricing">
              <button
                onClick={onClose}
                className="w-full btn-primary flex items-center justify-center gap-2 py-2.5"
              >
                Upgrade to {tierNames[nextTier]}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Link>
          ) : (
            <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-2">
              You're on our highest tier. Contact us for custom limits.
            </p>
          )}
          <button
            onClick={onClose}
            className="w-full btn-secondary py-2.5 text-sm"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}

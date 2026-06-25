import { ExternalLink, KeyRound, Wallet, UserPlus, Copy, X } from 'lucide-react';
import Modal from '@/components/common/Modal';
import { useI18n } from '@/i18n/useI18n';

interface OpenRouterTutorialModalProps {
  onClose: () => void;
}

const STEPS = [
  { icon: UserPlus, key: 'step1' },
  { icon: Wallet, key: 'step2' },
  { icon: KeyRound, key: 'step3' },
  { icon: Copy, key: 'step4' },
] as const;

export default function OpenRouterTutorialModal({ onClose }: OpenRouterTutorialModalProps) {
  const { t } = useI18n();

  return (
    <Modal onClose={onClose} ariaLabel={t('dashboard.openRouterTutorial.title')} className="max-w-lg">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('dashboard.openRouterTutorial.title')}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t('dashboard.openRouterTutorial.subtitle')}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label={t('actions.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.key}
                className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-800/50 text-primary-700 dark:text-primary-300 text-sm font-semibold shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-primary-500" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {t(`dashboard.openRouterTutorial.${step.key}Title`)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t(`dashboard.openRouterTutorial.${step.key}Desc`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <a
            href="https://openrouter.ai/settings/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center justify-center gap-2 text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            {t('dashboard.openRouterTutorial.getKeyButton')}
          </a>
          <button
            onClick={onClose}
            className="btn-secondary text-sm"
          >
            {t('dashboard.openRouterTutorial.close')}
          </button>
        </div>
      </div>
    </Modal>
  );
}

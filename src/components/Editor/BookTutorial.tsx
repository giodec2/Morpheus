import { useState } from 'react';
import { BookOpen, MessageCircle, Library, PenLine, ChevronRight, ChevronLeft, X } from 'lucide-react';
import Modal from '@/components/common/Modal';
import { useI18n } from '@/i18n/useI18n';

interface BookTutorialProps {
  bookTitle?: string;
  onClose: () => void;
}

const TUTORIAL_STEPS = [
  {
    icon: BookOpen,
    titleKey: 'editor.tutorial.welcomeTitle',
    descKey: 'editor.tutorial.welcomeDesc',
  },
  {
    icon: PenLine,
    titleKey: 'editor.tutorial.writeTitle',
    descKey: 'editor.tutorial.writeDesc',
  },
  {
    icon: MessageCircle,
    titleKey: 'editor.tutorial.chatTitle',
    descKey: 'editor.tutorial.chatDesc',
  },
  {
    icon: Library,
    titleKey: 'editor.tutorial.loreTitle',
    descKey: 'editor.tutorial.loreDesc',
  },
] as const;

export default function BookTutorial({ bookTitle, onClose }: BookTutorialProps) {
  const { t } = useI18n();
  const [step, setStep] = useState(0);

  const current = TUTORIAL_STEPS[step];
  const Icon = current.icon;
  const isFirst = step === 0;
  const isLast = step === TUTORIAL_STEPS.length - 1;

  return (
    <Modal onClose={onClose} ariaLabel={t('editor.tutorial.title')} className="max-w-md">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 bg-primary-100 dark:bg-primary-800/50 rounded-xl">
            <Icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label={t('actions.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {t(current.titleKey, { title: bookTitle || t('app.myBooks') })}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          {t(current.descKey)}
        </p>

        <div className="flex items-center justify-center gap-1.5 mb-6">
          {TUTORIAL_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === step
                  ? 'bg-primary-500 w-5'
                  : 'bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600'
              }`}
              aria-label={t('editor.tutorial.step', { number: i + 1 })}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            {t('editor.tutorial.skip')}
          </button>

          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="btn-secondary flex items-center gap-1 text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                {t('editor.tutorial.prev')}
              </button>
            )}
            <button
              onClick={() => {
                if (isLast) {
                  onClose();
                } else {
                  setStep((s) => s + 1);
                }
              }}
              className="btn-primary flex items-center gap-1 text-sm"
            >
              {isLast ? t('editor.tutorial.startWriting') : t('editor.tutorial.next')}
              {!isLast && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

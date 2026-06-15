import { useState } from 'react';
import { useI18n } from '@/i18n/useI18n';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  title: string;
  description: string;
  itemName: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({
  title,
  description,
  itemName,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  const { t } = useI18n();
  const resolvedConfirmLabel = confirmLabel || t('actions.delete');
  const resolvedCancelLabel = cancelLabel || t('actions.cancel');
  const [confirmText, setConfirmText] = useState('');
  const isConfirmed = confirmText.trim() === itemName.trim();

  return (
    <Modal onClose={onClose} className="max-w-md rounded-2xl p-6" ariaLabel={title}>
        <div className="flex items-start gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">
            {t('confirm.type')} <strong className="text-gray-700 dark:text-gray-300">"{itemName}"</strong> {t('confirm.toConfirm')}
          </label>
          <input
            autoFocus
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={t('confirm.placeholder', { item: itemName })}
            className="input w-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && isConfirmed) {
                onConfirm();
              }
              if (e.key === 'Escape') {
                onClose();
              }
            }}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 btn-secondary py-2.5 text-sm font-medium"
          >
            {resolvedCancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={!isConfirmed}
            className="flex-1 py-2.5 text-sm font-medium rounded-lg transition-all bg-red-500 hover:bg-red-600 text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-500"
          >
            {resolvedConfirmLabel}
          </button>
        </div>
    </Modal>
  );
}

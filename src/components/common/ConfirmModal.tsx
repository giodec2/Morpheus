import { useState } from 'react';
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
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  const [confirmText, setConfirmText] = useState('');
  const isConfirmed = confirmText.trim() === itemName.trim();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-2xl">
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
            Type <strong className="text-gray-700 dark:text-gray-300">"{itemName}"</strong> to confirm
          </label>
          <input
            autoFocus
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={`Type "${itemName}"`}
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
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={!isConfirmed}
            className="flex-1 py-2.5 text-sm font-medium rounded-lg transition-all bg-red-500 hover:bg-red-600 text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-500"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

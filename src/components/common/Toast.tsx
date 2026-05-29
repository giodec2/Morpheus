import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

let toastListeners: ((toasts: Toast[]) => void)[] = [];
let toasts: Toast[] = [];

function notifyListeners() {
  toastListeners.forEach((fn) => fn([...toasts]));
}

const MAX_TOASTS = 5;

export function toast(message: string, type: ToastType = 'info') {
  const id = (typeof crypto !== 'undefined' && crypto.randomUUID)
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);
  // Cap visible toasts to prevent stacking overflow
  if (toasts.length >= MAX_TOASTS) {
    toasts = toasts.slice(1);
  }
  toasts = [...toasts, { id, message, type }];
  notifyListeners();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notifyListeners();
  }, 3000);
}

export function ToastContainer() {
  const [visibleToasts, setVisibleToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (t: Toast[]) => setVisibleToasts(t);
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  if (visibleToasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {visibleToasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-2',
            t.type === 'success' && 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
            t.type === 'error' && 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800',
            t.type === 'info' && 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
          )}
        >
          {t.type === 'success' && <CheckCircle className="w-4 h-4" />}
          {t.type === 'error' && <AlertTriangle className="w-4 h-4" />}
          {t.type === 'info' && <Info className="w-4 h-4" />}
          <span>{t.message}</span>
          <button
            onClick={() => {
              toasts = toasts.filter((toast) => toast.id !== t.id);
              notifyListeners();
            }}
            className="ml-2 hover:opacity-70"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
}

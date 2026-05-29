import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * Accessible modal wrapper with focus trap, ESC close, and ARIA attributes.
 * Usage: Wrap your modal content inside this component.
 */
export default function Modal({ children, onClose, className = '', ariaLabel }: ModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Lock body scroll and capture previously focused element
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus first focusable element inside modal
    const timer = setTimeout(() => {
      const focusable = containerRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = originalOverflow;
      clearTimeout(timer);
      previouslyFocusedRef.current?.focus?.();
    };
  }, []);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Focus trap
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    container.addEventListener('keydown', handler);
    return () => container.removeEventListener('keydown', handler);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <div
        ref={containerRef}
        className={`bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-h-[90vh] overflow-y-auto ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

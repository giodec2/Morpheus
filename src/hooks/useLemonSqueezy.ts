import { useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    LemonSqueezy?: {
      Url: {
        Open: (url: string) => void;
      };
      Refresh: () => void;
    };
    createLemonSqueezy?: () => void;
  }
}

export function useLemonSqueezy() {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (window.LemonSqueezy || loadedRef.current) return;

    const existing = document.querySelector('script[src="https://app.lemonsqueezy.com/js/lemon.js"]');
    if (existing) {
      loadedRef.current = true;
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://app.lemonsqueezy.com/js/lemon.js';
    script.defer = true;
    script.onload = () => {
      loadedRef.current = true;
      if (window.createLemonSqueezy) {
        window.createLemonSqueezy();
      }
    };
    document.head.appendChild(script);

    return () => {
      // Intentionally not removing the script on unmount
      // Lemon.js should persist for the app lifecycle
    };
  }, []);

  const openCheckout = useCallback((url: string) => {
    if (window.LemonSqueezy?.Url?.Open) {
      window.LemonSqueezy.Url.Open(url);
    } else {
      // Fallback: open in new tab if Lemon.js isn't loaded yet
      window.open(url, '_blank');
    }
  }, []);

  return { openCheckout };
}

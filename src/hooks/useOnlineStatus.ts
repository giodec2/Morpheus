import { useState, useEffect } from 'react';
import { toast } from '@/components/common/Toast';

/**
 * Tracks browser online/offline status and shows a toast when going offline.
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [hasWarned, setHasWarned] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setHasWarned(false);
      toast('Back online', 'success');
    };
    const handleOffline = () => {
      setIsOnline(false);
      if (!hasWarned) {
        toast('You are offline. Changes will be saved locally and synced when you reconnect.', 'error');
        setHasWarned(true);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [hasWarned]);

  return isOnline;
}

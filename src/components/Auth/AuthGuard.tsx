import { useLocation } from 'wouter';
import { useAuthStore } from '@/stores/authStore';
import AuthModal from './AuthModal';

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * Wraps auth-required routes. Shows auth modal if user is not logged in.
 * Redirects unauthenticated users to the landing page when modal is closed.
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuthStore();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <AuthModal
        onClose={() => setLocation('/')}
        onSuccess={() => {}}
      />
    );
  }

  return <>{children}</>;
}

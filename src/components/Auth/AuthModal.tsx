import { useState } from 'react';
import { X, Mail, Lock, User, Loader2, Cloud, CloudOff } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { login, register, logout } from '@/services/auth';
import { toast } from '@/components/common/Toast';

interface AuthModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const { user, isLoading } = useAuthStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await login(email.trim(), password.trim());
        toast('Welcome back!', 'success');
      } else {
        if (!name.trim()) {
          toast('Please enter your name', 'error');
          setIsSubmitting(false);
          return;
        }
        await register(email.trim(), password.trim(), name.trim());
        toast('Account created successfully!', 'success');
      }
      onSuccess?.();
      onClose();
    } catch (err: any) {
      const msg = err?.message || 'Something went wrong. Please try again.';
      toast(msg, 'error');
    }
    setIsSubmitting(false);
  };

  const handleLogout = async () => {
    setIsSubmitting(true);
    try {
      await logout();
      toast('Logged out', 'info');
      onClose();
    } catch {
      toast('Logout failed', 'error');
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 w-full max-w-sm shadow-xl flex flex-col items-center gap-3">
          <Loader2 className="w-6 h-6 text-primary-600 animate-spin" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Checking session...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-sm shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Account</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-800/50 flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name || user.email}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg mb-6">
            <Cloud className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm text-emerald-700 dark:text-emerald-300">Cloud sync enabled</span>
          </div>

          <button
            onClick={handleLogout}
            disabled={isSubmitting}
            className="w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
          >
            {isSubmitting ? 'Logging out...' : 'Log Out'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-sm shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs text-gray-500 mb-1">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  className="input pl-9 w-full"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-500 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                className="input pl-9 w-full"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                className="input pl-9 w-full"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting
              ? mode === 'login' ? 'Signing in...' : 'Creating account...'
              : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          {mode === 'login' ? (
            <>
              No account?{' '}
              <button onClick={() => setMode('register')} className="text-primary-600 hover:underline">
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-primary-600 hover:underline">
                Sign in
              </button>
            </>
          )}
        </p>

        <div className="mt-4 flex items-center gap-2 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
          <CloudOff className="w-4 h-4 text-gray-400" />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Sign in to sync your books across devices.
          </p>
        </div>
      </div>
    </div>
  );
}

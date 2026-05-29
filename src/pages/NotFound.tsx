import { useLocation } from 'wouter';
import { BookOpen, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-950 px-4">
      <BookOpen className="w-16 h-16 text-primary-500 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
        This page doesn&apos;t exist. Maybe it wandered off into another chapter.
      </p>
      <button
        onClick={() => setLocation('/')}
        className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </button>
    </div>
  );
}

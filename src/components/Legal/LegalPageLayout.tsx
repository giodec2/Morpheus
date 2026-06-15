import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import LandingNavbar from '@/components/Landing/LandingNavbar';
import Footer from '@/components/Landing/Footer';
import { useI18n } from '@/i18n/useI18n';
import type { ReactNode } from 'react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <LandingNavbar />

      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('legal.backToHome')}
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Morpheus" className="w-8 h-8 object-contain" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">Morpheus</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('legal.lastUpdated', { date: lastUpdated })}</p>
          </div>

          {/* Content */}
          <article className="prose dark:prose-invert prose-gray max-w-none legal-content">
            {children}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

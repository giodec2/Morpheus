import { Mail, MessageSquare, Clock, MapPin } from 'lucide-react';
import LegalPageLayout from '@/components/Legal/LegalPageLayout';
import { useI18n } from '@/i18n/useI18n';
import { useSeo } from '@/lib/seo';

export default function Contact() {
  const { t } = useI18n();
  useSeo({
    path: '/contact',
    title: `${t('legal.contact.title')} — Morpheus`,
    description: t('legal.contact.intro'),
  });

  return (
    <LegalPageLayout title={t('legal.contact.title')} lastUpdated={t('legal.contact.lastUpdated')}>
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <p className="text-lg leading-relaxed">
            {t('legal.contact.intro')}
          </p>
        </section>

        <section className="grid sm:grid-cols-2 gap-4">
          <a
            href="mailto:hello@morpheusink.com"
            className="group flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {t('legal.contact.emailTitle')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('legal.contact.emailAddress')}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {t('legal.contact.emailDesc')}
              </p>
            </div>
          </a>

          <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {t('legal.contact.responseTitle')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('legal.contact.responseTime')}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {t('legal.contact.supportDays')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {t('legal.contact.supportTitle')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('legal.contact.supportDesc')}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {t('legal.contact.includeEmail')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {t('legal.contact.basedInTitle')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('legal.contact.basedInLocation')}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {t('legal.contact.basedInDesc')}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {t('legal.contact.beforeYouWrite')}
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>{t('legal.contact.billingIssue')}</strong>{' '}
              {t('legal.contact.billingIssueText', { refundPolicy: t('legal.contact.refundLink') })}
            </li>
            <li>
              <strong>{t('legal.contact.commonQuestion')}</strong>{' '}
              {t('legal.contact.commonQuestionText', { faqPage: t('legal.contact.faqLink') })}
            </li>
            <li>
              <strong>{t('legal.contact.bugReport')}</strong>{' '}
              {t('legal.contact.bugReportText')}
            </li>
          </ul>
        </section>

        <section className="text-center pt-4">
          <a
            href="mailto:hello@morpheusink.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-primary-500/30"
          >
            <Mail className="w-4 h-4" />
            {t('legal.contact.sendEmail')}
          </a>
        </section>
      </div>
    </LegalPageLayout>
  );
}

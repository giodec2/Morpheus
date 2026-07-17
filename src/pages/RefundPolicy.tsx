/* NOTE: This is a best-effort Italian translation and should be reviewed by an Italian legal professional before publication. */

import LegalPageLayout from '@/components/Legal/LegalPageLayout';
import { useI18n } from '@/i18n/useI18n';
import { useSeo } from '@/lib/seo';

export default function RefundPolicy() {
  const { t } = useI18n();
  useSeo({
    path: '/refund',
    title: `${t('legal.refundPolicy.title')} — Morpheus`,
    description:
      'Morpheus refund policy: EU 14-day right of withdrawal and fair refunds on unused subscriptions.',
  });

  return (
    <LegalPageLayout title={t('legal.refundPolicy.title')} lastUpdated={t('legal.refundPolicy.lastUpdated')}>
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>IMPORTANT:</strong> {t('legal.refundPolicy.notice')}
          </p>
          <p>
            {t('legal.refundPolicy.intro1')}
          </p>
          <p className="mt-2">
            {t('legal.refundPolicy.intro2')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.refundPolicy.freePlan.title')}</h2>
          <p>
            {t('legal.refundPolicy.freePlan.text')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.refundPolicy.freeTrial.title')}</h2>
          <p>
            {t('legal.refundPolicy.freeTrial.intro')}
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>{t('legal.refundPolicy.freeTrial.items.0')}</li>
            <li>{t('legal.refundPolicy.freeTrial.items.1')}</li>
            <li>{t('legal.refundPolicy.freeTrial.items.2')}</li>
            <li>{t('legal.refundPolicy.freeTrial.items.3')}</li>
          </ul>
          <p className="mt-2">
            {t('legal.refundPolicy.freeTrial.reminder')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.refundPolicy.withdrawal.title')}</h2>
          <p>
            <strong>{t('legal.refundPolicy.withdrawal.intro')}</strong>
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.refundPolicy.withdrawal.digitalServices.title')}</h3>
          <p>
            {t('legal.refundPolicy.withdrawal.digitalServices.intro')}
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>{t('legal.refundPolicy.withdrawal.digitalServices.items.0')}</li>
            <li>{t('legal.refundPolicy.withdrawal.digitalServices.items.1')}</li>
            <li>{t('legal.refundPolicy.withdrawal.digitalServices.items.2')}</li>
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.refundPolicy.withdrawal.waiver.title')}</h3>
          <p>
            {t('legal.refundPolicy.withdrawal.waiver.intro')}
          </p>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mt-2 text-sm border-l-4 border-primary-500">
            <p className="italic">
              {t('legal.refundPolicy.withdrawal.waiver.quote')}
            </p>
          </div>
          <p className="mt-2">
            {t('legal.refundPolicy.withdrawal.waiver.consent')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.refundPolicy.withdrawal.exercise.title')}</h3>
          <p>{t('legal.refundPolicy.withdrawal.exercise.intro')}</p>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mt-2 text-sm">
            <p>{t('legal.refundPolicy.withdrawal.exercise.emailLabel')}<a href="mailto:hello@morpheusink.com" className="text-primary-600 dark:text-primary-400 underline">hello@morpheusink.com</a></p>
            <p>{t('legal.refundPolicy.withdrawal.exercise.include')}</p>
          </div>
          <p className="mt-2">
            {t('legal.refundPolicy.withdrawal.exercise.timing')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.refundPolicy.voluntary.title')}</h2>
          <p>
            {t('legal.refundPolicy.voluntary.intro')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.refundPolicy.voluntary.minimalUsage.title')}</h3>
          <p>
            {t('legal.refundPolicy.voluntary.minimalUsage.text')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.refundPolicy.voluntary.technical.title')}</h3>
          <p>
            {t('legal.refundPolicy.voluntary.technical.text')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.refundPolicy.voluntary.duplicate.title')}</h3>
          <p>
            {t('legal.refundPolicy.voluntary.duplicate.text')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.refundPolicy.voluntary.noRefunds.title')}</h3>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>{t('legal.refundPolicy.voluntary.noRefunds.items.0')}</li>
            <li>{t('legal.refundPolicy.voluntary.noRefunds.items.1')}</li>
            <li>{t('legal.refundPolicy.voluntary.noRefunds.items.2')}</li>
            <li>{t('legal.refundPolicy.voluntary.noRefunds.items.3')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.refundPolicy.cancellation.title')}</h2>
          <p>{t('legal.refundPolicy.cancellation.intro')}</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>{t('legal.refundPolicy.cancellation.items.0')}</li>
            <li>{t('legal.refundPolicy.cancellation.items.1')}<a href="mailto:hello@morpheusink.com" className="text-primary-600 dark:text-primary-400 underline">{t('legal.refundPolicy.cancellation.email')}</a>{t('legal.refundPolicy.cancellation.itemEnd')}</li>
          </ul>
          <p className="mt-2">
            {t('legal.refundPolicy.cancellation.effect')}
          </p>
          <p className="mt-2">
            <strong>{t('legal.refundPolicy.cancellation.easy')}</strong>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.refundPolicy.refundMethod.title')}</h2>
          <p>
            {t('legal.refundPolicy.refundMethod.text')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.refundPolicy.modelForm.title')}</h2>
          <p>
            {t('legal.refundPolicy.modelForm.intro')}
          </p>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mt-2 text-sm font-mono whitespace-pre-wrap border border-gray-200 dark:border-slate-700">
            {t('legal.refundPolicy.modelForm.form')}
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {t('legal.refundPolicy.modelForm.note')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.refundPolicy.nonEu.title')}</h2>
          <p>
            {t('legal.refundPolicy.nonEu.text')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.refundPolicy.contact.title')}</h2>
          <p>{t('legal.refundPolicy.contact.intro')}</p>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mt-2 text-sm">
            <p><strong>{t('legal.refundPolicy.contact.name')}</strong></p>
            <p>{t('legal.refundPolicy.contact.emailLabel')}<a href="mailto:hello@morpheusink.com" className="text-primary-600 dark:text-primary-400 underline">hello@morpheusink.com</a></p>
            <p>{t('legal.refundPolicy.contact.address')}</p>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {t('legal.refundPolicy.contact.response')}
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}

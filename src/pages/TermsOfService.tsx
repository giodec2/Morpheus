/* NOTE: This is a best-effort Italian translation and should be reviewed by an Italian legal professional before publication. */

import LegalPageLayout from '@/components/Legal/LegalPageLayout';
import { useI18n } from '@/i18n/useI18n';

export default function TermsOfService() {
  const { t } = useI18n();

  return (
    <LegalPageLayout title={t('legal.termsOfService.title')} lastUpdated={t('legal.termsOfService.lastUpdated')}>
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>IMPORTANT:</strong> {t('legal.termsOfService.notice')}
          </p>
          <p>
            {t('legal.termsOfService.intro1')}<strong>{t('legal.termsOfService.intro1Strong')}</strong>{t('legal.termsOfService.intro2')}
          </p>
          <p className="mt-2">
            {t('legal.termsOfService.intro3')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.definitions.title')}</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>{t('legal.termsOfService.definitions.items.0.term')}</strong>{t('legal.termsOfService.definitions.items.0.text')}</li>
            <li><strong>{t('legal.termsOfService.definitions.items.1.term')}</strong>{t('legal.termsOfService.definitions.items.1.text')}<strong>{t('legal.termsOfService.definitions.items.1.term2')}</strong>{t('legal.termsOfService.definitions.items.1.text2')}</li>
            <li><strong>{t('legal.termsOfService.definitions.items.2.term')}</strong>{t('legal.termsOfService.definitions.items.2.text')}</li>
            <li><strong>{t('legal.termsOfService.definitions.items.3.term')}</strong>{t('legal.termsOfService.definitions.items.3.text')}</li>
            <li><strong>{t('legal.termsOfService.definitions.items.4.term')}</strong>{t('legal.termsOfService.definitions.items.4.text')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.eligibility.title')}</h2>
          <p>{t('legal.termsOfService.eligibility.intro')}</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>{t('legal.termsOfService.eligibility.items.0')}</li>
            <li>{t('legal.termsOfService.eligibility.items.1')}</li>
            <li>{t('legal.termsOfService.eligibility.items.2')}</li>
            <li>{t('legal.termsOfService.eligibility.items.3')}</li>
          </ul>
          <p className="mt-2">
            {t('legal.termsOfService.eligibility.minor')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.account.title')}</h2>
          <p>{t('legal.termsOfService.account.intro')}</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>{t('legal.termsOfService.account.items.0')}</li>
            <li>{t('legal.termsOfService.account.items.1')}</li>
            <li>{t('legal.termsOfService.account.items.2')}</li>
            <li>{t('legal.termsOfService.account.items.3')}</li>
          </ul>
          <p className="mt-2">
            {t('legal.termsOfService.account.suspension')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.subscriptions.title')}</h2>
          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.termsOfService.subscriptions.freePlan.title')}</h3>
          <p>{t('legal.termsOfService.subscriptions.freePlan.text')}</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.termsOfService.subscriptions.freeTrial.title')}</h3>
          <p>{t('legal.termsOfService.subscriptions.freeTrial.text')}</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.termsOfService.subscriptions.paid.title')}</h3>
          <p>{t('legal.termsOfService.subscriptions.paid.text')}</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.termsOfService.subscriptions.priceChanges.title')}</h3>
          <p>{t('legal.termsOfService.subscriptions.priceChanges.text')}</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.termsOfService.subscriptions.taxes.title')}</h3>
          <p>{t('legal.termsOfService.subscriptions.taxes.text')}</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.termsOfService.subscriptions.cancellation.title')}</h3>
          <p>{t('legal.termsOfService.subscriptions.cancellation.text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.aiFeatures.title')}</h2>
          <p>{t('legal.termsOfService.aiFeatures.intro')}</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>{t('legal.termsOfService.aiFeatures.items.0.strong')}</strong>{t('legal.termsOfService.aiFeatures.items.0.text')}</li>
            <li><strong>{t('legal.termsOfService.aiFeatures.items.1.strong')}</strong>{t('legal.termsOfService.aiFeatures.items.1.text')}</li>
            <li><strong>{t('legal.termsOfService.aiFeatures.items.2.strong')}</strong>{t('legal.termsOfService.aiFeatures.items.2.text')}</li>
            <li><strong>{t('legal.termsOfService.aiFeatures.items.3.strong')}</strong>{t('legal.termsOfService.aiFeatures.items.3.text')}<a href="/privacy" className="text-primary-600 dark:text-primary-400 underline">{t('legal.termsOfService.aiFeatures.items.3.linkText')}</a>{t('legal.termsOfService.aiFeatures.items.3.text2')}</li>
            <li><strong>{t('legal.termsOfService.aiFeatures.items.4.strong')}</strong>{t('legal.termsOfService.aiFeatures.items.4.text')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.ip.title')}</h2>
          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.termsOfService.ip.yourContent.title')}</h3>
          <p>{t('legal.termsOfService.ip.yourContent.text1')}</p>
          <p className="mt-2">
            {t('legal.termsOfService.ip.yourContent.text2')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.termsOfService.ip.ourIp.title')}</h3>
          <p>{t('legal.termsOfService.ip.ourIp.text')}</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.termsOfService.ip.aiRights.title')}</h3>
          <p>{t('legal.termsOfService.ip.aiRights.text')}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.acceptableUse.title')}</h2>
          <p>{t('legal.termsOfService.acceptableUse.intro')}</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>{t('legal.termsOfService.acceptableUse.items.0')}</li>
            <li>{t('legal.termsOfService.acceptableUse.items.1')}</li>
            <li>{t('legal.termsOfService.acceptableUse.items.2')}</li>
            <li>{t('legal.termsOfService.acceptableUse.items.3')}</li>
            <li>{t('legal.termsOfService.acceptableUse.items.4')}</li>
            <li>{t('legal.termsOfService.acceptableUse.items.5')}</li>
            <li>{t('legal.termsOfService.acceptableUse.items.6')}</li>
            <li>{t('legal.termsOfService.acceptableUse.items.7')}</li>
            <li>{t('legal.termsOfService.acceptableUse.items.8')}</li>
          </ul>
          <p className="mt-2">
            {t('legal.termsOfService.acceptableUse.action')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.termination.title')}</h2>
          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.termsOfService.termination.byYou.title')}</h3>
          <p>{t('legal.termsOfService.termination.byYou.text')}</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.termsOfService.termination.byUs.title')}</h3>
          <p>{t('legal.termsOfService.termination.byUs.intro')}</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>{t('legal.termsOfService.termination.byUs.items.0')}</li>
            <li>{t('legal.termsOfService.termination.byUs.items.1')}</li>
            <li>{t('legal.termsOfService.termination.byUs.items.2')}</li>
            <li>{t('legal.termsOfService.termination.byUs.items.3')}</li>
          </ul>
          <p className="mt-2">
            {t('legal.termsOfService.termination.byUs.effect')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.dpa.title')}</h2>
          <p>
            {t('legal.termsOfService.dpa.intro')}
          </p>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mt-3 text-sm space-y-3">
            <p><strong>{t('legal.termsOfService.dpa.items.0.strong')}</strong>{t('legal.termsOfService.dpa.items.0.text')}</p>
            <p><strong>{t('legal.termsOfService.dpa.items.1.strong')}</strong>{t('legal.termsOfService.dpa.items.1.text')}</p>
            <p><strong>{t('legal.termsOfService.dpa.items.2.strong')}</strong>{t('legal.termsOfService.dpa.items.2.text')}</p>
            <p><strong>{t('legal.termsOfService.dpa.items.3.strong')}</strong>{t('legal.termsOfService.dpa.items.3.text')}</p>
            <p><strong>{t('legal.termsOfService.dpa.items.4.strong')}</strong>{t('legal.termsOfService.dpa.items.4.text')}</p>
            <p><strong>{t('legal.termsOfService.dpa.items.5.strong')}</strong>{t('legal.termsOfService.dpa.items.5.text')}</p>
            <p><strong>{t('legal.termsOfService.dpa.items.6.strong')}</strong>{t('legal.termsOfService.dpa.items.6.text')}</p>
            <p><strong>{t('legal.termsOfService.dpa.items.7.strong')}</strong>{t('legal.termsOfService.dpa.items.7.text')}</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.disclaimers.title')}</h2>
          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.termsOfService.disclaimers.asIs.title')}</h3>
          <p>
            {t('legal.termsOfService.disclaimers.asIs.text')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.termsOfService.disclaimers.availability.title')}</h3>
          <p>
            {t('legal.termsOfService.disclaimers.availability.text')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.termsOfService.disclaimers.backup.title')}</h3>
          <p>
            {t('legal.termsOfService.disclaimers.backup.text')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.termsOfService.disclaimers.liability.title')}</h3>
          <p>
            {t('legal.termsOfService.disclaimers.liability.text1')}
          </p>
          <p className="mt-2">
            {t('legal.termsOfService.disclaimers.liability.text2')}
          </p>
          <p className="mt-2">
            {t('legal.termsOfService.disclaimers.liability.text3')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.indemnification.title')}</h2>
          <p>
            {t('legal.termsOfService.indemnification.text')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.governingLaw.title')}</h2>
          <p>
            {t('legal.termsOfService.governingLaw.text1')}<strong>{t('legal.termsOfService.governingLaw.country')}</strong>{t('legal.termsOfService.governingLaw.text2')}
          </p>
          <p className="mt-2">
            {t('legal.termsOfService.governingLaw.text3')}<strong>{t('legal.termsOfService.governingLaw.jurisdiction')}</strong>{t('legal.termsOfService.governingLaw.text4')}
          </p>
          <p className="mt-2">
            {t('legal.termsOfService.governingLaw.odr')}<a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">{t('legal.termsOfService.governingLaw.odrLink')}</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.changes.title')}</h2>
          <p>
            {t('legal.termsOfService.changes.text')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.severability.title')}</h2>
          <p>
            {t('legal.termsOfService.severability.text')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.entireAgreement.title')}</h2>
          <p>
            {t('legal.termsOfService.entireAgreement.text1')}<a href="/privacy" className="text-primary-600 dark:text-primary-400 underline">{t('legal.termsOfService.entireAgreement.privacyLink')}</a>{t('legal.termsOfService.entireAgreement.text2')}<a href="/cookies" className="text-primary-600 dark:text-primary-400 underline">{t('legal.termsOfService.entireAgreement.cookieLink')}</a>{t('legal.termsOfService.entireAgreement.text3')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.termsOfService.contact.title')}</h2>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg text-sm">
            <p><strong>{t('legal.termsOfService.contact.name')}</strong></p>
            <p>{t('legal.termsOfService.contact.businessType')}</p>
            <p>{t('legal.termsOfService.contact.address')}</p>
            <p>{t('legal.termsOfService.contact.emailLabel')}<a href="mailto:hello@morpheusink.com" className="text-primary-600 dark:text-primary-400 underline">hello@morpheusink.com</a></p>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}

/* NOTE: This is a best-effort Italian translation and should be reviewed by an Italian legal professional before publication. */

import LegalPageLayout from '@/components/Legal/LegalPageLayout';
import { useI18n } from '@/i18n/useI18n';

export default function PrivacyPolicy() {
  const { t } = useI18n();

  return (
    <LegalPageLayout title={t('legal.privacyPolicy.title')} lastUpdated={t('legal.privacyPolicy.lastUpdated')}>
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>IMPORTANT:</strong> {t('legal.privacyPolicy.notice')}
          </p>
          <p>
            {t('legal.privacyPolicy.intro1')}<strong>{t('legal.privacyPolicy.intro1Strong')}</strong>{t('legal.privacyPolicy.intro2')}
          </p>
          <p>
            {t('legal.privacyPolicy.intro3')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.privacyPolicy.controller.title')}</h2>
          <p>{t('legal.privacyPolicy.controller.text')}</p>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mt-2 text-sm">
            <p><strong>{t('legal.privacyPolicy.controller.name')}</strong></p>
            <p>{t('legal.privacyPolicy.controller.businessType')}</p>
            <p>{t('legal.privacyPolicy.controller.address1')}</p>
            <p>{t('legal.privacyPolicy.controller.address2')}</p>
            <p>{t('legal.privacyPolicy.controller.cf')}</p>
            <p>{t('legal.privacyPolicy.controller.vat')}</p>
            <p>{t('legal.privacyPolicy.controller.emailLabel')}<a href="mailto:hello@morpheusink.com" className="text-primary-600 dark:text-primary-400 underline">hello@morpheusink.com</a></p>
          </div>
          <p className="mt-3">
            {t('legal.privacyPolicy.controller.dpo')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.privacyPolicy.dataCollected.title')}</h2>
          <p>{t('legal.privacyPolicy.dataCollected.intro')}</p>
          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.privacyPolicy.dataCollected.accountInfo.title')}</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t('legal.privacyPolicy.dataCollected.accountInfo.items.0')}</li>
            <li>{t('legal.privacyPolicy.dataCollected.accountInfo.items.1')}</li>
            <li>{t('legal.privacyPolicy.dataCollected.accountInfo.items.2')}</li>
            <li>{t('legal.privacyPolicy.dataCollected.accountInfo.items.3')}</li>
          </ul>
          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.privacyPolicy.dataCollected.content.title')}</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t('legal.privacyPolicy.dataCollected.content.items.0')}</li>
            <li>{t('legal.privacyPolicy.dataCollected.content.items.1')}</li>
            <li>{t('legal.privacyPolicy.dataCollected.content.items.2')}</li>
            <li>{t('legal.privacyPolicy.dataCollected.content.items.3')}</li>
          </ul>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <strong>Important:</strong> {t('legal.privacyPolicy.dataCollected.content.note')}
          </p>
          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.privacyPolicy.dataCollected.technical.title')}</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t('legal.privacyPolicy.dataCollected.technical.items.0')}</li>
            <li>{t('legal.privacyPolicy.dataCollected.technical.items.1')}</li>
            <li>{t('legal.privacyPolicy.dataCollected.technical.items.2')}</li>
            <li>{t('legal.privacyPolicy.dataCollected.technical.items.3')}</li>
            <li>{t('legal.privacyPolicy.dataCollected.technical.items.4')}</li>
          </ul>
          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.privacyPolicy.dataCollected.payment.title')}</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t('legal.privacyPolicy.dataCollected.payment.items.0')}</li>
            <li>{t('legal.privacyPolicy.dataCollected.payment.items.1')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.privacyPolicy.legalBasis.title')}</h2>
          <p>{t('legal.privacyPolicy.legalBasis.intro')}</p>
          <table className="w-full text-sm mt-3 border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">{t('legal.privacyPolicy.legalBasis.headers.activity')}</th>
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">{t('legal.privacyPolicy.legalBasis.headers.basis')}</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-2 pr-4">{t('legal.privacyPolicy.legalBasis.rows.0.activity')}</td>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.legalBasis.rows.0.basis')}</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-2 pr-4">{t('legal.privacyPolicy.legalBasis.rows.1.activity')}</td>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.legalBasis.rows.1.basis')}</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-2 pr-4">{t('legal.privacyPolicy.legalBasis.rows.2.activity')}</td>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.legalBasis.rows.2.basis')}</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-2 pr-4">{t('legal.privacyPolicy.legalBasis.rows.3.activity')}</td>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.legalBasis.rows.3.basis')}</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-2 pr-4">{t('legal.privacyPolicy.legalBasis.rows.4.activity')}</td>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.legalBasis.rows.4.basis')}</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-2 pr-4">{t('legal.privacyPolicy.legalBasis.rows.5.activity')}</td>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.legalBasis.rows.5.basis')}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.legalBasis.rows.6.activity')}</td>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.legalBasis.rows.6.basis')}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.privacyPolicy.howWeUse.title')}</h2>
          <p>{t('legal.privacyPolicy.howWeUse.intro')}</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>{t('legal.privacyPolicy.howWeUse.items.0.strong')}</strong>{t('legal.privacyPolicy.howWeUse.items.0.text')}</li>
            <li><strong>{t('legal.privacyPolicy.howWeUse.items.1.strong')}</strong>{t('legal.privacyPolicy.howWeUse.items.1.text')}</li>
            <li><strong>{t('legal.privacyPolicy.howWeUse.items.2.strong')}</strong>{t('legal.privacyPolicy.howWeUse.items.2.text')}</li>
            <li><strong>{t('legal.privacyPolicy.howWeUse.items.3.strong')}</strong>{t('legal.privacyPolicy.howWeUse.items.3.text')}</li>
            <li><strong>{t('legal.privacyPolicy.howWeUse.items.4.strong')}</strong>{t('legal.privacyPolicy.howWeUse.items.4.text')}</li>
            <li><strong>{t('legal.privacyPolicy.howWeUse.items.5.strong')}</strong>{t('legal.privacyPolicy.howWeUse.items.5.text')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.privacyPolicy.retention.title')}</h2>
          <p>{t('legal.privacyPolicy.retention.intro')}</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>{t('legal.privacyPolicy.retention.items.0.strong')}</strong>{t('legal.privacyPolicy.retention.items.0.text')}</li>
            <li><strong>{t('legal.privacyPolicy.retention.items.1.strong')}</strong>{t('legal.privacyPolicy.retention.items.1.text')}</li>
            <li><strong>{t('legal.privacyPolicy.retention.items.2.strong')}</strong>{t('legal.privacyPolicy.retention.items.2.text')}</li>
            <li><strong>{t('legal.privacyPolicy.retention.items.3.strong')}</strong>{t('legal.privacyPolicy.retention.items.3.text')}</li>
            <li><strong>{t('legal.privacyPolicy.retention.items.4.strong')}</strong>{t('legal.privacyPolicy.retention.items.4.text')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.privacyPolicy.sharing.title')}</h2>
          <p>{t('legal.privacyPolicy.sharing.intro')}</p>
          <table className="w-full text-sm mt-3 border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">{t('legal.privacyPolicy.sharing.headers.processor')}</th>
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">{t('legal.privacyPolicy.sharing.headers.purpose')}</th>
                <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">{t('legal.privacyPolicy.sharing.headers.location')}</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-400">
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-2 pr-4">{t('legal.privacyPolicy.sharing.rows.0.processor')}</td>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.sharing.rows.0.purpose')}</td>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.sharing.rows.0.location')}</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-2 pr-4">{t('legal.privacyPolicy.sharing.rows.1.processor')}</td>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.sharing.rows.1.purpose')}</td>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.sharing.rows.1.location')}</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-slate-800">
                <td className="py-2 pr-4">{t('legal.privacyPolicy.sharing.rows.2.processor')}</td>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.sharing.rows.2.purpose')}</td>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.sharing.rows.2.location')}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.sharing.rows.3.processor')}</td>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.sharing.rows.3.purpose')}</td>
                <td className="py-2 pr-4">{t('legal.privacyPolicy.sharing.rows.3.location')}</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {t('legal.privacyPolicy.sharing.note1')}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {t('legal.privacyPolicy.sharing.note2')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.privacyPolicy.rights.title')}</h2>
          <p>{t('legal.privacyPolicy.rights.intro')}</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>{t('legal.privacyPolicy.rights.items.0.strong')}</strong>{t('legal.privacyPolicy.rights.items.0.text')}</li>
            <li><strong>{t('legal.privacyPolicy.rights.items.1.strong')}</strong>{t('legal.privacyPolicy.rights.items.1.text')}</li>
            <li><strong>{t('legal.privacyPolicy.rights.items.2.strong')}</strong>{t('legal.privacyPolicy.rights.items.2.text')}</li>
            <li><strong>{t('legal.privacyPolicy.rights.items.3.strong')}</strong>{t('legal.privacyPolicy.rights.items.3.text')}</li>
            <li><strong>{t('legal.privacyPolicy.rights.items.4.strong')}</strong>{t('legal.privacyPolicy.rights.items.4.text')}</li>
            <li><strong>{t('legal.privacyPolicy.rights.items.5.strong')}</strong>{t('legal.privacyPolicy.rights.items.5.text')}</li>
            <li><strong>{t('legal.privacyPolicy.rights.items.6.strong')}</strong>{t('legal.privacyPolicy.rights.items.6.text')}</li>
            <li><strong>{t('legal.privacyPolicy.rights.items.7.strong')}</strong>{t('legal.privacyPolicy.rights.items.7.text')}</li>
          </ul>
          <p className="mt-3">
            {t('legal.privacyPolicy.rights.contact')}<a href="mailto:hello@morpheusink.com" className="text-primary-600 dark:text-primary-400 underline">hello@morpheusink.com</a>. {t('legal.privacyPolicy.rights.response')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.privacyPolicy.cookies.title')}</h2>
          <p>
            {t('legal.privacyPolicy.cookies.text1')}<a href="/cookies" className="text-primary-600 dark:text-primary-400 underline">{t('legal.privacyPolicy.cookies.linkText')}</a>{t('legal.privacyPolicy.cookies.text2')}
          </p>
          <p className="mt-2">
            {t('legal.privacyPolicy.cookies.text3')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.privacyPolicy.aiPractices.title')}</h2>
          <p>{t('legal.privacyPolicy.aiPractices.intro')}</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>{t('legal.privacyPolicy.aiPractices.items.0.strong')}</strong>{t('legal.privacyPolicy.aiPractices.items.0.text')}</li>
            <li><strong>{t('legal.privacyPolicy.aiPractices.items.1.strong')}</strong>{t('legal.privacyPolicy.aiPractices.items.1.text')}</li>
            <li><strong>{t('legal.privacyPolicy.aiPractices.items.2.strong')}</strong>{t('legal.privacyPolicy.aiPractices.items.2.text')}</li>
            <li><strong>{t('legal.privacyPolicy.aiPractices.items.3.strong')}</strong>{t('legal.privacyPolicy.aiPractices.items.3.text')}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.privacyPolicy.security.title')}</h2>
          <p>{t('legal.privacyPolicy.security.intro')}</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>{t('legal.privacyPolicy.security.items.0')}</li>
            <li>{t('legal.privacyPolicy.security.items.1')}</li>
            <li>{t('legal.privacyPolicy.security.items.2')}</li>
            <li>{t('legal.privacyPolicy.security.items.3')}</li>
            <li>{t('legal.privacyPolicy.security.items.4')}</li>
          </ul>
          <p className="mt-2">
            {t('legal.privacyPolicy.security.breach')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.privacyPolicy.children.title')}</h2>
          <p>
            {t('legal.privacyPolicy.children.text')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.privacyPolicy.changes.title')}</h2>
          <p>
            {t('legal.privacyPolicy.changes.text')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.privacyPolicy.contact.title')}</h2>
          <p>{t('legal.privacyPolicy.contact.intro')}</p>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mt-2 text-sm">
            <p><strong>{t('legal.privacyPolicy.contact.name')}</strong></p>
            <p>{t('legal.privacyPolicy.contact.emailLabel')}<a href="mailto:hello@morpheusink.com" className="text-primary-600 dark:text-primary-400 underline">hello@morpheusink.com</a></p>
            <p>{t('legal.privacyPolicy.contact.addressLabel')}{t('legal.privacyPolicy.contact.address')}</p>
            <p className="mt-2">{t('legal.privacyPolicy.contact.dpaRight')}</p>
            <p><a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">{t('legal.privacyPolicy.contact.dpaLink')}</a></p>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}

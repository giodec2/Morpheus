/* NOTE: This is a best-effort Italian translation and should be reviewed by an Italian legal professional before publication. */

import LegalPageLayout from '@/components/Legal/LegalPageLayout';
import { useI18n } from '@/i18n/useI18n';

export default function CookiePolicy() {
  const { t } = useI18n();

  return (
    <LegalPageLayout title={t('legal.cookiePolicy.title')} lastUpdated={t('legal.cookiePolicy.lastUpdated')}>
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>IMPORTANT:</strong> {t('legal.cookiePolicy.notice')}
          </p>
          <p>
            {t('legal.cookiePolicy.intro1')}<strong>{t('legal.cookiePolicy.intro1Strong')}</strong>{t('legal.cookiePolicy.intro2')}
          </p>
          <p className="mt-2">
            {t('legal.cookiePolicy.intro3')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.cookiePolicy.whatAre.title')}</h2>
          <p>
            {t('legal.cookiePolicy.whatAre.text1')}
          </p>
          <p className="mt-2">
            {t('legal.cookiePolicy.whatAre.text2')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.cookiePolicy.howWeUse.title')}</h2>
          <p>{t('legal.cookiePolicy.howWeUse.intro')}</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.cookiePolicy.howWeUse.essential.title')}</h3>
          <p>{t('legal.cookiePolicy.howWeUse.essential.intro')}</p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li><strong>{t('legal.cookiePolicy.howWeUse.essential.items.0.strong')}</strong>{t('legal.cookiePolicy.howWeUse.essential.items.0.text')}</li>
            <li><strong>{t('legal.cookiePolicy.howWeUse.essential.items.1.strong')}</strong>{t('legal.cookiePolicy.howWeUse.essential.items.1.text')}</li>
            <li><strong>{t('legal.cookiePolicy.howWeUse.essential.items.2.strong')}</strong>{t('legal.cookiePolicy.howWeUse.essential.items.2.text')}</li>
            <li><strong>{t('legal.cookiePolicy.howWeUse.essential.items.3.strong')}</strong>{t('legal.cookiePolicy.howWeUse.essential.items.3.text')}</li>
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.cookiePolicy.howWeUse.analytics.title')}</h3>
          <p>
            {t('legal.cookiePolicy.howWeUse.analytics.text1')}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('legal.cookiePolicy.howWeUse.analytics.text2')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.cookiePolicy.howWeUse.marketing.title')}</h3>
          <p>
            {t('legal.cookiePolicy.howWeUse.marketing.text')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.cookiePolicy.cookiesWeUse.title')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">{t('legal.cookiePolicy.cookiesWeUse.headers.name')}</th>
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">{t('legal.cookiePolicy.cookiesWeUse.headers.provider')}</th>
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">{t('legal.cookiePolicy.cookiesWeUse.headers.purpose')}</th>
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">{t('legal.cookiePolicy.cookiesWeUse.headers.duration')}</th>
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">{t('legal.cookiePolicy.cookiesWeUse.headers.type')}</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-slate-800">
                  <td className="py-2 pr-4 font-mono text-xs">{t('legal.cookiePolicy.cookiesWeUse.rows.0.name')}</td>
                  <td className="py-2 pr-4">{t('legal.cookiePolicy.cookiesWeUse.rows.0.provider')}</td>
                  <td className="py-2 pr-4">{t('legal.cookiePolicy.cookiesWeUse.rows.0.purpose')}</td>
                  <td className="py-2 pr-4">{t('legal.cookiePolicy.cookiesWeUse.rows.0.duration')}</td>
                  <td className="py-2 pr-4"><span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">{t('legal.cookiePolicy.cookiesWeUse.rows.0.type')}</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-800">
                  <td className="py-2 pr-4 font-mono text-xs">{t('legal.cookiePolicy.cookiesWeUse.rows.1.name')}</td>
                  <td className="py-2 pr-4">{t('legal.cookiePolicy.cookiesWeUse.rows.1.provider')}</td>
                  <td className="py-2 pr-4">{t('legal.cookiePolicy.cookiesWeUse.rows.1.purpose')}</td>
                  <td className="py-2 pr-4">{t('legal.cookiePolicy.cookiesWeUse.rows.1.duration')}</td>
                  <td className="py-2 pr-4"><span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">{t('legal.cookiePolicy.cookiesWeUse.rows.1.type')}</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-800">
                  <td className="py-2 pr-4 font-mono text-xs">{t('legal.cookiePolicy.cookiesWeUse.rows.2.name')}</td>
                  <td className="py-2 pr-4">{t('legal.cookiePolicy.cookiesWeUse.rows.2.provider')}</td>
                  <td className="py-2 pr-4">{t('legal.cookiePolicy.cookiesWeUse.rows.2.purpose')}</td>
                  <td className="py-2 pr-4">{t('legal.cookiePolicy.cookiesWeUse.rows.2.duration')}</td>
                  <td className="py-2 pr-4"><span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">{t('legal.cookiePolicy.cookiesWeUse.rows.2.type')}</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-800 opacity-60">
                  <td className="py-2 pr-4 font-mono text-xs">{t('legal.cookiePolicy.cookiesWeUse.rows.3.name')}</td>
                  <td className="py-2 pr-4">{t('legal.cookiePolicy.cookiesWeUse.rows.3.provider')}</td>
                  <td className="py-2 pr-4">{t('legal.cookiePolicy.cookiesWeUse.rows.3.purpose')}</td>
                  <td className="py-2 pr-4">{t('legal.cookiePolicy.cookiesWeUse.rows.3.duration')}</td>
                  <td className="py-2 pr-4"><span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">{t('legal.cookiePolicy.cookiesWeUse.rows.3.type')}</span></td>
                </tr>
                <tr className="opacity-60">
                  <td className="py-2 pr-4 font-mono text-xs">{t('legal.cookiePolicy.cookiesWeUse.rows.4.name')}</td>
                  <td className="py-2 pr-4">{t('legal.cookiePolicy.cookiesWeUse.rows.4.provider')}</td>
                  <td className="py-2 pr-4">{t('legal.cookiePolicy.cookiesWeUse.rows.4.purpose')}</td>
                  <td className="py-2 pr-4">{t('legal.cookiePolicy.cookiesWeUse.rows.4.duration')}</td>
                  <td className="py-2 pr-4"><span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">{t('legal.cookiePolicy.cookiesWeUse.rows.4.type')}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {t('legal.cookiePolicy.cookiesWeUse.note')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.cookiePolicy.thirdParty.title')}</h2>
          <p>
            {t('legal.cookiePolicy.thirdParty.intro')}
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>{t('legal.cookiePolicy.thirdParty.items.0.strong')}</strong>{t('legal.cookiePolicy.thirdParty.items.0.text')}</li>
            <li><strong>{t('legal.cookiePolicy.thirdParty.items.1.strong')}</strong>{t('legal.cookiePolicy.thirdParty.items.1.text')}</li>
            <li><strong>{t('legal.cookiePolicy.thirdParty.items.2.strong')}</strong>{t('legal.cookiePolicy.thirdParty.items.2.text')}</li>
          </ul>
          <p className="mt-2">
            {t('legal.cookiePolicy.thirdParty.ownPolicies')}
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li><a href={t('legal.cookiePolicy.thirdParty.links.0.href')} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">{t('legal.cookiePolicy.thirdParty.links.0.text')}</a></li>
            <li><a href={t('legal.cookiePolicy.thirdParty.links.1.href')} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">{t('legal.cookiePolicy.thirdParty.links.1.text')}</a></li>
            <li><a href={t('legal.cookiePolicy.thirdParty.links.2.href')} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">{t('legal.cookiePolicy.thirdParty.links.2.text')}</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.cookiePolicy.manage.title')}</h2>
          <p>{t('legal.cookiePolicy.manage.intro')}</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.cookiePolicy.manage.banner.title')}</h3>
          <p>
            {t('legal.cookiePolicy.manage.banner.text')}
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.cookiePolicy.manage.browser.title')}</h3>
          <p>
            {t('legal.cookiePolicy.manage.browser.text1')}
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>{t('legal.cookiePolicy.manage.browser.items.0')}</li>
            <li>{t('legal.cookiePolicy.manage.browser.items.1')}</li>
            <li>{t('legal.cookiePolicy.manage.browser.items.2')}</li>
            <li>{t('legal.cookiePolicy.manage.browser.items.3')}</li>
            <li>{t('legal.cookiePolicy.manage.browser.items.4')}</li>
          </ul>
          <p className="mt-2">
            {t('legal.cookiePolicy.manage.browser.text2')}
          </p>
          <p className="mt-2">
            {t('legal.cookiePolicy.manage.browser.text3')}
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li><a href={t('legal.cookiePolicy.manage.browser.links.0.href')} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">{t('legal.cookiePolicy.manage.browser.links.0.text')}</a></li>
            <li><a href={t('legal.cookiePolicy.manage.browser.links.1.href')} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">{t('legal.cookiePolicy.manage.browser.links.1.text')}</a></li>
            <li><a href={t('legal.cookiePolicy.manage.browser.links.2.href')} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">{t('legal.cookiePolicy.manage.browser.links.2.text')}</a></li>
            <li><a href={t('legal.cookiePolicy.manage.browser.links.3.href')} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">{t('legal.cookiePolicy.manage.browser.links.3.text')}</a></li>
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">{t('legal.cookiePolicy.manage.optOut.title')}</h3>
          <p>
            {t('legal.cookiePolicy.manage.optOut.text')}
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li><a href={t('legal.cookiePolicy.manage.optOut.links.0.href')} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">{t('legal.cookiePolicy.manage.optOut.links.0.text')}</a></li>
            <li><a href={t('legal.cookiePolicy.manage.optOut.links.1.href')} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">{t('legal.cookiePolicy.manage.optOut.links.1.text')}</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.cookiePolicy.localStorage.title')}</h2>
          <p>
            {t('legal.cookiePolicy.localStorage.intro')}
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>{t('legal.cookiePolicy.localStorage.items.0.strong')}</strong>{t('legal.cookiePolicy.localStorage.items.0.text')}</li>
            <li><strong>{t('legal.cookiePolicy.localStorage.items.1.strong')}</strong>{t('legal.cookiePolicy.localStorage.items.1.text')}</li>
            <li><strong>{t('legal.cookiePolicy.localStorage.items.2.strong')}</strong>{t('legal.cookiePolicy.localStorage.items.2.text')}</li>
          </ul>
          <p className="mt-2">
            {t('legal.cookiePolicy.localStorage.text2')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.cookiePolicy.consentRecords.title')}</h2>
          <p>
            {t('legal.cookiePolicy.consentRecords.intro')}
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>{t('legal.cookiePolicy.consentRecords.items.0')}</li>
            <li>{t('legal.cookiePolicy.consentRecords.items.1')}</li>
            <li>{t('legal.cookiePolicy.consentRecords.items.2')}</li>
            <li>{t('legal.cookiePolicy.consentRecords.items.3')}</li>
          </ul>
          <p className="mt-2">
            {t('legal.cookiePolicy.consentRecords.text2')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.cookiePolicy.changes.title')}</h2>
          <p>
            {t('legal.cookiePolicy.changes.text')}
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{t('legal.cookiePolicy.contact.title')}</h2>
          <p>{t('legal.cookiePolicy.contact.intro')}</p>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mt-2 text-sm">
            <p><strong>{t('legal.cookiePolicy.contact.name')}</strong></p>
            <p>{t('legal.cookiePolicy.contact.emailLabel')}<a href="mailto:hello@morpheusink.com" className="text-primary-600 dark:text-primary-400 underline">hello@morpheusink.com</a></p>
            <p>{t('legal.cookiePolicy.contact.address')}</p>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}

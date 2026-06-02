import LegalPageLayout from '@/components/Legal/LegalPageLayout';

export default function CookiePolicy() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="May 25, 2026">
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <p>
            This Cookie Policy explains how <strong>Giovanni de Caprio</strong> ("we", "us", "our"), operating the Morpheus Service, uses cookies and similar tracking technologies when you visit our website and use our services.
          </p>
          <p className="mt-2">
            This policy is designed to help you understand what cookies are, how we use them, and the choices you have regarding their use. We comply with the EU ePrivacy Directive (2002/58/EC as amended by 2009/136/EC) and the General Data Protection Regulation (GDPR).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the website owners. Cookies can be "session cookies" (which are deleted when you close your browser) or "persistent cookies" (which remain on your device for a set period or until you delete them).
          </p>
          <p className="mt-2">
            In addition to cookies, we may use other similar technologies such as local storage, session storage, and pixel tags to achieve similar purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. How We Use Cookies</h2>
          <p>We use cookies for the following purposes:</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">2.1 Essential Cookies</h3>
          <p>These cookies are strictly necessary for the Service to function and cannot be disabled. They include:</p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li><strong>Authentication cookies:</strong> Maintain your login session and keep you signed in.</li>
            <li><strong>Security cookies:</strong> Help detect and prevent security threats and abuse.</li>
            <li><strong>Session cookies:</strong> Enable core functionality such as navigation and access to secure areas.</li>
            <li><strong>Preference cookies:</strong> Remember your settings such as dark/light mode and language preferences.</li>
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">2.2 Analytics Cookies (Optional)</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We currently do not use analytics cookies, but we may implement them in the future (e.g., Google Analytics). You will be asked for explicit consent before any analytics cookies are placed.
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            If enabled, analytics cookies would collect information such as: pages visited, time spent on site, referral sources, and approximate geographic location (at city/country level). This data helps us improve the Service.
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">2.3 Marketing Cookies (Optional)</h3>
          <p>
            These cookies are used to track visitors across websites for the purpose of displaying relevant advertisements. We currently do not use marketing cookies and do not display third-party advertisements on our Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Cookies We Use</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">Name</th>
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">Provider</th>
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">Purpose</th>
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">Duration</th>
                  <th className="text-left py-2 pr-4 font-semibold text-gray-900 dark:text-white">Type</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 dark:text-gray-400">
                <tr className="border-b border-gray-100 dark:border-slate-800">
                  <td className="py-2 pr-4 font-mono text-xs">morpheus_cookie_consent</td>
                  <td className="py-2 pr-4">Morpheus</td>
                  <td className="py-2 pr-4">Stores your cookie consent preferences</td>
                  <td className="py-2 pr-4">12 months</td>
                  <td className="py-2 pr-4"><span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">Essential</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-800">
                  <td className="py-2 pr-4 font-mono text-xs">a_session_*</td>
                  <td className="py-2 pr-4">Appwrite</td>
                  <td className="py-2 pr-4">Authentication session management</td>
                  <td className="py-2 pr-4">Session</td>
                  <td className="py-2 pr-4"><span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">Essential</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-800">
                  <td className="py-2 pr-4 font-mono text-xs">theme</td>
                  <td className="py-2 pr-4">Morpheus</td>
                  <td className="py-2 pr-4">Stores dark/light mode preference</td>
                  <td className="py-2 pr-4">Persistent</td>
                  <td className="py-2 pr-4"><span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">Essential</span></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-slate-800 opacity-60">
                  <td className="py-2 pr-4 font-mono text-xs">_ga</td>
                  <td className="py-2 pr-4">Google Analytics</td>
                  <td className="py-2 pr-4">Distinguishes unique users (not currently active)</td>
                  <td className="py-2 pr-4">2 years</td>
                  <td className="py-2 pr-4"><span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">Analytics</span></td>
                </tr>
                <tr className="opacity-60">
                  <td className="py-2 pr-4 font-mono text-xs">_gid</td>
                  <td className="py-2 pr-4">Google Analytics</td>
                  <td className="py-2 pr-4">Distinguishes users per session (not currently active)</td>
                  <td className="py-2 pr-4">24 hours</td>
                  <td className="py-2 pr-4"><span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">Analytics</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Cookies marked as "not currently active" are listed for transparency but are not placed on your device unless you explicitly consent to analytics cookies in the future.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Third-Party Cookies</h2>
          <p>
            In addition to our own cookies, we may also use cookies from third-party service providers:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Appwrite:</strong> Our authentication and database provider may set session cookies to manage your login state.</li>
            <li><strong>LemonSqueezy:</strong> Our payment processor may set cookies during the checkout process to manage payment sessions and prevent fraud.</li>
            <li><strong>Google Analytics:</strong> May set cookies if you consent to analytics tracking in the future.</li>
          </ul>
          <p className="mt-2">
            These third parties have their own privacy and cookie policies. We encourage you to review them:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li><a href="https://appwrite.io/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">Appwrite Privacy Policy</a></li>
            <li><a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">LemonSqueezy Privacy Policy</a></li>
            <li><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">Google Cookie Policy</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. How to Manage Your Cookie Preferences</h2>
          <p>You have several options for managing cookies:</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">5.1 Our Cookie Banner</h3>
          <p>
            When you first visit our website, you will see a cookie banner that allows you to accept or reject non-essential cookies. You can also customize your preferences by category. You can update your preferences at any time by clicking the "Cookie Settings" link in the footer of our website.
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">5.2 Browser Settings</h3>
          <p>
            Most web browsers allow you to control cookies through their settings. You can typically:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li>View cookies that are stored on your device</li>
            <li>Delete all or specific cookies</li>
            <li>Block cookies from being placed</li>
            <li>Block third-party cookies</li>
            <li>Receive a notification before a cookie is placed</li>
          </ul>
          <p className="mt-2">
            Please note that disabling essential cookies may prevent you from using certain features of the Service, including signing in.
          </p>
          <p className="mt-2">
            Here are links to cookie management instructions for common browsers:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">Apple Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">Microsoft Edge</a></li>
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">5.3 Industry Opt-Out Tools</h3>
          <p>
            You can also opt out of interest-based advertising through industry self-regulatory programs:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li><a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">Digital Advertising Alliance (DAA)</a></li>
            <li><a href="https://youronlinechoices.eu" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">European Interactive Digital Advertising Alliance (EDAA)</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Local Storage and Similar Technologies</h2>
          <p>
            In addition to cookies, we use browser local storage and session storage to store certain data locally on your device:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Application state:</strong> We store UI preferences and temporary application data in local storage to improve performance.</li>
            <li><strong>Offline data:</strong> Your writing content is primarily stored in your browser's IndexedDB (via Dexie.js) for local-first functionality. This data remains on your device and is not transmitted to our servers except for backup and sync purposes.</li>
            <li><strong>Cache:</strong> We may cache certain resources to improve loading times.</li>
          </ul>
          <p className="mt-2">
            Unlike cookies, data stored in local storage and session storage is not automatically sent to the server with each request. It is only accessed by JavaScript running on our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Cookie Consent Records</h2>
          <p>
            In compliance with GDPR Article 7, we maintain records of your cookie consent, including:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>The date and time you provided consent</li>
            <li>The specific cookie categories you consented to</li>
            <li>The version of our cookie policy in effect at the time</li>
            <li>Your IP address (anonymized where possible)</li>
          </ul>
          <p className="mt-2">
            These records are stored securely and are used solely for the purpose of demonstrating compliance with applicable laws. They are retained for 12 months or until you update your preferences.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Changes to This Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. If we make material changes, we will notify you through our cookie banner or by posting a notice on the Service. The "Last updated" date at the top of this page indicates when the policy was last revised.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9. Contact Us</h2>
          <p>If you have any questions about our use of cookies or this Cookie Policy, please contact us:</p>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mt-2 text-sm">
            <p><strong>Giovanni de Caprio</strong></p>
            <p>Email: <a href="mailto:hello@morpheusink.com" className="text-primary-600 dark:text-primary-400 underline">hello@morpheusink.com</a></p>
            <p>Address: Via Gaspare Gozzi 113, 00145 Roma (RM), Italy</p>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}

import LegalPageLayout from '@/components/Legal/LegalPageLayout';

export default function TermsOfService() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="May 25, 2026">
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>IMPORTANT:</strong> These Terms of Service constitute a legally binding agreement between you and Giovanni de Caprio. By accessing or using Morpheus, you agree to be bound by these Terms. If you do not agree, you must not use the Service.
          </p>
          <p>
            These Terms of Service ("Terms") govern your access to and use of the Morpheus website, applications, and services (collectively, the "Service") operated by <strong>Giovanni de Caprio</strong>, a sole proprietorship (Ditta Individuale) registered in Italy, P.IVA 18340151002 ("we", "us", "our").
          </p>
          <p className="mt-2">
            By creating an account, accessing, or using the Service, you agree to these Terms. If you are using the Service on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Definitions</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>"Service"</strong> means the Morpheus website, web application, and all related services, features, and content.</li>
            <li><strong>"User"</strong> or <strong>"you"</strong> means any individual or entity that accesses or uses the Service.</li>
            <li><strong>"Content"</strong> means any text, data, information, or materials created, uploaded, or stored by you through the Service, including but not limited to books, chapters, characters, world-building notes, and chat messages.</li>
            <li><strong>"AI Features"</strong> means the artificial intelligence-powered writing assistance, chat, brainstorming, and text generation capabilities provided through the Service.</li>
            <li><strong>"Subscription"</strong> means a paid plan that provides access to premium features and services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Eligibility</h2>
          <p>You must be at least 16 years old to use the Service. By using the Service, you represent and warrant that:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>You are at least 16 years of age;</li>
            <li>You have the legal capacity to enter into a binding contract;</li>
            <li>You will comply with these Terms and all applicable laws and regulations;</li>
            <li>The information you provide to us is accurate, complete, and current.</li>
          </ul>
          <p className="mt-2">
            If you are between 16 and 18 years old, you confirm that you have obtained consent from a parent or legal guardian to use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Account Registration</h2>
          <p>To access most features of the Service, you must create an account. You agree to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Provide accurate and complete information during registration;</li>
            <li>Maintain the security of your account credentials;</li>
            <li>Notify us immediately of any unauthorized access or security breach;</li>
            <li>Accept responsibility for all activities that occur under your account.</li>
          </ul>
          <p className="mt-2">
            We reserve the right to suspend or terminate accounts that provide false information or violate these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Subscriptions and Payments</h2>
          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">4.1 Free Plan</h3>
          <p>We offer a free tier with limited features. The specific limitations are described on our Pricing page and may change from time to time.</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">4.2 Free Trial</h3>
          <p>We may offer a free trial period for paid subscriptions. At the end of the trial period, your subscription will automatically convert to a paid subscription unless you cancel before the trial ends. You must provide valid payment information to start a free trial.</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">4.3 Paid Subscriptions</h3>
          <p>Paid subscriptions are billed in advance on a recurring basis (monthly or annually, depending on your selected plan). All payments are processed through LemonSqueezy, our third-party payment processor. By subscribing, you authorize us to charge your selected payment method.</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">4.4 Price Changes</h3>
          <p>We may change subscription prices at any time. If we increase the price of your current plan, we will notify you at least 30 days before the change takes effect. Price changes will apply at the start of the next billing period after the notice period.</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">4.5 Taxes</h3>
          <p>All prices are inclusive of applicable VAT (IVA) for EU customers, as required by law. The VAT rate applied depends on your country of residence.</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">4.6 Cancellation</h3>
          <p>You may cancel your subscription at any time through your account settings or by contacting us. Cancellation takes effect at the end of the current billing period. You will continue to have access to paid features until the end of that period. No partial refunds will be provided for the remaining period except as required by law.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Use of AI Features</h2>
          <p>Morpheus provides AI-powered writing assistance through third-party language models. By using the AI Features, you acknowledge and agree that:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>AI-generated content is assistive, not authoritative:</strong> The AI generates suggestions, ideas, and draft text based on your prompts. You are solely responsible for reviewing, editing, and deciding whether to use any AI-generated content.</li>
            <li><strong>No guarantee of accuracy:</strong> AI outputs may contain errors, inconsistencies, or inappropriate content. We do not guarantee the accuracy, completeness, or suitability of AI-generated text for your specific purposes.</li>
            <li><strong>Originality not guaranteed:</strong> AI models may produce text that resembles existing published works. We do not guarantee that AI-generated content is free from similarity to third-party works. You are responsible for ensuring your final work does not infringe on others' intellectual property rights.</li>
            <li><strong>Data processing for AI inference:</strong> Your prompts and selected context are transmitted to OpenRouter and underlying AI model providers for processing. See our <a href="/privacy" className="text-primary-600 dark:text-primary-400 underline">Privacy Policy</a> for details on data practices.</li>
            <li><strong>Fair use:</strong> You must not use the AI Features to generate content that is illegal, harmful, discriminatory, sexually explicit involving minors, or designed to deceive or manipulate. We reserve the right to suspend accounts that misuse the AI Features.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Intellectual Property</h2>
          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">6.1 Your Content</h3>
          <p>You retain all ownership rights to the Content you create using the Service. We do not claim any ownership over your books, stories, characters, or other creative works.</p>
          <p className="mt-2">
            By using the Service, you grant us a limited, non-exclusive, royalty-free license to store, process, and transmit your Content solely for the purpose of providing the Service to you. This license terminates when you delete your Content or close your account.
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">6.2 Our Intellectual Property</h3>
          <p>The Service, including its design, code, logos, trademarks, and underlying software, is owned by us and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works from our intellectual property without our express written permission.</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">6.3 AI-Generated Content Rights</h3>
          <p>You are free to use, modify, publish, and distribute AI-generated suggestions that you incorporate into your own creative works, subject to your compliance with these Terms. However, we do not guarantee that you will obtain copyright protection for AI-generated portions of your work, as the legal status of AI-generated content varies by jurisdiction and is evolving.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Acceptable Use</h2>
          <p>You agree not to use the Service to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Violate any applicable law, regulation, or third-party right;</li>
            <li>Upload, store, or transmit any content that is illegal, harmful, threatening, abusive, harassing, defamatory, obscene, or otherwise objectionable;</li>
            <li>Impersonate any person or entity, or falsely state or misrepresent your affiliation with a person or entity;</li>
            <li>Attempt to gain unauthorized access to the Service, other users' accounts, or our systems;</li>
            <li>Interfere with or disrupt the Service or servers connected to the Service;</li>
            <li>Use automated systems (bots, scrapers) to access the Service without our permission;</li>
            <li>Circumvent any access restrictions, rate limits, or security measures;</li>
            <li>Resell, sublicense, or commercially exploit the Service without authorization;</li>
            <li>Use the Service to train, develop, or improve artificial intelligence models outside of the Service's intended functionality.</li>
          </ul>
          <p className="mt-2">
            We reserve the right to investigate and take appropriate action against any user who violates these rules, including removing content, suspending accounts, and reporting illegal activity to authorities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Termination</h2>
          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">8.1 By You</h3>
          <p>You may stop using the Service and delete your account at any time. Account deletion will permanently remove your Content from active systems within 30 days, subject to legal retention requirements for billing records.</p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">8.2 By Us</h3>
          <p>We may suspend or terminate your access to the Service at any time, with or without notice, if:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>You violate these Terms;</li>
            <li>Your use of the Service poses a security risk or legal liability;</li>
            <li>Your account has been inactive for an extended period (12 months or more);</li>
            <li>We discontinue the Service or a portion of it.</li>
          </ul>
          <p className="mt-2">
            Upon termination, your right to use the Service ceases immediately. Provisions that by their nature should survive termination will survive, including intellectual property rights, warranty disclaimers, and liability limitations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9. Data Processing Agreement (DPA)</h2>
          <p>
            Where you use the Service to process personal data on behalf of yourself or others, the following Data Processing Agreement applies and is incorporated into these Terms by reference:
          </p>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mt-3 text-sm space-y-3">
            <p><strong>9.1 Processing on Instructions:</strong> We will process personal data only on your documented instructions, including with regard to transfers of data to third countries, unless required to do so by EU or Member State law.</p>
            <p><strong>9.2 Confidentiality:</strong> We ensure that persons authorized to process personal data have committed themselves to confidentiality.</p>
            <p><strong>9.3 Security:</strong> We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, as described in our Privacy Policy.</p>
            <p><strong>9.4 Sub-processors:</strong> We engage sub-processors to provide the Service, as listed in our Privacy Policy. We maintain a current list of sub-processors and will notify you of any changes. You may object to new sub-processors by terminating your account.</p>
            <p><strong>9.5 Data Subject Rights:</strong> We will assist you in responding to requests from data subjects to exercise their rights under GDPR, to the extent technically feasible.</p>
            <p><strong>9.6 Breach Notification:</strong> We will notify you without undue delay upon becoming aware of any personal data breach affecting your data.</p>
            <p><strong>9.7 Data Return and Deletion:</strong> Upon termination of your account, we will delete or return all personal data to you, except where EU or Member State law requires storage.</p>
            <p><strong>9.8 Audit:</strong> We will make available to you all information necessary to demonstrate compliance with our obligations under GDPR Article 28, and allow for audits conducted by you or an auditor mandated by you, subject to reasonable notice and confidentiality obligations.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">10. Disclaimers and Limitation of Liability</h2>
          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">10.1 Service Provided "As Is"</h3>
          <p>
            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">10.2 No Guarantee of Availability</h3>
          <p>
            We do not guarantee that the Service will be uninterrupted, timely, secure, or error-free. We may perform maintenance, updates, or modifications that temporarily interrupt the Service.
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">10.3 No Backup Guarantee</h3>
          <p>
            While we make reasonable efforts to maintain data integrity, we do not guarantee that your Content will not be lost, corrupted, or accidentally deleted. You are responsible for maintaining backups of your important work.
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">10.4 Limitation of Liability</h3>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL GIOVANNI DE CAPRIO BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.
          </p>
          <p className="mt-2">
            Our total liability to you for all claims arising from or relating to these Terms or the Service shall not exceed the total amount you paid to us in the 12 months preceding the event giving rise to the liability, or €100, whichever is greater.
          </p>
          <p className="mt-2">
            Nothing in these Terms limits or excludes our liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be limited or excluded under applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">11. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Giovanni de Caprio from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with your access to or use of the Service, your Content, your violation of these Terms, or your violation of any third-party right.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">12. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of <strong>Italy</strong>, without regard to its conflict of law provisions.
          </p>
          <p className="mt-2">
            Any dispute arising from or relating to these Terms or the Service shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, the dispute shall be submitted to the exclusive jurisdiction of the courts of <strong>Rome, Italy</strong>.
          </p>
          <p className="mt-2">
            If you are a consumer resident in the European Union, you also have the right to access the European Online Dispute Resolution (ODR) platform at <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">ec.europa.eu/consumers/odr</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">13. Changes to These Terms</h2>
          <p>
            We may modify these Terms at any time. If we make material changes, we will notify you by email or by posting a notice on the Service at least 30 days before the changes take effect. Your continued use of the Service after the changes become effective constitutes your acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">14. Severability</h2>
          <p>
            If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be severed and the remaining provisions shall continue in full force and effect.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">15. Entire Agreement</h2>
          <p>
            These Terms, together with our <a href="/privacy" className="text-primary-600 dark:text-primary-400 underline">Privacy Policy</a> and <a href="/cookies" className="text-primary-600 dark:text-primary-400 underline">Cookie Policy</a>, constitute the entire agreement between you and us regarding the Service and supersede all prior agreements, understandings, and communications.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">16. Contact Information</h2>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg text-sm">
            <p><strong>Giovanni de Caprio</strong></p>
            <p>Ditta Individuale — P.IVA 18340151002</p>
            <p>Via Gaspare Gozzi 113, 00145 Roma (RM), Italy</p>
            <p>Email: <a href="mailto:giovannidecaprio04@pec.it" className="text-primary-600 dark:text-primary-400 underline">giovannidecaprio04@pec.it</a></p>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}

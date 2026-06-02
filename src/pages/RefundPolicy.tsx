import LegalPageLayout from '@/components/Legal/LegalPageLayout';

export default function RefundPolicy() {
  return (
    <LegalPageLayout title="Refund & Withdrawal Policy" lastUpdated="May 25, 2026">
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <p>
            This Refund and Withdrawal Policy applies to all paid subscriptions and services purchased through Morpheus by consumers (B2C) in the European Union and worldwide. It is designed to comply with the EU Consumer Rights Directive (2011/83/EU) and Italian consumer protection laws.
          </p>
          <p className="mt-2">
            By subscribing to a paid plan, you acknowledge that you have read, understood, and agree to this policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Free Plan</h2>
          <p>
            Morpheus offers a free tier with limited features at no cost. No payment information is required to use the free plan. You may use the free plan indefinitely subject to the limitations described on our Pricing page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Free Trial</h2>
          <p>
            We may offer a free trial period (typically 7 days) for our paid subscription plans. During the trial:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>You will have full access to the features of the selected plan.</li>
            <li>You must provide valid payment information to start the trial.</li>
            <li>At the end of the trial period, your subscription will automatically convert to a paid subscription unless you cancel at least 24 hours before the trial ends.</li>
            <li>You will not be charged if you cancel before the trial period ends.</li>
          </ul>
          <p className="mt-2">
            We will send you a reminder email before your trial converts to a paid subscription.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. EU 14-Day Right of Withdrawal</h2>
          <p>
            <strong>If you are a consumer resident in the European Union</strong>, you have a statutory right to withdraw from your subscription contract within 14 days from the date of contract conclusion, without giving any reason and without incurring any costs other than those provided for by law.
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">3.1 How the Withdrawal Right Works for Digital Services</h3>
          <p>
            The Service is a digital service that begins performance immediately upon subscription. Because digital content and services are consumed instantly and cannot be "returned" in the traditional sense, the EU Consumer Rights Directive provides specific rules:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>If you have <strong>not used the Service</strong> during the 14-day withdrawal period, you are entitled to a full refund.</li>
            <li>If you have <strong>used the Service</strong> (e.g., logged into the dashboard, created or edited content, used AI features, or otherwise accessed paid functionality), we may deduct a proportional amount from your refund to cover the value of the service consumed.</li>
            <li>However, you can <strong>waive your withdrawal right</strong> by expressly consenting to immediate performance when you subscribe. See Section 3.2 below.</li>
          </ul>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">3.2 Waiver of Withdrawal Right</h3>
          <p>
            During the checkout process, you will be required to check a box confirming the following:
          </p>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mt-2 text-sm border-l-4 border-primary-500">
            <p className="italic">
              "I expressly request immediate access to the Service and acknowledge that once I begin using the Service, I will lose my 14-day statutory right of withdrawal under EU consumer protection law. I understand that refunds will be provided only in the circumstances described in the Refund Policy."
            </p>
          </div>
          <p className="mt-2">
            By checking this box and completing your purchase, you explicitly consent to the immediate performance of the contract and acknowledge that your right of withdrawal will be lost once you begin using the Service. This is a standard and legally recognized practice for digital service subscriptions under EU law.
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">3.3 How to Exercise Your Withdrawal Right</h3>
          <p>To exercise your right of withdrawal, you must inform us of your decision by an unequivocal statement. You may use the model withdrawal form below or simply email us:</p>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mt-2 text-sm">
            <p>Email: <a href="mailto:hello@morpheusink.com" className="text-primary-600 dark:text-primary-400 underline">hello@morpheusink.com</a></p>
            <p>Include: Your name, email address, subscription date, and a clear statement that you wish to withdraw.</p>
          </div>
          <p className="mt-2">
            The withdrawal period expires 14 days after the day of contract conclusion. If you withdraw, we will reimburse all payments received from you without undue delay and in any event no later than 14 days from the day on which we are informed about your decision to withdraw.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Our Voluntary Refund Policy</h2>
          <p>
            Even where the statutory right of withdrawal does not apply, we offer the following voluntary refunds as a gesture of good faith:
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">4.1 Within 14 Days of First Payment (Minimal or No Usage)</h3>
          <p>
            If you request a refund within 14 days of your first paid subscription payment and you have made minimal or no use of the Service, we will issue a full refund. "Minimal use" means you have not significantly engaged with paid features (e.g., have not created or edited content in the app after subscribing). We verify this through our database records.
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">4.2 Technical Issues or Service Unavailability</h3>
          <p>
            If you experience significant technical issues that prevent you from using the Service for an extended period (more than 48 consecutive hours) due to problems on our end, you may request a prorated refund for the period of unusability. This does not apply to issues caused by your internet connection, device, or third-party services outside our control.
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">4.3 Duplicate or Erroneous Charges</h3>
          <p>
            If you were charged twice for the same subscription period or charged in error, we will refund the duplicate or erroneous charge in full upon verification.
          </p>

          <h3 className="font-semibold text-gray-900 dark:text-white mt-3 mb-2">4.4 No Refunds For</h3>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Subscriptions that have been actively used beyond minimal testing after the first 14 days.</li>
            <li>Partial months — we do not provide prorated refunds for unused days within a billing cycle (except as specified in Section 4.2).</li>
            <li>Changes of mind after significant usage of the Service.</li>
            <li>Failure to cancel before a renewal date — it is your responsibility to manage your subscription.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Cancellation Process</h2>
          <p>You may cancel your subscription at any time:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Through your account settings in the Morpheus app (when available).</li>
            <li>By emailing us at <a href="mailto:hello@morpheusink.com" className="text-primary-600 dark:text-primary-400 underline">hello@morpheusink.com</a> with your account email address.</li>
          </ul>
          <p className="mt-2">
            Cancellation takes effect at the end of your current billing period. You will continue to have access to paid features until that date. No partial refunds are provided for the remainder of the billing period except as specified above.
          </p>
          <p className="mt-2">
            <strong>Cancellation must be as easy as subscription.</strong> In compliance with EU consumer protection rules and the Digital Services Act, we will never make cancellation more difficult than signing up. There are no cancellation fees.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Refund Method and Timing</h2>
          <p>
            All refunds will be issued to the original payment method used for the purchase. Refunds typically appear within 5-10 business days, depending on your payment provider. We are not responsible for delays caused by banks or payment processors.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Model Withdrawal Form</h2>
          <p>
            In accordance with Annex I(B) of the EU Consumer Rights Directive, you may use the following form to exercise your right of withdrawal (copy and paste into an email):
          </p>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mt-2 text-sm font-mono whitespace-pre-wrap border border-gray-200 dark:border-slate-700">
{`To: Giovanni de Caprio
Email: hello@morpheusink.com
Address: Via Gaspare Gozzi 113, 00145 Roma (RM), Italy

I hereby give notice that I withdraw from my contract of sale / subscription for the provision of the following service:

Service: Morpheus [Plan Name] Subscription
Ordered on: [Date]
Account email: [Your email address]

Name of consumer: [Your full name]
Address of consumer: [Your address]

Date: [Date]

Signature: (only if this form is notified on paper)`}
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            You are not required to use this form. Any clear statement of your decision to withdraw sent to our email address is sufficient.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">8. Non-EU Customers</h2>
          <p>
            If you are not a consumer resident in the European Union, our voluntary refund policy (Section 4) applies. The statutory 14-day withdrawal right described in Section 3 is an EU consumer protection requirement and may not apply in your jurisdiction. However, we strive to treat all customers fairly regardless of location.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9. Contact Us</h2>
          <p>If you have any questions about refunds, withdrawals, or cancellations, please contact us:</p>
          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg mt-2 text-sm">
            <p><strong>Giovanni de Caprio</strong></p>
            <p>Email: <a href="mailto:hello@morpheusink.com" className="text-primary-600 dark:text-primary-400 underline">hello@morpheusink.com</a></p>
            <p>Address: Via Gaspare Gozzi 113, 00145 Roma (RM), Italy</p>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            We aim to respond to all refund requests within 2 business days.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}

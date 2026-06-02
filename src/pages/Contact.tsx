import { Mail, MessageSquare, Clock, MapPin } from 'lucide-react';
import LegalPageLayout from '@/components/Legal/LegalPageLayout';

export default function Contact() {
  return (
    <LegalPageLayout title="Contact Us" lastUpdated="June 2026">
      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <p className="text-lg leading-relaxed">
            Have a question, feedback, or need help with Morpheus? We are here for you.
            Reach out and we will get back to you as soon as possible.
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
                Email Us
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                hello@morpheusink.com
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Best for general inquiries and feedback
              </p>
            </div>
          </a>

          <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Response Time
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Within 24-48 hours
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Monday – Friday, CET timezone
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Support
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Billing & technical issues
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Include your account email for faster help
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Based In
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Rome, Italy
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Built with care for storytellers worldwide
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Before You Write
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Billing issues?</strong> Check our{' '}
              <a href="/refund" className="text-primary-600 dark:text-primary-400 underline">Refund Policy</a>{' '}
              and include your subscription email.
            </li>
            <li>
              <strong>Common questions?</strong> Browse our{' '}
              <a href="/faq" className="text-primary-600 dark:text-primary-400 underline">FAQ page</a>{' '}
              first — your answer might already be there.
            </li>
            <li>
              <strong>Bug report?</strong> Tell us what you were doing, what you expected, and what happened instead. Screenshots help!
            </li>
          </ul>
        </section>

        <section className="text-center pt-4">
          <a
            href="mailto:hello@morpheusink.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-primary-500/30"
          >
            <Mail className="w-4 h-4" />
            Send us an email
          </a>
        </section>
      </div>
    </LegalPageLayout>
  );
}

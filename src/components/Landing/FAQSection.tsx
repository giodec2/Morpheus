import { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { Link } from 'wouter';
import { useI18n } from '@/i18n/useI18n';

const faqDefs = [
  { key: 'q1' },
  { key: 'q2' },
  { key: 'q3' },
  { key: 'q4' },
  { key: 'q5' },
  { key: 'q6' },
  { key: 'q7' },
  { key: 'q8' },
];

function FAQItem({ faq }: { faq: typeof faqDefs[0] }) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border-b border-gray-200 dark:border-slate-800 transition-all duration-300 ${
        isOpen ? 'bg-gray-50/50 dark:bg-slate-800/30' : ''
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 py-5 px-4 md:px-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-sm md:text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {t(`landing.faq.${faq.key}.question` as never)}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-primary-500' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-4 md:px-6 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {t(`landing.faq.${faq.key}.answer` as never)}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { t } = useI18n();
  const { ref: titleRef, isInView: titleInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
  });

  return (
    <section id="faq" className="py-28 md:py-36 relative">
      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-slate-800 to-transparent" />

      <div className="max-w-3xl mx-auto px-6">
        {/* Section header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-900/30 mb-6">
            <HelpCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
            {t('landing.faq.titlePrefix')}{' '}
            <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
              {t('landing.faq.titleHighlight')}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t('landing.faq.intro')}
          </p>
        </div>

        {/* FAQ list */}
        <div className="rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
          {faqDefs.map((faq) => (
            <FAQItem key={faq.key} faq={faq} />
          ))}
        </div>

        {/* All questions link + Contact */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-primary-500/30"
          >
            {t('landing.faq.allQuestions')}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            {t('actions.contactSupport')}
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

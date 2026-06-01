import { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { Link } from 'wouter';

const faqs = [
  {
    question: 'Is my manuscript really private?',
    answer:
      'Absolutely. We use AI providers with strict zero data retention policies. Your prompts are never logged, never stored, and never used to train models. With our BYOK option, you can even use your own API key for complete control over where your data goes.',
  },
  {
    question: 'How is this different from ChatGPT or Claude?',
    answer:
      "General AI chatbots forget everything between sessions. Morpheus maintains a persistent lore bible — characters, locations, world rules, and plot details — so the AI remembers your world across every conversation. It is like having a co-writer who actually read your previous chapters.",
  },
  {
    question: 'Do I need to know how to code or use APIs?',
    answer:
      'Not at all. You can start writing immediately with our hosted AI option — no API key needed. The BYOK option is there for power users who want more control, but it is completely optional.',
  },
  {
    question: 'Can I export my work?',
    answer:
      'Yes — anytime, in any format. Export individual chapters, full books, character sheets, and lore bibles. Your work is always yours, and you can take it with you whenever you want.',
  },
  {
    question: 'What genres does Morpheus support?',
    answer:
      'Morpheus supports nine genre modes: General Fiction, Crime & Mystery, Romance, Thriller & Horror, Science Fiction, Fantasy, Literary Fiction, Historical Fiction, and Young Adult. Each mode adapts suggestions to match the tropes, pacing, and conventions of your chosen genre.',
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer:
      'Yes! Every paid plan includes a 7-day free trial with full access to all features. Cancel anytime before the trial ends and you will not be charged.',
  },
  {
    question: 'What happens if I hit my token limit?',
    answer:
      'Your token allowance resets weekly. If you hit the limit, you can still use Morpheus with your own API key (BYOK), or upgrade to a higher tier for more hosted tokens. We will notify you when you are approaching your limit.',
  },
  {
    question: 'Can I switch plans or cancel anytime?',
    answer:
      'Yes — upgrade, downgrade, or cancel whenever you want. No contracts, no cancellation fees. If you downgrade, your books and data stay safe; you will just need to stay within the new plan limits.',
  },
];

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
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
          {faq.question}
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
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
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
            Questions?{' '}
            <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
              Answered.
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            The essentials. For the full picture, see our complete FAQ.
          </p>
        </div>

        {/* FAQ list */}
        <div className="rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} faq={faq} />
          ))}
        </div>

        {/* All questions link + Contact */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-primary-500/30"
          >
            All Questions
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="mailto:giovannidecaprio04@pec.it"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            Contact Support
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

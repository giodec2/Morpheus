import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ChevronDown, ArrowLeft, HelpCircle, Lock, Brain, CreditCard, BookOpen, Globe } from 'lucide-react';
import LandingNavbar from '@/components/Landing/LandingNavbar';
import Footer from '@/components/Landing/Footer';
import { useInView } from '@/hooks/useInView';

interface FAQItemData {
  question: string;
  answer: React.ReactNode;
  category: string;
}

const faqs: FAQItemData[] = [
  // Account & Billing
  {
    category: 'Account & Billing',
    question: 'How do I cancel my subscription?',
    answer: (
      <>
        You can cancel your subscription at any time through your account settings in the Morpheus app, or by emailing us at{' '}
        <a href="mailto:giovannidecaprio04@pec.it" className="text-primary-600 dark:text-primary-400 underline">giovannidecaprio04@pec.it</a>. Cancellation takes effect at the end of your current billing period — you will keep access until then. There are no cancellation fees.
      </>
    ),
  },
  {
    category: 'Account & Billing',
    question: 'What is your refund policy?',
    answer: (
      <>
        EU consumers have a 14-day statutory right of withdrawal. If you have not used the service, you get a full refund. If you have used it, you can still request a refund within 14 days of your first payment if usage was minimal — we verify this through our database. See our full{' '}
        <Link href="/refund" className="text-primary-600 dark:text-primary-400 underline">Refund Policy</Link> for details.
      </>
    ),
  },
  {
    category: 'Account & Billing',
    question: 'Do you offer a free trial?',
    answer: "We offer a 7-day free trial for new subscribers on any paid plan. The trial gives you full access to all features. If you do not cancel before the trial ends, it automatically converts to a paid subscription. We will send you a reminder email before that happens.",
  },
  {
    category: 'Account & Billing',
    question: 'What payment methods do you accept?',
    answer: 'We process payments through LemonSqueezy, which accepts all major credit and debit cards (Visa, Mastercard, American Express) as well as PayPal in most regions.',
  },
  {
    category: 'Account & Billing',
    question: 'Can I change my plan?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time from your account settings. Upgrades take effect immediately. Downgrades take effect at the end of your current billing period.',
  },

  // Privacy & Data
  {
    category: 'Privacy & Data',
    question: 'Is my writing data private?',
    answer: 'Absolutely. Your books, chapters, characters, and all creative content belong to you and you alone. We do not read, analyze, or share your writing with anyone. Your content is stored securely and is only accessible to you through your authenticated account.',
  },
  {
    category: 'Privacy & Data',
    question: 'Do you train AI on my content?',
    answer: (
      <>
        <strong>No.</strong> We do not use your writing, prompts, or creative content to train, fine-tune, or improve any AI models. When you use the AI chat, your prompts are sent to third-party AI providers (via OpenRouter) solely to generate a response. We have verified that our providers do not retain your prompts for training purposes. See our{' '}
        <Link href="/privacy" className="text-primary-600 dark:text-primary-400 underline">Privacy Policy</Link> for full details.
      </>
    ),
  },
  {
    category: 'Privacy & Data',
    question: 'Can I export my data?',
    answer: 'Yes. Morpheus is built with a local-first architecture, meaning your data lives in your browser by default. You can export your books, chapters, and world-building data at any time from the settings panel. We support exports in common formats.',
  },
  {
    category: 'Privacy & Data',
    question: 'How do I delete my account and data?',
    answer: 'You can delete your account and all associated data from your account settings. Once confirmed, your content is permanently removed from our active systems within 30 days. Billing records are retained for 10 years as required by Italian tax law.',
  },
  {
    category: 'Privacy & Data',
    question: 'Where is my data stored?',
    answer: 'Your data is stored in two places: (1) locally in your browser using IndexedDB for instant access, and (2) in our cloud database (Appwrite Cloud, hosted in the EU) for backup and syncing across devices. You remain in control at all times.',
  },
  {
    category: 'Privacy & Data',
    question: 'Who has access to my data?',
    answer: 'Only you. Our team cannot access your creative content. In rare cases (e.g., investigating abuse or a technical issue), we may access minimal system logs, but never your actual writing or story content without your explicit consent.',
  },
  {
    category: 'Privacy & Data',
    question: 'Is Morpheus GDPR compliant?',
    answer: (
      <>
        Yes. We are fully committed to GDPR compliance. We are based in Italy (EU), process data lawfully, respect your rights, use EU-based infrastructure where possible, and have signed Data Processing Agreements with all our sub-processors. See our{' '}
        <Link href="/privacy" className="text-primary-600 dark:text-primary-400 underline">Privacy Policy</Link> for the full picture.
      </>
    ),
  },

  // AI & Technology
  {
    category: 'AI & Technology',
    question: 'What AI models does Morpheus use?',
    answer: 'Morpheus connects to multiple state-of-the-art language models through OpenRouter, including GPT models from OpenAI, Google (Gemini), and others. This gives you flexibility to choose the AI that best fits your writing style and needs.',
  },
  {
    category: 'AI & Technology',
    question: 'Can I use my own API key?',
    answer: 'Yes! Morpheus supports "Bring Your Own Key" (BYOK). If you have your own OpenRouter API key, you can connect it in settings and use the AI features without consuming your plan\'s token quota. This gives you maximum flexibility and control.',
  },
  {
    category: 'AI & Technology',
    question: 'Is my content used to train models?',
    answer: 'No. We have explicitly verified with our AI providers that API calls made through OpenRouter are not used to train or improve their models. Your creative work stays yours.',
  },
  {
    category: 'AI & Technology',
    question: 'What happens if the AI generates something inappropriate?',
    answer: 'AI language models can occasionally produce unexpected or inappropriate content. You are always in control — review everything the AI suggests before using it. If you encounter concerning outputs, please report them to us. We also encourage responsible use: do not use Morpheus to generate illegal, harmful, or hateful content.',
  },
  {
    category: 'AI & Technology',
    question: 'Does Morpheus work offline?',
    answer: 'Your writing data is stored locally in your browser, so you can read and edit your work even without an internet connection. However, AI features, syncing, and cloud backup require an internet connection.',
  },

  // Features & Usage
  {
    category: 'Features & Usage',
    question: 'How does the memory / world-building work?',
    answer: 'Morpheus maintains a "world bible" for each of your books. You can add characters, locations, lore, and rules. When you chat with the AI, it references this world bible so its suggestions stay consistent with your story\'s universe. The more detail you add, the better the AI understands your world.',
  },
  {
    category: 'Features & Usage',
    question: 'Can I use Morpheus for professional or commercial writing?',
    answer: 'Yes. You retain full ownership and rights to everything you create in Morpheus. Whether you are writing a novel to publish, a screenplay, or any other commercial work, your content is yours to use, sell, or license as you see fit.',
  },
  {
    category: 'Features & Usage',
    question: 'Is there a word limit?',
    answer: 'There is no hard word limit for your writing. Our plans differ in AI token usage (how much you can chat with the AI per week). Your actual written content in the editor is unlimited on all plans.',
  },
  {
    category: 'Features & Usage',
    question: 'Can I collaborate with other writers?',
    answer: 'Real-time collaboration is on our roadmap. For now, Morpheus is designed for individual writers. You can, however, export your work and share it with collaborators outside the platform.',
  },
  {
    category: 'Features & Usage',
    question: 'What file formats can I export to?',
    answer: 'You can export your books and chapters in multiple formats including DOCX, PDF, Markdown, and plain text — directly from the settings panel.',
  },

  // Compliance
  {
    category: 'Compliance',
    question: 'Where is Morpheus based?',
    answer: 'Morpheus is built and operated by Giovanni de Caprio, a sole proprietorship (Ditta Individuale) registered in Rome, Italy. We are an EU-based company, which means EU data protection laws apply by default.',
  },
  {
    category: 'Compliance',
    question: 'What happens to my data if Morpheus shuts down?',
    answer: 'If we ever need to discontinue the service, we will give you ample notice (at least 60 days) and provide a way to export all your data before any shutdown. Your local data in your browser remains accessible regardless.',
  },
];

const categories = ['All', 'Account & Billing', 'Privacy & Data', 'AI & Technology', 'Features & Usage', 'Compliance'];

const categoryIcons: Record<string, React.ReactNode> = {
  'Account & Billing': <CreditCard className="w-4 h-4" />,
  'Privacy & Data': <Lock className="w-4 h-4" />,
  'AI & Technology': <Brain className="w-4 h-4" />,
  'Features & Usage': <BookOpen className="w-4 h-4" />,
  'Compliance': <Globe className="w-4 h-4" />,
};

function AnimatedFAQItem({ faq, index, isOpen, onToggle }: {
  faq: FAQItemData;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (isInView && !entered) {
      const timer = setTimeout(() => setEntered(true), Math.min(index * 60, 400));
      return () => clearTimeout(timer);
    }
  }, [isInView, entered, index]);

  return (
    <div
      ref={ref}
      className={`border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden transition-all duration-500 hover:border-gray-300 dark:hover:border-slate-600 ${
        isInView && entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-4 md:p-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-primary-500' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 md:px-5 pb-4 md:pb-5 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-slate-800">
          <div className="pt-3 text-sm">{faq.answer}</div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: headerRef, isInView: headerInView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const { ref: ctaRef, isInView: ctaInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  const filteredFaqs = activeCategory === 'All'
    ? faqs
    : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <LandingNavbar />

      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          {/* Header */}
          <div
            ref={headerRef}
            className={`mb-10 transition-all duration-1000 ${
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Morpheus" className="w-6 h-6 object-contain" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">Morpheus</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Everything you need to know about Morpheus. Can not find what you are looking for?{' '}
              <a href="mailto:giovannidecaprio04@pec.it" className="text-primary-600 dark:text-primary-400 underline">Get in touch</a>.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat !== 'All' && categoryIcons[cat]}
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <AnimatedFAQItem
                key={`${faq.category}-${index}`}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>

          {/* Contact CTA */}
          <div
            ref={ctaRef}
            className={`mt-12 p-6 md:p-8 bg-gray-50 dark:bg-slate-800/50 rounded-2xl text-center border border-gray-100 dark:border-slate-800 transition-all duration-1000 ${
              ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <HelpCircle className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Still have questions?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              We are here to help. Send us an email and we will get back to you within 24 hours.
            </p>
            <a
              href="mailto:giovannidecaprio04@pec.it"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ChevronDown, ArrowLeft, HelpCircle, Lock, Brain, CreditCard, BookOpen, Globe } from 'lucide-react';
import LandingNavbar from '@/components/Landing/LandingNavbar';
import Footer from '@/components/Landing/Footer';
import { useInView } from '@/hooks/useInView';
import { useI18n } from '@/i18n/useI18n';
import { useSeo } from '@/lib/seo';
import { buildFullFaqJsonLd } from '@/lib/faqSchema';

const fullFaqJsonLd = buildFullFaqJsonLd();

interface FAQItemData {
  question: string;
  answer: React.ReactNode;
  category: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  accountBilling: <CreditCard className="w-4 h-4" />,
  privacyData: <Lock className="w-4 h-4" />,
  aiTechnology: <Brain className="w-4 h-4" />,
  featuresUsage: <BookOpen className="w-4 h-4" />,
  compliance: <Globe className="w-4 h-4" />,
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
  const { t } = useI18n();
  useSeo({
    path: '/faq',
    title: `${t('legal.faq.title')} — Morpheus`,
    description: t('legal.faq.intro'),
    jsonLd: fullFaqJsonLd,
  });
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: headerRef, isInView: headerInView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const { ref: ctaRef, isInView: ctaInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  const categories = ['all', 'accountBilling', 'privacyData', 'aiTechnology', 'featuresUsage', 'compliance'] as const;

  const faqs: FAQItemData[] = [
    {
      category: 'accountBilling',
      question: t('legal.faq.items.cancelSubscription.question'),
      answer: (
        <>
          {t('legal.faq.items.cancelSubscription.answerBeforeEmail')}
          <a href="mailto:giovannidecaprio04@pec.it" className="text-primary-600 dark:text-primary-400 underline">giovannidecaprio04@pec.it</a>
          {t('legal.faq.items.cancelSubscription.answerAfterEmail')}
        </>
      ),
    },
    {
      category: 'accountBilling',
      question: t('legal.faq.items.refundPolicy.question'),
      answer: (
        <>
          {t('legal.faq.items.refundPolicy.answerBeforeLink')}
          <Link href="/refund" className="text-primary-600 dark:text-primary-400 underline">{t('legal.faq.items.refundPolicy.answerLinkText')}</Link>
          {t('legal.faq.items.refundPolicy.answerAfterLink')}
        </>
      ),
    },
    {
      category: 'accountBilling',
      question: t('legal.faq.items.freeTrial.question'),
      answer: t('legal.faq.items.freeTrial.answer'),
    },
    {
      category: 'accountBilling',
      question: t('legal.faq.items.paymentMethods.question'),
      answer: t('legal.faq.items.paymentMethods.answer'),
    },
    {
      category: 'accountBilling',
      question: t('legal.faq.items.changePlan.question'),
      answer: t('legal.faq.items.changePlan.answer'),
    },
    {
      category: 'privacyData',
      question: t('legal.faq.items.writingPrivate.question'),
      answer: t('legal.faq.items.writingPrivate.answer'),
    },
    {
      category: 'privacyData',
      question: t('legal.faq.items.trainAI.question'),
      answer: (
        <>
          <strong>{t('legal.faq.items.trainAI.answerStrong')}</strong>
          {t('legal.faq.items.trainAI.answerBeforeLink')}
          <Link href="/privacy" className="text-primary-600 dark:text-primary-400 underline">{t('legal.faq.items.trainAI.answerLinkText')}</Link>
          {t('legal.faq.items.trainAI.answerAfterLink')}
        </>
      ),
    },
    {
      category: 'privacyData',
      question: t('legal.faq.items.exportData.question'),
      answer: t('legal.faq.items.exportData.answer'),
    },
    {
      category: 'privacyData',
      question: t('legal.faq.items.deleteAccount.question'),
      answer: t('legal.faq.items.deleteAccount.answer'),
    },
    {
      category: 'privacyData',
      question: t('legal.faq.items.whereStored.question'),
      answer: t('legal.faq.items.whereStored.answer'),
    },
    {
      category: 'privacyData',
      question: t('legal.faq.items.whoAccess.question'),
      answer: t('legal.faq.items.whoAccess.answer'),
    },
    {
      category: 'privacyData',
      question: t('legal.faq.items.gdpr.question'),
      answer: (
        <>
          {t('legal.faq.items.gdpr.answerBefore')}
          <Link href="/privacy" className="text-primary-600 dark:text-primary-400 underline">{t('legal.faq.items.gdpr.answerLinkText')}</Link>
          {t('legal.faq.items.gdpr.answerAfter')}
        </>
      ),
    },
    {
      category: 'aiTechnology',
      question: t('legal.faq.items.aiModels.question'),
      answer: t('legal.faq.items.aiModels.answer'),
    },
    {
      category: 'aiTechnology',
      question: t('legal.faq.items.ownApiKey.question'),
      answer: t('legal.faq.items.ownApiKey.answer'),
    },
    {
      category: 'aiTechnology',
      question: t('legal.faq.items.contentUsedTrain.question'),
      answer: t('legal.faq.items.contentUsedTrain.answer'),
    },
    {
      category: 'aiTechnology',
      question: t('legal.faq.items.inappropriateAI.question'),
      answer: t('legal.faq.items.inappropriateAI.answer'),
    },
    {
      category: 'aiTechnology',
      question: t('legal.faq.items.offline.question'),
      answer: t('legal.faq.items.offline.answer'),
    },
    {
      category: 'featuresUsage',
      question: t('legal.faq.items.memoryWorldBuilding.question'),
      answer: t('legal.faq.items.memoryWorldBuilding.answer'),
    },
    {
      category: 'featuresUsage',
      question: t('legal.faq.items.commercialUse.question'),
      answer: t('legal.faq.items.commercialUse.answer'),
    },
    {
      category: 'featuresUsage',
      question: t('legal.faq.items.wordLimit.question'),
      answer: t('legal.faq.items.wordLimit.answer'),
    },
    {
      category: 'featuresUsage',
      question: t('legal.faq.items.collaborate.question'),
      answer: t('legal.faq.items.collaborate.answer'),
    },
    {
      category: 'featuresUsage',
      question: t('legal.faq.items.exportFormats.question'),
      answer: t('legal.faq.items.exportFormats.answer'),
    },
    {
      category: 'compliance',
      question: t('legal.faq.items.basedWhere.question'),
      answer: t('legal.faq.items.basedWhere.answer'),
    },
    {
      category: 'compliance',
      question: t('legal.faq.items.shutdown.question'),
      answer: t('legal.faq.items.shutdown.answer'),
    },
  ];

  const filteredFaqs = activeCategory === 'all'
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
            {t('legal.backToHome')}
          </Link>

          {/* Header */}
          <div
            ref={headerRef}
            className={`mb-10 transition-all duration-1000 ${
              headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Morpheus" className="w-8 h-8 object-contain" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">Morpheus</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {t('legal.faq.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('legal.faq.intro')}{' '}
              <a href="mailto:giovannidecaprio04@pec.it" className="text-primary-600 dark:text-primary-400 underline">{t('legal.faq.getInTouch')}</a>.
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
                {cat !== 'all' && categoryIcons[cat]}
                {t(`legal.faq.categories.${cat}` as never)}
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
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{t('legal.faq.stillHaveQuestions')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {t('legal.faq.helpText')}
            </p>
            <a
              href="mailto:giovannidecaprio04@pec.it"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {t('legal.faq.contactSupport')}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

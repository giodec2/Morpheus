import { landing } from '@/i18n/landing';
import { legal } from '@/i18n/legal';

const SUPPORT_EMAIL = 'giovannidecaprio04@pec.it';

interface FaqJsonLd {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: { '@type': 'Answer'; text: string };
  }>;
}

function toJsonLd(items: Array<{ question: string; answer: string }>): FaqJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** The 8 FAQs shown in the landing page FAQ section (source: src/i18n/landing.ts). */
export function buildLandingFaqJsonLd(): FaqJsonLd {
  const faq = landing.en.landing.faq;
  const items = [faq.q1, faq.q2, faq.q3, faq.q4, faq.q5, faq.q6, faq.q7, faq.q8].map((q) => ({
    question: q.question,
    answer: q.answer,
  }));
  return toJsonLd(items);
}

/**
 * The full FAQ page entries (source: src/i18n/legal.ts). Composite answers
 * (text split around email/link elements) are flattened to plain text.
 */
export function buildFullFaqJsonLd(): FaqJsonLd {
  const items = Object.values(legal.en.legal.faq.items).map((item) => {
    const record = item as Record<string, string>;
    let answer: string;
    if (record.answer) {
      answer = record.answer;
    } else {
      answer = [
        record.answerStrong,
        record.answerBeforeEmail,
        record.answerBeforeEmail ? SUPPORT_EMAIL : undefined,
        record.answerBeforeLink,
        record.answerBefore,
        record.answerLinkText,
        record.answerAfterEmail,
        record.answerAfterLink,
        record.answerAfter,
      ]
        .filter(Boolean)
        .join('');
    }
    return { question: record.question, answer };
  });
  return toJsonLd(items);
}

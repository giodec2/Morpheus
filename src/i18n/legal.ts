export const legal = {
  en: {
    legal: {
      backToHome: 'Back to home',
      lastUpdated: 'Last updated: {{date}}',
      notFound: {
        title: '404',
        message: "This page doesn't exist. Maybe it wandered off into another chapter.",
        backHome: 'Back to Home',
      },
      contact: {
        title: 'Contact Us',
        lastUpdated: 'June 2026',
        intro: 'Have a question, feedback, or need help with Morpheus? We are here for you. Reach out and we will get back to you as soon as possible.',
        emailTitle: 'Email Us',
        emailAddress: 'hello@morpheusink.com',
        emailDesc: 'Best for general inquiries and feedback',
        responseTitle: 'Response Time',
        responseTime: 'Within 24-48 hours',
        supportDays: 'Monday – Friday, CET timezone',
        supportTitle: 'Support',
        supportDesc: 'Billing & technical issues',
        includeEmail: 'Include your account email for faster help',
        basedInTitle: 'Based In',
        basedInLocation: 'Rome, Italy',
        basedInDesc: 'Built with care for storytellers worldwide',
        beforeYouWrite: 'Before You Write',
        refundLink: 'Refund Policy',
        faqLink: 'FAQ page',
        billingIssue: 'Billing issues?',
        billingIssueText: 'Check our {{refundPolicy}} and include your subscription email.',
        commonQuestion: 'Common questions?',
        commonQuestionText: 'Browse our {{faqPage}} first — your answer might already be there.',
        bugReport: 'Bug report?',
        bugReportText: 'Tell us what you were doing, what you expected, and what happened instead. Screenshots help!',
        sendEmail: 'Send us an email',
      },
      faq: {
        title: 'Frequently Asked Questions',
        intro: "Everything you need to know about Morpheus. Can't find what you are looking for? Get in touch.",
        categories: {
          all: 'All',
          accountBilling: 'Account & Billing',
          privacyData: 'Privacy & Data',
          aiTechnology: 'AI & Technology',
          featuresUsage: 'Features & Usage',
          compliance: 'Compliance',
        },
        getInTouch: 'Get in touch',
        stillHaveQuestions: 'Still have questions?',
        helpText: 'We are here to help. Send us an email and we will get back to you within 24 hours.',
        contactSupport: 'Contact Support',
        items: {
          cancelSubscription: {
            question: 'How do I cancel my subscription?',
            answerBeforeEmail: 'You can cancel your subscription at any time through your account settings in the Morpheus app, or by emailing us at ',
            answerAfterEmail: '. Cancellation takes effect at the end of your current billing period — you will keep access until then. There are no cancellation fees.',
          },
          refundPolicy: {
            question: 'What is your refund policy?',
            answerBeforeLink: 'EU consumers have a 14-day statutory right of withdrawal. If you have not used the service, you get a full refund. If you have used it, you can still request a refund within 14 days of your first payment if usage was minimal — we verify this through our database. See our full ',
            answerLinkText: 'Refund Policy',
            answerAfterLink: ' for details.',
          },
          freeTrial: {
            question: 'Do you offer a free trial?',
            answer: "We offer a 7-day free trial for new subscribers on any paid plan. The trial gives you full access to all features. If you do not cancel before the trial ends, it automatically converts to a paid subscription. We will send you a reminder email before that happens.",
          },
          paymentMethods: {
            question: 'What payment methods do you accept?',
            answer: 'We process payments through LemonSqueezy, which accepts all major credit and debit cards (Visa, Mastercard, American Express) as well as PayPal in most regions.',
          },
          changePlan: {
            question: 'Can I change my plan?',
            answer: 'Yes, you can upgrade or downgrade your plan at any time from your account settings. Upgrades take effect immediately. Downgrades take effect at the end of your current billing period.',
          },
          writingPrivate: {
            question: 'Is my writing data private?',
            answer: 'Absolutely. Your books, chapters, characters, and all creative content belong to you and you alone. We do not read, analyze, or share your writing with anyone. Your content is stored securely and is only accessible to you through your authenticated account.',
          },
          trainAI: {
            question: 'Do you train AI on my content?',
            answerStrong: 'No.',
            answerBeforeLink: ' We do not use your writing, prompts, or creative content to train, fine-tune, or improve any AI models. When you use the AI chat, your prompts are sent to third-party AI providers (via OpenRouter) solely to generate a response. We have verified that our providers do not retain your prompts for training purposes. See our ',
            answerLinkText: 'Privacy Policy',
            answerAfterLink: ' for full details.',
          },
          exportData: {
            question: 'Can I export my data?',
            answer: 'Yes. Morpheus is built with a local-first architecture, meaning your data lives in your browser by default. You can export your books, chapters, and world-building data at any time from the settings panel. We support exports in common formats.',
          },
          deleteAccount: {
            question: 'How do I delete my account and data?',
            answer: 'You can delete your account and all associated data from your account settings. Once confirmed, your content is permanently removed from our active systems within 30 days. Billing records are retained for 10 years as required by Italian tax law.',
          },
          whereStored: {
            question: 'Where is my data stored?',
            answer: 'Your data is stored in two places: (1) locally in your browser using IndexedDB for instant access, and (2) in our cloud database (Appwrite Cloud, hosted in the EU) for backup and syncing across devices. You remain in control at all times.',
          },
          whoAccess: {
            question: 'Who has access to my data?',
            answer: 'Only you. Our team cannot access your creative content. In rare cases (e.g., investigating abuse or a technical issue), we may access minimal system logs, but never your actual writing or story content without your explicit consent.',
          },
          gdpr: {
            question: 'Is Morpheus GDPR compliant?',
            answerBefore: 'Yes. We are fully committed to GDPR compliance. We are based in Italy (EU), process data lawfully, respect your rights, use EU-based infrastructure where possible, and have signed Data Processing Agreements with all our sub-processors. See our ',
            answerLinkText: 'Privacy Policy',
            answerAfter: ' for the full picture.',
          },
          aiModels: {
            question: 'What AI models does Morpheus use?',
            answer: 'Morpheus connects to multiple state-of-the-art language models through OpenRouter, including GPT models from OpenAI, Google (Gemini), and others. This gives you flexibility to choose the AI that best fits your writing style and needs.',
          },
          ownApiKey: {
            question: 'Can I use my own API key?',
            answer: 'Yes! Morpheus supports "Bring Your Own Key" (BYOK). If you have your own OpenRouter API key, you can connect it in settings and use the AI features without consuming your plan\'s token quota. This gives you maximum flexibility and control.',
          },
          contentUsedTrain: {
            question: 'Is my content used to train models?',
            answer: 'No. We have explicitly verified with our AI providers that API calls made through OpenRouter are not used to train or improve their models. Your creative work stays yours.',
          },
          inappropriateAI: {
            question: 'What happens if the AI generates something inappropriate?',
            answer: 'AI language models can occasionally produce unexpected or inappropriate content. You are always in control — review everything the AI suggests before using it. If you encounter concerning outputs, please report them to us. We also encourage responsible use: do not use Morpheus to generate illegal, harmful, or hateful content.',
          },
          offline: {
            question: 'Does Morpheus work offline?',
            answer: 'Your writing data is stored locally in your browser, so you can read and edit your work even without an internet connection. However, AI features, syncing, and cloud backup require an internet connection.',
          },
          memoryWorldBuilding: {
            question: 'How does the memory / world-building work?',
            answer: 'Morpheus maintains a "world bible" for each of your books. You can add characters, locations, lore, and rules. When you chat with the AI, it references this world bible so its suggestions stay consistent with your story\'s universe. The more detail you add, the better the AI understands your world.',
          },
          commercialUse: {
            question: 'Can I use Morpheus for professional or commercial writing?',
            answer: 'Yes. You retain full ownership and rights to everything you create in Morpheus. Whether you are writing a novel to publish, a screenplay, or any other commercial work, your content is yours to use, sell, or license as you see fit.',
          },
          wordLimit: {
            question: 'Is there a word limit?',
            answer: 'There is no hard word limit for your writing. Our plans differ in AI token usage (how much you can chat with the AI per week). Your actual written content in the editor is unlimited on all plans.',
          },
          collaborate: {
            question: 'Can I collaborate with other writers?',
            answer: 'Real-time collaboration is on our roadmap. For now, Morpheus is designed for individual writers. You can, however, export your work and share it with collaborators outside the platform.',
          },
          exportFormats: {
            question: 'What file formats can I export to?',
            answer: 'You can export your books and chapters in multiple formats including DOCX, PDF, Markdown, and plain text — directly from the settings panel.',
          },
          basedWhere: {
            question: 'Where is Morpheus based?',
            answer: 'Morpheus is built and operated by Giovanni de Caprio, a sole proprietorship (Ditta Individuale) registered in Rome, Italy. We are an EU-based company, which means EU data protection laws apply by default.',
          },
          shutdown: {
            question: 'What happens to my data if Morpheus shuts down?',
            answer: 'If we ever need to discontinue the service, we will give you ample notice (at least 60 days) and provide a way to export all your data before any shutdown. Your local data in your browser remains accessible regardless.',
          },
        },
      },
      privacyPolicy: {
        title: 'Privacy Policy',
        lastUpdated: 'May 25, 2026',
        notice: 'IMPORTANT: This Privacy Policy is provided for informational purposes. It reflects our commitment to data protection under the EU General Data Protection Regulation (GDPR) and Italian privacy laws. For legal advice specific to your situation, please consult a qualified privacy professional.',
        intro1: 'This Privacy Policy describes how ',
        intro1Strong: 'Giovanni de Caprio',
        intro2: ' ("we", "us", "our"), operating as a sole proprietorship (Ditta Individuale) under Italian law, collects, uses, stores, and protects your personal data when you use the Morpheus website and services (collectively, the "Service").',
        intro3: 'We are committed to protecting your privacy and ensuring that your personal data is handled in a safe and responsible manner, in compliance with the EU General Data Protection Regulation (Regulation EU 2016/679 — "GDPR") and the Italian Legislative Decree no. 196/2003 as amended by Legislative Decree no. 101/2018 ("Privacy Code").',
        controller: {
          title: '1. Data Controller',
          text: 'The Data Controller responsible for your personal data is:',
          name: 'Giovanni de Caprio',
          businessType: 'Ditta Individuale',
          address1: 'Via Gaspare Gozzi 113',
          address2: '00145 Roma (RM), Italy',
          cf: 'C.F.: DCPGNN04P28H501W',
          vat: 'P.IVA: 18340151002',
          emailLabel: 'Email: ',
          dpo: 'You can contact us regarding data protection matters at the email address above. We have not appointed a Data Protection Officer (DPO) as we do not meet the thresholds requiring one under Article 37 GDPR.',
        },
        dataCollected: {
          title: '2. What Data We Collect',
          intro: 'We collect and process the following categories of personal data:',
          accountInfo: {
            title: '2.1 Account Information',
            items: [
              'Email address',
              'Name (if provided)',
              'Account credentials (passwords are hashed and never stored in plain text)',
              'User ID generated by our authentication system',
            ],
          },
          content: {
            title: '2.2 Content You Create',
            items: [
              'Books, chapters, and story content',
              'Character profiles and world-building notes',
              'Chat messages and prompts sent to the AI assistant',
              'Lore bible entries and other creative materials',
            ],
            note: 'Important: Your creative content belongs to you. We do not use your writing to train AI models. See Section 9 for details on our AI data practices.',
          },
          technical: {
            title: '2.3 Usage and Technical Data',
            items: [
              'IP address (logged for security purposes)',
              'Browser type and version',
              'Device information',
              'Session tokens and authentication logs',
              'Error logs and diagnostic information',
            ],
          },
          payment: {
            title: '2.4 Payment Information',
            items: [
              'We do not store credit card details. Payment processing is handled by LemonSqueezy, our payment processor.',
              'We receive transaction IDs, subscription status, and billing history from LemonSqueezy.',
            ],
          },
        },
        legalBasis: {
          title: '3. Legal Basis for Processing',
          intro: 'Under GDPR Article 6, we process your personal data based on the following legal grounds:',
          headers: {
            activity: 'Processing Activity',
            basis: 'Legal Basis',
          },
          rows: [
            { activity: 'Account registration and authentication', basis: 'Contract (Art. 6(1)(b))' },
            { activity: 'Providing the writing and AI assistance service', basis: 'Contract (Art. 6(1)(b))' },
            { activity: 'Payment processing and billing', basis: 'Contract (Art. 6(1)(b))' },
            { activity: 'Security, fraud prevention, and error debugging', basis: 'Legitimate interest (Art. 6(1)(f))' },
            { activity: 'Analytics and service improvement', basis: 'Consent (Art. 6(1)(a))' },
            { activity: 'Marketing communications', basis: 'Consent (Art. 6(1)(a))' },
            { activity: 'Legal compliance and tax obligations', basis: 'Legal obligation (Art. 6(1)(c))' },
          ],
        },
        howWeUse: {
          title: '4. How We Use Your Data',
          intro: 'We use your personal data for the following purposes:',
          items: [
            { strong: 'To provide the Service:', text: ' Authenticate you, store your content, and enable AI-powered writing assistance.' },
            { strong: 'To process payments:', text: ' Manage subscriptions and billing through our payment processor.' },
            { strong: 'To ensure security:', text: ' Protect against unauthorized access, fraud, and abuse.' },
            { strong: 'To improve the Service:', text: ' Analyze usage patterns (only with your consent) to enhance features and fix bugs.' },
            { strong: 'To communicate with you:', text: ' Send service-related notifications, respond to support requests, and (with consent) marketing emails.' },
            { strong: 'To comply with legal obligations:', text: ' Meet tax, accounting, and regulatory requirements under Italian and EU law.' },
          ],
        },
        retention: {
          title: '5. Data Retention',
          intro: 'We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected:',
          items: [
            { strong: 'Account and content data:', text: ' Retained until you delete your account or request data deletion. After account deletion, content is permanently removed from active systems within 30 days.' },
            { strong: 'Authentication logs:', text: ' Retained for 90 days for security purposes.' },
            { strong: 'Error logs:', text: ' Retained for 30 days.' },
            { strong: 'Payment and billing records:', text: ' Retained for 10 years as required by Italian tax law (DPR 600/1973 and subsequent amendments).' },
            { strong: 'Cookie consent records:', text: ' Retained for 12 months or until you update your preferences.' },
          ],
        },
        sharing: {
          title: '6. Data Sharing and Sub-processors',
          intro: 'We do not sell your personal data. We share data only with trusted third-party service providers (sub-processors) who help us operate the Service:',
          headers: {
            processor: 'Sub-processor',
            purpose: 'Purpose',
            location: 'Location',
          },
          rows: [
            { processor: 'Appwrite Cloud', purpose: 'Database, authentication, file storage', location: 'EU / Germany (FRA1)' },
            { processor: 'OpenRouter', purpose: 'AI model inference and LLM API routing', location: 'United States' },
            { processor: 'LemonSqueezy', purpose: 'Payment processing and subscription management', location: 'United States' },
            { processor: 'Google Analytics', purpose: 'Website usage analytics (only with consent)', location: 'United States' },
          ],
          note1: 'For transfers to non-EU countries (United States), we rely on Standard Contractual Clauses (SCCs) approved by the European Commission under GDPR Article 46(2)(c) to ensure an adequate level of data protection.',
          note2: 'We have signed Data Processing Agreements (DPAs) with all sub-processors that handle personal data on our behalf, as required by GDPR Article 28.',
        },
        rights: {
          title: '7. Your Rights Under GDPR',
          intro: 'As a data subject under GDPR, you have the following rights:',
          items: [
            { strong: 'Right of access (Art. 15):', text: ' You can request a copy of all personal data we hold about you.' },
            { strong: 'Right to rectification (Art. 16):', text: ' You can request correction of inaccurate or incomplete data.' },
            { strong: 'Right to erasure / "Right to be forgotten" (Art. 17):', text: ' You can request deletion of your personal data, subject to legal retention obligations.' },
            { strong: 'Right to restrict processing (Art. 18):', text: ' You can request that we limit how we use your data in certain circumstances.' },
            { strong: 'Right to data portability (Art. 20):', text: ' You can request your data in a structured, machine-readable format and transfer it to another service.' },
            { strong: 'Right to object (Art. 21):', text: ' You can object to processing based on legitimate interests or for direct marketing purposes.' },
            { strong: 'Right to withdraw consent (Art. 7(3)):', text: ' Where we rely on consent, you can withdraw it at any time without affecting the lawfulness of processing before withdrawal.' },
            { strong: 'Right to lodge a complaint (Art. 77):', text: ' You have the right to complain to the Italian Data Protection Authority (Garante per la Protezione dei Dati Personali) or your local supervisory authority.' },
          ],
          contact: 'To exercise any of these rights, please contact us at ',
          response: 'We will respond within 30 days of receiving your request. We may need to verify your identity before processing your request.',
        },
        cookies: {
          title: '8. Cookies and Similar Technologies',
          text1: 'We use cookies and similar technologies to provide and secure our Service. For detailed information about the cookies we use, their purposes, and how to manage your preferences, please see our ',
          linkText: 'Cookie Policy',
          text2: '.',
          text3: 'By using our Service, you consent to the use of essential cookies. For analytics and marketing cookies, we will request your explicit consent through our cookie banner before placing them.',
        },
        aiPractices: {
          title: '9. AI Data Practices',
          intro: 'Given that Morpheus is an AI-powered writing assistant, we want to be transparent about how your data interacts with AI systems:',
          items: [
            { strong: 'Your content is yours:', text: ' We do not use your books, chapters, characters, or creative writing to train, fine-tune, or improve any AI models.' },
            { strong: 'Prompts are processed by third-party AI providers:', text: ' When you use the AI chat feature, your prompts and context are sent to OpenRouter, which routes them to underlying language models (e.g., OpenAI, Anthropic, Google). We have verified that our primary AI providers have zero data retention policies for API calls, meaning your prompts are not stored or used for model training.' },
            { strong: 'No automated decision-making:', text: ' Morpheus does not make decisions about you that produce legal or similarly significant effects (GDPR Article 22).' },
            { strong: 'EU AI Act:', text: ' Morpheus qualifies as a "limited risk" AI system under the EU AI Act. We provide transparency about AI-generated outputs and do not deceive users about the artificial nature of the content.' },
          ],
        },
        security: {
          title: '10. Data Security',
          intro: 'We implement appropriate technical and organizational measures to protect your personal data:',
          items: [
            'Encryption of data in transit using TLS 1.2+ (HTTPS)',
            'Encryption of data at rest where supported by our infrastructure providers',
            'Secure authentication using industry-standard hashing algorithms (bcrypt)',
            'Role-based access controls and minimal data access principles',
            'Regular security reviews and dependency updates',
          ],
          breach: 'In the event of a personal data breach, we will notify the Italian Data Protection Authority (Garante) within 72 hours of becoming aware of the breach, where required by GDPR Article 33. If the breach is likely to result in a high risk to your rights and freedoms, we will also notify affected users without undue delay (GDPR Article 34).',
        },
        children: {
          title: "11. Children's Privacy",
          text: 'The Service is not intended for children under 16 years of age. We do not knowingly collect personal data from children under 16. If we become aware that we have collected personal data from a child under 16 without verification of parental consent, we will take steps to delete that information. If you believe we might have information from or about a child under 16, please contact us.',
        },
        changes: {
          title: '12. Changes to This Privacy Policy',
          text: 'We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or Service features. We will notify you of any material changes by posting the updated policy on this page with a revised "Last updated" date. We encourage you to review this Privacy Policy periodically.',
        },
        contact: {
          title: '13. Contact Us',
          intro: 'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:',
          name: 'Giovanni de Caprio',
          emailLabel: 'Email: ',
          addressLabel: 'Address: ',
          address: 'Via Gaspare Gozzi 113, 00145 Roma (RM), Italy',
          dpaRight: 'You also have the right to lodge a complaint with the Italian Data Protection Authority:',
          dpaLink: 'www.garanteprivacy.it',
        },
      },
      termsOfService: {
        title: 'Terms of Service',
        lastUpdated: 'May 25, 2026',
        notice: 'IMPORTANT: These Terms of Service constitute a legally binding agreement between you and Giovanni de Caprio. By accessing or using Morpheus, you agree to be bound by these Terms. If you do not agree, you must not use the Service.',
        intro1: 'These Terms of Service ("Terms") govern your access to and use of the Morpheus website, applications, and services (collectively, the "Service") operated by ',
        intro1Strong: 'Giovanni de Caprio',
        intro2: ', a sole proprietorship (Ditta Individuale) registered in Italy, P.IVA 18340151002 ("we", "us", "our").',
        intro3: 'By creating an account, accessing, or using the Service, you agree to these Terms. If you are using the Service on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.',
        definitions: {
          title: '1. Definitions',
          items: [
            { term: '"Service"', text: ' means the Morpheus website, web application, and all related services, features, and content.' },
            { term: '"User"', text: ' or ',
            term2: '"you"', text2: ' means any individual or entity that accesses or uses the Service.' },
            { term: '"Content"', text: ' means any text, data, information, or materials created, uploaded, or stored by you through the Service, including but not limited to books, chapters, characters, world-building notes, and chat messages.' },
            { term: '"AI Features"', text: ' means the artificial intelligence-powered writing assistance, chat, brainstorming, and text generation capabilities provided through the Service.' },
            { term: '"Subscription"', text: ' means a paid plan that provides access to premium features and services.' },
          ],
        },
        eligibility: {
          title: '2. Eligibility',
          intro: 'You must be at least 16 years old to use the Service. By using the Service, you represent and warrant that:',
          items: [
            'You are at least 16 years of age;',
            'You have the legal capacity to enter into a binding contract;',
            'You will comply with these Terms and all applicable laws and regulations;',
            'The information you provide to us is accurate, complete, and current.',
          ],
          minor: 'If you are between 16 and 18 years old, you confirm that you have obtained consent from a parent or legal guardian to use the Service.',
        },
        account: {
          title: '3. Account Registration',
          intro: 'To access most features of the Service, you must create an account. You agree to:',
          items: [
            'Provide accurate and complete information during registration;',
            'Maintain the security of your account credentials;',
            'Notify us immediately of any unauthorized access or security breach;',
            'Accept responsibility for all activities that occur under your account.',
          ],
          suspension: 'We reserve the right to suspend or terminate accounts that provide false information or violate these Terms.',
        },
        subscriptions: {
          title: '4. Subscriptions and Payments',
          freePlan: {
            title: '4.1 Free Plan',
            text: 'We offer a free tier with limited features. The specific limitations are described on our Pricing page and may change from time to time.',
          },
          freeTrial: {
            title: '4.2 Free Trial',
            text: 'We may offer a free trial period for paid subscriptions. At the end of the trial period, your subscription will automatically convert to a paid subscription unless you cancel before the trial ends. You must provide valid payment information to start a free trial.',
          },
          paid: {
            title: '4.3 Paid Subscriptions',
            text: 'Paid subscriptions are billed in advance on a recurring basis (monthly or annually, depending on your selected plan). All payments are processed through LemonSqueezy, our third-party payment processor. By subscribing, you authorize us to charge your selected payment method.',
          },
          priceChanges: {
            title: '4.4 Price Changes',
            text: 'We may change subscription prices at any time. If we increase the price of your current plan, we will notify you at least 30 days before the change takes effect. Price changes will apply at the start of the next billing period after the notice period.',
          },
          taxes: {
            title: '4.5 Taxes',
            text: 'All prices are inclusive of applicable VAT (IVA) for EU customers, as required by law. The VAT rate applied depends on your country of residence.',
          },
          cancellation: {
            title: '4.6 Cancellation',
            text: 'You may cancel your subscription at any time through your account settings or by contacting us. Cancellation takes effect at the end of the current billing period. You will continue to have access to paid features until the end of that period. No partial refunds will be provided for the remaining period except as required by law.',
          },
        },
        aiFeatures: {
          title: '5. Use of AI Features',
          intro: 'Morpheus provides AI-powered writing assistance through third-party language models. By using the AI Features, you acknowledge and agree that:',
          items: [
            { strong: 'AI-generated content is assistive, not authoritative:', text: ' The AI generates suggestions, ideas, and draft text based on your prompts. You are solely responsible for reviewing, editing, and deciding whether to use any AI-generated content.' },
            { strong: 'No guarantee of accuracy:', text: ' AI outputs may contain errors, inconsistencies, or inappropriate content. We do not guarantee the accuracy, completeness, or suitability of AI-generated text for your specific purposes.' },
            { strong: 'Originality not guaranteed:', text: " AI models may produce text that resembles existing published works. We do not guarantee that AI-generated content is free from similarity to third-party works. You are responsible for ensuring your final work does not infringe on others' intellectual property rights." },
            { strong: 'Data processing for AI inference:', text: ' Your prompts and selected context are transmitted to OpenRouter and underlying AI model providers for processing. See our ',
            linkText: 'Privacy Policy', text2: ' for details on data practices.' },
            { strong: 'Fair use:', text: ' You must not use the AI Features to generate content that is illegal, harmful, discriminatory, sexually explicit involving minors, or designed to deceive or manipulate. We reserve the right to suspend accounts that misuse the AI Features.' },
          ],
        },
        ip: {
          title: '6. Intellectual Property',
          yourContent: {
            title: '6.1 Your Content',
            text1: 'You retain all ownership rights to the Content you create using the Service. We do not claim any ownership over your books, stories, characters, or other creative works.',
            text2: 'By using the Service, you grant us a limited, non-exclusive, royalty-free license to store, process, and transmit your Content solely for the purpose of providing the Service to you. This license terminates when you delete your Content or close your account.',
          },
          ourIp: {
            title: '6.2 Our Intellectual Property',
            text: 'The Service, including its design, code, logos, trademarks, and underlying software, is owned by us and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works from our intellectual property without our express written permission.',
          },
          aiRights: {
            title: '6.3 AI-Generated Content Rights',
            text: 'You are free to use, modify, publish, and distribute AI-generated suggestions that you incorporate into your own creative works, subject to your compliance with these Terms. However, we do not guarantee that you will obtain copyright protection for AI-generated portions of your work, as the legal status of AI-generated content varies by jurisdiction and is evolving.',
          },
        },
        acceptableUse: {
          title: '7. Acceptable Use',
          intro: 'You agree not to use the Service to:',
          items: [
            'Violate any applicable law, regulation, or third-party right;',
            'Upload, store, or transmit any content that is illegal, harmful, threatening, abusive, harassing, defamatory, obscene, or otherwise objectionable;',
            'Impersonate any person or entity, or falsely state or misrepresent your affiliation with a person or entity;',
            'Attempt to gain unauthorized access to the Service, other users\' accounts, or our systems;',
            'Interfere with or disrupt the Service or servers connected to the Service;',
            'Use automated systems (bots, scrapers) to access the Service without our permission;',
            'Circumvent any access restrictions, rate limits, or security measures;',
            'Resell, sublicense, or commercially exploit the Service without authorization;',
            'Use the Service to train, develop, or improve artificial intelligence models outside of the Service\'s intended functionality.',
          ],
          action: 'We reserve the right to investigate and take appropriate action against any user who violates these rules, including removing content, suspending accounts, and reporting illegal activity to authorities.',
        },
        termination: {
          title: '8. Termination',
          byYou: {
            title: '8.1 By You',
            text: 'You may stop using the Service and delete your account at any time. Account deletion will permanently remove your Content from active systems within 30 days, subject to legal retention requirements for billing records.',
          },
          byUs: {
            title: '8.2 By Us',
            intro: 'We may suspend or terminate your access to the Service at any time, with or without notice, if:',
            items: [
              'You violate these Terms;',
              'Your use of the Service poses a security risk or legal liability;',
              'Your account has been inactive for an extended period (12 months or more);',
              'We discontinue the Service or a portion of it.',
            ],
            effect: 'Upon termination, your right to use the Service ceases immediately. Provisions that by their nature should survive termination will survive, including intellectual property rights, warranty disclaimers, and liability limitations.',
          },
        },
        dpa: {
          title: '9. Data Processing Agreement (DPA)',
          intro: 'Where you use the Service to process personal data on behalf of yourself or others, the following Data Processing Agreement applies and is incorporated into these Terms by reference:',
          items: [
            { strong: '9.1 Processing on Instructions:', text: ' We will process personal data only on your documented instructions, including with regard to transfers of data to third countries, unless required to do so by EU or Member State law.' },
            { strong: '9.2 Confidentiality:', text: ' We ensure that persons authorized to process personal data have committed themselves to confidentiality.' },
            { strong: '9.3 Security:', text: ' We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, as described in our Privacy Policy.' },
            { strong: '9.4 Sub-processors:', text: ' We engage sub-processors to provide the Service, as listed in our Privacy Policy. We maintain a current list of sub-processors and will notify you of any changes. You may object to new sub-processors by terminating your account.' },
            { strong: '9.5 Data Subject Rights:', text: ' We will assist you in responding to requests from data subjects to exercise their rights under GDPR, to the extent technically feasible.' },
            { strong: '9.6 Breach Notification:', text: ' We will notify you without undue delay upon becoming aware of any personal data breach affecting your data.' },
            { strong: '9.7 Data Return and Deletion:', text: ' Upon termination of your account, we will delete or return all personal data to you, except where EU or Member State law requires storage.' },
            { strong: '9.8 Audit:', text: ' We will make available to you all information necessary to demonstrate compliance with our obligations under GDPR Article 28, and allow for audits conducted by you or an auditor mandated by you, subject to reasonable notice and confidentiality obligations.' },
          ],
        },
        disclaimers: {
          title: '10. Disclaimers and Limitation of Liability',
          asIs: {
            title: '10.1 Service Provided "As Is"',
            text: 'THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.',
          },
          availability: {
            title: '10.2 No Guarantee of Availability',
            text: 'We do not guarantee that the Service will be uninterrupted, timely, secure, or error-free. We may perform maintenance, updates, or modifications that temporarily interrupt the Service.',
          },
          backup: {
            title: '10.3 No Backup Guarantee',
            text: 'While we make reasonable efforts to maintain data integrity, we do not guarantee that your Content will not be lost, corrupted, or accidentally deleted. You are responsible for maintaining backups of your important work.',
          },
          liability: {
            title: '10.4 Limitation of Liability',
            text1: 'TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL GIOVANNI DE CAPRIO BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.',
            text2: 'Our total liability to you for all claims arising from or relating to these Terms or the Service shall not exceed the total amount you paid to us in the 12 months preceding the event giving rise to the liability, or €100, whichever is greater.',
            text3: 'Nothing in these Terms limits or excludes our liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be limited or excluded under applicable law.',
          },
        },
        indemnification: {
          title: '11. Indemnification',
          text: 'You agree to indemnify, defend, and hold harmless Giovanni de Caprio from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with your access to or use of the Service, your Content, your violation of these Terms, or your violation of any third-party right.',
        },
        governingLaw: {
          title: '12. Governing Law and Dispute Resolution',
          text1: 'These Terms shall be governed by and construed in accordance with the laws of ',
          country: 'Italy',
          text2: ', without regard to its conflict of law provisions.',
          text3: 'Any dispute arising from or relating to these Terms or the Service shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, the dispute shall be submitted to the exclusive jurisdiction of the courts of ',
          jurisdiction: 'Rome, Italy',
          text4: '.',
          odr: 'If you are a consumer resident in the European Union, you also have the right to access the European Online Dispute Resolution (ODR) platform at ',
          odrLink: 'ec.europa.eu/consumers/odr',
        },
        changes: {
          title: '13. Changes to These Terms',
          text: 'We may modify these Terms at any time. If we make material changes, we will notify you by email or by posting a notice on the Service at least 30 days before the changes take effect. Your continued use of the Service after the changes become effective constitutes your acceptance of the revised Terms.',
        },
        severability: {
          title: '14. Severability',
          text: 'If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be severed and the remaining provisions shall continue in full force and effect.',
        },
        entireAgreement: {
          title: '15. Entire Agreement',
          text1: 'These Terms, together with our ',
          privacyLink: 'Privacy Policy',
          text2: ' and ',
          cookieLink: 'Cookie Policy',
          text3: ', constitute the entire agreement between you and us regarding the Service and supersede all prior agreements, understandings, and communications.',
        },
        contact: {
          title: '16. Contact Information',
          name: 'Giovanni de Caprio',
          businessType: 'Ditta Individuale — P.IVA 18340151002',
          address: 'Via Gaspare Gozzi 113, 00145 Roma (RM), Italy',
          emailLabel: 'Email: ',
        },
      },
      refundPolicy: {
        title: 'Refund & Withdrawal Policy',
        lastUpdated: 'May 25, 2026',
        notice: 'IMPORTANT: This Refund and Withdrawal Policy is provided for informational purposes. It is designed to reflect EU consumer protection rules and Italian consumer law. For legal advice specific to your situation, please consult a qualified legal professional.',
        intro1: 'This Refund and Withdrawal Policy applies to all paid subscriptions and services purchased through Morpheus by consumers (B2C) in the European Union and worldwide. It is designed to comply with the EU Consumer Rights Directive (2011/83/EU) and Italian consumer protection laws.',
        intro2: 'By subscribing to a paid plan, you acknowledge that you have read, understood, and agree to this policy.',
        freePlan: {
          title: '1. Free Plan',
          text: 'Morpheus offers a free tier with limited features at no cost. No payment information is required to use the free plan. You may use the free plan indefinitely subject to the limitations described on our Pricing page.',
        },
        freeTrial: {
          title: '2. Free Trial',
          intro: 'We may offer a free trial period (typically 7 days) for our paid subscription plans. During the trial:',
          items: [
            'You will have full access to the features of the selected plan.',
            'You must provide valid payment information to start the trial.',
            'At the end of the trial period, your subscription will automatically convert to a paid subscription unless you cancel at least 24 hours before the trial ends.',
            'You will not be charged if you cancel before the trial period ends.',
          ],
          reminder: 'We will send you a reminder email before your trial converts to a paid subscription.',
        },
        withdrawal: {
          title: '3. EU 14-Day Right of Withdrawal',
          intro: 'If you are a consumer resident in the European Union, you have a statutory right to withdraw from your subscription contract within 14 days from the date of contract conclusion, without giving any reason and without incurring any costs other than those provided for by law.',
          digitalServices: {
            title: '3.1 How the Withdrawal Right Works for Digital Services',
            intro: 'The Service is a digital service that begins performance immediately upon subscription. Because digital content and services are consumed instantly and cannot be "returned" in the traditional sense, the EU Consumer Rights Directive provides specific rules:',
            items: [
              'If you have not used the Service during the 14-day withdrawal period, you are entitled to a full refund.',
              'If you have used the Service (e.g., logged into the dashboard, created or edited content, used AI features, or otherwise accessed paid functionality), we may deduct a proportional amount from your refund to cover the value of the service consumed.',
              'However, you can waive your withdrawal right by expressly consenting to immediate performance when you subscribe. See Section 3.2 below.',
            ],
          },
          waiver: {
            title: '3.2 Waiver of Withdrawal Right',
            intro: 'During the checkout process, you will be required to check a box confirming the following:',
            quote: '"I expressly request immediate access to the Service and acknowledge that once I begin using the Service, I will lose my 14-day statutory right of withdrawal under EU consumer protection law. I understand that refunds will be provided only in the circumstances described in the Refund Policy."',
            consent: 'By checking this box and completing your purchase, you explicitly consent to the immediate performance of the contract and acknowledge that your right of withdrawal will be lost once you begin using the Service. This is a standard and legally recognized practice for digital service subscriptions under EU law.',
          },
          exercise: {
            title: '3.3 How to Exercise Your Withdrawal Right',
            intro: 'To exercise your right of withdrawal, you must inform us of your decision by an unequivocal statement. You may use the model withdrawal form below or simply email us:',
            emailLabel: 'Email: ',
            include: 'Include: Your name, email address, subscription date, and a clear statement that you wish to withdraw.',
            timing: 'The withdrawal period expires 14 days after the day of contract conclusion. If you withdraw, we will reimburse all payments received from you without undue delay and in any event no later than 14 days from the day on which we are informed about your decision to withdraw.',
          },
        },
        voluntary: {
          title: '4. Our Voluntary Refund Policy',
          intro: 'Even where the statutory right of withdrawal does not apply, we offer the following voluntary refunds as a gesture of good faith:',
          minimalUsage: {
            title: '4.1 Within 14 Days of First Payment (Minimal or No Usage)',
            text: 'If you request a refund within 14 days of your first paid subscription payment and you have made minimal or no use of the Service, we will issue a full refund. "Minimal use" means you have not significantly engaged with paid features (e.g., have not created or edited content in the app after subscribing). We verify this through our database records.',
          },
          technical: {
            title: '4.2 Technical Issues or Service Unavailability',
            text: 'If you experience significant technical issues that prevent you from using the Service for an extended period (more than 48 consecutive hours) due to problems on our end, you may request a prorated refund for the period of unusability. This does not apply to issues caused by your internet connection, device, or third-party services outside our control.',
          },
          duplicate: {
            title: '4.3 Duplicate or Erroneous Charges',
            text: 'If you were charged twice for the same subscription period or charged in error, we will refund the duplicate or erroneous charge in full upon verification.',
          },
          noRefunds: {
            title: '4.4 No Refunds For',
            items: [
              'Subscriptions that have been actively used beyond minimal testing after the first 14 days.',
              'Partial months — we do not provide prorated refunds for unused days within a billing cycle (except as specified in Section 4.2).',
              'Changes of mind after significant usage of the Service.',
              'Failure to cancel before a renewal date — it is your responsibility to manage your subscription.',
            ],
          },
        },
        cancellation: {
          title: '5. Cancellation Process',
          intro: 'You may cancel your subscription at any time:',
          items: [
            'Through your account settings in the Morpheus app (when available).',
            'By emailing us at ',
          ],
          email: 'hello@morpheusink.com',
          itemEnd: ' with your account email address.',
          effect: 'Cancellation takes effect at the end of your current billing period. You will continue to have access to paid features until that date. No partial refunds are provided for the remainder of the billing period except as specified above.',
          easy: 'Cancellation must be as easy as subscription. In compliance with EU consumer protection rules and the Digital Services Act, we will never make cancellation more difficult than signing up. There are no cancellation fees.',
        },
        refundMethod: {
          title: '6. Refund Method and Timing',
          text: 'All refunds will be issued to the original payment method used for the purchase. Refunds typically appear within 5-10 business days, depending on your payment provider. We are not responsible for delays caused by banks or payment processors.',
        },
        modelForm: {
          title: '7. Model Withdrawal Form',
          intro: 'In accordance with Annex I(B) of the EU Consumer Rights Directive, you may use the following form to exercise your right of withdrawal (copy and paste into an email):',
          form: `To: Giovanni de Caprio
Email: hello@morpheusink.com
Address: Via Gaspare Gozzi 113, 00145 Roma (RM), Italy

I hereby give notice that I withdraw from my contract of sale / subscription for the provision of the following service:

Service: Morpheus [Plan Name] Subscription
Ordered on: [Date]
Account email: [Your email address]

Name of consumer: [Your full name]
Address of consumer: [Your address]

Date: [Date]

Signature: (only if this form is notified on paper)`,
          note: 'You are not required to use this form. Any clear statement of your decision to withdraw sent to our email address is sufficient.',
        },
        nonEu: {
          title: '8. Non-EU Customers',
          text: 'If you are not a consumer resident in the European Union, our voluntary refund policy (Section 4) applies. The statutory 14-day withdrawal right described in Section 3 is an EU consumer protection requirement and may not apply in your jurisdiction. However, we strive to treat all customers fairly regardless of location.',
        },
        contact: {
          title: '9. Contact Us',
          intro: 'If you have any questions about refunds, withdrawals, or cancellations, please contact us:',
          name: 'Giovanni de Caprio',
          emailLabel: 'Email: ',
          address: 'Via Gaspare Gozzi 113, 00145 Roma (RM), Italy',
          response: 'We aim to respond to all refund requests within 2 business days.',
        },
      },
      cookiePolicy: {
        title: 'Cookie Policy',
        lastUpdated: 'May 25, 2026',
        notice: 'IMPORTANT: This Cookie Policy is provided for informational purposes. It reflects our approach to cookies and tracking under EU and Italian law. For legal advice specific to your situation, please consult a qualified privacy professional.',
        intro1: 'This Cookie Policy explains how ',
        intro1Strong: 'Giovanni de Caprio',
        intro2: ' ("we", "us", "our"), operating the Morpheus Service, uses cookies and similar tracking technologies when you visit our website and use our services.',
        intro3: 'This policy is designed to help you understand what cookies are, how we use them, and the choices you have regarding their use. We comply with the EU ePrivacy Directive (2002/58/EC as amended by 2009/136/EC) and the General Data Protection Regulation (GDPR).',
        whatAre: {
          title: '1. What Are Cookies?',
          text1: 'Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the website owners. Cookies can be "session cookies" (which are deleted when you close your browser) or "persistent cookies" (which remain on your device for a set period or until you delete them).',
          text2: 'In addition to cookies, we may use other similar technologies such as local storage, session storage, and pixel tags to achieve similar purposes.',
        },
        howWeUse: {
          title: '2. How We Use Cookies',
          intro: 'We use cookies for the following purposes:',
          essential: {
            title: '2.1 Essential Cookies',
            intro: 'These cookies are strictly necessary for the Service to function and cannot be disabled. They include:',
            items: [
              { strong: 'Authentication cookies:', text: ' Maintain your login session and keep you signed in.' },
              { strong: 'Security cookies:', text: ' Help detect and prevent security threats and abuse.' },
              { strong: 'Session cookies:', text: ' Enable core functionality such as navigation and access to secure areas.' },
              { strong: 'Preference cookies:', text: ' Remember your settings such as dark/light mode and language preferences.' },
            ],
          },
          analytics: {
            title: '2.2 Analytics Cookies (Optional)',
            text1: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We currently do not use analytics cookies, but we may implement them in the future (e.g., Google Analytics). You will be asked for explicit consent before any analytics cookies are placed.',
            text2: 'If enabled, analytics cookies would collect information such as: pages visited, time spent on site, referral sources, and approximate geographic location (at city/country level). This data helps us improve the Service.',
          },
          marketing: {
            title: '2.3 Marketing Cookies (Optional)',
            text: 'These cookies are used to track visitors across websites for the purpose of displaying relevant advertisements. We currently do not use marketing cookies and do not display third-party advertisements on our Service.',
          },
        },
        cookiesWeUse: {
          title: '3. Cookies We Use',
          headers: {
            name: 'Name',
            provider: 'Provider',
            purpose: 'Purpose',
            duration: 'Duration',
            type: 'Type',
          },
          rows: [
            { name: 'morpheus_cookie_consent', provider: 'Morpheus', purpose: 'Stores your cookie consent preferences', duration: '12 months', type: 'Essential' },
            { name: 'a_session_*', provider: 'Appwrite', purpose: 'Authentication session management', duration: 'Session', type: 'Essential' },
            { name: 'theme', provider: 'Morpheus', purpose: 'Stores dark/light mode preference', duration: 'Persistent', type: 'Essential' },
            { name: '_ga', provider: 'Google Analytics', purpose: 'Distinguishes unique users (not currently active)', duration: '2 years', type: 'Analytics' },
            { name: '_gid', provider: 'Google Analytics', purpose: 'Distinguishes users per session (not currently active)', duration: '24 hours', type: 'Analytics' },
          ],
          note: 'Cookies marked as "not currently active" are listed for transparency but are not placed on your device unless you explicitly consent to analytics cookies in the future.',
        },
        thirdParty: {
          title: '4. Third-Party Cookies',
          intro: 'In addition to our own cookies, we may also use cookies from third-party service providers:',
          items: [
            { strong: 'Appwrite:', text: ' Our authentication and database provider may set session cookies to manage your login state.' },
            { strong: 'LemonSqueezy:', text: ' Our payment processor may set cookies during the checkout process to manage payment sessions and prevent fraud.' },
            { strong: 'Google Analytics:', text: ' May set cookies if you consent to analytics tracking in the future.' },
          ],
          ownPolicies: 'These third parties have their own privacy and cookie policies. We encourage you to review them:',
          links: [
            { text: 'Appwrite Privacy Policy', href: 'https://appwrite.io/privacy' },
            { text: 'LemonSqueezy Privacy Policy', href: 'https://www.lemonsqueezy.com/privacy' },
            { text: 'Google Cookie Policy', href: 'https://policies.google.com/technologies/cookies' },
          ],
        },
        manage: {
          title: '5. How to Manage Your Cookie Preferences',
          intro: 'You have several options for managing cookies:',
          banner: {
            title: '5.1 Our Cookie Banner',
            text: 'When you first visit our website, you will see a cookie banner that allows you to accept or reject non-essential cookies. You can also customize your preferences by category. You can update your preferences at any time by clicking the "Cookie Settings" link in the footer of our website.',
          },
          browser: {
            title: '5.2 Browser Settings',
            text1: 'Most web browsers allow you to control cookies through their settings. You can typically:',
            items: [
              'View cookies that are stored on your device',
              'Delete all or specific cookies',
              'Block cookies from being placed',
              'Block third-party cookies',
              'Receive a notification before a cookie is placed',
            ],
            text2: 'Please note that disabling essential cookies may prevent you from using certain features of the Service, including signing in.',
            text3: 'Here are links to cookie management instructions for common browsers:',
            links: [
              { text: 'Google Chrome', href: 'https://support.google.com/chrome/answer/95647' },
              { text: 'Mozilla Firefox', href: 'https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop' },
              { text: 'Apple Safari', href: 'https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471' },
              { text: 'Microsoft Edge', href: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
            ],
          },
          optOut: {
            title: '5.3 Industry Opt-Out Tools',
            text: 'You can also opt out of interest-based advertising through industry self-regulatory programs:',
            links: [
              { text: 'Digital Advertising Alliance (DAA)', href: 'https://optout.aboutads.info' },
              { text: 'European Interactive Digital Advertising Alliance (EDAA)', href: 'https://youronlinechoices.eu' },
            ],
          },
        },
        localStorage: {
          title: '6. Local Storage and Similar Technologies',
          intro: 'In addition to cookies, we use browser local storage and session storage to store certain data locally on your device:',
          items: [
            { strong: 'Application state:', text: ' We store UI preferences and temporary application data in local storage to improve performance.' },
            { strong: 'Offline data:', text: ' Your writing content is primarily stored in your browser\'s IndexedDB (via Dexie.js) for local-first functionality. This data remains on your device and is not transmitted to our servers except for backup and sync purposes.' },
            { strong: 'Cache:', text: ' We may cache certain resources to improve loading times.' },
          ],
          text2: 'Unlike cookies, data stored in local storage and session storage is not automatically sent to the server with each request. It is only accessed by JavaScript running on our website.',
        },
        consentRecords: {
          title: '7. Cookie Consent Records',
          intro: 'In compliance with GDPR Article 7, we maintain records of your cookie consent, including:',
          items: [
            'The date and time you provided consent',
            'The specific cookie categories you consented to',
            'The version of our cookie policy in effect at the time',
            'Your IP address (anonymized where possible)',
          ],
          text2: 'These records are stored securely and are used solely for the purpose of demonstrating compliance with applicable laws. They are retained for 12 months or until you update your preferences.',
        },
        changes: {
          title: '8. Changes to This Cookie Policy',
          text: 'We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. If we make material changes, we will notify you through our cookie banner or by posting a notice on the Service. The "Last updated" date at the top of this page indicates when the policy was last revised.',
        },
        contact: {
          title: '9. Contact Us',
          intro: 'If you have any questions about our use of cookies or this Cookie Policy, please contact us:',
          name: 'Giovanni de Caprio',
          emailLabel: 'Email: ',
          address: 'Via Gaspare Gozzi 113, 00145 Roma (RM), Italy',
        },
      },
    },
  },
  it: {
    legal: {
      backToHome: 'Torna alla home',
      lastUpdated: 'Ultimo aggiornamento: {{date}}',
      notFound: {
        title: '404',
        message: 'Questa pagina non esiste. Forse si è persa in un altro capitolo.',
        backHome: 'Torna alla home',
      },
      contact: {
        title: 'Contattaci',
        lastUpdated: 'Giugno 2026',
        intro: 'Hai una domanda, un feedback o bisogno di aiuto con Morpheus? Siamo qui per te. Scrivici e ti risponderemo al più presto.',
        emailTitle: 'Scrivici via email',
        emailAddress: 'hello@morpheusink.com',
        emailDesc: 'Ideale per domande generali e feedback',
        responseTitle: 'Tempo di risposta',
        responseTime: 'Entro 24-48 ore',
        supportDays: 'Lunedì – venerdì, fuso orario CET',
        supportTitle: 'Supporto',
        supportDesc: 'Problemi di fatturazione e tecnici',
        includeEmail: 'Includi l\'email del tuo account per ricevere aiuto più velocemente',
        basedInTitle: 'Sede',
        basedInLocation: 'Roma, Italia',
        basedInDesc: 'Fatto con cura per chi racconta storie in tutto il mondo',
        beforeYouWrite: 'Prima di scriverci',
        refundLink: 'Politica di rimborso',
        faqLink: 'Pagina FAQ',
        billingIssue: 'Problemi di fatturazione?',
        billingIssueText: 'Consulta la nostra {{refundPolicy}} e includi l\'email dell\'abbonamento.',
        commonQuestion: 'Domande comuni?',
        commonQuestionText: 'Dai prima un\'occhiata alla {{faqPage}} — la risposta potrebbe già esserci.',
        bugReport: 'Segnalazione di bug?',
        bugReportText: 'Raccontaci cosa stavi facendo, cosa ti aspettavi e cosa è successo invece. Gli screenshot aiutano!',
        sendEmail: 'Inviaci una email',
      },
      faq: {
        title: 'Domande frequenti',
        intro: 'Tutto ciò che devi sapere su Morpheus. Non trovi quello che cerchi? Contattaci.',
        categories: {
          all: 'Tutte',
          accountBilling: 'Account e fatturazione',
          privacyData: 'Privacy e dati',
          aiTechnology: 'AI e tecnologia',
          featuresUsage: 'Funzionalità e uso',
          compliance: 'Conformità',
        },
        getInTouch: 'Contattaci',
        stillHaveQuestions: 'Hai ancora domande?',
        helpText: 'Siamo qui per aiutarti. Scrivici una email e ti risponderemo entro 24 ore.',
        contactSupport: 'Contatta il supporto',
        items: {
          cancelSubscription: {
            question: 'Come posso disdire il mio abbonamento?',
            answerBeforeEmail: 'Puoi disdire il tuo abbonamento in qualsiasi momento dalle impostazioni del tuo account nell\'app Morpheus, oppure scrivendoci a ',
            answerAfterEmail: '. La disdetta avrà effetto alla fine del periodo di fatturazione in corso — manterrai l\'accesso fino a quella data. Non ci sono penali di disdetta.',
          },
          refundPolicy: {
            question: 'Qual è la vostra politica di rimborso?',
            answerBeforeLink: 'I consumatori dell\'UE hanno un diritto di recesso statutario di 14 giorni. Se non hai utilizzato il servizio, riceverai un rimborso completo. Se lo hai utilizzato, puoi comunque richiedere un rimborso entro 14 giorni dal primo pagamento, a condizione che l\'uso sia stato minimo — lo verifichiamo attraverso il nostro database. Consulta la nostra ',
            answerLinkText: 'Politica di rimborso',
            answerAfterLink: ' per i dettagli.',
          },
          freeTrial: {
            question: 'Offrite una prova gratuita?',
            answer: "Offriamo una prova gratuita di 7 giorni per i nuovi abbonati a qualsiasi piano a pagamento. La prova ti dà accesso completo a tutte le funzionalità. Se non disdici prima che la prova scada, si converte automaticamente in un abbonamento a pagamento. Ti invieremo un promemoria via email prima che ciò avvenga.",
          },
          paymentMethods: {
            question: 'Quali metodi di pagamento accettate?',
            answer: 'I pagamenti sono gestiti tramite LemonSqueezy, che accetta le principali carte di credito e debito (Visa, Mastercard, American Express) oltre a PayPal nella maggior parte delle regioni.',
          },
          changePlan: {
            question: 'Posso cambiare piano?',
            answer: 'Sì, puoi passare a un piano superiore o inferiore in qualsiasi momento dalle impostazioni del tuo account. Gli upgrade hanno effetto immediato. I downgrade hanno effetto alla fine del periodo di fatturazione in corso.',
          },
          writingPrivate: {
            question: 'I miei dati di scrittura sono privati?',
            answer: 'Assolutamente. I tuoi libri, capitoli, personaggi e tutti i contenuti creativi ti appartengono e solo a te. Non leggiamo, analizziamo o condividiamo la tua scrittura con nessuno. I tuoi contenuti sono archiviati in modo sicuro e accessibili solo a te attraverso il tuo account autenticato.',
          },
          trainAI: {
            question: 'Addestrate l\'AI sui miei contenuti?',
            answerStrong: 'No.',
            answerBeforeLink: ' Non utilizziamo la tua scrittura, i tuoi prompt o i tuoi contenuti creativi per addestrare, ottimizzare o migliorare alcun modello AI. Quando usi la chat AI, i tuoi prompt vengono inviati a provider AI di terze parti (tramite OpenRouter) esclusivamente per generare una risposta. Abbiamo verificato che i nostri provider non conservano i tuoi prompt a fini di addestramento. Consulta la nostra ',
            answerLinkText: 'Informativa sulla privacy',
            answerAfterLink: ' per i dettagli completi.',
          },
          exportData: {
            question: 'Posso esportare i miei dati?',
            answer: 'Sì. Morpheus è costruito con un\'architettura local-first, il che significa che i tuoi dati risiedono nel tuo browser per impostazione predefinita. Puoi esportare i tuoi libri, capitoli e dati di world-building in qualsiasi momento dal pannello delle impostazioni. Supportiamo esportazioni nei formati più comuni.',
          },
          deleteAccount: {
            question: 'Come posso eliminare il mio account e i miei dati?',
            answer: 'Puoi eliminare il tuo account e tutti i dati associati dalle impostazioni del tuo account. Una volta confermata, la tua attività creativa viene rimossa definitivamente dai nostri sistemi attivi entro 30 giorni. I record di fatturazione sono conservati per 10 anni come richiesto dalla legge fiscale italiana.',
          },
          whereStored: {
            question: 'Dove vengono archiviati i miei dati?',
            answer: 'I tuoi dati sono archiviati in due posti: (1) localmente nel tuo browser usando IndexedDB per un accesso immediato, e (2) nel nostro database cloud (Appwrite Cloud, ospitato nell\'UE) per il backup e la sincronizzazione tra dispositivi. Rimani tu il controllo in ogni momento.',
          },
          whoAccess: {
            question: 'Chi ha accesso ai miei dati?',
            answer: 'Solo tu. Il nostro team non può accedere ai tuoi contenuti creativi. In rari casi (ad esempio, per indagare su abusi o un problema tecnico), potremmo accedere a log di sistema minimi, ma mai alla tua scrittura effettiva o ai contenuti della storia senza il tuo esplicito consenso.',
          },
          gdpr: {
            question: 'Morpheus è conforme al GDPR?',
            answerBefore: 'Sì. Ci impegniamo pienamente per la conformità al GDPR. Siamo con sede in Italia (UE), trattiamo i dati lecitamente, rispettiamo i tuoi diritti, utilizziamo infrastrutture basate nell\'UE quando possibile e abbiamo firmato accordi di trattamento dati con tutti i nostri sub-processor. Consulta la nostra ',
            answerLinkText: 'Informativa sulla privacy',
            answerAfter: ' per il quadro completo.',
          },
          aiModels: {
            question: 'Quali modelli AI utilizza Morpheus?',
            answer: 'Morpheus si collega a più modelli linguistici all\'avanguardia tramite OpenRouter, inclusi i modelli GPT di OpenAI, Google (Gemini) e altri. Questo ti offre flessibilità nella scelta dell\'AI più adatta al tuo stile di scrittura e alle tue esigenze.',
          },
          ownApiKey: {
            question: 'Posso usare la mia chiave API?',
            answer: 'Sì! Morpheus supporta "Bring Your Own Key" (BYOK). Se hai una tua chiave API OpenRouter, puoi collegarla nelle impostazioni e utilizzare le funzionalità AI senza consumare la quota di token del tuo piano. Questo ti offre la massima flessibilità e controllo.',
          },
          contentUsedTrain: {
            question: 'I miei contenuti vengono utilizzati per addestrare modelli?',
            answer: 'No. Abbiamo verificato esplicitamente con i nostri provider AI che le chiamate API effettuate tramite OpenRouter non vengono utilizzate per addestrare o migliorare i loro modelli. La tua opera creativa resta tua.',
          },
          inappropriateAI: {
            question: 'Cosa succede se l\'AI genera qualcosa di inappropriato?',
            answer: 'I modelli di linguaggio AI possono occasionalmente produrre contenuti inaspettati o inappropriati. Sei sempre tu al comando — rivedi tutto ciò che l\'AI suggerisce prima di usarlo. Se incontri output preoccupanti, segnalaceli. Ti incoraggiamo anche a un uso responsabile: non utilizzare Morpheus per generare contenuti illegali, dannosi o di odio.',
          },
          offline: {
            question: 'Morpheus funziona offline?',
            answer: 'I tuoi dati di scrittura sono archiviati localmente nel tuo browser, quindi puoi leggere e modificare il tuo lavoro anche senza connessione Internet. Tuttavia, le funzionalità AI, la sincronizzazione e il backup cloud richiedono una connessione Internet.',
          },
          memoryWorldBuilding: {
            question: 'Come funzionano la memoria e il world-building?',
            answer: 'Morpheus mantiene una "bibbia del mondo" per ognuno dei tuoi libri. Puoi aggiungere personaggi, luoghi, lore e regole. Quando chatti con l\'AI, fa riferimento a questa bibbia del mondo in modo che i suoi suggerimenti restino coerenti con l\'universo della tua storia. Più dettagli aggiungi, meglio l\'AI capirà il tuo mondo.',
          },
          commercialUse: {
            question: 'Posso usare Morpheus per scrittura professionale o commerciale?',
            answer: 'Sì. Mantieni la piena proprietà e i diritti su tutto ciò che crei in Morpheus. Che tu stia scrivendo un romanzo da pubblicare, una sceneggiatura o qualsiasi altro lavoro commerciale, i tuoi contenuti sono tuoi da usare, vendere o licenziare come preferisci.',
          },
          wordLimit: {
            question: 'C\'è un limite di parole?',
            answer: 'Non c\'è un limite rigido di parole per la tua scrittura. I nostri piani differiscono per l\'uso dei token AI (quanto puoi chattare con l\'AI a settimana). I tuoi contenuti effettivamente scritti nell\'editor sono illimitati in tutti i piani.',
          },
          collaborate: {
            question: 'Posso collaborare con altri scrittori?',
            answer: 'La collaborazione in tempo reale è nella nostra roadmap. Per ora, Morpheus è progettato per scrittori individuali. Puoi comunque esportare il tuo lavoro e condividerlo con collaboratori al di fuori della piattaforma.',
          },
          exportFormats: {
            question: 'In quali formati posso esportare?',
            answer: 'Puoi esportare i tuoi libri e capitoli in più formati tra cui DOCX, PDF, Markdown e testo semplice — direttamente dal pannello delle impostazioni.',
          },
          basedWhere: {
            question: 'Dove ha sede Morpheus?',
            answer: 'Morpheus è creato e gestito da Giovanni de Caprio, ditta individuale registrata a Roma, Italia. Siamo un\'azienda con sede nell\'UE, il che significa che le leggi sulla protezione dei dati dell\'UE si applicano per impostazione predefinita.',
          },
          shutdown: {
            question: 'Cosa succede ai miei dati se Morpheus chiude?',
            answer: 'Se mai dovessimo interrompere il servizio, ti daremo un preavviso adeguato (almeno 60 giorni) e ti forniremo un modo per esportare tutti i tuoi dati prima di qualsiasi chiusura. I tuoi dati locali nel browser rimangono comunque accessibili.',
          },
        },
      },
      privacyPolicy: {
        title: 'Informativa sulla privacy',
        lastUpdated: '25 maggio 2026',
        notice: 'IMPORTANTE: La presente Informativa sulla privacy è fornita a scopo informativo. Riflette il nostro impegno per la protezione dei dati ai sensi del Regolamento generale sulla protezione dei dati (GDPR) e della normativa italiana in materia di privacy. Per consulenza legale specifica alla tua situazione, rivolgiti a un professionista qualificato in materia di privacy.',
        intro1: 'La presente Informativa sulla privacy descrive come ',
        intro1Strong: 'Giovanni de Caprio',
        intro2: ' ("noi", "ci", "nostro"), nella veste di ditta individuale ai sensi della legge italiana, raccoglie, utilizza, conserva e protegge i tuoi dati personali quando utilizzi il sito web e i servizi di Morpheus (collettivamente, il "Servizio").',
        intro3: 'Ci impegniamo a proteggere la tua privacy e a garantire che i tuoi dati personali siano trattati in modo sicuro e responsabile, in conformità al Regolamento generale sulla protezione dei dati (Regolamento UE 2016/679 — "GDPR") e al Decreto legislativo italiano n. 196/2003, come modificato dal Decreto legislativo n. 101/2018 ("Codice in materia di protezione dei dati personali").',
        controller: {
          title: '1. Titolare del trattamento',
          text: 'Il Titolare del trattamento dei tuoi dati personali è:',
          name: 'Giovanni de Caprio',
          businessType: 'Ditta Individuale',
          address1: 'Via Gaspare Gozzi 113',
          address2: '00145 Roma (RM), Italia',
          cf: 'C.F.: DCPGNN04P28H501W',
          vat: 'P.IVA: 18340151002',
          emailLabel: 'Email: ',
          dpo: 'Puoi contattarci per questioni relative alla protezione dei dati all\'indirizzo email sopra indicato. Non abbiamo nominato un Responsabile della Protezione dei Dati (DPO) poiché non rientriamo nelle soglie che lo richiedono ai sensi dell\'articolo 37 del GDPR.',
        },
        dataCollected: {
          title: '2. Quali dati raccogliamo',
          intro: 'Raccogliamo e trattiamo le seguenti categorie di dati personali:',
          accountInfo: {
            title: '2.1 Informazioni sull\'account',
            items: [
              'Indirizzo email',
              'Nome (se fornito)',
              'Credenziali dell\'account (le password sono sottoposte a hashing e mai conservate in chiaro)',
              'ID utente generato dal nostro sistema di autenticazione',
            ],
          },
          content: {
            title: '2.2 Contenuti da te creati',
            items: [
              'Libri, capitoli e contenuti della storia',
              'Profili dei personaggi e note di world-building',
              'Messaggi di chat e prompt inviati all\'assistente AI',
              'Voci della lore bible e altri materiali creativi',
            ],
            note: 'Importante: i tuoi contenuti creativi ti appartengono. Non utilizziamo la tua scrittura per addestrare modelli AI. Vedi la Sezione 9 per i dettagli sulle nostre pratiche relative ai dati AI.',
          },
          technical: {
            title: '2.3 Dati di utilizzo e tecnici',
            items: [
              'Indirizzo IP (registrato a fini di sicurezza)',
              'Tipo e versione del browser',
              'Informazioni sul dispositivo',
              'Token di sessione e log di autenticazione',
              'Log di errore e informazioni diagnostiche',
            ],
          },
          payment: {
            title: '2.4 Informazioni di pagamento',
            items: [
              'Non conserviamo i dati della carta di credito. L\'elaborazione dei pagamenti è gestita da LemonSqueezy, il nostro gestore dei pagamenti.',
              'Riceviamo da LemonSqueezy gli ID transazione, lo stato dell\'abbonamento e la cronologia di fatturazione.',
            ],
          },
        },
        legalBasis: {
          title: '3. Base giuridica del trattamento',
          intro: 'Ai sensi dell\'articolo 6 del GDPR, trattiamo i tuoi dati personali sulla base delle seguenti basi giuridiche:',
          headers: {
            activity: 'Attività di trattamento',
            basis: 'Base giuridica',
          },
          rows: [
            { activity: 'Registrazione e autenticazione dell\'account', basis: 'Contratto (art. 6, par. 1, lett. b)' },
            { activity: 'Fornitura del servizio di scrittura e assistenza AI', basis: 'Contratto (art. 6, par. 1, lett. b)' },
            { activity: 'Elaborazione dei pagamenti e fatturazione', basis: 'Contratto (art. 6, par. 1, lett. b)' },
            { activity: 'Sicurezza, prevenzione delle frodi e debug degli errori', basis: 'Interesse legittimo (art. 6, par. 1, lett. f)' },
            { activity: 'Analisi e miglioramento del servizio', basis: 'Consenso (art. 6, par. 1, lett. a)' },
            { activity: 'Comunicazioni di marketing', basis: 'Consenso (art. 6, par. 1, lett. a)' },
            { activity: 'Conformità legale e obblighi fiscali', basis: 'Obbligo legale (art. 6, par. 1, lett. c)' },
          ],
        },
        howWeUse: {
          title: '4. Come utilizziamo i tuoi dati',
          intro: 'Utilizziamo i tuoi dati personali per le seguenti finalità:',
          items: [
            { strong: 'Fornire il Servizio:', text: ' autenticarti, conservare i tuoi contenuti e abilitare l\'assistenza alla scrittura basata sull\'AI.' },
            { strong: 'Elaborare i pagamenti:', text: ' gestire abbonamenti e fatturazione tramite il nostro gestore dei pagamenti.' },
            { strong: 'Garantire la sicurezza:', text: ' proteggere contro accessi non autorizzati, frodi e abusi.' },
            { strong: 'Migliorare il Servizio:', text: ' analizzare le modalità di utilizzo (solo con il tuo consenso) per migliorare le funzionalità e correggere bug.' },
            { strong: 'Comunicare con te:', text: ' inviare notifiche relative al servizio, rispondere alle richieste di supporto e (con consenso) email di marketing.' },
            { strong: 'Rispettare gli obblighi di legge:', text: ' adempiere a requisiti fiscali, contabili e normativi secondo il diritto italiano e dell\'UE.' },
          ],
        },
        retention: {
          title: '5. Conservazione dei dati',
          intro: 'Conserviamo i tuoi dati personali solo per il tempo necessario a conseguire le finalità per cui sono stati raccolti:',
          items: [
            { strong: 'Dati dell\'account e contenuti:', text: ' conservati fino all\'eliminazione dell\'account o alla richiesta di cancellazione dei dati. Dopo l\'eliminazione dell\'account, i contenuti vengono rimossi definitivamente dai sistemi attivi entro 30 giorni.' },
            { strong: 'Log di autenticazione:', text: ' conservati per 90 giorni a fini di sicurezza.' },
            { strong: 'Log di errore:', text: ' conservati per 30 giorni.' },
            { strong: 'Record di pagamento e fatturazione:', text: ' conservati per 10 anni come richiesto dalla legge fiscale italiana (DPR 600/1973 e successive modifiche).' },
            { strong: 'Record di consenso ai cookie:', text: ' conservati per 12 mesi o fino all\'aggiornamento delle tue preferenze.' },
          ],
        },
        sharing: {
          title: '6. Condivisione dei dati e sub-processor',
          intro: 'Non vendiamo i tuoi dati personali. Condividiamo i dati solo con fornitori di servizi di terze parti affidabili (sub-processor) che ci aiutano a gestire il Servizio:',
          headers: {
            processor: 'Sub-processor',
            purpose: 'Finalità',
            location: 'Località',
          },
          rows: [
            { processor: 'Appwrite Cloud', purpose: 'Database, autenticazione, archiviazione file', location: 'UE / Germania (FRA1)' },
            { processor: 'OpenRouter', purpose: 'Inferenza modelli AI e routing API LLM', location: 'Stati Uniti' },
            { processor: 'LemonSqueezy', purpose: 'Elaborazione pagamenti e gestione abbonamenti', location: 'Stati Uniti' },
            { processor: 'Google Analytics', purpose: 'Analisi dell\'uso del sito web (solo con consenso)', location: 'Stati Uniti' },
          ],
          note1: 'Per i trasferimenti verso paesi extra-UE (Stati Uniti), facciamo affidamento sulle Clausole Contrattuali Standard (SCC) approvate dalla Commissione europea ai sensi dell\'articolo 46, paragrafo 2, lett. c) del GDPR, per garantire un adeguato livello di protezione dei dati.',
          note2: 'Abbiamo firmato Accordi di Trattamento Dati (DPA) con tutti i sub-processor che trattano dati personali per nostro conto, come richiesto dall\'articolo 28 del GDPR.',
        },
        rights: {
          title: '7. I tuoi diritti ai sensi del GDPR',
          intro: 'In qualità di interessato ai sensi del GDPR, hai i seguenti diritti:',
          items: [
            { strong: 'Diritto di accesso (art. 15):', text: ' puoi richiedere una copia di tutti i dati personali che deteniamo su di te.' },
            { strong: 'Diritto di rettifica (art. 16):', text: ' puoi richiedere la correzione di dati inesatti o incompleti.' },
            { strong: 'Diritto alla cancellazione / "Diritto all\'oblio" (art. 17):', text: ' puoi richiedere la cancellazione dei tuoi dati personali, fatto salvo gli obblighi di conservazione previsti dalla legge.' },
            { strong: 'Diritto di limitazione del trattamento (art. 18):', text: ' puoi richiedere che limitiamo l\'uso dei tuoi dati in determinate circostanze.' },
            { strong: 'Diritto alla portabilità dei dati (art. 20):', text: ' puoi richiedere i tuoi dati in un formato strutturato e leggibile da dispositivo automatico e trasferirli a un altro servizio.' },
            { strong: 'Diritto di opposizione (art. 21):', text: ' puoi opporti al trattamento basato su interesse legittimo o per finalità di marketing diretto.' },
            { strong: 'Diritto di revocare il consenso (art. 7, par. 3):', text: ' ove facciamo affidamento sul consenso, puoi revocarlo in qualsiasi momento senza pregiudicare la liceità del trattamento precedente la revoca.' },
            { strong: 'Diritto di proporre reclamo (art. 77):', text: ' hai il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali o all\'autorità di controllo locale.' },
          ],
          contact: 'Per esercitare uno qualsiasi di questi diritti, contattaci all\'indirizzo ',
          response: 'Ti risponderemo entro 30 giorni dal ricevimento della richiesta. Potremmo dover verificare la tua identità prima di elaborare la richiesta.',
        },
        cookies: {
          title: '8. Cookie e tecnologie simili',
          text1: 'Utilizziamo cookie e tecnologie simili per fornire e proteggere il nostro Servizio. Per informazioni dettagliate sui cookie che utilizziamo, sulle loro finalità e su come gestire le tue preferenze, consulta la nostra ',
          linkText: 'Cookie Policy',
          text2: '.',
          text3: 'Utilizzando il nostro Servizio, acconsenti all\'uso dei cookie essenziali. Per i cookie analitici e di marketing, richiederemo il tuo esplicito consenso attraverso il nostro banner dei cookie prima di installarli.',
        },
        aiPractices: {
          title: '9. Pratiche relative ai dati AI',
          intro: 'Poiché Morpheus è un assistente di scrittura basato sull\'intelligenza artificiale, desideriamo essere trasparenti su come i tuoi dati interagiscono con i sistemi AI:',
          items: [
            { strong: 'I tuoi contenuti sono tuoi:', text: ' non utilizziamo i tuoi libri, capitoli, personaggi o scritti creativi per addestrare, ottimizzare o migliorare alcun modello AI.' },
            { strong: 'I prompt sono elaborati da provider AI di terze parti:', text: ' quando utilizzi la funzione di chat AI, i tuoi prompt e il contesto vengono inviati a OpenRouter, che li instrada ai modelli linguistici sottostanti (ad es. OpenAI, Anthropic, Google). Abbiamo verificato che i nostri principali provider AI applicano politiche di conservazione zero dei dati per le chiamate API, il che significa che i tuoi prompt non vengono conservati o utilizzati per l\'addestramento dei modelli.' },
            { strong: 'Nessuna decisione automatizzata:', text: ' Morpheus non prende decisioni nei tuoi confronti che producano effetti giuridici o analogamente significativi (articolo 22 del GDPR).' },
            { strong: 'AI Act UE:', text: ' Morpheus rientra nella categoria di sistema AI a "rischio limitato" ai sensi dell\'AI Act UE. Forniamo trasparenza sui contenuti generati dall\'AI e non inganniamo gli utenti sulla natura artificiale dei contenuti.' },
          ],
        },
        security: {
          title: '10. Sicurezza dei dati',
          intro: 'Adottiamo adeguate misure tecniche e organizzative per proteggere i tuoi dati personali:',
          items: [
            'Crittografia dei dati in transito tramite TLS 1.2+ (HTTPS)',
            'Crittografia dei dati a riposo ove supportata dai nostri provider di infrastruttura',
            'Autenticazione sicura tramite algoritmi di hashing di settore (bcrypt)',
            'Controlli di accesso basati sui ruoli e principi di accesso minimo ai dati',
            'Revisioni periodiche della sicurezza e aggiornamenti delle dipendenze',
          ],
          breach: 'In caso di violazione dei dati personali, notificheremo al Garante per la Protezione dei Dati Personali entro 72 ore dalla consapevolezza della violazione, ove richiesto dall\'articolo 33 del GDPR. Se la violazione è suscettibile di comportare un rischio elevato per i tuoi diritti e le tue libertà, notificheremo anche gli utenti interessati senza ingiustificato ritardo (articolo 34 del GDPR).',
        },
        children: {
          title: '11. Privacy dei minori',
          text: 'Il Servizio non è destinato a minori di 16 anni. Non raccogliamo consapevolmente dati personali di minori di 16 anni. Se veniamo a conoscenza di aver raccolto dati personali di un minore di 16 anni senza verifica del consenso dei genitori, adotteremo misure per cancellare tali informazioni. Se ritieni che possiamo avere informazioni su un minore di 16 anni, contattaci.',
        },
        changes: {
          title: '12. Modifiche alla presente Informativa sulla privacy',
          text: 'Potremmo aggiornare la presente Informativa sulla privacy di tanto in tanto per riflettere modifiche delle nostre pratiche, dei requisiti legali o delle funzionalità del Servizio. Ti informeremo di eventuali modifiche sostanziali pubblicando l\'informativa aggiornata in questa pagina con una data "Ultimo aggiornamento" rivista. Ti invitiamo a consultare periodicamente la presente Informativa sulla privacy.',
        },
        contact: {
          title: '13. Contattaci',
          intro: 'Per qualsiasi domanda, dubbio o richiesta relativa alla presente Informativa sulla privacy o alle nostre pratiche sui dati, contattaci:',
          name: 'Giovanni de Caprio',
          emailLabel: 'Email: ',
          addressLabel: 'Indirizzo: ',
          address: 'Via Gaspare Gozzi 113, 00145 Roma (RM), Italia',
          dpaRight: 'Hai anche il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali:',
          dpaLink: 'www.garanteprivacy.it',
        },
      },
      termsOfService: {
        title: 'Termini di servizio',
        lastUpdated: '25 maggio 2026',
        notice: 'IMPORTANTE: I presenti Termini di servizio costituiscono un accordo giuridicamente vincolante tra te e Giovanni de Caprio. Accedendo o utilizzando Morpheus, accetti di essere vincolato dai presenti Termini. Se non sei d\'accordo, non devi utilizzare il Servizio.',
        intro1: 'I presenti Termini di servizio ("Termini") disciplinano l\'accesso e l\'uso del sito web, delle applicazioni e dei servizi di Morpheus (collettivamente, il "Servizio") gestiti da ',
        intro1Strong: 'Giovanni de Caprio',
        intro2: ', ditta individuale registrata in Italia, P.IVA 18340151002 ("noi", "ci", "nostro").',
        intro3: 'Creando un account, accedendo o utilizzando il Servizio, accetti i presenti Termini. Se utilizzi il Servizio per conto di un\'organizzazione, dichiari e garantisci di avere l\'autorità di vincolare tale organizzazione ai presenti Termini.',
        definitions: {
          title: '1. Definizioni',
          items: [
            { term: '"Servizio"', text: ' indica il sito web, l\'applicazione web e tutti i servizi, le funzionalità e i contenuti correlati di Morpheus.' },
            { term: '"Utente"', text: ' o ',
            term2: '"te"', text2: ' indica qualsiasi individuo o entità che accede o utilizza il Servizio.' },
            { term: '"Contenuto"', text: ' indica qualsiasi testo, dato, informazione o materiale creato, caricato o archiviato dall\'utente tramite il Servizio, inclusi a titolo esemplificativo libri, capitoli, personaggi, note di world-building e messaggi di chat.' },
            { term: '"Funzionalità AI"', text: ' indica le capacità di assistenza alla scrittura, chat, brainstorming e generazione di testo basate sull\'intelligenza artificiale fornite tramite il Servizio.' },
            { term: '"Abbonamento"', text: ' indica un piano a pagamento che garantisce l\'accesso a funzionalità e servizi premium.' },
          ],
        },
        eligibility: {
          title: '2. Requisiti di idoneità',
          intro: 'Devi avere almeno 16 anni per utilizzare il Servizio. Utilizzando il Servizio, dichiari e garantisci che:',
          items: [
            'Hai almeno 16 anni;',
            'Hai la capacità giuridica di stipulare un contratto vincolante;',
            'Rispetterai i presenti Termini e tutte le leggi e i regolamenti applicabili;',
            'Le informazioni che ci fornisci sono accurate, complete e aggiornate.',
          ],
          minor: 'Se hai tra i 16 e i 18 anni, confermi di aver ottenuto il consenso di un genitore o tutore legale per utilizzare il Servizio.',
        },
        account: {
          title: '3. Registrazione dell\'account',
          intro: 'Per accedere alla maggior parte delle funzionalità del Servizio, devi creare un account. Accetti di:',
          items: [
            'Fornire informazioni accurate e complete durante la registrazione;',
            'Mantenere la sicurezza delle credenziali del tuo account;',
            'Informarci immediatamente di qualsiasi accesso non autorizzato o violazione della sicurezza;',
            'Assumerti la responsabilità di tutte le attività che avvengono sotto il tuo account.',
          ],
          suspension: 'Ci riserviamo il diritto di sospendere o chiudere gli account che forniscono informazioni false o violano i presenti Termini.',
        },
        subscriptions: {
          title: '4. Abbonamenti e pagamenti',
          freePlan: {
            title: '4.1 Piano gratuito',
            text: 'Offriamo un piano gratuito con funzionalità limitate. Le limitazioni specifiche sono descritte nella nostra pagina Prezzi e possono cambiare di volta in volta.',
          },
          freeTrial: {
            title: '4.2 Prova gratuita',
            text: 'Possiamo offrire un periodo di prova gratuita per gli abbonamenti a pagamento. Al termine del periodo di prova, il tuo abbonamento si convertirà automaticamente in uno a pagamento a meno che tu non disdica prima che la prova scada. Devi fornire un metodo di pagamento valido per iniziare la prova gratuita.',
          },
          paid: {
            title: '4.3 Abbonamenti a pagamento',
            text: 'Gli abbonamenti a pagamento sono fatturati in anticipo su base ricorrente (mensile o annuale, a seconda del piano selezionato). Tutti i pagamenti sono elaborati tramite LemonSqueezy, il nostro gestore dei pagamenti di terze parti. Sottoscrivendo un abbonamento, ci autorizzi ad addebitare il metodo di pagamento selezionato.',
          },
          priceChanges: {
            title: '4.4 Modifiche dei prezzi',
            text: 'Possiamo modificare i prezzi degli abbonamenti in qualsiasi momento. Se aumentiamo il prezzo del tuo piano attuale, ti informeremo almeno 30 giorni prima che la modifica abbia effetto. Le modifiche dei prezzi si applicheranno all\'inizio del successivo periodo di fatturazione successivo al periodo di preavviso.',
          },
          taxes: {
            title: '4.5 Tasse',
            text: 'Tutti i prezzi includono l\'IVA applicabile per i clienti dell\'UE, come richiesto dalla legge. L\'aliquota IVA applicata dipende dal tuo paese di residenza.',
          },
          cancellation: {
            title: '4.6 Disdetta',
            text: 'Puoi disdire il tuo abbonamento in qualsiasi momento dalle impostazioni del tuo account o contattandoci. La disdetta avrà effetto alla fine del periodo di fatturazione in corso. Continuerai ad avere accesso alle funzionalità a pagamento fino alla fine di tale periodo. Non verranno forniti rimborsi parziali per il periodo residuo, salvo quanto previsto dalla legge.',
          },
        },
        aiFeatures: {
          title: '5. Uso delle funzionalità AI',
          intro: 'Morpheus fornisce assistenza alla scrittura basata sull\'intelligenza artificiale tramite modelli linguistici di terze parti. Utilizzando le Funzionalità AI, riconosci e accetti che:',
          items: [
            { strong: 'I contenuti generati dall\'AI sono di supporto, non autoritativi:', text: ' L\'AI genera suggerimenti, idee e bozze di testo in base ai tuoi prompt. Sei l\'unico responsabile della revisione, della modifica e della decisione sull\'utilizzo di qualsiasi contenuto generato dall\'AI.' },
            { strong: 'Nessuna garanzia di accuratezza:', text: ' Gli output dell\'AI possono contenere errori, incongruenze o contenuti inappropriati. Non garantiamo l\'accuratezza, la completezza o l\'idoneità del testo generato dall\'AI per le tue finalità specifiche.' },
            { strong: 'Originalità non garantita:', text: ' I modelli AI possono produrre testi che richiamano opere pubblicate esistenti. Non garantiamo che i contenuti generati dall\'AI siano liberi da somiglianze con opere di terzi. Sei responsabile di garantire che l\'opera finale non violi i diritti di proprietà intellettuale di altri.' },
            { strong: 'Trattamento dei dati per l\'inferenza AI:', text: ' I tuoi prompt e il contesto selezionato vengono trasmessi a OpenRouter e ai provider di modelli AI sottostanti per l\'elaborazione. Consulta la nostra ',
            linkText: 'Informativa sulla privacy', text2: ' per i dettagli sulle pratiche relative ai dati.' },
            { strong: 'Uso leale:', text: ' Non devi utilizzare le Funzionalità AI per generare contenuti illegali, dannosi, discriminatori, sessualmente espliciti che coinvolgono minori, o progettati per ingannare o manipolare. Ci riserviamo il diritto di sospendere gli account che utilizzino impropriamente le Funzionalità AI.' },
          ],
        },
        ip: {
          title: '6. Proprietà intellettuale',
          yourContent: {
            title: '6.1 I tuoi contenuti',
            text1: 'Conservi tutti i diritti di proprietà sui Contenuti che crei utilizzando il Servizio. Non rivendichiamo alcuna proprietà sui tuoi libri, storie, personaggi o altre opere creative.',
            text2: 'Utilizzando il Servizio, ci concedi una licenza limitata, non esclusiva e royalty-free per archiviare, elaborare e trasmettere i tuoi Contenuti esclusivamente allo scopo di fornirti il Servizio. Questa licenza termina quando elimini i tuoi Contenuti o chiudi il tuo account.',
          },
          ourIp: {
            title: '6.2 La nostra proprietà intellettuale',
            text: 'Il Servizio, inclusi il design, il codice, i loghi, i marchi e il software sottostante, ci appartiene ed è protetto dalle leggi sul copyright, sui marchi e altre leggi sulla proprietà intellettuale. Non puoi copiare, modificare, distribuire o creare opere derivate dalla nostra proprietà intellettuale senza il nostro espresso permesso scritto.',
          },
          aiRights: {
            title: '6.3 Diritti sui contenuti generati dall\'AI',
            text: 'Sei libero di utilizzare, modificare, pubblicare e distribuire i suggerimenti generati dall\'AI che incorpori nelle tue opere creative, fatto salvo il rispetto dei presenti Termini. Tuttavia, non garantiamo che otterrai la protezione del copyright per le parti generate dall\'AI della tua opera, poiché la status giuridico dei contenuti generati dall\'AI varia a seconda della giurisdizione ed è in evoluzione.',
          },
        },
        acceptableUse: {
          title: '7. Uso accettabile',
          intro: 'Accetti di non utilizzare il Servizio per:',
          items: [
            'Violare qualsiasi legge, regolamento o diritto di terzi applicabile;',
            'Caricare, archiviare o trasmettere contenuti illegali, dannosi, minacciosi, abusivi, molesti, diffamatori, osceni o altrimenti riprovevoli;',
            'Impersonare qualsiasi persona o entità, o dichiarare falsamente o tergiversare la tua affiliazione con una persona o entità;',
            'Tentare di ottenere l\'accesso non autorizzato al Servizio, agli account di altri utenti o ai nostri sistemi;',
            'Interferire con il Servizio o con i server collegati al Servizio o interromperne il funzionamento;',
            'Utilizzare sistemi automatizzati (bot, scraper) per accedere al Servizio senza il nostro permesso;',
            'Aggirare restrizioni di accesso, limiti di velocità o misure di sicurezza;',
            'Rivendere, sublicenziare o sfruttare commercialmente il Servizio senza autorizzazione;',
            'Utilizzare il Servizio per addestrare, sviluppare o migliorare modelli di intelligenza artificiale al di fuori delle funzionalità previste dal Servizio.',
          ],
          action: 'Ci riserviamo il diritto di indagare e adottare le misure appropriate contro qualsiasi utente che violi queste regole, inclusa la rimozione dei contenuti, la sospensione degli account e la segnalazione delle attività illegali alle autorità.',
        },
        termination: {
          title: '8. Risoluzione',
          byYou: {
            title: '8.1 Da parte tua',
            text: 'Puoi smettere di utilizzare il Servizio ed eliminare il tuo account in qualsiasi momento. L\'eliminazione dell\'account rimuoverà definitivamente i tuoi Contenuti dai sistemi attivi entro 30 giorni, fatto salvo gli obblighi di conservazione legale per i record di fatturazione.',
          },
          byUs: {
            title: '8.2 Da parte nostra',
            intro: 'Possiamo sospendere o terminare il tuo accesso al Servizio in qualsiasi momento, con o senza preavviso, se:',
            items: [
              'Viol i presenti Termini;',
              'Il tuo uso del Servizio comporta un rischio per la sicurezza o una responsabilità legale;',
              'Il tuo account è rimasto inattivo per un periodo prolungato (12 mesi o più);',
              'Discontinuiamo il Servizio o una parte di esso.',
            ],
            effect: 'Alla risoluzione, il tuo diritto di utilizzare il Servizio cessa immediatamente. Le disposizioni che per loro natura dovrebbero sopravvivere alla risoluzione sopravvivranno, inclusi i diritti di proprietà intellettuale, le esclusioni di garanzia e le limitazioni di responsabilità.',
          },
        },
        dpa: {
          title: '9. Accordo di trattamento dati (DPA)',
          intro: 'Ove tu utilizzi il Servizio per trattare dati personali per tuo conto o per conto di terzi, si applica il seguente Accordo di trattamento dati, che è incorporato nei presenti Termini per riferimento:',
          items: [
            { strong: '9.1 Trattamento su istruzioni:', text: ' Tratteremo i dati personali solo sulle tue istruzioni documentate, inclusi i trasferimenti di dati verso paesi terzi, salvo che sia richiesto dal diritto dell\'UE o degli Stati membri.' },
            { strong: '9.2 Riservatezza:', text: ' Garantiamo che le persone autorizzate al trattamento dei dati personali si siano impegnate alla riservatezza.' },
            { strong: '9.3 Sicurezza:', text: ' Adottiamo adeguate misure tecniche e organizzative per garantire un livello di sicurezza adeguato al rischio, come descritto nella nostra Informativa sulla privacy.' },
            { strong: '9.4 Sub-processor:', text: ' Utilizziamo sub-processor per fornire il Servizio, come elencato nella nostra Informativa sulla privacy. Manteniamo un elenco aggiornato dei sub-processor e ti informeremo di eventuali modifiche. Puoi opporti ai nuovi sub-processor chiudendo il tuo account.' },
            { strong: '9.5 Diritti degli interessati:', text: ' Ti assistiamo nel rispondere alle richieste degli interessati per esercitare i loro diritti ai sensi del GDPR, nella misura tecnicamente fattibile.' },
            { strong: '9.6 Notifica di violazione:', text: ' Ti informeremo senza ingiustificato ritardo non appena veniamo a conoscenza di qualsiasi violazione dei dati personali che ti riguardi.' },
            { strong: '9.7 Restituzione e cancellazione dei dati:', text: ' Alla chiusura del tuo account, cancelleremo o restituiremo tutti i dati personali, salvo ove il diritto dell\'UE o degli Stati membri richieda la conservazione.' },
            { strong: '9.8 Audit:', text: ' Ti metteremo a disposizione tutte le informazioni necessarie per dimostrare la conformità ai nostri obblighi ai sensi dell\'articolo 28 del GDPR, e consentiremo audit condotti da te o da un revisore da te mandato, salvo un preavviso ragionevole e obblighi di riservatezza.' },
          ],
        },
        disclaimers: {
          title: '10. Esclusioni di responsabilità e limitazione di responsabilità',
          asIs: {
            title: '10.1 Servizio fornito "così com\'è"',
            text: 'IL SERVIZIO VIENE FORNITO SU BASE "COSÌ COM\'È" E "COME DISPONIBILE", SENZA GARANZIE DI ALCUN TIPO, ESPRESSE O IMPLICITE, INCLUSE MA NON LIMITATE A GARANZIE DI COMMERCIABILITÀ, IDONEITÀ A UNO SCOPO PARTICOLARE, NON VIOLAZIONE O CORSO DI PRESTAZIONE.',
          },
          availability: {
            title: '10.2 Nessuna garanzia di disponibilità',
            text: 'Non garantiamo che il Servizio sarà ininterrotto, tempestivo, sicuro o privo di errori. Potremmo effettuare manutenzione, aggiornamenti o modifiche che interrompono temporaneamente il Servizio.',
          },
          backup: {
            title: '10.3 Nessuna garanzia di backup',
            text: 'Pur adoperandoci ragionevolmente per mantenere l\'integrità dei dati, non garantiamo che i tuoi Contenuti non possano andare persi, corrompersi o essere eliminati accidentalmente. Sei responsabile del mantenimento di backup del tuo lavoro importante.',
          },
          liability: {
            title: '10.4 Limitazione di responsabilità',
            text1: 'NELLA MASSIMA MISURA CONSENTITA DALLA LEGGE APPLICABILE, IN NESSUN CASO GIOVANNI DE CAPRIO SARÀ RESPONSABILE PER DANNI INDIRETTI, INCIDENTALI, SPECIALI, CONSEQUENZIALI O PUNITIVI, INCLUSI SENZA LIMITAZIONE LA PERDITA DI PROFITTI, DATI, USO, AVVIAMENTO O ALTRE PERDITE INTANGIBILI, DERIVANTI DALL\'ACCESSO O DALL\'USO DEL SERVIZIO O DALL\'IMPOSSIBILITÀ DI ACCEDERE O UTILIZZARE IL SERVIZIO.',
            text2: 'La nostra responsabilità totale nei tuoi confronti per tutti i reclami derivanti dai presenti Termini o dal Servizio non supererà l\'importo totale che ci hai pagato nei 12 mesi precedenti l\'evento che ha dato origine alla responsabilità, o 100 €, se maggiore.',
            text3: 'Nulla nei presenti Termini limita o esclude la nostra responsabilità per morte o lesioni personali causate da negligenza, frode o dichiarazione fraudolenta, o qualsiasi altra responsabilità che non possa essere limitata o esclusa ai sensi della legge applicabile.',
          },
        },
        indemnification: {
          title: '11. Indennizzo',
          text: 'Accetti di indennizzare, difendere e manlevare Giovanni de Caprio da e contro qualsiasi reclamo, responsabilità, danni, perdite e spese (incluse le ragionevoli spese legali) derivanti o in qualsiasi modo collegati al tuo accesso o utilizzo del Servizio, ai tuoi Contenuti, alla tua violazione dei presenti Termini o alla tua violazione di qualsiasi diritto di terzi.',
        },
        governingLaw: {
          title: '12. Legge applicabile e risoluzione delle controversie',
          text1: 'I presenti Termini sono regolati e interpretati in conformità con le leggi dell\'',
          country: 'Italia',
          text2: ', senza riguardo alle sue disposizioni in materia di conflitto di leggi.',
          text3: 'Qualsiasi controversia derivante dai presenti Termini o dal Servizio sarà inizialmente oggetto di tentativo di risoluzione tramite negoziazione di buona fede. Se la negoziazione non riesce, la controversia sarà sottoposta alla giurisdizione esclusiva dei tribunali di ',
          jurisdiction: 'Roma, Italia',
          text4: '.',
          odr: 'Se sei un consumatore residente nell\'Unione Europea, hai anche il diritto di accedere alla piattaforma europea per la risoluzione delle controversie online (ODR) all\'indirizzo ',
          odrLink: 'ec.europa.eu/consumers/odr',
        },
        changes: {
          title: '13. Modifiche ai presenti Termini',
          text: 'Possiamo modificare i presenti Termini in qualsiasi momento. Se apportiamo modifiche sostanziali, ti informeremo via email o pubblicando un avviso sul Servizio almeno 30 giorni prima che le modifiche abbiano effetto. Il tuo uso continuato del Servizio dopo l\'entrata in vigore delle modifiche costituisce accettazione dei Termini revisionati.',
        },
        severability: {
          title: '14. Divisibilità',
          text: 'Se una qualsiasi disposizione dei presenti Termini viene dichiarata invalida, illegale o inapplicabile da un tribunale competente, tale disposizione sarà separata e le restanti disposizioni continueranno ad avere pieno effetto.',
        },
        entireAgreement: {
          title: '15. Accordo completo',
          text1: 'I presenti Termini, insieme alla nostra ',
          privacyLink: 'Informativa sulla privacy',
          text2: ' e alla ',
          cookieLink: 'Cookie Policy',
          text3: ', costituiscono l\'accordo completo tra te e noi riguardo al Servizio e sostituiscono tutti gli accordi, le intese e le comunicazioni precedenti.',
        },
        contact: {
          title: '16. Informazioni di contatto',
          name: 'Giovanni de Caprio',
          businessType: 'Ditta Individuale — P.IVA 18340151002',
          address: 'Via Gaspare Gozzi 113, 00145 Roma (RM), Italia',
          emailLabel: 'Email: ',
        },
      },
      refundPolicy: {
        title: 'Politica di rimborso e recesso',
        lastUpdated: '25 maggio 2026',
        notice: 'IMPORTANTE: La presente Politica di rimborso e recesso è fornita a scopo informativo. È concepita per riflettere le norme di protezione dei consumatori dell\'UE e il diritto italiano dei consumatori. Per consulenza legale specifica alla tua situazione, rivolgiti a un professionista legale qualificato.',
        intro1: 'La presente Politica di rimborso e recesso si applica a tutti gli abbonamenti a pagamento e ai servizi acquistati tramite Morpheus da consumatori (B2C) nell\'Unione Europea e nel mondo. È concepita per conformarsi alla Direttiva europea sui diritti dei consumatori (2011/83/UE) e alla normativa italiana di protezione dei consumatori.',
        intro2: 'Sottoscrivendo un piano a pagamento, riconosci di aver letto, compreso e accettato la presente politica.',
        freePlan: {
          title: '1. Piano gratuito',
          text: 'Morpheus offre un piano gratuito con funzionalità limitate e senza costi. Non sono richieste informazioni di pagamento per utilizzare il piano gratuito. Puoi utilizzare il piano gratuito a tempo indeterminato, soggetto alle limitazioni descritte nella nostra pagina Prezzi.',
        },
        freeTrial: {
          title: '2. Prova gratuita',
          intro: 'Possiamo offrire un periodo di prova gratuita (tipicamente 7 giorni) per i nostri piani di abbonamento a pagamento. Durante la prova:',
          items: [
            'Avrai accesso completo alle funzionalità del piano selezionato.',
            'Devi fornire un metodo di pagamento valido per iniziare la prova.',
            'Al termine del periodo di prova, il tuo abbonamento si convertirà automaticamente in uno a pagamento a meno che tu non disdica almeno 24 ore prima che la prova scada.',
            'Non ti sarà addebitato alcun importo se disdici prima della fine del periodo di prova.',
          ],
          reminder: 'Ti invieremo un promemoria via email prima che la prova si converta in un abbonamento a pagamento.',
        },
        withdrawal: {
          title: '3. Diritto di recesso UE di 14 giorni',
          intro: 'Se sei un consumatore residente nell\'Unione Europea, hai un diritto di recesso statutario dal contratto di abbonamento entro 14 giorni dalla data di conclusione del contratto, senza dover fornire alcuna motivazione e senza incorrere in costi diversi da quelli previsti dalla legge.',
          digitalServices: {
            title: '3.1 Come funziona il diritto di recesso per i servizi digitali',
            intro: 'Il Servizio è un servizio digitale che inizia ad essere prestato immediatamente dopo l\'abbonamento. Poiché i contenuti e i servizi digitali vengono consumati istantaneamente e non possono essere "restituiti" in senso tradizionale, la Direttiva europea sui diritti dei consumatori prevede regole specifiche:',
            items: [
              'Se non hai utilizzato il Servizio durante il periodo di recesso di 14 giorni, hai diritto a un rimborso completo.',
              'Se hai utilizzato il Servizio (ad es. effettuato l\'accesso alla dashboard, creato o modificato contenuti, utilizzato le funzionalità AI o comunque accesso a funzionalità a pagamento), potremmo detrarre un importo proporzionale dal tuo rimborso per coprire il valore del servizio consumato.',
              'Tuttavia, puoi rinunciare al tuo diritto di recesso esprimendo il consenso alla prestazione immediata al momento dell\'abbonamento. Vedi la Sezione 3.2 di seguito.',
            ],
          },
          waiver: {
            title: '3.2 Rinuncia al diritto di recesso',
            intro: 'Durante il processo di pagamento, ti sarà richiesto di spuntare una casella che conferma quanto segue:',
            quote: '"Richiedo espressamente l\'accesso immediato al Servizio e riconosco che, una volta iniziato a utilizzare il Servizio, perderò il mio diritto di recesso statutario di 14 giorni ai sensi della normativa europea di protezione dei consumatori. Capisco che i rimborsi saranno erogati solo nelle circostanze descritte nella Politica di rimborso."',
            consent: 'Spuntando questa casella e completando l\'acquisto, acconsenti esplicitamente alla prestazione immediata del contratto e riconosci che il tuo diritto di recesso verrà meno una volta iniziato a utilizzare il Servizio. Si tratta di una pratica standard e legalmente riconosciuta per gli abbonamenti a servizi digitali ai sensi del diritto dell\'UE.',
          },
          exercise: {
            title: '3.3 Come esercitare il diritto di recesso',
            intro: 'Per esercitare il tuo diritto di recesso, devi informarci della tua decisione con una dichiarazione inequivocabile. Puoi utilizzare il modulo di recesso tipo di seguito o semplicemente inviarci un\'email:',
            emailLabel: 'Email: ',
            include: 'Includi: nome, indirizzo email, data di abbonamento e una chiara dichiarazione di voler recedere.',
            timing: 'Il periodo di recesso scade 14 giorni dopo la data di conclusione del contratto. In caso di recesso, ti rimborseremo tutti i pagamenti ricevuti senza indebito ritardo e in ogni caso non oltre 14 giorni dal giorno in cui siamo informati della tua decisione di recedere.',
          },
        },
        voluntary: {
          title: '4. La nostra politica di rimborso volontaria',
          intro: 'Anche laddove il diritto di recesso statutario non si applichi, offriamo i seguenti rimborsi volontari come segno di buona fede:',
          minimalUsage: {
            title: '4.1 Entro 14 giorni dal primo pagamento (uso minimo o nullo)',
            text: 'Se richiedi un rimborso entro 14 giorni dal primo pagamento dell\'abbonamento a pagamento e hai fatto un uso minimo o nullo del Servizio, emetteremo un rimborso completo. Per "uso minimo" si intende che non hai utilizzato in modo significativo le funzionalità a pagamento (ad es. non hai creato o modificato contenuti nell\'app dopo l\'abbonamento). Lo verifichiamo attraverso i nostri record di database.',
          },
          technical: {
            title: '4.2 Problemi tecnici o indisponibilità del servizio',
            text: 'Se riscontri problemi tecnici significativi che ti impediscono di utilizzare il Servizio per un periodo prolungato (più di 48 ore consecutive) a causa di problemi dalla nostra parte, puoi richiedere un rimborso proporzionato per il periodo di inutilizzabilità. Ciò non si applica a problemi causati dalla tua connessione Internet, dal tuo dispositivo o da servizi di terze parti al di fuori del nostro controllo.',
          },
          duplicate: {
            title: '4.3 Addebiti duplicati o errati',
            text: 'Se ti è stato addebitato due volte lo stesso periodo di abbonamento o addebitato per errore, rimborseremo l\'importo duplicato o errato per intero dopo verifica.',
          },
          noRefunds: {
            title: '4.4 Non sono previsti rimborsi per',
            items: [
              'Abbonamenti che sono stati utilizzati attivamente oltre un test minimo dopo i primi 14 giorni.',
              'Mesi parziali — non forniamo rimborsi proporzionati per i giorni non utilizzati all\'interno di un ciclo di fatturazione (salvo quanto specificato nella Sezione 4.2).',
              'Rinunce dopo un uso significativo del Servizio.',
              'Mancata disdetta prima della data di rinnovo — è tua responsabilità gestire il tuo abbonamento.',
            ],
          },
        },
        cancellation: {
          title: '5. Procedura di disdetta',
          intro: 'Puoi disdire il tuo abbonamento in qualsiasi momento:',
          items: [
            'Tramite le impostazioni del tuo account nell\'app Morpheus (quando disponibile).',
            'Scrivendoci a ',
          ],
          email: 'hello@morpheusink.com',
          itemEnd: ' con l\'indirizzo email del tuo account.',
          effect: 'La disdetta avrà effetto alla fine del periodo di fatturazione in corso. Continuerai ad avere accesso alle funzionalità a pagamento fino a quella data. Non sono previsti rimborsi parziali per il periodo residuo, salvo quanto specificato sopra.',
          easy: 'La disdetta deve essere semplice quanto l\'abbonamento. In conformità con le norme di protezione dei consumatori dell\'UE e con il Digital Services Act, non renderemo mai la disdetta più difficile dell\'iscrizione. Non ci sono penali di disdetta.',
        },
        refundMethod: {
          title: '6. Modalità e tempistiche di rimborso',
          text: 'Tutti i rimborsi verranno emessi sul metodo di pagamento originale utilizzato per l\'acquisto. I rimborsi di solito appaiono entro 5-10 giorni lavorativi, a seconda del provider di pagamento. Non siamo responsabili per i ritardi causati da banche o gestori di pagamenti.',
        },
        modelForm: {
          title: '7. Modulo di recesso tipo',
          intro: 'In conformità all\'Allegato I, parte B della Direttiva europea sui diritti dei consumatori, puoi utilizzare il seguente modulo per esercitare il tuo diritto di recesso (copia e incolla in un\'email):',
          form: `A: Giovanni de Caprio
Email: hello@morpheusink.com
Indirizzo: Via Gaspare Gozzi 113, 00145 Roma (RM), Italia

Con la presente comunico che recedo dal mio contratto di vendita / abbonamento per la fornitura del seguente servizio:

Servizio: Abbonamento Morpheus [Nome piano]
Ordinato il: [Data]
Email account: [Il tuo indirizzo email]

Nome del consumatore: [Nome e cognome]
Indirizzo del consumatore: [Indirizzo]

Data: [Data]

Firma: (solo se questo modulo è notificato su carta)`,
          note: 'Non sei tenuto a utilizzare questo modulo. Qualsiasi chiara dichiarazione della tua decisione di recedere inviata al nostro indirizzo email è sufficiente.',
        },
        nonEu: {
          title: '8. Clienti extra-UE',
          text: 'Se non sei un consumatore residente nell\'Unione Europea, si applica la nostra politica di rimborso volontaria (Sezione 4). Il diritto di recesso statutario di 14 giorni descritto nella Sezione 3 è un requisito di protezione dei consumatori dell\'UE e potrebbe non applicarsi nella tua giurisdizione. Tuttavia, ci impegniamo a trattare tutti i clienti in modo equo, indipendentemente dalla località.',
        },
        contact: {
          title: '9. Contattaci',
          intro: 'Se hai domande su rimborsi, recessi o disdette, contattaci:',
          name: 'Giovanni de Caprio',
          emailLabel: 'Email: ',
          address: 'Via Gaspare Gozzi 113, 00145 Roma (RM), Italia',
          response: 'Ci impegniamo a rispondere a tutte le richieste di rimborso entro 2 giorni lavorativi.',
        },
      },
      cookiePolicy: {
        title: 'Cookie Policy',
        lastUpdated: '25 maggio 2026',
        notice: 'IMPORTANTE: La presente Cookie Policy è fornita a scopo informativo. Riflette il nostro approccio all\'uso di cookie e tecnologie di tracciamento ai sensi del diritto dell\'UE e italiano. Per consulenza legale specifica alla tua situazione, rivolgiti a un professionista qualificato in materia di privacy.',
        intro1: 'La presente Cookie Policy spiega come ',
        intro1Strong: 'Giovanni de Caprio',
        intro2: ' ("noi", "ci", "nostro"), gestore del Servizio Morpheus, utilizza cookie e tecnologie di tracciamento simili quando visiti il nostro sito web e utilizzi i nostri servizi.',
        intro3: 'Questa politica è concepita per aiutarti a capire cosa sono i cookie, come li utilizziamo e quali scelte hai riguardo al loro uso. Ci conformiamo alla Direttiva ePrivacy (2002/58/CE, come modificata dalla 2009/136/CE) e al Regolamento generale sulla protezione dei dati (GDPR).',
        whatAre: {
          title: '1. Cosa sono i cookie?',
          text1: 'I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo (computer, tablet o cellulare) quando visiti un sito web. Sono ampiamente utilizzati per far funzionare i siti web in modo più efficiente, nonché per fornire informazioni ai proprietari del sito. I cookie possono essere "cookie di sessione" (che vengono eliminati quando chiudi il browser) o "cookie persistenti" (che rimangono sul tuo dispositivo per un periodo stabilito o finché non li elimini).',
          text2: 'Oltre ai cookie, possiamo utilizzare altre tecnologie simili come local storage, session storage e pixel tag per raggiungere scopi analoghi.',
        },
        howWeUse: {
          title: '2. Come utilizziamo i cookie',
          intro: 'Utilizziamo i cookie per le seguenti finalità:',
          essential: {
            title: '2.1 Cookie essenziali',
            intro: 'Questi cookie sono strettamente necessari per il funzionamento del Servizio e non possono essere disabilitati. Includono:',
            items: [
              { strong: 'Cookie di autenticazione:', text: ' mantengono la tua sessione di accesso e ti tengono collegato.' },
              { strong: 'Cookie di sicurezza:', text: ' aiutano a rilevare e prevenire minacce alla sicurezza e abusi.' },
              { strong: 'Cookie di sessione:', text: ' abilitano le funzionalità principali come la navigazione e l\'accesso alle aree sicure.' },
              { strong: 'Cookie di preferenze:', text: ' ricordano le tue impostazioni come la modalità scura/chiara e le preferenze di lingua.' },
            ],
          },
          analytics: {
            title: '2.2 Cookie analitici (opzionali)',
            text1: 'Questi cookie ci aiutano a capire come i visitatori interagiscono con il nostro sito web raccogliendo e riportando informazioni in forma anonima. Attualmente non utilizziamo cookie analitici, ma potremmo implementarli in futuro (ad es. Google Analytics). Ti verrà richiesto un consenso esplicito prima che vengano installati cookie analitici.',
            text2: 'Se abilitati, i cookie analitici raccoglierebbero informazioni come: pagine visitate, tempo trascorso sul sito, fonti di riferimento e posizione geografica approssimativa (a livello di città/paese). Questi dati ci aiutano a migliorare il Servizio.',
          },
          marketing: {
            title: '2.3 Cookie di marketing (opzionali)',
            text: 'Questi cookie vengono utilizzati per tracciare i visitatori attraverso i siti web al fine di visualizzare annunci pubblicitari pertinenti. Attualmente non utilizziamo cookie di marketing e non mostriamo annunci pubblicitari di terze parti sul nostro Servizio.',
          },
        },
        cookiesWeUse: {
          title: '3. Cookie che utilizziamo',
          headers: {
            name: 'Nome',
            provider: 'Provider',
            purpose: 'Finalità',
            duration: 'Durata',
            type: 'Tipo',
          },
          rows: [
            { name: 'morpheus_cookie_consent', provider: 'Morpheus', purpose: 'Memorizza le tue preferenze sui cookie', duration: '12 mesi', type: 'Essenziale' },
            { name: 'a_session_*', provider: 'Appwrite', purpose: 'Gestione della sessione di autenticazione', duration: 'Sessione', type: 'Essenziale' },
            { name: 'theme', provider: 'Morpheus', purpose: 'Memorizza la preferenza modalità scura/chiara', duration: 'Persistente', type: 'Essenziale' },
            { name: '_ga', provider: 'Google Analytics', purpose: 'Distingue gli utenti unici (attualmente non attivo)', duration: '2 anni', type: 'Analitico' },
            { name: '_gid', provider: 'Google Analytics', purpose: 'Distingue gli utenti per sessione (attualmente non attivo)', duration: '24 ore', type: 'Analitico' },
          ],
          note: 'I cookie contrassegnati come "attualmente non attivi" sono elencati per trasparenza, ma non vengono installati sul tuo dispositivo a meno che non acconsenta esplicitamente ai cookie analitici in futuro.',
        },
        thirdParty: {
          title: '4. Cookie di terze parti',
          intro: 'Oltre ai nostri cookie, potremmo utilizzare cookie di fornitori di servizi di terze parti:',
          items: [
            { strong: 'Appwrite:', text: ' il nostro provider di autenticazione e database potrebbe impostare cookie di sessione per gestire il tuo stato di accesso.' },
            { strong: 'LemonSqueezy:', text: ' il nostro gestore dei pagamenti potrebbe impostare cookie durante il processo di pagamento per gestire le sessioni di pagamento e prevenire frodi.' },
            { strong: 'Google Analytics:', text: ' potrebbe impostare cookie se acconsenti al tracciamento analitico in futuro.' },
          ],
          ownPolicies: 'Queste terze parti hanno le proprie politiche sulla privacy e sui cookie. Ti invitiamo a consultarle:',
          links: [
            { text: 'Informativa sulla privacy di Appwrite', href: 'https://appwrite.io/privacy' },
            { text: 'Informativa sulla privacy di LemonSqueezy', href: 'https://www.lemonsqueezy.com/privacy' },
            { text: 'Cookie Policy di Google', href: 'https://policies.google.com/technologies/cookies' },
          ],
        },
        manage: {
          title: '5. Come gestire le tue preferenze sui cookie',
          intro: 'Hai diverse opzioni per gestire i cookie:',
          banner: {
            title: '5.1 Il nostro banner dei cookie',
            text: 'Quando visiti il nostro sito web per la prima volta, vedrai un banner dei cookie che ti consente di accettare o rifiutare i cookie non essenziali. Puoi anche personalizzare le tue preferenze per categoria. Puoi aggiornare le tue preferenze in qualsiasi momento cliccando sul link "Impostazioni cookie" nel footer del nostro sito web.',
          },
          browser: {
            title: '5.2 Impostazioni del browser',
            text1: 'La maggior parte dei browser web ti consente di controllare i cookie dalle proprie impostazioni. In genere puoi:',
            items: [
              'Visualizzare i cookie memorizzati sul tuo dispositivo',
              'Eliminare tutti o specifici cookie',
              'Bloccare l\'installazione dei cookie',
              'Bloccare i cookie di terze parti',
              'Ricevere una notifica prima che venga installato un cookie',
            ],
            text2: 'Tieni presente che disabilitare i cookie essenziali potrebbe impedirti di utilizzare alcune funzionalità del Servizio, incluso l\'accesso.',
            text3: 'Ecco i link alle istruzioni per la gestione dei cookie per i browser più comuni:',
            links: [
              { text: 'Google Chrome', href: 'https://support.google.com/chrome/answer/95647' },
              { text: 'Mozilla Firefox', href: 'https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop' },
              { text: 'Apple Safari', href: 'https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471' },
              { text: 'Microsoft Edge', href: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
            ],
          },
          optOut: {
            title: '5.3 Strumenti di opt-out del settore',
            text: 'Puoi anche optare per la pubblicità basata sugli interessi attraverso programmi di autoregolamentazione del settore:',
            links: [
              { text: 'Digital Advertising Alliance (DAA)', href: 'https://optout.aboutads.info' },
              { text: 'European Interactive Digital Advertising Alliance (EDAA)', href: 'https://youronlinechoices.eu' },
            ],
          },
        },
        localStorage: {
          title: '6. Local storage e tecnologie simili',
          intro: 'Oltre ai cookie, utilizziamo il local storage e il session storage del browser per memorizzare determinati dati localmente sul tuo dispositivo:',
          items: [
            { strong: 'Stato dell\'applicazione:', text: ' memorizziamo le preferenze dell\'interfaccia e i dati temporanei dell\'applicazione nel local storage per migliorare le prestazioni.' },
            { strong: 'Dati offline:', text: ' i tuoi contenuti di scrittura sono principalmente memorizzati nell\'IndexedDB del tuo browser (tramite Dexie.js) per la funzionalità local-first. Questi dati rimangono sul tuo dispositivo e non vengono trasmessi ai nostri server se non per backup e sincronizzazione.' },
            { strong: 'Cache:', text: ' potremmo memorizzare in cache alcune risorse per ridurre i tempi di caricamento.' },
          ],
          text2: 'A differenza dei cookie, i dati memorizzati nel local storage e nel session storage non vengono inviati automaticamente al server con ogni richiesta. Sono accessibili solo dal JavaScript in esecuzione sul nostro sito web.',
        },
        consentRecords: {
          title: '7. Record di consenso ai cookie',
          intro: 'In conformità all\'articolo 7 del GDPR, manteniamo record del tuo consenso ai cookie, inclusi:',
          items: [
            'La data e l\'ora in cui hai fornito il consenso',
            'Le specifiche categorie di cookie a cui hai acconsentito',
            'La versione della nostra cookie policy in vigore al momento',
            'Il tuo indirizzo IP (anonimizzato ove possibile)',
          ],
          text2: 'Questi record sono conservati in modo sicuro e utilizzati esclusivamente per dimostrare la conformità alle leggi applicabili. Sono conservati per 12 mesi o fino all\'aggiornamento delle tue preferenze.',
        },
        changes: {
          title: '8. Modifiche alla presente Cookie Policy',
          text: 'Potremmo aggiornare la presente Cookie Policy di tanto in tanto per riflettere modifiche tecnologiche, legislative o delle nostre pratiche sui dati. Se apportiamo modifiche sostanziali, ti informeremo attraverso il nostro banner dei cookie o pubblicando un avviso sul Servizio. La data "Ultimo aggiornamento" in cima a questa pagina indica quando la politica è stata revisionata l\'ultima volta.',
        },
        contact: {
          title: '9. Contattaci',
          intro: 'Se hai domande sul nostro uso dei cookie o sulla presente Cookie Policy, contattaci:',
          name: 'Giovanni de Caprio',
          emailLabel: 'Email: ',
          address: 'Via Gaspare Gozzi 113, 00145 Roma (RM), Italia',
        },
      },
    },
  },
} as const;

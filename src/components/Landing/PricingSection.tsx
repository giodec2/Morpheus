import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Check, X, ChevronDown, KeyRound, Loader2, Zap, Sparkles, Star, Crown, Music } from 'lucide-react';
import { useLocation } from 'wouter';
import { useI18n } from '@/i18n/useI18n';
import { useAuthStore } from '@/stores/authStore';
import { useLemonSqueezy } from '@/hooks/useLemonSqueezy';
import { createCheckout, getVariantIdForTier } from '@/services/billing';
import { toast } from '@/components/common/Toast';
import Reveal from './Reveal';

interface TierFeature {
  key: string;
  count?: string;
  included: boolean;
}

interface TierAccent {
  icon: typeof Zap;
  iconBg: string;
  iconColor: string;
  topBar: string;
  checkBg: string;
  checkColor: string;
  cta: string;
  nameColor: string;
  border: string;
  /** Subtle card background wash — light mode only. */
  gradient: string;
}

// Tier definitions, prices and per-tier accents for the pricing chapter.
const tiers: {
  name: string;
  price: number;
  annualPrice?: number;
  annualDiscount?: number;
  descKey: string;
  badge?: 'popular';
  features: TierFeature[];
}[] = [
  {
    name: 'Free',
    price: 0,
    descKey: 'landing.pricing.tierFreeDesc',
    features: [
      { key: 'oneBook', included: true },
      { key: 'bringYourOwnKey', included: true },
      { key: 'tokensStandard', count: '50k', included: true },
      { key: 'cloudSync', included: true },
      { key: 'upToBooks', count: '3', included: false },
      { key: 'premiumTokens', included: false },
      { key: 'newFeaturesFirst', included: false },
      { key: 'genreAssistance', included: false },
      { key: 'echoBeta', included: false },
      { key: 'prioritySupport', included: false },
    ],
  },
  {
    name: 'Scribe',
    price: 9,
    annualPrice: 96,
    annualDiscount: 11,
    descKey: 'landing.pricing.tierScribeDesc',
    features: [
      { key: 'upToBooks', count: '3', included: true },
      { key: 'bringYourOwnKey', included: true },
      { key: 'tokensStandard', count: '500k', included: true },
      { key: 'cloudSync', included: true },
      { key: 'premiumTokens', included: false },
      { key: 'newFeaturesFirst', included: false },
      { key: 'genreAssistance', included: false },
      { key: 'echoBeta', included: false },
      { key: 'prioritySupport', included: false },
    ],
  },
  {
    name: 'Novelist',
    price: 19,
    annualPrice: 192,
    annualDiscount: 16,
    descKey: 'landing.pricing.tierNovelistDesc',
    badge: 'popular',
    features: [
      { key: 'upToBooks', count: '10', included: true },
      { key: 'bringYourOwnKey', included: true },
      { key: 'tokensStandard', count: '1M', included: true },
      { key: 'tokensPremium', count: '50k', included: true },
      { key: 'cloudSync', included: true },
      { key: 'newFeaturesFirst', included: true },
      { key: 'genreAssistance', included: true },
      { key: 'echoBeta', included: false },
      { key: 'prioritySupport', included: false },
    ],
  },
  {
    name: 'Architect',
    price: 49,
    annualPrice: 468,
    annualDiscount: 20,
    descKey: 'landing.pricing.tierArchitectDesc',
    features: [
      { key: 'unlimitedBooks', included: true },
      { key: 'bringYourOwnKey', included: true },
      { key: 'tokensStandard', count: '5M', included: true },
      { key: 'tokensPremium', count: '500k', included: true },
      { key: 'cloudSync', included: true },
      { key: 'newFeaturesFirst', included: true },
      { key: 'genreAssistance', included: true },
      { key: 'echoBeta', included: true },
      { key: 'prioritySupport', included: true },
    ],
  },
];

const tierOrder = ['free', 'scribe', 'novelist', 'architect'];

const accents: Record<string, TierAccent> = {
  Free: {
    icon: Zap,
    iconBg: 'bg-gray-100 dark:bg-slate-800',
    iconColor: 'text-gray-500 dark:text-gray-400',
    topBar: 'from-gray-300 to-gray-400',
    checkBg: 'bg-gray-100 dark:bg-slate-800',
    checkColor: 'text-gray-500 dark:text-gray-400',
    cta: 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300',
    nameColor: 'text-gray-700 dark:text-gray-300',
    border: 'border-gray-200 dark:border-slate-800',
    gradient: 'from-gray-100 to-gray-50',
  },
  Scribe: {
    icon: Sparkles,
    iconBg: 'bg-primary-100 dark:bg-primary-900/30',
    iconColor: 'text-primary-600 dark:text-primary-400',
    topBar: 'from-primary-400 via-teal-400 to-primary-500',
    checkBg: 'bg-primary-100 dark:bg-primary-900/30',
    checkColor: 'text-primary-600 dark:text-primary-400',
    cta: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/25',
    nameColor: 'text-primary-600 dark:text-primary-400',
    border: 'border-primary-300 dark:border-primary-700',
    gradient: 'from-primary-50 to-white',
  },
  Novelist: {
    icon: Star,
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    topBar: 'from-amber-400 via-orange-400 to-amber-500',
    checkBg: 'bg-amber-100 dark:bg-amber-900/30',
    checkColor: 'text-amber-600 dark:text-amber-400',
    cta: 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25',
    nameColor: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-300 dark:border-amber-600',
    gradient: 'from-amber-50 to-white',
  },
  Architect: {
    icon: Crown,
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    topBar: 'from-purple-400 via-pink-400 to-purple-500',
    checkBg: 'bg-purple-100 dark:bg-purple-900/30',
    checkColor: 'text-purple-600 dark:text-purple-400',
    cta: 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25',
    nameColor: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-300 dark:border-purple-700',
    gradient: 'from-purple-100 to-white',
  },
};

const maestroAccent = {
  iconBg: 'bg-rose-100 dark:bg-rose-900/30',
  iconColor: 'text-rose-600 dark:text-rose-400',
  topBar: 'from-rose-400 via-pink-400 to-rose-500',
  cta: 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/25',
  nameColor: 'text-rose-600 dark:text-rose-400',
  border: 'border-rose-300 dark:border-rose-700',
  gradient: 'from-rose-50 to-white',
};

function useTierCheckout(tierName: string) {
  const { t } = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const { openCheckout } = useLemonSqueezy();
  const [, setLocation] = useLocation();

  const handleCheckout = async (isAnnual: boolean) => {
    if (tierName === 'Free' || !user) {
      setLocation('/app');
      return;
    }
    const variantId = getVariantIdForTier(tierName.toLowerCase(), isAnnual ? 'annual' : 'monthly');
    if (!variantId) {
      toast(t('landing.pricing.paymentNotConfigured'), 'error');
      return;
    }
    setIsLoading(true);
    try {
      const url = await createCheckout(variantId, t as (key: string) => string);
      openCheckout(url);
    } catch (err) {
      toast(err instanceof Error ? err.message : t('landing.pricing.checkoutError'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCheckout };
}

/** Animated monthly/annual toggle — sliding pill measured from the active button. */
function BillingToggle({ isAnnual, onChange }: { isAnnual: boolean; onChange: (v: boolean) => void }) {
  const { t } = useI18n();
  const monthlyRef = useRef<HTMLButtonElement>(null);
  const annualRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 });

  const measure = useCallback(() => {
    const active = isAnnual ? annualRef.current : monthlyRef.current;
    const parent = containerRef.current;
    if (active && parent) {
      const parentRect = parent.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      setPillStyle({ width: activeRect.width, left: activeRect.left - parentRect.left });
    }
  }, [isAnnual]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center p-1 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700"
    >
      <div
        className={`absolute top-1 bottom-1 rounded-lg transition-all duration-300 ease-out ${
          isAnnual
            ? 'bg-primary-600 dark:bg-primary-500 shadow-lg shadow-primary-500/40'
            : 'bg-white dark:bg-slate-700 shadow-sm'
        }`}
        style={{ width: pillStyle.width, left: pillStyle.left }}
      />
      <button
        ref={monthlyRef}
        onClick={() => onChange(false)}
        className={`relative z-10 px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 whitespace-nowrap cursor-pointer ${
          !isAnnual
            ? 'text-gray-900 dark:text-white'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        {t('landing.pricing.monthly')}
      </button>
      <button
        ref={annualRef}
        onClick={() => onChange(true)}
        className={`relative z-10 px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 whitespace-nowrap cursor-pointer ${
          isAnnual
            ? 'text-white'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        {t('landing.pricing.annual')}
      </button>
    </div>
  );
}

function Price({
  price,
  annualPrice,
  annualDiscount,
  isAnnual,
}: {
  price: number;
  annualPrice?: number;
  annualDiscount?: number;
  isAnnual: boolean;
}) {
  const { t } = useI18n();
  if (price === 0) {
    return (
      <div>
        <span className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
          {t('landing.pricing.freeLabel')}
        </span>
        <p className="text-[11px] text-gray-400 mt-1">{t('landing.pricing.foreverFree')}</p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span
          key={isAnnual ? 'annual' : 'monthly'}
          className="text-3xl font-black tracking-tight text-gray-900 dark:text-white tabular-nums animate-in fade-in zoom-in-95 duration-300"
        >
          €{isAnnual ? Math.round((annualPrice ?? 0) / 12) : price}
        </span>
        <span className="text-sm text-gray-400">{t('landing.pricing.perMonth')}</span>
        <span
          className={`text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full transition-all duration-300 ${
            isAnnual ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
          }`}
        >
          {t('landing.pricing.save', { percent: annualDiscount ?? 0 })}
        </span>
      </div>
      <p className="text-[11px] text-gray-400 mt-1">
        {isAnnual
          ? t('landing.pricing.billedAnnually', { price: annualPrice ?? 0 })
          : t('landing.pricing.billedMonthly')}
      </p>
    </div>
  );
}

function FeatureList({ features, accent }: { features: TierFeature[]; accent: TierAccent }) {
  const { t } = useI18n();
  return (
    <ul className="space-y-1.5 mb-4 flex-1">
      {features.map((f) => (
        <li key={f.key} className="flex items-start gap-2">
          {f.included ? (
            <span className={`w-[18px] h-[18px] rounded-full ${accent.checkBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <Check className={`w-3 h-3 ${accent.checkColor}`} />
            </span>
          ) : (
            <span className="w-[18px] h-[18px] rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
              <X className="w-3 h-3 text-gray-300 dark:text-gray-600" />
            </span>
          )}
          <span className={`text-[13px] leading-snug ${f.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'}`}>
            {t(`landing.pricing.features.${f.key}` as never, f.count ? { count: f.count } : undefined)}
          </span>
        </li>
      ))}
    </ul>
  );
}

function TierCard({ tier, isAnnual, delay }: { tier: (typeof tiers)[number]; isAnnual: boolean; delay: number }) {
  const { t } = useI18n();
  const { isLoading, handleCheckout } = useTierCheckout(tier.name);
  const { profile } = useAuthStore();
  const currentTier = profile?.subscriptionTier ?? 'free';
  const isCurrent = tier.name.toLowerCase() === currentTier;
  const isIncluded = tierOrder.indexOf(tier.name.toLowerCase()) < tierOrder.indexOf(currentTier);
  const accent = accents[tier.name];

  return (
    <Reveal delay={delay} className="h-full">
      <div className="relative h-full">
        {tier.badge === 'popular' && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-amber-400 shadow-md shadow-amber-500/20 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full whitespace-nowrap">
            {t('states.popular')}
          </span>
        )}
        <div
          className={`relative flex flex-col h-full rounded-2xl border-2 bg-gradient-to-b ${accent.gradient} dark:bg-none dark:bg-slate-900 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-900/5 dark:hover:shadow-black/30 ${
            isCurrent ? 'border-emerald-500 dark:border-emerald-600' : accent.border
          }`}
        >
          <div className={`h-1 bg-gradient-to-r ${accent.topBar}`} />

          <div className="flex flex-col flex-1 p-5">
            {/* Icon + name */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className={`w-9 h-9 rounded-xl ${accent.iconBg} flex items-center justify-center flex-shrink-0`}>
                <accent.icon className={`w-[18px] h-[18px] ${accent.iconColor}`} />
              </span>
              <div>
                <h3 className={`font-serif text-lg font-semibold leading-tight ${accent.nameColor}`}>{tier.name}</h3>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">{t(tier.descKey as never)}</p>
              </div>
            </div>

            <div className="mb-4">
              <Price
                price={tier.price}
                annualPrice={tier.annualPrice}
                annualDiscount={tier.annualDiscount}
                isAnnual={isAnnual}
              />
            </div>

            <FeatureList features={tier.features} accent={accent} />

            {isCurrent ? (
              <div className="w-full py-2 rounded-lg text-sm font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-2 border border-emerald-200 dark:border-emerald-800">
                <Check className="w-4 h-4" />
                {t('landing.pricing.currentPlan')}
              </div>
            ) : isIncluded ? (
              <div className="w-full py-2 rounded-lg text-sm font-semibold bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 text-center">
                {t('landing.pricing.included')}
              </div>
            ) : (
              <button
                onClick={() => handleCheckout(isAnnual)}
                disabled={isLoading}
                className={`w-full py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${accent.cta}`}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : tier.price > 0 ? (
                  t('landing.pricing.startTrial')
                ) : (
                  t('landing.pricing.startFree')
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function MaestroCard({ isAnnual, delay }: { isAnnual: boolean; delay: number }) {
  const { t } = useI18n();
  const { isLoading, handleCheckout } = useTierCheckout('Maestro');
  const { profile } = useAuthStore();
  const isCurrent = (profile?.subscriptionTier ?? 'free') === 'maestro';
  const [expanded, setExpanded] = useState(false);
  const accent = maestroAccent;
  const price = 14;
  const annualPrice = 120;
  const annualDiscount = 29;

  return (
    <Reveal delay={delay}>
      <div className="relative">
        <span className="absolute -top-3 right-6 z-10 bg-rose-400 shadow-md shadow-rose-500/20 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full whitespace-nowrap">
          {t('states.bestValue')}
        </span>

        <div
          className={`relative rounded-2xl border-2 bg-gradient-to-br ${accent.gradient} dark:bg-none dark:bg-slate-900 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/5 dark:hover:shadow-black/30 ${
            isCurrent ? 'border-emerald-500 dark:border-emerald-600' : accent.border
          }`}
        >
          <div className={`h-1 bg-gradient-to-r ${accent.topBar}`} />

          <div className="p-5 sm:px-8 sm:py-6">
            {/* Header row: identity left, price right */}
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-10 h-10 rounded-xl ${accent.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Music className={`w-5 h-5 ${accent.iconColor}`} />
                </span>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <h3 className={`font-serif text-xl font-semibold ${accent.nameColor}`}>Maestro</h3>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                      {t('landing.pricing.maestroLabel')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('landingV2.pricing.maestroSub')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Price price={price} annualPrice={annualPrice} annualDiscount={annualDiscount} isAnnual={isAnnual} />
              </div>
            </div>

            {/* One-line value prop + CTA row */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
              <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <KeyRound className="w-4 h-4 text-rose-400 flex-shrink-0" />
                {t('landingV2.pricing.maestroStrip')}
              </p>
              <div className="flex items-center gap-4">
                {isCurrent ? (
                  <div className="px-6 py-2 rounded-lg text-sm font-semibold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
                    <Check className="w-4 h-4" />
                    {t('landing.pricing.currentPlan')}
                  </div>
                ) : (
                  <button
                    onClick={() => handleCheckout(isAnnual)}
                    disabled={isLoading}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${accent.cta}`}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : t('landing.pricing.startTrial')}
                  </button>
                )}
                <button
                  onClick={() => setExpanded((e) => !e)}
                  aria-expanded={expanded}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors cursor-pointer"
                >
                  {t(expanded ? 'landing.pricing.showLess' : 'landing.pricing.learnMore')}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable details */}
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-5 sm:px-8 pb-6">
                <div className="rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-600 dark:text-rose-400 mb-2">
                    {t('landing.pricing.maestroDetailsTitle')}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {t('landing.pricing.maestroDetails')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/**
 * Chapter IV — pricing: tier cards with per-tier accent identities,
 * animated billing toggle, and Lemon Squeezy checkout.
 */
export default function PricingSection() {
  const { t } = useI18n();
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <div className="max-w-xl">
          <Reveal>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {t('landingV2.pricing.title')}
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">{t('landing.pricing.intro')}</p>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <BillingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
        </Reveal>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-3">
        {tiers.map((tier, idx) => (
          <TierCard key={tier.name} tier={tier} isAnnual={isAnnual} delay={idx * 60} />
        ))}
      </div>

      <div className="mt-5">
        <MaestroCard isAnnual={isAnnual} delay={150} />
      </div>
    </div>
  );
}

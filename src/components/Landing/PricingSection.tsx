import { Check, X, Sparkles, Star, Crown, Zap, Loader2 } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useLemonSqueezy } from '@/hooks/useLemonSqueezy';
import { createCheckout, getVariantIdForTier } from '@/services/billing';
import { toast } from '@/components/common/Toast';
import { useLocation } from 'wouter';

const tiers = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for getting started',
    badge: null,
    gradient: 'from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-900',
    border: 'border-gray-200 dark:border-slate-700',
    accent: 'text-gray-600 dark:text-gray-400',
    iconBg: 'bg-gray-100 dark:bg-slate-800',
    iconColor: 'text-gray-500 dark:text-gray-400',
    ctaBg: 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300',
    features: [
      { text: '1 book', included: true },
      { text: 'Bring your own key', included: true },
      { text: '50k tokens/week (standard)', included: true },
      { text: 'Cloud sync', included: true },
      { text: 'Up to 3 books', included: false },
      { text: 'Premium tokens', included: false },
      { text: 'New features first', included: false },
      { text: 'Genre-tuned writing assistance', included: false },
      { text: 'Echo (Beta)', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start Free',
  },
  {
    name: 'Scribe',
    price: 9,
    annualPrice: 96,
    annualDiscount: 11,
    description: 'For dedicated writers',
    badge: null,
    gradient: 'from-primary-50 to-white dark:from-slate-800 dark:to-slate-900',
    border: 'border-primary-300 dark:border-primary-700',
    accent: 'text-primary-600 dark:text-primary-400',
    iconBg: 'bg-primary-100 dark:bg-primary-900/30',
    iconColor: 'text-primary-600 dark:text-primary-400',
    ctaBg: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40',
    features: [
      { text: 'Up to 3 books', included: true },
      { text: 'Bring your own key', included: true },
      { text: '500k tokens/week (standard)', included: true },
      { text: 'Cloud sync', included: true },
      { text: 'Premium tokens', included: false },
      { text: 'New features first', included: false },
      { text: 'Genre-tuned writing assistance', included: false },
      { text: 'Echo (Beta)', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Novelist',
    price: 19,
    annualPrice: 192,
    annualDiscount: 16,
    description: 'For serious novelists',
    badge: 'Popular',
    gradient: 'from-amber-50 to-white dark:from-slate-800 dark:to-slate-900',
    border: 'border-amber-200 dark:border-amber-800',
    accent: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    ctaBg: 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40',
    features: [
      { text: 'Up to 10 books', included: true },
      { text: 'Bring your own key', included: true },
      { text: '1M tokens/week (standard)', included: true },
      { text: '50k tokens/week (premium)', included: true },
      { text: 'Cloud sync', included: true },
      { text: 'New features first', included: true },
      { text: 'Genre-tuned writing assistance', included: true },
      { text: 'Echo (Beta)', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Architect',
    price: 49,
    annualPrice: 468,
    annualDiscount: 20,
    description: 'For writing at scale',
    badge: 'Best Value',
    gradient: 'from-purple-100 to-white dark:from-slate-800 dark:to-slate-900',
    border: 'border-purple-400 dark:border-purple-500',
    accent: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    ctaBg: 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40',
    features: [
      { text: 'Unlimited books', included: true },
      { text: 'Bring your own key', included: true },
      { text: '5M tokens/week (standard)', included: true },
      { text: '500k tokens/week (premium)', included: true },
      { text: 'Cloud sync', included: true },
      { text: 'New features first', included: true },
      { text: 'Genre-tuned writing assistance', included: true },
      { text: 'Echo (Beta)', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Start Free Trial',
  },
];

const comparisonFeatures = [
  { name: 'Bring your own key', free: true, scribe: true, novelist: true, architect: true },
  { name: 'Cloud sync', free: true, scribe: true, novelist: true, architect: true },
  { name: 'Books', free: '1', scribe: '3', novelist: '10', architect: 'Unlimited' },
  { name: 'Standard tokens/week', free: '50k', scribe: '500k', novelist: '1M', architect: '5M' },
  { name: 'Premium tokens/week', free: '—', scribe: '—', novelist: '50k', architect: '500k' },
  { name: 'New features first', free: false, scribe: false, novelist: true, architect: true },
  { name: 'Genre-tuned writing assistance', free: false, scribe: false, novelist: true, architect: true },
  { name: 'Echo (Beta)', free: false, scribe: false, novelist: false, architect: true },
  { name: 'Priority support', free: false, scribe: false, novelist: false, architect: true },
];

function PricingCard({ tier, index, isAnnual }: { tier: typeof tiers[0]; index: number; isAnnual: boolean }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [hovered, setHovered] = useState(false);
  const [entered, setEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const { openCheckout } = useLemonSqueezy();
  const [, setLocation] = useLocation();

  const { profile } = useAuthStore();
  const currentTier = profile?.subscriptionTier ?? 'free';
  const cardTier = tier.name.toLowerCase();
  const tierOrder = ['free', 'scribe', 'novelist', 'architect'];
  const currentIdx = tierOrder.indexOf(currentTier);
  const cardIdx = tierOrder.indexOf(cardTier);
  const isCurrent = cardTier === currentTier;
  const isIncluded = cardIdx < currentIdx; // higher tier includes lower tier features
  const isSuggested = cardTier === 'novelist' && (
    !profile || (currentTier !== 'novelist' && currentTier !== 'architect')
  );

  const tierIcons: Record<string, typeof Sparkles> = {
    Free: Zap,
    Scribe: Sparkles,
    Novelist: Star,
    Architect: Crown,
  };
  const TierIcon = tierIcons[tier.name] || Zap;

  useEffect(() => {
    if (isInView && !entered) {
      const timer = setTimeout(() => setEntered(true), index * 150);
      return () => clearTimeout(timer);
    }
    if (!isInView && entered) {
      setEntered(false);
    }
  }, [isInView, entered, index]);

  const isPaid = tier.price > 0;
  const hoverLift = 'hover:-translate-y-1';
  const hoverShadow = isPaid
    ? 'hover:shadow-lg hover:shadow-gray-400/10 dark:hover:shadow-black/30'
    : 'hover:shadow-md hover:shadow-gray-400/10 dark:hover:shadow-black/30';

  return (
    <div className="relative h-full">
      {/* Badge — outside card so it can exceed bounds */}
      {tier.badge && (
        <div className={`absolute -top-2.5 -right-2.5 z-30 ${
          tier.name === 'Novelist'
            ? 'bg-amber-400 shadow-md shadow-amber-500/20'
            : 'bg-purple-400 shadow-md shadow-purple-500/20'
        } text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg ring-2 ring-white dark:ring-slate-900`}>
          {tier.badge}
        </div>
      )}

      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative flex flex-col h-full rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
          isCurrent
            ? `border-emerald-500 dark:border-emerald-600 ${hoverLift} ${hoverShadow}`
            : isSuggested
            ? `border-amber-400 dark:border-amber-500 ${hoverLift} ${hoverShadow}`
            : `${tier.border} ${hoverLift} ${hoverShadow}`
        } ${isInView && entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >

      {/* Top gradient glow */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
        tier.name === 'Free' ? 'from-gray-300 to-gray-400' :
        tier.name === 'Scribe' ? 'from-primary-400 via-teal-400 to-primary-500' :
        tier.name === 'Novelist' ? 'from-amber-400 via-orange-400 to-amber-500' :
        'from-purple-400 via-pink-400 to-purple-500'
      }`} />

      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${tier.gradient} opacity-60`} />

      <div className={`relative flex flex-col flex-1 ${isSuggested ? 'p-8' : 'p-7'}`}>
        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-10 h-10 rounded-xl ${tier.iconBg} flex items-center justify-center`}>
            <TierIcon className={`w-5 h-5 ${tier.iconColor}`} />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${tier.accent}`}>{tier.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{tier.description}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          {tier.price > 0 ? (
            <div>
              <div className="flex items-baseline gap-2">
                <span
                  key={isAnnual ? 'annual' : 'monthly'}
                  className="text-4xl font-black text-gray-900 dark:text-white tracking-tight tabular-nums transition-all duration-300 animate-in fade-in zoom-in-95"
                >
                  €{isAnnual ? Math.round((tier.annualPrice || 0) / 12) : tier.price}
                </span>
                <span className="text-sm text-gray-400 font-medium transition-all duration-300">
                  /mo
                </span>
                <span
                  className={`text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full transition-all duration-300 ${
                    isAnnual ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
                  }`}
                >
                  Save ~{tier.annualDiscount}%
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1.5 transition-all duration-300">
                {isAnnual ? `Billed annually (€${tier.annualPrice}/year). ` : 'Billed monthly. '}Cancel anytime. + applicable tax
              </p>
            </div>
          ) : (
            <div>
              <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Free</span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">Forever, no credit card</p>
            </div>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-8 flex-1">
          {tier.features.map((feature) => (
            <li key={feature.text} className="flex items-start gap-2.5">
              {feature.included ? (
                <div className={`w-5 h-5 rounded-full ${tier.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Check className={`w-3 h-3 ${tier.iconColor}`} />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-3 h-3 text-gray-300 dark:text-gray-600" />
                </div>
              )}
              <span
                className={`text-sm ${
                  feature.included
                    ? 'text-gray-700 dark:text-gray-300'
                    : 'text-gray-400 dark:text-gray-600'
                }`}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {isCurrent ? (
          <div className="w-full py-3 rounded-xl text-sm font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-2 border border-emerald-200 dark:border-emerald-800">
            <Check className="w-4 h-4" />
            Current Plan
          </div>
        ) : isIncluded ? (
          <div className="w-full py-3 rounded-xl text-sm font-bold bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
            Included
          </div>
        ) : (
          <button
            disabled={isLoading}
            onClick={async () => {
              if (tier.price === 0) {
                setLocation('/app');
                return;
              }
              if (!user) {
                setLocation('/app');
                return;
              }
              const variantId = getVariantIdForTier(tier.name.toLowerCase());
              if (!variantId) {
                toast('Payment system is not fully configured yet', 'error');
                return;
              }
              setIsLoading(true);
              try {
                const url = await createCheckout(variantId);
                openCheckout(url);
              } catch (err) {
                toast(err instanceof Error ? err.message : 'Failed to open checkout', 'error');
              } finally {
                setIsLoading(false);
              }
            }}
            className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 ${tier.ctaBg} ${
              hovered && tier.price > 0 ? 'scale-[1.02]' : ''
            } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : tier.cta}
          </button>
        )}
      </div>
    </div>
  </div>
  );
}

function BillingToggle({ isAnnual, onChange }: { isAnnual: boolean; onChange: (v: boolean) => void }) {
  const monthlyRef = useRef<HTMLButtonElement>(null);
  const annualRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ width: 0, left: 0 });

  const measure = () => {
    const active = isAnnual ? annualRef.current : monthlyRef.current;
    const parent = containerRef.current;
    if (active && parent) {
      const parentRect = parent.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      setPillStyle({
        width: activeRect.width,
        left: activeRect.left - parentRect.left,
      });
    }
  };

  useLayoutEffect(() => {
    measure();
  }, [isAnnual]);

  // Also measure on mount and window resize
  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-flex items-center p-1 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
      {/* Sliding background pill */}
      <div
        className={`absolute top-1 bottom-1 rounded-lg transition-all duration-300 ease-out ${
          isAnnual
            ? 'bg-purple-600 dark:bg-purple-500 shadow-lg shadow-purple-500/50'
            : 'bg-white dark:bg-slate-700 shadow-sm'
        }`}
        style={{
          width: pillStyle.width,
          left: pillStyle.left,
        }}
      />
      <button
        ref={monthlyRef}
        onClick={() => onChange(false)}
        className={`relative z-10 px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 whitespace-nowrap ${
          !isAnnual
            ? 'text-gray-900 dark:text-white'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        Monthly
      </button>
      <button
        ref={annualRef}
        onClick={() => onChange(true)}
        className={`relative z-10 px-5 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 flex items-center gap-2 whitespace-nowrap ${
          isAnnual
            ? 'text-white'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        Annual
      </button>
    </div>
  );
}

export default function PricingSection() {
  const { ref: titleRef, isInView: titleInView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-28 md:py-36 relative">
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(20,184,166,0.25) 25%, rgba(245,158,11,0.2) 50%, rgba(20,184,166,0.25) 75%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 10s linear infinite',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-1000 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-4">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
            Simple, transparent{' '}
            <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
              pricing
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Start free, upgrade when you need more. No hidden fees, no surprises.
          </p>
        </div>

        {/* Annual/Monthly toggle — sliding pill */}
        <div className="flex justify-center mb-14">
          <BillingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
        </div>

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 items-stretch">
          {tiers.map((tier, index) => (
            <PricingCard key={tier.name} tier={tier} index={index} isAnnual={isAnnual} />
          ))}
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <div className="rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-800">
                  <th className="text-left py-4 px-5 text-sm font-bold text-gray-900 dark:text-white bg-gray-50/80 dark:bg-slate-800/80">Feature</th>
                  <th className="text-center py-4 px-3 text-sm font-bold text-gray-600 dark:text-gray-400 bg-gray-50/80 dark:bg-slate-800/80">
                    <div className="flex flex-col items-center gap-1">
                      <Zap className="w-4 h-4" />
                      Free
                    </div>
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-bold text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-900/20">
                    <div className="flex flex-col items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Scribe
                    </div>
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-bold text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-900/20">
                    <div className="flex flex-col items-center gap-1">
                      <Star className="w-4 h-4" />
                      Novelist
                    </div>
                  </th>
                  <th className="text-center py-4 px-3 text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-50/50 dark:bg-purple-900/20">
                    <div className="flex flex-col items-center gap-1">
                      <Crown className="w-4 h-4" />
                      Architect
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, i) => (
                  <tr
                    key={feature.name}
                    className={`border-b border-gray-100 dark:border-slate-800/50 transition-colors hover:bg-gray-50/50 dark:hover:bg-slate-800/30 ${
                      i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-gray-50/30 dark:bg-slate-800/20'
                    }`}
                  >
                    <td className="py-3.5 px-5 text-sm font-semibold text-gray-800 dark:text-gray-200">{feature.name}</td>
                    {['free', 'scribe', 'novelist', 'architect'].map((tierKey) => {
                      const value = feature[tierKey as keyof typeof feature];
                      return (
                        <td key={tierKey} className="text-center py-3.5 px-3">
                          {typeof value === 'boolean' ? (
                            value ? (
                              <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30">
                                <Check className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                              </div>
                            ) : (
                              <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-slate-800">
                                <X className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" />
                              </div>
                            )
                          ) : (
                            <span className={`text-sm font-semibold ${value === '—' ? 'text-gray-300 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300'}`}>{value as string}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Check, X, Sparkles, Star, Crown, Zap } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';

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
      { text: '100k tokens/week (standard)', included: true },
      { text: 'Cloud sync', included: true },
      { text: 'Up to 3 books', included: false },
      { text: 'Premium tokens', included: false },
      { text: 'New features first', included: false },
      { text: 'Genre-tuned writing assistance', included: false },
      { text: 'Adaptive memory mode', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Start Free',
  },
  {
    name: 'Scribe',
    price: 9,
    description: 'For dedicated writers',
    badge: 'Popular',
    gradient: 'from-primary-50 to-white dark:from-primary-950/20 dark:to-slate-900',
    border: 'border-primary-300 dark:border-primary-700',
    accent: 'text-primary-600 dark:text-primary-400',
    iconBg: 'bg-primary-100 dark:bg-primary-900/30',
    iconColor: 'text-primary-600 dark:text-primary-400',
    ctaBg: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40',
    features: [
      { text: 'Up to 3 books', included: true },
      { text: 'Bring your own key', included: true },
      { text: '1M tokens/week (standard)', included: true },
      { text: 'Cloud sync', included: true },
      { text: 'Premium tokens', included: false },
      { text: 'New features first', included: false },
      { text: 'Genre-tuned writing assistance', included: false },
      { text: 'Adaptive memory mode', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Coming Soon',
    highlight: true,
  },
  {
    name: 'Novelist',
    price: 19,
    description: 'For serious novelists',
    badge: null,
    gradient: 'from-amber-50/60 to-white dark:from-amber-950/15 dark:to-slate-900',
    border: 'border-amber-200 dark:border-amber-800',
    accent: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    ctaBg: 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40',
    features: [
      { text: 'Up to 10 books', included: true },
      { text: 'Bring your own key', included: true },
      { text: '2M tokens/week (standard)', included: true },
      { text: '100k tokens/week (premium)', included: true },
      { text: 'Cloud sync', included: true },
      { text: 'New features first', included: true },
      { text: 'Genre-tuned writing assistance', included: true },
      { text: 'Adaptive memory mode', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Coming Soon',
  },
  {
    name: 'Architect',
    price: 49,
    description: 'For writing at scale',
    badge: 'Best Value',
    gradient: 'from-purple-50/60 to-white dark:from-purple-950/15 dark:to-slate-900',
    border: 'border-purple-200 dark:border-purple-800',
    accent: 'text-purple-600 dark:text-purple-400',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    iconColor: 'text-purple-600 dark:text-purple-400',
    ctaBg: 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40',
    features: [
      { text: 'Up to 50 books', included: true },
      { text: 'Bring your own key', included: true },
      { text: '10M tokens/week (standard)', included: true },
      { text: '1M tokens/week (premium)', included: true },
      { text: 'Cloud sync', included: true },
      { text: 'New features first', included: true },
      { text: 'Genre-tuned writing assistance', included: true },
      { text: 'Adaptive memory mode', included: true },
      { text: 'Priority support', included: true },
    ],
    cta: 'Coming Soon',
  },
];

const comparisonFeatures = [
  { name: 'Bring your own key', free: true, scribe: true, novelist: true, architect: true },
  { name: 'Cloud sync', free: true, scribe: true, novelist: true, architect: true },
  { name: 'Books', free: '1', scribe: '3', novelist: '10', architect: '50' },
  { name: 'Standard tokens/week', free: '100k', scribe: '1M', novelist: '2M', architect: '10M' },
  { name: 'Premium tokens/week', free: '—', scribe: '—', novelist: '100k', architect: '1M' },
  { name: 'New features first', free: false, scribe: false, novelist: true, architect: true },
  { name: 'Genre-tuned writing assistance', free: false, scribe: false, novelist: true, architect: true },
  { name: 'Adaptive memory mode', free: false, scribe: false, novelist: false, architect: true },
  { name: 'Priority support', free: false, scribe: false, novelist: false, architect: true },
];

function PricingCard({ tier, index }: { tier: typeof tiers[0]; index: number }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [hovered, setHovered] = useState(false);
  const [entered, setEntered] = useState(false);

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

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex flex-col rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
        tier.highlight
          ? 'border-primary-400 dark:border-primary-600 shadow-2xl shadow-primary-500/15 scale-[1.03] z-10'
          : tier.price > 0
          ? `border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 ${tier.name === 'Novelist' ? 'hover:shadow-amber-500/10' : tier.name === 'Architect' ? 'hover:shadow-purple-500/10' : ''}`
          : 'border-gray-200 dark:border-slate-700'
      } ${isInView && entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Badge ribbon */}
      {tier.badge && (
        <div className={`absolute top-0 right-0 z-20 ${
          tier.name === 'Scribe'
            ? 'bg-primary-500'
            : 'bg-purple-600'
        } text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl`}>
          {tier.badge}
        </div>
      )}

      {/* Top gradient glow */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
        tier.name === 'Free' ? 'from-gray-300 to-gray-400' :
        tier.name === 'Scribe' ? 'from-primary-400 via-teal-400 to-primary-500' :
        tier.name === 'Novelist' ? 'from-amber-400 via-orange-400 to-amber-500' :
        'from-purple-400 via-pink-400 to-purple-500'
      }`} />

      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${tier.gradient} opacity-60`} />

      <div className="relative p-7 flex flex-col flex-1">
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
                <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                  ${(tier.price * 0.5).toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 font-medium">/mo</span>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-sm text-gray-400 line-through">${tier.price}/mo</span>
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full font-bold uppercase tracking-wider">
                  50% off 1st month
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Then ${tier.price}/mo ongoing
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
        <button
          className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 ${tier.ctaBg} ${
            hovered && tier.price > 0 ? 'scale-[1.02]' : ''
          }`}
        >
          {tier.cta}
        </button>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const { ref: titleRef, isInView: titleInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="pricing" className="py-28 md:py-36 relative">
      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-slate-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-1000 ${
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

        {/* Pricing cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 items-start">
          {tiers.map((tier, index) => (
            <PricingCard key={tier.name} tier={tier} index={index} />
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

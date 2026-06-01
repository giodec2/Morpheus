import { MessageSquare, Users, Shield, Zap, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

const features = [
  {
    icon: MessageSquare,
    title: 'A Lore Bible That Never Forgets',
    description:
      "Every character trait, plot twist, and world rule lives in your lore bible. The AI references it with every suggestion — so continuity errors become a thing of the past.",
    gradient: 'from-primary-500 to-teal-400',
    shadow: 'shadow-primary-500/20',
  },
  {
    icon: Users,
    title: 'Characters, Lore & Locations — Structured',
    description:
      'Build a living wiki for your novel. Organize people, places, and mythologies in dedicated panels so your world stays coherent from chapter one to the epilogue.',
    gradient: 'from-amber-500 to-orange-400',
    shadow: 'shadow-amber-500/20',
  },
  {
    icon: Shield,
    title: 'Your Manuscript, Your Property',
    description:
      'Your creative work is never used to train AI models. Our providers process prompts and discard them immediately. Write with confidence knowing your ideas stay exclusively yours.',
    gradient: 'from-emerald-500 to-teal-400',
    shadow: 'shadow-emerald-500/20',
  },
  {
    icon: Zap,
    title: 'Choose Your Creative Engine',
    description:
      "Switch between state-of-the-art language models to match your project's needs. Use our hosted AI for convenience, or connect your own key for unlimited flexibility.",
    gradient: 'from-purple-500 to-pink-400',
    shadow: 'shadow-purple-500/20',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [entered, setEntered] = useState(false);
  const Icon = feature.icon;

  useEffect(() => {
    if (isInView && !entered) {
      const timer = setTimeout(() => setEntered(true), index * 150);
      return () => clearTimeout(timer);
    }
  }, [isInView, entered, index]);

  return (
    <div
      ref={ref}
      className={`group relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${feature.shadow} ${
        isInView && entered
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Top gradient bar with shimmer */}
      <div className={`absolute top-0 left-4 right-4 h-1 rounded-b-full bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div
        className={`absolute top-0 left-4 right-4 h-1 rounded-b-full opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s linear infinite',
        }}
      />

      {/* Icon */}
      <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
        <Icon className="w-7 h-7 text-white" />

        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 -z-10`} />
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {feature.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {feature.description}
      </p>

      {/* Corner decoration */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-xs font-bold text-gray-400 dark:text-gray-600">0{index + 1}</span>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const { ref: titleRef, isInView: titleInView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [, setLocation] = useLocation();

  return (
    <section id="features" className="py-28 md:py-36 relative">
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(20,184,166,0.3) 25%, rgba(99,102,241,0.2) 50%, rgba(20,184,166,0.3) 75%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 8s linear infinite',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-1000 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-4">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
              write your book
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            From world-building to final draft, Morpheus gives you the tools to stay organized,
            inspired, and in control.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA after features */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setLocation('/app')}
            className="group btn-primary text-base px-8 py-4 inline-flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
          >
            Start Writing Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-500">No credit card required</p>
        </div>
      </div>
    </section>
  );
}

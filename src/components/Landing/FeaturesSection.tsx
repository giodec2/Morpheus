import { MessageSquare, Users, Shield, Zap } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';

const features = [
  {
    icon: MessageSquare,
    title: 'AI That Remembers Your World',
    description:
      'Chat about your plot, your characters, your rules. Morpheus recalls every detail—so your AI partner never feels like a stranger.',
    gradient: 'from-primary-500 to-teal-400',
    shadow: 'shadow-primary-500/20',
  },
  {
    icon: Users,
    title: 'Your World, Organized',
    description:
      'Keep characters, locations, and lore in one dedicated space. Build the backbone of your story without juggling notes, tabs, or spreadsheets.',
    gradient: 'from-amber-500 to-orange-400',
    shadow: 'shadow-amber-500/20',
  },
  {
    icon: Shield,
    title: 'Your Ideas Stay Private',
    description:
      'We only use AI providers with strict zero data retention policies. Your prompts are never logged, never stored, and never used to train models.',
    gradient: 'from-emerald-500 to-teal-400',
    shadow: 'shadow-emerald-500/20',
  },
  {
    icon: Zap,
    title: 'Pick Your Brain',
    description:
      'Use your own API key for full control, or tap our hosted models. From quick brainstorming to deep literary analysis, you choose the mind behind the pen.',
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
    if (!isInView && entered) {
      setEntered(false);
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
      {/* Top gradient bar */}
      <div className={`absolute top-0 left-4 right-4 h-1 rounded-b-full bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

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

  return (
    <section id="features" className="py-28 md:py-36 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-slate-800 to-transparent" />

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
      </div>
    </section>
  );
}

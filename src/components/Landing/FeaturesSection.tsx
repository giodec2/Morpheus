import { MessageSquare, Users, Shield, Zap } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const features = [
  {
    icon: MessageSquare,
    title: 'AI That Knows Your World',
    description:
      'Chat with AI about your story. It reads your lore bible and character sheets. No context lost between sessions.',
    gradient: 'from-primary-500 to-teal-400',
    shadow: 'shadow-primary-500/20',
  },
  {
    icon: Users,
    title: 'Character & Lore Bible',
    description:
      'Build deep, consistent worlds. The AI remembers every trait, every rule, every secret you create.',
    gradient: 'from-amber-500 to-orange-400',
    shadow: 'shadow-amber-500/20',
  },
  {
    icon: Shield,
    title: 'Local-First, Cloud-Ready',
    description:
      'Your work lives on your device. Write offline, anywhere. Sync across devices when you\'re ready.',
    gradient: 'from-emerald-500 to-teal-400',
    shadow: 'shadow-emerald-500/20',
  },
  {
    icon: Zap,
    title: 'Your Models, Your Choice',
    description:
      'Bring your own OpenRouter key, or use our hosted AI. From fast and cheap to creative powerhouses.',
    gradient: 'from-purple-500 to-pink-400',
    shadow: 'shadow-purple-500/20',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={`group relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${feature.shadow} ${
        isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      }`}
      style={isInView ? undefined : { transitionDelay: `${index * 150}ms` }}
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
              write your novel
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

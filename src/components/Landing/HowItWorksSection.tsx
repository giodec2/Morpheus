import { BookOpen, Users, MessageSquare, ArrowRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';

const steps = [
  {
    number: '01',
    icon: BookOpen,
    title: 'Create a Book',
    description:
      'Start with a title. Morpheus builds your workspace with a lore bible and first chapter ready to go.',
    gradient: 'from-primary-500 via-teal-400 to-emerald-400',
    shadow: 'shadow-primary-500/25',
  },
  {
    number: '02',
    icon: Users,
    title: 'Build Your World',
    description:
      'Add characters, locations, and rules. The AI reads everything to stay consistent with your vision.',
    gradient: 'from-amber-500 via-orange-400 to-rose-400',
    shadow: 'shadow-amber-500/25',
  },
  {
    number: '03',
    icon: MessageSquare,
    title: 'Write with AI',
    description:
      "Chat, brainstorm, expand scenes. The AI follows your style and your world's logic — never generic.",
    gradient: 'from-purple-500 via-violet-400 to-pink-400',
    shadow: 'shadow-purple-500/25',
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [entered, setEntered] = useState(false);
  const Icon = step.icon;

  useEffect(() => {
    if (isInView && !entered) {
      const timer = setTimeout(() => setEntered(true), index * 200);
      return () => clearTimeout(timer);
    }
    if (!isInView && entered) {
      setEntered(false);
    }
  }, [isInView, entered, index]);

  return (
    <div
      key={step.number}
      ref={ref}
      className={`relative group transition-all duration-300 ${
        isInView && entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
        {/* Top gradient accent on hover */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Step number + icon */}
        <div className="flex items-center justify-between mb-6">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg ${step.shadow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <span className="text-6xl font-black text-gray-100 dark:text-slate-800 leading-none select-none">
            {step.number}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {step.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
          {step.description}
        </p>

        {/* Arrow for non-last on mobile/tablet */}
        {index < steps.length - 1 && (
          <div className="hidden md:flex lg:hidden items-center justify-center">
            <ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-600" />
          </div>
        )}

        {/* Bottom gradient bar (always visible, subtle) */}
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${step.gradient} opacity-20 group-hover:opacity-60 transition-opacity duration-500`} />
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const { ref: titleRef, isInView: titleInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section id="how-it-works" className="py-28 md:py-36 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary-500/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={titleRef}
          className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-1000 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-4">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
            From idea to draft in{' '}
            <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
              three steps
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No setup, no learning curve — just write.
          </p>
        </div>

        <div className="relative">
          {/* Desktop connector */}
          <div className="hidden lg:block absolute top-20 left-[20%] right-[20%]">
            <div className="relative h-1 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-primary-500 via-amber-500 to-purple-500 rounded-full animate-[draw-line_2s_ease-out_forwards]" style={{ width: '100%' }} />
            </div>
            {/* Step dots on line */}
            {steps.map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-gray-300 dark:border-slate-600"
                style={{ left: `${i * 50}%` }}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Heart,
  Flame,
  Rocket,
  Wand2,
  Glasses,
  Landmark,
  Sunrise,
} from 'lucide-react';

const genres = [
  {
    name: 'General Fiction',
    icon: BookOpen,
    description:
      'A versatile creative partner for any story. From literary experiments to cross-genre blends, Morpheus adapts to your voice.',
    color: 'from-gray-500 to-slate-400',
    bgColor: 'bg-gray-50 dark:bg-gray-900/10',
    borderColor: 'border-gray-200 dark:border-gray-800/50',
    textColor: 'text-gray-700 dark:text-gray-300',
    iconBg: 'bg-gray-100 dark:bg-gray-800/40',
  },
  {
    name: 'Crime & Mystery',
    icon: Search,
    description:
      'Plant clues precisely, manage red herrings, and keep your investigation internally consistent from page one to the final reveal.',
    color: 'from-slate-500 to-zinc-400',
    bgColor: 'bg-slate-50 dark:bg-slate-900/10',
    borderColor: 'border-slate-200 dark:border-slate-800/50',
    textColor: 'text-slate-700 dark:text-slate-300',
    iconBg: 'bg-slate-100 dark:bg-slate-800/40',
  },
  {
    name: 'Romance',
    icon: Heart,
    description:
      'Develop slow-burn arcs, sustain emotional tension, and ensure every interaction deepens the central relationship.',
    color: 'from-rose-500 to-pink-400',
    bgColor: 'bg-rose-50 dark:bg-rose-900/10',
    borderColor: 'border-rose-200 dark:border-rose-800/50',
    textColor: 'text-rose-700 dark:text-rose-300',
    iconBg: 'bg-rose-100 dark:bg-rose-800/40',
  },
  {
    name: 'Thriller & Horror',
    icon: Flame,
    description:
      'Escalate dread with surgical precision. Manage pacing, stakes, and atmosphere so every chapter tightens the screws.',
    color: 'from-orange-500 to-red-400',
    bgColor: 'bg-orange-50 dark:bg-orange-900/10',
    borderColor: 'border-orange-200 dark:border-orange-800/50',
    textColor: 'text-orange-700 dark:text-orange-300',
    iconBg: 'bg-orange-100 dark:bg-orange-800/40',
  },
  {
    name: 'Science Fiction',
    icon: Rocket,
    description:
      'Maintain consistent speculative rules across complex worlds. Balance exposition with action while preserving scientific plausibility.',
    color: 'from-cyan-500 to-blue-400',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/10',
    borderColor: 'border-cyan-200 dark:border-cyan-800/50',
    textColor: 'text-cyan-700 dark:text-cyan-300',
    iconBg: 'bg-cyan-100 dark:bg-cyan-800/40',
  },
  {
    name: 'Fantasy',
    icon: Wand2,
    description:
      'Build intricate magic systems with clear costs and limits. Track lore, lineages, and prophecy across a multi-book series.',
    color: 'from-violet-500 to-purple-400',
    bgColor: 'bg-violet-50 dark:bg-violet-900/10',
    borderColor: 'border-violet-200 dark:border-violet-800/50',
    textColor: 'text-violet-700 dark:text-violet-300',
    iconBg: 'bg-violet-100 dark:bg-violet-800/40',
  },
  {
    name: 'Literary Fiction',
    icon: Glasses,
    description:
      'Deepen subtext, refine symbolism, and explore interiority. Morpheus helps you find the emotional truth beneath the surface narrative.',
    color: 'from-emerald-500 to-teal-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/10',
    borderColor: 'border-emerald-200 dark:border-emerald-800/50',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-800/40',
  },
  {
    name: 'Historical Fiction',
    icon: Landmark,
    description:
      'Maintain period-accurate voice and flag anachronisms. Ground your characters in researched detail without info-dumping.',
    color: 'from-amber-500 to-yellow-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/10',
    borderColor: 'border-amber-200 dark:border-amber-800/50',
    textColor: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-100 dark:bg-amber-800/40',
  },
  {
    name: 'Young Adult',
    icon: Sunrise,
    description:
      'Capture authentic teenage voice and agency. Balance emotional intensity with propulsive pacing that respects YA readers.',
    color: 'from-sky-500 to-blue-400',
    bgColor: 'bg-sky-50 dark:bg-sky-900/10',
    borderColor: 'border-sky-200 dark:border-sky-800/50',
    textColor: 'text-sky-700 dark:text-sky-300',
    iconBg: 'bg-sky-100 dark:bg-sky-800/40',
  },
];

function GenreCard({
  genre,
  index,
}: {
  genre: typeof genres[0];
  index: number;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [entered, setEntered] = useState(false);
  const Icon = genre.icon;

  useEffect(() => {
    if (isInView && !entered) {
      const timer = setTimeout(() => setEntered(true), index * 80);
      return () => clearTimeout(timer);
    }
  }, [isInView, entered, index]);

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border ${genre.borderColor} ${genre.bgColor} p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
        isInView && entered
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl ${genre.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className={`w-6 h-6 ${genre.textColor}`} />
      </div>

      {/* Genre name with gradient underline on hover */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
        {genre.name}
        <span
          className={`h-0.5 w-0 group-hover:w-6 bg-gradient-to-r ${genre.color} transition-all duration-500 rounded-full`}
        />
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {genre.description}
      </p>
    </div>
  );
}

export default function GenreShowcase() {
  const { ref: titleRef, isInView: titleInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
  });

  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary-500/3 blur-3xl" />
        <div
          className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-teal-500/3 blur-3xl"
          style={{ animation: 'drift 22s ease-in-out infinite' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          ref={titleRef}
          className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-1000 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-4">
            Genre-Tuned Assistance
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
            Whatever you write,{' '}
            <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
              Morpheus gets it
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Nine distinct genre modes that understand the conventions, tropes, and techniques of your chosen form.
          </p>
        </div>

        {/* Genre grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {genres.map((genre, index) => (
            <GenreCard key={genre.name} genre={genre} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

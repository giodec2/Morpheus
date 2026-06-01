import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      "I finished my 90,000-word fantasy draft in 8 weeks instead of 8 months. Morpheus actually remembers my magic system rules — no other tool does that.",
    name: 'Elena R.',
    role: 'Fantasy Author',
    genre: 'Fantasy',
    stars: 5,
    highlight: '90k words in 8 weeks',
  },
  {
    quote:
      "The character panel alone saved me hours of scrolling through notes. I mention a side character once in chapter 3, and Morpheus brings them back perfectly in chapter 12.",
    name: 'Marcus T.',
    role: 'Indie Novelist',
    genre: 'Sci-Fi',
    stars: 5,
    highlight: 'Perfect character continuity',
  },
  {
    quote:
      "As someone who writes romance, I was worried an AI would make everything sound generic. Morpheus learns my voice. My editor can't tell which paragraphs I wrote and which the AI helped with.",
    name: 'Sophia L.',
    role: 'Romance Writer',
    genre: 'Romance',
    stars: 5,
    highlight: 'Indistinguishable voice',
  },
  {
    quote:
      "The BYOK option is a game-changer. I use my own API key, so I know exactly where my data goes. Plus the privacy promise actually means something.",
    name: 'James K.',
    role: 'Thriller Author',
    genre: 'Thriller',
    stars: 5,
    highlight: 'Total privacy control',
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: typeof testimonials[0];
  index: number;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (isInView && !entered) {
      const timer = setTimeout(() => setEntered(true), index * 120);
      return () => clearTimeout(timer);
    }
  }, [isInView, entered, index]);

  return (
    <div
      ref={ref}
      className={`relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-7 transition-all duration-700 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/20 ${
        isInView && entered
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-primary-200 dark:text-primary-900/40 mb-4" />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-amber-400 text-amber-400"
          />
        ))}
      </div>

      {/* Quote text */}
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6">
        "{testimonial.quote}"
      </p>

      {/* Highlight badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-semibold mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
        {testimonial.highlight}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-teal-400 flex items-center justify-center text-white text-sm font-bold">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {testimonial.role} · {testimonial.genre}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { ref: titleRef, isInView: titleInView } = useInView<HTMLDivElement>({
    threshold: 0.3,
  });

  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary-500/5 blur-3xl" />
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
            Loved by Writers
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
            Stories from the{' '}
            <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
              community
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Writers who were skeptical at first. Now they can't imagine drafting without it.
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

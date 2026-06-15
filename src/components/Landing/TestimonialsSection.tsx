import { useInView } from '@/hooks/useInView';
import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { useI18n } from '@/i18n/useI18n';

const testimonialDefs = [
  { key: 'item1', name: 'Elena R.', stars: 5 },
  { key: 'item2', name: 'Marcus T.', stars: 5 },
  { key: 'item3', name: 'Sophia L.', stars: 5 },
  { key: 'item4', name: 'James K.', stars: 5 },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: typeof testimonialDefs[0];
  index: number;
}) {
  const { t } = useI18n();
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
        "{t(`landing.testimonials.${testimonial.key}.quote` as never)}"
      </p>

      {/* Highlight badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs font-semibold mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
        {t(`landing.testimonials.${testimonial.key}.highlight` as never)}
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
            {t(`landing.testimonials.${testimonial.key}.role` as never)} · {t(`landing.testimonials.${testimonial.key}.genre` as never)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { t } = useI18n();
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
            {t('landing.testimonials.label')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
            {t('landing.testimonials.titlePrefix')}{' '}
            <span className="bg-gradient-to-r from-primary-600 to-teal-500 bg-clip-text text-transparent">
              {t('landing.testimonials.titleHighlight')}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t('landing.testimonials.intro')}
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonialDefs.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

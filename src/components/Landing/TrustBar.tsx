import { Lock, EyeOff, Server, Fingerprint, Download } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { useI18n } from '@/i18n/useI18n';

const trustItemDefs = [
  { icon: EyeOff, key: 'zeroRetention' },
  { icon: Lock, key: 'noTraining' },
  { icon: Fingerprint, key: 'byok' },
  { icon: Download, key: 'fullExport' },
  { icon: Server, key: 'euHosted' },
];

export default function TrustBar() {
  const { t } = useI18n();
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section className="py-6 md:py-8 border-y border-gray-100 dark:border-slate-800/60 bg-gradient-to-r from-gray-50/50 via-white to-gray-50/50 dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-6 transition-all duration-1000 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-8 gap-y-2.5">
          {trustItemDefs.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                className="flex items-center gap-1.5 text-xs md:text-sm text-gray-500 dark:text-gray-400"
              >
                <span className="relative">
                  <Icon className="w-3.5 h-3.5 text-primary-500/80 relative z-10" />
                  <span
                    className="absolute inset-0 rounded-full bg-primary-400/30 blur-sm"
                    style={{ animation: 'breathe-glow 3s ease-in-out infinite' }}
                  />
                </span>
                <span>{t(`landing.trustBar.${item.key}` as never)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

/**
 * Minimal teaser standing in for the Wellbeing Index hero on the homepage -- the full pitch
 * ("Know your body before it speaks.", live composite score, biomarker stats) now lives on its
 * own page at /wellbeing-index. Same style/pattern as ExperienceLink/FounderLink/JourneyLink/
 * QualityOfLifeLink.
 */
const HeroLink: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ once: false });

  return (
    <Link
      ref={ref}
      to="/wellbeing-index"
      className={`group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-8 sm:p-12 transition-all duration-700 ease-out hover:border-emerald-400/40 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"
      />
      <div className="relative flex flex-col gap-6">
        <div>
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-[0.2em]">
            Preventative Medicine, Powered by AI
          </p>
          <h3 className="mt-3 text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Know your body before it speaks
          </h3>
          <p className="mt-3 text-slate-400 leading-relaxed">
            A single, actionable Wellbeing Index &mdash; predicting risk early so you can prevent,
            not just treat.
          </p>
        </div>
        <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-6 py-3 text-sm font-semibold text-emerald-200 transition-transform duration-300 group-hover:translate-x-1">
          See the Wellbeing Index
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
};

export default HeroLink;

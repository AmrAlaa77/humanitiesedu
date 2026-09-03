import React from 'react';
import { useInView } from '@/hooks/use-in-view';

const LivingMatrix: React.FC = () => {
  const head = useInView<HTMLDivElement>();
  const compare = useInView<HTMLDivElement>();
  const quote = useInView<HTMLQuoteElement>();

  return (
    <section id="living-matrix" className="relative py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          ref={head.ref}
          className={`transition-all duration-700 ease-out ${head.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">The Living Matrix &middot; Platform Positioning</span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-bold text-white tracking-tight max-w-2xl">
            <span className="text-white">Behavioral-</span><span className="text-emerald-400">First.</span>{' '}
            <span className="text-slate-500">Physiology-</span><span className="text-slate-500">Second.</span>
          </h2>
        </div>

        <div
          ref={compare.ref}
          className={`mt-10 grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden max-w-4xl transition-all duration-700 ease-out ${
            compare.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="group bg-slate-950 p-9 transition-colors duration-300 hover:bg-slate-900">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Most Health Apps</div>
            <div className="font-serif text-2xl text-slate-400 mb-4">Give you numbers.</div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Cold statistics. Lagging indicators. Data that tells you what happened — never why.
            </p>
          </div>
          <div className="group bg-slate-950 p-9 transition-colors duration-300 hover:bg-emerald-500/[0.04]">
            <div className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-4">HumanticDigital</div>
            <div className="font-serif text-2xl text-white mb-4">
              Give you <span className="text-emerald-400 transition-colors group-hover:text-emerald-300">patterns.</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connecting how you move, feel, think and behave — revealing trends you&apos;d never notice yourself.
            </p>
          </div>
        </div>

        <blockquote
          ref={quote.ref}
          className={`mt-10 border-l-2 border-emerald-400/50 pl-6 max-w-2xl transition-all duration-700 ease-out ${
            quote.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}
        >
          <p className="text-white font-serif italic text-xl leading-relaxed">
            Transforming cold statistics into a <span className="not-italic font-semibold">warm map of lived experience</span> and vibrant potential.
          </p>
        </blockquote>
      </div>
    </section>
  );
};

export default LivingMatrix;

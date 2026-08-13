import React from 'react';
import { useInView } from '@/hooks/use-in-view';
import { ArrowRight, Feather, ShieldCheck, Gem, Droplets, Cpu, Wifi } from 'lucide-react';
import BlurryWatch from './BlurryWatch';

const specs = [
  { icon: Feather, k: '3.9 g', l: 'Aerospace titanium', d: 'So light you forget it’s there.' },
  { icon: Droplets, k: '100 m', l: 'Water resistance', d: 'Shower, swim, live — never remove it.' },
  { icon: Cpu, k: '7 sensors', l: 'Bio-signal array', d: 'PPG, temp, accelerometer & more.' },
  { icon: Wifi, k: 'Seamless', l: 'Always synced', d: 'Insights ready the moment you wake.' },
  { icon: ShieldCheck, k: 'Private', l: 'On-device first', d: 'Your body’s data stays yours.' },
  { icon: Gem, k: '4 finishes', l: 'Crafted to wear', d: 'Silver, graphite, gold, teal-chrome.' },
];

const finishes = [
  { name: 'Lunar Silver', cls: 'from-slate-200 to-slate-400' },
  { name: 'Graphite', cls: 'from-slate-600 to-slate-800' },
  { name: 'Champagne Gold', cls: 'from-amber-200 to-yellow-500' },
  { name: 'Teal Chrome', cls: 'from-teal-200 to-cyan-400' },
];

const AurionShowcase: React.FC<{ onCta: () => void }> = ({ onCta }) => {
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>();

  return (
    <section className="relative py-28 overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute bottom-0 -left-40 w-[34rem] h-[34rem] bg-cyan-400/10 rounded-full blur-[55px]" />


      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Macro + finishes */}
        <div
          ref={headRef}
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950">
            <div className="flex items-center justify-center h-[24rem]">
              <BlurryWatch className="w-[150%] max-w-none scale-150 -translate-y-4 blur-[4px]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-2xl border border-white/15 bg-slate-900/85 px-5 py-3">

              <p className="text-white font-semibold">Inner sensor band</p>
              <p className="text-slate-300 text-sm">Medical-grade signals, hidden in luxury.</p>
            </div>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-teal-300 mb-4">Designed to disappear</p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Jewellery on the outside.
              <span className="block bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text text-transparent">
                A lab on the inside.
              </span>
            </h2>
            <p className="mt-5 text-slate-300 text-lg leading-relaxed">
              Sculpted from a single block of aerospace titanium with a frosted chrome finish that catches the
              light — and a sensor core precise enough to spot what you can’t feel.
            </p>

            <p className="mt-8 text-xs uppercase tracking-widest text-slate-500 mb-3">Choose your finish</p>
            <div className="flex flex-wrap gap-3">
              {finishes.map((f) => (
                <div key={f.name} className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2">

                  <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${f.cls} ring-1 ring-white/20`} />
                  <span className="text-sm text-slate-200">{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Frosted spec panels */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {specs.map((s, i) => (
            <SpecPanel key={s.l} {...s} index={i} />
          ))}
        </div>

        {/* CTA banner */}
        <div className="mt-24 relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-teal-400/15 via-cyan-400/5 to-transparent p-10 sm:p-16 text-center">
          <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-400/20 rounded-full blur-[55px]" />

          <h2 className="relative text-3xl sm:text-5xl font-bold leading-tight max-w-3xl mx-auto">
            Stop tracking your body.
            <span className="block bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text text-transparent">
              Start understanding it.
            </span>
          </h2>
          <p className="relative mt-5 text-slate-300 max-w-xl mx-auto">
            Be among the first to wear AURION ONE and unlock your personal wellbeing intelligence.
          </p>
          <button
            onClick={onCta}
            className="relative group mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-teal-300 to-cyan-400 text-slate-950 font-semibold shadow-lg shadow-teal-400/25 hover:opacity-90 transition"
          >
            Reserve AURION ONE
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </button>
        </div>
      </div>
    </section>
  );
};

const SpecPanel: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  k: string;
  l: string;
  d: string;
  index: number;
}> = ({ icon: Icon, k, l, d, index }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-700 hover:-translate-y-1 hover:border-teal-300/30 ${

        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <Icon className="w-6 h-6 text-teal-200 mb-4 transition-transform group-hover:scale-110" />
      <p className="text-2xl font-bold text-white">{k}</p>
      <p className="text-teal-200/90 text-sm font-medium">{l}</p>
      <p className="mt-1.5 text-slate-400 text-sm">{d}</p>
    </div>
  );
};

export default AurionShowcase;

import React from 'react';
import { useInView } from '@/hooks/use-in-view';
import { ArrowRight, Sparkles } from 'lucide-react';

const SPHERE = 'https://d64gsuwffb70l.cloudfront.net/6a1bff16eb3a4753d1d1427d_1780343239546_12e60a58.png';

const AurionHero: React.FC<{ onCta: () => void }> = ({ onCta }) => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">
      {/* cinematic ambient field (static — no per-frame repaints) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(45,212,191,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute -top-20 left-1/4 w-[34rem] h-[34rem] bg-teal-400/10 rounded-full blur-[48px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-cyan-400/10 rounded-full blur-[48px]" />
      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />


      <div
        ref={ref}
        className={`relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Copy */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-300/30 bg-white/5 text-teal-200 text-xs font-medium tracking-wide">

            <Sparkles className="w-3.5 h-3.5" /> The next generation of wearable intelligence
          </div>
          <h1 className="mt-6 text-5xl sm:text-7xl font-bold tracking-tight leading-[0.95]">
            <span className="bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">AURION</span>
            <span className="block bg-gradient-to-r from-teal-200 via-cyan-200 to-slate-200 bg-clip-text text-transparent">ONE</span>
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.35em] text-slate-400">Wellbeing, perfected in 4 grams of titanium</p>
          <p className="mt-7 text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed">
            Not just another wearable. AURION fuses a precision sensor watch with a living
            <span className="text-white font-medium"> personal wellbeing intelligence</span> — an evolving
            knowledge model that understands <span className="text-teal-200">you</span>, not the average.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={onCta}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-teal-300 to-cyan-400 text-slate-950 font-semibold shadow-lg shadow-teal-400/25 hover:opacity-90 transition"
            >
              Reserve AURION ONE
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </button>
            <button
              onClick={() => document.querySelector('#aurion-intel')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition"
            >
              Explore the intelligence
            </button>

          </div>

          <div className="mt-10 flex items-center gap-8">
            {[
              { k: '7', l: 'bio-sensors' },
              { k: '100×', l: 'reads / sec' },
              { k: '7d', l: 'battery' },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-2xl font-bold text-white">{s.k}</p>
                <p className="text-xs uppercase tracking-widest text-slate-500">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Watch render (static glow — no heavy spin/float loops) */}
        <div className="relative flex items-center justify-center">
          <div
            className="absolute w-[26rem] h-[26rem] rounded-full bg-gradient-to-tr from-teal-400/25 via-cyan-400/15 to-transparent blur-2xl"
            style={{ animation: 'auraPulse 3.6s ease-in-out infinite' }}
          />
          <div className="absolute w-[30rem] h-[30rem] rounded-full border border-teal-300/15 [mask-image:radial-gradient(circle,transparent_58%,black_60%)]" />

          <div
            className="relative z-10 h-[20rem] w-[20rem] overflow-hidden flex items-center justify-center sm:h-[25rem] sm:w-[25rem]"
            style={{ animation: 'auraFloat 4.5s ease-in-out infinite' }}
          >
            <img src={SPHERE} alt="AURION intelligence sphere" className="w-full h-full object-contain drop-shadow-2xl" />
            <div className="absolute -right-2 bottom-8 rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-2.5 text-sm text-white shadow-xl">
              Readiness: <span className="text-cyan-200 font-semibold">75%</span>
            </div>
          </div>

          <style>{`
            @keyframes auraFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-18px); }
            }
            @keyframes auraPulse {
              0%, 100% { transform: scale(1); opacity: 0.85; }
              50% { transform: scale(1.12); opacity: 1; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default AurionHero;

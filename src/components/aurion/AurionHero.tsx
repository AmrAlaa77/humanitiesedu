import React from 'react';
import { useInView } from '@/hooks/use-in-view';
import { ArrowRight, Sparkles } from 'lucide-react';

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
          <div className="absolute w-[26rem] h-[26rem] rounded-full bg-gradient-to-tr from-teal-400/20 via-cyan-400/10 to-transparent blur-2xl" />
          <div className="absolute w-[30rem] h-[30rem] rounded-full border border-teal-300/15 [mask-image:radial-gradient(circle,transparent_58%,black_60%)]" />

          <div className="relative group">
            <img
              src="https://images.pexels.com/photos/31406900/pexels-photo-31406900/free-photo-of-minimalist-white-smartwatch-on-light-background.jpeg?auto=compress&w=1260&h=750&dpr=1"
              alt="AURION ONE smartwatch, out of focus"
              className="relative z-10 w-[22rem] sm:w-[28rem] rounded-[2.5rem] object-cover drop-shadow-2xl blur-[3px] transition-all duration-700 group-hover:blur-[1px] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AurionHero;

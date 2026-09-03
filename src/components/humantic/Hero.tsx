import React, { useRef } from 'react';
import { ShieldCheck, ArrowRight, HeartPulse, Brain, Droplets } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import { useCountUp } from '@/hooks/use-count-up';

const BARS = [40, 55, 48, 62, 70, 65, 78, 74, 82, 79, 87, 90];

const Hero: React.FC<{ onCta: () => void }> = ({ onCta }) => {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const stats = useInView<HTMLDivElement>();
  const biomarkers = useCountUp(120, stats.inView);
  const accuracy = useCountUp(94, stats.inView);
  const score = useCountUp(87, stats.inView, 1400);

  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle 3D tilt toward the cursor — reads as a live "device" rather than a flat screenshot.
  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg) scale3d(1.01,1.01,1.01)`;
  };
  const onCardLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
  };

  return (
    <section id="index" className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.18),transparent_55%)]" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1.4s]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 text-xs font-medium mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> Preventative Medicine, Powered by AI
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            Know your body
            <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
              before it speaks.
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-xl">
            Humantic Digital turns continuous bio-monitoring into a single, actionable
            <span className="text-white font-medium"> Wellbeing Index</span> — predicting risk early so
            you can prevent, not just treat.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={onCta}
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-semibold overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-emerald-500/25"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Get Your Wellbeing Index</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo('#showcase')}
              className="px-6 py-3.5 rounded-full border border-white/15 text-white font-semibold transition-all duration-200 hover:bg-white/5 hover:border-white/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              Watch Showcase
            </button>
          </div>

          <div ref={stats.ref} className="mt-10 flex items-center gap-8 text-slate-400 text-sm">
            <div><span className="block text-2xl font-bold text-white tabular-nums">{biomarkers}+</span>biomarkers tracked</div>
            <div className="h-8 w-px bg-white/10" />
            <div><span className="block text-2xl font-bold text-white tabular-nums">{accuracy}%</span>early-risk accuracy</div>
            <div className="h-8 w-px bg-white/10" />
            <div><span className="block text-2xl font-bold text-white">24/7</span>monitoring</div>
          </div>
        </div>

        <div className="relative" style={{ perspective: '1000px' }}>
          <div
            ref={cardRef}
            onMouseMove={onCardMove}
            onMouseLeave={onCardLeave}
            className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 backdrop-blur-xl shadow-2xl transition-transform duration-200 ease-out will-change-transform"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-widest">Wellbeing Index</p>
                <p className="text-white text-sm">Live composite score</p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent tabular-nums">{score}</p>
                <p className="text-emerald-400 text-xs">+4 this week</p>
              </div>
            </div>

            <div className="h-24 flex items-end gap-1.5 mb-6">
              {BARS.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-emerald-500/40 to-cyan-400 transition-[height] duration-700 ease-out hover:from-emerald-400/60 hover:to-cyan-300"
                  style={{
                    height: stats.inView ? `${h}%` : '4%',
                    transitionDelay: stats.inView ? `${i * 45}ms` : '0ms',
                  }}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: HeartPulse, label: 'Cardio', val: '92', c: 'text-rose-300' },
                { icon: Brain, label: 'Cognitive', val: '85', c: 'text-violet-300' },
                { icon: Droplets, label: 'Metabolic', val: '83', c: 'text-cyan-300' },
              ].map((m) => (
                <div
                  key={m.label}
                  className="group rounded-2xl bg-white/[0.04] border border-white/10 p-3 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1"
                >
                  <m.icon className={`w-5 h-5 ${m.c} mb-2 transition-transform duration-300 group-hover:scale-110`} />
                  <p className="text-white text-xl font-bold">{m.val}</p>
                  <p className="text-slate-400 text-xs">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating glow that drifts behind the card for a bit of ambient life */}
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 blur-2xl animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

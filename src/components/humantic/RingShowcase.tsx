import React from 'react';
import { useInView } from '@/hooks/use-in-view';
import {
  ArrowRight,
  HeartPulse,
  Moon,
  Activity,
  Thermometer,
  Droplets,
  BatteryFull,
  Sparkles,
  ScanLine,
  Waves,
} from 'lucide-react';

const RING_HERO = 'https://d64gsuwffb70l.cloudfront.net/6a1bff16eb3a4753d1d1427d_1780341986682_5a6ff75a.jpg';
const RING_MACRO = 'https://d64gsuwffb70l.cloudfront.net/6a1bff16eb3a4753d1d1427d_1780342011058_b62b931e.png';

const metrics = [
  { icon: HeartPulse, label: 'Heart Rhythm', val: '62', unit: 'bpm', c: 'text-rose-300', bg: 'from-rose-500/20' },
  { icon: Moon, label: 'Deep Sleep', val: '1h 48m', unit: '', c: 'text-violet-300', bg: 'from-violet-500/20' },
  { icon: Activity, label: 'Recovery', val: '94', unit: '%', c: 'text-emerald-300', bg: 'from-emerald-500/20' },
  { icon: Thermometer, label: 'Skin Temp', val: '+0.2', unit: '°C', c: 'text-amber-300', bg: 'from-amber-500/20' },
  { icon: Droplets, label: 'Blood O₂', val: '98', unit: '%', c: 'text-cyan-300', bg: 'from-cyan-500/20' },
  { icon: Waves, label: 'Stress (HRV)', val: 'Calm', unit: '', c: 'text-teal-300', bg: 'from-teal-500/20' },
];

const RingShowcase: React.FC<{ onCta: () => void }> = ({ onCta }) => {
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>();
  const { ref: ringRef, inView: ringIn } = useInView<HTMLDivElement>();
  const { ref: gridRef, inView: gridIn } = useInView<HTMLDivElement>();

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="ring" className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5">
      {/* ambient glows */}
      <div className="pointer-events-none absolute top-1/4 -left-32 w-[28rem] h-[28rem] bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-0 -right-32 w-[28rem] h-[28rem] bg-cyan-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1.2s]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.06),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Heading */}
        <div
          ref={headRef}
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 text-xs font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Introducing the Aura Ring
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
            Health that fits
            <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
              in the palm of your hand.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-cyan-200/90 font-medium">
            And you’re never alone with it.
          </p>
          <p className="mt-4 text-lg text-slate-300">
            A featherlight AI ring that never sleeps — reading 7 vital signals 100 times a second and turning
            them into one calm, intelligent insight that walks beside you, day and night.
            <span className="text-white font-medium"> No screens. No noise. Just clarity, and a little company.</span>
          </p>

        </div>

        {/* Ring + live dashboard */}
        <div
          ref={ringRef}
          className={`mt-16 grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            ringIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Floating ring visual */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-emerald-500/30 via-cyan-500/20 to-transparent blur-2xl animate-pulse" />
            <div className="absolute w-80 h-80 sm:w-[26rem] sm:h-[26rem] rounded-full border border-emerald-400/20 [mask-image:radial-gradient(circle,transparent_60%,black_61%)]" />
            <div className="relative group">
              <img
                src={RING_HERO}
                alt="Aura AI wellbeing ring"
                className="relative z-10 w-64 sm:w-80 rounded-[2rem] shadow-2xl shadow-emerald-500/20 transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-2"
              />
              <div className="absolute -bottom-4 -left-4 z-20 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur px-4 py-3 shadow-xl">
                <BatteryFull className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-white text-sm font-semibold leading-none">7-day battery</p>
                  <p className="text-slate-400 text-xs">90-min full charge</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-2 z-20 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur px-4 py-3 shadow-xl">
                <ScanLine className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-white text-sm font-semibold leading-none">7 sensors</p>
                  <p className="text-slate-400 text-xs">100 reads / sec</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live metric panel */}
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-widest">Today's reading</p>
                <p className="text-white font-semibold">Everything's in balance</p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-emerald-300 text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20">
                <Sparkles className="w-3.5 h-3.5" /> AI Insight
              </div>
            </div>

            <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  style={{ transitionDelay: `${i * 80}ms` }}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b ${m.bg} to-transparent p-4 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 ${
                    gridIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                >
                  <m.icon className={`w-5 h-5 ${m.c} mb-3 transition-transform group-hover:scale-110`} />
                  <p className="text-white text-lg font-bold leading-none">
                    {m.val}
                    <span className="text-slate-400 text-xs font-normal ml-0.5">{m.unit}</span>
                  </p>
                  <p className="text-slate-400 text-xs mt-1">{m.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4">
              <p className="text-sm text-slate-200">
                <span className="text-emerald-300 font-medium">Aura suggests:</span> Your recovery is high — today is
                a great day to push your training. Hydration is trending low, drink up before noon.
              </p>
            </div>

            <button
              onClick={onCta}
              className="group mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-semibold hover:opacity-90 transition shadow-lg shadow-emerald-500/25"
            >
              Reserve Your Aura Ring
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </button>
          </div>
        </div>

        {/* Catchy feature strip */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {[
            {
              img: RING_MACRO,
              title: 'Sleep that finally makes sense.',
              desc: 'Stage-by-stage sleep tracking, decoded into a single Readiness score the moment you wake.',
            },
            {
              icon: HeartPulse,
              title: 'Catch what you can’t feel.',
              desc: 'Continuous HRV, rhythm and temperature trends flag the earliest whispers of stress or illness.',
            },
            {
              icon: Activity,
              title: 'A health check-up, minute by minute.',
              desc: 'Continuous, around-the-clock monitoring turns every signal into sustainable wellbeing — when to move, when to rest, when to breathe.',
            },
          ].map((f, i) => (
            <FeatureTile key={i} {...f} index={i} />
          ))}
        </div>

        {/* Closing line */}
        <div className="mt-20 text-center">
          <p className="text-2xl sm:text-3xl font-semibold text-white max-w-3xl mx-auto leading-snug">
            The future of wellbeing isn’t louder.
            <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent"> It’s invisible.</span>
          </p>
          <button
            onClick={() => scrollTo('#how')}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition"
          >
            See how it works <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

const FeatureTile: React.FC<{
  img?: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  index: number;
}> = ({ img, icon: Icon, title, desc, index }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 120}ms` }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-700 hover:-translate-y-2 hover:border-emerald-400/30 hover:shadow-2xl hover:shadow-emerald-500/10 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      {img ? (
        <div className="relative mb-5 overflow-hidden rounded-2xl">
          <img src={img} alt={title} className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
        </div>
      ) : (
        Icon && (
          <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 border border-white/10 transition-transform group-hover:scale-110 group-hover:rotate-6">
            <Icon className="w-6 h-6 text-emerald-300" />
          </div>
        )
      )}
      <h3 className="relative text-xl font-semibold text-white">{title}</h3>
      <p className="relative mt-2 text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
};

export default RingShowcase;

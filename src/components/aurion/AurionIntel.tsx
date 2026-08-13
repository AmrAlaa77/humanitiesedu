import React from 'react';
import { useInView } from '@/hooks/use-in-view';
import { Brain, Fingerprint, Sparkles, Infinity as InfinityIcon } from 'lucide-react';

const SPHERE = 'https://d64gsuwffb70l.cloudfront.net/6a1bff16eb3a4753d1d1427d_1780343239546_12e60a58.png';

const layers = [
  {
    icon: Fingerprint,
    title: 'It learns your baseline.',
    desc: 'Every body is different. AURION maps your unique rhythm — sleep, stress, recovery — instead of comparing you to a stranger.',
  },
  {
    icon: Brain,
    title: 'It builds your knowledge.',
    desc: 'A personal wellbeing model grows with every reading, connecting how you slept, ate, moved and felt into one living picture.',
  },
  {
    icon: Sparkles,
    title: 'It speaks in clarity.',
    desc: 'No dashboards to decode. AURION distills millions of signals into a single, gentle answer: what your body needs next.',
  },
  {
    icon: InfinityIcon,
    title: 'It never stops.',
    desc: 'A health check-up, minute by minute — quietly working in the background toward sustainable, lifelong wellbeing.',
  },
];

const AurionIntel: React.FC = () => {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="aurion-intel" className="relative py-28 overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-teal-400/10 rounded-full blur-[55px]" />


      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-14 items-center transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Sphere = the intelligence (static glow, no float loops) */}
          <div className="relative flex items-center justify-center order-2 lg:order-1">
            <div className="absolute w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-400/20 to-teal-300/10 blur-2xl" />
            <div className="relative">
              <img src={SPHERE} alt="AURION intelligence sphere" className="w-72 sm:w-96 drop-shadow-2xl" />
            </div>
            {/* frosted chips */}
            <div className="absolute -left-2 top-8 rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-2.5 text-sm text-white shadow-xl">
              Sleep debt: <span className="text-teal-200 font-semibold">cleared</span>
            </div>
            <div className="absolute -right-2 bottom-12 rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-2.5 text-sm text-white shadow-xl">
              Readiness: <span className="text-cyan-200 font-semibold">92</span>
            </div>

          </div>

          {/* Copy + layers */}
          <div className="order-1 lg:order-2">
            <p className="text-sm uppercase tracking-[0.3em] text-teal-300 mb-4">The difference</p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              The watch senses.
              <span className="block bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text text-transparent">
                The intelligence understands.
              </span>
            </h2>
            <p className="mt-5 text-slate-300 text-lg leading-relaxed">
              Most wearables hand you data and walk away. AURION pairs the watch with a personalised
              wellbeing knowledge engine — so you don’t get numbers, you get <span className="text-white">you</span>.
            </p>

            <div className="mt-9 grid sm:grid-cols-2 gap-4">
              {layers.map((l, i) => (
                <Layer key={l.title} {...l} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Layer: React.FC<{ icon: React.ComponentType<{ className?: string }>; title: string; desc: string; index: number }> = ({
  icon: Icon,
  title,
  desc,
  index,
}) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-all duration-700 hover:-translate-y-1 hover:border-teal-300/30 ${

        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-300/20 to-cyan-400/20 border border-white/10 group-hover:rotate-6 transition-transform">
        <Icon className="w-5 h-5 text-teal-200" />
      </div>
      <h3 className="text-white font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
};

export default AurionIntel;

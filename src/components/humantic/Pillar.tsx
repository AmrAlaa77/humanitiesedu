import React from 'react';
import { Brain, Activity, Waves, GitBranch, Users, Gauge } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const metrics = [
  { icon: Waves, label: 'Social contagion dynamics', value: 'Live mapping' },
  { icon: Users, label: 'Emotional mirror syncing', value: 'Per-team' },
  { icon: GitBranch, label: 'Communication friction', value: 'Early signal' },
  { icon: Gauge, label: 'Cognitive load index', value: '0–100 scale' },
];

const Pillar: React.FC = () => {
  const left = useInView<HTMLDivElement>({ once: false });
  const right = useInView<HTMLDivElement>({ once: false });

  return (
    <section id="pillar" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-[40rem] h-[40rem] rounded-full bg-emerald-500/[0.07] blur-[140px]" style={{ animation: 'pillarDrift 14s ease-in-out infinite' }} />
        <div className="absolute bottom-0 right-1/4 w-[32rem] h-[32rem] rounded-full bg-cyan-500/[0.06] blur-[120px]" style={{ animation: 'pillarDrift 18s ease-in-out infinite reverse' }} />
      </div>
      <style>{`
        @keyframes pillarDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(3%, -4%) scale(1.08); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — narrative */}
          <div
            ref={left.ref}
            className={`transition-all duration-700 ease-out ${left.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
          <span className="inline-flex items-center gap-2 text-emerald-400 text-sm font-semibold uppercase tracking-widest">
            <span className="tabular-nums text-emerald-300/70">04</span>
            <span className="h-px w-6 bg-emerald-400/40" />
            Platform Pillar · Sociophysiology &amp; Bio-Neurometrics
          </span>

          <h2 className="mt-5 text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.05]">
            Where biology meets
            <span className="block bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              organisational truth.
            </span>
          </h2>

          <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-xl">
            Our proprietary analysis layer assesses organisational health on a
            collective biochemical scale — tracking social contagion dynamics,
            emotional mirror syncing within project groups, and pinpointing
            communication friction before negative cognitive load harms
            operational momentum.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5">
            <Brain className="w-4 h-4 text-emerald-300" />
            <span className="text-slate-300 text-sm font-medium tracking-wide uppercase">
              Organisational behavior
            </span>
          </div>
          </div>

          {/* Right — metric panel */}
          <div
            ref={right.ref}
            className={`relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-7 sm:p-9 backdrop-blur transition-all duration-700 ease-out ${
              right.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 border border-emerald-400/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-white font-semibold leading-tight">Collective Biochemical Scale</p>
                <p className="text-slate-500 text-xs">Real-time organisational health</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="group rounded-2xl border border-white/10 bg-slate-950/40 p-5 hover:border-emerald-400/30 transition-all"
              >
                <m.icon className="w-5 h-5 text-cyan-300 mb-3 group-hover:scale-110 transition" />
                <p className="text-white text-sm font-medium leading-snug">{m.label}</p>
                <p className="text-emerald-300/80 text-xs mt-1.5 font-semibold uppercase tracking-wide">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-xs uppercase tracking-wide">Team sync coherence</span>
              <span className="text-emerald-300 text-sm font-semibold tabular-nums">87%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-[width] duration-1000 ease-out"
                style={{ width: right.inView ? '87%' : '0%' }}
              />
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pillar;

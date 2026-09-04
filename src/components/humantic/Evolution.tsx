import React from 'react';
import { Lightbulb, FlaskConical, Landmark, CheckCircle2, Rocket, Globe2 } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

type Phase = {
  icon: React.ElementType;
  tag: string;
  period: string;
  title: string;
  desc: string;
  status: 'done' | 'active' | 'next';
};

const phases: Phase[] = [
  {
    icon: Lightbulb,
    tag: 'Genesis',
    period: 'The Spark',
    title: 'A cause for humanity is born',
    desc: 'It began not as a product, but as a conviction — that precision health intelligence belongs to every human being, and that technology should make the world a safer place.',
    status: 'done',
  },
  {
    icon: FlaskConical,
    tag: 'Research',
    period: 'Foundation',
    title: 'Bio-sensing science engineered',
    desc: 'Seven precision bio-sensors miniaturised into four grams of aerospace-grade titanium. Months of validation turned a vision into measurable, defensible science.',
    status: 'done',
  },
  {
    icon: Landmark,
    tag: 'Vision 2030 Portal',
    period: 'The Pitch',
    title: 'Carried to the highest level',
    desc: 'The cause was presented where a human-centered cause matched ours — aligned with a national vision built for those who think beyond business, in service of humanity.',
    status: 'done',
  },
  {
    icon: CheckCircle2,
    tag: 'The Moment',
    period: 'They Said Yes',
    title: 'The most powerful word in the world',
    desc: 'Where ordinary proposals were turned away, a cause bigger than profit was recognised — and answered with a single, history-making YES.',
    status: 'done',
  },
  {
    icon: Rocket,
    tag: 'Now',
    period: 'Pre-Launch',
    title: 'AURION ONE prepares for the world',
    desc: 'The manifesto becomes a platform. Final engineering, brand and access systems converge toward a launch window measured in weeks, not years.',
    status: 'active',
  },
  {
    icon: Globe2,
    tag: 'The Horizon',
    period: 'Vision 2030',
    title: 'A safer place for all',
    desc: 'Beyond launch lies the true cause — a global health intelligence layer that protects, prevents and empowers humanity at scale.',
    status: 'next',
  },
];

const statusStyles: Record<Phase['status'], { dot: string; label: string; chip: string }> = {
  done: {
    dot: 'bg-emerald-400 border-emerald-300',
    label: 'Achieved',
    chip: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/[0.07]',
  },
  active: {
    dot: 'bg-cyan-400 border-cyan-300 animate-pulse',
    label: 'In Motion',
    chip: 'text-cyan-300 border-cyan-400/30 bg-cyan-400/[0.07]',
  },
  next: {
    dot: 'bg-white/20 border-white/30',
    label: 'On the Horizon',
    chip: 'text-slate-300 border-white/15 bg-white/[0.04]',
  },
};

const Evolution: React.FC = () => {
  const timeline = useInView<HTMLDivElement>({ once: false });

  return (
  <section id="evolution" className="relative py-24 overflow-hidden">
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1/3 left-1/4 w-[36rem] h-[36rem] rounded-full bg-emerald-500/[0.06] blur-[150px]" />
      <div className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] rounded-full bg-cyan-500/[0.05] blur-[130px]" />
    </div>

    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 text-emerald-400 text-sm font-semibold uppercase tracking-widest">
          <span className="tabular-nums text-emerald-300/70">05</span>
          <span className="h-px w-6 bg-emerald-400/40" />
          The Evolution of the Initiative
        </span>
        <h2 className="mt-5 text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.05]">
          From a single conviction
          <span className="block bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            to a global cause.
          </span>
        </h2>
        <p className="mt-6 text-slate-400 text-lg leading-relaxed">
          Every milestone below marks a step in the journey — the moments where a
          cause for humanity grew into a movement, and where the world's most
          powerful word changed everything.
        </p>
      </div>

      {/* Timeline */}
      <div className="mt-16 relative">
        {/* vertical spine */}
        <div className="absolute left-[1.15rem] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400/40 via-cyan-400/30 to-white/5 sm:left-1/2 sm:-translate-x-1/2" />

        <div ref={timeline.ref} className="space-y-8">
          {phases.map((p, i) => {
            const s = statusStyles[p.status];
            const left = i % 2 === 0;
            return (
              <div
                key={p.title}
                style={{ transitionDelay: timeline.inView ? `${i * 90}ms` : '0ms' }}
                className={`relative sm:grid sm:grid-cols-2 sm:gap-12 transition-all duration-700 ease-out ${
                  timeline.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${left ? '' : 'sm:[direction:rtl]'}`}
              >
                {/* node */}
                <span
                  className={`absolute left-[1.15rem] -translate-x-1/2 top-7 z-10 w-4 h-4 rounded-full border-2 ${s.dot} sm:left-1/2`}
                />

                {/* card */}
                <div
                  className={`pl-12 sm:pl-0 ${
                    left ? 'sm:pr-12 sm:text-right' : 'sm:pl-12 sm:[direction:ltr]'
                  }`}
                >
                  <div className="group rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-7 backdrop-blur transition-all duration-300 hover:border-emerald-400/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10">
                    <div
                      className={`flex items-center gap-3 ${
                        left ? 'sm:flex-row-reverse' : ''
                      }`}
                    >
                      <div className="w-11 h-11 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                        <p.icon className="w-5 h-5 text-slate-950" />
                      </div>
                      <div className={left ? 'sm:text-right' : ''}>
                        <p className="text-white font-semibold leading-tight">{p.tag}</p>
                        <p className="text-slate-500 text-xs uppercase tracking-wide">{p.period}</p>
                      </div>
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-white tracking-tight">{p.title}</h3>
                    <p className="mt-3 text-slate-400 text-sm leading-relaxed">{p.desc}</p>

                    <div className={`mt-5 flex ${left ? 'sm:justify-end' : ''}`}>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${s.chip}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {s.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* spacer for opposite column */}
                <div className="hidden sm:block" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
  );
};

export default Evolution;

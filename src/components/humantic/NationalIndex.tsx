import React from 'react';
import { Gauge, Brain, ScrollText, TrendingUp, Layers, Target } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const features = [
  { icon: Gauge, title: 'National Wellbeing Index', desc: 'A single, standardized score tracking student wellbeing across every participating institution.' },
  { icon: Brain, title: 'AI-Driven Diagnostics', desc: 'Predictive AI flags emerging behavioral or physiological risk before it becomes a crisis.' },
  { icon: ScrollText, title: 'Diploma-Regulated Outcomes', desc: 'Findings feed a Gen Z & Alpha-friendly diploma, aligned with UN-Habitat Quality of Life domains.' },
];

const impact = [
  { icon: TrendingUp, num: '01', title: 'Early Intervention', desc: 'Catch illbeing conditions before age 14–20s, when 50–75% first emerge.' },
  { icon: Layers, num: '02', title: 'National Scale-Up', desc: "One cohort's data becomes the evidence base for a diploma deployable to every KSA institution." },
  { icon: Target, num: '03', title: 'Strategic Organizational Goals', desc: 'Aggregated national wellbeing data supports Vision 2030 human capability reporting and QoL UN-Habitat reporting.' },
];

const NationalIndex: React.FC = () => {
  const feat = useInView<HTMLDivElement>({ once: false });
  const imp = useInView<HTMLDivElement>({ once: false });

  return (
  <section id="national-index" className="relative py-24 text-center">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">What Your Website Should Say</span>
      <h2 className="mt-4 text-3xl sm:text-5xl font-bold text-white tracking-tight max-w-3xl mx-auto">
        Digitizing Human Wellbeing Metrics for National Capability Development
      </h2>
      <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
        A Wellbeing Index that turns data into capability, one human at a time.
      </p>
      <p className="mt-6 text-slate-400 max-w-2xl mx-auto leading-relaxed">
        We digitize human wellbeing into a measurable Index — combining AI diagnostics, behavioral mapping,
        and bio-physiological insight into one national framework.
      </p>

      <div ref={feat.ref} className="mt-14 grid sm:grid-cols-3 gap-5 text-left max-w-4xl mx-auto">
        {features.map((f, i) => (
          <div
            key={f.title}
            style={{ transitionDelay: feat.inView ? `${i * 100}ms` : '0ms' }}
            className={`group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-700 ease-out hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.04] ${
              feat.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <f.icon className="w-5 h-5 text-emerald-300" />
            </div>
            <p className="text-white font-semibold mb-2">{f.title}</p>
            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-16 text-xs font-semibold uppercase tracking-widest text-slate-500">National Impact &middot; From Data to Capability</p>
      <p className="mt-4 text-emerald-300 max-w-2xl mx-auto leading-relaxed">
        The Wellbeing AI Index is not mere statistics — it is a gift from the Kingdom of Saudi Arabia to the whole
        world, a national model built to be shared, not shelved.
      </p>

      <div ref={imp.ref} className="mt-8 grid sm:grid-cols-3 gap-5 text-left max-w-5xl mx-auto">
        {impact.map((i, idx) => (
          <div
            key={i.num}
            style={{ transitionDelay: imp.inView ? `${idx * 100}ms` : '0ms' }}
            className={`group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-700 ease-out hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.04] ${
              imp.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="text-2xl font-bold text-emerald-400 mb-3 transition-transform duration-300 group-hover:scale-110">{i.num}</div>
            <p className="text-white font-semibold mb-2">{i.title}</p>
            <p className="text-slate-400 text-sm leading-relaxed">{i.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default NationalIndex;

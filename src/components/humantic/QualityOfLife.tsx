import React from 'react';
import { HeartPulse, GraduationCap, Users, Landmark } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

const domains = [
  {
    icon: HeartPulse,
    title: 'Health & Wellbeing',
    desc: 'SDOH education from adolescence. Mental Wellness, Healthy Life Expectancy, preventative medicine.',
    tag: 'SDG 3',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    desc: 'British certifications, campus-to-career bridge, OECD-PIAAC mastery, SEL integration.',
    tag: 'SDG 4 & 8',
  },
  {
    icon: Users,
    title: 'Social Cohesion',
    desc: 'Community Belonging (86.2). Support Circle gap (49.0) addressed through behaviorometric approach.',
    tag: 'SDG 16',
  },
  {
    icon: Landmark,
    title: 'Culture & Recreation',
    desc: 'Royal Commission AlUla. Tourism through behavioral psychology and visitor experience.',
    tag: 'SDG 11',
  },
];

const QualityOfLife: React.FC = () => {
  const grid = useInView<HTMLDivElement>({ once: false });

  return (
  <section id="quality-of-life" className="relative py-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">UN Habitat Quality of Life &middot; One Human at a Time</span>
      <h2 className="mt-4 text-3xl sm:text-5xl font-bold text-white tracking-tight">
        Measurable. <span className="text-emerald-400">Human.</span><br />City. Country. Continent.
      </h2>
      <p className="mt-5 text-slate-400 text-lg max-w-2xl">
        We contribute to the UN Habitat Quality of Life Index not with aggregate data — but with the Human Layer
        beneath it. One assessed individual creates a data point. One organisation creates a pattern. One city
        creates a baseline.
      </p>

      <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">QoL Index Domains &middot; Our Contribution</p>
      <div ref={grid.ref} className="grid sm:grid-cols-2 gap-5">
        {domains.map((d, i) => (
          <div
            key={d.title}
            style={{ transitionDelay: grid.inView ? `${i * 90}ms` : '0ms' }}
            className={`group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-700 ease-out hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.04] ${
              grid.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
              <d.icon className="w-5 h-5 text-emerald-300" />
            </div>
            <p className="text-white font-semibold mb-2">{d.title}</p>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{d.desc}</p>
            <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-400/10 border border-emerald-400/25 px-2.5 py-1 rounded-full">
              {d.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default QualityOfLife;

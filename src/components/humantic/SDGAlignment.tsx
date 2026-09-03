import React from 'react';
import { useInView } from '@/hooks/use-in-view';

const sdgTiles = [
  { num: 3, label: 'Good Health & Well-Being', color: 'bg-[#4C9F38]' },
  { num: 4, label: 'Quality Education', color: 'bg-[#C5192D]' },
  { num: 5, label: 'Gender Equality', color: 'bg-[#FF3A21]' },
  { num: 8, label: 'Decent Work', color: 'bg-[#A21942]' },
  { num: 10, label: 'Reduced Inequalities', color: 'bg-[#DD1367]' },
  { num: 16, label: 'Peace & Justice', color: 'bg-[#00689D]' },
];

const sdohActions = [
  'Achieve universal health coverage',
  'Address social determinants of health',
  'Expand access to preventative screening',
  'Strengthen behavioral & mental health support',
  'Close the youth wellbeing gap',
  'Embed workplace wellbeing into strategic organizational goals',
];

const SDGAlignment: React.FC = () => {
  const tiles = useInView<HTMLDivElement>();
  const actions = useInView<HTMLDivElement>();

  return (
  <section id="sdg-alignment" className="relative py-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Aligned to the UN SDGs</span>
      <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-emerald-400 tracking-tight">Social</h2>

      <div ref={tiles.ref} className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl">
        {sdgTiles.map((s, i) => (
          <div
            key={s.num}
            style={{ transitionDelay: tiles.inView ? `${i * 60}ms` : '0ms' }}
            className={`${s.color} rounded-xl p-4 aspect-square flex flex-col justify-between transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-xl cursor-default ${
              tiles.inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
            }`}
          >
            <div className="font-serif font-bold text-2xl text-white">{s.num}</div>
            <div className="text-[11px] font-bold text-white leading-tight uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-white font-medium text-lg leading-relaxed max-w-2xl">
        Adaptation and self-management to changes and challenges in the environment, as well as the ability to
        develop satisfactory relationships with other people.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8 max-w-3xl transition-colors duration-300 hover:bg-white/[0.06] hover:border-white/20">
        <p className="text-white font-semibold text-lg">
          Despite progress across some of the SDG 3 goals, overall, the region is largely off-track.
        </p>
      </div>

      <p className="mt-12 text-xs font-semibold uppercase tracking-widest text-emerald-400">How We Address SDOH</p>
      <div ref={actions.ref} className="mt-5 grid sm:grid-cols-2 gap-x-10 gap-y-3 max-w-3xl">
        {sdohActions.map((a, i) => (
          <div
            key={a}
            style={{ transitionDelay: actions.inView ? `${i * 70}ms` : '0ms' }}
            className={`group flex items-start gap-3 transition-all duration-500 ease-out ${
              actions.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 transition-transform duration-300 group-hover:scale-150" />
            <span className="text-slate-300 text-sm transition-colors group-hover:text-white">{a}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default SDGAlignment;

import React from 'react';

const pledgeItems = [
  { label: 'MISA Approved', desc: 'Fully licensed by the Ministry of Investment of Saudi Arabia' },
  { label: 'Saudi Vision 2030', desc: 'Quality of Life · Health Transformation · Human Capability Development' },
  { label: 'UN SDG 3 · UN Habitat', desc: 'Good Health & Wellbeing — our clinical foundation and global mandate' },
  { label: 'Our Pledge', desc: 'Designing the future. As humanly possible. One human at a time.' },
];

const Pledge: React.FC = () => (
  <section id="pledge" className="relative py-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 px-4 py-1.5 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
        MISA Approved &middot; HCDP Aligned &middot; Vision 2030 Partner
      </span>

      <p className="mt-8 font-serif italic text-3xl sm:text-4xl leading-snug text-slate-100 max-w-3xl">
        &ldquo;While the world watches the bottom line, we watch the{' '}
        <span className="text-emerald-400">baseline of human health.</span>&rdquo;
      </p>

      <p className="mt-6 text-slate-400 max-w-2xl leading-relaxed">
        By uncovering the neurophysiological drivers of your organisation, we align your business with the Saudi
        Vision 2030 Quality of Life goals. This ensures that the Kingdom&apos;s growth is as sustainable as it is
        profitable — and as humanly possible as it is grand.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
        {pledgeItems.map((p) => (
          <div key={p.label} className="bg-slate-950 p-6">
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">{p.label}</p>
            <p className="text-slate-300 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 font-serif italic text-slate-500 text-base">Essence over output. Always.</p>
    </div>
  </section>
);

export default Pledge;

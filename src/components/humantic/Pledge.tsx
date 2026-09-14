import React from 'react';

const pledgeItems = [
  {
    label: 'MISA Approved',
    desc:
      'National & Regulatory Frameworks — officially approved through MISA (Ministry of Investment) and the Saudi Business Center, and via the Saudi Vision 2030 portal (Invest Saudi).',
  },
  {
    label: 'Saudi Vision 2030',
    desc:
      "National Priority Alignment — the approval process requires demonstrating how the enterprise directly advances Vision 2030 pillars, specifically the Human Capability Development Program and the Health, Wellbeing and Quality of Life Initiatives, by modernizing human capital and organizational behavioral infrastructure. An enterprise officially sanctioned to pioneer high-impact sectors within the Kingdom.",
  },
  {
    label: 'Accreditation · Certification & Professional Development',
    desc:
      'UK-aligned academic validation frameworks. Our programmes carry the rigour of renowned British awarding and accreditation bodies — whose recognition speaks to the standards we uphold and of which we are proud members. Exclusive for Saudi nationals — through B2G, B2B and B2C, we offer semi/fully funded British certification programmes.',
  },
];

const Pledge: React.FC = () => (
  <section id="pledge" className="relative py-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 px-4 py-1.5 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
        MISA Approved &middot; HCDP Aligned &middot; Vision 2030 Portal
      </span>

      <p className="mt-8 font-serif italic text-3xl sm:text-4xl leading-snug text-slate-100 max-w-3xl">
        &ldquo;While the world watches the bottom line, we watch the{' '}
        <span className="text-emerald-400">baseline of human health.</span>&rdquo;
      </p>

      <p className="mt-6 text-slate-400 max-w-2xl leading-relaxed">
        Conventional business analytics tell you what happened &mdash; the human baseline tells you why. We surface
        the human signals beneath organisational performance, connecting neurophysiology, behaviour and digital
        intelligence to build healthier, more sustainable ways of working. Aligned with Saudi Vision 2030&rsquo;s
        Quality of Life goals, we make growth not only measurable and sustainable, but deeply human.
      </p>

      <div className="mt-14">
        <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">The Humantic Edge</span>
        <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight max-w-2xl">
          Strategy, science and humanity &mdash; brought together differently.
        </h3>
      </div>

      <div className="mt-8 grid gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
        {pledgeItems.map((p) => (
          <div key={p.label} className="bg-white/[0.05] p-6 transition-colors duration-300 hover:bg-emerald-500/[0.08]">
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">{p.label}</p>
            <p className="text-slate-300 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-emerald-400 text-xs font-bold uppercase tracking-widest">Our Pledge</p>
      <p className="mt-2 text-slate-300 text-base leading-relaxed max-w-2xl">
        Designing the future. As humanly possible. One human at a time.
      </p>

      <p className="mt-10 font-serif italic text-slate-500 text-base">Essence over output. Always.</p>
    </div>
  </section>
);

export default Pledge;

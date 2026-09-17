import React from 'react';

const pledgeItems = [
  {
    label: 'MISA Licensed',
    desc:
      'National & Regulatory Frameworks — officially licensed through MISA (Ministry of Investment) and the Saudi Business Centre, and via the Saudi Vision 2030 portal (Invest Saudi).',
  },
  {
    label: 'Saudi Vision 2030',
    desc:
      "National Priority Alignment — the approval process requires demonstrating how the enterprise directly advances Vision 2030 pillars, specifically the Human Capability Development Program and the Health, Wellbeing and Quality of Life Initiatives, by modernizing human capital and organizational behavioral infrastructure. An enterprise officially sanctioned to pioneer high-impact sectors within the Kingdom, with direct portal affiliation to Saudi Vision 2030 (Invest Saudi).",
  },
  {
    label: 'Accreditation · Certification & Professional Development',
    desc: (
      <>
        UK-aligned academic validation frameworks. We formed joint ventures and partnerships with British
        colleges and organisations that are members of leading British accreditation bodies, whose
        recognition speaks to the standards we uphold.
        <br />
        <br />
        <span className="font-semibold text-white">
          Exclusive for Saudi nationals — through B2G, B2B and B2C, we offer semi/fully funded British
          certification programmes throughout 2025–2026.
        </span>
      </>
    ),
  },
];

const Pledge: React.FC = () => (
  <section id="pledge" className="relative py-24">
    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 px-4 py-1.5 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
        MISA Licensed &middot; HCDP Aligned &middot; Vision 2030 Portal
      </span>

      <div className="mt-8">
        <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">The Humantic Edge</span>
        <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight max-w-2xl">
          Strategy, science and humanity &mdash; brought together differently.
        </h3>

        <details className="group mt-6">
          <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <p className="font-serif italic text-2xl sm:text-3xl leading-snug text-slate-100 max-w-3xl">
              &ldquo;While the world watches the bottom line, we watch the{' '}
              <span className="text-emerald-400">baseline of human health.</span>&rdquo;
            </p>
            <p className="mt-4 text-slate-400 max-w-2xl leading-relaxed line-clamp-2 group-open:hidden">
              Conventional business analytics tell you what happened &mdash; the human baseline tells you why. We
              surface the human signals beneath organisational performance, connecting neurophysiology, behaviour
              and digital intelligence to build healthier, more sustainable ways of working.
            </p>
            <p className="mt-4 hidden text-slate-400 max-w-2xl leading-relaxed group-open:block">
              Conventional business analytics tell you what happened &mdash; the human baseline tells you why. We
              surface the human signals beneath organisational performance, connecting neurophysiology, behaviour
              and digital intelligence to build healthier, more sustainable ways of working. Aligned with Saudi
              Vision 2030&rsquo;s Quality of Life goals, we make growth not only measurable and sustainable, but
              deeply human.
            </p>
            <span className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-emerald-400 group-open:hidden">
              <span className="text-base leading-none">+</span> Read more
            </span>
          </summary>
        </details>
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

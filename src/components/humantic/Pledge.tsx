import React, { useState } from 'react';
import { Building2, Target, GraduationCap } from 'lucide-react';

const pledgeItems = [
  {
    label: 'MISA Approved',
    icon: Building2,
    desc:
      'National & Regulatory Frameworks — officially approved through MISA (Ministry of Investment) and the Saudi Business Center, and via the Saudi Vision 2030 portal (Invest Saudi).',
  },
  {
    label: 'Saudi Vision 2030',
    icon: Target,
    desc:
      "National Priority Alignment — the approval process requires demonstrating how the enterprise directly advances Vision 2030 pillars, specifically the Human Capability Development Program and the Health, Wellbeing and Quality of Life Initiatives, by modernizing human capital and organizational behavioral infrastructure. An enterprise officially sanctioned to pioneer high-impact sectors within the Kingdom.",
  },
  {
    label: 'Accreditation · Certification & Professional Development',
    icon: GraduationCap,
    desc:
      'UK-aligned academic validation frameworks. Our programmes carry the rigour of renowned British awarding and accreditation bodies — whose recognition speaks to the standards we uphold and of which we are proud members. Exclusive for Saudi nationals — through B2G, B2B and B2C, we offer semi/fully funded British certification programmes.',
  },
];

// Cursor-tracking spotlight: sets the radial-gradient center to the pointer position within the
// element's own bounds via CSS custom properties, instead of a React re-render per mouse move.
const onSpotlightMove = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--sx', `${e.clientX - r.left}px`);
  el.style.setProperty('--sy', `${e.clientY - r.top}px`);
};

const Pledge: React.FC = () => {
  const [active, setActive] = useState(0);
  const ActiveIcon = pledgeItems[active].icon;

  return (
    <section id="pledge" className="relative py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 px-4 py-1.5 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
          MISA Approved &middot; HCDP Aligned &middot; Vision 2030 Portal
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

        {/* Tab switcher: click a credential to bring its detail below -- only one shown at a
            time, instead of all three walls of text competing for attention at once. */}
        <div className="mt-8 rounded-2xl border border-white/10 overflow-hidden">
          <div className="flex flex-wrap sm:flex-nowrap">
            {pledgeItems.map((p, i) => {
              const Icon = p.icon;
              const isActive = i === active;
              return (
                <button
                  key={p.label}
                  onClick={() => setActive(i)}
                  onMouseMove={onSpotlightMove}
                  style={
                    {
                      '--sx': '50%',
                      '--sy': '50%',
                      background: isActive
                        ? 'radial-gradient(240px circle at var(--sx) var(--sy), rgba(52,211,153,0.16), transparent 70%)'
                        : undefined,
                    } as React.CSSProperties
                  }
                  className={`group relative flex-1 min-w-[9rem] flex items-center gap-2.5 px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide transition-colors duration-300 border-b-2 ${
                    isActive
                      ? 'text-white border-emerald-400 bg-white/[0.04]'
                      : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/[0.02]'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 transition-colors ${isActive ? 'text-emerald-300' : 'text-slate-500 group-hover:text-emerald-300/70'}`} />
                  <span className="normal-case font-medium leading-tight">{p.label}</span>
                </button>
              );
            })}
          </div>

          <div
            onMouseMove={onSpotlightMove}
            style={{ '--sx': '50%', '--sy': '50%' } as React.CSSProperties}
            className="relative bg-white/[0.02] p-6 sm:p-8"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
              style={{ background: 'radial-gradient(320px circle at var(--sx) var(--sy), rgba(52,211,153,0.10), transparent 70%)' }}
            />
            <div className="relative flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl bg-emerald-400/15 border border-emerald-400/25 flex items-center justify-center">
                <ActiveIcon className="w-5 h-5 text-emerald-300" />
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{pledgeItems[active].desc}</p>
            </div>
          </div>
        </div>

        <p className="mt-10 text-emerald-400 text-xs font-bold uppercase tracking-widest">Our Pledge</p>
        <p className="mt-2 text-slate-300 text-base leading-relaxed max-w-2xl">
          Designing the future. As humanly possible. One human at a time.
        </p>

        <p className="mt-10 font-serif italic text-slate-500 text-base">Essence over output. Always.</p>
      </div>
    </section>
  );
};

export default Pledge;

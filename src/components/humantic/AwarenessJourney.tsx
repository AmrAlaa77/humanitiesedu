import React from 'react';
import { CircleDot, Watch } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';

/**
 * Sits directly after the HUMAN hero reel. Two-step story (awareness, then
 * personal) closing on a single line — styled to match the rest of the
 * site's design language (same palette/typography as HowItWorks etc.),
 * not a standalone visual treatment. Scroll-reveal + hover motion match the
 * rest of the page rather than sitting static beneath an otherwise-animated hero.
 */

const steps = [
  {
    icon: CircleDot,
    kicker: 'First, awareness.',
    title: 'Hybrid Awareness Classes',
    sub: 'In-Person + Digital',
    desc: 'One clear picture drawn from three sciences — how people function under pressure, over time, and alongside each other — made teachable for every age.',
  },
  {
    icon: Watch,
    kicker: 'Then, it gets personal.',
    title: 'A Wearable That Understands You',
    sub: undefined,
    desc: "A wearable that listens to your body and hands the understanding back to you: how you're really doing, what's changing, and where a small shift now saves you later.",
  },
];

const AwarenessJourney: React.FC = () => {
  const head = useInView<HTMLDivElement>();
  const list = useInView<HTMLDivElement>();
  const closing = useInView<HTMLParagraphElement>();

  return (
    <section className="relative py-20 sm:py-24 bg-slate-950 text-white overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-emerald-500/[0.06] blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8">
        <div
          ref={head.ref}
          className={`transition-all duration-700 ease-out ${head.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Humantic Digital</span>

          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug">
            Technology built to feel human — decoding how the body copes and the mind works, in language everyone
            can understand.
          </h2>
        </div>

        <div ref={list.ref} className="mt-10 sm:mt-12 space-y-4 sm:space-y-5">
          {steps.map((s, i) => (
            <div
              key={s.title}
              style={{ transitionDelay: list.inView ? `${i * 140}ms` : '0ms' }}
              className={`group flex gap-4 sm:gap-5 rounded-2xl border border-transparent p-4 sm:p-5 -mx-4 sm:-mx-5 transition-all duration-700 ease-out hover:border-emerald-400/20 hover:bg-white/[0.03] ${
                list.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <s.icon className="w-5 h-5 text-slate-950" />
              </div>
              <div className="min-w-0">
                <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">{s.kicker}</span>
                <h3 className="mt-1 text-white font-semibold text-base sm:text-lg">{s.title}</h3>
                {s.sub && <p className="mt-1 text-slate-500 text-xs font-semibold uppercase tracking-wide">{s.sub}</p>}
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p
          ref={closing.ref}
          className={`mt-10 sm:mt-12 text-slate-300 text-base sm:text-lg leading-relaxed transition-all duration-700 ease-out ${
            closing.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Preventative medicine, before the body has to suffer — safeguarding your health, your wellbeing, and the
          relationships you'd otherwise lose.
        </p>
      </div>
    </section>
  );
};

export default AwarenessJourney;

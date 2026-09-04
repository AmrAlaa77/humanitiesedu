import React from 'react';
import { Lightbulb, Watch } from 'lucide-react';
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
    icon: Lightbulb,
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
  // once: false -- replay the entrance every time this scrolls into view, scrolling
  // either direction, instead of only animating in the first time (more alive on re-visit).
  const head = useInView<HTMLDivElement>({ once: false });
  const list = useInView<HTMLDivElement>({ once: false });
  const closing = useInView<HTMLParagraphElement>({ once: false });

  return (
    <section className="relative py-20 sm:py-24 bg-slate-950 text-white overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-emerald-500/[0.06] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div
          ref={head.ref}
          className={`max-w-2xl transition-all duration-700 ease-out ${head.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">Humantic Digital</span>

          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-snug">
            Technology built to feel human — decoding how the body copes and the mind works, in language everyone
            can understand.
          </h2>
        </div>

        <div ref={list.ref} className="mt-10 sm:mt-14 grid md:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.title}
              style={{ transitionDelay: list.inView ? `${i * 140}ms` : '0ms' }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-700 ease-out hover:-translate-y-1.5 hover:border-emerald-400/30 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-emerald-500/10 ${
                list.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="absolute -top-3 -right-3 text-6xl font-bold text-white/[0.06]">{`0${i + 1}`}</div>
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <s.icon className="w-6 h-6 text-slate-950" />
              </div>
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">{s.kicker}</span>
              <h3 className="mt-2 text-white font-semibold text-xl">{s.title}</h3>
              {s.sub && <p className="mt-1 text-slate-500 text-xs font-semibold uppercase tracking-wide">{s.sub}</p>}
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <p
          ref={closing.ref}
          className={`mt-12 text-center text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto transition-all duration-700 ease-out ${
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

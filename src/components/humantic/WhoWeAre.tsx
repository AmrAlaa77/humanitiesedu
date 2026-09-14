import React from 'react';

/**
 * "Who We Are" -- moved out of NarrativeReel's full-height hero (where it used to fill the
 * lower half) so the bio-vitality hero and Living Matrix can sit next to each other without
 * this block between them. Content unchanged, just re-wrapped as its own section.
 */
const WhoWeAre: React.FC = () => (
  <section className="relative py-16 sm:py-20 text-white">
    <div className="max-w-2xl mx-auto px-5 sm:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
        Humantic Digital &middot; Riyadh
      </p>
      <div className="mt-3 flex items-center gap-2">
        <span className="h-px w-6 bg-emerald-400/50" />
        <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">Who We Are</span>
      </div>
      <h2 className="mt-4 font-serif text-2xl sm:text-4xl font-bold leading-tight tracking-tight text-white">
        These 17 years are
        <span className="block bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
          what made Humantic Digital what it is today.
        </span>
      </h2>
      <details className="group mt-5">
        <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden">
          <span className="line-clamp-2 text-sm sm:text-base leading-relaxed text-slate-300 group-open:hidden">
            Built on a 17-year foundation of international strategic joint ventures across the United
            Kingdom and the GCC &mdash; including our legacy as the exclusive MENA educational arm for the
            British College City Oxford &mdash; we are transitioning from the college&rsquo;s humanitarian
            and development division into Humantic Digital: a sovereign medical-digital entity dedicated
            to Behaviorometric Engineering, Bio-Organizational Development, and British-accredited Executive,
            People and Culture education.
          </span>
          <span className="hidden text-sm sm:text-base leading-relaxed text-slate-300 group-open:inline">
            Built on a 17-year foundation of international strategic joint ventures across the United
            Kingdom and the GCC &mdash; including our legacy as the exclusive MENA educational arm for the
            British College City Oxford &mdash; we are transitioning from the college&rsquo;s humanitarian
            and development division into <span className="font-semibold text-white">Humantic Digital</span>:
            a sovereign medical-digital entity dedicated to Behaviorometric Engineering, Bio-Organizational
            Development, and British-accredited Executive, People and Culture education.
          </span>
          <span className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-emerald-400 group-open:hidden">
            <span className="text-base leading-none">+</span> Learn More
          </span>
        </summary>
      </details>
      <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
        Led by <span className="font-semibold text-white">Dr. Sherina Abraham</span> &mdash; Medical
        Doctor, Entrepreneurial Investor, and Chair &amp; CEO of Humantic Digital, approved by the
        Ministry of Investment Saudi Arabia.
      </p>
      <p className="mt-4 font-serif text-base sm:text-lg font-semibold italic text-white/90">
        Where Biology, Behavioral Science and Business Collide.
      </p>
      <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
        We converge education, behavioural science and organisational-behaviour metrics into a
        single operating model &mdash; engineering safer, more human-centred institutions across
        how people live, work, and belong.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          'Organizational Behavior & Team Dynamics Assessment',
          'Behavioral Risk & Productivity Metrics',
        ].map((label) => (
          <a
            key={label}
            href="#assessment"
            className="text-[11px] font-semibold text-emerald-300 bg-emerald-400/10 border border-emerald-400/25 px-2.5 py-1 rounded-full transition-colors hover:bg-emerald-400/20 hover:border-emerald-400/40"
          >
            {label}
          </a>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-400">
        Rooted in Vision 2030&rsquo;s pillars and ministries&rsquo; mandates, commanded by Crown
        Prince Mohammed bin Salman &mdash; directly supporting the Human Capability Development
        Program, Quality of Life 2030, and the National Strategy for Data &amp; AI.
      </p>
    </div>
  </section>
);

export default WhoWeAre;

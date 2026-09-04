import React, { useState } from 'react';
import { useInView } from '@/hooks/use-in-view';
import {
  Sprout,
  Flag,
  Rocket,
  Compass,
  Users,
  HeartHandshake,
  Lightbulb,
  Trophy,
  Globe,
  GraduationCap,
  Award,
  BadgeCheck,
  ArrowRight,
} from 'lucide-react';

type PanelKey = 'start' | 'global' | 'initiatives' | 'milestones' | 'next';

const tabs: { key: PanelKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'start', label: 'The Genesis', icon: Sprout },
  { key: 'global', label: 'Global Integration', icon: Globe },
  { key: 'initiatives', label: 'Past Initiatives', icon: Flag },
  { key: 'milestones', label: 'Milestones', icon: Trophy },
  { key: 'next', label: 'What’s Next', icon: Rocket },
];


const initiatives = [
  {
    icon: HeartHandshake,
    year: '2007–2014',
    title: 'Safety as a Promise',
    desc: 'On the rigs and sites of Saudi Aramco, we reframed safety from a slogan into a promise — every worker returning home in one piece, every shift.',
  },
  {
    icon: Lightbulb,
    year: '2007–2014',
    title: 'The Honest Conversation',
    desc: 'We trained leaders to listen — because one honest conversation can save a life, and one ignored concern can ripple through a whole family.',
  },
  {
    icon: Users,
    year: '2007–2014',
    title: 'Behaviour Meets Industry',
    desc: 'We wove human-behaviour science and business psychology into corporate culture, awakening teams to their shared humanity.',
  },
  {
    icon: Compass,
    year: '2007–2014',
    title: 'The Field as a Laboratory',
    desc: 'Every drilling site became a classroom. Leadership was no longer theory — it was a daily, life-preserving act.',
  },
  {
    icon: GraduationCap,
    year: '2014–2018',
    title: 'Global Knowledge Integration',
    desc: 'We formed joint ventures with leading British awarding bodies — translating field wisdom into accredited learning.',
  },
];

const accreditations = [
  { icon: BadgeCheck, name: 'Ofqual', detail: 'Recognised Awarding Organisation' },
  { icon: Award, name: 'Great British Qualifications', detail: 'Awarding body member' },
  { icon: GraduationCap, name: 'CACHE', detail: 'Council for Awards in Care, Health and Education' },
];

const milestones = [
  {
    year: '2007–2014',
    title: 'The Genesis — From medicine to the field',
    desc: 'A vow to humanity moved from the hospital ward to the wellhead, where caring for one life became a cause for all.',
  },
  {
    year: '2007–2014',
    title: 'Safety becomes a promise',
    desc: 'Leadership reframed as a life-preserving act, and safety as a promise to come home in one piece.',
  },
  {
    year: '2014–2018',
    title: 'Global Knowledge Integration',
    desc: 'Joint ventures with leading British awarding bodies — inspected and recognised by Ofqual, Great British Qualifications, and CACHE.',
  },
];



const Journey: React.FC<{ onCta: () => void }> = ({ onCta }) => {
  const [active, setActive] = useState<PanelKey>('start');
  const { ref: headRef, inView: headIn } = useInView<HTMLDivElement>({ once: false });

  return (
    <section id="journey" className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute top-10 -right-24 w-[26rem] h-[26rem] bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 w-[26rem] h-[26rem] bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Heading */}
        <div
          ref={headRef}
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 text-xs font-medium mb-6">
            <Compass className="w-3.5 h-3.5" /> Genesis
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08]">
            From a single conviction
            <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
              to a global cause.
            </span>
          </h2>
          <p className="mt-5 text-lg text-slate-300">
            It began at the wellhead, on the rigs and the sites of Saudi Aramco — where I learned that
            one honest conversation can save a life. This is the road from that conviction to the work we do today.
          </p>
        </div>


        {/* Sub-panel switcher */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {tabs.map((t) => {
            const on = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  on
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                    : 'border border-white/10 text-slate-300 hover:text-white hover:border-white/25'
                }`}
              >
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Panel container */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
          {active === 'start' && <StartPanel />}
          {active === 'global' && <GlobalPanel />}
          {active === 'initiatives' && <InitiativesPanel />}
          {active === 'milestones' && <MilestonesPanel />}
          {active === 'next' && <NextPanel onCta={onCta} />}
        </div>
      </div>
    </section>
  );
};

const StartPanel: React.FC = () => (
  <div className="grid lg:grid-cols-2 gap-10 items-center">
    <div>
      <span className="text-emerald-300 text-sm font-semibold tracking-widest uppercase">
        2007 – 2014 · The Field as a Laboratory
      </span>
      <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-white leading-snug">
        Where caring for one life became a cause for all.
      </h3>
      <p className="mt-4 text-slate-300 leading-relaxed">
        My journey began in medical school — a vow to humanity to ease pain and restore health. But life called me to
        the field, to the drilling rigs and industrial sites, alongside the people who carry the weight of the world
        on their shoulders for the families waiting at home.
      </p>
      <p className="mt-4 text-slate-300 leading-relaxed">
        There I learned that on a rig, leadership is never a theory — it is a life-preserving act. And safety is not a
        slogan to hang on a wall; it is a promise everyone makes to come back home in one piece.
      </p>
      <p className="mt-4 text-slate-400 leading-relaxed">
        I saw how one honest conversation could save a life, and how one ignored concern could ripple through a whole
        family. So we began weaving together human-behaviour science and business psychology — awakening organisations
        to the one thing that connects us all: our shared humanity.
      </p>
      <blockquote className="mt-6 border-l-2 border-emerald-400/60 pl-4 text-slate-200 italic">
        “One honest conversation can save a life.”
      </blockquote>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {[
        { icon: HeartHandshake, k: '1', v: 'Conviction' },
        { icon: Users, k: '∞', v: 'Lives touched' },
        { icon: Sprout, k: '7yr', v: 'On the field' },
      ].map((s) => (
        <div key={s.v} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
          <s.icon className="w-6 h-6 text-emerald-300 mx-auto mb-3" />
          <p className="text-2xl font-bold text-white">{s.k}</p>
          <p className="text-xs text-slate-400 mt-1">{s.v}</p>
        </div>
      ))}
    </div>
  </div>
);

const GlobalPanel: React.FC = () => (
  <div className="grid lg:grid-cols-2 gap-10 items-center">
    <div>
      <span className="text-cyan-300 text-sm font-semibold tracking-widest uppercase">
        2014 – 2018 · Global Knowledge Integration
      </span>
      <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-white leading-snug">
        When field wisdom found a global voice.
      </h3>
      <p className="mt-4 text-slate-300 leading-relaxed">
        What we learned on the rigs deserved a wider home. So we formed joint ventures with
        <span className="text-white font-medium"> leading British awarding bodies</span>
        — turning hard-won, human-centred lessons into structured,
        accredited learning the world could trust.
      </p>
      <p className="mt-4 text-slate-400 leading-relaxed">
        These partnerships were inspected and held membership across leading British awarding bodies —
        an assurance that our humanity-first philosophy now carried the weight of recognised standards.
      </p>
      <blockquote className="mt-6 border-l-2 border-cyan-400/60 pl-4 text-slate-200 italic">
        “A promise made on the field became a qualification the world could recognise.”
      </blockquote>
    </div>
    <div className="space-y-4">
      <p className="text-xs font-semibold tracking-widest text-cyan-300 uppercase">
        Recognised &amp; accredited by
      </p>
      {accreditations.map((a) => (
        <div
          key={a.name}
          className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-cyan-400/30"
        >
          <div className="inline-flex items-center justify-center w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 border border-white/10">
            <a.icon className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <p className="text-base font-semibold text-white">{a.name}</p>
            <p className="text-sm text-slate-400">{a.detail}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);



const InitiativesPanel: React.FC = () => (
  <div className="grid sm:grid-cols-2 gap-5">
    {initiatives.map((it) => (
      <div
        key={it.title}
        className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1 hover:border-emerald-400/30"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 border border-white/10 group-hover:scale-110 transition-transform">
            <it.icon className="w-5 h-5 text-emerald-300" />
          </div>
          <span className="text-xs font-semibold tracking-widest text-cyan-300">{it.year}</span>
        </div>
        <h4 className="text-lg font-semibold text-white">{it.title}</h4>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">{it.desc}</p>
      </div>
    ))}
  </div>
);

const MilestonesPanel: React.FC = () => (
  <div className="relative">
    <div className="absolute left-3 sm:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400/50 via-cyan-400/30 to-transparent" />
    <div className="space-y-7">
      {milestones.map((m) => (
        <div key={m.year} className="relative pl-12 sm:pl-14">
          <span className="absolute left-0 sm:left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/30">
            <span className="h-2 w-2 rounded-full bg-slate-950" />
          </span>
          <div className="flex flex-wrap items-baseline gap-x-3">
            <span className="text-sm font-bold text-emerald-300">{m.year}</span>
            <h4 className="text-lg font-semibold text-white">{m.title}</h4>
          </div>
          <p className="mt-1 text-sm text-slate-400">{m.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const NextPanel: React.FC<{ onCta: () => void }> = ({ onCta }) => (
  <div className="text-center max-w-2xl mx-auto">
    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 border border-white/10 mb-5">
      <Rocket className="w-7 h-7 text-emerald-300" />
    </div>
    <h3 className="text-2xl sm:text-3xl font-bold text-white">The next chapter is being written now.</h3>
    <p className="mt-4 text-slate-300 leading-relaxed">
      We’re working on predictive wellbeing — gentle nudges that arrive <em>before</em> stress, burnout or illness
      do. Open APIs for researchers. And a promise to stay quiet, kind and human as we grow.
    </p>
    <div className="mt-6 grid sm:grid-cols-3 gap-3 text-left">
      {['Predictive insights', 'Open research API', 'Care, at scale'].map((g) => (
        <div key={g} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
          {g}
        </div>
      ))}
    </div>
    <button
      onClick={onCta}
      className="group mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-semibold hover:opacity-90 transition shadow-lg shadow-emerald-500/25"
    >
      Be part of what’s next
      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
    </button>
  </div>
);

export default Journey;

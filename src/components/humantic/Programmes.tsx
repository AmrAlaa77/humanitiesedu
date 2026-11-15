import React, { useState } from 'react';
import { Clock, Plus, Minus, ArrowUpRight } from 'lucide-react';

/**
 * Programmes section, shown on the homepage and on /deliverables. Replaces the six-category
 * Deliverables picker: Initiative 01 (Safer Workplace for All 2030, three programmes) followed by
 * the four headline programmes. Keeps id="deliverables" so the navbar link still lands here.
 */

const alignFeatures: { title: string; text: string }[] = [
  { title: 'Shared Team Board', text: 'One board for the whole team, grouped by project or priority. Every card shows its owner, due date and status.' },
  { title: 'One Owner per Task', text: 'Every task has one accountable owner. Align AI flags unassigned work and suggests who should take it.' },
  { title: 'AI Capture Inbox', text: 'Forward an email or paste a note. Align AI drafts a clear task with an owner and due date for one-tap approval.' },
  { title: 'Smart Priority Ranking', text: "Each person's list is ranked by real urgency, dependencies and objectives, so the most important request wins." },
  { title: 'Follow-Up & Waiting-For Tracker', text: 'Replies, approvals and handovers owed by others are tracked automatically, with polite reminders sent for you.' },
  { title: 'Meeting-to-Action', text: 'Paste meeting notes and Align AI pulls out decisions, owners and deadlines onto the board.' },
  { title: 'A Thread on Every Card', text: 'Comment, tag a colleague or ask for a status update on the card, in one searchable thread.' },
  { title: 'Calm Communication', text: 'Suggests a calm, respectful version of sensitive or overdue follow-ups, so hard conversations start well.' },
  { title: 'Weekly Reset', text: 'Every Sunday evening, each person and manager gets an AI-built review of what closed, what is stuck and what is due.' },
  { title: 'Productivity & Wellbeing Index', text: 'A workload and wellbeing view for each person, and a team view so managers can spot overload before burnout.' },
];

const bpiEnables: { step: string; title: string; text: string }[] = [
  { step: 'Predict', title: 'Predictive Performance Management', text: 'Identify emerging risks and intervene before they affect results.' },
  { step: 'Sustain', title: 'Sustained Execution Momentum', text: 'Address behavioural friction and maintain consistent progress towards strategic objectives.' },
  { step: 'Act', title: 'Actionable Leadership Intelligence', text: 'Translate behavioural insights into targeted leadership interventions and practical action.' },
  { step: 'Align', title: 'Strategic Behavioural Alignment', text: 'Align everyday actions, team dynamics and workplace behaviours with organisational priorities.' },
];

const bpiApproach: string[] = [
  'Optimise Complementary Partnerships — Map strengths and potential derailers to pair people whose capabilities balance each other’s blind spots.',
  'Operationalise Collective Talent — Combine strengths mapping with behavioural simulations to align individual capabilities with strategic priorities.',
  'Address Performance Derailers — Pair diagnostic insights with one-to-one executive coaching to uncover the behavioural factors behind performance and sustain it over time.',
];

const programmes: { label: string; title: string; text: string }[] = [
  {
    label: 'Programme 1',
    title: 'Executive Presence That Resonates',
    text: 'Assessed through Human-AI Intelligence: AI precision, guided by specialist doctors.',
  },
  {
    label: 'Programme 2',
    title: 'Gen Z Empowerment',
    text: 'Our Grant Programme empowers Saudi youth through funded British certification in organizational and digital intelligence: human and organizational dynamics, alongside AI and digital skills.',
  },
  {
    label: 'Programme 3',
    title: 'She: Quietly Powerful',
    text: 'Women Empowerment. Aligned with the UN Sustainable Development Goals, UN Quality of Life, and Saudi Vision 2030, to reach every woman of every race, color and age.',
  },
  {
    label: 'Programme 4',
    title: 'Retreats',
    text: 'Science, delivered in nature. Honoring the full spectrum of human experience, in both strength and struggle, wellness and ill-being, personalized to one’s unique biology, unlike generic fixes that work for some and fail many.',
  },
];

const cardClass = 'rounded-3xl border border-teal-200/20 bg-gradient-to-br from-teal-900/50 via-slate-900/60 to-cyan-950/50 p-6 sm:p-10';
const monoClass = 'font-mono text-xs tracking-[0.25em] uppercase text-teal-200/80';
const outlineBtn = 'inline-flex items-center gap-2 rounded-full border-2 border-emerald-300 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-300/10';
const solidBtn = 'inline-flex items-center gap-2 rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-teal-950 transition hover:bg-emerald-200';

const Programmes: React.FC = () => {
  const [alignOpen, setAlignOpen] = useState(false);
  const [bpiOpen, setBpiOpen] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <section id="deliverables" className="relative py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-1.5 text-emerald-400 text-sm font-semibold">
          <Clock className="w-4 h-4" /> Initiatives
        </span>

        {/* Initiative 01 */}
        <p className={`mt-10 ${monoClass} text-emerald-300`}>Initiative 01</p>
        <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-white">
          Safer Workplace for All{' '}
          <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">2030</span>
        </h2>

        <div className="mt-10 flex flex-col gap-6">
          {/* Programme 01 */}
          <article className={cardClass}>
            <p className={monoClass}>Programme 01</p>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-white">Humantic AI – Align</h3>
            <p className="mt-2 text-lg text-sky-200">Applied Agentic AI for Organizational Transformation</p>

            <div className="relative mt-8 overflow-hidden rounded-2xl bg-teal-900">
              <video
                src="/videos/humantic-align.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Humantic AI Align: an AI reading a live performance signal"
                className="block h-[280px] w-full object-cover sm:h-[460px]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-950/85 to-transparent p-5 sm:p-8">
                <h4 className="text-2xl sm:text-4xl font-bold text-white">Teams from misalignment to cohesion.</h4>
                <p className="mt-4 inline-block rounded-full border border-white/50 px-5 py-2 font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white">
                  Real-time visibility · Intelligent streamlining · Operational control
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button type="button" onClick={() => setAlignOpen((v) => !v)} aria-expanded={alignOpen} className={outlineBtn}>
                Learn more {alignOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
              <a href="/align-board" target="_blank" rel="noopener noreferrer" className={solidBtn}>
                Live digital board <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {alignOpen && (
              <div className="mt-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                <h4 className="font-serif text-2xl font-bold text-white">Humantic AI – Align</h4>
                <p className="mt-1 text-slate-300">Core features: what the team actually sees</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {alignFeatures.map((f) => (
                    <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <h5 className="font-semibold text-white">{f.title}</h5>
                      <p className="mt-2 text-sm text-slate-300">{f.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {['Productivity', 'Alignment', 'Accountability'].map((t) => (
                    <span key={t} className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-4 py-1 text-xs font-semibold text-emerald-200">{t}</span>
                  ))}
                </div>
                <p className="mt-6 max-w-3xl font-serif text-2xl sm:text-3xl font-bold leading-snug text-white">
                  We bring organisational psychology, human behaviour and machine intelligence together in one system.
                </p>
                <h4 className="mt-8 text-xl font-semibold text-white">Protecting Performance and the People Behind It</h4>
                <p className="mt-3 max-w-3xl text-slate-300">
                  Our AI productivity and wellbeing metrics sit side by side in Humantic AI - Align, giving leaders the full picture of organisational health. Backed by confidential pulse checks, weekly resets and Humantic 1:1 advisory, leaders get the early insight to:
                </p>
                <ol className="mt-4 max-w-3xl list-decimal space-y-2 pl-5 text-slate-300">
                  <li>Spot burnout before performance drops.</li>
                  <li>Keep top talent at their best, before disengagement sets in.</li>
                  <li>See what is slowing each person down, through individualised performance derailers.</li>
                </ol>
              </div>
            )}
          </article>

          {/* Programme 02 */}
          <article className={cardClass}>
            <p className={monoClass}>Programme 02</p>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-white">Present with Human-AI Intelligence</h3>
            <p className="mt-2 text-lg text-sky-200">Executive Presence Assessed</p>

            {/* Hero taken from the latest Programme 02 page (/present-with-intelligence); the full
                programme detail lives there, so "Learn more" opens that page. */}
            <div className="relative mt-8 overflow-hidden rounded-2xl bg-slate-950">
              <video
                src="/videos/present-stage.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="A presenter on stage in front of live charts"
                className="block h-[280px] w-full object-cover sm:h-[460px]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-5 sm:p-8">
                <p className="font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white/85">Executive Presence · Humantic Digital</p>
                <h4 className="mt-3 text-2xl sm:text-4xl font-bold text-white">Present with AI guidance.</h4>
                <p className="mt-4 inline-block rounded-full border border-white/50 px-5 py-2 font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white">
                  Presence · Story · Room
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/present-with-intelligence" target="_blank" rel="noopener noreferrer" className={solidBtn}>
                Learn more <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </article>

          {/* Programme 03 */}
          <article className={cardClass}>
            <p className={monoClass}>Programme 03</p>
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-white">Humantic BPI Intelligence™</h3>
            <p className="mt-2 text-lg text-sky-200">AI-Enabled Behavioural &amp; Performance Analytics</p>

            <div className="relative mt-8 overflow-hidden rounded-2xl bg-teal-900">
              <video
                src="/videos/bpi-intelligence.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                className="block h-[280px] w-full object-cover sm:h-[460px]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-950/85 to-transparent p-5 sm:p-8">
                <p className="font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white/85">AI-evaluated · Humantic Digital</p>
                <h4 className="mt-3 text-2xl sm:text-4xl text-white">
                  <span className="font-bold">Behavioral Performance Indicators,</span>
                  <br />
                  evaluated by AI.
                </h4>
                <p className="mt-4 inline-block rounded-full border border-white/50 px-5 py-2 font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white">
                  Productivity · Behavior · Risk
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-br from-teal-600/70 to-cyan-700/60 p-6 sm:p-8">
              <p className={monoClass}>BPI enables</p>
              <h4 className="mt-3 text-2xl sm:text-3xl font-bold text-white">KPIs Measure Outcomes. BPIs Reveal What Drives Them.</h4>
              <p className="mt-3 max-w-3xl text-white/90">
                KPIs tell you what performance delivered. BPIs reveal the behavioural signals shaping what performance delivers next.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {bpiEnables.map((b) => (
                  <div key={b.step} className="rounded-2xl border border-white/25 bg-white/10 p-5">
                    <p className="font-mono text-xs tracking-[0.2em] uppercase text-emerald-200">{b.step}</p>
                    <h5 className="mt-2 font-semibold text-white">{b.title}</h5>
                    <p className="mt-2 text-sm text-white/85">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button type="button" onClick={() => setBpiOpen((v) => !v)} aria-expanded={bpiOpen} className={outlineBtn}>
                Learn more {bpiOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>

            {bpiOpen && (
              <div className="mt-8 max-w-3xl animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                <div className="flex flex-wrap gap-2">
                  {['Productivity', 'Behavior', 'Risk'].map((t) => (
                    <span key={t} className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-4 py-1 text-xs font-semibold text-emerald-200">{t}</span>
                  ))}
                </div>
                <p className="mt-6 font-serif text-2xl sm:text-3xl font-bold text-white">Humantic BPI Intelligence™</p>
                <p className={`mt-8 ${monoClass}`}>Our unique approach</p>
                <p className="mt-3 text-slate-300">
                  We deploy proprietary intellectual property that integrates organisational behaviour, modern neuroscience and AI-powered predictive analytics. Immersive experiential learning and behavioural simulations equip leaders with actionable strategies to optimise team dynamics and deliver measurable business impact.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                  {bpiApproach.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        </div>

        {/* Headline programmes */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {programmes.map((p, i) => (
            <a
              key={p.label}
              href={`/humantic-digital#programme-${i + 1}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`flex flex-col text-left rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                active === i
                  ? 'border-white/60 bg-gradient-to-br from-teal-300 via-teal-400 to-cyan-500 shadow-lg shadow-teal-400/30'
                  : 'border-teal-200/30 bg-gradient-to-br from-teal-500/20 via-teal-700/20 to-cyan-900/30 hover:border-white/50'
              }`}
            >
              <p className={`font-mono text-xs tracking-[0.25em] uppercase ${active === i ? 'text-teal-950/80' : 'text-emerald-300'}`}>{p.label}</p>
              <h3 className={`mt-3 font-serif text-2xl font-bold leading-snug ${active === i ? 'text-teal-950' : 'text-white'}`}>{p.title}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${active === i ? 'text-teal-950/85' : 'text-slate-300'}`}>{p.text}</p>
              <span className={`mt-auto pt-5 inline-flex items-center gap-2 text-sm font-semibold ${active === i ? 'text-teal-950' : 'text-emerald-300'}`}>
                Programme details <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Programmes;

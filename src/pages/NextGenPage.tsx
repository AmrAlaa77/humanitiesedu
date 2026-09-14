import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Users, Heart, Watch, BrainCog, BookOpenCheck } from 'lucide-react';
import Footer from '@/components/humantic/Footer';
import AmbientBackground from '@/components/humantic/AmbientBackground';
import GlowCursor from '@/components/humantic/GlowCursor';
import ScrollProgress from '@/components/humantic/ScrollProgress';

const phase1Items = [
  {
    label: 'Phase 1 · Year 1 & 2',
    description:
      'Humantic Digital serves a diverse ecosystem: institutions advancing preventative care, Quality of Life Program 2030 pillars, and UN-Habitat QoL benchmarks; providers delivering better outcomes; insurers reducing costs; and government entities advancing Vision 2030 education and healthcare goals.',
  },
  {
    label: 'Digital + AI-Integrated Assessment · Year 2',
    description:
      "Year 2 founding phase in which this definitive national dataset carries an incubator institution's name — establishing its first-mover status as the definitive voice in real-time wellbeing analytics, and positioning health and wellbeing education as a new national strategic imperative.",
  },
];

const phase2Features = [
  {
    icon: Watch,
    label: 'Wearable Integration',
    description: 'Real-time data collection and analysis through advanced wearable devices.',
  },
  {
    icon: BrainCog,
    label: 'Behavioral Analytics',
    description:
      'AI-driven insights combining biometric and behavioral data for personalized intervention strategies — a proprietary, classificatory database unmatched by any other institution.',
  },
  {
    icon: BookOpenCheck,
    label: 'Global Publication',
    description:
      'Targeting Q1/Q2 journal publications to establish the Kingdom as a leader in preventative health science, and to showcase a lift in QS/THE standing across Citations, Innovation, and Academic Reputation.',
  },
];

const stats = [
  { icon: Globe, value: '~30%', label: 'of the global workforce is Gen Z by 2030' },
  { icon: Users, value: '140M', label: 'young people aged 10–24 across MENA' },
  { icon: Heart, value: '50 / 75%', label: 'of lifetime wellbeing issues begin by age 14 / 24' },
];

const NextGenPage: React.FC = () => (
  <div className="relative min-h-screen bg-slate-950 text-white antialiased selection:bg-emerald-400/30 md:cursor-none">
    <AmbientBackground />
    <GlowCursor />
    <ScrollProgress />

    <div className="relative z-10">
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Humantic
          </Link>
          <span className="text-white font-semibold tracking-[0.3em] text-sm">NEXTGEN 2030</span>
          <span className="w-[132px]" aria-hidden />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <span className="text-emerald-400 text-[11px] font-bold uppercase tracking-widest">Initiative 1 · UK–KSA Collaboration</span>
        <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight max-w-3xl">
          NextGen 2030: The Quarter-Billion Covenant
        </h1>
        <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed max-w-3xl">
          A collaborative UK–Saudi initiative bridging campus to career for Gen Z &mdash; nearly a third of the
          global workforce by 2030, and a generation the region cannot afford to onboard the old way.
        </p>

        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/15 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="mt-4 text-white text-2xl font-bold">{s.value}</p>
              <p className="mt-1 text-slate-400 text-sm leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Phase 1 */}
        <div className="mt-20">
          <p className="text-white text-xl sm:text-2xl font-bold">Phases Of The Initiative</p>
          <p className="mt-1 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
            Quality of Life, On Campus and Beyond
          </p>
          <div className="mt-6 space-y-4">
            {phase1Items.map((phase) => (
              <div key={phase.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">{phase.label}</p>
                <p className="text-slate-300 text-sm leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 2 */}
        <div className="mt-20">
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">Scaling the Initiative</p>
          <h2 className="mt-3 font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight max-w-2xl">
            R&amp;D + Wearable Technology Integration
          </h2>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 px-4 py-1.5 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
            Phase 2 &middot; Year 3 Onwards &middot; Lab to Market
          </span>

          <p className="mt-6 text-slate-400 max-w-2xl leading-relaxed">
            A true UN SDG 3 contribution &mdash; preventative science engineered in Saudi labs, gifted to the world.
          </p>

          <p className="mt-6 font-serif italic text-2xl sm:text-3xl leading-snug text-slate-100 max-w-2xl">
            Jewellery on the outside. A lab on the inside.
          </p>

          <p className="mt-4 text-slate-400 max-w-2xl leading-relaxed">
            Most wearables hand you data and walk away. AURION pairs the wearable with a personalised wellbeing
            knowledge engine &mdash; so you don&rsquo;t get numbers, you get you.
          </p>

          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {phase2Features.map((f) => (
              <div key={f.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/15 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <p className="mt-4 text-white font-semibold">{f.label}</p>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  </div>
);

export default NextGenPage;

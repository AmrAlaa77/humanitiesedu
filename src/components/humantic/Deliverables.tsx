import React, { useState } from 'react';
import { Package, GraduationCap, HeartPulse, Brain, User, Building2 } from 'lucide-react';

type Deliverable = { title: string; desc: string; spec?: string };

const categories: { key: string; label: string; icon: React.ComponentType<{ className?: string }>; items: Deliverable[] }[] = [
  {
    key: 'nextgen',
    label: 'NextGen 2030',
    icon: GraduationCap,
    items: [
      { title: 'Bio-Core™: The FutureReady Sprint', desc: "Fortune 500 leadership strategy, delivered at the speed of Gen Z's feed. Five-day workshop, a month of mentoring, and a 1-on-1 Talent Signature™ debrief." },
      { title: 'Game On™: The Open-Air Boardroom', desc: 'Real terrain, real pressure, zero slide decks — a 2-day gamified simulation built from Microsoft, Saudi Aramco, Google and PepsiCo partnership insight.' },
      { title: 'SyncPoint™: Your Digital Chief of Staff', desc: 'A 2-day workshop turning brain science into Auto-Run habit automation, built for a generation shaped by automatic scroll and fragmented attention.' },
      { title: 'VRify Yourself™: The Science of You', desc: 'Neuroscience meets VR to decode your own stress response — a 2-day workshop or 5-day journey using embodied cognition.' },
      { title: 'Brain Voyage: The Inside Tour of You', desc: 'A VR walkthrough of your own brain in real time — 4x more focused, 16x more likely to recall, 275% more confident applying skills.' },
      { title: 'Shine & Shadow: Strengths & Derailers', desc: "A Collective Strengths in Action workshop plus one-on-one derailer mapping, so teams understand and leverage each other's strengths." },
      { title: 'InnerLead: The Journey Within', desc: 'A month-long, four-phase journey — Discovery → Immersion → Integration → Audit — from knowing yourself to embodying it.' },
      { title: 'WorkReady+: More Than Employable', desc: 'The organised-mind system every new hire needs before day one — brain-body connection, mind-clearing techniques, and an AI-powered team tool.' },
    ],
  },
  {
    key: 'health',
    label: 'Health Transformation',
    icon: HeartPulse,
    items: [
      { title: 'VitalCore AI: Predictive, Not Reactive', desc: 'Proprietary algorithms tuned to Saudi genetics and regional health data, integrated directly with Saudi electronic health systems.' },
      { title: 'The 74% Shift', desc: 'The flagship campaign framing that reframes healthcare investment from treatment cost to prevention dividend — WHO / World Bank sourced.' },
    ],
  },
  {
    key: 'neurolead',
    label: 'Neurolead',
    icon: Brain,
    items: [
      { title: 'Neurolead: The Inner Game of Leadership', desc: 'Five pillars spanning Behavioral Leadership Fundamentals through the Psychological Lens on Productivity. UK-accredited certificate.' },
      { title: 'Shine & Shadow: Strengths & Derailers Diagnostic', desc: 'A personalised behavioural report uncovering tendencies, root causes and derailers, applied through a one-on-one debrief.' },
      { title: '100 & Rising: The Recognition Covenant', desc: 'A fully sponsored, UN SDG-aligned wellness-recognition programme, awarded every 100 learners trained.' },
      { title: 'The Neural Relapse Tax', desc: 'Uses neural plasticity to install professional readiness as a native feature, turning motivation into permanent architecture.' },
    ],
  },
  {
    key: 'individuals',
    label: 'For Individuals',
    icon: User,
    items: [
      { title: 'Breathe In The Beauty', spec: '2 Days, 1 Night · In-person retreat', desc: 'A body-mind reset rooted in neurophysiology, with sunrise meditation and 1:1 guided healing sessions.' },
      { title: 'High-Potential Women Leaders Programme', spec: 'Core 5 Days · Advanced 8 Weeks', desc: 'Strengthen leadership capabilities and executive presence for women accelerating into their next executive role.' },
      { title: 'Advanced Professional Certificate in Leadership & Management', spec: 'Core 5 Days · Advanced 8 Weeks', desc: 'Moves talented professionals past vague feedback into the internal shifts that unlock readiness.' },
      { title: 'Executive Leadership Excellence', spec: 'Core 5 Days · Advanced 8 Weeks', desc: "Empowers leaders who inspire, motivate, and achieve impactful results in today's dynamic world." },
    ],
  },
  {
    key: 'orgs',
    label: 'For Organizations',
    icon: Building2,
    items: [
      { title: 'Leadership, Rewired For 2030', spec: 'Core 5 Days · Advanced 8 Weeks', desc: 'An experiential, regionally grounded programme built on real-world scenarios and hands-on practice managing hybrid teams.' },
      { title: 'Spot Them. Grow Them. Keep Them.', spec: 'Core 5 Days · Advanced 8 Weeks', desc: 'From promising talent to future executive — behavioural science, 1:1 mentoring, and real-world simulation.' },
      { title: 'Productivity, Decoded By Your Brain', spec: 'Core 5 Days', desc: 'Neuroscience-backed systems that turn scattered attention into sustained, measurable focus, built for Gen Z pace.' },
      { title: 'Wellbeing Is The New KPI', spec: 'Core 5 Days · Advanced 8 Weeks', desc: 'Employee wellbeing has a quantifiable link to business performance across industries and countries worldwide.' },
      { title: 'The Future Of Leadership Starts Now', spec: 'Core 5 Days · Advanced 8 Weeks', desc: 'Incubation for Hi-Pot leaders, brain-science productivity, and workplace wellbeing in one executive-track programme.' },
      { title: 'Know Where You Stand, Before You Move', spec: 'Core 5 Days · Hybrid', desc: 'Building a wellbeing strategy starts with understanding where your practices stand today, and the gaps that remain.' },
      { title: 'Science Meets Strategy For Peak Performance', spec: 'Core 5 Days · Advanced 8 Weeks', desc: 'Neurobiology, behavioural sciences, and technology, delivered by certified executive strategists.' },
      { title: 'Accelerated Development Programme', spec: 'Core 5 Days · Advanced 8 Weeks', desc: 'A fast-track leadership sprint that compresses years of on-the-job learning into a high-intensity curriculum.' },
      { title: 'Executive Presence and Communication', spec: 'Core 5 Days · Advanced 8 Weeks', desc: 'Sharpen how you show up, speak, and influence in the room — the difference between being heard and being followed.' },
      { title: 'High Performance People Skills for Leaders', spec: 'Core 5 Days · Advanced 8 Weeks', desc: 'The interpersonal skillset behind every high-performing team — trust, feedback, motivation, and conflict, made practical.' },
      { title: 'Leading Businesses Into The Future', spec: 'Core 5 Days · Advanced 8 Weeks', desc: 'A forward-looking programme on steering organisations through disruption, technology shifts, and structural change.' },
      { title: 'Leading Change For Organisational Transformation', spec: 'Core 5 Days · Advanced 8 Weeks', desc: 'A rigorous, practical curriculum for leaders driving large-scale transformation without losing organisational trust.' },
      { title: 'Behavioral Leadership & Organizational Psychology', spec: 'Core 5 Days · Advanced 8 Weeks', desc: 'Five pillars from hidden barriers to influence through to the psychological lens on productivity. UK-accredited.' },
      { title: 'High Performance People Skills for Leaders — Dubai', spec: 'Core 5 Days · In-person, Dubai', desc: 'The same high-performance people-skills curriculum, delivered locally for leaders based across the UAE.' },
      { title: 'High Performance People Skills for Leaders — Saudi Arabia', spec: 'Core 5 Days · In-person, Riyadh', desc: 'The same high-performance people-skills curriculum, delivered locally for leaders based across Saudi Arabia.' },
    ],
  },
];

const Deliverables: React.FC = () => {
  const [active, setActive] = useState(categories[0].key);
  const current = categories.find((c) => c.key === active)!;

  return (
    <section id="deliverables" className="relative py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-emerald-400 text-sm font-semibold uppercase tracking-widest">
              <Package className="w-4 h-4" /> Deliverables
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold text-white tracking-tight">Every programme, one catalogue</h2>
            <p className="mt-4 text-slate-400 text-lg">
              From NextGen 2030 to Neurolead — the full set of workshops, diagnostics and certificates, packaged for individuals and organisations alike.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  active === c.key
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950'
                    : 'border border-white/15 text-slate-300 hover:bg-white/5'
                }`}
              >
                <c.icon className="w-3.5 h-3.5" /> {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {current.items.map((d) => (
            <div
              key={d.title}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:bg-white/[0.06] hover:border-emerald-400/30 hover:-translate-y-1"
            >
              <h3 className="text-white font-semibold leading-snug">{d.title}</h3>
              <p className="mt-2 text-slate-400 text-sm leading-relaxed">{d.desc}</p>
              {d.spec && (
                <span className="mt-4 inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs font-medium">
                  {d.spec}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deliverables;

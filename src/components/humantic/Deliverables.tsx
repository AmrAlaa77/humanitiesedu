import React, { useState } from 'react';
import { Package, GraduationCap, HeartPulse, Brain, User, Building2, ChevronDown } from 'lucide-react';

type Deliverable = {
  title: string;
  hook: string;
  details?: string;
  pills?: string[];
  spec?: string[];
  benefitsLabel?: string;
  benefits?: string[];
  audience?: string[];
  awarded?: string;
};

const categories: { key: string; label: string; icon: React.ComponentType<{ className?: string }>; items: Deliverable[] }[] = [
  {
    key: 'nextgen',
    label: 'NextGen 2030',
    icon: GraduationCap,
    items: [
      {
        title: 'Bio-Core™: The FutureReady Sprint',
        hook: "Fortune 500 leadership strategy, delivered at the speed of Gen Z's feed.",
        details: 'Five-day in-person experiential workshop + 1-month mentoring + 1-on-1 Talent Signature™ debrief. Establishes Foundations of Organizational Awareness through behavioural science and social neuroscience.',
        pills: ['First-Time Right', 'Fortune 500 method'],
      },
      {
        title: 'Game On™: The Open-Air Boardroom',
        hook: "Real terrain, real pressure, zero slide decks. Gen Z learns to win before they're handed the title.",
        details: 'A 2-day gamified simulation of day-to-day operations built from Microsoft, Saudi Aramco, Google and PepsiCo partnership insight. The "Flash Debrief" turns every task into a live learning milestone.',
        pills: ['Safe-Lab simulation', 'Used by Royal Navy, UK Army'],
      },
      {
        title: 'SyncPoint™: Your Digital Chief of Staff',
        hook: 'Your AI productivity app becomes a Digital Personal Assistant.',
        details: 'A 2-day workshop turning brain science into Auto-Run habit automation — built for a generation shaped by automatic scroll and fragmented attention.',
        pills: ['AI habit automation'],
      },
      {
        title: 'VRify Yourself™: The Science of You',
        hook: 'Neuroscience meets VR to decode your own stress response.',
        details: '2-day workshop or 5-day journey using embodied cognition to identify and rewrite automatic stress responses tailored to individual triggers and biological instincts.',
        pills: ['Embodied cognition'],
      },
      {
        title: 'Brain Voyage: The Inside Tour of You',
        hook: 'A VR walkthrough of your own brain, in real time.',
        details: '4x more focused, 16x more likely to recall information, 275% more confident applying skills post-training versus traditional methods.',
        pills: ['Royal Society of Medicine UK'],
      },
      {
        title: 'Shine & Shadow: Strengths & Derailers',
        hook: 'Every talent has a strength — and a shadow that dims it under pressure.',
        details: "Collective Strengths in Action workshop plus one-on-one derailer mapping so teams understand and leverage one another's strengths.",
        pills: ['Strengths-based research'],
      },
      {
        title: 'InnerLead: The Journey Within',
        hook: 'A month-long sanctuary for decoding your own wiring.',
        details: 'Four-phase journey: Discovery → Immersion → Integration → Audit — from knowing yourself to embodying it.',
        pills: ['4-phase model'],
      },
      {
        title: 'WorkReady+: More Than Employable',
        hook: 'The organised-mind system every new hire needs before day one.',
        details: 'Covers the brain-body connection, mind-clearing techniques, and an AI-powered organisational tool giving teams shared visibility on ownership and deadlines.',
        pills: ['Certified Office Management'],
      },
    ],
  },
  {
    key: 'health',
    label: 'Health Transformation',
    icon: HeartPulse,
    items: [
      {
        title: 'VitalCore AI: Predictive, Not Reactive',
        hook: 'Proprietary algorithms tuned to Saudi genetics and regional health data.',
        details: 'Direct integration with Saudi electronic health systems. Addresses reactive-only care, limited specialist access outside major cities, and telemedicine that lacks preventive capability.',
        pills: ['Saudi-population-specific'],
      },
      {
        title: 'The 74% Shift',
        hook: 'The number driving the initiative: most preventable deaths share one fixable root cause.',
        details: 'Flagship campaign framing that reframes healthcare investment from treatment cost to prevention dividend.',
        pills: ['WHO / World Bank sourced'],
      },
    ],
  },
  {
    key: 'neurolead',
    label: 'Neurolead',
    icon: Brain,
    items: [
      {
        title: 'Neurolead: The Inner Game of Leadership',
        hook: 'A deep dive into the human element behind every enterprise.',
        details: 'Five pillars: Behavioral Leadership Fundamentals, Strengths-Based Leadership, Interpersonal Leadership, Neuroscience & Organizational Behavior, and The Psychological Lens on Productivity.',
        pills: ['UK-Accredited Certificate', 'ROI & ROH aligned'],
      },
      {
        title: 'Shine & Shadow: Strengths & Derailers Diagnostic',
        hook: 'Every leader has a strength that built their reputation — and a shadow that dims it.',
        details: 'A personalised behavioural report uncovering tendencies, root causes and derailers, applied through a one-on-one debrief session.',
        pills: ['Cross-initiative asset'],
      },
      {
        title: '100 & Rising: The Recognition Covenant',
        hook: 'A fully sponsored wellness-recognition programme, awarded every 100 learners trained.',
        details: 'Reinforces long-term partnerships and embeds a culture of wellbeing through every level of the organisation.',
        pills: ['UN SDG-aligned'],
      },
      {
        title: 'The Neural Relapse Tax',
        hook: 'Most training evaporates within days. This is the science of why.',
        details: 'Uses neural plasticity to install professional readiness as a native feature, turning temporary motivation into permanent, high-performance architecture.',
        pills: ['Behavioural science'],
      },
    ],
  },
  {
    key: 'individuals',
    label: 'For Individuals',
    icon: User,
    items: [
      {
        title: 'Breathe In The Beauty',
        hook: 'A body-mind reset rooted in neurophysiology, for teams ready to reconnect before the next sprint.',
        spec: ['Retreat · 2 Days, 1 Night', 'In-person, hotel retreat'],
        benefitsLabel: 'Programme features',
        benefits: ['Reset through neuroscience-backed practices', 'Sunrise meditation and 1:1 guided healing sessions'],
        audience: ['Teams needing a collective energy reset', 'Leaders showing early signs of burnout', 'Organisations investing in sustained performance'],
        awarded: 'Certificate of participation. Fee includes accommodation, meals and all sessions.',
      },
      {
        title: 'High-Potential Women Leaders Programme',
        hook: 'Strengthen your leadership capabilities and maximise your impact — built for women accelerating into their next executive role.',
        spec: ['Core · 5 Days · In-person', 'Advanced · 8 Weeks · Hybrid'],
        benefitsLabel: 'Key benefits',
        benefits: ['Build the confidence and toolkit to lead with greater impact', 'Strengthen executive presence and stakeholder influence'],
        audience: [
          'Women in leadership roles at any stage of their journey',
          'Women executives with 7+ years of people-management experience',
          'Organisations building a female leadership pipeline',
        ],
        awarded: 'Certificate of completion and alumni status.',
      },
      {
        title: 'Advanced Professional Certificate in Leadership & Management',
        hook: 'Leadership is lived, not awarded. Moves talented professionals past vague feedback into the internal shifts that unlock readiness.',
        spec: ['Core · 5 Days · In-person', 'Advanced · 8 Weeks · Hybrid'],
        benefitsLabel: 'Key benefits',
        benefits: [
          'Identify the internal barriers — limiting patterns, unconscious bias, communication gaps — behind stalled promotions',
          'Decode leadership derailers, for yourself and your team, using the Neurolead biology-and-physiology framework',
        ],
        audience: [
          'Talented professionals held back by vague promotion feedback',
          'Founders and startup leaders scaling teams under pressure',
          'Established leaders protecting their pipeline from panic-hiring',
        ],
        awarded: 'Advanced Professional Certificate in Leadership and Management.',
      },
      {
        title: 'Executive Leadership Excellence',
        hook: "Empower exceptional leaders who inspire, motivate, and achieve impactful results in today's dynamic world.",
        spec: ['Core · 5 Days · In-person', 'Advanced · 8 Weeks · Hybrid'],
        benefitsLabel: 'Programme features',
        benefits: ['Empowers leaders who inspire and motivate', 'Built to achieve impactful results in a dynamic world'],
        audience: ['Aspiring leaders taking on their first leadership role', 'Seasoned executives refining their skills'],
        awarded: 'Certificate of completion and alumni status.',
      },
    ],
  },
  {
    key: 'orgs',
    label: 'For Organizations',
    icon: Building2,
    items: [
      {
        title: 'Leadership, Rewired For 2030',
        hook: 'An experiential, regionally grounded programme built on real-world scenarios, peer discussion, and hands-on practice managing hybrid teams.',
        spec: ['Core · 5 Days · In-person', 'Advanced · 8 Weeks · Hybrid'],
        benefitsLabel: 'Key benefits',
        benefits: ['Sharpen decision-making under real executive pressure', 'Build executive presence and influence at every level', 'Lead through disruption with confidence and clarity'],
        audience: [
          'Senior executives responsible for organisational performance',
          'Leaders in roles equivalent to C-suite, EVP, or managing director',
          'Professionals with 15+ years of experience seeking to refine their edge',
        ],
        awarded: 'Certificate of completion and alumni status.',
      },
      {
        title: 'Spot Them. Grow Them. Keep Them.',
        hook: 'From promising talent to future executive — behavioural science, 1:1 mentoring, and real-world simulation.',
        spec: ['Core · 5 Days · In-person', 'Advanced · 8 Weeks · Hybrid'],
        benefitsLabel: 'Key benefits',
        benefits: ['Identify high-potential talent early, with behavioural assessment', 'Close skill gaps through 1:1 mentoring and simulation', 'Retain rising leaders with a clear promotion pathway'],
        audience: ['Rising managers identified as high-potential', 'HR and talent leaders building succession pipelines', 'Organisations preparing next-gen leaders for promotion'],
        awarded: 'Certificate of completion and alumni status.',
      },
      {
        title: 'Productivity, Decoded By Your Brain',
        hook: 'Neuroscience-backed systems that turn scattered attention into sustained, measurable focus — built for Gen Z pace.',
        spec: ['Core · 5 Days · In-person'],
        benefitsLabel: 'Key benefits',
        benefits: ['Apply neuroscience to sustain daily focus', 'Automate routine work with AI-based systems', 'Custom behavioural-science assessments for hiring and development'],
        audience: ['New graduates and early-career Gen Z professionals', 'Teams facing burnout or scattered attention', 'Organisations wanting measurable, science-backed productivity gains'],
        awarded: 'Certificate of completion.',
      },
      {
        title: 'Wellbeing Is The New KPI',
        hook: 'Employee wellbeing has a quantifiable link to business performance across industries and countries worldwide.',
        spec: ['Core · 5 Days · In-person', 'Advanced · 8 Weeks · Hybrid'],
        benefitsLabel: 'Key benefits',
        benefits: ['Link wellbeing to performance with a business case leaders trust', 'Apply evidence-backed frameworks to your culture', 'Reduce attrition through measurable engagement gains'],
        audience: ['HR and People leaders building culture strategy', 'Executives accountable for retention and engagement'],
        awarded: 'Certificate of completion and alumni status.',
      },
      {
        title: 'The Future Of Leadership Starts Now',
        hook: 'Incubation for Hi-Pot leaders, brain-science productivity, and workplace wellbeing, in one executive-track programme.',
        spec: ['Core · 5 Days · In-person', 'Advanced · 8 Weeks · Hybrid'],
        benefitsLabel: 'Key benefits',
        benefits: ['One integrated programme spanning talent, mind, and performance', 'Incubation, productivity, and wellbeing combined, not siloed'],
        audience: ['Organisations building a leadership bench', 'Executives ready to commit to a cohort'],
        awarded: 'Certificate of completion and alumni status.',
      },
      {
        title: 'Know Where You Stand, Before You Move',
        hook: 'Building an employee wellbeing strategy starts with understanding where your practices stand today, and the gaps that remain.',
        spec: ['Core · 5 Days · Hybrid, remote-OK'],
        benefitsLabel: 'Key benefits',
        benefits: ['Diagnose where your wellbeing practices stand today', 'Uncover gaps with a genuine, individualised coping analysis'],
        audience: ['Institutions starting a wellbeing strategy from scratch', 'HR leaders needing an honest, individualised baseline'],
        awarded: 'Individualised Behavioural Assessment Report.',
      },
      {
        title: 'Science Meets Strategy For Peak Performance',
        hook: 'Neurobiology, behavioural sciences, and technology, delivered by one team.',
        spec: ['Core · 5 Days · In-person', 'Advanced · 8 Weeks · Hybrid'],
        benefitsLabel: 'Key benefits',
        benefits: ['Combine neurobiology, behavioural science, and technology', 'Learn from certified executive strategists'],
        audience: ['Organisations building a DEI&B strategy', 'Executives seeking evidence-based methods'],
        awarded: 'Certificate of completion and alumni status.',
      },
      {
        title: 'Accelerated Development Programme',
        hook: 'A fast-track leadership sprint that compresses years of on-the-job learning into a focused, high-intensity curriculum.',
        spec: ['Core · 5 Days · In-person', 'Advanced · 8 Weeks · Hybrid'],
        benefitsLabel: 'Key benefits',
        benefits: ['Compress years of leadership learning into one intensive track', 'Build core management skills through live simulation'],
        audience: ['First-time managers moving into their first leadership role', 'High-potential individual contributors preparing for management'],
        awarded: 'Certificate of completion and alumni status.',
      },
      {
        title: 'Executive Presence and Communication',
        hook: 'Sharpen how you show up, speak, and influence in the room — the difference between being heard and being followed.',
        spec: ['Core · 5 Days · In-person', 'Advanced · 8 Weeks · Hybrid'],
        benefitsLabel: 'Key benefits',
        benefits: ['Command a room with clarity, brevity, and confidence', 'Read and shape group dynamics in real time'],
        audience: ['Executives preparing for board-level visibility', 'Professionals transitioning into public-facing roles'],
        awarded: 'Certificate of completion and alumni status.',
      },
      {
        title: 'High Performance People Skills for Leaders',
        hook: 'The interpersonal skillset behind every high-performing team — trust, feedback, motivation, and conflict, made practical.',
        spec: ['Core · 5 Days · In-person', 'Advanced · 8 Weeks · Hybrid'],
        benefitsLabel: 'Key benefits',
        benefits: ['Build trust and psychological safety within teams', 'Turn difficult conversations into productive ones'],
        audience: ['People managers at any level of seniority', 'Team leads managing cross-functional groups'],
        awarded: 'Certificate of completion and alumni status. Also delivered regionally — see Dubai and Saudi Arabia editions below.',
      },
      {
        title: 'Leading Businesses Into The Future',
        hook: 'A forward-looking programme on steering organisations through disruption, technology shifts, and structural change.',
        spec: ['Core · 5 Days · In-person', 'Advanced · 8 Weeks · Hybrid'],
        benefitsLabel: 'Key benefits',
        benefits: ['Anticipate market and technology disruption early', 'Build organisational agility into strategy and structure'],
        audience: ['C-suite and senior executives shaping long-term strategy', 'Boards and founders planning for the next decade'],
        awarded: 'Certificate of completion and alumni status.',
      },
      {
        title: 'Leading Change For Organisational Transformation',
        hook: 'A rigorous, practical curriculum for leaders driving large-scale transformation without losing organisational trust.',
        spec: ['Core · 5 Days · In-person', 'Advanced · 8 Weeks · Hybrid'],
        benefitsLabel: 'Key benefits',
        benefits: ['Sequence transformation initiatives for lasting adoption', 'Manage resistance without stalling momentum'],
        audience: ['Transformation and change-management leads', 'Executives sponsoring enterprise-wide change'],
        awarded: 'Certificate of completion and alumni status.',
      },
      {
        title: 'Behavioral Leadership & Organizational Psychology',
        hook: 'Leaders can unknowingly drive disengagement, or worse, quiet cracking, by mismanaging drivers like recognition and autonomy.',
        spec: ['Core · 5 Days · In-person', 'Advanced · 8 Weeks · Hybrid'],
        benefitsLabel: 'Five pillars',
        benefits: [
          'Behavioral Leadership Fundamentals — hidden barriers to influence',
          'Strengths-Based Leadership — unlock innate talents',
          'Interpersonal Leadership — trust and psychological safety',
          'Neuroscience & Organisational Behavior — decision-making under pressure',
          'The Psychological Lens on Productivity — stress, perfectionism, procrastination',
        ],
        audience: ['Leaders wanting to understand their own behavioural blind spots', 'Organisations building a strengths-based leadership culture'],
        awarded: 'UK-accredited certificate, personalised strengths report, behavioural leadership report + 1:1 debrief, two-month sustainability phase.',
      },
      {
        title: 'High Performance People Skills for Leaders — Dubai',
        hook: 'The same high-performance people-skills curriculum, delivered locally for leaders based across the UAE.',
        spec: ['Core · 5 Days · In-person, Dubai', 'Advanced · 8 Weeks · Hybrid'],
        audience: ['UAE-based people managers at any level of seniority', 'Team leads managing cross-functional groups'],
        awarded: 'Certificate of completion and alumni status.',
      },
      {
        title: 'High Performance People Skills for Leaders — Saudi Arabia',
        hook: 'The same high-performance people-skills curriculum, delivered locally for leaders based across Saudi Arabia.',
        spec: ['Core · 5 Days · In-person, Riyadh', 'Advanced · 8 Weeks · Hybrid'],
        audience: ['KSA-based people managers at any level of seniority', 'Team leads managing cross-functional groups'],
        awarded: 'Certificate of completion and alumni status.',
      },
    ],
  },
];

const DeliverableCard: React.FC<{ item: Deliverable }> = ({ item }) => {
  const [open, setOpen] = useState(false);
  const hasDetails = Boolean(item.details || item.spec || item.benefits || item.audience || item.awarded || item.pills);

  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-500 hover:bg-white/[0.06] hover:border-emerald-400/30 hover:-translate-y-1">
      <h3 className="text-white font-semibold leading-snug">{item.title}</h3>
      <p className="mt-2 text-slate-400 text-sm leading-relaxed">{item.hook}</p>

      {hasDetails && (
        <div className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="pt-4 border-t border-white/10 space-y-3">
              {item.spec && (
                <div className="flex flex-wrap gap-2">
                  {item.spec.map((s) => (
                    <span key={s} className="text-[11px] font-semibold text-slate-200 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {item.details && <p className="text-slate-300 text-sm leading-relaxed">{item.details}</p>}

              {item.benefits && (
                <div>
                  <p className="text-emerald-300 text-[11px] font-bold uppercase tracking-widest mb-1.5">{item.benefitsLabel ?? 'Key benefits'}</p>
                  <ul className="space-y-1">
                    {item.benefits.map((b) => (
                      <li key={b} className="text-slate-300 text-xs leading-relaxed flex gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.audience && (
                <div>
                  <p className="text-emerald-300 text-[11px] font-bold uppercase tracking-widest mb-1.5">Who should attend</p>
                  <ul className="space-y-1">
                    {item.audience.map((a) => (
                      <li key={a} className="text-slate-300 text-xs leading-relaxed flex gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.awarded && <p className="text-slate-400 text-xs italic">Awarded: {item.awarded}</p>}

              {item.pills && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.pills.map((p) => (
                    <span key={p} className="text-[10px] font-semibold text-emerald-300 bg-emerald-400/10 border border-emerald-400/25 px-2.5 py-1 rounded-full">
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {hasDetails && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-4 inline-flex items-center gap-1 text-emerald-400 text-xs font-semibold hover:underline"
        >
          {open ? 'Show less' : 'See more'}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  );
};

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
          {current.items.map((item) => (
            <DeliverableCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deliverables;

import React, { useState } from 'react';
import { Clock, GraduationCap, HeartPulse, Brain, User, Building2, ChevronDown, CalendarDays, MapPin, ImageIcon, FileText, X, Globe, Users, Heart } from 'lucide-react';

type CourseDay = { title: string; points: string[] };

type Deliverable = {
  title: string;
  hook: string;
  format?: string;
  delivery?: string;
  details?: string;
  pills?: string[];
  spec?: string[];
  benefitsLabel?: string;
  benefits?: string[];
  includes?: string[];
  days?: CourseDay[];
  models?: string;
  audience?: string[];
  requirements?: string;
  awarded?: string;
};

type InitiativeStat = { icon: React.ComponentType<{ className?: string }>; value: string; label: string };

type Initiative = {
  eyebrow?: string;
  title: string;
  description: string;
  stats?: InitiativeStat[];
  featuresLabel?: string;
  features?: string[];
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
        days: [
          {
            title: 'Day 1 — Embracing the "You-nique" You',
            points: [
              'Audit of internal wiring: identifying personal lenses and unconscious biases that distort perception',
              'How bias forms and operates beneath conscious awareness',
              'Distinguishing intent from impact in professional interactions',
              'Understanding diversity as a cognitive and behavioural reality, not a slogan',
              'Outcome: individual accountability for internal filters',
            ],
          },
          {
            title: 'Day 2 — "Mind-Read" (Sort Of): Predictable Human Differences',
            points: [
              'Why people respond differently to pressure, authority, feedback and change',
              'Introduction to simple, evidence-based psychology models that explain behaviour',
              'Recognising behavioural signals without judgment or over-personalisation',
              'Human differences are patterned, predictable and interpretable, not random',
              'Outcome: reduced friction in cross-functional communication',
            ],
          },
          {
            title: 'Day 3 — Belonging by Design',
            points: [
              'How the nervous system detects safety and threat in group settings',
              'The link between self-regulation and psychological safety for others',
              'Everyday behaviours that increase or erode trust and inclusion',
              'Applying secure regulation to real team and organisational contexts',
              'Outcome: secure self-regulation within group dynamics',
            ],
          },
          {
            title: 'Day 4 — Interpersonal & Social Fluency',
            points: [
              'Applied behavioural insight: practising high-stakes feedback, professional presence and verbal precision',
              'Mastering the physical "override" — subtle techniques to shift from high-reactivity to high-composure in seconds',
              'Practised through role-played "boardroom" and "team conflict" scenarios',
              'Staying responsive, not reactive, under pressure',
              'Outcome: elevated professional credibility',
            ],
          },
          {
            title: 'Day 5 — Organizational Savviness',
            points: [
              'Environment decoding: reading cues, power dynamics and decision-making environments',
              'Recognising the social cues of an office and responding with composed presence',
              'Cementing the habit through a 3-month community of practice',
              'Building a roadmap for the first 100 days of a career',
              'Outcome: a personalised "Readiness Action Plan" for Day-Zero entry',
            ],
          },
        ],
        benefitsLabel: 'Programme objectives',
        benefits: [
          'Calibrate the Native OS: establish professional excellence and organisational awareness as instinctive, biological reflexes',
          'Neutralise Cognitive Friction: tools to manage stress-based reversion, staying "First-Time Right" under pressure',
          'Decode Human Predictability: move from guessing workplace dynamics to reading patterned human behaviour',
          'Architect Belonging: transition psychological safety from a cultural ideal into a measurable biological requirement',
          'Accelerate Credibility: bypass the typical 6-month "rookie" learning curve',
        ],
        includes: [
          '5-day in-person experiential workshop, 5 hours/day',
          'Extended 1-month mentoring access',
          'Interactive focus groups',
          '1-on-1 Talent Signature™ innate-strengths assessment & debrief, 1.5 hours/participant',
        ],
      },
      {
        title: 'Game On™: The Open-Air Boardroom',
        hook: "Real terrain, real pressure, zero slide decks. Gen Z learns to win before they're handed the title.",
        details: 'A 2-day gamified simulation of day-to-day operations built from Microsoft, Saudi Aramco, Google and PepsiCo partnership insight. The "Flash Debrief" turns every task into a live learning milestone.',
        pills: ['Safe-Lab simulation', 'Used by Royal Navy, UK Army'],
        days: [
          {
            title: 'Day 1 — Outdoors Experientials (7 hours)',
            points: [
              'Gamified, immersive simulation of day-to-day operations in the field',
              '"Safe Lab" environment where mistakes cost a 10-minute debrief, not millions',
              'Composure, accountability and talent-spotting measured against world-class standards',
              'Distilled from two decades of industry expertise across Microsoft, Saudi Aramco, Google and PepsiCo',
              'A high-fidelity, high-energy, zero-lag leadership flight simulator',
            ],
          },
          {
            title: 'Day 2 — Indoors Experientials (3 hours) + Focus Group (2 hours)',
            points: [
              '"Flash Debrief" — real-time huddles that turn every task into a learning milestone',
              'Peer focus group to consolidate insights and behaviour shifts',
              'Diagnostic mirror for leaders to reflect on behaviours that enable or block transformation',
              'Built on experiential dialogue rather than information sessions, for genuine behavioural clarity',
              'Every leader leaves energised and aligned around a shared leadership charter',
            ],
          },
        ],
        benefitsLabel: "What we're watching for — the Fortune 500 stress test",
        benefits: [
          'Information Bottleneck: hunkering down and going silent versus over-communicating for alignment',
          'Fingerprint of Blame: explaining away failure versus taking extreme ownership',
          'Tunnel Vision: losing situational awareness of the room under pressure',
          'Tone Decay: the shift from "would you mind..." to "just do it" as stress rises',
          'Analysis Paralysis versus Failing Forward: freezing versus making a best-guess decision to keep momentum',
        ],
      },
      {
        title: 'SyncPoint™: Your Digital Chief of Staff',
        hook: 'Your AI productivity app becomes a Digital Personal Assistant.',
        details: 'A 2-day workshop turning brain science into Auto-Run habit automation — built for a generation shaped by automatic scroll and fragmented attention.',
        pills: ['AI habit automation'],
        benefitsLabel: 'What you leave with',
        benefits: [
          'An intelligent system — your "Mission Control" — that turns every incoming request into a clear, actionable next step',
          'Auto-Run habit automation that eliminates mental overload',
          'Tools built specifically for a generation shaped by automatic scroll and fragmented attention',
          'Seamless app integration that turns learning into immediate, practical action',
          'Continuous weekly or biweekly support beyond the workshop — 1:1 sessions, focus groups and team retreats over a month',
        ],
        includes: ['2-day workshop, 4 hours/day'],
      },
      {
        title: 'VRify Yourself™: The Science of You',
        hook: 'Gamified VR simulation for self-assessment — our flagship experience.',
        details: '2-day workshop or 5-day journey using embodied cognition to identify and rewrite automatic stress responses tailored to individual triggers and biological instincts.',
        pills: ['Embodied cognition'],
        days: [
          {
            title: 'Step 1 — Train of Trainers (TTT) for Saudi Nationals',
            points: [
              'Fully sponsored, part of the Saudization initiative',
              'Passing on wellbeing mental-decluttering fundamentals',
              'Delivered by Saudi Arabian trainers',
              "Grounded in the same 'Gen Z Fluent' methodology used across the initiative",
              'The first of four steps in the full journey, ahead of the VR-based workshops',
            ],
          },
          {
            title: 'Step 2 — VR Visionaries: Virtual Reality Wellness Workshop',
            points: [
              'Visualising the inner wellness journey, one simulation at a time',
              "'We Make It Real': an unprecedented immersive experience using virtual reality",
              "'We Speak Gen Z Fluent': learning reimagined through conviction, memory research and multi-modal learning",
              'Rethinks the stress response — reframing how participants perceive and manage stress through conscious regulation',
              'Builds scientific understanding of the brain-body connection: how the nervous system, brain and hormones shape emotions and physical wellbeing',
            ],
          },
          {
            title: 'Step 3 — VR Realities: Neuroscience-Based Workshop',
            points: [
              'Beyond the basics — delivery, mentoring and shaping of the inner wellness journey',
              "'It Just Hits': a personalised biological experience that makes brain and body science easy to understand",
              "'Learning By Doing': gamified, hands-on activities and guided exploration",
              'Builds emotional intelligence and self-awareness through reflection and conscious emotional processing',
              'Closes with a personalised, medically-grounded wellbeing plan and a 3-month follow-up',
            ],
          },
          {
            title: 'Step 4 — The Power of Togetherness',
            points: [
              "Parents' workshop co-creating wellness",
              "Parents grasp the fundamentals of adolescents' mind & body development",
              'Understanding teenage brain development and co-regulation strategies',
              'Family collaboration: sharing personalised wellbeing plans with parents',
              'Setting collaborative goals for a supportive family environment',
            ],
          },
        ],
        models: 'Embodied cognition — the brain accelerates learning when the body is actively "present" within a digital environment.',
        includes: ['2-day workshop or 5-day journey, 5 hours/day'],
      },
      {
        title: 'Brain Voyage: The Inside Tour of You',
        hook: 'A VR walkthrough of your own brain, in real time.',
        details: '4x more focused, 16x more likely to recall information, 275% more confident applying skills post-training versus traditional methods.',
        pills: ['Royal Society of Medicine UK'],
        benefitsLabel: 'What makes it stand out',
        benefits: [
          'Science-backed: rooted in brain and body chemistry research, not wellness buzzwords',
          'Real impact: tools for lasting change, not temporary highs',
          'Empowering, not prescriptive: a personalised plan, not one-size-fits-all',
          'Sustainable change: habits and routines built to integrate into daily life',
          'A holistic exploration of wellbeing — from the routines that fuel the body to the emotions that shape reactions',
        ],
      },
      {
        title: 'Shine & Shadow: Strengths & Derailers',
        hook: 'Every talent has a strength — and a shadow that dims it under pressure.',
        details: "Collective Strengths in Action workshop plus one-on-one derailer mapping so teams understand and leverage one another's strengths.",
        pills: ['Strengths-based research'],
        days: [
          {
            title: 'Module 1 — Collective Strengths in Action Workshop',
            points: [
              'Grounded in strengths-based research',
              'Helps leaders unlock intrinsic strengths within their teams',
              'Shifts the focus from deficits to growth',
              'Empowers individuals to acknowledge, embrace and celebrate their unique talents',
              'Aimed at maximum organisational impact',
            ],
          },
          {
            title: 'Module 2 — Sustaining Collective Strength: Derailers One-on-Ones',
            points: [
              'In-house strengths-mapping methodology',
              'Enforces a collective-strength philosophy that maximises team results through synergy',
              'Deliberately combines and aims diverse individual strengths',
              "Team members understand, appreciate and actively leverage one another's strengths",
              'One-on-one derailer debrief to help realise true potential',
            ],
          },
        ],
        models: 'GALLUP+ Strengths & Derailers.',
      },
      {
        title: 'InnerLead: The Journey Within',
        hook: 'A month-long sanctuary for decoding your own wiring.',
        details: 'Four-phase journey: Discovery → Immersion → Integration → Audit — from knowing yourself to embodying it.',
        pills: ['4-phase model'],
        days: [
          {
            title: 'Discovery',
            points: [
              'One-on-one behavioural analysis',
              'Goal: identify the "starting line"',
              'Dives into your own biological and psychological wiring, in a dedicated, confidential sanctuary',
              'Uncovers the internal barriers that most often block leadership impact',
              'A safe space to acknowledge both vulnerabilities and strengths',
            ],
          },
          {
            title: 'Immersion',
            points: [
              'Focus groups',
              'Goal: peer-to-peer modelling',
              'Co-creates strategies that work specifically for the individual',
              'Surfaces emotional triggers before they manifest as leadership derailers',
              "Builds on the Discovery phase's behavioural-analysis findings",
            ],
          },
          {
            title: 'Integration',
            points: [
              '1-month mentoring',
              'Goal: move from knowing to embodying',
              'Decodes behaviour patterns to unlock a superior level of self-insight',
              'Upgrades both individual performance and team execution',
              'Sustained, ongoing support rather than a single one-off session',
            ],
          },
          {
            title: 'Audit',
            points: [
              'Progress gauging',
              'Goal: validate growth and ROI',
              'Confirms whether internal shifts have translated into leadership behaviour change',
              'Closes the loop on the Discovery-to-Integration journey',
              'Measures the return on the month-long mentoring investment',
            ],
          },
        ],
      },
      {
        title: 'WorkReady+: More Than Employable',
        hook: 'The organised-mind system every new hire needs before day one.',
        details: 'Covers the brain-body connection, mind-clearing techniques, and an AI-powered organisational tool giving teams shared visibility on ownership and deadlines.',
        pills: ['Certified Office Management'],
        days: [
          {
            title: 'Mind Clearing',
            points: [
              'Identify and practice techniques for capturing thoughts and reducing brain clutter',
              'Task creation and prioritisation techniques',
              'Understand the brain-body connection: how the nervous system, brain and hormones shape emotions and behaviour',
              'Spot the signs of reactivity — increased breathing, clenched muscles, negative self-talk',
              'Learn to pause and respond consciously rather than react impulsively',
            ],
          },
          {
            title: 'Project Management Principles',
            points: [
              'Download and navigate the digital organisational app',
              'Create and categorise tasks tied to current projects',
              'Set due dates and assign responsibility',
              'Share files and discuss details — no lost sticky notes or chaotic email threads',
              'Track progress with dashboards and activity streams by project or team member',
            ],
          },
          {
            title: 'Wellness Integration',
            points: [
              'Connect mind-clearing and project-management skills to reduced distress/anxiety',
              'Set a SMART goal for applying learned skills within the next month, with a progress-tracking method',
              'Empowered leadership means guiding, not hovering — enabling progress, not managing every step',
              'Creates the psychological and operational space for teams to thrive',
              'Removes the need to constantly track, micromanage or step in',
            ],
          },
        ],
        includes: ['AI-powered organisational tool for shared task visibility, ownership and deadlines'],
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
        days: [
          {
            title: 'Phase 01 — Alignment',
            points: [
              'Cultural assessment & training needs analysis',
              'Knowledge pre-assessment',
              'Pre-delivery assessment & customisation',
              'Experiential learning',
              'Grounded in reflecting on doing — the most effective and enduring form of learning',
            ],
          },
          {
            title: 'Phase 02 — Sustainability',
            points: [
              'Rewarding programme focus group',
              'Individual assessment & 1:1 sessions',
              'Customised learning & post-assessment',
              'Post-delivery employee assistance programme',
              'Individualised learning — interactive focus groups and mentoring, accessible for 1 month',
            ],
          },
          {
            title: 'Phase 03 — Productivity',
            points: [
              'Productivity hacks & check-ins',
              'Recognition programme',
              'Individualised behavioural, productivity & advising sessions',
              'Technology-assisted learning — AI tools supporting mental clarity and priorities',
              'Active learning — VR, hands-on activities and personalised competency assessments',
            ],
          },
          {
            title: 'Phase 04 — Happiness & Loyalty',
            points: [
              'Team retreats',
              'Celebrating wellness champions',
              'VR-based wellbeing',
              'Culture & individual progress tracking',
              'Gamified learning, using the Flash Debriefing methodology',
            ],
          },
        ],
        models: 'Business Psychology, Organizational Behavior and Modern Neuroscience — delivered through British Accredited CPD certification.',
      },
      {
        title: 'Shine & Shadow: Strengths & Derailers Diagnostic',
        hook: 'Every leader has a strength that built their reputation — and a shadow that dims it.',
        details: 'A personalised behavioural report uncovering tendencies, root causes and derailers, applied through a one-on-one debrief session.',
        pills: ['Cross-initiative asset'],
        benefitsLabel: 'What the diagnostic covers',
        benefits: [
          'Personalised behavioural report uncovering tendencies, root causes and derailers',
          'Applied through a confidential one-on-one debrief session',
          'Shares its methodology with the GALLUP+ Strengths & Derailers framework used across the Next Gen 2030 initiative',
          'Helps leaders unlock intrinsic strengths within their teams rather than fixate on what\'s lacking',
          'Shifts the focus from deficits to growth, aimed at maximum organisational impact',
        ],
      },
      {
        title: '100 & Rising: The Recognition Covenant',
        hook: 'A fully sponsored wellness-recognition programme, awarded every 100 learners trained.',
        details: 'For every 200 assessments completed, we sponsor incentives that nurture potential and celebrate broad participation — embedding a genuine commitment to wellbeing at every organisational level.',
        pills: ['UN SDG-aligned'],
        benefitsLabel: 'What Wellness Ambassadors receive',
        benefits: [
          'Bonus individualised development hours',
          'UK-accredited professional certificate',
          'Hi-Potential Leaders Development Programme access',
          'English language courses for employees and/or their families',
          'Healthy lifestyle subsidies',
          'Wellness / counselling advising sessions',
          'Personalised individual Gallup CliftonStrengths® report & debrief',
        ],
      },
      {
        title: 'The Neural Relapse Tax',
        hook: 'Most training evaporates within days. This is the science of why.',
        details: 'Uses neural plasticity to install professional readiness as a native feature, turning temporary motivation into permanent, high-performance architecture.',
        pills: ['Behavioural science'],
        benefitsLabel: 'The science',
        benefits: [
          "Most firms are trapped in a cycle of costly 'Behavioural Repair' — spending millions on training that evaporates within days",
          'Traditional development fails by trying to overwrite deeply rooted habits, creating "Institutional Inertia"',
          'A temporary "Novelty Spike" inevitably collapses back to baseline behaviour',
          'Bio-Core™ uses neural plasticity to install excellence as the only professional language ever learned',
          'Systemic Performance Calibration turns temporary motivation into permanent, high-performance architecture',
        ],
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
        benefits: [
          'Reset through neuroscience-backed practices',
          'Sunrise meditation and 1:1 guided healing sessions',
          "Extends awareness and knowledge to participants' families",
          'Creates a ripple effect that reinforces internal company culture transformation',
          'Contributes to broader community wellbeing',
          'Framed within the Sustainability Development Goals era of holistic human capital development',
        ],
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

      // ---- Corporate Leadership Portfolio (added from course document + PDF title list) ----
      {
        title: 'Modern Leadership',
        hook: 'Build the practical psychology, communication and decision-making skills required to lead people in a rapidly changing workplace.',
        format: '3-Day Flagship Programme',
        delivery: 'Face-to-Face or Live Virtual',
        pills: ['Leadership', 'Management', 'People Skills'],
        benefitsLabel: "What You'll Learn",
        benefits: [
          'Adapt your leadership style to different people and situations',
          'Delegate without losing accountability',
          'Build trust and psychological safety',
          'Motivate people beyond salary and rewards',
          'Lead hybrid and multigenerational teams',
          'Coach employees rather than simply give instructions',
          'Handle difficult conversations confidently',
          'Make better decisions under uncertainty',
        ],
        includes: [
          '3-Day Leadership Experience', 'Leadership Style Diagnostic', 'Adaptive Leadership Scenarios',
          'Delegation & Empowerment Lab', 'Psychological Safety Challenge', 'Coaching Practice',
          'Difficult Conversation Simulations', 'Leadership Decision Cases', 'Personal Leadership Playbook',
        ],
        days: [
          { title: 'Day 1 — Understand Your Leadership', points: ['Modern leadership challenges', 'Leadership styles and adaptability', 'Self-awareness and leadership behaviour', 'Emotional intelligence', 'Trust and psychological safety'] },
          { title: 'Day 2 — Lead People', points: ['Motivation psychology', 'Delegation and empowerment', 'Coaching versus telling', 'Feedback', 'Accountability without micromanagement'] },
          { title: 'Day 3 — Lead Performance', points: ['Difficult conversations', 'Conflict management', 'Decision-making under pressure', 'Hybrid and multigenerational leadership', 'Personal leadership action plan'] },
        ],
        models: 'Situational Leadership, Self-Determination Theory, Psychological Safety, Emotional Intelligence, Locus of Control, Cognitive Biases.',
        audience: ['Managers', 'Team leaders', 'Supervisors', 'Department heads', 'High-potential employees', 'Professionals moving into leadership'],
        requirements: 'No previous leadership qualification required. Experience working with others is helpful.',
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'Talent Retention',
        hook: 'Learn how to identify disengagement before resignation happens and create an environment your best people choose to stay in.',
        format: '2-Day Practical Workshop',
        delivery: 'Face-to-Face or Live Virtual',
        pills: ['Talent Management', 'Engagement', 'Leadership'],
        benefitsLabel: "What You'll Learn",
        benefits: [
          'Understand why talented employees really leave',
          'Recognize disengagement before resignation',
          'Identify what motivates different employees',
          'Conduct effective stay conversations',
          'Develop high-potential employees',
          'Improve recognition and belonging',
          'Create meaningful career conversations',
          'Build practical retention plans',
        ],
        includes: [
          '2-Day Talent Retention Workshop', 'Retention Risk Diagnostic', 'Motivation Mapping Exercise',
          'Stay Interview Practice', 'High-Potential Employee Cases', 'Career Conversation Role Plays',
          'Recognition Strategy Exercise', 'Individual Retention Plan', 'Manager Retention Toolkit',
        ],
        days: [
          { title: 'Day 1 — Why People Leave', points: ['The real causes of employee turnover', 'Engagement versus disengagement', 'Motivation beyond money', 'Fairness, recognition and belonging', 'Identifying retention risk'] },
          { title: 'Day 2 — Why People Stay', points: ['Stay interviews', 'Career conversations', 'Coaching high potentials', 'Development opportunities', 'Individual retention strategies'] },
        ],
        models: 'Self-Determination Theory, Equity Theory, Job Embeddedness, Leader-Member Exchange, Job Characteristics Model.',
        audience: ['Managers', 'HR professionals', 'Talent managers', 'Department heads', 'Leaders responsible for key employees'],
        requirements: 'No HR qualification is required.',
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'Workplace Focus',
        hook: 'Turn fragmented attention, digital overload and constant busyness into sustained, high-value productivity.',
        format: '2-Day Practical Workshop',
        delivery: 'Live Virtual or Face-to-Face',
        pills: ['Productivity', 'Focus', 'Time Management'],
        benefitsLabel: "What You'll Learn",
        benefits: [
          'Understand what constant interruption does to attention',
          'Stop confusing busyness with productivity',
          'Reduce unnecessary multitasking',
          'Manage digital distractions',
          'Protect time for high-value work',
          'Improve concentration',
          'Reduce cognitive overload',
          'Build sustainable productivity habits',
        ],
        includes: [
          '2-Day Productivity Lab', 'Personal Distraction Audit', 'Multitasking Brain Experiment', 'Attention Challenges',
          'Digital Overload Assessment', 'Priority Mapping Exercise', 'Calendar Redesign', 'Habit Design Lab', 'Personal Focus System',
        ],
        days: [
          { title: 'Day 1 — The Distracted Brain', points: ['Why focus is becoming harder', 'Multitasking versus task switching', 'Cognitive overload', 'Attention residue', 'Personal productivity leaks'] },
          { title: 'Day 2 — Designing Focus', points: ['Deep versus shallow work', 'Managing interruptions', 'Email and notification control', 'Priority management', 'Building a personal focus system'] },
        ],
        models: 'Cognitive Load Theory, Attention Residue, Habit Loop, Implementation Intentions, Zeigarnik Effect.',
        audience: ['Knowledge workers', 'Managers', 'Professionals dealing with information overload', 'Employees working in interruption-heavy environments'],
        requirements: 'No prior productivity training required.',
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'Employee Wellbeing',
        hook: 'Move beyond superficial wellbeing initiatives and understand the workplace conditions that create sustainable human performance.',
        format: '2-Day Practical Workshop',
        pills: ['Wellbeing', 'Engagement', 'Leadership'],
        benefitsLabel: "What You'll Learn",
        benefits: [
          'Distinguish healthy pressure from harmful stress',
          'Recognize burnout warning signs',
          'Identify workplace drivers of poor wellbeing',
          'Understand the impact of workload and control',
          'Conduct supportive conversations',
          'Improve team recovery and energy',
          'Build psychological safety',
          'Support sustainable performance',
        ],
        includes: [
          '2-Day Wellbeing Experience', 'Wellbeing & Burnout Diagnostic', 'Energy Management Exercises', 'Workload Risk Mapping',
          'Manager Wellbeing Conversations', 'Psychological Safety Cases', 'Recovery Planning', 'Team Wellbeing Action Plan', 'Sustainable Performance Toolkit',
        ],
        days: [
          { title: 'Day 1 — Understand Wellbeing', points: ['Wellbeing versus happiness', 'Stress and burnout', 'Workplace risk factors', 'Energy and recovery', 'Psychological safety'] },
          { title: 'Day 2 — Lead Wellbeing', points: ['Workload management', 'Manager behaviour', 'Supportive conversations', 'Boundaries and recovery', 'Team wellbeing practices'] },
        ],
        models: 'Job Demands-Resources Model, Maslach Burnout Framework, PERMA, Conservation of Resources, Psychological Safety.',
        audience: ['Managers', 'Team leaders', 'HR professionals', 'Wellbeing champions'],
        requirements: 'No previous wellbeing knowledge required.',
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'Leadership Pipeline',
        hook: 'Stop waiting until promotion to discover whether someone can lead. Identify, test and develop leadership potential before the role becomes vacant.',
        format: '3-Day Flagship Programme',
        pills: ['Succession', 'Talent Development', 'Leadership'],
        benefitsLabel: "What You'll Learn",
        benefits: [
          'Distinguish performance from leadership potential',
          'Identify future leaders earlier',
          'Assess leadership readiness',
          'Identify developmental gaps',
          'Design stretch assignments',
          'Coach high-potential employees',
          'Build stronger successors',
          'Create practical development plans',
        ],
        includes: [
          '3-Day Talent Development Lab', 'Performance-vs-Potential Diagnostic', 'Leadership Readiness Assessment',
          'High-Potential Identification Cases', 'Assessment-Centre Simulations', 'Stretch Assignment Design',
          'Developmental Coaching Practice', 'Succession Planning Exercise', '90-Day Talent Development Plan',
        ],
        days: [
          { title: 'Day 1 — Spot Potential', points: ['Performance versus potential', 'Leadership readiness', 'Learning agility', 'Behavioural indicators', 'Talent assessment'] },
          { title: 'Day 2 — Test Potential', points: ['Leadership simulations', 'Decision scenarios', 'Problem-solving under pressure', 'Feedback interpretation', 'Development gaps'] },
          { title: 'Day 3 — Grow Potential', points: ['Stretch assignments', 'Coaching and mentoring', 'Succession planning', 'Developmental feedback', 'Individual development planning'] },
        ],
        models: 'Learning Agility, Growth Mindset, Deliberate Practice, Self-Efficacy Theory, Experiential Learning.',
        audience: ['Senior managers', 'Talent managers', 'HR business partners', 'Leaders responsible for succession planning'],
        requirements: 'Experience managing or developing employees is recommended.',
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'Wellbeing Audit',
        hook: 'Understand where your organization really stands before investing in another wellbeing initiative.',
        format: '2-Day Strategic Workshop',
        pills: ['Wellbeing Strategy', 'HR Analytics', 'OD'],
        benefitsLabel: "What You'll Learn",
        benefits: [
          'Measure workplace wellbeing more intelligently',
          'Identify psychosocial risks',
          'Diagnose root causes of stress',
          'Separate symptoms from systemic problems',
          'Interpret wellbeing indicators',
          'Prioritize interventions',
          'Measure intervention effectiveness',
          'Build an organizational wellbeing roadmap',
        ],
        includes: [
          '2-Day Organizational Wellbeing Lab', 'Workplace Wellbeing Diagnostic', 'Psychosocial Risk Mapping',
          'Employee Experience Heatmap', 'Root-Cause Analysis Workshop', 'Wellbeing Data Interpretation',
          'Intervention Prioritization', 'Wellbeing Roadmap Template',
        ],
        days: [
          { title: 'Day 1 — Diagnose', points: ['What should organizations measure?', 'Workload and role clarity', 'Control and autonomy', 'Psychological safety', 'Burnout and engagement indicators'] },
          { title: 'Day 2 — Improve', points: ['Root causes', 'Risk prioritization', 'Intervention design', 'Measuring impact', 'Building the wellbeing roadmap'] },
        ],
        models: 'Job Demands-Resources, Maslach, PERMA, Conservation of Resources, 5 Whys.',
        audience: ['HR leaders', 'Wellbeing teams', 'Organizational development professionals', 'Senior managers'],
        requirements: 'Basic organizational experience is useful.',
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'Peak Performance',
        hook: 'Use behavioural science and psychology to perform at a high level without depending on longer hours and constant pressure.',
        format: '2-Day Practical Workshop',
        pills: ['Performance', 'Psychology', 'Productivity'],
        benefitsLabel: "What You'll Learn",
        benefits: [
          'Understand how the brain performs under pressure',
          'Manage energy as well as time',
          'Create conditions for deep concentration',
          'Understand flow',
          'Reduce cognitive overload',
          'Improve recovery',
          'Build high-performance habits',
          'Design your personal performance system',
        ],
        includes: [
          '2-Day Performance Lab', 'Peak Performance Diagnostic', 'Cognitive Performance Experiments', 'Flow-State Challenge',
          'Energy & Recovery Audit', 'Focus Experiments', 'Habit Architecture Lab', 'Personal Performance Operating System',
        ],
        days: [
          { title: 'Day 1 — The Performance Brain', points: ['Attention', 'Cognitive capacity', 'Flow', 'Stress and performance', 'Energy and recovery'] },
          { title: 'Day 2 — Performance by Design', points: ['Deliberate practice', 'Habit architecture', 'Decision energy', 'Focus routines', 'Personal performance system'] },
        ],
        models: 'Flow Theory, Yerkes-Dodson Law, Deliberate Practice, Cognitive Load Theory, Habit Loop.',
        audience: ['High performers', 'Managers', 'Knowledge workers', 'Professionals operating under sustained pressure'],
        requirements: 'No psychology background required.',
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'Leadership Accelerator',
        hook: 'Compress years of trial-and-error leadership learning into three intensive days of practice, feedback and reflection.',
        format: '3-Day Intensive Programme',
        pills: ['Leadership Development', 'Coaching', 'Management'],
        benefitsLabel: "What You'll Learn",
        benefits: [
          'Accelerate your transition into leadership',
          'Practice leadership rather than simply study it',
          'Delegate effectively',
          'Coach employees',
          'Give developmental feedback',
          'Manage conflict',
          'Influence others',
          'Improve decision-making',
          'Build a personal leadership development plan',
        ],
        includes: [
          '3-Day Leadership Intensive', 'Leadership Capability Diagnostic', 'Rapid-Fire Management Scenarios', 'Delegation Challenge',
          'Coaching Practice Lab', 'Feedback Simulations', 'Conflict & Influence Challenges', 'Peer Observation',
          'Leadership Decision Rooms', '30-60-90 Development Plan',
        ],
        days: [
          { title: 'Day 1 — Manage Yourself', points: ['Leadership transition', 'Self-awareness', 'Emotional intelligence', 'Leadership mindset', 'Personal effectiveness'] },
          { title: 'Day 2 — Manage People', points: ['Delegation', 'Coaching', 'Feedback', 'Difficult conversations', 'Conflict'] },
          { title: 'Day 3 — Lead Performance', points: ['Influence', 'Decision-making', 'Team performance', 'Leadership simulations', '30-60-90 plan'] },
        ],
        models: 'Kolb Experiential Learning, GROW Coaching, Deliberate Practice, Psychological Safety, Reflective Practice.',
        audience: ['Newly promoted managers', 'Emerging leaders', 'High potentials', 'Managers requiring accelerated development'],
        requirements: 'Current or upcoming leadership responsibility is recommended.',
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'Executive Presence',
        hook: 'Learn how to be heard, trusted and followed when the stakes are high.',
        format: '2-Day Executive Workshop',
        pills: ['Communication', 'Influence', 'Leadership'],
        benefitsLabel: "What You'll Learn",
        benefits: [
          'Communicate with greater confidence and authority',
          'Structure concise executive messages',
          'Build credibility',
          'Improve verbal and non-verbal communication',
          'Influence senior stakeholders',
          'Manage nervousness',
          'Handle challenging questions',
          'Present ideas at executive level',
        ],
        includes: [
          '2-Day Executive Communication Lab', 'Executive Presence Diagnostic', 'Live Presentation Practice',
          'Boardroom Communication Simulation', 'Impromptu Speaking Challenges', 'Difficult Question Practice',
          'Stakeholder Influence Exercise', 'Individual Presentation Feedback', 'Executive Messaging Toolkit',
        ],
        days: [
          { title: 'Day 1 — Presence', points: ['First impressions', 'Confidence', 'Credibility', 'Body language', 'Executive messaging'] },
          { title: 'Day 2 — Influence', points: ['Persuasion psychology', 'Executive storytelling', 'Stakeholder communication', 'Challenging questions', 'Executive presentation challenge'] },
        ],
        models: "Cialdini's Influence Principles, Processing Fluency, Social Signalling, Emotional Regulation, Ethos-Pathos-Logos.",
        audience: ['Managers', 'Senior leaders', 'Consultants', 'Professionals presenting to senior stakeholders'],
        requirements: 'Participants are encouraged to bring a real business message or presentation.',
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'People Leadership',
        hook: 'Master the human side of management: motivation, trust, feedback, conflict, accountability and performance.',
        format: '3-Day Flagship Programme',
        pills: ['People Management', 'Emotional Intelligence', 'Leadership'],
        benefitsLabel: "What You'll Learn",
        benefits: [
          'Understand what drives employee behaviour',
          'Motivate different people differently',
          'Build trust',
          'Improve emotional intelligence',
          'Give feedback without creating defensiveness',
          'Manage conflict',
          'Hold people accountable',
          'Conduct difficult conversations',
          'Create stronger team relationships',
        ],
        includes: [
          '3-Day People Leadership Experience', 'Motivation Diagnostic', 'Emotional Intelligence Exercises',
          'Trust & Psychological Safety Lab', 'Employee Persona Cases', 'Feedback Conversation Practice',
          'Conflict Simulations', 'Accountability Role Plays', 'Difficult Employee Scenarios', 'Manager Conversation Toolkit',
        ],
        days: [
          { title: 'Day 1 — Understand People', points: ['Human behaviour at work', 'Emotional intelligence', 'Motivation', 'Trust', 'Psychological safety'] },
          { title: 'Day 2 — Communicate With People', points: ['Listening', 'Feedback', 'Coaching', 'Difficult conversations', 'Conflict'] },
          { title: 'Day 3 — Lead Performance', points: ['Accountability', 'Delegation', 'Motivation differences', 'Team dynamics', 'Leadership action plan'] },
        ],
        models: 'Self-Determination Theory, Emotional Intelligence, Psychological Safety, Thomas-Kilmann, SBI Feedback, Locus of Control.',
        audience: ['Managers', 'Supervisors', 'Team leaders', 'New people managers'],
        requirements: 'Experience managing people is useful but not essential.',
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'Business Transformation',
        hook: "Move from reacting to disruption to deliberately shaping your organization's future.",
        format: '3-Day Strategic Programme',
        pills: ['Strategy', 'Transformation', 'Innovation'],
        benefitsLabel: "What You'll Learn",
        benefits: [
          'Recognize forces disrupting your organization',
          'Understand how AI affects business models',
          "Think beyond today's operating model",
          'Identify transformation priorities',
          'Align people, process and technology',
          'Engage stakeholders',
          'Anticipate execution barriers',
          'Build a practical transformation roadmap',
        ],
        includes: [
          '3-Day Transformation Strategy Lab', 'Business Disruption Scenarios', 'Future Trends Exercise', 'AI Impact Mapping',
          'Systems-Thinking Challenge', 'Transformation Readiness Diagnostic', 'Stakeholder Mapping',
          'Strategic Scenario Simulation', 'Transformation Canvas', 'Business Transformation Roadmap',
        ],
        days: [
          { title: 'Day 1 — Understand Disruption', points: ['Changing markets', 'AI and technology', 'Customer expectations', 'Business-model disruption', 'Future scenarios'] },
          { title: 'Day 2 — Design Transformation', points: ['Systems thinking', 'Strategic priorities', 'Organizational alignment', 'Transformation readiness', 'Stakeholder engagement'] },
          { title: 'Day 3 — Execute Transformation', points: ['Resistance', 'Execution barriers', 'Governance', 'Measurement', 'Transformation roadmap'] },
        ],
        models: 'Systems Thinking, McKinsey 7S, Scenario Planning, Cynefin Framework, Kotter Change Framework.',
        audience: ['Senior leaders', 'Strategy teams', 'Transformation professionals', 'Department heads', 'Project leaders'],
        requirements: 'Business management experience is recommended.',
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'Change Leadership',
        hook: 'Understand what sits behind resistance and learn how to move people from uncertainty to genuine adoption.',
        format: '3-Day Flagship Programme',
        pills: ['Change Management', 'Behaviour Change', 'Leadership'],
        benefitsLabel: "What You'll Learn",
        benefits: [
          'Understand why people resist change',
          'Diagnose different forms of resistance',
          'Communicate change more effectively',
          'Reduce uncertainty and perceived threat',
          'Influence adoption',
          'Handle resistance conversations',
          'Design behavioural change',
          'Reinforce new habits',
          'Make change stick',
        ],
        includes: [
          '3-Day Change Leadership Lab', 'Change Readiness Diagnostic', 'Resistance Mapping', 'Change Psychology Exercises',
          'Stakeholder Reaction Simulation', 'Difficult Change Conversations', 'COM-B Behaviour Analysis',
          'Change Communication Challenge', 'Adoption & Reinforcement Plan', 'Live Change Action Plan',
        ],
        days: [
          { title: 'Day 1 — Understand Resistance', points: ['Psychology of change', 'Loss and uncertainty', 'Threat perception', 'Stakeholder reactions', 'Types of resistance'] },
          { title: 'Day 2 — Lead Change', points: ['Change communication', 'Influence', 'Difficult conversations', 'Psychological safety', 'Stakeholder engagement'] },
          { title: 'Day 3 — Make Change Stick', points: ['Behaviour-change design', 'COM-B', 'Habit formation', 'Reinforcement', 'Adoption planning'] },
        ],
        models: 'COM-B, Kotter, Lewin, Immunity to Change, Psychological Safety, Habit Formation.',
        audience: ['Leaders managing transformation', 'Project managers', 'Change managers', 'HR and OD professionals', 'Transformation teams'],
        requirements: 'Participants are encouraged to bring a real change initiative.',
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'Leadership Psychology',
        hook: 'Understand what is really happening underneath resistance, conflict and disengagement — and learn how to change the interaction rather than repeat it.',
        format: '3-Day Experiential Programme',
        pills: ['Psychology', 'Communication', 'Leadership'],
        benefitsLabel: "What You'll Learn",
        benefits: [
          'Understand what drives workplace behaviour',
          'Recognize Parent, Adult and Child communication',
          'Identify emotional triggers',
          'Recognize psychological games',
          'Understand Drama Triangle dynamics',
          'Reduce defensiveness',
          'Move conversations toward Adult-to-Adult interaction',
          'Improve emotional regulation',
          'Interrupt repeated dysfunctional patterns',
        ],
        includes: [
          '3-Day Behavioural Leadership Lab', 'PAC Ego-State Diagnostic', 'Transaction Analysis Exercises',
          'Workplace Psychological Games', 'Drama Triangle Simulations', 'Trigger Recognition Exercises',
          'Adult-to-Adult Conversation Practice', 'Behaviour Observation Challenges', 'Difficult Relationship Cases', 'Leadership Psychology Toolkit',
        ],
        days: [
          { title: 'Day 1 — Decode Behaviour', points: ['Behaviour beneath behaviour', 'Transactional Analysis', 'Parent-Adult-Child', 'Transactions', 'Recognition and strokes'] },
          { title: 'Day 2 — Understand Dysfunction', points: ['Emotional triggers', 'Psychological games', 'Drama Triangle', 'Victim, Rescuer and Persecutor patterns', 'Locus of control'] },
          { title: 'Day 3 — Change the Pattern', points: ['Adult-to-Adult communication', 'Emotional regulation', 'Responding rather than reacting', 'Difficult relationship simulations', 'Behavioural leadership plan'] },
        ],
        models: "Eric Berne's Transactional Analysis, PAC, Karpman Drama Triangle, Locus of Control, Attribution Bias, Self-Determination Theory.",
        audience: ['Managers', 'Leaders', 'HR professionals', 'Coaches', 'Professionals managing difficult relationships'],
        requirements: 'No psychology background required.',
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'UAE Leadership',
        hook: "Build the cultural intelligence and people skills required to lead effectively in one of the world's most diverse workplaces.",
        format: '2-Day Regional Workshop',
        pills: ['Cultural Intelligence', 'Leadership', 'People Management'],
        benefitsLabel: "What You'll Learn",
        benefits: [
          'Lead multicultural teams more effectively',
          'Understand different expectations of leadership',
          'Adapt communication across cultures',
          'Build trust in diverse teams',
          'Prevent misunderstandings without stereotyping',
          'Give culturally intelligent feedback',
          'Manage disagreement constructively',
          'Build inclusive high-performing teams',
        ],
        includes: [
          '2-Day Multicultural Leadership Experience', 'Cultural Intelligence Diagnostic', 'UAE Workplace Cases',
          'Cross-Cultural Communication Simulation', 'Multinational Team Challenge', 'Trust-Across-Cultures Exercises',
          'Feedback Across Cultures Practice', 'Inclusive Leadership Action Plan',
        ],
        days: [
          { title: 'Day 1 — Lead Across Cultures', points: ['UAE leadership environment', 'Cultural intelligence', 'Communication differences', 'Trust', 'Psychological safety'] },
          { title: 'Day 2 — Build Performance', points: ['Motivation across cultures', 'Feedback', 'Conflict', 'Accountability', 'Inclusive leadership'] },
        ],
        models: 'Cultural Intelligence, Social Identity Theory, Psychological Safety, Self-Determination Theory, Thomas-Kilmann.',
        audience: ['UAE-based managers', 'Multicultural team leaders', 'Expatriate leaders', 'Emerging managers'],
        requirements: 'Experience working within multicultural teams is useful.',
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'Saudi Leadership',
        hook: 'Practical people-leadership skills for managers navigating transformation, new workforce expectations and the rapidly changing Saudi workplace.',
        format: '3-Day Flagship Programme',
        pills: ['Leadership', 'People Management', 'Transformation'],
        benefitsLabel: "What You'll Learn",
        benefits: [
          'Lead effectively in the rapidly changing Saudi workplace',
          'Manage different generations and expectations',
          'Build employee ownership',
          'Motivate without over-controlling',
          'Create trust and psychological safety',
          'Delegate more effectively',
          'Give meaningful feedback',
          'Manage conflict and difficult conversations',
          'Lead people through transformation',
        ],
        includes: [
          '3-Day Saudi Leadership Experience', 'Saudi Workplace Leadership Cases', 'Leadership Behaviour Diagnostic',
          'Generational Leadership Scenarios', 'Motivation & Ownership Lab', 'Coaching & Delegation Practice',
          'Accountability Conversations', 'Psychological Safety Simulation', 'Transformation Leadership Challenge',
          'Real-World Manager Cases', 'Personal Leadership Action Plan',
        ],
        days: [
          { title: "Day 1 — Lead in Today's Saudi Workplace", points: ['Changing leadership expectations', 'Leadership mindset', 'Generational differences', 'Motivation and ownership', 'Trust and psychological safety'] },
          { title: 'Day 2 — Lead People', points: ['Emotional intelligence', 'Coaching', 'Delegation', 'Feedback', 'Difficult conversations'] },
          { title: 'Day 3 — Lead Performance & Change', points: ['Accountability', 'Conflict management', 'Leading transformation', 'Building ownership', 'Personal leadership action plan'] },
        ],
        models: 'Self-Determination Theory, Transactional Analysis/PAC, Psychological Safety, Locus of Control, Cultural Intelligence, Thomas-Kilmann.',
        audience: ['Saudi managers', 'Expatriate managers working in Saudi Arabia', 'Supervisors', 'Department heads', 'Emerging leaders', 'Leaders supporting transformation'],
        requirements: 'No formal leadership qualification required.',
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: "Women's Leadership",
        hook: 'Building the confidence, presence and strategic capability of women stepping into senior leadership roles.',
        pills: ['Leadership', 'SDG 5'],
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'Youth Career Development & New Graduates',
        hook: 'Preparing new graduates and early-career talent for the realities of a professional workplace.',
        pills: ['Career Readiness', 'Gen Z'],
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'AI and Human Sciences: AI-Driven & Neuroscience-Based Productivity',
        hook: 'Where artificial intelligence meets neuroscience — using AI-driven tools and brain science to lift team productivity.',
        pills: ['AI', 'Neuroscience', 'Productivity'],
        awarded: 'British Certification from CPD-London.',
      },
      {
        title: 'Certified Professional in Office Management',
        hook: 'A certified standard for running a modern executive office — organisation, discretion and operational excellence.',
        pills: ['Certified', 'Office Management'],
        awarded: 'British Certification from CPD-London.',
      },
    ],
  },
];

const initiatives: Record<string, Initiative> = {
  nextgen: {
    eyebrow: 'Initiative 1 · UK–KSA Collaboration',
    title: 'NextGen 2030: The Quarter-Billion Covenant',
    description:
      'A collaborative UK–Saudi initiative bridging campus to career for Gen Z — nearly a third of the global workforce by 2030, and a generation the region cannot afford to onboard the old way.',
    stats: [
      { icon: Globe, value: '~30%', label: 'of the global workforce is Gen Z by 2030' },
      { icon: Users, value: '140M', label: 'young people aged 10–24 across MENA' },
      { icon: Heart, value: '50 / 75%', label: 'of lifetime wellbeing issues begin by age 14 / 24' },
    ],
  },
  health: {
    title: 'Wellbeing Is The New KPI',
    description: 'Employee wellbeing has a quantifiable link to business performance across industries and countries worldwide.',
    featuresLabel: 'Program Features',
    features: [
      'Link wellbeing to performance with a business case leaders trust.',
      'Apply evidence-backed frameworks to your culture.',
      'Reduce attrition through measurable engagement gains.',
      'Grounded in a proprietary blend of business psychology, the study of self, and human physiology, summarized into one practical leadership overview.',
    ],
  },
};

const InitiativeBanner: React.FC<{ initiative: Initiative }> = ({ initiative }) => (
  <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
    {initiative.eyebrow && (
      <span className="text-emerald-400 text-[11px] font-bold uppercase tracking-widest">{initiative.eyebrow}</span>
    )}
    <h3 className={`text-white text-2xl sm:text-3xl font-bold leading-tight ${initiative.eyebrow ? 'mt-3' : ''}`}>{initiative.title}</h3>
    <p className="mt-4 text-slate-400 text-base leading-relaxed max-w-3xl">{initiative.description}</p>

    {initiative.stats && (
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {initiative.stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/15 flex items-center justify-center">
              <s.icon className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="mt-4 text-white text-2xl font-bold">{s.value}</p>
            <p className="mt-1 text-slate-400 text-sm leading-relaxed">{s.label}</p>
          </div>
        ))}
      </div>
    )}

    {initiative.features && (
      <div className="mt-6">
        {initiative.featuresLabel && <p className="text-white text-lg font-bold mb-3">{initiative.featuresLabel}</p>}
        <ul className="space-y-2.5">
          {initiative.features.map((f) => (
            <li key={f} className="flex gap-2.5 text-slate-300 text-sm leading-relaxed">
              <span className="text-emerald-400 mt-1.5">•</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const DeliverableCard: React.FC<{ item: Deliverable; onOutline: (item: Deliverable) => void }> = ({ item, onOutline }) => {
  const [open, setOpen] = useState(false);
  const hasDetails = Boolean(
    item.details || item.spec || item.benefits || item.audience || item.awarded ||
    item.pills || item.includes || item.days || item.models || item.requirements
  );

  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-500 hover:bg-white/[0.06] hover:border-emerald-400/30 hover:-translate-y-1">
      {/* Image placeholder — real photography to be added later */}
      <div
        className="relative aspect-[16/10] border-b border-white/10 flex items-center justify-center"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, #0d1424 0px, #0d1424 10px, #101a30 10px, #101a30 20px)',
        }}
      >
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-950/60 border border-dashed border-white/20 rounded-lg px-3 py-1.5">
          <ImageIcon className="w-3 h-3" /> Image space
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-white font-semibold leading-snug">{item.title}</h3>
        <p className="mt-2 text-slate-400 text-sm leading-relaxed">{item.hook}</p>

        {(item.format || item.delivery || item.spec) && (
          <div className="mt-3 flex flex-col gap-1.5">
            {item.format && (
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <CalendarDays className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {item.format}
              </span>
            )}
            {item.delivery && (
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {item.delivery}
              </span>
            )}
            {!item.format && item.spec && (
              <div className="flex flex-wrap gap-2">
                {item.spec.map((s) => (
                  <span key={s} className="text-[11px] font-semibold text-slate-200 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {item.pills && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.pills.map((p) => (
              <span key={p} className="text-[10px] font-semibold text-emerald-300 bg-emerald-400/10 border border-emerald-400/25 px-2.5 py-1 rounded-full">
                {p}
              </span>
            ))}
          </div>
        )}

        {hasDetails && (
          <div className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <div className="pt-4 border-t border-white/10 space-y-3">
                {item.format && item.spec && (
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

                {item.includes && (
                  <div>
                    <p className="text-emerald-300 text-[11px] font-bold uppercase tracking-widest mb-1.5">This Course Includes</p>
                    <ul className="space-y-1">
                      {item.includes.map((b) => (
                        <li key={b} className="text-slate-300 text-xs leading-relaxed flex gap-2">
                          <span className="text-emerald-400 mt-1">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.days && (
                  <div>
                    <p className="text-emerald-300 text-[11px] font-bold uppercase tracking-widest mb-1.5">Course Content</p>
                    <div className="space-y-2">
                      {item.days.map((d) => (
                        <div key={d.title}>
                          <p className="text-white text-xs font-semibold">{d.title}</p>
                          <p className="text-slate-400 text-xs leading-relaxed">{d.points.join(' · ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.models && (
                  <p className="text-slate-400 text-xs italic border-l-2 border-emerald-400/40 pl-3">
                    <span className="text-slate-300 not-italic font-semibold">Models &amp; Psychology: </span>
                    {item.models}
                  </p>
                )}

                {item.audience && (
                  <div>
                    <p className="text-emerald-300 text-[11px] font-bold uppercase tracking-widest mb-1.5">Who This Course Is For</p>
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

                {item.requirements && <p className="text-slate-500 text-xs">Requirements: {item.requirements}</p>}

                {item.awarded && <p className="text-slate-400 text-xs italic">Awarded: {item.awarded}</p>}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center gap-4">
          {hasDetails && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1 text-emerald-400 text-xs font-semibold hover:underline"
            >
              {open ? 'Show less' : 'Learn More'}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
          )}
          <button
            onClick={() => onOutline(item)}
            className="inline-flex items-center gap-1 text-slate-300 text-xs font-semibold hover:text-white hover:underline"
          >
            <FileText className="w-3.5 h-3.5" /> Outline
          </button>
        </div>
      </div>
    </div>
  );
};

const OutlineModal: React.FC<{ item: Deliverable | null; onClose: () => void }> = ({ item, onClose }) => {
  if (!item) return null;
  const hasRealOutline = Boolean(item.days);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 p-8 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-widest">
          <FileText className="w-3.5 h-3.5" /> Course Outline
        </span>
        <h2 className="mt-3 text-2xl font-bold text-white leading-tight">{item.title}</h2>
        <p className="mt-2 text-slate-400 text-sm">{item.format ?? item.spec?.join(' · ') ?? ''}</p>
        {item.delivery && <p className="text-slate-500 text-xs mt-0.5">{item.delivery}</p>}

        <p className="mt-5 text-slate-300 text-sm leading-relaxed">{item.hook}</p>
        {item.details && <p className="mt-3 text-slate-400 text-sm leading-relaxed">{item.details}</p>}

        {hasRealOutline ? (
          <>
            {item.days && (
              <div className="mt-7">
                <p className="text-emerald-300 text-[11px] font-bold uppercase tracking-widest mb-3">Course Content</p>
                <div className="space-y-4">
                  {item.days.map((d) => (
                    <div key={d.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="text-white text-sm font-semibold mb-2">{d.title}</p>
                      <ul className="space-y-1">
                        {d.points.map((p) => (
                          <li key={p} className="text-slate-400 text-xs leading-relaxed flex gap-2">
                            <span className="text-emerald-400 mt-1">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {item.models && (
              <p className="mt-5 text-slate-400 text-xs italic border-l-2 border-emerald-400/40 pl-3">
                <span className="text-slate-300 not-italic font-semibold">Models &amp; Psychology: </span>
                {item.models}
              </p>
            )}
          </>
        ) : (
          item.benefits && (
            <div className="mt-7">
              <p className="text-emerald-300 text-[11px] font-bold uppercase tracking-widest mb-3">{item.benefitsLabel ?? 'Key Learning Points'}</p>
              <ul className="space-y-1.5">
                {item.benefits.map((b) => (
                  <li key={b} className="text-slate-300 text-sm leading-relaxed flex gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        )}

        {item.audience && (
          <div className="mt-6">
            <p className="text-emerald-300 text-[11px] font-bold uppercase tracking-widest mb-2">Who Should Attend</p>
            <ul className="space-y-1">
              {item.audience.map((a) => (
                <li key={a} className="text-slate-400 text-xs leading-relaxed flex gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.requirements && <p className="mt-4 text-slate-500 text-xs">Requirements: {item.requirements}</p>}
        {item.awarded && <p className="mt-2 text-slate-400 text-xs italic">Awarded: {item.awarded}</p>}

        {!hasRealOutline && (
          <p className="mt-8 text-slate-600 text-[11px]">Full day-by-day outline coming soon for this programme.</p>
        )}
      </div>
    </div>
  );
};

const Deliverables: React.FC = () => {
  const [active, setActive] = useState(categories[0].key);
  const [outlineItem, setOutlineItem] = useState<Deliverable | null>(null);
  const current = categories.find((c) => c.key === active)!;

  return (
    <section id="deliverables" className="relative py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-1.5 text-emerald-400 text-sm font-semibold">
              <Clock className="w-4 h-4" /> Initiatives
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              <span className="text-white">Three programmes.</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">One human-centred system.</span>
            </h2>
            <p className="mt-4 text-slate-400 text-lg">
              Youth readiness, preventive health, and leadership behaviour — each built on the same neuroscience-and-behavioural-science foundation that started at the wellhead, now mapped to Vision 2030.
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

        {initiatives[active] && <InitiativeBanner initiative={initiatives[active]} />}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {current.items.map((item) => (
            <DeliverableCard key={item.title} item={item} onOutline={setOutlineItem} />
          ))}
        </div>
      </div>

      <OutlineModal item={outlineItem} onClose={() => setOutlineItem(null)} />
    </section>
  );
};

export default Deliverables;

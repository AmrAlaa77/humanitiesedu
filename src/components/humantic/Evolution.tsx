import React, { useEffect, useRef } from 'react';
import { Lightbulb, GraduationCap, Landmark, CheckCircle2, Rocket, Globe2 } from 'lucide-react';
import { useInView } from '@/hooks/use-in-view';
import ScrambleText from './ScrambleText';

type Phase = {
  icon: React.ElementType;
  tag: string;
  period: string;
  title: string;
  desc: string;
  status: 'done' | 'active' | 'next';
};

const phases: Phase[] = [
  {
    icon: Lightbulb,
    tag: 'Genesis',
    period: 'The Spark',
    title: 'A cause for humanity is born',
    desc: 'A vow made in medical school to ease pain and restore health led to the field — to HSE, where leadership became a life-preserving act and safety a promise to come home whole. From there, human-behaviour science and business psychology wove together, awakening organisations to our shared humanity.',
    status: 'done',
  },
  {
    icon: GraduationCap,
    tag: 'Research',
    period: 'Foundation',
    title: 'British-accredited content is crafted',
    desc: 'From here, content spanning medicine, human-behaviour science and business psychology was built and validated — carried through British-accredited learning pathways the world could trust.',
    status: 'done',
  },
  {
    icon: Landmark,
    tag: 'Vision 2030 Portal',
    period: 'The Pitch',
    title: 'Carried to the highest level',
    desc: "Through Vision 2030 Portal, we align with a national vision built for those who think beyond business — shaping a country every visitor would want to call home, rooted in Quality of Life's human-centered initiatives.",
    status: 'done',
  },
  {
    icon: CheckCircle2,
    tag: 'The Moment',
    period: 'They Said Yes',
    title: 'The most powerful word in the world',
    desc: 'Where ordinary proposals were turned away, a cause bigger than profit was recognised — and answered with a single, history-making YES.',
    status: 'done',
  },
  {
    icon: Rocket,
    tag: 'Now',
    period: 'Pre-Launch',
    title: 'AURION ONE prepares for the world',
    desc: 'The manifesto becomes a platform. Final engineering, brand and access systems converge toward a launch window measured in weeks, not years.',
    status: 'active',
  },
  {
    icon: Globe2,
    tag: 'The Horizon',
    period: 'Vision 2030',
    title: 'A safer place for all',
    desc: 'Beyond launch lies the true cause — a global health intelligence layer that protects, prevents and empowers humanity at scale.',
    status: 'next',
  },
];

const statusStyles: Record<Phase['status'], { dot: string; label: string; chip: string }> = {
  done: {
    dot: 'bg-emerald-400 border-emerald-300',
    label: 'Achieved',
    chip: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/[0.07]',
  },
  active: {
    dot: 'bg-cyan-400 border-cyan-300 animate-pulse',
    label: 'In Motion',
    chip: 'text-cyan-300 border-cyan-400/30 bg-cyan-400/[0.07]',
  },
  next: {
    dot: 'bg-white/20 border-white/30',
    label: 'On the Horizon',
    chip: 'text-slate-300 border-white/15 bg-white/[0.04]',
  },
};

const Evolution: React.FC = () => {
  const head = useInView<HTMLDivElement>({ once: true });

  return (
  <section id="evolution" className="relative py-24 overflow-hidden">
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1/3 left-1/4 w-[36rem] h-[36rem] rounded-full bg-emerald-500/[0.06] blur-[150px]" />
      <div className="absolute bottom-10 right-1/4 w-[30rem] h-[30rem] rounded-full bg-cyan-500/[0.05] blur-[130px]" />
    </div>

    <div className="max-w-7xl mx-auto px-5 sm:px-8">
      <div ref={head.ref} className="max-w-2xl">
        <span className="inline-flex items-center gap-2 text-emerald-400 text-sm font-semibold uppercase tracking-widest">
          <span className="tabular-nums text-emerald-300/70">05</span>
          <span className="h-px w-6 bg-emerald-400/40" />
          The Evolution of the Initiative
        </span>
        <h2 className="mt-5 text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.05]">
          <ScrambleText text="From a single conviction" active={head.inView} />
          <span className="block bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
            <ScrambleText text="to a global cause." active={head.inView} />
          </span>
        </h2>
        <p className="mt-6 text-slate-400 text-lg leading-relaxed">
          Every milestone below marks a step in the journey — the moments where a
          cause for humanity grew into a movement, and where the world's most
          powerful word changed everything.
        </p>
      </div>

      {/* Mobile / tablet: proven vertical alternating timeline, unchanged */}
      <div className="mt-16 relative sm:hidden">
        <SpineLine vertical />
        <div className="space-y-8">
          {phases.map((p, i) => (
            <TimelineItem key={p.title} phase={p} left={i % 2 === 0} />
          ))}
        </div>
      </div>
    </div>

    {/* Desktop: horizontal scroll-pinned timeline -- the section pins in place while vertical
        scroll drives the cards sideways, like paging through a deck rather than scrolling past it. */}
    <div className="hidden sm:block">
      <HorizontalTimeline />
    </div>
  </section>
  );
};

// Thin gradient line with an SVG stroke-dashoffset draw-in, instead of a plain static div --
// reads as "drawn" the moment the timeline scrolls into view rather than just appearing.
const SpineLine: React.FC<{ vertical?: boolean }> = ({ vertical }) => {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true });
  return (
    <div ref={ref} className={vertical ? 'absolute left-[1.15rem] top-2 bottom-2 w-px' : 'absolute inset-x-8 top-1/2 h-px'}>
      <svg width="100%" height="100%" preserveAspectRatio="none" className="absolute inset-0 overflow-visible">
        <defs>
          <linearGradient id="spineGrad" x1="0" y1="0" x2={vertical ? '0' : '1'} y2={vertical ? '1' : '0'}>
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.5" />
            <stop offset="60%" stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <line
          x1={vertical ? '0' : '0'}
          y1={vertical ? '0' : '0'}
          x2={vertical ? '0' : '100%'}
          y2={vertical ? '100%' : '0'}
          stroke="url(#spineGrad)"
          strokeWidth="1"
          pathLength={100}
          style={{
            strokeDasharray: 100,
            strokeDashoffset: inView ? 0 : 100,
            transition: 'stroke-dashoffset 1.4s ease-out',
          }}
        />
      </svg>
    </div>
  );
};

// Each card gets its own useInView instance, so it animates in as THAT card individually
// scrolls into view -- rather than the whole timeline firing together off one shared observer
// on the outer container (which made every card "arrive" the moment the list's top appeared).
const TimelineItem: React.FC<{ phase: Phase; left: boolean }> = ({ phase: p, left }) => {
  const s = statusStyles[p.status];
  const { ref, inView } = useInView<HTMLDivElement>({ once: false });

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-x-0' : left ? 'opacity-0 -translate-x-12' : 'opacity-0 translate-x-12'
      }`}
    >
      {/* node */}
      <span className={`absolute left-[1.15rem] -translate-x-1/2 top-7 z-10 w-4 h-4 rounded-full border-2 ${s.dot}`} />

      {/* card */}
      <div className="pl-12">
        <PhaseCard p={p} s={s} />
      </div>
    </div>
  );
};

const PhaseCard: React.FC<{ p: Phase; s: (typeof statusStyles)[Phase['status']] }> = ({ p, s }) => (
  <div className="group rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-7 backdrop-blur transition-all duration-300 hover:border-emerald-400/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10">
    <div className="flex items-center gap-3">
      <div className="w-11 h-11 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
        <p.icon className="w-5 h-5 text-slate-950" />
      </div>
      <div>
        <p className="text-white font-semibold leading-tight">{p.tag}</p>
        <p className="text-slate-500 text-xs uppercase tracking-wide">{p.period}</p>
      </div>
    </div>

    <h3 className="mt-5 text-xl font-bold text-white tracking-tight">{p.title}</h3>
    <p className="mt-3 text-slate-400 text-sm leading-relaxed">{p.desc}</p>

    <div className="mt-5 flex">
      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${s.chip}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {s.label}
      </span>
    </div>
  </div>
);

// Desktop horizontal scroll-pin: the wrapper is tall (extra vertical scroll distance), its inner
// content sticks to the viewport, and the card track translates sideways in proportion to how
// far the user has scrolled through that tall wrapper -- scrolling down *reads* as scrolling
// sideways through the timeline, like paging a deck rather than passing a page.
const HorizontalTimeline: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>();

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const update = () => {
      raf.current = undefined;
      const rect = wrap.getBoundingClientRect();
      const scrollable = wrap.offsetHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      const maxTranslate = Math.max(0, track.scrollWidth - track.clientWidth);
      track.style.transform = `translate3d(-${progress * maxTranslate}px, 0, 0)`;
    };
    const onScroll = () => {
      if (raf.current === undefined) raf.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf.current !== undefined) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Wrapper height: one viewport of "dwell" plus room to travel the track's own width -- long
  // enough that the sideways pan doesn't feel rushed, short enough it doesn't overstay its scroll.
  return (
    <div ref={wrapRef} style={{ height: '260vh' }} className="relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="relative px-5 sm:px-8">
          <SpineLine />
        </div>
        <div
          ref={trackRef}
          className="flex gap-8 px-5 sm:px-8 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {phases.map((p) => {
            const s = statusStyles[p.status];
            return (
              <div key={p.title} className="w-[22rem] shrink-0">
                <PhaseCard p={p} s={s} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Evolution;

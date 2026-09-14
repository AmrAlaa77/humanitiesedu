import React, { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Instagram, Dribbble } from 'lucide-react';
import Vision2030Contribution from './Vision2030Contribution';
import Pledge from './Pledge';
import LivingMatrix from './LivingMatrix';
import { useInView } from '@/hooks/use-in-view';
import { useCountUp } from '@/hooks/use-count-up';

/**
 * Editorial dark-navy hero matching the reference design, made interactive:
 * a multi-layer mouse parallax (grid, glow, starfield, headline each drift
 * at a different depth), a magnetic CTA button, and a scroll-linked exit
 * fade — all driven by refs + requestAnimationFrame so nothing re-renders
 * React on every pointer/scroll event, keeping it smooth instead of laggy.
 */

const STARS = [
  { top: '14%', left: '34%', size: 3, delay: '0s', dur: '3.2s' },
  { top: '11%', left: '52%', size: 2, delay: '1.1s', dur: '4.1s' },
  { top: '22%', left: '19%', size: 4, delay: '0.4s', dur: '2.8s' },
  { top: '30%', left: '40%', size: 2, delay: '2.0s', dur: '3.6s' },
  { top: '46%', left: '13%', size: 3, delay: '0.8s', dur: '4.4s' },
  { top: '52%', left: '94%', size: 2, delay: '1.6s', dur: '3.0s' },
  { top: '60%', left: '24%', size: 4, delay: '0.2s', dur: '2.6s' },
  { top: '70%', left: '5%', size: 3, delay: '2.4s', dur: '4.0s' },
  { top: '78%', left: '36%', size: 2, delay: '1.3s', dur: '3.4s' },
  { top: '83%', left: '92%', size: 3, delay: '0.6s', dur: '3.8s' },
  { top: '88%', left: '20%', size: 4, delay: '1.9s', dur: '2.9s' },
  { top: '40%', left: '88%', size: 2, delay: '0.9s', dur: '4.2s' },
];

const NarrativeReel: React.FC<{ onCta: () => void }> = ({ onCta }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const mouse = useRef({ x: 0, y: 0 }); // normalized -1..1 from viewport center
  const eased = useRef({ x: 0, y: 0 });
  const scrollT = useRef(0); // 0..1 progress through the hero's own height
  const raf = useRef<number>();

  const yearsCount = useInView<HTMLSpanElement>({ once: false });
  const years = useCountUp(17, yearsCount.inView, 4500);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top; // distance from viewport top to this section
      const h = el.offsetHeight || 1;
      // t=0 when the section's top is at the viewport top, t=1 once scrolled a full section-height past it
      scrollT.current = Math.min(1, Math.max(0, -top / h));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = () => {
      eased.current.x += (mouse.current.x - eased.current.x) * 0.06;
      eased.current.y += (mouse.current.y - eased.current.y) * 0.06;
      const { x, y } = eased.current;

      if (gridRef.current) gridRef.current.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0)`;
      if (glowRef.current) glowRef.current.style.transform = `translate3d(calc(-50% + ${x * 34}px), ${y * 34}px, 0)`;
      if (starsRef.current) starsRef.current.style.transform = `translate3d(${x * 16}px, ${y * 16}px, 0)`;
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${x * 6}px, ${y * 6}px, 0)`;
      }

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Magnetic CTA: pulls toward the cursor within its own bounds, snaps back on leave.
  const onCtaMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ctaRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate3d(${relX * 0.25}px, ${relY * 0.35}px, 0)`;
  };
  const onCtaLeave = () => {
    if (ctaRef.current) ctaRef.current.style.transform = 'translate3d(0,0,0)';
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden text-white"
    >
      {/* No local background/vignette layer here -- this section now shares the same fixed
          AmbientBackground + TwinklingStarfield glow as every other section on the page, so there's
          no seam where this section's own background used to end and the next one began. */}

      {/* Subtle grid lines — drifts gently with the cursor */}
      <div
        ref={gridRef}
        className="pointer-events-none absolute -inset-4 opacity-[0.08] will-change-transform"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />
      {/* Faint emerald glow — deepest parallax layer */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -top-10 left-1/2 h-[40rem] w-[40rem] rounded-full bg-emerald-500/[0.04] blur-3xl will-change-transform"
        style={{ transform: 'translate3d(-50%, 0, 0)' }}
      />

      {/* Starfield — twinkling glitter that glows then darkens, drifts with the cursor */}
      <div ref={starsRef} className="pointer-events-none absolute inset-0 will-change-transform">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-emerald-200"
            style={{
              top: s.top,
              left: s.left,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animation: `twinkleGlow ${s.dur} ease-in-out ${s.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Twinkle keyframes: glow bright then darken */}
      <style>{`
        @keyframes twinkleGlow {
          0%, 100% {
            opacity: 0.15;
            transform: scale(0.8);
            box-shadow: 0 0 0px rgba(52,211,153,0);
          }
          50% {
            opacity: 1;
            transform: scale(1.35);
            box-shadow: 0 0 8px 2px rgba(52,211,153,0.85), 0 0 14px 4px rgba(110,231,183,0.45);
          }
        }
        .metrics-word { transition: text-shadow .3s ease, transform .3s ease; }
        .metrics-word:hover { text-shadow: 0 0 24px rgba(52,211,153,0.65); transform: translateY(-2px); }
      `}</style>

      {/* Top bar: wordmark + MISA badge */}
      <div className="absolute top-7 left-6 sm:left-10 z-30 flex items-center gap-5">
        <span className="font-serif text-2xl font-extrabold tracking-tight">
          HumanticDigital
        </span>
        <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="hidden sm:flex items-center gap-2 rounded-md border border-emerald-400/30 px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          MISA APPROVED
        </span>
      </div>

      {/* Section label + headline + CTA — drifts + fades with scroll, opposite the background layers for depth */}
      <div ref={contentRef} className="relative z-20 mx-auto max-w-6xl px-6 pt-48 sm:pt-56 will-change-transform">
        {/* Who We Are — sits on this same glowing/twinkling section, above the bio-vitality title */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Humantic Digital &middot; Riyadh
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-px w-6 bg-emerald-400/50" />
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-widest">Who We Are</span>
            </div>
            <h2 className="mt-4 font-serif text-2xl sm:text-4xl font-bold leading-tight tracking-tight text-white">
              <span ref={yearsCount.ref} className="tabular-nums">{years}</span> years in human capital
              <span className="block bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                made Humantic Digital what it is today.
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
              Led by <span className="font-semibold text-white">Dr. Abraham</span> &mdash; Medical
              Doctor, Entrepreneurial Investor, partner at the British College in Oxford, and Chair
              &amp; CEO of Humantic Digital, approved by the Ministry of Investment Saudi Arabia.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="font-serif text-base sm:text-lg font-semibold italic text-white/90">
              Where Biology, Behavioral Science and Business Collide.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
              We converge education, behavioural science and organisational-behaviour metrics into a
              single operating model &mdash; engineering safer, more human-centred institutions across
              how people live, work, and belong.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-300">
              We blend corporate business principles and insights with practical psychology (the science
              of the self) and physiology (the medical science of how the human body works), through
              proprietary intellectual property exclusively developed and owned by us.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                'Organizational Behavior & Team Dynamics Assessment',
                'Behavioral Risk & Productivity Metrics',
                'Global Alliances',
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
        </div>

        {/* Pledge + Vision 2030 Contribution, side by side — still on this same
            glowing/twinkling section, between Who We Are and the bio-vitality title */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-20">
          <Pledge />
          <Vision2030Contribution />
        </div>

        {/* Headline — sized to match the rest of the site's section headings */}
        <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight tracking-tight text-slate-100">
          Let&rsquo;s realign{' '}
          <span className="block sm:inline">bio&ndash;vitality with intelligent</span>{' '}
          <span className="metrics-word inline-block text-emerald-400">metrics.</span>
        </h1>

        {/* Subheading + CTA */}
        <div className="mt-10 max-w-xl pl-1">
          <p className="text-base sm:text-lg leading-relaxed text-slate-300">
            We help people read their body, shape their wellbeing, and connect
            with intelligent metrics.{' '}
            <span className="font-semibold text-white">
              Less guessing. More signal.
            </span>
          </p>
          <button
            ref={ctaRef}
            onClick={onCta}
            onMouseMove={onCtaMove}
            onMouseLeave={onCtaLeave}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 px-7 py-4 text-sm font-semibold text-slate-950 transition-transform duration-150 ease-out will-change-transform hover:opacity-90"
          >
            Get Your Behavioral Assessment
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Experience card — pushed higher, right after the bio-vitality title/CTA */}
        <a
          href="/experience"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-20 block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-8 sm:p-12 transition-all duration-700 ease-out hover:border-emerald-400/40"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-emerald-400 text-xs font-semibold uppercase tracking-[0.2em]">
                Human + Digital Intelligence
              </p>
              <h3 className="mt-3 text-2xl sm:text-4xl font-bold text-white tracking-tight max-w-xl">
                Digital intelligence. Deeply human.{' '}
                <span className="text-emerald-300">And data becomes capability.</span>
              </h3>
              <p className="mt-3 text-slate-400 max-w-lg leading-relaxed">
                Step inside the human engine &mdash; a luminous, living brain rendered in real time.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-6 py-3 text-sm font-semibold text-emerald-200 transition-transform duration-300 group-hover:translate-x-1">
              Enter the experience
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </a>

        {/* Living Matrix */}
        <div className="mt-20">
          <LivingMatrix />
        </div>

      </div>

      {/* Social links bottom-left */}
      <div className="absolute bottom-6 left-6 sm:left-10 z-30 flex items-center gap-5 text-slate-500">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-white"
          aria-label="Instagram"
        >
          <Instagram className="h-4 w-4" />
        </a>
        <a
          href="https://dribbble.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-white"
          aria-label="Dribbble"
        >
          <Dribbble className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
};

export default NarrativeReel;

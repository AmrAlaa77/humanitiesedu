import React, { useEffect, useRef } from 'react';
import { ArrowRight, Instagram, Dribbble } from 'lucide-react';

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
      const t = scrollT.current;

      if (gridRef.current) gridRef.current.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0)`;
      if (glowRef.current) glowRef.current.style.transform = `translate3d(calc(-50% + ${x * 34}px), ${y * 34}px, 0)`;
      if (starsRef.current) starsRef.current.style.transform = `translate3d(${x * 16}px, ${y * 16}px, 0)`;
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${x * 6}px, ${y * 6 - t * 60}px, 0)`;
        contentRef.current.style.opacity = `${1 - t * 1.1}`;
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
      {/* Background as a gradient layer (not a flat bg- class) so it fades to transparent at the
          very top and very bottom instead of cutting hard into the fixed AmbientBackground glow
          sitting behind every section -- that glow is what was showing through as a hairline-then-
          teal seam right where this opaque section ended and the next (transparent) one began. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, #020617 10%, #020617 90%, transparent 100%)' }}
      />

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

      {/* Top-right nav */}
      <nav className="absolute top-8 right-6 sm:right-10 z-30 hidden md:flex items-center gap-9 text-sm font-semibold tracking-[0.12em]">
        <a href="#top" className="text-white/90 transition hover:text-white">HOME</a>
        <a href="#platform" className="text-slate-400 transition hover:text-white">PLATFORM</a>
        <a href="#assessment" className="text-slate-400 transition hover:text-white">HEALTHCONSULTING</a>
      </nav>

      {/* Section label + headline + CTA — drifts + fades with scroll, opposite the background layers for depth */}
      <div ref={contentRef} className="relative z-20 mx-auto max-w-6xl px-6 pt-32 sm:pt-36 will-change-transform">
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
            Get Your Wellbeing Index
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
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

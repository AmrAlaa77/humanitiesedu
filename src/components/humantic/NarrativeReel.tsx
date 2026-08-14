import React from 'react';
import { ArrowRight, Instagram, Dribbble } from 'lucide-react';

/**
 * Editorial dark-navy hero matching the reference design:
 * a giant serif headline reading "Let's realign bio-vitality with
 * intelligent metrics." over a subtle grid + starfield background.
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
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#0a0e1a] text-white"
    >
      {/* Subtle grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />
      {/* Faint emerald glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Starfield — twinkling glitter that glows then darkens */}
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

      {/* Section label */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 pt-32 sm:pt-36">
        <div className="flex items-center gap-4 pl-1 sm:pl-[42%]">
          <span className="h-px w-10 bg-emerald-400" />
          <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-emerald-300">
            01 / REALIGNING BIO-VITALITY WITH INTELLIGENT METRICS
          </span>
        </div>

        {/* Giant editorial headline */}
        <h1 className="mt-8 font-serif text-6xl sm:text-8xl md:text-[8.5rem] font-bold leading-[0.92] tracking-tight text-slate-100">
          Let&rsquo;s realign{' '}
          <span className="block sm:inline">bio&ndash;vitality with intelligent</span>{' '}
          <span className="text-emerald-400">metrics.</span>
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
            onClick={onCta}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 px-7 py-4 text-sm font-semibold text-slate-950 transition hover:opacity-90"
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

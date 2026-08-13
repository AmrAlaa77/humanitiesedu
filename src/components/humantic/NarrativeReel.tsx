import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Instagram, Dribbble, Play, X } from 'lucide-react';

/**
 * The HUMAN reel: five plain, vivid-colored panels — Oil & Gas, Metal &
 * Mining, Healthcare, Tourism, then Graduates — each carrying a close-up
 * portrait video of a real person and revealing one letter of HUMAN. Idle
 * state loops the first portrait quietly behind a glowing seafoam-mint Play
 * control; pressing it launches the full reel, with a matching glowing
 * Close control to exit back to idle. The final panel zooms out.
 */

interface Panel {
  letter: string;
  label: string;
  sub: string;
  video: string;
  bg: string;
}

const PANELS: Panel[] = [
  {
    letter: 'H',
    label: 'Oil & Gas',
    sub: 'Where the wellhead taught us safety is never a slogan.',
    video: 'https://videos.pexels.com/video-files/8496455/8496455-hd_1920_1080_25fps.mp4',
    bg: 'linear-gradient(135deg,#7c2d12,#c2410c 45%,#f59e0b)',
  },
  {
    letter: 'U',
    label: 'Metal & Mining',
    sub: 'Heavy industry, high stakes — and the people who carry it.',
    video: 'https://videos.pexels.com/video-files/4772279/4772279-uhd_2560_1440_24fps.mp4',
    bg: 'linear-gradient(135deg,#78350f,#b45309 45%,#ea580c)',
  },
  {
    letter: 'M',
    label: 'Healthcare',
    sub: 'From bedside to boardroom, the same nervous system needs care.',
    video: 'https://videos.pexels.com/video-files/8111924/8111924-hd_1080_1920_30fps.mp4',
    bg: 'linear-gradient(135deg,#0c4a6e,#0369a1 45%,#38bdf8)',
  },
  {
    letter: 'A',
    label: 'Tourism',
    sub: 'Saudi Arabia, opening to the world — one human at a time.',
    video: 'https://videos.pexels.com/video-files/6245712/6245712-uhd_1440_2732_30fps.mp4',
    bg: 'linear-gradient(135deg,#7c2d12,#c2410c 45%,#fbbf24)',
  },
  {
    letter: 'N',
    label: 'Education',
    sub: 'And the graduates who carry all of it forward.',
    video: 'https://videos.pexels.com/video-files/11670491/11670491-hd_1920_1080_24fps.mp4',
    bg: 'linear-gradient(135deg,#134e4a,#0f766e 45%,#22d3ee)',
  },
];

const PANEL_MS = 5200;

/** Glow tuned to match GlowCursor's seafoam-mint palette. */
const glowShadow = (strength: number) =>
  `0 0 ${28 * strength}px ${8 * strength}px rgba(94,234,212,0.32), 0 0 ${56 * strength}px ${16 * strength}px rgba(110,231,209,0.16)`;

const Portrait: React.FC<{ src: string; zoomOut?: boolean }> = ({ src, zoomOut }) => (
  <div className="relative flex items-center justify-center">
    <div
      className="absolute rounded-full blur-3xl opacity-60"
      style={{ width: 420, height: 420, background: 'radial-gradient(circle, rgba(94,234,212,0.35), transparent 70%)' }}
    />
    <div
      key={src}
      className={`relative h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 overflow-hidden rounded-full border-4 border-white/20 shadow-2xl ${
        zoomOut ? 'animate-[portraitZoomOut_5.2s_ease-out_forwards]' : 'animate-[portraitZoomIn_5.2s_ease-out_forwards]'
      }`}
    >
      <video className="h-full w-full object-cover" src={src} autoPlay muted loop playsInline preload="auto" />
    </div>
  </div>
);

const NarrativeReel: React.FC<{ onCta: () => void }> = ({ onCta }) => {
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(0);
  const timer = useRef<number>();

  useEffect(() => {
    if (!playing) return;
    timer.current = window.setInterval(() => {
      setActive((i) => (i + 1) % PANELS.length);
    }, PANEL_MS);
    return () => window.clearInterval(timer.current);
  }, [playing]);

  const startReel = () => {
    setActive(0);
    setPlaying(true);
  };
  const closeReel = () => {
    setPlaying(false);
    setActive(0);
  };

  const isFinal = playing && active === PANELS.length - 1;
  const revealed = playing ? PANELS.slice(0, active + 1).map((p) => p.letter).join('') : '';
  const idlePanel = PANELS[0];
  const currentPanel = playing ? PANELS[active] : idlePanel;

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden text-white">
      {/* Plain vivid color background — swaps per sector */}
      <div className="absolute inset-0 transition-[background] duration-1000" style={{ background: currentPanel.bg }} />
      <div className="absolute inset-0 bg-black/25" />

      <style>{`
        @keyframes portraitZoomIn {
          0% { transform: scale(0.92); }
          100% { transform: scale(1.04); }
        }
        @keyframes portraitZoomOut {
          0% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes glowPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
      `}</style>

      {/* Top bar: wordmark + MISA badge */}
      <div className="absolute top-7 left-6 sm:left-10 z-30 flex items-center gap-5">
        <span className="font-serif text-2xl font-extrabold tracking-tight">HumanticDigital</span>
        <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
        <span className="hidden sm:flex items-center gap-2 rounded-md border border-cyan-200/40 px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-cyan-100">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
          MISA APPROVED
        </span>
      </div>

      {/* Top-right nav */}
      <nav className="absolute top-8 right-6 sm:right-10 z-30 hidden md:flex items-center gap-9 text-sm font-semibold tracking-[0.12em]">
        <a href="#top" className="text-white/90 transition hover:text-white">HOME</a>
        <a href="#platform" className="text-white/70 transition hover:text-white">PLATFORM</a>
        <a href="#assessment" className="text-white/70 transition hover:text-white">HEALTHCONSULTING</a>
      </nav>

      {/* Close control — only while the reel is playing */}
      {playing && (
        <button
          onClick={closeReel}
          aria-label="Close reel"
          className="absolute top-8 right-6 sm:right-10 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-teal-100/50 bg-white/10 backdrop-blur transition hover:bg-white/20 md:right-[calc(1.5rem+220px)]"
          style={{ boxShadow: glowShadow(1) }}
        >
          <X className="h-5 w-5 text-teal-50" />
        </button>
      )}

      {/* Sector progress dots — only while playing */}
      {playing && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {PANELS.map((p, i) => (
            <span
              key={p.letter}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? 'w-8 bg-white' : i < active ? 'w-4 bg-white/60' : 'w-4 bg-white/25'
              }`}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-20 mx-auto grid min-h-[100svh] max-w-6xl grid-cols-1 items-center gap-10 px-6 pt-24 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          {!playing ? (
            <>
              <div className="flex items-center gap-4 pl-1">
                <span className="h-px w-10 bg-white/70" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-white/90">
                  01 / REALIGNING BIO-VITALITY WITH INTELLIGENT METRICS
                </span>
              </div>

              <h1 className="mt-8 font-serif text-5xl sm:text-7xl md:text-[6.5rem] font-bold leading-[0.95] tracking-tight text-white">
                Let&rsquo;s realign bio&ndash;vitality with intelligent metrics.
              </h1>

              <div className="mt-8 max-w-xl pl-1">
                <p className="text-base sm:text-lg leading-relaxed text-white/85">
                  We help people read their body, shape their wellbeing, and connect with intelligent metrics.{' '}
                  <span className="font-semibold text-white">Less guessing. More signal.</span>
                </p>
              </div>

              {/* Glowing Play Reel control */}
              <div className="mt-10 flex items-center gap-5 pl-1">
                <button
                  onClick={startReel}
                  aria-label="Play reel"
                  className="group flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-teal-100/50 bg-white/10 backdrop-blur transition hover:bg-white/20"
                  style={{ boxShadow: glowShadow(1.4), animation: 'glowPulse 2.8s ease-in-out infinite' }}
                >
                  <Play className="h-7 w-7 translate-x-0.5 fill-teal-50 text-teal-50 transition group-hover:scale-110" />
                </button>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">Play the reel</p>
                  <p className="text-sm text-white/75">Oil &amp; Gas, Mining, Healthcare, Tourism, Graduates.</p>
                </div>
              </div>

              <div className="mt-8 max-w-xl pl-1">
                <button
                  onClick={onCta}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:opacity-90"
                >
                  Get Your Wellbeing Index
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4 pl-1">
                <span className="h-px w-10 bg-white/70" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-white/90">
                  {String(active + 1).padStart(2, '0')} / {PANELS[active].label.toUpperCase()}
                </span>
              </div>

              <h1 className="mt-6 font-serif font-bold leading-[0.85] tracking-tight text-white">
                <span className="block text-[5.5rem] sm:text-[8rem] md:text-[10rem]">
                  {revealed.split('').map((ch, idx) => (
                    <span key={idx} className={idx === revealed.length - 1 ? 'text-white' : 'text-white/70'}>
                      {ch}
                    </span>
                  ))}
                </span>
              </h1>

              <p className="mt-4 max-w-xl pl-1 text-base sm:text-lg leading-relaxed text-white/85">
                {PANELS[active].sub}
              </p>

              {isFinal && (
                <div className="mt-8 max-w-2xl pl-1">
                  <p className="font-serif text-2xl sm:text-4xl font-semibold leading-tight text-white">
                    We were there in all sectors.
                    <br />
                    Why? Because we hit humanity at its core.
                  </p>
                  <p className="mt-4 text-lg sm:text-xl font-medium text-white/90">
                    Human + Machine Intelligence. Why the wait?
                  </p>
                </div>
              )}

              <div className="mt-10 max-w-xl pl-1">
                <button
                  onClick={onCta}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 transition hover:opacity-90"
                >
                  Get Your Wellbeing Index
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Portrait — swaps per sector, zooms out on the final panel */}
        <div className="hidden lg:block">
          <Portrait src={currentPanel.video} zoomOut={isFinal} />
        </div>
      </div>

      {/* Mobile portrait (stacked) */}
      <div className="relative z-20 flex justify-center pb-16 lg:hidden">
        <Portrait src={currentPanel.video} zoomOut={isFinal} />
      </div>

      {/* Social links bottom-left */}
      <div className="absolute bottom-6 left-6 sm:left-10 z-30 hidden items-center gap-5 text-white/70 lg:flex">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-white" aria-label="Instagram">
          <Instagram className="h-4 w-4" />
        </a>
        <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-white" aria-label="Dribbble">
          <Dribbble className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
};

export default NarrativeReel;

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Instagram, Dribbble, Play, X } from 'lucide-react';

/**
 * The HUMAN reel: five full-bleed, real-video sector panels, each revealing
 * one letter of HUMAN as it plays — Oil & Gas, Metal & Mining, Healthcare,
 * Tourism, then Graduates, where the full word lands and the camera pulls
 * back. Idle state loops a quiet ambient clip behind a glowing Play control;
 * pressing it launches the full reel, with a matching glowing Close control
 * to exit back to idle.
 */

interface Panel {
  letter: string;
  label: string;
  sub: string;
  video: string;
}

const PANELS: Panel[] = [
  {
    letter: 'H',
    label: 'Oil & Gas',
    sub: 'Where the wellhead taught us safety is never a slogan.',
    video: 'https://videos.pexels.com/video-files/37151630/15738797_1920_1080_30fps.mp4',
  },
  {
    letter: 'U',
    label: 'Metal & Mining',
    sub: 'Heavy industry, high stakes — and the people who carry it.',
    video: 'https://videos.pexels.com/video-files/35357100/14980548_2560_1440_30fps.mp4',
  },
  {
    letter: 'M',
    label: 'Healthcare',
    sub: 'From bedside to boardroom, the same nervous system needs care.',
    video: 'https://videos.pexels.com/video-files/30141972/12925676_1920_1080_24fps.mp4',
  },
  {
    letter: 'A',
    label: 'Tourism',
    sub: 'Saudi Arabia, opening to the world — one human at a time.',
    video: 'https://videos.pexels.com/video-files/37734489/16005705_1080_1920_30fps.mp4',
  },
  {
    letter: 'N',
    label: 'Education',
    sub: 'And the graduates who carry all of it forward.',
    video: 'https://videos.pexels.com/video-files/7945128/7945128-hd_1920_1080_25fps.mp4',
  },
];

const PANEL_MS = 5200;

/** Glow tuned to match GlowCursor's seafoam-mint palette. */
const glowShadow = (strength: number) =>
  `0 0 ${28 * strength}px ${8 * strength}px rgba(94,234,212,0.32), 0 0 ${56 * strength}px ${16 * strength}px rgba(110,231,209,0.16)`;

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

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-[#0a0e1a] text-white">
      {/* Idle ambient loop */}
      {!playing && (
        <div className="absolute inset-0 z-0">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            src={idlePanel.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/70 to-[#05070d]/40" />
        </div>
      )}

      {/* Playing panels */}
      {playing &&
        PANELS.map((p, i) => (
          <div
            key={p.letter}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <video
              className={`absolute inset-0 h-full w-full object-cover ${
                i === active ? (i === PANELS.length - 1 ? 'animate-[zoomOut_5.2s_ease-out_forwards]' : 'animate-[kenBurns_5.2s_ease-out_forwards]') : ''
              }`}
              src={p.video}
              autoPlay={i === active}
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/55 to-[#05070d]/20" />
            <div className="absolute inset-0 bg-black/15" />
          </div>
        ))}

      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1.04); }
          100% { transform: scale(1.14); }
        }
        @keyframes zoomOut {
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

      {/* Close control — only while the reel is playing */}
      {playing && (
        <button
          onClick={closeReel}
          aria-label="Close reel"
          className="absolute top-8 right-6 sm:right-10 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-teal-300/40 bg-white/5 backdrop-blur transition hover:bg-white/10 md:right-[calc(1.5rem+220px)]"
          style={{ boxShadow: glowShadow(1) }}
        >
          <X className="h-5 w-5 text-teal-100" />
        </button>
      )}

      {/* Sector progress dots — only while playing */}
      {playing && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {PANELS.map((p, i) => (
            <span
              key={p.letter}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? 'w-8 bg-emerald-400' : i < active ? 'w-4 bg-emerald-400/50' : 'w-4 bg-white/20'
              }`}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pt-20">
        {!playing ? (
          <>
            <div className="flex items-center gap-4 pl-1">
              <span className="h-px w-10 bg-emerald-400" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-emerald-300">
                01 / REALIGNING BIO-VITALITY WITH INTELLIGENT METRICS
              </span>
            </div>

            <h1 className="mt-8 font-serif text-6xl sm:text-8xl md:text-[8.5rem] font-bold leading-[0.92] tracking-tight text-slate-100">
              Let&rsquo;s realign{' '}
              <span className="block sm:inline">bio&ndash;vitality with intelligent</span>{' '}
              <span className="text-emerald-400">metrics.</span>
            </h1>

            <div className="mt-8 max-w-xl pl-1">
              <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                We help people read their body, shape their wellbeing, and connect with intelligent metrics.{' '}
                <span className="font-semibold text-white">Less guessing. More signal.</span>
              </p>
            </div>

            {/* Glowing Play Reel control */}
            <div className="mt-10 flex items-center gap-5 pl-1">
              <button
                onClick={startReel}
                aria-label="Play reel"
                className="group flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-teal-300/40 bg-white/5 backdrop-blur transition hover:bg-white/10"
                style={{ boxShadow: glowShadow(1.4), animation: 'glowPulse 2.8s ease-in-out infinite' }}
              >
                <Play className="h-7 w-7 translate-x-0.5 fill-teal-100 text-teal-100 transition group-hover:scale-110" />
              </button>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">Play the reel</p>
                <p className="text-sm text-slate-400">Oil &amp; Gas, Mining, Healthcare, Tourism, Graduates.</p>
              </div>
            </div>

            <div className="mt-8 max-w-xl pl-1">
              <button
                onClick={onCta}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 px-7 py-4 text-sm font-semibold text-slate-950 transition hover:opacity-90"
              >
                Get Your Wellbeing Index
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4 pl-1">
              <span className="h-px w-10 bg-emerald-400" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-emerald-300">
                {String(active + 1).padStart(2, '0')} / {PANELS[active].label.toUpperCase()}
              </span>
            </div>

            <h1 className="mt-6 font-serif font-bold leading-[0.85] tracking-tight text-slate-100">
              <span className="block text-[5.5rem] sm:text-[8rem] md:text-[10rem]">
                {revealed.split('').map((ch, idx) => (
                  <span key={idx} className={idx === revealed.length - 1 ? 'text-emerald-400' : 'text-slate-100'}>
                    {ch}
                  </span>
                ))}
              </span>
            </h1>

            <p className="mt-4 max-w-xl pl-1 text-base sm:text-lg leading-relaxed text-slate-300">
              {PANELS[active].sub}
            </p>

            {isFinal && (
              <div className="mt-8 max-w-2xl pl-1">
                <p className="font-serif text-2xl sm:text-4xl font-semibold leading-tight text-white">
                  We were there in all sectors.
                  <br />
                  Why? <span className="text-emerald-400">Because we hit humanity at its core.</span>
                </p>
                <p className="mt-4 text-lg sm:text-xl font-medium text-slate-200">
                  Human + Machine Intelligence. <span className="text-cyan-300">Why the wait?</span>
                </p>
              </div>
            )}

            <div className="mt-10 max-w-xl pl-1">
              <button
                onClick={onCta}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 px-7 py-4 text-sm font-semibold text-slate-950 transition hover:opacity-90"
              >
                Get Your Wellbeing Index
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Social links bottom-left */}
      <div className="absolute bottom-6 left-6 sm:left-10 z-30 flex items-center gap-5 text-slate-500">
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

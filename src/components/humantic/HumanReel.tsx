import React, { useEffect, useRef, useState } from 'react';

/**
 * HUMAN — editorial video-reel hero.
 *
 * A pitch-black, high-contrast frame: fixed metadata badges in each
 * corner, a live London clock, a scroll marquee, a staggered word-by-word
 * intro line, and the centerpiece — the word "HUMAN" rendered as an SVG
 * luminance mask so the five-clip video reel is visible only *inside* the
 * letterforms (not a separate framed video with text on top). Hovering
 * the word hides the cursor and shows a custom spring-follow "Explore"
 * bubble. No framer-motion dependency (can't install packages in this
 * environment) — motion is hand-rolled with the same ref+rAF technique
 * used elsewhere in this codebase.
 */

interface Clip {
  label: string;
  video: string;
}

const CLIPS: Clip[] = [
  { label: 'Elder', video: 'https://videos.pexels.com/video-files/5516426/5516426-uhd_2560_1440_30fps.mp4' },
  { label: 'Doctor', video: 'https://videos.pexels.com/video-files/5453687/5453687-uhd_1440_2560_25fps.mp4' },
  { label: 'Researcher', video: 'https://videos.pexels.com/video-files/4121322/4121322-uhd_2560_1440_25fps.mp4' },
  { label: 'IT Developer', video: 'https://videos.pexels.com/video-files/6330779/6330779-hd_1920_1080_30fps.mp4' },
  { label: 'Swimmer', video: 'https://videos.pexels.com/video-files/9617126/9617126-uhd_1440_2732_25fps.mp4' },
  { label: 'Young Boy', video: 'https://videos.pexels.com/video-files/7207587/7207587-uhd_2732_1440_25fps.mp4' },
  { label: 'Diverse Group', video: 'https://videos.pexels.com/video-files/5944868/5944868-uhd_2560_1440_25fps.mp4' },
  { label: 'Graduate', video: 'https://videos.pexels.com/video-files/7712316/7712316-hd_1080_1920_30fps.mp4' },
];

const CLIP_MS = 1400;
const FADE_MS = 320;

const HEADLINE_WORDS = 'We shape brand identities and build digital experiences that connect.'.split(' ');

const LondonClock: React.FC = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-white/70">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      LONDON {time || '--:--:--'} UTC
    </span>
  );
};

const HumanReel: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1 % CLIPS.length);
  const [transitioning, setTransitioning] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false); // true while the reel is expanded full-page
  const [expanded, setExpanded] = useState(false); // drives the zoom-out/zoom-back clip-path transition

  const openReel = () => {
    setPlaying(true);
    // two rAFs so the browser paints the tiny starting clip-path before we animate it open
    requestAnimationFrame(() => requestAnimationFrame(() => setExpanded(true)));
  };
  const closeReel = () => {
    setExpanded(false);
    window.setTimeout(() => setPlaying(false), 700);
  };

  // Word-by-word intro reveal + word-mask entrance, on mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Clip cycle: hold, then a TRUE crossfade — current fades out while next fades in
  // at the same time, so the word is never fully blank between clips.
  useEffect(() => {
    const startFade = setTimeout(() => setTransitioning(true), CLIP_MS - FADE_MS);
    const finishFade = setTimeout(() => {
      setCurrent((c) => {
        const nextCurrent = (c + 1) % CLIPS.length;
        setNext((nextCurrent + 1) % CLIPS.length); // always locked to current+1, never drifts
        return nextCurrent;
      });
      setTransitioning(false);
    }, CLIP_MS);
    return () => {
      clearTimeout(startFade);
      clearTimeout(finishFade);
    };
  }, [current]);

  // Custom floating cursor: spring-lerp follow, while hovering the masked word or while the reel is playing full-page
  useEffect(() => {
    if (!hovering && !playing) return;
    let target = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };
    let id: number;

    const move = (e: PointerEvent) => {
      target = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('pointermove', move, { passive: true });

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.45;
      pos.y += (target.y - pos.y) * 0.45;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(id);
    };
  }, [hovering, playing]);

  const renderClipStack = () =>
    CLIPS.map((clip, i) => {
      let opacity = 0;
      if (i === current) opacity = transitioning ? 0 : 1;
      else if (i === next) opacity = transitioning ? 1 : 0;
      return (
        <video
          key={clip.label}
          className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
          style={{
            opacity,
            transitionDuration: `${FADE_MS}ms`,
          }}
          src={clip.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      );
    });

  return (
    <section id="top" className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden border-x border-t border-[#1C1C1C] bg-[#0D0D0D] text-white">
      {/* Top-left: brand + counter */}
      <div className="absolute top-6 left-6 sm:left-10 z-30 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
        HUMAN <span className="text-white/40">®</span> / 01
      </div>

      {/* Top-right: live London clock */}
      <div className="absolute top-6 right-6 sm:right-10 z-30">
        <LondonClock />
      </div>

      {/* Bottom-left: location */}
      <div className="absolute bottom-6 left-6 sm:left-10 z-30 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
        LONDON — EST. 2026
      </div>

      {/* Bottom-right: scroll marquee */}
      <div className="absolute bottom-6 right-6 sm:right-10 z-30 w-40 overflow-hidden sm:w-56">
        <div className="flex whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-white/50" style={{ animation: 'humanMarquee 9s linear infinite' }}>
          <span className="pr-8">SCROLL TO EXPLORE →</span>
          <span className="pr-8">SCROLL TO EXPLORE →</span>
          <span className="pr-8">SCROLL TO EXPLORE →</span>
        </div>
      </div>

      <style>{`
        @keyframes humanMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes faceZoomTurn {
          0%   { transform: scale(1)    rotate(0deg); }
          35%  { transform: scale(1.32) rotate(-2.5deg); }
          70%  { transform: scale(1.1)  rotate(2deg); }
          100% { transform: scale(1)    rotate(0deg); }
        }
      `}</style>

      {/* SVG mask definition: white text = visible (video shows through), black = hidden */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <mask id="humanTextMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1400" height="480">
            <rect x="0" y="0" width="1400" height="480" fill="black" />
            <text
              x="700"
              y="240"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Syne, sans-serif"
              fontWeight="800"
              fontSize="200"
              letterSpacing="-4"
              fill="white"
            >
              HUMAN
            </text>
          </mask>
        </defs>
      </svg>

      {/* Intro line — staggered word-by-word reveal */}
      <div className="relative z-20 mx-auto mt-28 max-w-md px-6 text-center sm:mt-32">
        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
          {HEADLINE_WORDS.map((word, i) => (
            <span
              key={i}
              className="mr-[0.28em] inline-block"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(0.5em)',
                transition: `opacity .5s ease ${i * 0.04}s, transform .5s ease ${i * 0.04}s`,
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* The word HUMAN — video visible only inside the letterforms */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-2">
        <div
          onMouseEnter={() => !playing && setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={openReel}
          className="relative w-[92vw] max-w-[1600px] overflow-hidden"
          style={{
            aspectRatio: '1400 / 480',
            cursor: 'none',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'scale(1)' : 'scale(0.94)',
            transition: 'opacity .9s ease .2s, transform .9s ease .2s',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage: 'url(#humanTextMask)',
              maskImage: 'url(#humanTextMask)',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          >
            {renderClipStack()}
          </div>
        </div>
      </div>

      <div className="h-16 sm:h-20" />

      {/* Gradient blend into the next page's background instead of a hard cut */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent via-[#0a0e1a]/80 to-[#0a0e1a]" />

      {/* Full-page reel: zooms out from behind the word to cover the whole page, and back */}
      {playing && (
        <div
          onClick={closeReel}
          className="fixed inset-0 z-[60] overflow-hidden bg-black"
          style={{
            cursor: 'none',
            clipPath: expanded ? 'inset(0px round 0px)' : 'inset(42% round 260px)',
            transition: 'clip-path 700ms cubic-bezier(0.65,0,0.35,1)',
          }}
        >
          {renderClipStack()}
          <div className="pointer-events-none absolute inset-0 bg-black/25" />
        </div>
      )}

      {/* custom floating cursor: "Play Reel" over the word, "Close" while the reel is full-page */}
      {(hovering || playing) && (
        <div
          ref={cursorRef}
          className="pointer-events-none fixed top-0 left-0 z-[70] flex h-24 w-24 items-center justify-center rounded-full bg-black font-sans text-[11px] font-bold uppercase tracking-widest text-white"
        >
          {playing ? 'Close' : 'Play Reel'}
        </div>
      )}
    </section>
  );
};

export default HumanReel;

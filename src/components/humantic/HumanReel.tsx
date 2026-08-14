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
  { label: 'Doctor', video: 'https://videos.pexels.com/video-files/5722215/5722215-uhd_2732_1440_25fps.mp4' },
  { label: 'Metal Miner', video: 'https://videos.pexels.com/video-files/6474370/6474370-uhd_2560_1440_25fps.mp4' },
  { label: 'Tourist Guide', video: 'https://videos.pexels.com/video-files/9142461/9142461-uhd_1440_2560_30fps.mp4' },
  { label: 'Graduating Student', video: 'https://videos.pexels.com/video-files/7945902/7945902-hd_1080_1920_25fps.mp4' },
  { label: 'Girl with Butterflies', video: 'https://videos.pexels.com/video-files/9797821/9797821-uhd_2732_1440_25fps.mp4' },
];

const CLIP_MS = 2500;
const FADE_MS = 500;

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

  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Word-by-word intro reveal + word-mask entrance, on mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Clip cycle: hold, crossfade, advance
  useEffect(() => {
    const hold = setTimeout(() => setFading(true), CLIP_MS - FADE_MS);
    const advance = setTimeout(() => {
      setActive((i) => (i + 1) % CLIPS.length);
      setFading(false);
    }, CLIP_MS);
    return () => {
      clearTimeout(hold);
      clearTimeout(advance);
    };
  }, [active]);

  // Custom floating cursor: spring-lerp follow, only while hovering the masked word
  useEffect(() => {
    if (!hovering) return;
    let target = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };
    let id: number;

    const move = (e: PointerEvent) => {
      target = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('pointermove', move, { passive: true });

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.22;
      pos.y += (target.y - pos.y) * 0.22;
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
  }, [hovering]);

  return (
    <section id="top" className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden border border-[#1C1C1C] bg-[#0D0D0D] text-white">
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
      `}</style>

      {/* SVG mask definition: white text = visible (video shows through), black = hidden */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <mask id="humanTextMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="1200">
            <rect x="0" y="0" width="1200" height="1200" fill="black" />
            <text
              x="600"
              y="600"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Syne, sans-serif"
              fontWeight="800"
              fontSize="248"
              letterSpacing="-6"
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
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className="relative overflow-hidden"
          style={{
            width: 'min(94vw, 62vh)',
            aspectRatio: '1200 / 1200',
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
            {CLIPS.map((clip, i) => (
              <video
                key={clip.label}
                className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
                style={{
                  opacity: i === active ? (fading ? 0 : 1) : 0,
                  transitionDuration: `${FADE_MS}ms`,
                }}
                src={clip.video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            ))}
          </div>

          {/* custom floating cursor */}
          {hovering && (
            <div
              ref={cursorRef}
              className="pointer-events-none absolute top-0 left-0 z-30 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 font-mono text-[11px] font-semibold uppercase tracking-widest text-white backdrop-blur-md"
            >
              Explore
            </div>
          )}
        </div>
      </div>

      <div className="h-16 sm:h-20" />
    </section>
  );
};

export default HumanReel;

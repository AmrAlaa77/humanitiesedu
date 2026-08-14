import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * HUMAN — editorial video-reel hero.
 *
 * A pitch-black, high-contrast frame: fixed metadata badges in each
 * corner, a centered 16:9 video reel that crossfades through five
 * subjects, a custom floating cursor while hovering the reel, and a
 * staggered word-by-word headline reveal. The reel's width/radius morphs
 * on scroll (80% rounded -> 100% square) via refs + rAF, not React state,
 * so it stays smooth. No framer-motion dependency — this project can't
 * install new packages in this environment, so the spring/scroll motion
 * is hand-rolled with the same lerp technique already used elsewhere.
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
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>();

  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [hoveringReel, setHoveringReel] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Word-by-word headline reveal on mount
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

  // Scroll-linked frame morph: 80% rounded -> 100% square, driven by refs (no re-render)
  useEffect(() => {
    const tick = () => {
      const sec = sectionRef.current;
      const frame = frameRef.current;
      if (sec && frame) {
        const rect = sec.getBoundingClientRect();
        const total = sec.offsetHeight - window.innerHeight;
        const t = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        const width = 80 + t * 20; // 80% -> 100%
        const radius = 24 * (1 - t); // 1.5rem -> 0
        frame.style.width = `${width}%`;
        frame.style.borderRadius = `${radius}px`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Custom floating cursor: spring-lerp follow, only rendered while hovering the reel
  useEffect(() => {
    if (!hoveringReel) return;
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
  }, [hoveringReel]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative w-full bg-[#0D0D0D] text-white"
      style={{ minHeight: '160vh' }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full flex-col justify-between overflow-hidden border border-[#1C1C1C]">
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
          @keyframes humanWordUp {
            from { opacity: 0; transform: translateY(0.6em); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Centered 16:9 video reel */}
        <div className="relative flex flex-1 items-center justify-center px-4">
          <div
            ref={frameRef}
            onMouseEnter={() => setHoveringReel(true)}
            onMouseLeave={() => setHoveringReel(false)}
            className="relative aspect-video overflow-hidden bg-[#141414] shadow-2xl"
            style={{ width: '80%', borderRadius: 24, cursor: 'none' }}
          >
            {CLIPS.map((clip, i) => (
              <div
                key={clip.label}
                className="absolute inset-0 flex items-center justify-center bg-[#141414] transition-opacity ease-in-out"
                style={{
                  opacity: i === active ? (fading ? 0 : 1) : 0,
                  transitionDuration: `${FADE_MS}ms`,
                  zIndex: i === active ? 2 : 1,
                }}
              >
                <video
                  className="h-full w-full object-cover opacity-90"
                  src={clip.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
              </div>
            ))}

            {/* vignette for legibility */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

            {/* headline overlay */}
            <div className="pointer-events-none absolute inset-0 z-20 flex items-end p-6 sm:p-12">
              <h1 className="font-display max-w-2xl text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl">
                {HEADLINE_WORDS.map((word, i) => (
                  <span
                    key={i}
                    className="mr-[0.28em] inline-block"
                    style={{
                      opacity: loaded ? 1 : 0,
                      transform: loaded ? 'translateY(0)' : 'translateY(0.6em)',
                      transition: `opacity .6s ease ${i * 0.05}s, transform .6s ease ${i * 0.05}s`,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
            </div>

            {/* custom floating cursor */}
            {hoveringReel && (
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
      </div>
    </section>
  );
};

export default HumanReel;

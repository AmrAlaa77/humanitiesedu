import React, { useEffect, useRef, useState } from 'react';

/**
 * HUMAN — editorial video-reel hero.
 *
 * A pitch-black, high-contrast frame: fixed metadata badges in each
 * corner, a live London clock, a scroll marquee, a staggered word-by-word
 * intro line, and the centerpiece — the word "HUMAN" rendered as an SVG
 * luminance mask so the client's own brand video is visible only *inside*
 * the letterforms (not a separate framed video with text on top). Hovering
 * the word hides the cursor and shows a custom spring-follow "Explore"
 * bubble. No framer-motion dependency (can't install packages in this
 * environment) — motion is hand-rolled with the same ref+rAF technique
 * used elsewhere in this codebase.
 */

// The user's own original video, replacing the earlier stock-clip crossfade reel.
const HUMAN_VIDEO = '/videos/human-hero.mp4';

const HEADLINE_MAIN =
  "Digital and deeply human: we forge neuroscience, medicine, and behavioral science into preventative medicine and awareness for all — a wearable that catches what's shifting before your body has to say it.";
const HEADLINE_WORDS = HEADLINE_MAIN.split(' ');
const HEADLINE_TAGLINE_1 = 'Health and wellbeing for all.';
const HEADLINE_TAGLINE_2 = 'Hope, preached through science.';

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

  // On-screen text in the source video starts around 00:10.69, but earlier
  // cutoffs still let a frame or two flash before looping -- pulled back
  // further to 00:09.67 for a clean margin. The background masked loop must
  // never reach it, looping back to 0 just before this point instead of
  // relying on the file's natural end.
  const TEXT_START = 9.67;

  // withAudio=false is the masked background loop: scaled up slightly so its edges bleed past the
  // mask's letter strokes on every side. Whatever is producing the thin line at the top/bottom edge --
  // baked into the source frame, or a compositing seam from the CSS mask itself -- this pushes it
  // outside the visible letterform area instead of trying to paint over it after the fact.
  const renderVideo = (withAudio = false) => (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      style={{
        objectPosition: 'center center',
        transform: withAudio ? undefined : 'scale(1.08)',
      }}
      src={HUMAN_VIDEO}
      autoPlay
      muted={!withAudio}
      loop={withAudio}
      playsInline
      preload="auto"
      onTimeUpdate={
        withAudio
          ? undefined
          : (e) => {
              if (e.currentTarget.currentTime >= TEXT_START) {
                e.currentTarget.currentTime = 0;
              }
            }
      }
    />
  );

  return (
    <section id="top" className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#0D0D0D] text-white">
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
              fontFamily="Anton, sans-serif"
              fontWeight="400"
              fontSize="420"
              letterSpacing="-6"
              fill="white"
            >
              HUMAN
            </text>
          </mask>
        </defs>
      </svg>

      {/* Intro line — staggered word-by-word reveal, closing on a bolded standalone tagline */}
      <div className="relative z-20 mx-auto mt-28 max-w-4xl px-6 text-center sm:mt-32">
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
        <p
          className="mt-3 text-sm font-semibold text-white sm:text-base whitespace-nowrap"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(0.5em)',
            transition: `opacity .5s ease ${HEADLINE_WORDS.length * 0.04 + 0.15}s, transform .5s ease ${HEADLINE_WORDS.length * 0.04 + 0.15}s`,
          }}
        >
          {HEADLINE_TAGLINE_1} {HEADLINE_TAGLINE_2}
        </p>
      </div>

      {/* Seam cover: the thin line reported here sits wider than the masked video box itself and
          didn't move when the video was rescaled, so it isn't the video -- it's a hairline rendering
          seam Chrome draws at the boundary between this flex row and the one above it (a known
          artifact where adjacent elements land on separate GPU compositing layers). A solid full-width
          bar in the same seam position, in normal document flow, papers over it regardless of cause. */}
      <div className="pointer-events-none relative z-20 -mx-[2px] h-10 w-[calc(100%+4px)] bg-[#0D0D0D]" />

      {/* The word HUMAN — video visible only inside the letterforms */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-2">
        <div
          onMouseEnter={() => !playing && setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={openReel}
          className="overflow-hidden"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 'min(calc(100vw - 1.5cm), calc((100vh - 1.5cm) * 1400 / 480))',
            aspectRatio: '1400 / 480',
            cursor: 'none',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(-50%) translateX(-5%) scale(1)' : 'translateY(-50%) translateX(-5%) scale(0.94)',
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
            {renderVideo()}
          </div>
          {/* Feathered cover fades: hide thin line artifacts baked into the video near the top/bottom
              edges. A soft gradient (rather than a hard-edge bar) covers a deeper band without visibly
              chopping the letter tops/bottoms, in case the line sits a few px inside the true edge. */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-6"
            style={{ background: 'linear-gradient(to bottom, #0D0D0D 0%, #0D0D0D 35%, transparent 100%)' }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-6"
            style={{ background: 'linear-gradient(to top, #0D0D0D 0%, #0D0D0D 35%, transparent 100%)' }}
          />
          {/* Same seam confirmed live on the left/right edges too (DOM-inspected on the deployed site --
              no bordered element sits there, so it's this same compositing seam, just on the other axis). */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-6"
            style={{ background: 'linear-gradient(to right, #0D0D0D 0%, #0D0D0D 35%, transparent 100%)' }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-6"
            style={{ background: 'linear-gradient(to left, #0D0D0D 0%, #0D0D0D 35%, transparent 100%)' }}
          />
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
          {renderVideo(true)}
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

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
  const sectionRef = useRef<HTMLElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

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
  // further to 00:09.67 for a clean margin. The background masked video must
  // never scrub past it.
  const TEXT_START = 9.67;

  // Scroll-scrubbed playback for the masked background video: instead of autoplaying/looping on
  // its own clock, its currentTime is driven directly by scroll progress through this section (0 at
  // the section's top, TEXT_START once scrolled a full section-height past it) -- scrolling IS the
  // playback control. Playback behavior only; the section's own layout/positioning is untouched.
  useEffect(() => {
    const video = bgVideoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    let ready = false;
    const onLoaded = () => { ready = true; };
    video.addEventListener('loadedmetadata', onLoaded);
    video.pause();

    let raf = 0;
    const update = () => {
      raf = 0;
      if (!ready) return;
      const top = section.getBoundingClientRect().top;
      const height = section.offsetHeight || 1;
      const t = Math.min(1, Math.max(0, -top / height));
      video.currentTime = t * TEXT_START;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded);
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Full-page "Play Reel" video only (with audio, on click) -- plays and loops normally on its own
  // clock, unlike the scroll-scrubbed background video above.
  const renderVideo = (withAudio = true) => (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: 'center center' }}
      src={HUMAN_VIDEO}
      autoPlay
      muted={!withAudio}
      loop
      playsInline
      preload="auto"
    />
  );

  return (
    <section ref={sectionRef} id="top" className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#0D0D0D] text-white">
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
              fontSize="470"
              letterSpacing="-8"
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
                // Opacity-only: a translateY per span (dozens of them) forced each word onto its
                // own GPU compositing layer, which is what was producing the hairline seam right
                // below this line -- every cover-bar we added just became a new layer boundary in
                // turn. Dropping the transform removes the layer promotion at the source.
                opacity: loaded ? 1 : 0,
                transition: `opacity .5s ease ${i * 0.04}s`,
              }}
            >
              {word}
            </span>
          ))}
        </p>
        {/* Same seam artifact, this time between these two paragraphs. Both the left/right-based
            and the Tailwind-arbitrary-value margin-based versions of this cover measured 0px wide
            live (confirmed via getBoundingClientRect) -- the calc() in `ml-[calc(50%-50vw)]` may
            never have compiled into real CSS at all. Raw inline style bypasses Tailwind's
            arbitrary-value generation entirely, so there's no build-step ambiguity left. */}
        <div
          aria-hidden
          style={{
            pointerEvents: 'none',
            display: 'block',
            width: '100vw',
            marginLeft: 'calc(50% - 50vw)',
            marginRight: 'calc(50% - 50vw)',
            marginTop: '-4px',
            height: '10mm',
            backgroundColor: '#0D0D0D',
            position: 'relative',
            zIndex: 20,
          }}
        />
        <p
          className="mt-3 text-sm font-semibold text-white sm:text-base whitespace-nowrap"
          style={{
            opacity: loaded ? 1 : 0,
            transition: `opacity .5s ease ${HEADLINE_WORDS.length * 0.04 + 0.15}s`,
          }}
        >
          {HEADLINE_TAGLINE_1} {HEADLINE_TAGLINE_2}
        </p>
      </div>

      {/* Seam cover between this flex row and the one above it, directly under the tagline.
          Plain inline style, not Tailwind arbitrary values -- every Tailwind-class-based version
          of this bar measured 0-4px wide in production despite looking correct in source, so
          this uses raw CSS with no build-time class generation or flex-item width resolution
          involved: width:100% on a block-level div is unambiguous and doesn't depend on any of
          the mechanisms that kept failing. */}
      <div
        aria-hidden
        style={{
          pointerEvents: 'none',
          display: 'block',
          width: '100%',
          height: '10mm',
          backgroundColor: '#0D0D0D',
          position: 'relative',
          zIndex: 20,
        }}
      />

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
            // Bounded by both dimensions so it can never blow out the section's height on a tall,
            // narrow window. The gap seen at the edges wasn't this box being too small -- it's the
            // SVG text's own margin inside its 1400x480 canvas, fixed below by shrinking that margin
            // (larger font-size / tighter letter-spacing) rather than by growing this box further.
            width: 'min(calc((100vw - 0.4cm) * 1.1), calc((100vh - 0.4cm) * 1400 / 480))',
            aspectRatio: '1400 / 480',
            cursor: 'none',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(-50%) scale(1)' : 'translateY(-50%) scale(0.94)',
            transition: 'opacity .9s ease .2s, transform .9s ease .2s',
            isolation: 'isolate',
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
              // Researched fix for a documented Chromium bug: mask-image compositing can leak a
              // hairline of whatever sits behind it through at paint time (sub-pixel rounding gets
              // floored). isolation:isolate forces this into its own stacking context and
              // translateZ(0) forces clean GPU-layer compositing, which is the standard workaround
              // rather than painting cover bars over the symptom after the fact.
              isolation: 'isolate',
              transform: 'translateZ(0)',
            }}
          >
            <video
              ref={bgVideoRef}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: 'center center', transform: 'scale(1.08)' }}
              src={HUMAN_VIDEO}
              muted
              playsInline
              preload="auto"
            />
          </div>
          {/* Feathered cover fades: CONFIRMED by the user zooming in on the live site that the top
              line is genuinely baked into the source video frame (not a CSS/compositing artifact --
              every DOM-boundary theory was wrong). Can't re-encode the video in this environment (no
              ffmpeg/python available), so the fix is masking deeper into the frame with a percentage
              height (scales with the box, unlike a fixed px cover that becomes proportionally tiny
              on large screens) -- pushed well past where that artifact sits. */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0"
            style={{ height: '9%', background: 'linear-gradient(to bottom, #0D0D0D 0%, #0D0D0D 55%, transparent 100%)' }}
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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950" />

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

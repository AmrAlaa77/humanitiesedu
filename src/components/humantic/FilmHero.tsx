import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * FilmHero -- full-bleed hero reel with the "Decode" text treatment.
 *
 * The video is the user's own reel (robot face opening into a human face), trimmed to the 10.8s of
 * footage (the baked-in end titles were cut, the text lives on the page instead), colour-graded to
 * the brand teal and compressed: /videos/hero-reel.mp4 (1080p) and hero-reel-mobile.mp4 (720p).
 *
 * Text is timed to the film on its first play: the eyebrow types out, then the headline scrambles
 * from machine glyphs into words while the robot becomes human, then the sub-line and buttons land.
 * After the first play the text stays put and the video keeps looping underneath.
 *
 * Desktop: video covers the whole first screen, copy sits bottom-left over a soft dark gradient.
 * Mobile: video shows as a full 16:9 band (a tall crop cut off the robot's eyes), copy underneath.
 *
 * The previous hero (HumanReel, the HUMANTIC letters mask) is kept in the codebase -- swap it back
 * in AppLayout.tsx if needed.
 */

const FILM_FULL = '/videos/human-hero.mp4'; // original reel with sound, for "Watch the film"

const EYEBROW = 'Human + Machine Intelligence';
const HEAD_PLAIN = 'We are Humantic Digital';
const GLYPHS = 'ABCDEFGHKMNPRSTUVXZ0123456789';

// Timeline (seconds of the film)
// Text waits for the human face (~5s in) so nothing sits over the robot reveal.
const T_EYE_START = 4.6;
const T_EYE_DUR = 1.2;
const T_HEAD_START = 5.4; // first letter settles here
const T_STAGGER = 0.05; // each next letter settles this much later
const T_FLICKER = 0.35; // how long a letter flickers before settling
const T_SCRIM = 4.8;
const T_SUB = 7.2;
const T_CTA = 7.7;
const DONE = 99;



const FilmHero: React.FC<{ onCta: () => void }> = ({ onCta }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const doneRef = useRef(false);
  const [t, setT] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(max-width: 767px)').matches
  );
  const [filmOpen, setFilmOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  // Start the film once the on-load intro doors have opened, so the robot reveal isn't hidden
  // behind them. Reduced motion: no autoplay, show the final text over the still frame.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      doneRef.current = true;
      setT(DONE);
      return;
    }
    const start = () => {
      try {
        v.currentTime = 0;
      } catch {
        /* not seekable yet -- fine */
      }
      v.play().catch(() => {
        // Autoplay refused (e.g. low-power mode): show the finished text over the poster.
        doneRef.current = true;
        setT(DONE);
      });
    };
    const w = window as unknown as { __humanticIntroActive?: boolean };
    if (w.__humanticIntroActive) {
      const onDone = () => start();
      window.addEventListener('humantic-intro-done', onDone, { once: true });
      const fallback = window.setTimeout(start, 5000);
      return () => {
        window.removeEventListener('humantic-intro-done', onDone);
        clearTimeout(fallback);
      };
    }
    start();
  }, [isMobile]);

  // Drive the text from the film's own clock on its first play.
  useEffect(() => {
    let id = 0;
    const tick = () => {
      const v = videoRef.current;
      if (doneRef.current) {
        setT(DONE);
        return;
      }
      if (v) setT(v.currentTime);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const onEnded = () => {
    doneRef.current = true;
    setT(DONE);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };

  // Pause the background loop while the full film is open.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (filmOpen) v.pause();
    else if (doneRef.current) v.play().catch(() => {});
  }, [filmOpen]);

  const eyeP = Math.min(1, Math.max(0, (t - T_EYE_START) / T_EYE_DUR));
  const showScrim = t > T_SCRIM;
  const showSub = t > T_SUB;
  const showCta = t > T_CTA;
  const fade = (on: boolean) => ({
    opacity: on ? 1 : 0,
    transform: on ? 'none' : 'translateY(14px)',
    transition: 'opacity .9s ease, transform .9s cubic-bezier(.2,.7,.2,1)',
  });

  // Per-letter reveal in the headline's own font: each letter flickers briefly through a few
  // characters (faint, slightly blurred), then settles sharp. Every letter keeps its own slot,
  // so the line never changes width or wraps differently while it resolves.
  const SERIF = { fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' as const, letterSpacing: 0 };
  const words: { text: string; serif?: boolean }[] = [
    { text: 'We' },
    { text: 'are' },
    { text: 'Humantic', serif: true },
    { text: 'Digital' },
  ];
  let idx = 0;
  const headline = words.map((w, wi) => (
    <React.Fragment key={wi}>
      <span className="inline-block whitespace-nowrap" style={w.serif ? SERIF : undefined}>
        {w.text.split('').map((ch, ci) => {
          const settle = T_HEAD_START + idx++ * T_STAGGER;
          const flick = t >= settle - T_FLICKER && t < settle;
          const shown = t >= settle;
          return (
            <span key={ci} className="relative inline-block">
              <span style={{ opacity: shown ? 1 : 0, filter: shown ? 'none' : 'blur(6px)', transition: 'opacity .35s ease, filter .45s ease' }}>
                {ch}
              </span>
              {flick && (
                <span aria-hidden className="absolute inset-0 text-center text-emerald-200/40" style={{ filter: 'blur(1px)' }}>
                  {GLYPHS[(Math.floor(t * 20) + ci * 3 + wi * 5) % GLYPHS.length]}
                </span>
              )}
            </span>
          );
        })}
      </span>
      {wi < words.length - 1 ? ' ' : null}
    </React.Fragment>
  ));

  const copy = (
    <div className="relative z-20" style={{ maxWidth: isMobile ? undefined : 'min(36vw, 560px)' }}>
      <div className="min-h-[1.2em] font-mono text-[11px] sm:text-xs uppercase tracking-[0.28em] text-emerald-300">
        {EYEBROW.slice(0, Math.round(eyeP * EYEBROW.length))}
      </div>
      <h1
        className="mt-4 mb-5 font-light text-white"
        style={{ fontSize: isMobile ? 'clamp(34px, 10vw, 46px)' : 'clamp(34px, 4vw, 64px)', lineHeight: 1.02, letterSpacing: '-0.02em' }}
        aria-label={HEAD_PLAIN}
      >
        {headline}
      </h1>
      <p className="max-w-[420px] text-[15px] sm:text-base lg:text-lg leading-relaxed text-white/70" style={fade(showSub)}>
        Science-based assessment and performance programmes, powered by AI.
      </p>
      <div className="mt-7 flex flex-wrap gap-3" style={fade(showCta)}>
        <button
          onClick={onCta}
          className="rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:brightness-110"
        >
          Book a Meeting
        </button>
        <button
          onClick={() => setFilmOpen(true)}
          className="flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm text-white transition hover:border-white/60 hover:bg-white/5"
        >
          <span aria-hidden>▶</span> Watch the film
        </button>
      </div>
    </div>
  );

  const video = (
    <video
      ref={videoRef}
      key={isMobile ? 'm' : 'd'}
      className="absolute inset-0 h-full w-full object-cover"
      src={isMobile ? '/videos/hero-reel-mobile.mp4' : '/videos/hero-reel.mp4'}
      poster={isMobile ? '/videos/hero-reel-poster-mobile.jpg' : '/videos/hero-reel-poster.jpg'}
      muted
      playsInline
      preload="auto"
      onEnded={onEnded}
      aria-hidden
    />
  );

  return (
    <section
      id="reel"
      className="relative w-full overflow-hidden text-white"
      style={{
        // Fade the section itself out at the bottom (no solid colour band), so the next section's
        // glow shows through and there is no hard line between them.
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
      }}
    >
      {isMobile ? (
        <div className="pt-20">
          <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
            {video}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#020617] to-transparent" />
          </div>
          <div className="px-6 pb-14 pt-6">{copy}</div>
        </div>
      ) : (
        <div className="relative h-[100svh] min-h-[620px]">
          {video}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-[1200ms]"
            style={{
              opacity: showScrim ? 1 : 0,
              background:
                'linear-gradient(90deg, rgba(2,6,23,.88) 0%, rgba(2,6,23,.6) 28%, rgba(2,6,23,0) 50%)',
            }}
          />
          <div className="absolute inset-x-0 bottom-[12vh] px-[5vw]">{copy}</div>
        </div>
      )}

      {filmOpen &&
        createPortal(
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4" onClick={() => setFilmOpen(false)}>
          <video
            className="max-h-full max-w-full rounded-lg"
            src={FILM_FULL}
            autoPlay
            controls
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setFilmOpen(false)}
            className="absolute right-5 top-5 rounded-full border border-white/30 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            Close ✕
          </button>
        </div>,
        document.body
        )}
    </section>
  );
};

export default FilmHero;

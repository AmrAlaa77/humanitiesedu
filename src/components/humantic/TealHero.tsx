import React from 'react';
import { Activity, ArrowDown } from 'lucide-react';

/**
 * Main hero -- the brand video sits under a saturated teal-to-cyan gradient, with thin white
 * slanted line shapes on the left and the Humantic logo + name leading the headline. The video is
 * intentionally only a ghost behind the gradient (the gradient carries the colour); if the video
 * fails to paint (some mobile GPUs), the gradient alone still reads as a finished hero.
 */
const HERO_VIDEO = '/videos/hero-teal.mp4';
const AQUA = '#22f1cc';

const TealHero: React.FC = () => {
  const goNext = () => {
    document.getElementById('reel')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-[#020617] text-white"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />

      {/* teal gradient wash over the media */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(115deg, rgba(45,212,191,0.94) 0%, rgba(20,184,166,0.86) 34%, rgba(8,145,178,0.80) 62%, rgba(14,58,110,0.90) 100%)',
        }}
      />
      {/* light bloom, bottom-left, like the reference */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(60% 70% at 10% 90%, rgba(94,234,212,0.55) 0%, rgba(94,234,212,0) 70%)',
        }}
      />

      {/* thin white slanted line shapes */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMinYMid slice"
        fill="none"
        stroke="white"
        strokeOpacity="0.85"
      >
        <path d="M230 150 H385 L750 900" vectorEffect="non-scaling-stroke" strokeWidth="1.3" />
        <path d="M230 150 L560 900" vectorEffect="non-scaling-stroke" strokeWidth="1.3" />
        <path d="M0 305 H87 L400 900" vectorEffect="non-scaling-stroke" strokeWidth="1.3" />
        <path d="M0 420 L215 900" vectorEffect="non-scaling-stroke" strokeWidth="1.3" />
        <path d="M200 430 H355 L520 900" vectorEffect="non-scaling-stroke" strokeWidth="1.3" />
        <path d="M200 430 L390 900" vectorEffect="non-scaling-stroke" strokeWidth="1.3" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-28 sm:px-8">
        <div className="lg:ml-auto lg:w-[54%]">
          {/* logo + name */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg shadow-black/20">
              <Activity className="h-6 w-6 text-slate-950" />
            </div>
            <div className="leading-tight">
              <span className="block text-xl font-semibold tracking-tight text-white">Humantic</span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">Digital</span>
            </div>
          </div>

          <h1 className="mt-8 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block text-white">Digital intelligence,</span>
            <span className="block" style={{ color: AQUA }}>
              deeply human.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            We bring medical, neuro and behavioral sciences together to advance preventative medicine and human
            awareness.
          </p>
          <p className="mt-3 text-sm font-semibold text-white sm:text-base">
            Health and wellbeing for all. Hope, grounded in science.
          </p>

          <button
            type="button"
            onClick={goNext}
            className="mt-10 inline-flex w-full max-w-md items-center justify-center gap-3 rounded-full border-2 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto sm:min-w-[20rem]"
            style={{ borderColor: AQUA }}
          >
            Explore Humantic
            <ArrowDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* fade into the page so the next section starts on the same solid colour */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: 'linear-gradient(to bottom, rgba(2,6,23,0) 0%, #020617 100%)' }}
      />
    </section>
  );
};

export default TealHero;

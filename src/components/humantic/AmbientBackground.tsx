import React, { useEffect, useRef } from 'react';

/**
 * AmbientBackground — a fixed, full-screen atmospheric layer.
 *
 * The blobs carry a gentle scroll-linked parallax: each drifts at a different
 * fraction of the scroll distance, so foreground content slides over a slower
 * background and the page gains real depth. This is transform-only
 * (translate3d, compositor layer, no repaint) and rAF-throttled, so it does
 * NOT bring back the repaint cost of the old continuously-animated blur blobs
 * that this component was rewritten to avoid.
 */
const AmbientBackground: React.FC = () => {
  const b1 = useRef<HTMLDivElement>(null);
  const b2 = useRef<HTMLDivElement>(null);
  const b3 = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const update = () => {
      raf.current = undefined;
      const y = window.scrollY;
      if (b1.current) b1.current.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
      if (b2.current) b2.current.style.transform = `translate3d(0, ${y * -0.06}px, 0)`;
      if (b3.current) b3.current.style.transform = `translate3d(0, ${y * 0.09}px, 0)`;
      if (gridRef.current) gridRef.current.style.transform = `translate3d(0, ${y * 0.03}px, 0)`;
    };
    const onScroll = () => {
      if (raf.current === undefined) raf.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf.current !== undefined) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div ref={b1} className="absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full bg-emerald-500/10 blur-[90px] will-change-transform" />
      <div ref={b2} className="absolute top-1/3 -right-32 h-[40rem] w-[40rem] rounded-full bg-cyan-500/10 blur-[90px] will-change-transform" />
      <div ref={b3} className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-[90px] will-change-transform" />

      {/* Faint grid */}
      <div
        ref={gridRef}
        className="absolute -inset-y-32 inset-x-0 opacity-[0.02] will-change-transform"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  );
};

export default AmbientBackground;

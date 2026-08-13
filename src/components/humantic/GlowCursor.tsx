import React, { useEffect, useRef } from 'react';

/**
 * The Seafoam Mint Glow Cursor.
 *
 * A large, soft, volumetric seafoam-mint light that follows the pointer like an
 * ambient spotlight — making the user feel they are actively looking *through*
 * the screen and shining a light onto the cinematic reel. It uses screen
 * blending so it interacts with the film's lighting rather than sitting flatly
 * on top. Active from the millisecond the page mounts.
 */
const GlowCursor: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -1, y: -1 });
  const slow = useRef({ x: -1, y: -1 });
  const target = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });
  const raf = useRef<number>();

  useEffect(() => {
    pos.current = { ...target.current };
    slow.current = { ...target.current };

    const move = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('pointermove', move, { passive: true });

    const tick = () => {
      // big halo lags furthest (most volumetric), glow medium, core instant
      slow.current.x += (target.current.x - slow.current.x) * 0.09;
      slow.current.y += (target.current.y - slow.current.y) * 0.09;
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${slow.current.x}px, ${slow.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', move);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[80] overflow-hidden mix-blend-screen hidden md:block"
      aria-hidden
    >
      {/* Outer volumetric seafoam halo — the spotlight's soft outer reach */}
      <div
        ref={haloRef}
        className="absolute top-0 left-0 w-[760px] h-[760px] rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(94,234,212,0.22) 0%, rgba(110,231,209,0.12) 30%, rgba(45,212,191,0.04) 55%, transparent 70%)',
          filter: 'blur(28px)',
        }}
      />
      {/* Mid seafoam-mint glow — the body of the light */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[440px] h-[440px] rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(110,231,209,0.40) 0%, rgba(94,234,212,0.22) 35%, rgba(45,212,191,0.06) 62%, transparent 74%)',
          filter: 'blur(16px)',
        }}
      />
      {/* Bright mint core — the hot center of the beam */}
      <div
        ref={coreRef}
        className="absolute top-0 left-0 w-16 h-16 rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(240,255,250,0.95) 0%, rgba(167,243,224,0.55) 42%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
};

export default GlowCursor;

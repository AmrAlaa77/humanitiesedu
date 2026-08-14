import React, { useEffect, useRef } from 'react';

/**
 * The Seafoam Mint Glow Cursor.
 *
 * A soft seafoam-mint light that follows the pointer like an ambient
 * spotlight, using screen blending so it interacts with the film's
 * lighting rather than sitting flatly on top. Tuned to track the pointer
 * tightly (minimal lag) and the animation loop sleeps once it catches up,
 * instead of repainting 60x/sec while the pointer is idle.
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
  const running = useRef(false);

  useEffect(() => {
    pos.current = { ...target.current };
    slow.current = { ...target.current };

    const startLoop = () => {
      if (running.current) return;
      running.current = true;
      raf.current = requestAnimationFrame(tick);
    };

    const move = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      startLoop();
    };
    window.addEventListener('pointermove', move, { passive: true });

    const tick = () => {
      // Tight tracking: the halo trails just slightly for a soft feel,
      // the core is glued to the pointer for an immediate, non-laggy response.
      slow.current.x += (target.current.x - slow.current.x) * 0.28;
      slow.current.y += (target.current.y - slow.current.y) * 0.28;
      pos.current.x += (target.current.x - pos.current.x) * 0.45;
      pos.current.y += (target.current.y - pos.current.y) * 0.45;

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${slow.current.x}px, ${slow.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }

      const dx = target.current.x - slow.current.x;
      const dy = target.current.y - slow.current.y;
      const settled = dx * dx + dy * dy < 0.25;

      if (settled) {
        running.current = false;
        return; // stop the loop — no work while the pointer is idle
      }
      raf.current = requestAnimationFrame(tick);
    };

    startLoop();

    return () => {
      window.removeEventListener('pointermove', move);
      if (raf.current) cancelAnimationFrame(raf.current);
      running.current = false;
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
        className="absolute top-0 left-0 w-[560px] h-[560px] rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(94,234,212,0.11) 0%, rgba(110,231,209,0.06) 30%, rgba(45,212,191,0.02) 55%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
      {/* Mid seafoam-mint glow — the body of the light */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[360px] h-[360px] rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(110,231,209,0.20) 0%, rgba(94,234,212,0.11) 35%, rgba(45,212,191,0.03) 62%, transparent 74%)',
          filter: 'blur(12px)',
        }}
      />
      {/* Bright mint core — the hot center of the beam, glued to the pointer */}
      <div
        ref={coreRef}
        className="absolute top-0 left-0 w-16 h-16 rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(240,255,250,0.5) 0%, rgba(167,243,224,0.28) 42%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
};

export default GlowCursor;

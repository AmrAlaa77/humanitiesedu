import React, { useEffect, useRef } from 'react';

/**
 * A soft radial "torch" that follows the pointer and reveals a texture layer only where it
 * passes -- distinct from the site-wide GlowCursor (an ambient light that follows the cursor
 * everywhere) because this one actually masks content: the texture beneath is invisible until
 * the torch passes over it, using a radial-gradient mask synced to pointer position via
 * ref+rAF (no per-frame React re-render).
 */
const SpotlightReveal: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0.5, y: 0.5 });
  const target = useRef({ x: 0.5, y: 0.5 });
  const raf = useRef<number>();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      target.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      };
    };
    wrap.addEventListener('pointermove', onMove, { passive: true });

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (maskRef.current) {
        maskRef.current.style.setProperty('--sx', `${pos.current.x * 100}%`);
        maskRef.current.style.setProperty('--sy', `${pos.current.y * 100}%`);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      wrap.removeEventListener('pointermove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      {children}
      {/* The torch layer: a faint grid texture, masked to only show in a soft circle around the
          pointer. Sits above content but pointer-events:none so it never blocks clicks/hovers. */}
      <div
        ref={maskRef}
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.35]"
        style={
          {
            '--sx': '50%',
            '--sy': '50%',
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            WebkitMaskImage: 'radial-gradient(220px 220px at var(--sx) var(--sy), black 0%, transparent 70%)',
            maskImage: 'radial-gradient(220px 220px at var(--sx) var(--sy), black 0%, transparent 70%)',
          } as React.CSSProperties
        }
      />
    </div>
  );
};

export default SpotlightReveal;

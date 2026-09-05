import { useRef } from 'react';

/**
 * 3D cursor-tilt: the element rotates in perspective toward the pointer
 * position within its own bounds, snapping back flat on mouse leave. Pure
 * ref + inline style (no re-render per mouse move), same pattern as the
 * magnetic CTA in NarrativeReel.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(maxDeg = 8) {
  const ref = useRef<T>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rotateY = (px - 0.5) * maxDeg * 2;
    const rotateX = (0.5 - py) * maxDeg * 2;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
  };

  return { ref, onMouseMove, onMouseLeave };
}

export default useTilt;

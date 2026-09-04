import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number counting up from 0 to `end` while `start` is true (e.g.
 * driven by useInView with `once: false`). Eases out so it settles rather
 * than ticking linearly. Resets to 0 whenever `start` goes false, so it
 * counts up again from scratch the next time it scrolls into view --
 * matching a repeat-on-scroll useInView instead of firing once and staying put.
 */
export function useCountUp(end: number, start: boolean, durationMs = 1200) {
  const [value, setValue] = useState(0);
  const raf = useRef<number>();

  useEffect(() => {
    if (!start) {
      if (raf.current) cancelAnimationFrame(raf.current);
      setValue(0);
      return;
    }

    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
      setValue(Math.round(end * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [start, end, durationMs]);

  return value;
}

export default useCountUp;

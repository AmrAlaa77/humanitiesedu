import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number counting up from 0 to `end` once `start` is true (e.g.
 * driven by useInView). Eases out so it settles rather than ticking linearly.
 */
export function useCountUp(end: number, start: boolean, durationMs = 1200) {
  const [value, setValue] = useState(0);
  const raf = useRef<number>();
  const started = useRef(false);

  useEffect(() => {
    if (!start || started.current) return;
    started.current = true;

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

import { useEffect, useState } from 'react';

/**
 * Animates a number from 0 to `target` with ease-out cubic timing, driven by
 * rAF (not setInterval) for a smooth ramp. Stays at 0 until `active` flips
 * true, so it's meant to be paired with useInView -- animate once, on the
 * moment the number actually scrolls into view, not on mount.
 */
export function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

/** Extracts a plain integer from strings like "20,000" or "17"; returns null
 *  for anything that isn't a pure count (e.g. a year range like "2018–2026"),
 *  since those should render statically rather than "counting up". */
export function parseCountTarget(value: string): number | null {
  const clean = value.replace(/,/g, '');
  return /^\d+$/.test(clean) ? parseInt(clean, 10) : null;
}

export default useCountUp;

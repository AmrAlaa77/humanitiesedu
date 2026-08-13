import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions extends IntersectionObserverInit {
  /** Once revealed, stay revealed (prevents re-hiding while scrolling). Default true. */
  once?: boolean;
  /** Hard safety timeout (ms) after which the element is forced visible
   *  even if the observer never fires. Prevents the old "blank section" bug. */
  safetyMs?: number;
}

/**
 * Scroll-reveal hook with built-in fail-safes:
 *  1. If IntersectionObserver is unavailable -> instantly visible.
 *  2. A safety timeout forces visibility even if the observer never fires.
 *  3. `once` keeps content visible after the first reveal (no re-hide glitch).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const {
    once = true,
    safetyMs = 700,
    root = null,
    rootMargin = '0px 0px -10% 0px',
    threshold = 0,
  } = options;

  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    // Fail-safe: no element or no observer support -> show immediately.
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    // Safety timeout: never leave content hidden.
    const safety = window.setTimeout(() => setInView(true), safetyMs);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          window.clearTimeout(safety);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(node);

    return () => {
      window.clearTimeout(safety);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once, safetyMs, root, rootMargin]);

  return { ref, inView };
}

export default useInView;

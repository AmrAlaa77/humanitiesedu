import React, { useEffect, useState } from 'react';

/**
 * A cinematic on-load open: a full-screen black plate with the wordmark. A hairline under the
 * wordmark grows outward from the centre to both edges, then the whole plate zooms in and fades
 * to reveal the hero -- so the site feels like it's being pushed into, not just uncovered.
 *
 * Runs ONCE per browser session (sessionStorage), skipped entirely under prefers-reduced-motion,
 * locks scroll while up, and always self-clears even if a timer is missed.
 */
const SESSION_KEY = 'humantic_intro_shown';

// 'pre' = mounted at the from-state (so the CSS transition has a starting point to animate FROM),
// 'in' = resolved, 'out' = zooming/fading away, 'hidden' = unmounted.
type Phase = 'pre' | 'in' | 'out' | 'hidden';

const IntroSequence: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('hidden');

  useEffect(() => {
    let shown = false;
    try {
      shown = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      shown = false;
    }
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (shown || reduced) return;

    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* private mode — fine, it just plays again next visit */
    }

    document.body.style.overflow = 'hidden';
    setPhase('pre');

    // two rAFs so the browser paints the 'pre' from-state before we flip to 'in'
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setPhase('in'));
    });

    const tOut = window.setTimeout(() => setPhase('out'), 2900);
    const tEnd = window.setTimeout(() => {
      setPhase('hidden');
      document.body.style.overflow = '';
    }, 4500);

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      clearTimeout(tOut);
      clearTimeout(tEnd);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'hidden') return null;

  const resolved = phase === 'in' || phase === 'out';
  const isOut = phase === 'out';

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black transition-opacity duration-[1100ms] ease-in"
      style={{ opacity: isOut ? 0 : 1, pointerEvents: isOut ? 'none' : 'auto' }}
    >
      <div
        className="flex flex-col items-center gap-4 transition-transform duration-[1500ms] ease-in"
        style={{ transform: isOut ? 'scale(5)' : 'scale(1)' }}
      >
        <span
          className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white transition-all duration-[1200ms] ease-out"
          style={{
            opacity: resolved ? 1 : 0,
            transform: resolved ? 'translateY(0)' : 'translateY(16px)',
            filter: resolved ? 'blur(0)' : 'blur(12px)',
          }}
        >
          HumanticDigital
        </span>
        <span
          className="block h-px bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent transition-[width] duration-[1700ms] ease-out"
          style={{ width: phase === 'in' ? '58vw' : phase === 'out' ? '135vw' : '0vw' }}
        />
      </div>
    </div>
  );
};

export default IntroSequence;

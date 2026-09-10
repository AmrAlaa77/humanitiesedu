import React, { useEffect, useState } from 'react';

/**
 * A brief on-load cinematic open: a full-screen black plate with the wordmark, which fades up and
 * then lifts away to reveal the hero. Runs ONCE per browser session (sessionStorage) so it's an
 * arrival moment, not a toll booth on every navigation. Fully skipped when the visitor prefers
 * reduced motion. While it's up it locks scroll; it always clears itself even if something stalls.
 */
const SESSION_KEY = 'humantic_intro_shown';

const IntroSequence: React.FC = () => {
  const [phase, setPhase] = useState<'hidden' | 'in' | 'out'>('hidden');

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
    const t1 = window.setTimeout(() => setPhase('in'), 40);
    const t2 = window.setTimeout(() => setPhase('out'), 1150);
    const t3 = window.setTimeout(() => {
      setPhase('hidden');
      document.body.style.overflow = '';
    }, 2050);

    setPhase('in');

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black transition-opacity duration-[900ms] ease-out"
      style={{ opacity: phase === 'out' ? 0 : 1, pointerEvents: phase === 'out' ? 'none' : 'auto' }}
    >
      <div
        className="flex flex-col items-center gap-3 transition-all duration-[1100ms] ease-out"
        style={{
          opacity: phase === 'in' ? 1 : 0,
          transform: phase === 'in' ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.97)',
          filter: phase === 'in' ? 'blur(0)' : 'blur(10px)',
        }}
      >
        <span className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          HumanticDigital
        </span>
        <span className="h-px w-24 bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
          Riyadh &mdash; Preventative, Human, Digital
        </span>
      </div>
    </div>
  );
};

export default IntroSequence;

import React from 'react';

/**
 * The twinkling star-glitter effect from NarrativeReel's hero, extended to run behind the rest
 * of the homepage too -- a fixed full-page layer so it stays visible past NarrativeReel instead
 * of stopping at that section's own boundary.
 */
const STARS = [
  { top: '8%', left: '22%', size: 3, delay: '0s', dur: '3.2s' },
  { top: '14%', left: '68%', size: 2, delay: '1.4s', dur: '4.1s' },
  { top: '22%', left: '42%', size: 4, delay: '0.4s', dur: '2.8s' },
  { top: '30%', left: '85%', size: 2, delay: '2.0s', dur: '3.6s' },
  { top: '38%', left: '10%', size: 3, delay: '0.8s', dur: '4.4s' },
  { top: '46%', left: '58%', size: 2, delay: '1.6s', dur: '3.0s' },
  { top: '55%', left: '30%', size: 4, delay: '0.2s', dur: '2.6s' },
  { top: '63%', left: '77%', size: 3, delay: '2.4s', dur: '4.0s' },
  { top: '71%', left: '15%', size: 2, delay: '1.3s', dur: '3.4s' },
  { top: '79%', left: '90%', size: 3, delay: '0.6s', dur: '3.8s' },
  { top: '87%', left: '48%', size: 4, delay: '1.9s', dur: '2.9s' },
  { top: '94%', left: '65%', size: 2, delay: '0.9s', dur: '4.2s' },
];

const TwinklingStarfield: React.FC = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <style>{`
      @keyframes twinkleGlowGlobal {
        0%, 100% {
          opacity: 0.15;
          transform: scale(0.8);
          box-shadow: 0 0 0px rgba(52,211,153,0);
        }
        50% {
          opacity: 1;
          transform: scale(1.35);
          box-shadow: 0 0 8px 2px rgba(52,211,153,0.85), 0 0 14px 4px rgba(110,231,183,0.45);
        }
      }
    `}</style>
    {STARS.map((s, i) => (
      <span
        key={i}
        className="absolute rounded-full bg-emerald-200"
        style={{
          top: s.top,
          left: s.left,
          width: `${s.size}px`,
          height: `${s.size}px`,
          animation: `twinkleGlowGlobal ${s.dur} ease-in-out ${s.delay} infinite`,
        }}
      />
    ))}
  </div>
);

export default TwinklingStarfield;

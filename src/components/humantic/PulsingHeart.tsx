import React from 'react';

/**
 * Replaces the rotating brain ornament here with a glowing anatomical heart -- a steady heartbeat
 * pulse (systole/diastole double-thump, ~72bpm timing) plus a scrolling ECG line and a BPM
 * readout, echoing the ambient "wellbeing" data-visualisation feel of the section. Pure SVG/CSS
 * (no WebGL, no external script) so it's as lightweight and dependable as the original SVG brain
 * it replaces. Stops animating under prefers-reduced-motion.
 */
const PulsingHeart: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div aria-hidden className={`pointer-events-none select-none ${className}`}>
    <style>{`
      @keyframes heartThump {
        0%, 100% { transform: scale(1); }
        14% { transform: scale(1.13); }
        28% { transform: scale(0.99); }
        40% { transform: scale(1.07); }
        58% { transform: scale(1); }
      }
      @keyframes heartGlow {
        0%, 100% { opacity: 0.55; }
        14% { opacity: 1; }
        40% { opacity: 0.75; }
        58% { opacity: 0.55; }
      }
      @keyframes ecgScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes bpmPulse {
        0%, 100% { opacity: 0.7; } 14% { opacity: 1; } 58% { opacity: 0.7; }
      }
      .heart-beat { animation: heartThump 1.15s ease-in-out infinite; transform-origin: 50% 55%; }
      .heart-glowline { animation: heartGlow 1.15s ease-in-out infinite; }
      .ecg-track { animation: ecgScroll 2.6s linear infinite; }
      .bpm-num { animation: bpmPulse 1.15s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .heart-beat, .heart-glowline, .ecg-track, .bpm-num { animation: none; }
      }
    `}</style>
    <svg viewBox="0 0 200 240" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <filter id="heartBlur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="heart-beat">
        <g className="heart-glowline" filter="url(#heartBlur)" fill="none" stroke="url(#heartGrad)" strokeLinecap="round">
          {/* great vessels */}
          <path d="M82,42 L80,10" strokeWidth="4" />
          <path d="M98,36 L100,4" strokeWidth="4" />
          <path d="M116,42 L122,12" strokeWidth="4" />
          {/* heart body */}
          <path
            d="M100,66 C100,38 66,20 44,38 C18,58 18,94 46,120 L100,182 L154,120 C182,94 182,58 156,38 C134,20 100,38 100,66 Z"
            strokeWidth="4"
          />
          {/* internal chamber/vessel detail */}
          <path d="M100,66 L100,158" strokeWidth="1.6" opacity="0.55" />
          <path d="M60,72 C72,96 86,118 100,138" strokeWidth="1.3" opacity="0.4" />
          <path d="M140,72 C128,96 114,118 100,138" strokeWidth="1.3" opacity="0.4" />
        </g>
      </g>
    </svg>

    <div className="mt-2 flex items-center gap-2 overflow-hidden" style={{ height: '28px' }}>
      <div className="ecg-track flex shrink-0" style={{ width: '200%' }}>
        <svg viewBox="0 0 220 40" className="w-1/2 h-7" preserveAspectRatio="none">
          <path
            d="M0,20 L55,20 L66,20 L73,5 L82,36 L90,14 L98,20 L220,20"
            fill="none" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
        <svg viewBox="0 0 220 40" className="w-1/2 h-7" preserveAspectRatio="none">
          <path
            d="M0,20 L55,20 L66,20 L73,5 L82,36 L90,14 L98,20 L220,20"
            fill="none" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
    <div className="mt-1 flex items-baseline gap-1.5">
      <span className="bpm-num text-2xl font-bold text-teal-300 tabular-nums">72</span>
      <span className="text-xs font-semibold uppercase tracking-widest text-teal-300/70">BPM</span>
    </div>
  </div>
);

export default PulsingHeart;

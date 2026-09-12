import React from 'react';
import PulsingHeart3D from './PulsingHeart3D';

/**
 * Replaces the rotating brain ornament here with a modern 3D glass heart (extruded + bevelled
 * Three.js mesh, fresnel glow, real rotation) -- a steady heartbeat pulse (systole/diastole
 * double-thump, ~72bpm timing) plus a scrolling ECG line and a BPM readout, echoing the ambient
 * "wellbeing" data-visualisation feel of the section. Stops animating under
 * prefers-reduced-motion.
 */
const PulsingHeart: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div aria-hidden className={`pointer-events-none select-none ${className}`}>
    <style>{`
      @keyframes ecgScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes bpmPulse {
        0%, 100% { opacity: 0.7; } 14% { opacity: 1; } 58% { opacity: 0.7; }
      }
      .ecg-track { animation: ecgScroll 2.6s linear infinite; }
      .bpm-num { animation: bpmPulse 1.15s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .ecg-track, .bpm-num { animation: none; }
      }
    `}</style>
    <PulsingHeart3D className="w-full h-full" />

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

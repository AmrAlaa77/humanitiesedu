import React from 'react';

/**
 * A slow-tumbling neural-network "brain" built entirely from SVG (nodes + edges roughly in a
 * brain silhouette) -- no image asset. Sits as a faint background ornament behind the wellbeing-
 * metrics section, since that's the neuroscience-data part of the story. The 3D tumble is a pure
 * CSS keyframe animation; it stops for visitors who prefer reduced motion.
 */

// Rough brain-shaped scatter of nodes in a 200x200 box.
const NODES: Array<[number, number, number]> = [
  [60, 70, 4], [90, 50, 5], [120, 46, 4], [148, 62, 5], [162, 92, 4],
  [150, 122, 5], [128, 146, 4], [98, 152, 5], [70, 140, 4], [52, 112, 5],
  [46, 88, 3], [104, 84, 6], [88, 108, 4], [122, 104, 5], [136, 84, 3],
  [76, 92, 3], [110, 128, 3], [140, 106, 3], [66, 116, 3], [100, 62, 3],
];

const EDGES: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 0],
  [11, 1], [11, 12], [11, 13], [11, 14], [11, 19], [12, 8], [12, 15], [13, 5], [13, 17],
  [14, 3], [15, 0], [16, 6], [17, 4], [18, 9], [19, 2], [12, 16], [13, 16], [15, 18],
];

const RotatingBrain: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div aria-hidden className={`pointer-events-none select-none ${className}`} style={{ perspective: '900px' }}>
    <style>{`
      @keyframes brainTumble {
        0%   { transform: rotateX(12deg) rotateY(0deg) rotateZ(0deg); }
        50%  { transform: rotateX(-8deg) rotateY(180deg) rotateZ(4deg); }
        100% { transform: rotateX(12deg) rotateY(360deg) rotateZ(0deg); }
      }
      .brain-spin { animation: brainTumble 34s linear infinite; transform-style: preserve-3d; }
      @media (prefers-reduced-motion: reduce) { .brain-spin { animation: none; } }
    `}</style>
    <svg viewBox="0 0 200 200" className="brain-spin w-full h-full">
      <defs>
        <radialGradient id="brainNodeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#22d3ee" />
        </radialGradient>
      </defs>
      <g stroke="#34d399" strokeOpacity="0.35" strokeWidth="0.75">
        {EDGES.map(([a, b], i) => (
          <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
        ))}
      </g>
      <g fill="url(#brainNodeGrad)">
        {NODES.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} />
        ))}
      </g>
    </svg>
  </div>
);

export default RotatingBrain;

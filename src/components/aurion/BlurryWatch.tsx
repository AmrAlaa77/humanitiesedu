import React from 'react';

const BlurryWatch: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 320 320" className={className} role="img" aria-label="AURION ONE smartwatch, out of focus">
    <defs>
      <linearGradient id="aurion-case" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5eead4" />
        <stop offset="55%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#0e7490" />
      </linearGradient>
      <linearGradient id="aurion-band" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#134e4a" />
        <stop offset="100%" stopColor="#042f2e" />
      </linearGradient>
      <radialGradient id="aurion-face" cx="50%" cy="38%" r="75%">
        <stop offset="0%" stopColor="#115e59" />
        <stop offset="100%" stopColor="#042f2e" />
      </radialGradient>
      <linearGradient id="aurion-ring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5eead4" />
        <stop offset="100%" stopColor="#818cf8" />
      </linearGradient>
    </defs>

    {/* woven bands */}
    <rect x="122" y="-6" width="76" height="86" rx="16" fill="url(#aurion-band)" stroke="#334155" strokeWidth="1.5" />
    {[6, 20, 34, 48, 62].map((y) => (
      <rect key={y} x="130" y={y} width="60" height="4" rx="2" fill="#0b1420" opacity="0.55" />
    ))}
    <rect x="122" y="240" width="76" height="86" rx="16" fill="url(#aurion-band)" stroke="#334155" strokeWidth="1.5" />
    {[248, 262, 276, 290, 304].map((y) => (
      <rect key={y} x="130" y={y} width="60" height="4" rx="2" fill="#0b1420" opacity="0.55" />
    ))}

    {/* octagonal case (distinct from a plain rounded square) */}
    <path
      d="M108 62 H212 L258 108 V212 L212 258 H108 L62 212 V108 Z"
      fill="#0f3d3a"
      stroke="url(#aurion-case)"
      strokeWidth="5"
    />
    {/* digital crown + side button */}
    <circle cx="266" cy="146" r="12" fill="url(#aurion-case)" />
    <circle cx="266" cy="146" r="4" fill="#0f3d3a" />
    <rect x="257" y="182" width="16" height="22" rx="6" fill="url(#aurion-case)" />

    {/* face */}
    <path d="M118 72 H202 L242 112 V208 L202 248 H118 L78 208 V112 Z" fill="url(#aurion-face)" />

    {/* activity rings — unique wellness-brand signature */}
    <circle cx="160" cy="160" r="58" fill="none" stroke="#134e4a" strokeWidth="9" opacity="0.5" />
    <circle
      cx="160"
      cy="160"
      r="58"
      fill="none"
      stroke="url(#aurion-ring)"
      strokeWidth="9"
      strokeLinecap="round"
      strokeDasharray="304 364"
      transform="rotate(-90 160 160)"
    />
    <circle cx="160" cy="160" r="44" fill="none" stroke="#164e63" strokeWidth="7" opacity="0.5" />
    <circle
      cx="160"
      cy="160"
      r="44"
      fill="none"
      stroke="#5eead4"
      strokeWidth="7"
      strokeLinecap="round"
      strokeDasharray="200 277"
      transform="rotate(-90 160 160)"
    />

    <text x="160" y="152" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="26" fontWeight="700" fill="#f0fdfa">
      09:41
    </text>
    <text x="160" y="175" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10" letterSpacing="3" fill="#67e8f9">
      AURION
    </text>
    <polyline
      points="130,192 142,192 148,180 156,204 164,186 172,192 190,192"
      fill="none"
      stroke="#2dd9a3"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BlurryWatch;

import React from 'react';

const BlurryWatch: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 320 320" className={className} role="img" aria-label="AURION ONE digital watch, out of focus">
    <defs>
      <linearGradient id="aurion-case" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#5eead4" />
        <stop offset="100%" stopColor="#22d3ee" />
      </linearGradient>
      <linearGradient id="aurion-band" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
    </defs>
    <rect x="130" y="0" width="60" height="92" rx="18" fill="url(#aurion-band)" stroke="#334155" strokeWidth="1.5" />
    <rect x="130" y="228" width="60" height="92" rx="18" fill="url(#aurion-band)" stroke="#334155" strokeWidth="1.5" />
    <rect x="70" y="70" width="180" height="180" rx="42" fill="#0b1220" stroke="url(#aurion-case)" strokeWidth="4" />
    <rect x="249" y="140" width="16" height="26" rx="6" fill="url(#aurion-case)" />
    <rect x="94" y="94" width="132" height="132" rx="28" fill="#020617" />
    <text x="160" y="150" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="34" fontWeight="700" fill="#5eead4">
      09:41
    </text>
    <text x="160" y="180" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="13" letterSpacing="3" fill="#67e8f9">
      AURION
    </text>
    <polyline
      points="104,205 118,205 126,190 136,218 146,196 156,205 218,205"
      fill="none"
      stroke="#2dd9a3"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default BlurryWatch;

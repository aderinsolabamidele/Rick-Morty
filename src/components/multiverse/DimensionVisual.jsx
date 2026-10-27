import React, { useId } from 'react';

// Procedural, code-drawn environments for each dimension, clipped to a circle.
const VISUALS = {
  earth: (color, accent) => (
    <>
      <rect width="100" height="100" fill="#0a1f3d" />
      <circle cx="50" cy="50" r="50" fill="#1e3a5f" />
      <path d="M22 38 q10 -8 18 -2 q6 4 2 11 q-8 6 -16 0 z" fill="#3a7d3a" />
      <path d="M54 54 q12 -4 18 4 q4 8 -4 11 q-12 2 -14 -7 z" fill="#3a7d3a" />
      <path d="M38 70 q8 -2 11 4 q2 6 -6 6 q-7 -2 -5 -10 z" fill="#2d6b2d" />
      <path d="M28 28 a22 22 0 1 0 44 0" fill="none" stroke={color} strokeWidth="1.3" opacity="0.75" />
      <path d="M40 24 a14 14 0 1 0 20 0" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.5" />
      <circle cx="50" cy="50" r="2.5" fill={color} opacity="0.85" />
    </>
  ),
  purple: (color, accent) => (
    <>
      <rect width="100" height="100" fill="#1a0b2e" />
      <circle cx="34" cy="40" r="26" fill="#4c1d95" opacity="0.6" />
      <circle cx="66" cy="60" r="22" fill="#7c3aed" opacity="0.5" />
      <path d="M30 20 L40 36 L24 40 z" fill={color} opacity="0.7" />
      <path d="M70 28 L78 44 L62 47 z" fill={accent} opacity="0.6" />
      <path d="M50 76 L60 84 L44 86 z" fill={color} opacity="0.5" />
      <circle cx="22" cy="62" r="0.9" fill="#fff" opacity="0.8" />
      <circle cx="78" cy="20" r="0.9" fill="#fff" opacity="0.8" />
      <circle cx="58" cy="30" r="0.7" fill="#fff" opacity="0.6" />
    </>
  ),
  blue: (color, accent) => (
    <>
      <rect width="100" height="100" fill="#062a4a" />
      <path d="M0 68 Q50 58 100 70 L100 100 L0 100 z" fill="#0e7490" />
      <circle cx="40" cy="34" r="9" fill={color} opacity="0.7" />
      <circle cx="40" cy="34" r="4" fill={accent} />
      <ellipse cx="70" cy="44" rx="11" ry="4" fill={accent} opacity="0.5" />
      <path d="M52 24 q5 -4 11 0" stroke={color} fill="none" strokeWidth="1" opacity="0.6" />
      <circle cx="26" cy="50" r="1" fill={accent} opacity="0.8" />
      <circle cx="82" cy="58" r="1" fill={color} opacity="0.8" />
    </>
  ),
  red: (color, accent) => (
    <>
      <rect width="100" height="100" fill="#2a0808" />
      <circle cx="50" cy="50" r="40" fill="#7f1d1d" opacity="0.6" />
      <path d="M50 8 L47 34 L56 50 L44 70 L52 92" stroke={color} strokeWidth="1.1" fill="none" opacity="0.85" />
      <path d="M18 38 L40 45 L50 55" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M82 28 L64 44 L55 50" stroke={accent} strokeWidth="0.8" fill="none" opacity="0.6" />
      <circle cx="34" cy="28" r="1.3" fill={accent} />
      <circle cx="66" cy="70" r="1" fill={color} />
      <circle cx="72" cy="40" r="0.8" fill={accent} opacity="0.7" />
    </>
  ),
  glitch: (color, accent) => (
    <>
      <rect width="100" height="100" fill="#020617" />
      <rect x="8" y="18" width="42" height="20" fill={color} opacity="0.5" />
      <rect x="12" y="20" width="42" height="20" fill="#f43f5e" opacity="0.25" />
      <rect x="50" y="30" width="36" height="16" fill={accent} opacity="0.4" />
      <rect x="18" y="54" width="32" height="18" fill={color} opacity="0.3" />
      <rect x="0" y="40" width="100" height="3" fill={accent} opacity="0.5" />
      <rect x="0" y="63" width="100" height="2" fill={color} opacity="0.6" />
      <path d="M28 72 L72 72" stroke={color} strokeWidth="0.8" />
      <path d="M40 80 L60 80" stroke={accent} strokeWidth="0.6" opacity="0.7" />
    </>
  ),
  future: (color, accent) => (
    <>
      <rect width="100" height="100" fill="#031a2a" />
      <g stroke={accent} strokeWidth="0.4" opacity="0.45" fill="none">
        <path d="M0 70 L100 70" /><path d="M0 80 L100 80" /><path d="M0 90 L100 90" />
        <path d="M20 70 L20 100" /><path d="M50 70 L50 100" /><path d="M80 70 L80 100" />
      </g>
      <rect x="18" y="40" width="10" height="30" fill={color} opacity="0.7" />
      <rect x="33" y="28" width="8" height="42" fill={accent} opacity="0.85" />
      <rect x="46" y="46" width="12" height="24" fill={color} opacity="0.6" />
      <rect x="64" y="34" width="10" height="36" fill={accent} opacity="0.7" />
      <circle cx="50" cy="28" r="6" fill={color} opacity="0.5" />
    </>
  ),
  c137: (color, accent) => (
    <>
      <rect width="100" height="100" fill="#0a1f3d" />
      <circle cx="50" cy="50" r="50" fill="#1e3a5f" />
      <path d="M22 38 q10 -8 18 -2 q6 4 2 11 q-8 6 -16 0 z" fill="#3a7d3a" />
      <path d="M54 54 q12 -4 18 4 q4 8 -4 11 q-12 2 -14 -7 z" fill="#3a7d3a" />
      <path d="M38 70 q8 -2 11 4 q2 6 -6 6 q-7 -2 -5 -10 z" fill="#2d6b2d" />
      <path d="M28 28 a22 22 0 1 0 44 0" fill="none" stroke={color} strokeWidth="1.3" opacity="0.75" />
      <circle cx="50" cy="50" r="2.5" fill={color} opacity="0.85" />
    </>
  ),
  cronenberg: (color, accent) => (
    <>
      <rect width="100" height="100" fill="#16240f" />
      <circle cx="50" cy="50" r="50" fill="#243a1c" />
      <path d="M30 40 q14 -10 22 2 q4 10 -8 14 q-16 2 -14 -10 z" fill="#3f6212" />
      <path d="M52 58 q10 -6 18 2 q2 8 -8 10 q-12 0 -10 -12 z" fill="#4d7c0f" />
      <path d="M40 30 q6 -4 10 2" stroke={color} strokeWidth="1" fill="none" opacity="0.7" />
      <circle cx="34" cy="46" r="2" fill={accent} opacity="0.6" />
      <circle cx="64" cy="40" r="1.5" fill={color} opacity="0.7" />
    </>
  ),
  frost: (color, accent) => (
    <>
      <rect width="100" height="100" fill="#082a3a" />
      <circle cx="50" cy="50" r="50" fill="#0e3a4a" />
      <path d="M50 18 L50 50 M30 32 L50 50 M70 32 L50 50 M38 64 L50 50 M62 64 L50 50" stroke={color} strokeWidth="1.2" opacity="0.7" />
      <path d="M50 18 l-3 6 h6 z M30 32 l-2 5 l5 -1 z M70 32 l2 5 l-5 -1 z" fill={accent} opacity="0.6" />
      <path d="M20 78 Q50 70 80 78 L80 100 L20 100 z" fill="#0e3a4a" />
      <circle cx="30" cy="30" r="1" fill="#fff" opacity="0.8" />
      <circle cx="72" cy="44" r="0.8" fill="#fff" opacity="0.7" />
    </>
  ),
  wasteland: (color, accent) => (
    <>
      <rect width="100" height="100" fill="#2a140a" />
      <circle cx="50" cy="50" r="50" fill="#3a1a0a" />
      <circle cx="50" cy="34" r="9" fill={color} opacity="0.7" />
      <path d="M0 64 Q30 56 50 62 Q72 56 100 64 L100 100 L0 100 z" fill="#4a2010" />
      <path d="M0 78 Q25 72 50 78 Q75 72 100 78 L100 100 L0 100 z" fill="#2a140a" />
      <rect x="34" y="58" width="5" height="14" fill="#1a0a04" opacity="0.8" />
      <rect x="44" y="52" width="4" height="20" fill="#1a0a04" opacity="0.8" />
      <rect x="52" y="56" width="6" height="16" fill="#1a0a04" opacity="0.8" />
    </>
  ),
  replacement: (color, accent) => (
    <>
      <rect width="100" height="100" fill="#1a0828" />
      <circle cx="50" cy="50" r="50" fill="#2a0a3a" />
      <circle cx="40" cy="46" r="14" fill={color} opacity="0.5" />
      <circle cx="46" cy="50" r="14" fill={accent} opacity="0.4" />
      <path d="M30 64 L50 58 L70 64 L70 100 L30 100 z" fill="#1a0828" opacity="0.8" />
      <rect x="20" y="40" width="60" height="1.5" fill={color} opacity="0.5" />
      <rect x="20" y="60" width="60" height="1" fill={accent} opacity="0.4" />
      <circle cx="30" cy="30" r="1" fill="#fff" opacity="0.7" />
      <circle cx="34" cy="32" r="1" fill={color} opacity="0.6" />
    </>
  ),
};

export default function DimensionVisual({ env, color, accent }) {
  const id = useId();
  const clip = `clip-${id}`;
  const glow = `glow-${id}`;
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <defs>
        <clipPath id={clip}><circle cx="50" cy="50" r="49" /></clipPath>
        <radialGradient id={glow} cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g clipPath={`url(#${clip})`}>
        {VISUALS[env]?.(color, accent)}
        <circle cx="50" cy="50" r="49" fill={`url(#${glow})`} />
      </g>
    </svg>
  );
}
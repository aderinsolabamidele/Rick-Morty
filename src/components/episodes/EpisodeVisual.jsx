import React, { useId } from 'react';

const STARS = (n = 26) => {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const x = (i * 37) % 200;
    const y = (i * 53) % 120;
    const r = (i % 3) * 0.35 + 0.3;
    pts.push(<circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={0.5 + (i % 3) * 0.15} />);
  }
  return pts;
};

const VISUALS = {
  portal: (c, a) => (
    <>
      <rect width="200" height="120" fill="#050b22" />
      <circle cx="100" cy="60" r="48" fill="none" stroke={c} strokeWidth="1.4" opacity="0.7" />
      <circle cx="100" cy="60" r="36" fill="none" stroke={a} strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="60" r="24" fill={c} opacity="0.16" />
      <circle cx="100" cy="60" r="9" fill={c} opacity="0.5" />
      {STARS()}
    </>
  ),
  toxic: (c, a) => (
    <>
      <rect width="200" height="120" fill="#06140a" />
      <path d="M0 80 Q50 60 100 78 T200 76 L200 120 L0 120 z" fill={c} opacity="0.22" />
      <path d="M0 92 Q50 76 100 90 T200 88 L200 120 L0 120 z" fill={a} opacity="0.18" />
      <circle cx="40" cy="70" r="6" fill={c} opacity="0.5" />
      <circle cx="120" cy="58" r="9" fill={c} opacity="0.4" />
      <circle cx="160" cy="74" r="5" fill={a} opacity="0.5" />
      <circle cx="80" cy="48" r="4" fill={c} opacity="0.4" />
    </>
  ),
  glitch: (c, a) => (
    <>
      <rect width="200" height="120" fill="#020617" />
      <rect x="10" y="20" width="80" height="30" fill={c} opacity="0.4" />
      <rect x="14" y="22" width="80" height="30" fill="#f43f5e" opacity="0.2" />
      <rect x="100" y="40" width="70" height="24" fill={a} opacity="0.35" />
      <rect x="20" y="70" width="60" height="22" fill={c} opacity="0.3" />
      <rect x="0" y="50" width="200" height="2" fill={a} opacity="0.5" />
      <rect x="0" y="84" width="200" height="2" fill={c} opacity="0.5" />
    </>
  ),
  microverse: (c, a) => (
    <>
      <rect width="200" height="120" fill="#050b22" />
      <circle cx="100" cy="60" r="26" fill="#1e3a5f" />
      <path d="M86 52 q8 -6 16 0 q4 6 -4 8 q-10 2 -12 -4 z" fill="#3a7d3a" />
      <path d="M104 66 q8 -2 12 4 q2 6 -6 6 q-8 -2 -6 -10 z" fill="#3a7d3a" />
      <ellipse cx="100" cy="60" rx="52" ry="14" fill="none" stroke={c} strokeWidth="0.8" opacity="0.6" />
      <ellipse cx="100" cy="60" rx="52" ry="14" fill="none" stroke={a} strokeWidth="0.6" opacity="0.4" transform="rotate(28 100 60)" />
      <circle cx="152" cy="60" r="3" fill={c} />
      {STARS(18)}
    </>
  ),
  cosmic: (c, a) => (
    <>
      <rect width="200" height="120" fill="#070617" />
      <circle cx="60" cy="40" r="34" fill={c} opacity="0.16" />
      <circle cx="140" cy="78" r="30" fill={a} opacity="0.14" />
      <circle cx="100" cy="60" r="50" fill="none" stroke={c} strokeWidth="0.6" opacity="0.3" />
      {STARS(34)}
    </>
  ),
  citadel: (c, a) => (
    <>
      <rect width="200" height="120" fill="#04101c" />
      <g fill={c} opacity="0.5">
        <rect x="20" y="70" width="14" height="50" />
        <rect x="40" y="58" width="12" height="62" />
        <rect x="58" y="74" width="16" height="46" />
        <rect x="120" y="64" width="14" height="56" />
        <rect x="140" y="52" width="12" height="68" />
        <rect x="158" y="72" width="16" height="48" />
      </g>
      <g fill={a} opacity="0.7">
        <rect x="44" y="66" width="2" height="2" /><rect x="44" y="74" width="2" height="2" />
        <rect x="144" y="60" width="2" height="2" /><rect x="144" y="70" width="2" height="2" />
      </g>
      <path d="M0 100 L200 100" stroke={c} strokeWidth="0.5" opacity="0.4" />
    </>
  ),
  future: (c, a) => (
    <>
      <rect width="200" height="120" fill="#031a2a" />
      <g stroke={a} strokeWidth="0.4" opacity="0.4" fill="none">
        <path d="M0 90 L200 90" /><path d="M0 104 L200 104" />
        <path d="M40 90 L40 120" /><path d="M100 90 L100 120" /><path d="M160 90 L160 120" />
      </g>
      <g fill={c} opacity="0.6">
        <rect x="30" y="50" width="14" height="40" />
        <rect x="52" y="38" width="12" height="52" />
        <rect x="120" y="44" width="16" height="46" />
        <rect x="146" y="56" width="12" height="34" />
      </g>
      <circle cx="100" cy="34" r="8" fill={c} opacity="0.4" />
    </>
  ),
};

export default function EpisodeVisual({ env, color, accent, className }) {
  const id = useId();
  const glow = `eg-${id}`;
  return (
    <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" className={className ?? 'h-full w-full'}>
      <defs>
        <radialGradient id={glow} cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      {VISUALS[env]?.(color, accent)}
      <rect width="200" height="120" fill={`url(#${glow})`} />
    </svg>
  );
}
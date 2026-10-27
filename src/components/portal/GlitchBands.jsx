import React from 'react';

const BANDS = [
  { top: '14%', h: '2%', c: 'bg-portal/20' },
  { top: '31%', h: '5%', c: 'bg-cyan-hud/15' },
  { top: '47%', h: '1.5%', c: 'bg-portal/25' },
  { top: '63%', h: '4%', c: 'bg-nebula/20' },
  { top: '82%', h: '2.5%', c: 'bg-cyan-hud/20' },
];

export default function GlitchBands({ active }) {
  if (!active) return null;
  return BANDS.map((b, i) => (
    <span
      key={i}
      className={`glitch-band absolute inset-x-0 ${b.c}`}
      style={{ top: b.top, height: b.h, animationDelay: `${i * 0.04}s` }}
    />
  ));
}
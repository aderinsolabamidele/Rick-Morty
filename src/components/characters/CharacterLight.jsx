import React from 'react';

// Small energy particles around the characters. `variant="behind"` sits between
// the portal and the characters; `variant="front"` drifts in front of them.
const SETS = {
  behind: [
    { l: '58%', t: '46%', s: 3, c: 'bg-portal/40', d: '0s' },
    { l: '68%', t: '58%', s: 2, c: 'bg-cyan-hud/40', d: '1.3s' },
    { l: '54%', t: '70%', s: 3, c: 'bg-portal/35', d: '2.2s' },
    { l: '72%', t: '44%', s: 2, c: 'bg-portal/40', d: '0.7s' },
    { l: '62%', t: '82%', s: 2, c: 'bg-cyan-hud/35', d: '1.9s' },
  ],
  front: [
    { l: '52%', t: '74%', s: 4, c: 'bg-portal/70', d: '0.4s' },
    { l: '64%', t: '68%', s: 3, c: 'bg-portal/60', d: '1.5s' },
    { l: '58%', t: '88%', s: 5, c: 'bg-portal/65', d: '2.4s' },
    { l: '70%', t: '80%', s: 3, c: 'bg-cyan-hud/55', d: '0.9s' },
    { l: '48%', t: '62%', s: 3, c: 'bg-portal/55', d: '2.8s' },
  ],
};

export default function CharacterParticles({ variant = 'front' }) {
  return SETS[variant].map((p, i) => (
    <span
      key={i}
      className={`animate-float absolute rounded-full ${p.c}`}
      style={{ left: p.l, top: p.t, width: p.s, height: p.s, animationDelay: p.d }}
    />
  ));
}
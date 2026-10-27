import React from 'react';

// Cartoon space clutter drifting around the Earth — aliens, creatures, stars, portal shards.
const ITEMS = [
  { node: 'ufo', l: '8%', t: '18%', d: '0s', dur: '11s' },
  { node: 'blob', l: '88%', t: '30%', d: '1.5s', dur: '13s' },
  { node: 'crystal', l: '14%', t: '82%', d: '0.8s', dur: '10s' },
  { node: 'debris', l: '90%', t: '78%', d: '2.2s', dur: '12s' },
  { node: 'saucer', l: '50%', t: '12%', d: '3s', dur: '14s' },
  { node: 'star', l: '24%', t: '30%', d: '0.4s', dur: '8s' },
  { node: 'star', l: '78%', t: '64%', d: '1.8s', dur: '9s' },
  { node: 'alien', l: '70%', t: '20%', d: '2.6s', dur: '15s' },
  { node: 'critter', l: '32%', t: '74%', d: '1.1s', dur: '13s' },
  { node: 'shard', l: '60%', t: '70%', d: '3.4s', dur: '10s' },
  { node: 'planet', l: '12%', t: '52%', d: '0.2s', dur: '16s' },
];

const Shapes = {
  ufo: (
    <svg viewBox="0 0 40 24" className="h-6 w-10"><ellipse cx="20" cy="15" rx="18" ry="5" fill="#22D3EE" opacity="0.5" /><ellipse cx="20" cy="12" rx="10" ry="5" fill="#BEF264" opacity="0.7" /><circle cx="20" cy="11" r="3" fill="#f0fdf4" opacity="0.8" /></svg>
  ),
  saucer: (
    <svg viewBox="0 0 40 20" className="h-5 w-10"><path d="M2 12 Q20 2 38 12 Q20 18 2 12" fill="#7C3AED" opacity="0.55" /><circle cx="20" cy="11" r="2.5" fill="#BEF264" /></svg>
  ),
  blob: (
    <svg viewBox="0 0 30 30" className="h-6 w-6"><path d="M6 15 Q4 6 14 7 Q22 4 25 13 Q28 22 18 25 Q8 27 6 15" fill="#BEF264" opacity="0.6" /><circle cx="12" cy="14" r="1.4" fill="#020617" /><circle cx="19" cy="15" r="1.4" fill="#020617" /></svg>
  ),
  crystal: (
    <svg viewBox="0 0 24 30" className="h-7 w-6"><path d="M12 2 L20 12 L12 28 L4 12 Z" fill="#22D3EE" opacity="0.5" stroke="#22D3EE" strokeWidth="0.6" /><path d="M12 2 L12 28 M4 12 L20 12" stroke="#BEF264" strokeWidth="0.5" opacity="0.7" /></svg>
  ),
  debris: (
    <svg viewBox="0 0 26 26" className="h-5 w-5"><path d="M3 8 L10 3 L20 6 L23 16 L16 23 L6 20 Z" fill="none" stroke="#94a3b8" strokeWidth="0.8" opacity="0.6" /><path d="M10 3 L16 23 M3 8 L23 16" stroke="#64748b" strokeWidth="0.5" opacity="0.5" /></svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M12 1 L14 9 L22 11 L14 13 L12 22 L10 13 L2 11 L10 9 Z" fill="#BEF264" opacity="0.7" /></svg>
  ),
  alien: (
    <svg viewBox="0 0 20 26" className="h-7 w-5"><path d="M10 2 Q3 8 4 18 Q10 24 16 18 Q17 8 10 2 Z" fill="#84cc16" opacity="0.6" /><circle cx="8" cy="12" r="1.6" fill="#020617" /><circle cx="12" cy="12" r="1.6" fill="#020617" /></svg>
  ),
  critter: (
    <svg viewBox="0 0 24 16" className="h-4 w-6"><ellipse cx="12" cy="10" rx="9" ry="4" fill="#7C3AED" opacity="0.55" /><circle cx="6" cy="8" r="1.2" fill="#f0fdf4" /><circle cx="18" cy="8" r="1.2" fill="#f0fdf4" /><path d="M3 10 L0 7 M21 10 L24 7" stroke="#7C3AED" strokeWidth="1" opacity="0.6" /></svg>
  ),
  shard: (
    <svg viewBox="0 0 16 22" className="h-6 w-4"><path d="M8 1 L14 10 L8 21 L2 10 Z" fill="#BEF264" opacity="0.45" stroke="#84cc16" strokeWidth="0.5" /></svg>
  ),
  planet: (
    <svg viewBox="0 0 28 28" className="h-6 w-6"><circle cx="14" cy="14" r="8" fill="#7C3AED" opacity="0.5" /><ellipse cx="14" cy="14" rx="13" ry="4" fill="none" stroke="#22D3EE" strokeWidth="0.8" opacity="0.5" transform="rotate(-20 14 14)" /></svg>
  ),
};

export default function FloatingAnomalies() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-[-10%] hidden lg:block">
      {ITEMS.map((it, i) => (
        <div key={i} className="animate-float absolute" style={{ left: it.l, top: it.t, animationDelay: it.d, animationDuration: it.dur }}>
          {Shapes[it.node]}
        </div>
      ))}
    </div>
  );
}
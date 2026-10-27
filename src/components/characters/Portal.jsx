import React, { useEffect, useRef } from 'react';
import { getEnergyTarget, isActivating } from '@/lib/energy';

// Dimensional portal built entirely from SVG + CSS: layered rotating rings,
// swirling core, energy particles. Reacts to portal energy + activation
// (brightens / expands when the portal gun fires).
const RINGS = [
  { rx: 80, ry: 122, stroke: '#bef264', sw: 2.5, op: 0.55, cls: 'portal-rings-rot' },
  { rx: 66, ry: 104, stroke: '#22d3ee', sw: 1.8, op: 0.4, cls: 'portal-rings-rot-rev' },
  { rx: 52, ry: 86, stroke: '#bef264', sw: 1.4, op: 0.5, cls: 'portal-rings-rot' },
  { rx: 38, ry: 66, stroke: '#7C3AED', sw: 1.2, op: 0.35, cls: 'portal-rings-rot-rev' },
];

export default function Portal() {
  const ref = useRef(null);
  useEffect(() => {
    let raf, e = 0, a = 0;
    const loop = () => {
      e += (getEnergyTarget() - e) * 0.06;
      a += ((isActivating() ? 1 : 0) - a) * 0.08;
      if (ref.current) {
        ref.current.style.setProperty('--pe', e.toFixed(3));
        ref.current.style.setProperty('--pa', a.toFixed(3));
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div ref={ref} className="portal-rift" style={{ '--pe': 0, '--pa': 0 }}>
      <div className="portal-swirl portal-rift-swirl" />
      <svg viewBox="0 0 200 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <radialGradient id="riftCore" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#f7fee7" />
            <stop offset="16%" stopColor="#bef264" />
            <stop offset="42%" stopColor="#65a30d" stopOpacity="0.85" />
            <stop offset="72%" stopColor="#14532d" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
          <filter id="riftBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>
        <ellipse cx="100" cy="150" rx="82" ry="124" fill="url(#riftCore)" />
        <g filter="url(#riftBlur)">
          {RINGS.map((r, i) => (
            <ellipse key={i} className={r.cls} cx="100" cy="150" rx={r.rx} ry={r.ry} fill="none" stroke={r.stroke} strokeWidth={r.sw} opacity={r.op} />
          ))}
        </g>
        <g className="portal-swirl-svg" opacity="0.5">
          <path d="M100,40 Q150,90 100,150 Q50,210 100,260 Q150,210 100,150 Q50,90 100,40" fill="none" stroke="#d9f99d" strokeWidth="1.5" />
          <path d="M100,60 Q140,100 100,150 Q60,200 100,240" fill="none" stroke="#22d3ee" strokeWidth="1" />
        </g>
      </svg>
      {[
        { l: '50%', t: '20%', d: '0s' }, { l: '62%', t: '70%', d: '1.1s' },
        { l: '38%', t: '55%', d: '2s' }, { l: '55%', t: '85%', d: '0.6s' },
        { l: '46%', t: '38%', d: '1.6s' },
      ].map((p, i) => (
        <span key={i} className="animate-float absolute rounded-full bg-portal/70" style={{ left: p.l, top: p.t, width: 3, height: 3, animationDelay: p.d }} />
      ))}
    </div>
  );
}
import React from 'react';
import { INK, MOUTH_DARK, BROWS } from './constant';

const S = { stroke: INK, strokeLinecap: 'round', strokeLinejoin: 'round' };

export function Brows({ base, expr }) {
  const b = BROWS[base][expr] || BROWS[base].neutral;
  if (base === 'rick') {
    const [hl, hc, hr] = b;
    const d = `M84 ${hl} C91 ${hl - 5} 100 ${hc - 2.5} 106 ${hc + 0.5} C109 ${hc + 2} 113 ${hc + 1.5} 117 ${hc} C123 ${hc - 2.5} 131 ${hr - 3.5} 138 ${hr - 0.5}`;
    return (
      <g>
        <path d={d} fill="none" {...S} strokeWidth="5.4" />
        <path d={`M89 ${hl - 3} C95 ${hl - 5.2} 102 ${hc - 3.8} 107 ${hc - 1.4}`} fill="none" {...S} strokeWidth="2.4" />
      </g>
    );
  }
  const [lo, li, ri, ro] = b;
  return (
    <g fill="none" {...S} strokeWidth="2.8">
      <path d={`M83 ${lo} C89 ${lo - 3.5} 98 ${li - 2.5} 104 ${li}`} />
      <path d={`M118 ${ri} C124 ${ri - 2.5} 133 ${ro - 3.5} 139 ${ro}`} />
    </g>
  );
}

function Creases({ L, R, my }) {
  return (
    <g fill="none" {...S} strokeWidth="1.4">
      <path d={`M${L - 2} ${my - 5} C${L - 3} ${my - 2} ${L - 2} ${my + 1} ${L} ${my + 2}`} />
      <path d={`M${R + 2} ${my - 5} C${R + 3} ${my - 2} ${R + 2} ${my + 1} ${R} ${my + 2}`} />
    </g>
  );
}

export function Mouth({ g, base, expr }) {
  const mx = g.mouthX, my = g.mouthY, w = g.mouthW, L = mx - w / 2, R = mx + w / 2;
  if (expr === 'happy') return (
    <g>
      <path d={`M${L} ${my - 2} C${L + 8} ${my + 2} ${R - 8} ${my + 2} ${R} ${my - 3} C${R - 3} ${my + 11} ${L + 3} ${my + 12} ${L} ${my - 2} Z`} fill={MOUTH_DARK} {...S} strokeWidth="2.4" />
      <path d={`M${L + 3} ${my} C${L + 10} ${my + 2.6} ${R - 10} ${my + 2.6} ${R - 3} ${my - 0.6} L${R - 4.5} ${my + 3} C${R - 10} ${my + 5.5} ${L + 10} ${my + 5.5} ${L + 4.5} ${my + 3.5} Z`} fill="#fff" />
      <Creases L={L} R={R} my={my} />
    </g>
  );
  if (expr === 'angry') return (
    <g>
      <path d={`M${L} ${my} C${L + 6} ${my - 4} ${R - 6} ${my - 4} ${R} ${my} C${R - 4} ${my + 7.5} ${L + 4} ${my + 7.5} ${L} ${my} Z`} fill="#fff" {...S} strokeWidth="2.4" />
      <path d={`M${L + 2} ${my + 1.5} C${mx - 4} ${my + 0.5} ${mx + 4} ${my + 0.5} ${R - 2} ${my + 1.5}`} fill="none" {...S} strokeWidth="1.3" />
      {[-0.28, 0, 0.28].map((u) => <path key={u} d={`M${mx + u * w} ${my - 2.4} L${mx + u * w} ${my + 4.8}`} {...S} strokeWidth="1.2" />)}
    </g>
  );
  if (expr === 'worried') return (
    <path d={`M${L + 1} ${my + 2} C${L + 6} ${my - 3} ${mx - 3} ${my - 2} ${mx} ${my} C${mx + 3} ${my - 2} ${R - 6} ${my - 3} ${R - 1} ${my + 2} C${R - 5} ${my + 8} ${L + 5} ${my + 8} ${L + 1} ${my + 2} Z`} fill={MOUTH_DARK} {...S} strokeWidth="2.3" />
  );
  if (expr === 'smug') return (
    <g fill="none" {...S}>
      <path d={`M${L + 2} ${my + 2} C${mx - 4} ${my + 5} ${mx + 6} ${my + 3} ${R + 1} ${my - 5}`} strokeWidth="2.6" />
      <path d={`M${R - 1} ${my - 8} C${R + 3} ${my - 7} ${R + 3.5} ${my - 3} ${R + 1.5} ${my - 1}`} strokeWidth="1.4" />
    </g>
  );
  if (expr === 'surprised') return (
    <path d={`M${mx - 6} ${my} C${mx - 6.5} ${my - 6} ${mx + 5.5} ${my - 6.5} ${mx + 6} ${my + 1} C${mx + 6.5} ${my + 9} ${mx - 5.5} ${my + 9.5} ${mx - 6} ${my} Z`} fill={MOUTH_DARK} {...S} strokeWidth="2.4" />
  );
  // neutral — Rick: wide, flat, unimpressed. Morty: wobbly, anxious.
  if (base === 'rick') return (
    <g>
      <g fill="none" {...S}>
        <path d={`M${L} ${my + 1} C${L + 8} ${my + 3.5} ${R - 12} ${my - 1} ${R} ${my + 0.5}`} strokeWidth="2.6" />
        <path d={`M${mx - 7} ${my + 5.5} C${mx - 2} ${my + 7.5} ${mx + 3} ${my + 6.5} ${mx + 7} ${my + 5}`} strokeWidth="1.6" />
      </g>
      <Creases L={L} R={R} my={my} />
      <g className="rick-drool">
        <path d={`M${mx - 4} ${my + 7} C${mx - 6.5} ${my + 10} ${mx - 6} ${my + 13.5} ${mx - 3} ${my + 14} C${mx - 0.5} ${my + 13.5} ${mx - 1} ${my + 10} ${mx - 3} ${my + 7} Z`} fill="#b5d988" {...S} strokeWidth="1.3" />
        <path d={`M${mx + 3.5} ${my + 8} C${mx + 1} ${my + 11} ${mx + 1.5} ${my + 14.5} ${mx + 4} ${my + 15} C${mx + 6.5} ${my + 14.5} ${mx + 6} ${my + 11} ${mx + 4} ${my + 8} Z`} fill="#b5d988" {...S} strokeWidth="1.3" />
      </g>
    </g>
  );
  return (
    <g fill="none" {...S}>
      <path d={`M${L} ${my + 1.5} C${L + 5} ${my - 2.5} ${mx - 5} ${my - 1.5} ${mx} ${my + 0.5} C${mx + 5} ${my + 2.5} ${R - 5} ${my - 2.5} ${R} ${my + 1}`} strokeWidth="2.6" />
      <path d={`M${mx - 4} ${my + 5} C${mx - 1} ${my + 6} ${mx + 2} ${my + 6} ${mx + 4} ${my + 5}`} strokeWidth="1.4" />
    </g>
  );
}
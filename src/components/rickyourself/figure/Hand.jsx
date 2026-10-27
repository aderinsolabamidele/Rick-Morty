import React from 'react';
import { INK } from './constant';

// Cartoon mitten hand hanging at the wrist (x, y); s = side the thumb points to.
export default function Hand({ x, y, s, skin }) {
  return (
    <g>
      <path
        d={`M${x + s * 5} ${y - 2} C${x + s * 12} ${y} ${x + s * 13} ${y + 6} ${x + s * 8} ${y + 9} C${x + s * 6} ${y + 6} ${x + s * 5} ${y + 3} ${x + s * 5} ${y - 2} Z`}
        fill={skin} stroke={INK} strokeWidth="2.2" strokeLinejoin="round"
      />
      <path
        d={`M${x - 7} ${y - 5} C${x - 9} ${y + 2} ${x - 8} ${y + 9} ${x - 5} ${y + 13} C${x - 2} ${y + 16.5} ${x + 3} ${y + 16.5} ${x + 6} ${y + 12} C${x + 8} ${y + 7} ${x + 8} ${y + 1} ${x + 7} ${y - 5} Z`}
        fill={skin} stroke={INK} strokeWidth="2.4" strokeLinejoin="round"
      />
      <path
        d={`M${x - 2} ${y + 7} C${x - 2} ${y + 10} ${x - 2.2} ${y + 12} ${x - 2.6} ${y + 14.5} M${x + 2} ${y + 7} C${x + 2} ${y + 10} ${x + 2.2} ${y + 12} ${x + 2} ${y + 14.5}`}
        stroke={INK} strokeWidth="1.3" fill="none" strokeLinecap="round"
      />
    </g>
  );
}

// Mechanical claw used by the MECH ARM feature.
export function Claw({ x, y }) {
  return (
    <path
      d={`M${x - 7} ${y - 4} L${x + 7} ${y - 4} C${x + 7} ${y} ${x + 6} ${y + 4} ${x + 6} ${y + 6} L${x + 9} ${y + 14} L${x + 3} ${y + 12} L${x} ${y + 6} L${x - 3} ${y + 12} L${x - 9} ${y + 14} L${x - 6} ${y + 6} C${x - 6} ${y + 4} ${x - 7} ${y} ${x - 7} ${y - 4} Z`}
      fill="#64748b" stroke={INK} strokeWidth="2.2" strokeLinejoin="round"
    />
  );
}
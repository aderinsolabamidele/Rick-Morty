import React from 'react';
import { INK } from './constant';
import { HAIR } from './hairShapes';

// Refit a style from its authoring frame onto the active head. Back hair is
// width-clamped so volume stays believable on very wide / narrow heads.
const fit = (frame, g, clamp) => {
  let sx = g.hw / frame.hw;
  if (clamp) sx = Math.min(1.3, Math.max(0.75, sx));
  const sy = g.hh / frame.hh;
  return `translate(${g.cx} ${g.top}) scale(${sx} ${sy}) translate(${-frame.cx} ${-frame.top})`;
};

const fill = (color) => ({
  fill: color, stroke: INK, strokeWidth: 2.6, strokeLinejoin: 'round', vectorEffect: 'non-scaling-stroke',
});

export function HairBack({ c, g }) {
  const h = HAIR[c.hair.style];
  if (!h || !h.back.length) return null;
  return <g transform={fit(h.frame, g, true)}>{h.back.map((d) => <path key={d} d={d} {...fill(c.hair.color)} />)}</g>;
}

export function HairFront({ c, g }) {
  const h = HAIR[c.hair.style];
  if (!h || !h.front.length) return null;
  return (
    <g transform={fit(h.frame, g, false)}>
      {h.front.map((d) => <path key={d} d={d} {...fill(c.hair.color)} />)}
      {h.strands.map((d) => (
        <path key={d} d={d} fill="none" stroke={INK} strokeWidth="1.4" opacity="0.35" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      ))}
    </g>
  );
}
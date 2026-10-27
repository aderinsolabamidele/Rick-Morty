import React from 'react';
import { INK, LIDS, LIDDED_STYLES } from './constant';

// Slightly irregular eye contour (not a perfect ellipse).
export const eyePath = (cx, cy, rx, ry) =>
  `M${cx - rx} ${cy + 0.5} C${cx - rx} ${cy - ry * 0.6} ${cx - rx * 0.55} ${cy - ry} ${cx + 0.6} ${cy - ry} C${cx + rx * 0.62} ${cy - ry} ${cx + rx} ${cy - ry * 0.5} ${cx + rx} ${cy + 0.3} C${cx + rx} ${cy + ry * 0.62} ${cx + rx * 0.5} ${cy + ry} ${cx - 0.4} ${cy + ry} C${cx - rx * 0.6} ${cy + ry} ${cx - rx} ${cy + ry * 0.58} ${cx - rx} ${cy + 0.5} Z`;

export function Pupil({ x, y, r, style, color }) {
  if (style === 'none') return null;
  const iris = color !== INK ? <circle cx={x} cy={y} r={r * 2} fill={color} stroke={INK} strokeWidth="0.8" /> : null;
  let p = <circle cx={x} cy={y} r={r} fill={INK} />;
  if (style === 'slit') p = <ellipse cx={x} cy={y} rx={r * 0.55} ry={r * 2} fill={INK} />;
  if (style === 'cross') p = <path d={`M${x - r * 1.8} ${y} L${x + r * 1.8} ${y} M${x} ${y - r * 1.8} L${x} ${y + r * 1.8}`} stroke={INK} strokeWidth={Math.max(1.2, r * 0.6)} strokeLinecap="round" />;
  if (style === 'star') p = <path d={`M${x} ${y - r * 2} L${x + r * 0.5} ${y - r * 0.5} L${x + r * 2} ${y} L${x + r * 0.5} ${y + r * 0.5} L${x} ${y + r * 2} L${x - r * 0.5} ${y + r * 0.5} L${x - r * 2} ${y} L${x - r * 0.5} ${y - r * 0.5} Z`} fill={INK} />;
  return <g>{iris}{p}</g>;
}

function eyeList(style, g, species) {
  const { eyeL, eyeR, eyeY, erx, ery } = g;
  if (style === 'one') return [{ cx: g.cx, cy: eyeY, rx: erx * 1.5, ry: ery * 1.4, side: -1, k: 1.4 }];
  if (style === 'compound') {
    const out = [];
    [[eyeL, -1], [eyeR, 1]].forEach(([x, s]) =>
      [[-0.48, 0.25], [0.48, 0.25], [0, -0.5]].forEach(([u, v]) =>
        out.push({ cx: x + u * erx, cy: eyeY + v * ery, rx: erx * 0.46, ry: ery * 0.46, side: s, k: 0.5 })));
    return out;
  }
  const [mx, my] = style === 'oval' ? [0.82, 1.15] : style === 'wide' ? [1.18, 0.85] : [1, 1];
  const big = species === 'mutant' ? 1.28 : 1;
  return [
    { cx: eyeL, cy: eyeY, rx: erx * mx, ry: ery * my, side: -1, k: 1 },
    { cx: eyeR + (big > 1 ? 1.5 : 0), cy: eyeY + (big > 1 ? 1 : 0), rx: erx * mx * big, ry: ery * my * big, side: 1, k: big },
  ];
}

function Eye({ id, e, lid, skin, pupil, color, g, base, robot }) {
  const { cx, cy, rx, ry, side, k } = e;
  const d = eyePath(cx, cy, rx, ry);
  const x1 = cx + side * (rx + 1), x2 = cx - side * (rx + 1);
  // Subtle asymmetry: Rick's left eye (side -1) sits a touch lower / more closed
  const asym = base === 'rick' && side === -1 ? -0.05 : 0;
  const y1 = lid ? cy + (lid.o + asym) * ry : 0, y2 = lid ? cy + (lid.i + asym) * ry : 0;
  const lidCurve = `M${x1} ${y1} Q${cx} ${(y1 + y2) / 2 + ry * 0.22} ${x2} ${y2}`;
  const px = cx - side * rx * 0.1;
  const py = cy + g.pdy * k + (lid && lid.o > -0.5 ? ry * 0.12 : 0);
  return (
    <g>
      {robot && <path d={d} fill="none" stroke="#94a3b8" strokeWidth="5" />}
      <clipPath id={id}><path d={d} /></clipPath>
      <path d={d} fill="#fff" />
      <g clipPath={`url(#${id})`}>
        <Pupil x={px} y={py} r={g.pr * k} style={pupil} color={color} />
        {lid && <path d={`${lidCurve} L${x2} ${cy - ry - 3} L${x1} ${cy - ry - 3} Z`} fill={skin} />}
        {lid && <path d={lidCurve} fill="none" stroke={INK} strokeWidth="2.3" strokeLinecap="round" />}
        {lid?.low && <path d={`M${cx - rx - 1} ${cy + ry * 0.5} Q${cx} ${cy + ry * 0.05} ${cx + rx + 1} ${cy + ry * 0.5} L${cx + rx + 1} ${cy + ry + 3} L${cx - rx - 1} ${cy + ry + 3} Z`} fill={skin} stroke={INK} strokeWidth="1.8" />}
      </g>
      <path d={d} fill="none" stroke={INK} strokeWidth={base === 'morty' ? 2.4 : 2.1} strokeLinejoin="round" />
      {base === 'morty' && k >= 1 && (
        <path d={`M${cx - rx * 0.75} ${cy - ry - 2.2} Q${cx} ${cy - ry - 5} ${cx + rx * 0.75} ${cy - ry - 2.2}`} fill="none" stroke={INK} strokeWidth="1.3" opacity="0.4" strokeLinecap="round" />
      )}
    </g>
  );
}

function Visor({ g, color }) {
  const { eyeL, eyeR, eyeY, erx, ery, cx } = g;
  const l = eyeL - erx - 6, r = eyeR + erx + 6, t = eyeY - ery * 0.75, b = eyeY + ery * 0.7;
  return (
    <g>
      <path d={`M${l} ${t + 2} C${cx - 10} ${t - 2} ${cx + 10} ${t - 2} ${r} ${t + 1} C${r + 2} ${eyeY} ${r + 1} ${b - 2} ${r - 1} ${b} C${cx + 10} ${b + 2} ${cx - 10} ${b + 2} ${l + 1} ${b} C${l - 1} ${b - 3} ${l - 2} ${t + 5} ${l} ${t + 2} Z`} fill="#1e293b" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
      <path d={`M${l + 5} ${eyeY - 1} C${cx - 10} ${eyeY - 3} ${cx + 10} ${eyeY - 3} ${r - 5} ${eyeY - 1}`} stroke={color === INK ? '#22d3ee' : color} strokeWidth={ery * 0.45} strokeLinecap="round" fill="none" opacity="0.9" />
    </g>
  );
}

export default function Eyes({ c, g, base }) {
  const { style, color, pupil } = c.eyes;
  if (style === 'visor') return <Visor g={g} color={color} />;
  const lid = LIDDED_STYLES.includes(style) ? LIDS[base][c.expression] : null;
  return (
    <g>
      {eyeList(style, g, c.species).map((e, i) => (
        <Eye key={i} id={`cf-eye-${i}`} e={e} lid={lid} skin={c.skin} pupil={pupil} color={color} g={g} base={base} robot={c.species === 'robot'} />
      ))}
    </g>
  );
}
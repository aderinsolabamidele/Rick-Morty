import React from 'react';
import { INK } from './constant';

const LINE = { stroke: INK, strokeLinejoin: 'round', strokeLinecap: 'round' };

function Ear({ fx, y, s, k, species, skin }) {
  const X = (dx) => fx + s * dx * k;
  const Y = (dy) => y + dy * k;
  if (species === 'robot') return (
    <g>
      <circle cx={X(3)} cy={y} r={7.5 * k} fill="#94a3b8" stroke={INK} strokeWidth="2.4" />
      <circle cx={X(3)} cy={y} r={2.6 * k} fill="#475569" />
    </g>
  );
  if (species === 'alien') return (
    <g>
      <path d={`M${X(-2)} ${Y(-6)} C${X(8)} ${Y(-14)} ${X(17)} ${Y(-24)} ${X(22)} ${Y(-31)} C${X(17)} ${Y(-15)} ${X(11)} ${Y(4)} ${X(-2)} ${Y(9)} Z`} fill={skin} {...LINE} strokeWidth="2.4" />
      <path d={`M${X(2)} ${Y(-3)} C${X(8)} ${Y(-9)} ${X(13)} ${Y(-16)} ${X(16)} ${Y(-22)}`} fill="none" {...LINE} strokeWidth="1.3" />
    </g>
  );
  return (
    <g>
      <path d={`M${X(-2)} ${Y(-9)} C${X(6)} ${Y(-12)} ${X(11)} ${Y(-2)} ${X(8)} ${Y(6)} C${X(6)} ${Y(11)} ${X(1)} ${Y(12)} ${X(-3)} ${Y(8)} Z`} fill={skin} {...LINE} strokeWidth="2.4" />
      <path d={`M${X(1)} ${Y(-4)} C${X(5)} ${Y(-2)} ${X(5)} ${Y(4)} ${X(2)} ${Y(6)}`} fill="none" {...LINE} strokeWidth="1.4" />
    </g>
  );
}

export function Ears({ c, g }) {
  return (
    <g>
      <Ear fx={g.faceL} y={g.earY} s={-1} k={g.earK} species={c.species} skin={c.skin} />
      <Ear fx={g.faceR} y={g.earY + 1} s={1} k={g.earK} species={c.species} skin={c.skin} />
    </g>
  );
}

// Species traits that sit behind the face (growths, creature ears).
export function HeadBack({ c, g }) {
  const { cx, top, hw } = g;
  if (c.species === 'mutant') return (
    <path d={`M${cx - hw * 0.85} ${top + 26} C${cx - hw * 1.25} ${top + 8} ${cx - hw * 0.9} ${top - 14} ${cx - hw * 0.35} ${top - 6} C${cx - hw * 0.2} ${top} ${cx - hw * 0.3} ${top + 12} ${cx - hw * 0.5} ${top + 18} Z`} fill={c.skin} {...LINE} strokeWidth="2.6" />
  );
  if (c.species === 'original') return (
    <g>
      {[-1, 1].map((s) => {
        const X = (u) => cx + s * hw * u;
        return (
          <g key={s}>
            <path d={`M${X(0.25)} ${top + 10} C${X(0.35)} ${top - 4} ${X(0.6)} ${top - 16} ${X(0.85)} ${top - 24} C${X(0.95)} ${top - 10} ${X(0.95)} ${top + 6} ${X(0.85)} ${top + 20} Z`} fill={c.skin} {...LINE} strokeWidth="2.6" />
            <path d={`M${X(0.45)} ${top + 6} C${X(0.55)} ${top - 4} ${X(0.7)} ${top - 10} ${X(0.8)} ${top - 14} C${X(0.84)} ${top - 4} ${X(0.82)} ${top + 6} ${X(0.76)} ${top + 12} Z`} fill="#f9a8d4" opacity="0.7" />
          </g>
        );
      })}
    </g>
  );
  return null;
}

// Face fill + a soft cel-shadow along one side, clipped to the face.
export function Face({ c, g }) {
  const { faceR, faceL, top, hh, cx, hw, chinY } = g;
  return (
    <g>
      <clipPath id="cf-face"><path d={g.face} /></clipPath>
      <path d={g.face} fill={c.skin} />
      {/* cel-shaded side shadow */}
      <path clipPath="url(#cf-face)" d={`M${faceR - 12} ${top + 8} C${faceR + 2} ${top + hh * 0.35} ${faceR} ${top + hh * 0.75} ${cx + hw * 0.45} ${chinY - 2} L${faceR + 20} ${chinY + 10} L${faceR + 20} ${top - 10} Z`} fill={INK} opacity="0.1" />
      {/* cel-shaded forehead shadow under hairline */}
      <path clipPath="url(#cf-face)" d={`M${faceL - 4} ${top + 2} C${cx - 4} ${top + 10} ${cx + 6} ${top + 8} ${faceR + 4} ${top + 2} L${faceR + 4} ${top + 16} L${faceL - 4} ${top + 16} Z`} fill={INK} opacity="0.07" />
      <path d={g.face} fill="none" {...LINE} strokeWidth="3.2" />
    </g>
  );
}
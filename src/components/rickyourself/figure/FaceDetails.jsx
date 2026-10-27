import React from 'react';
import { INK } from './constant';

const S = { stroke: INK, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };

function Nose({ g, base, species }) {
  const { cx, eyeY: ey } = g;
  if (species === 'alien') {
    const y = base === 'rick' ? ey + 28 : ey + 16;
    return (
      <g {...S} strokeWidth="1.8">
        <path d={`M${cx - 3} ${y} C${cx - 4.5} ${y + 2} ${cx - 4.5} ${y + 3} ${cx - 3} ${y + 4.5}`} />
        <path d={`M${cx + 3} ${y} C${cx + 4.5} ${y + 2} ${cx + 4.5} ${y + 3} ${cx + 3} ${y + 4.5}`} />
      </g>
    );
  }
  if (base === 'rick') return (
    <path d={`M${cx - 1} ${ey + 1} C${cx - 3} ${ey + 12} ${cx - 8} ${ey + 21} ${cx - 6} ${ey + 28} C${cx - 4} ${ey + 33} ${cx + 3} ${ey + 34} ${cx + 7} ${ey + 30} C${cx + 9} ${ey + 27} ${cx + 7} ${ey + 24} ${cx + 3} ${ey + 24}`} {...S} strokeWidth="2.2" />
  );
  return (
    <path d={`M${cx - 1} ${ey + 9} C${cx - 5.5} ${ey + 13} ${cx - 5.5} ${ey + 19} ${cx} ${ey + 20} C${cx + 3.5} ${ey + 20.5} ${cx + 4.5} ${ey + 18} ${cx + 3} ${ey + 16}`} {...S} strokeWidth="2.1" />
  );
}

// Rick's age lines: double eye bags, nose-to-mouth folds, chin crease.
function Wrinkles({ g }) {
  const { eyeL, eyeR, eyeY: y, erx: rx, ery: ry, mouthX: mx, mouthY: my, mouthW: w, chinY } = g;
  return (
    <g {...S}>
      {[eyeL, eyeR].map((x) => (
        <g key={x}>
          <path d={`M${x - rx + 1} ${y + ry + 2.5} C${x - rx * 0.4} ${y + ry + 5} ${x + rx * 0.4} ${y + ry + 5} ${x + rx - 1} ${y + ry + 2.5}`} strokeWidth="1.5" opacity="0.7" />
          <path d={`M${x - rx * 0.5} ${y + ry + 6.5} C${x - rx * 0.2} ${y + ry + 7.5} ${x + rx * 0.2} ${y + ry + 7.5} ${x + rx * 0.5} ${y + ry + 6.5}`} strokeWidth="1.2" opacity="0.5" />
        </g>
      ))}
      <path d={`M${mx - w * 0.42} ${my - 12} C${mx - w * 0.56} ${my - 6} ${mx - w * 0.58} ${my} ${mx - w * 0.56} ${my + 4}`} strokeWidth="1.4" opacity="0.6" />
      <path d={`M${mx + w * 0.44} ${my - 12} C${mx + w * 0.58} ${my - 6} ${mx + w * 0.6} ${my} ${mx + w * 0.58} ${my + 4}`} strokeWidth="1.4" opacity="0.6" />
      <path d={`M${mx - 5} ${chinY - 7} C${mx - 2} ${chinY - 5} ${mx + 3} ${chinY - 5} ${mx + 6} ${chinY - 7}`} strokeWidth="1.3" opacity="0.6" />
    </g>
  );
}

function SpeciesMarks({ c, g }) {
  const { faceL, faceR, cx, hw, top, browY, cheekY, mouthX: mx, mouthY: my, mouthW: w } = g;
  if (c.species === 'alien') return (
    <g fill={INK} opacity="0.18">
      <ellipse cx={faceL + hw * 0.28} cy={cheekY} rx={hw * 0.07} ry={hw * 0.05} />
      <ellipse cx={faceL + hw * 0.42} cy={cheekY + 6} rx={hw * 0.05} ry={hw * 0.04} />
      <ellipse cx={faceR - hw * 0.3} cy={cheekY + 2} rx={hw * 0.06} ry={hw * 0.045} />
    </g>
  );
  if (c.species === 'mutant') {
    const x = faceR - hw * 0.32, y = cheekY + 2;
    return (
      <g>
        <path d={`M${x - 6} ${y + 2} C${x - 7} ${y - 6} ${x + 5} ${y - 8} ${x + 6} ${y} C${x + 6} ${y + 5} ${x - 5} ${y + 7} ${x - 6} ${y + 2} Z`} fill={c.skin} stroke={INK} strokeWidth="1.8" />
        <path d={`M${x - 6} ${y + 2} C${x - 7} ${y - 6} ${x + 5} ${y - 8} ${x + 6} ${y} C${x + 6} ${y + 5} ${x - 5} ${y + 7} ${x - 6} ${y + 2} Z`} fill={INK} opacity="0.12" />
        <path d={`M${mx + w * 0.4} ${my + 2} C${mx + w * 0.43} ${my + 8} ${mx + w * 0.37} ${my + 12} ${mx + w * 0.4} ${my + 15}`} stroke="#bfe9f5" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>
    );
  }
  if (c.species === 'robot') return (
    <g>
      <path d={`M${faceL + 2} ${browY - 7} C${cx - hw * 0.45} ${browY - 12} ${cx + hw * 0.45} ${browY - 12} ${faceR - 2} ${browY - 7}`} {...S} strokeWidth="1.5" opacity="0.55" />
      <path d={`M${faceL + 5} ${my - 7} L${mx - w * 0.62} ${my + 1} M${faceR - 5} ${my - 7} L${mx + w * 0.62} ${my + 1}`} {...S} strokeWidth="1.5" opacity="0.55" />
      {[[faceL + 6, browY - 13], [faceR - 6, browY - 13], [cx, top + 8]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.7" fill="#475569" />)}
    </g>
  );
  if (c.species === 'original') return (
    <g {...S} strokeWidth="1.3" opacity="0.8">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path d={`M${mx - w * 0.6} ${my - 6 + i * 3} Q${mx - w} ${my - 9 + i * 4} ${faceL - 8} ${my - 12 + i * 6}`} />
          <path d={`M${mx + w * 0.6} ${my - 6 + i * 3} Q${mx + w} ${my - 9 + i * 4} ${faceR + 8} ${my - 12 + i * 6}`} />
        </g>
      ))}
    </g>
  );
  return null;
}

export default function FaceDetails({ c, g, base }) {
  return (
    <g>
      <Nose g={g} base={base} species={c.species} />
      {base === 'rick' && <Wrinkles g={g} />}
      <SpeciesMarks c={c} g={g} />
    </g>
  );
}
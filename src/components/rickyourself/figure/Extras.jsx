import React from 'react';
import { INK } from './constant';
import { eyePath, Pupil } from './Eyes';

const LINE = { stroke: INK, strokeLinejoin: 'round', strokeLinecap: 'round' };
const glow = (c) => (c.eyes.color === INK ? '#bef264' : c.eyes.color);

export function Accessory({ c, g }) {
  const { cx, top, hw, eyeL, eyeR, eyeY, erx, ery, faceL, faceR, earY } = g;
  const a = c.accessory;
  if (a === 'goggles') {
    const rr = Math.max(erx, ery) + 3.5;
    const rim = (x) => `M${x - rr} ${eyeY} C${x - rr} ${eyeY - rr * 0.95} ${x + rr * 0.9} ${eyeY - rr} ${x + rr} ${eyeY} C${x + rr} ${eyeY + rr * 0.95} ${x - rr * 0.9} ${eyeY + rr} ${x - rr} ${eyeY} Z`;
    return (
      <g>
        <path d={`M${faceL - 1} ${eyeY - 1} L${eyeL - rr} ${eyeY} M${eyeR + rr} ${eyeY} L${faceR + 1} ${eyeY - 1}`} {...LINE} strokeWidth="4" />
        {[eyeL, eyeR].map((x) => (
          <g key={x}>
            <path d={rim(x)} fill="rgba(34,211,238,0.22)" stroke="#334155" strokeWidth="4" />
            <path d={rim(x)} fill="none" {...LINE} strokeWidth="1.2" />
          </g>
        ))}
      </g>
    );
  }
  if (a === 'antenna') return (
    <g>
      <path d={`M${cx + hw * 0.25} ${top + 6} C${cx + hw * 0.3} ${top - 6} ${cx + hw * 0.2} ${top - 14} ${cx + hw * 0.3} ${top - 24}`} fill="none" {...LINE} strokeWidth="2.4" />
      <circle cx={cx + hw * 0.3} cy={top - 26} r="3.6" fill={glow(c)} stroke={INK} strokeWidth="1.8" />
    </g>
  );
  if (a === 'headphones') {
    const cup = (x, s) => `M${x - s * 6} ${earY - 11} C${x + s * 5} ${earY - 13} ${x + s * 7} ${earY + 11} ${x - s * 5} ${earY + 12} C${x - s * 11} ${earY + 8} ${x - s * 11} ${earY - 7} ${x - s * 6} ${earY - 11} Z`;
    return (
      <g>
        <path d={`M${faceL - 3} ${earY - 4} C${faceL - 8} ${top - 12} ${faceR + 8} ${top - 12} ${faceR + 3} ${earY - 4}`} fill="none" {...LINE} strokeWidth="6" />
        <path d={`M${faceL - 3} ${earY - 4} C${faceL - 8} ${top - 12} ${faceR + 8} ${top - 12} ${faceR + 3} ${earY - 4}`} fill="none" stroke="#475569" strokeWidth="3" />
        <path d={cup(faceL - 1, 1)} fill="#1f2937" {...LINE} strokeWidth="2.2" />
        <path d={cup(faceR + 1, -1)} fill="#1f2937" {...LINE} strokeWidth="2.2" />
      </g>
    );
  }
  if (a === 'crown') return (
    <path d={`M${cx - hw * 0.55} ${top - 2} L${cx - hw * 0.62} ${top - 20} L${cx - hw * 0.3} ${top - 10} L${cx} ${top - 26} L${cx + hw * 0.3} ${top - 10} L${cx + hw * 0.62} ${top - 20} L${cx + hw * 0.55} ${top - 2} C${cx + hw * 0.2} ${top + 2} ${cx - hw * 0.2} ${top + 2} ${cx - hw * 0.55} ${top - 2} Z`} fill="#facc15" {...LINE} strokeWidth="2.4" />
  );
  if (a === 'cyber') return (
    <g>
      <path d={`M${eyeR - erx - 4} ${eyeY - ery - 4} C${eyeR} ${eyeY - ery - 7} ${eyeR + erx + 6} ${eyeY - ery - 4} ${eyeR + erx + 5} ${eyeY} C${eyeR + erx + 6} ${eyeY + ery + 4} ${eyeR} ${eyeY + ery + 6} ${eyeR - erx - 4} ${eyeY + ery + 3} Z`} fill="#334155" {...LINE} strokeWidth="2.4" />
      <circle cx={eyeR + 1} cy={eyeY} r={erx * 0.6} fill="#f43f5e" stroke={INK} strokeWidth="1.4" />
      <circle cx={eyeR + 2.5} cy={eyeY - 2} r={erx * 0.16} fill="#fff" />
    </g>
  );
  return null;
}

export function HeadFeature({ c, g }) {
  const { cx, top, hw, browY, erx, ery, chinY } = g;
  const f = c.feature;
  if (f === 'extra-eyes') {
    const y = browY - 13, rx = erx * 0.72, ry = ery * 0.72;
    return (
      <g>
        <path d={eyePath(cx, y, rx, ry)} fill="#fff" {...LINE} strokeWidth="2" />
        <Pupil x={cx} y={y + 0.5} r={g.pr * 0.8} style={c.eyes.pupil === 'none' ? 'dot' : c.eyes.pupil} color={c.eyes.color} />
      </g>
    );
  }
  if (f === 'antennae') return (
    <g>
      {[-1, 1].map((s) => (
        <g key={s}>
          <path d={`M${cx + s * hw * 0.3} ${top + 6} C${cx + s * hw * 0.4} ${top - 8} ${cx + s * hw * 0.6} ${top - 14} ${cx + s * hw * 0.72} ${top - 22}`} fill="none" {...LINE} strokeWidth="2.4" />
          <circle cx={cx + s * hw * 0.74} cy={top - 24} r="3.4" fill={glow(c)} stroke={INK} strokeWidth="1.8" />
        </g>
      ))}
    </g>
  );
  if (f === 'horns') return (
    <g>
      {[-1, 1].map((s) => {
        const X = (u) => cx + s * hw * u;
        return <path key={s} d={`M${X(0.55)} ${top + 12} C${X(0.75)} ${top - 4} ${X(0.9)} ${top - 14} ${X(1.05)} ${top - 18} C${X(0.7)} ${top - 14} ${X(0.4)} ${top - 2} ${X(0.3)} ${top + 10} Z`} fill="#f1f5f9" {...LINE} strokeWidth="2.2" />;
      })}
    </g>
  );
  if (f === 'tentacles') return (
    <g fill={c.skin} {...LINE} strokeWidth="2.2">
      <path d={`M${cx - 9} ${chinY - 6} C${cx - 15} ${chinY + 6} ${cx - 17} ${chinY + 16} ${cx - 11} ${chinY + 24} C${cx - 11} ${chinY + 14} ${cx - 7} ${chinY + 6} ${cx - 3} ${chinY - 3} Z`} />
      <path d={`M${cx - 2} ${chinY - 4} C${cx - 3} ${chinY + 8} ${cx} ${chinY + 20} ${cx + 3} ${chinY + 28} C${cx + 4} ${chinY + 18} ${cx + 4} ${chinY + 8} ${cx + 3} ${chinY - 4} Z`} />
      <path d={`M${cx + 9} ${chinY - 6} C${cx + 15} ${chinY + 6} ${cx + 17} ${chinY + 16} ${cx + 11} ${chinY + 24} C${cx + 11} ${chinY + 14} ${cx + 7} ${chinY + 6} ${cx + 3} ${chinY - 3} Z`} />
    </g>
  );
  return null;
}
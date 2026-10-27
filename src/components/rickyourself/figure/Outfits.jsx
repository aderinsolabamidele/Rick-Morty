import React from 'react';
import { INK } from './constant';

const LINE = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' };
const THIN = { stroke: INK, strokeWidth: 1.6, fill: 'none', strokeLinecap: 'round' };

// Open lab coat over the build's undershirt (Rick's signature look).
export function Coat({ B, oc }) {
  return (
    <g>
      <path d={B.coatL} fill={oc} {...LINE} />
      <path d={B.coatR} fill={oc} {...LINE} />
      {/* cel-shaded fold shadows on inner coat edges */}
      <path d="M97 160 C96 200 96 250 98 295 L102 295 C100 250 100 200 101 160 Z" fill="#d4d4d4" opacity="0.35" />
      <path d="M125 160 C126 200 126 250 124 295 L120 295 C122 250 122 200 121 160 Z" fill="#d4d4d4" opacity="0.35" />
      <path d={B.lapelL} fill={oc} {...LINE} strokeWidth="2.2" />
      <path d={B.lapelR} fill={oc} {...LINE} strokeWidth="2.2" />
      <path d={B.lapelL} fill={INK} opacity="0.06" />
      <path d={B.lapelR} fill={INK} opacity="0.06" />
      <path d={B.coatCollar} fill={oc} {...LINE} strokeWidth="2.2" />
      <path d={B.pen} fill="#facc15" {...LINE} strokeWidth="1.5" />
      <path d={B.pocket} {...THIN} strokeWidth="1.8" />
    </g>
  );
}

export function Jumpsuit({ B }) {
  return (
    <g>
      <path d={B.zipper} {...THIN} opacity="0.55" />
      <path d={B.belt} fill="#1f2937" {...LINE} strokeWidth="2" />
    </g>
  );
}

export function Armor({ B, oc }) {
  return (
    <g>
      {B.plates.map((d) => <path key={d} d={d} {...THIN} strokeWidth="2" opacity="0.6" />)}
      {B.pauldrons.map((d) => <path key={d} d={d} fill={oc} {...LINE} strokeWidth="2.6" />)}
      <path
        d={`M${B.emblem[0] - 6} ${B.emblem[1]} C${B.emblem[0] - 6} ${B.emblem[1] - 7} ${B.emblem[0] + 6} ${B.emblem[1] - 7} ${B.emblem[0] + 6} ${B.emblem[1]} C${B.emblem[0] + 6} ${B.emblem[1] + 6} ${B.emblem[0] - 6} ${B.emblem[1] + 7} ${B.emblem[0] - 6} ${B.emblem[1]} Z`}
        fill="#bef264" stroke={INK} strokeWidth="1.8"
      />
    </g>
  );
}

export function Robe({ B, oc }) {
  return (
    <g>
      <path d={B.robe} fill={oc} {...LINE} />
      <path d={B.collar} {...THIN} strokeWidth="2.2" />
      <path d={B.sash} {...THIN} strokeWidth="3" opacity="0.5" />
    </g>
  );
}
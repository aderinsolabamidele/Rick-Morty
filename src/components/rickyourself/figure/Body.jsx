import React from 'react';
import { INK, GEO } from './constant';
import { BODIES } from './bodyshape';
import Hand, { Claw } from './Hand';
import { Coat, Jumpsuit, Armor, Robe } from './Outfits';

const LINE = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' };
const THIN = { stroke: INK, strokeWidth: 1.5, fill: 'none', strokeLinecap: 'round' };

// Body per build: legs, shoes, arm sleeves, neck, torso + outfit, then hands
// last so they always poke out of the sleeves.
export default function Body({ c, base, animate = true }) {
  const B = BODIES[base];
  const g = GEO[base];
  const o = c.outfit;
  const oc = c.outfitColor;
  const legColor = o === 'jumpsuit' ? oc : o === 'armor' ? '#1f2937' : g.trousers;
  const armFill = o === 'casual' ? c.skin : o === 'armor' ? '#334155' : oc;
  const torsoFill = o === 'labcoat' ? g.shirt : oc;
  const mechL = c.feature === 'mech-arm';

  return (
    <g>
      <path d={B.legs} fill={legColor} {...LINE} />
      {B.legCreases.map((d) => <path key={d} d={d} {...THIN} opacity="0.35" />)}
      {B.shoes.map((d) => <path key={d} d={d} fill={g.shoes} {...LINE} strokeWidth="2.6" />)}
      {/* arm sleeves sit behind the torso */}
      <path d={B.armL} fill={mechL ? '#94a3b8' : armFill} {...LINE} />
      <path d={B.creaseL} {...THIN} opacity={mechL ? 0.9 : 0.4} />
      <path d={B.armR} fill={armFill} {...LINE} />
      <path d={B.creaseR} {...THIN} opacity="0.4" />
      <path d={B.neck} fill={c.skin} {...LINE} strokeWidth="2.6" />
      <path d={B.neckShadow} fill={INK} opacity="0.14" />
      {o === 'robe' ? <Robe B={B} oc={oc} /> : (
        <>
          <path d={B.torso} fill={torsoFill} {...LINE} />
          <path d={B.collar} {...THIN} strokeWidth="2.2" />
        </>
      )}
      {o === 'casual' && [B.sleeveL, B.sleeveR].map((d) => <path key={d} d={d} fill={oc} {...LINE} />)}
      {o === 'labcoat' && (
        <>
          {/* belt visible in the coat gap */}
          <path d="M83 264 C98 266 124 266 139 264 L139 272 C124 274 98 274 83 272 Z" fill="#5c4b3c" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <rect x="106" y="262" width="10" height="11" fill="#e9c54d" stroke={INK} strokeWidth="1.5" rx="1" />
        </>
      )}
      {o === 'labcoat' && (
        <g className={animate ? 'rick-coat-sway' : ''}>
          <Coat B={B} oc={oc} />
        </g>
      )}
      {o === 'jumpsuit' && <Jumpsuit B={B} />}
      {o === 'armor' && <Armor B={B} oc={oc} />}
      {/* hands on top of sleeves */}
      {mechL ? <Claw x={B.handL[0]} y={B.handL[1]} /> : <Hand x={B.handL[0]} y={B.handL[1]} s={1} skin={c.skin} />}
      <Hand x={B.handR[0]} y={B.handR[1]} s={-1} skin={c.skin} />
    </g>
  );
}
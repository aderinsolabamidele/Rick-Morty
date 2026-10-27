import React, { useEffect, useRef, useState } from 'react';
import { getCamera } from '@/lib/pointer';
import { getEnergyTarget } from '@/lib/energy';
import { isAtLeast } from '@/lib/animation/portalTimeline';

// ---- organic blob path: an irregular, asymmetrical oval built from sinusoidal harmonics ----
function blobPath(baseR, harm, cx = 100, cy = 100, segs = 160, squashY = 1) {
  let d = '';
  for (let i = 0; i <= segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    let r = baseR;
    for (let k = 0; k < harm.length; k += 3) r += baseR * harm[k] * Math.sin(harm[k + 1] * a + harm[k + 2]);
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r * squashY;
    d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
  }
  return d + 'Z';
}

// thick liquid spiral streak
function spiralPath(turns, startR, endR, offset = 0, cx = 100, cy = 100) {
  const steps = Math.max(2, Math.round(turns * 28));
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = offset + t * turns * Math.PI * 2;
    const r = startR + (endR - startR) * t;
    d += (i ? 'L' : 'M') + (cx + Math.cos(a) * r).toFixed(1) + ' ' + (cy + Math.sin(a) * r).toFixed(1) + ' ';
  }
  return d;
}

// harmonics as flat [amp, freq, phi, ...]
const BLOBS = [
  { d: blobPath(94, [0.06, 3, 0, 0.05, 5, 1.2, 0.04, 2, 2.1], 100, 100, 160, 0.97), cls: 'portal-rot-a' },
  { d: blobPath(84, [0.07, 4, 0.5, 0.05, 6, 2.0, 0.04, 3, 1.0]), cls: 'portal-rot-b' },
  { d: blobPath(70, [0.08, 5, 1.0, 0.06, 7, 0.4, 0.05, 2, 3.0]), cls: 'portal-rot-c' },
  { d: blobPath(52, [0.09, 6, 0.8, 0.07, 4, 2.2]), cls: 'portal-rot-d' },
  { d: blobPath(30, [0.10, 5, 0, 0.08, 8, 1.0]), cls: 'portal-breathe' },
];

const STREAKS = [
  { d: spiralPath(2.4, 8, 86, 0), cls: 'portal-rot-a' },
  { d: spiralPath(2.4, 8, 86, Math.PI * 0.66), cls: 'portal-rot-c' },
  { d: spiralPath(2.0, 14, 80, 1.1), cls: 'portal-rot-d' },
];

const RIPPLES = [
  { d: blobPath(86, [0.05, 4, 0.4, 0.04, 6, 1.6]), cls: 'portal-rot-b' },
  { d: blobPath(72, [0.06, 5, 1.2, 0.04, 3, 0.5]), cls: 'portal-rot-d' },
];

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})`; };

const DEFAULT_PALETTE = {
  core: '#f7fee7', slime: '#BEF264', mid: '#65a30d', deep: '#14532d',
  highlight: '#d9f99d', accent: '#22D3EE', particle: '#BEF264',
};

// Living liquid-green interdimensional portal. Layered translucent slime blobs
// (overlapping rotational flows) with churning, irregular displaced edges, a
// deep luminous core, liquid spiral streaks, fluid ripples, and a canvas of
// inward particles, outward splashes/droplets and flickering white sparks.
// Recolours per dimension via `palette`; surges on hover and activation.
export default function InterdimensionalPortal({ phase, palette }) {
  const pal = { ...DEFAULT_PALETTE, ...palette };
  const canvasRef = useRef(null);
  const palRef = useRef(pal); palRef.current = pal;
  const live = useRef({ phase }); live.current = { phase };
  const [reduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, parts = [], drops = [], sparks = [], raf, e = 0, mx = 0, my = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      if (!w || !h) return;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const spawn = (R) => ({
      a: Math.random() * Math.PI * 2, r: R * (0.8 + Math.random() * 0.32),
      s: 0.6 + Math.random() * 1.8, size: Math.random() * 2 + 0.5,
      hue: Math.random() < 0.8 ? 'p' : (Math.random() < 0.5 ? 'a' : 'w'),
      jit: (Math.random() - 0.5) * 0.04,
    });
    const spawnDrop = (R) => ({
      a: Math.random() * Math.PI * 2, r: R * (0.92 + Math.random() * 0.12),
      v: 0.4 + Math.random() * 1.1, life: 0, rate: 0.012 + Math.random() * 0.02,
      size: Math.random() * 2.4 + 0.8, oblong: Math.random() < 0.45 ? Math.random() * 2 + 1.4 : 1,
      hue: Math.random() < 0.7 ? 's' : 'h',
    });
    const spawnSpark = (R) => ({
      a: Math.random() * Math.PI * 2, r: R * (0.86 + Math.random() * 0.16),
      s: 0.25 + Math.random() * 0.9, size: Math.random() * 2.4 + 0.6,
      oblong: Math.random() < 0.4 ? Math.random() * 2.2 + 1.4 : 1,
      life: Math.random(), rate: 0.02 + Math.random() * 0.05, drift: (Math.random() - 0.5) * 0.02,
    });

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const col = (hue, alpha) => {
      const p = palRef.current;
      const c = hue === 'p' ? p.particle : hue === 'a' ? p.accent : hue === 'w' ? '#ffffff' : hue === 's' ? p.slime : p.highlight;
      return rgba(c, alpha);
    };

    const frame = () => {
      const p = live.current.phase;
      const active = isAtLeast(p, 'energy');
      e += (getEnergyTarget() - e) * 0.06;
      const cam = getCamera();
      mx += (cam.x - mx) * 0.05; my += (cam.y - my) * 0.05;
      const cx = w / 2 + mx * 6, cy = h / 2 + my * 6;
      const R = Math.min(w, h) * 0.46;
      if (R > 0) {
        const ptTarget = active ? 150 : 70;
        const dropTarget = active ? 60 : 26;
        const sparkTarget = active ? 60 : 28;
        while (parts.length < ptTarget) parts.push(spawn(R));
        if (parts.length > ptTarget) parts.length = ptTarget;
        while (drops.length < dropTarget) drops.push(spawnDrop(R));
        if (drops.length > dropTarget) drops.length = dropTarget;
        while (sparks.length < sparkTarget) sparks.push(spawnSpark(R));
        if (sparks.length > sparkTarget) sparks.length = sparkTarget;
        ctx.clearRect(0, 0, w, h);
        const swirl = active ? 2.0 : 1.2;
        // inward spiralling liquid particles
        for (const pt of parts) {
          pt.r -= pt.s * swirl * (1 + 26 / (pt.r + 18));
          pt.a += 0.014 * swirl + 0.4 / (pt.r + 50) + pt.jit;
          if (pt.r < R * 0.28) Object.assign(pt, spawn(R));
          const x = cx + Math.cos(pt.a) * pt.r, y = cy + Math.sin(pt.a) * pt.r;
          const alpha = Math.min(0.85, 0.08 + 38 / pt.r) * (0.5 + e * 0.5);
          ctx.fillStyle = col(pt.hue, alpha);
          ctx.fillRect(x, y, pt.size, pt.size);
        }
        // outward liquid splashes / droplets / wisps around the perimeter
        for (const d of drops) {
          d.life += d.rate;
          if (d.life > 1) { Object.assign(d, spawnDrop(R)); d.life = 0; }
          d.r += d.v * (0.5 + e * 0.8);
          d.v *= 0.965;
          d.a += 0.002;
          if (d.r > R * 1.25) Object.assign(d, spawnDrop(R));
          const x = cx + Math.cos(d.a) * d.r, y = cy + Math.sin(d.a) * d.r;
          const alpha = Math.sin(Math.min(1, d.life) * Math.PI) * (0.4 + e * 0.4);
          ctx.save(); ctx.translate(x, y); ctx.rotate(d.a);
          ctx.fillStyle = col(d.hue, alpha);
          if (d.oblong > 1) ctx.fillRect(-d.oblong, -d.size / 2, d.oblong * 2, d.size);
          else { ctx.beginPath(); ctx.arc(0, 0, d.size, 0, Math.PI * 2); ctx.fill(); }
          ctx.restore();
        }
        // white energy sparks flickering around the outer edge
        for (const sp of sparks) {
          sp.life += sp.rate;
          if (sp.life > 1) { Object.assign(sp, spawnSpark(R)); sp.life = 0; }
          sp.a += sp.drift;
          sp.r -= sp.s * (0.4 + e * 0.6);
          if (sp.r < R * 0.5) Object.assign(sp, spawnSpark(R));
          const x = cx + Math.cos(sp.a) * sp.r, y = cy + Math.sin(sp.a) * sp.r;
          const flick = 0.35 + 0.65 * Math.abs(Math.sin(sp.life * Math.PI * 2.2));
          ctx.save(); ctx.translate(x, y); ctx.rotate(sp.a);
          ctx.fillStyle = `rgba(255,255,255,${flick * (0.45 + e * 0.5)})`;
          if (sp.oblong > 1) ctx.fillRect(-sp.oblong, -sp.size / 2, sp.oblong * 2, sp.size);
          else { ctx.beginPath(); ctx.arc(0, 0, sp.size, 0, Math.PI * 2); ctx.fill(); }
          ctx.restore();
        }
      }
      raf = requestAnimationFrame(frame);
    };
    if (!reduced) frame(); else resize();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [reduced]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-[-16%] z-0">
      {/* deep vortex + ambient acid bloom (back) */}
      <div className="absolute inset-[28%] rounded-full" style={{ background: `radial-gradient(circle, ${rgba(pal.deep, 0.6)} 0%, ${rgba(pal.deep, 0.25)} 45%, transparent 75%)`, filter: 'blur(3px)' }} />
      <div className="absolute inset-[-6%] rounded-full" style={{ background: `radial-gradient(circle, ${rgba(pal.slime, 0.1)} 0%, transparent 62%)`, filter: 'blur(8px)' }} />

      <svg viewBox="0 0 200 200" className="portal-svg-wobble absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <filter id="portalLiquid" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.014 0.02" numOctaves="3" seed="7" result="t">
              {!reduced && <animate attributeName="baseFrequency" dur="16s" values="0.014 0.02; 0.02 0.028; 0.012 0.018; 0.014 0.02" repeatCount="indefinite" />}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="t" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="portalLiquid2" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.026" numOctaves="2" seed="19" result="t2" />
            <feDisplacementMap in="SourceGraphic" in2="t2" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <radialGradient id="portalCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={pal.core} stopOpacity="0.95" />
            <stop offset="30%" stopColor={pal.highlight} stopOpacity="0.7" />
            <stop offset="60%" stopColor={pal.slime} stopOpacity="0.25" />
            <stop offset="100%" stopColor={pal.slime} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* layered translucent liquid body  overlapping rotational flows, churning edges */}
        <g filter="url(#portalLiquid)">
          <g className={BLOBS[0].cls}><path d={BLOBS[0].d} fill={pal.deep} opacity="0.85" /></g>
          <g className={BLOBS[1].cls}><path d={BLOBS[1].d} fill={pal.slime} opacity="0.42" /></g>
          <g className={BLOBS[2].cls}><path d={BLOBS[2].d} fill={pal.mid} opacity="0.5" /></g>
          <g className={BLOBS[3].cls}><path d={BLOBS[3].d} fill={pal.highlight} opacity="0.45" /></g>
          <g className={BLOBS[4].cls}><path d={BLOBS[4].d} fill="url(#portalCore)" opacity="0.9" /></g>
        </g>

        {/* liquid spiral streaks + fluid ripples (static distortion) */}
        <g filter="url(#portalLiquid2)" fill="none" strokeLinecap="round">
          {STREAKS.map((s, i) => (
            <g key={i} className={s.cls}>
              <path d={s.d} stroke={i === 1 ? pal.accent : pal.slime} strokeWidth={i === 2 ? 2.4 : 3.2} opacity={i === 2 ? 0.4 : 0.5} />
            </g>
          ))}
          {RIPPLES.map((r, i) => (
            <g key={'r' + i} className={r.cls}>
              <path d={r.d} stroke={i === 0 ? pal.highlight : pal.accent} strokeWidth={i === 0 ? 1.2 : 0.9} opacity="0.35" />
            </g>
          ))}
        </g>
      </svg>

      {/* bright luminous core glow (front, additive) */}
      <div className="absolute inset-[34%] rounded-full" style={{ background: `radial-gradient(circle, ${rgba(pal.core, 0.85)} 0%, ${rgba(pal.highlight, 0.5)} 30%, transparent 70%)`, filter: 'blur(4px)', mixBlendMode: 'screen' }} />

      {/* liquid particle energy + splashes + white sparks */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* outer acid bloom */}
      <div className="absolute inset-[-10%] rounded-full" style={{ background: `radial-gradient(circle, transparent 55%, ${rgba(pal.slime, 0.08)} 70%, transparent 80%)`, filter: 'blur(6px)' }} />
    </div>
  );
}
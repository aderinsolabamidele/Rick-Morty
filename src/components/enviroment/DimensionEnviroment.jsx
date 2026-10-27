import React, { useEffect, useRef } from 'react';
import { rgba } from '@/lib/color';

// Distinct procedural environments per dimension: a sky gradient, terrain
// silhouettes, dimension-specific atmospheric particles, and lighting.
// Prop-driven (not store-driven) so it can be crossfaded and reused in the
// archive preview while keeping the previous dimension during transitions.
const TERRAIN = {
  c137: (t) => (
    <>
      <path d="M0 16 Q14 10 28 14 Q44 6 60 12 Q78 8 100 14 L100 30 L0 30 Z" fill={t.far} opacity="0.75" />
      <path d="M0 22 Q18 18 36 22 Q54 16 72 22 Q88 20 100 24 L100 30 L0 30 Z" fill={t.near} />
    </>
  ),
  cronenberg: (t) => (
    <>
      <path d="M0 18 q8 -8 16 -2 q8 6 16 -4 q10 -6 18 4 q8 6 16 -2 q10 -4 18 4 q8 4 16 -2 L100 30 L0 30 Z" fill={t.far} opacity="0.7" />
      <path d="M0 24 q10 -6 20 0 q8 4 16 -2 q10 -4 18 4 q8 4 16 -2 q10 -4 20 2 L100 30 L0 30 Z" fill={t.near} />
      <circle cx="22" cy="20" r="2" fill={t.accent} opacity="0.4" />
      <circle cx="64" cy="18" r="1.5" fill={t.accent} opacity="0.4" />
    </>
  ),
  frost: (t) => (
    <>
      <path d="M0 30 L8 14 L16 22 L26 8 L36 20 L46 10 L56 22 L66 6 L78 18 L88 12 L100 22 L100 30 Z" fill={t.far} opacity="0.8" />
      <path d="M26 8 L30 14 L22 14 Z M66 6 L70 12 L62 12 Z" fill={t.accent} opacity="0.5" />
      <path d="M0 26 L12 22 L24 26 L40 22 L56 26 L72 22 L88 26 L100 24 L100 30 L0 30 Z" fill={t.near} />
    </>
  ),
  wasteland: (t) => (
    <>
      <path d="M0 18 Q25 12 50 16 Q75 10 100 18 L100 30 L0 30 Z" fill={t.far} opacity="0.8" />
      <g fill={t.near}>
        <rect x="30" y="14" width="4" height="16" />
        <rect x="36" y="10" width="3" height="20" />
        <rect x="41" y="13" width="5" height="17" />
        <rect x="60" y="12" width="3" height="18" />
        <rect x="65" y="9" width="4" height="21" />
        <rect x="71" y="14" width="3" height="16" />
      </g>
      <path d="M0 24 Q25 20 50 24 Q75 18 100 24 L100 30 L0 30 Z" fill={t.near} opacity="0.9" />
      <circle cx="78" cy="8" r="4" fill={t.accent} opacity="0.5" />
    </>
  ),
  replacement: (t) => (
    <>
      <path d="M0 20 L10 12 L20 18 L32 10 L44 16 L56 8 L68 16 L80 10 L90 18 L100 14 L100 30 L0 30 Z" fill={t.accent} opacity="0.22" />
      <path d="M0 20 L10 12 L20 18 L32 10 L44 16 L56 8 L68 16 L80 10 L90 18 L100 14 L100 30 L0 30 Z" fill={t.far} opacity="0.5" transform="translate(3,0)" />
      <path d="M0 22 L12 16 L24 20 L38 14 L52 20 L66 14 L80 20 L92 16 L100 20 L100 30 L0 30 Z" fill={t.near} />
    </>
  ),
};

export default function DimensionEnvironment({ dimension: dim }) {
  const canvasRef = useRef(null);
  const dimRef = useRef(dim);
  dimRef.current = dim;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 640;
    let w = 0, h = 0, parts = [], raf, t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      if (!w || !h) return;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const make = () => {
      const cfg = dimRef.current.particle;
      const count = reduced ? 0 : (isMobile ? 24 : 60);
      return Array.from({ length: count }, () => {
        const base = { x: Math.random() * w, y: Math.random() * h, size: Math.random() * 2 + 0.6, ph: Math.random() * 6.28, c: cfg.color };
        if (cfg.type === 'snow') return { ...base, vy: 0.3 + Math.random() * 0.6, sway: 0.5 + Math.random() };
        if (cfg.type === 'spores') return { ...base, vy: -(0.1 + Math.random() * 0.3), amp: 0.6 + Math.random() * 0.8 };
        if (cfg.type === 'anomaly') return { ...base, vy: (Math.random() - 0.5) * 0.3, jit: 1 + Math.random() * 2 };
        return { ...base, vx: (Math.random() < 0.5 ? -1 : 1) * (0.1 + Math.random() * 0.3), vy: (Math.random() - 0.5) * 0.1 }; // dust
      });
    };

    resize();
    parts = make();
    const ro = new ResizeObserver(() => { resize(); parts = make(); });
    ro.observe(canvas);

    const frame = () => {
      t += 0.016;
      const cfg = dimRef.current.particle;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        let x = p.x, y = p.y;
        if (cfg.type === 'snow') { p.y += p.vy; x = p.x + Math.sin(t * 1.5 + p.ph) * p.sway; if (p.y > h) p.y = -4; }
        else if (cfg.type === 'spores') { p.y += p.vy; x = p.x + Math.sin(t * 0.8 + p.ph) * p.amp; if (p.y < -4) p.y = h + 4; }
        else if (cfg.type === 'anomaly') {
          p.y += p.vy; if (Math.random() < 0.02) p.x += (Math.random() - 0.5) * p.jit * 8;
          if (p.y < -4 || p.y > h + 4) p.y = Math.random() * h; if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        } else { p.x += p.vx; y = p.y + Math.sin(t * 0.5 + p.ph) * 0.6; if (p.x < -4) p.x = w + 4; if (p.x > w + 4) p.x = -4; }
        const a = 0.25 + 0.4 * Math.abs(Math.sin(t + p.ph));
        ctx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${a})`;
        ctx.fillRect(x, y, p.size, p.size);
      }
      raf = requestAnimationFrame(frame);
    };
    if (!reduced) frame();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* sky */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 28%, ${dim.sky[0]}, ${dim.sky[1]} 56%, ${dim.sky[2]} 100%)` }} />
      {/* atmospheric glow toward the portal */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 40%, ${rgba(dim.palette.accent, 0.1)}, transparent 55%)` }} />
      {/* terrain silhouettes */}
      <svg className="absolute inset-x-0 bottom-0 h-[38vh] w-full" viewBox="0 0 100 30" preserveAspectRatio="none">
        {TERRAIN[dim.env]?.(dim.terrain)}
      </svg>
      {/* atmospheric particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
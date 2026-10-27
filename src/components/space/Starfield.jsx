import React, { useEffect, useRef } from 'react';
import { getCamera } from '@/lib/pointer';
import { getEnergyTarget } from '@/lib/energy';
import { isAtLeast, STAR_WARP } from '@/lib/animation/portalTimeline';

export default function Starfield({ phase, origin, tint }) {
  const canvasRef = useRef(null);
  const live = useRef({ phase, origin, tint });
  live.current = { phase, origin, tint };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, stars = [], dust = [], energy = [], raf, warp = 0, mx = 0, my = 0, e = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(650, Math.floor((w * h) / 2600));
      stars = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.9 + 0.1, t: Math.random() * 6.28 }));
      dust = Array.from({ length: 36 }, () => ({ x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.5 + 0.1, t: Math.random() * 6.28 }));
    };
    const toEdge = (s) => {
      const side = (Math.random() * 4) | 0;
      s.x = side === 0 ? 0 : side === 1 ? w : Math.random() * w;
      s.y = side === 2 ? 0 : side === 3 ? h : Math.random() * h;
    };
    const spawn = () => ({ a: Math.random() * Math.PI * 2, r: Math.hypot(w, h) * (0.3 + Math.random() * 0.4), s: 1.5 + Math.random() * 3.5, size: Math.random() * 1.6 + 0.5 });

    resize();
    window.addEventListener('resize', resize);

    const frame = () => {
      const { phase: p, origin: o, tint: tc } = live.current;
      const ox = o?.x ?? w / 2, oy = o?.y ?? h / 2;
      const tcol = tc || [190, 242, 100];
      warp += ((STAR_WARP[p] ?? 0) - warp) * 0.04;
      e += (getEnergyTarget() - e) * 0.06;
      const cam = getCamera();
      mx += (cam.x - mx) * 0.05; my += (cam.y - my) * 0.05;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const dx = ox - s.x, dy = oy - s.y;
        if (!reduced) {
          s.x -= 0.03 * s.z;
          if (warp > 0.01) {
            const k = warp * 0.035 * s.z;
            s.x += dx * k; s.y += dy * k;
            if (Math.hypot(dx, dy) < 14) toEdge(s);
          }
          if (s.x < -10) s.x = w + 10;
        }
        s.t += 0.02;
        const x = s.x - mx * 18 * s.z, y = s.y - my * 12 * s.z;
        const alpha = (0.3 + 0.7 * s.z) * (0.75 + 0.25 * Math.sin(s.t));
        if (e > 0.1 && warp < 0.05) {
          const jx = (Math.random() - 0.5) * e * 2.5;
          const jy = (Math.random() - 0.5) * e * 2.5;
          ctx.fillStyle = `rgba(${tcol[0]},${tcol[1]},${tcol[2]},${alpha * (0.5 + e * 0.5)})`;
          ctx.fillRect(x + jx, y + jy, s.z * 1.5, s.z * 1.5);
          continue;
        }
        if (warp > 0.05) {
          const len = warp * 0.09 * s.z;
          ctx.strokeStyle = warp > 0.5 ? `rgba(${tcol[0]},${tcol[1]},${tcol[2]},${alpha})` : `rgba(165,243,252,${alpha})`;
          ctx.lineWidth = s.z * 1.2;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - dx * len, y - dy * len); ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(226,240,255,${alpha})`;
          ctx.fillRect(x, y, s.z * 1.5, s.z * 1.5);
        }
      }

      for (const dd of dust) {
        dd.t += 0.005;
        const x = dd.x - mx * 30 * dd.z + Math.sin(dd.t) * 6;
        const y = dd.y - my * 20 * dd.z;
        ctx.fillStyle = `rgba(148,163,184,${0.04 + dd.z * 0.05})`;
        ctx.fillRect(x, y, 1.5 + dd.z * 2, 1.5 + dd.z * 2);
      }

      const energyOn = isAtLeast(p, 'energy') && !reduced;
      if (energyOn && energy.length < 260) for (let i = 0; i < 6; i++) energy.push(spawn());
      if (!energyOn && energy.length) energy.length = Math.max(0, energy.length - 10);
      const accel = isAtLeast(p, 'particles') && p !== 'complete' ? 3.2 : 1;
      for (const e of energy) {
        e.r -= e.s * accel * (1 + 60 / (e.r + 20));
        e.a += 0.004 * accel + 0.6 / (e.r + 80);
        if (e.r < 6) Object.assign(e, spawn());
        ctx.fillStyle = `rgba(${tcol[0]},${tcol[1]},${tcol[2]},${Math.min(0.9, 0.12 + 40 / e.r)})`;
        ctx.fillRect(ox + Math.cos(e.a) * e.r, oy + Math.sin(e.a) * e.r, e.size, e.size);
      }
      raf = requestAnimationFrame(frame);
    };
    frame();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}
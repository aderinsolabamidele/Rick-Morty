import React, { useEffect, useRef } from 'react';
import { buildLandPoints, shortestAngle, DEG } from '@/lib/earth/globeMath';
import { renderGlobe } from '@/lib/earth/renderGlobe';
import { EARTH_SPEED } from '@/lib/animation/portalTimeline';
import { getPointer } from '@/lib/pointer';
import { getEnergyTarget, isActivating } from '@/lib/energy';
import { EARTH_MARKERS } from '@/data/homeContent';

export default function EarthGlobe({ phase, focused }) {
  const canvasRef = useRef(null);
  const live = useRef({ phase, focused });
  live.current = { phase, focused };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const land = buildLandPoints();
    const lights = Uint8Array.from({ length: land.length / 3 }, () => (Math.random() < 0.07 ? 1 : 0));
    const markers = EARTH_MARKERS.map((m) => ({
      ...m, cl: Math.cos(m.lat * DEG), sl: Math.sin(m.lat * DEG), lonR: m.lon * DEG,
    }));
    const primary = markers.find((m) => m.primary);
    const clouds = Array.from({ length: 46 }, () => ({
      lat: (Math.random() - 0.5) * 150 * DEG,
      lon: (Math.random() * 360 - 180) * DEG,
      size: 0.04 + Math.random() * 0.05,
    }));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let px = 0, dpr = 1, rot = 1.6, speed = 1, tilt = 0.38, mx = 0, my = 0, energy = 0, activation = 0, raf, last = performance.now();
    const ro = new ResizeObserver(() => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      px = Math.round(canvas.clientWidth * dpr);
      canvas.width = px; canvas.height = px;
    });
    ro.observe(canvas);

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const { phase: p, focused: f } = live.current;
      speed += ((EARTH_SPEED[p] ?? 1) - speed) * 0.03;
      const ptr = getPointer();
      mx += (ptr.x - mx) * 0.05;
      my += (ptr.y - my) * 0.05;
      energy += (getEnergyTarget() - energy) * 0.06;
      activation += ((isActivating() ? 1 : 0) - activation) * 0.08;
      if (f && primary) rot += shortestAngle(-primary.lonR - rot) * 0.05;
      else if (!reduced) rot += dt * 0.09 * speed;
      tilt += ((f ? 0.55 : 0.38) - tilt) * 0.05;
      if (px) {
        renderGlobe(ctx, {
          px, dpr, rot: rot + mx * 0.18, tilt: tilt + my * 0.1, land, lights, markers, time: now / 1000, focused: f, energy, activation, clouds,
        });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-[3%] h-[94%] w-[94%]"
      role="img"
      aria-label="Rotating Earth with dimensional markers"
    />
  );
}
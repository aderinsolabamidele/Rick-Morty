import React, { useEffect, useMemo, useRef } from 'react';
import { getEnergyTarget } from '@/lib/energy';

// A soft, restrained portal-light wash over a character. Color-graded to the
// active dimension's palette; intensity tracks the shared portal energy level
// (hover / dimension-switch surge) and gets a brief flash on startle. Uses
// soft-light blending so it tints the artwork instead of glowing over it.
// Reduced-motion: rendered static at a faint base tint, no rAF loop.
export default function CharacterLight({ color = '#BEF264', accent = '#22D3EE', startleId = 0 }) {
  const ref = useRef(null);
  const flash = useRef(0);
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    if (reduced) {
      if (ref.current) ref.current.style.opacity = 0.06;
      return;
    }
    let raf = 0;
    let e = 0;
    const loop = () => {
      e += (getEnergyTarget() - e) * 0.06;
      flash.current *= 0.93;
      const op = Math.min(0.5, 0.05 + e * 0.3 + flash.current);
      if (ref.current) ref.current.style.opacity = op.toFixed(3);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  useEffect(() => {
    if (startleId > 0) flash.current = Math.max(flash.current, 0.42);
  }, [startleId]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 mix-blend-soft-light"
      style={{ opacity: 0.05, background: `radial-gradient(circle at 62% 34%, ${color}, ${accent} 46%, transparent 72%)` }}
    />
  );
}
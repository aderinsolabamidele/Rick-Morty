import React, { useEffect, useRef, useState } from 'react';
import { getPointer } from '@/lib/pointer';

export default function CursorReticle() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [enabled] = useState(() => window.matchMedia('(pointer: fine)').matches);

  useEffect(() => {
    if (!enabled) return;
    let raf, rx = window.innerWidth / 2, ry = window.innerHeight / 2;
    const loop = () => {
      const p = getPointer();
      rx += (p.px - rx) * 0.18;
      ry += (p.py - ry) * 0.18;
      if (!ringRef.current || !dotRef.current) { raf = requestAnimationFrame(loop); return; }
      ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      dotRef.current.style.transform = `translate3d(${p.px}px, ${p.py}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e) => {
      ringRef.current?.classList.toggle('is-hover', !!e.target.closest('button, a'));
    };
    loop();
    window.addEventListener('pointerover', onOver);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointerover', onOver); };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ringRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100]">
        <div className="cursor-ring-inner -ml-4 -mt-4 h-8 w-8 rounded-full border border-cyan-hud/40" />
      </div>
      <div ref={dotRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[100]">
        <div className="-ml-[2px] -mt-[2px] h-1 w-1 bg-portal" />
      </div>
    </>
  );
}
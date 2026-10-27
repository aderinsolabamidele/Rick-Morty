import React, { useEffect, useRef } from 'react';
import { getCamera } from '@/lib/pointer';

// Atmospheric cosmic backdrop — colorful nebula, distant procedural planets, debris.
export default function Nebula({ tint }) {
  const layerRef = useRef(null);

  useEffect(() => {
    let raf, x = 0, y = 0;
    const loop = () => {
      const cam = getCamera();
      x += (cam.x - x) * 0.04;
      y += (cam.y - y) * 0.04;
      if (layerRef.current) layerRef.current.style.transform = `translate3d(${x * 22}px, ${y * 16}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,#0c1a3a_0%,#070d28_42%,#020617_78%)]" />
      {tint && <div className="absolute inset-0 transition-opacity duration-700" style={{ background: `radial-gradient(ellipse at 70% 45%, rgba(${tint[0]},${tint[1]},${tint[2]},0.12), transparent 60%)` }} />}
      <div className="nebula-a absolute -left-[12%] top-[6%] h-[62vmax] w-[62vmax] rounded-full" />
      <div className="nebula-b absolute -right-[18%] -top-[24%] h-[74vmax] w-[74vmax] rounded-full" />
      <div className="nebula-c absolute -bottom-[34%] left-[24%] h-[56vmax] w-[56vmax] rounded-full" />
      <div className="absolute left-[22%] bottom-[18%] h-[40vmax] w-[40vmax] rounded-full bg-portal/5 blur-3xl" />

      <div ref={layerRef} className="absolute inset-0 will-change-transform">
        <div className="absolute right-[8%] top-[16%] h-16 w-16 rounded-full bg-[radial-gradient(circle_at_30%_30%,#7c3aed,#3b1d8e_60%,#1a0f3d)] opacity-70 shadow-[0_0_40px_6px_rgba(124,58,237,0.25)]" />
        <div className="absolute left-[6%] bottom-[14%] h-10 w-10 rounded-full bg-[radial-gradient(circle_at_35%_30%,#22d3ee,#0e7490_60%,#082f3e)] opacity-70 shadow-[0_0_24px_4px_rgba(34,211,238,0.2)]" />
        <div className="absolute right-[22%] bottom-[10%] h-6 w-6 rounded-full bg-[radial-gradient(circle_at_30%_30%,#bef264,#65a30d_70%,#365314)] opacity-80 shadow-[0_0_18px_3px_rgba(190,242,100,0.3)]" />
        <div className="absolute left-[40%] top-[10%] h-3 w-3 rounded-full bg-amber-300/70 shadow-[0_0_10px_2px_rgba(252,211,77,0.4)]" />
        <svg viewBox="0 0 200 120" className="absolute left-[12%] top-[58%] h-24 w-40 text-void/80 mix-blend-luminosity opacity-40">
          <path d="M10 100 Q40 70 70 80 Q90 50 120 64 Q150 54 180 78 L190 100 Z" fill="currentColor" />
        </svg>
        {[
          { l: '18%', t: '24%', d: '0s', s: 4 }, { l: '76%', t: '40%', d: '1.2s', s: 3 },
          { l: '44%', t: '72%', d: '2.4s', s: 5 }, { l: '88%', t: '64%', d: '0.6s', s: 3 },
          { l: '30%', t: '52%', d: '3.1s', s: 2 },
        ].map((p, i) => (
          <span key={i} className="animate-float absolute rounded-sm bg-slate-400/40" style={{ left: p.l, top: p.t, width: p.s, height: p.s, animationDelay: p.d }} />
        ))}
      </div>

      <div className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
      <div className="space-vignette absolute inset-0" />
    </div>
  );
}
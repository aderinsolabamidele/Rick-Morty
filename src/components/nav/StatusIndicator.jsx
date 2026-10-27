import React, { useEffect, useState } from 'react';

export default function StatusIndicator() {
  const [now, setNow] = useState(() => new Date());
  const [stability, setStability] = useState(98.4);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    const s = setInterval(() => {
      setStability((v) => Math.min(99.8, Math.max(96.2, v + (Math.random() - 0.5) * 0.8)));
    }, 3200);
    return () => { clearInterval(t); clearInterval(s); };
  }, []);

  return (
    <div className="flex items-center gap-5 font-mono text-[10.5px] tracking-[0.16em] text-slate-400">
      <span className="hidden xl:inline">
        DIM-TIME <span className="text-cyan-hud">{now.toISOString().slice(11, 19)}</span>
      </span>
      <span className="hidden sm:inline" aria-live="polite">
        STABILITY <span className="text-portal">{stability.toFixed(1)}%</span>
      </span>
      <span className="flex items-center gap-2 text-slate-300">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping bg-portal/70" />
          <span className="relative h-1.5 w-1.5 bg-portal" />
        </span>
        C-137
      </span>
    </div>
  );
}
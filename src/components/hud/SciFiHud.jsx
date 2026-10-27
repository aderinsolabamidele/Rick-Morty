import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Minimal sci-fi readouts — a few labels, lots of empty space.
const ITEMS = [
  { k: 'DIMENSION', pos: 'top-24 left-6', color: 'text-portal', live: false, big: true },
  { k: 'PORTAL STABILITY', v: '87%', pos: 'top-24 right-6', color: 'text-cyan-hud', live: true },
  { k: 'C-137', v: '47.6N // 122.3W', pos: 'bottom-8 left-6', color: 'text-cyan-hud/80', live: false, small: true },
  { k: 'SECTOR', v: '00 · ORBITAL VIEW', pos: 'bottom-8 right-6', color: 'text-slate-400', live: false, small: true },
];

export default function SciFiHud({ dimmed }) {
  const [stability, setStability] = useState(87);
  useEffect(() => {
    const i = setInterval(() => setStability((v) => Math.max(81, Math.min(94, v + (Math.random() - 0.5) * 2))), 1800);
    return () => clearInterval(i);
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      animate={{ opacity: dimmed ? 0.15 : 1 }}
      transition={{ duration: 0.6 }}
      className="pointer-events-none absolute inset-0 z-20 hidden font-mono text-[10px] tracking-[0.18em] md:block"
    >
      {ITEMS.map((it) => (
        <div key={it.k} className={`absolute ${it.pos}`}>
          <span className="flex items-center gap-2 text-slate-500">
            <span className={`h-1.5 w-1.5 ${it.live ? 'animate-pulse bg-portal' : 'bg-cyan-hud/50'}`} />
            {it.k}
          </span>
          <span
            className={`mt-1 block ${it.color} ${it.big ? 'text-sm' : it.small ? 'text-[10px]' : 'text-[11px]'}`}
            aria-live={it.live ? 'polite' : undefined}
          >
            {it.k === 'PORTAL STABILITY' ? `${stability.toFixed(0)}%` : it.v}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
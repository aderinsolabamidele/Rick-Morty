import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DimensionVisual from './DimensionVisual';

export default function DimensionOrb({ dim, onOpen }) {
  const [hover, setHover] = useState(false);
  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        type="button"
        onClick={onOpen}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-[150px] w-[150px] items-center justify-center"
        aria-label={`${dim.code}  ${dim.name}`}
      >
        {/* outer glow */}
        <div
          className="absolute inset-[-18%] rounded-full transition-[filter,opacity] duration-300"
          style={{
            background: `radial-gradient(circle, ${dim.color}55, transparent 65%)`,
            filter: `blur(${hover ? 15 : 7}px)`,
            opacity: hover ? 1 : 0.65,
          }}
        />
        {/* portal ring */}
        <div className="absolute inset-0 rounded-full" style={{ boxShadow: `inset 0 0 0 1.5px ${dim.color}cc, 0 0 22px ${dim.color}66` }} />
        {/* environment */}
        <div className="absolute inset-[2px] overflow-hidden rounded-full">
          <DimensionVisual env={dim.env} color={dim.color} accent={dim.accent} />
        </div>
        {/* swirling energy overlay */}
        <div className="portal-swirl absolute inset-[-6%] rounded-full opacity-25" />
      </motion.button>

      {/* label */}
      <div className="mt-3 text-center">
        <p className="slime-title slime-title-sm text-xl leading-none">{dim.code}</p>
        <p className="mt-1.5 font-mono text-[9px] tracking-[0.26em] text-slate-400">{dim.name}</p>
      </div>

      {/* hover info panel (desktop) */}
      <motion.div
        animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 8 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute left-1/2 top-[calc(100%+1.25rem)] z-30 hidden w-48 -translate-x-1/2 border border-white/10 bg-void/85 p-3 backdrop-blur-md md:block"
      >
        <p className="font-mono text-[9px] tracking-[0.22em]" style={{ color: dim.color }}>{dim.code} · {dim.status}</p>
        <dl className="mt-2 space-y-1">
          {dim.info.map((r) => (
            <div key={r.k} className="flex justify-between font-mono text-[9px] tracking-[0.1em]">
              <dt className="text-slate-500">{r.k}</dt>
              <dd className="text-slate-200">{r.v}</dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </div>
  );
}
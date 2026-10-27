import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DimensionEnvironment from '@/components/multiverse/DimensionEnvironment';

// A floating dimensional portal in the multiverse map. Shows its themed
// environment inside a ringed circle; hovering enlarges, brightens the glow
// and reveals coordinates + status + an ENTER action.
export default function DimensionPortal({ dim, onEnter }) {
  const [hover, setHover] = useState(false);
  const depthScale = Math.max(0.6, 1 - dim.position.depth * 0.12);

  return (
    <div
      className="absolute"
      style={{ left: dim.position.x, top: dim.position.y, transform: `translate(-50%,-50%) scale(${depthScale})` }}
    >
      <motion.div
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        onClick={() => onEnter(dim)}
        onPointerDown={(e) => e.stopPropagation()}
        className="relative cursor-pointer"
        animate={{ scale: hover ? 1.08 : 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="mv-float">
          {/* glow */}
          <div
            className="absolute -inset-6 rounded-full transition-opacity duration-300"
            style={{ background: `radial-gradient(circle, ${dim.palette.primary}55, transparent 70%)`, opacity: hover ? 0.95 : 0.5, filter: 'blur(8px)' }}
          />
          {/* portal interior */}
          <div className="relative h-44 w-44 overflow-hidden rounded-full" style={{ boxShadow: `0 0 30px ${dim.palette.primary}80, inset 0 0 22px rgba(0,0,0,0.6)` }}>
            <DimensionEnvironment theme={dim.theme} palette={dim.palette} />
            <div className="absolute inset-0 rounded-full" style={{ border: `2px solid ${dim.palette.primary}` }} />
            <div className="mv-ring-spin absolute -inset-[5%] rounded-full" style={{ border: `1px dashed ${dim.palette.secondary}99` }} />
            <div className="mv-ring-spin-rev absolute -inset-[12%] rounded-full" style={{ border: `1px solid ${dim.palette.primary}40` }} />
          </div>
          {/* label */}
          <div className="mt-3 text-center">
            <div className="font-mono text-[10px] tracking-[0.25em]" style={{ color: dim.palette.primary }}>{dim.coord}</div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-slate-400">{dim.label}</div>
          </div>
        </div>

        <AnimatePresence>
          {hover && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 top-full mt-9 -translate-x-1/2 whitespace-nowrap rounded border border-white/10 bg-void/90 px-3 py-2 text-center backdrop-blur-md"
            >
              <div className="font-mono text-[9px] tracking-[0.22em] text-cyan-hud">STATUS: {dim.status}</div>
              <div className="mt-0.5 font-mono text-[9px] tracking-[0.22em] text-slate-400">STABILITY: {dim.stability}%</div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onEnter(dim); }}
                className="mt-1.5 font-mono text-[10px] tracking-[0.28em] transition-opacity hover:opacity-70"
                style={{ color: dim.palette.primary }}
              >
                ► ENTER
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import DimensionEnvironment from '@/components/multiverse/DimensionEnvironment';
import MortyCharacter from '@/components/characters/MortyCharacter';

// Full-screen entered reality: the dimension's procedural environment fills the
// view, with its coordinate, status and description. Morty appears briefly in
// the unknown/classified reality. EXIT REALITY returns to the map.
export default function RealityView({ dim, onExit }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.12 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-0 z-40 overflow-hidden bg-void"
    >
      <DimensionEnvironment theme={dim.theme} palette={dim.palette} full />

      <div className="absolute left-4 top-4 rounded border border-white/10 bg-void/60 px-3 py-1.5 font-mono text-[10px] tracking-[0.25em] backdrop-blur-md">
        <span style={{ color: dim.palette.primary }}>DIMENSION {dim.coord}</span>
        <span className="text-slate-500"> · {dim.status}</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="slime-title text-[clamp(2.5rem,8vw,6rem)]">{dim.coord}</div>
          <div className="mt-2 font-mono text-[11px] tracking-[0.3em] text-cyan-hud">{dim.label} · {dim.status}</div>
          <div className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300/80">{dim.desc}</div>
        </div>
      </div>

      {dim.theme === 'unknown' && (
        <div className="pointer-events-none absolute bottom-24 right-8" style={{ height: '20vh', aspectRatio: '220 / 380' }}>
          <MortyCharacter />
          <span className="handwritten absolute -left-16 top-4 -rotate-3 text-sm text-portal/70">...where are we?</span>
        </div>
      )}

      <button
        type="button"
        onClick={onExit}
        className="cta-clip group absolute bottom-6 right-6 inline-flex min-h-[46px] items-center gap-2 bg-void/70 px-4 font-mono text-[11px] tracking-[0.22em] text-portal backdrop-blur-md transition-colors hover:bg-portal hover:text-void"
      >
        <X className="h-3.5 w-3.5" />
        EXIT REALITY
      </button>
    </motion.div>
  );
}
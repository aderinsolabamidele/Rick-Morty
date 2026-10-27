import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import EpisodeVisual from './EpisodeVisual';

export default function EpisodeDetail({ ep, onClose }) {
  const [denied, setDenied] = useState(false);
  return (
    <AnimatePresence>
      {ep && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* cinematic backdrop */}
          <div className="absolute inset-0 overflow-hidden bg-void/92 backdrop-blur-md" onClick={onClose}>
            <div className="absolute inset-0 scale-110">
              <EpisodeVisual env={ep.env} color={ep.color} accent={ep.accent} />
            </div>
            <div className="absolute inset-0 bg-void/55" />
            <div className="scanlines absolute inset-0 opacity-40" />
            <div className="portal-swirl absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10" />
          </div>

          <motion.div
            initial={{ scale: 0.94, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="relative z-10 w-full max-w-2xl border border-white/10 bg-void/80 p-6 backdrop-blur-xl sm:p-10"
          >
            <p className="font-mono text-[11px] tracking-[0.3em] text-portal">
              S{String(ep.season).padStart(2, '0')} // E{String(ep.episode).padStart(2, '0')}
            </p>
            <h2 className="slime-title mt-3 text-5xl leading-[0.9] sm:text-6xl">{ep.title}</h2>
            <p className="mt-4 font-mono text-[11px] tracking-[0.26em] text-cyan-hud/80">DIMENSION: {ep.dimension} · STATUS: {ep.status}</p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300/85">{ep.desc}</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={() => setDenied(true)}
                className="cta-glitch group relative inline-flex min-h-[48px] items-center"
              >
                <span className="cta-clip absolute inset-0 bg-portal/50" />
                <span className="cta-clip absolute inset-px bg-void" />
                <span className="relative flex items-center gap-2 px-6 font-mono text-[11px] font-semibold tracking-[0.22em] text-portal transition-colors group-hover:text-void">
                  WATCH TRANSMISSION <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>

              <button
                onClick={onClose}
                className="inline-flex min-h-[48px] items-center gap-2 px-4 font-mono text-[11px] tracking-[0.22em] text-slate-300 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" /> RETURN TO ARCHIVE
              </button>
            </div>

            <AnimatePresence>
              {denied && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="chromatic mt-5 font-mono text-[11px] tracking-[0.22em] text-red-400"
                >
                  TRANSMISSION ENCRYPTED ACCESS DENIED
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
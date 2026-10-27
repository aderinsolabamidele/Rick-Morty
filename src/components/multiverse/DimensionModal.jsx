import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import DimensionVisual from './DimensionVisual';

export default function DimensionModal({ dim, onClose, onEnter }) {
  return (
    <AnimatePresence>
      {dim && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-void/90 backdrop-blur-md"
            onClick={onClose}
            style={{ background: `radial-gradient(circle at 50% 35%, ${dim.color}22, rgba(2,6,23,0.94) 62%)` }}
          />
          <motion.div
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            className="relative z-10 w-full max-w-xl border border-white/10 bg-void/80 p-6 backdrop-blur-xl sm:p-8"
          >
            <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 transition-colors hover:text-white" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
            <div className="flex flex-col items-center text-center">
              <div className="relative h-44 w-44 sm:h-52 sm:w-52">
                <div className="absolute inset-[-14%] rounded-full" style={{ background: `radial-gradient(circle, ${dim.color}44, transparent 65%)`, filter: 'blur(14px)' }} />
                <div className="absolute inset-0 rounded-full" style={{ boxShadow: `inset 0 0 0 1.5px ${dim.color}cc, 0 0 32px ${dim.color}66` }} />
                <div className="absolute inset-[2px] overflow-hidden rounded-full">
                  <DimensionVisual env={dim.env} color={dim.color} accent={dim.accent} />
                </div>
                <div className="portal-swirl absolute inset-[-6%] rounded-full opacity-30" />
              </div>

              <p className="mt-6 font-mono text-[10px] tracking-[0.3em]" style={{ color: dim.color }}>{dim.code} · {dim.status}</p>
              <h3 className="slime-title mt-2 text-4xl sm:text-5xl">{dim.name}</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300/85">{dim.desc}</p>

              <dl className="mt-5 grid w-full max-w-xs grid-cols-3 gap-2">
                {dim.info.map((r) => (
                  <div key={r.k} className="border border-white/5 bg-white/[0.02] p-2 text-left">
                    <dt className="font-mono text-[8px] tracking-[0.14em] text-slate-500">{r.k}</dt>
                    <dd className="mt-1 font-mono text-[11px] text-slate-200">{r.v}</dd>
                  </div>
                ))}
              </dl>

              <button onClick={onEnter} className="cta-glitch group relative mt-7 inline-flex min-h-[48px] items-center">
                <span className="cta-clip absolute inset-0 bg-portal/50" />
                <span className="cta-clip absolute inset-px bg-void" />
                <span className="relative flex items-center gap-2 px-6 font-mono text-[11px] font-semibold tracking-[0.22em] text-portal transition-colors group-hover:text-void">
                  ENTER DIMENSION <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
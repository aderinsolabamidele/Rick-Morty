import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PORTAL_COMPLETE_COPY } from '@/data/homeContent';

export default function PortalComplete({ onReset }) {
  const c = PORTAL_COMPLETE_COPY;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="pointer-events-auto absolute inset-x-0 bottom-[12%] mx-auto flex max-w-md flex-col items-center px-6 text-center"
    >
      <p className="font-mono text-[11px] tracking-[0.32em] text-portal">{c.label}</p>
      <p className="mt-4 text-lg leading-relaxed text-slate-200/90">{c.body}</p>
      <button
        type="button"
        onClick={onReset}
        className="group mt-7 inline-flex min-h-[44px] items-center gap-3 font-mono text-[11px] tracking-[0.26em] text-cyan-hud transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
        {c.back}
      </button>
    </motion.div>
  );
}
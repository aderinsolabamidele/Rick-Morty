import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Playful scientific readout that floats above a character on hover.
export default function CharacterReadout({ show, name, lines }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-portal/40 bg-void/90 px-3 py-2 text-left backdrop-blur-sm"
        >
          <p className="font-cartoon text-lg leading-none text-portal">{name}</p>
          {lines.map((l) => (
            <p key={l} className="mt-1 font-mono text-[9px] tracking-[0.14em] text-cyan-hud/90">{l}</p>
          ))}
          <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-portal/40 bg-void/90" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
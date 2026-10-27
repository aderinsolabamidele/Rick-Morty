import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function PortalFlash({ phase, reduced }) {
  const flashing = phase === 'flash';
  const settled = phase === 'complete';
  return (
    <>
      <AnimatePresence>
        {flashing && !reduced && (
          <motion.div
            key="flash"
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.85, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, times: [0, 0.15, 0.35, 1] }}
          />
        )}
      </AnimatePresence>
      <motion.div
        className="portal-vortex absolute inset-0 overflow-hidden"
        initial={false}
        animate={{ opacity: flashing ? 0.9 : settled ? 1 : 0 }}
        transition={{ duration: flashing ? 0.35 : 1.2 }}
      />
    </>
  );
}
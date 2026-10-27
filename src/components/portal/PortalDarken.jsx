import React from 'react';
import { motion } from 'framer-motion';

export default function PortalDarken({ active }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-void"
      initial={false}
      animate={{ opacity: active ? 0.65 : 0 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    />
  );
}
import React from 'react';
import { motion } from 'framer-motion';

const RINGS = [0, 1, 2, 3, 4];

export default function PortalRings({ active }) {
  if (!active) return null;
  return RINGS.map((i) => (
    <motion.span
      key={i}
      className="absolute left-0 top-0 h-[40vmin] w-[40vmin] rounded-full border"
      style={{
        x: '-50%',
        y: '-50%',
        borderColor: i % 2 ? 'rgba(34,211,238,0.5)' : 'rgba(190,242,100,0.75)',
        boxShadow: '0 0 24px rgba(190,242,100,0.25), inset 0 0 24px rgba(190,242,100,0.2)',
      }}
      initial={{ scale: 0.2, opacity: 0 }}
      animate={{ scale: [0.2, 3.4], opacity: [0, 0.9, 0] }}
      transition={{ duration: 2.2, delay: i * 0.26, repeat: Infinity, ease: 'easeOut' }}
    />
  ));
}
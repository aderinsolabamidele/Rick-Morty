import React from 'react';
import { motion } from 'framer-motion';

export default function PortalEnergy({ active, intense }) {
  return (
    <>
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <filter id="portal-liquid">
          <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7">
            <animate attributeName="baseFrequency" dur="5s" values="0.012;0.022;0.012" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="40" />
        </filter>
      </svg>
      <motion.div
        className="absolute left-0 top-0 h-[70vmin] w-[70vmin] mix-blend-screen"
        style={{ x: '-50%', y: '-50%' }}
        initial={false}
        animate={{ scale: active ? (intense ? 1.3 : 0.85) : 0, opacity: active ? 1 : 0, rotate: active ? 180 : 0 }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="portal-core absolute inset-0 rounded-full" style={{ filter: 'url(#portal-liquid)' }} />
        <div className="portal-swirl absolute inset-0 rounded-full" />
        <div className="animate-smoke absolute inset-[-20%] rounded-full bg-portal/30 blur-2xl" />
        <div className="animate-smoke absolute inset-[-10%] rounded-full bg-cyan-hud/15 blur-3xl" style={{ animationDelay: '1.5s' }} />
      </motion.div>
    </>
  );
}
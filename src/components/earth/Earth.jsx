import React, { forwardRef, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import InterdimensionalPortal from '@/components/portal/InterdimensionalPortal';
import { EARTH_SCALE, EARTH_OPACITY } from '@/lib/animation/portalTimeline';
import { getCamera } from '@/lib/pointer';
import { getEnergyTarget, setEnergy } from '@/lib/energy';

const Earth = forwardRef(function Earth({ phase, focused, onActivate, palette }, ref) {
  const parallaxRef = useRef(null);

  useEffect(() => {
    let raf, x = 0, y = 0, e = 0;
    const loop = () => {
      const cam = getCamera();
      x += (cam.x - x) * 0.05;
      y += (cam.y - y) * 0.05;
      e += (getEnergyTarget() - e) * 0.06;
      if (parallaxRef.current) {
        const jx = (Math.random() - 0.5) * e * 3;
        const jy = (Math.random() - 0.5) * e * 3;
        parallaxRef.current.style.transform = `translate3d(${x * -16 + jx}px, ${y * -12 + jy}px, 0) scale(${1 + e * 0.03})`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  const scale = focused && phase === 'idle' ? 1.06 : EARTH_SCALE[phase];

  return (
    <motion.div
      ref={ref}
      onClick={onActivate}
      onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); onActivate?.(); } }}
      onMouseEnter={() => setEnergy(1)}
      onMouseLeave={() => setEnergy(0)}
      onFocus={() => setEnergy(1)}
      onBlur={() => setEnergy(0)}
      role="button"
      tabIndex={0}
      aria-label="Enter the multiverse"
      className="relative aspect-square w-[min(84vw,42vh)] cursor-pointer sm:w-[min(66vw,48vh)] lg:w-[min(48vw,76vh)]"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ scale, opacity: EARTH_OPACITY[phase] ?? 1 }}
      transition={{ duration: phase === 'idle' ? 1.6 : 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
        <InterdimensionalPortal phase={phase} palette={palette} />
      </div>
    </motion.div>
  );
});

export default Earth;
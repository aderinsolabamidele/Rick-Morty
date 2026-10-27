import React from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import PortalEnergy from '@/components/portal/PortalEnergy';
import PortalRings from '@/components/portal/PortalRings';
import GlitchBands from '@/components/portal/GlitchBands';
import PortalFlash from '@/components/portal/PortalFlash';
import PortalComplete from '@/components/portal/PortalComplete';
import { isAtLeast } from '@/lib/animation/portalTimeline';

export default function PortalOverlay({ phase, origin, onReset }) {
  const reduced = useReducedMotion();
  const reached = (t) => isAtLeast(phase, t) && !reduced;
  const ox = origin ? `${origin.x}px` : '50%';
  const oy = origin ? `${origin.y}px` : '50%';

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
      style={{ '--ox': ox, '--oy': oy }}
      aria-hidden={phase === 'idle'}
    >
      <div className="absolute" style={{ left: ox, top: oy }}>
        <PortalEnergy active={reached('energy')} intense={reached('particles')} />
        <PortalRings active={reached('rings') && phase !== 'complete'} />
      </div>
      <GlitchBands active={phase === 'glitch' && !reduced} />
      <PortalFlash phase={phase} reduced={reduced} />
      <AnimatePresence>
        {phase === 'complete' && <PortalComplete onReset={onReset} />}
      </AnimatePresence>
    </div>
  );
}
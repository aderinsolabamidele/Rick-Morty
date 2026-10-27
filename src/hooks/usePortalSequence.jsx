import { useCallback, useEffect, useRef, useState } from 'react';
import { PORTAL_TIMELINE, REDUCED_TIMELINE, isAtLeast } from '@/lib/animation/portalTimeline';

export default function usePortalSequence() {
  const [phase, setPhase] = useState('idle');
  const timers = useRef([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const start = useCallback(() => {
    if (phase !== 'idle') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timeline = reduced ? REDUCED_TIMELINE : PORTAL_TIMELINE;
    timeline.forEach(({ phase: p, at }) => {
      timers.current.push(setTimeout(() => setPhase(p), at));
    });
  }, [phase]);

  const reset = useCallback(() => {
    clear();
    setPhase('idle');
  }, []);

  useEffect(() => clear, []);

  return { phase, start, reset, reached: (target) => isAtLeast(phase, target) };
}
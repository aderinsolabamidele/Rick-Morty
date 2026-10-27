import React, { useEffect, useRef } from 'react';
import { useCharacterEnvironment } from '@/hooks/useCharacterEnvironment';
import CharacterLight from './CharacterLight';

// Wraps a character SVG with dimension-aware portal lighting and a subtle
// "startle" reaction to dimension switches: on a switch, the pupils dart
// briefly toward the portal (via the inherited --lx/--ly vars the SVG pupils
// already read), then settle. Keeps the character's own animation classes and
// sizing untouched — it only adds a relative wrapper + a light overlay.
//
// Pass explicit `color`/`accent` to grade to a specific reality's palette
// (e.g. the entered reality in the Multiverse map); omit to use the shared
// dimension store (the hero selector).
export default function CharacterStage({ children, color, accent, className = '' }) {
  const { palette, startleId } = useCharacterEnvironment();
  const wrapRef = useRef(null);
  const reduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!startleId || reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    el.style.setProperty('--lx', '2.4px');
    el.style.setProperty('--ly', '-1.6px');
    const t = window.setTimeout(() => {
      el.style.setProperty('--lx', '0px');
      el.style.setProperty('--ly', '0px');
    }, 420);
    return () => window.clearTimeout(t);
  }, [startleId, reduced]);

  const c = color || palette?.slime || '#BEF264';
  const a = accent || palette?.accent || '#22D3EE';

  return (
    <div ref={wrapRef} className={`relative h-full w-full ${className}`}>
      {children}
      <CharacterLight color={c} accent={a} startleId={startleId} />
    </div>
  );
}
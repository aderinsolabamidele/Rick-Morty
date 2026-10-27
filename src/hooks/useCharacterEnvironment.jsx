import { useEffect, useRef, useState } from 'react';
import { useDimension } from '@/lib/dimensionStore';

// Exposes the active dimension's palette and a `startleId` that increments once
// whenever the dimension actually changes (skipping the first mount). Characters
// use the palette for portal-light color grading and the startleId to fire a
// subtle "noticed the switch" reaction (pupil dart + light flash).
export function useCharacterEnvironment() {
  const dim = useDimension();
  const [startleId, setStartleId] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setStartleId((n) => n + 1);
  }, [dim.id]);

  return { palette: dim.palette, startleId };
}
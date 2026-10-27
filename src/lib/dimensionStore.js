import { useSyncExternalStore } from 'react';
import { HERO_DIMENSIONS } from '@/data/heroDimensions';
import { setEnergy } from '@/lib/energy';

// One source of truth for the active dimension, shared by the hero portal,
// the dimension selector, the environment, and the Multiverse Archive.
// Selecting anywhere updates everywhere immediately (no prop drilling).
let current = HERO_DIMENSIONS[0];
const listeners = new Set();

export const getDimension = () => current;
export const getDimensionById = (id) => HERO_DIMENSIONS.find((d) => d.id === id) || current;

export const setDimension = (d) => {
  if (!d || d.id === current.id) return;
  current = d;
  listeners.forEach((l) => l());
};

// Select + trigger a brief portal energy surge (the dimensional transition).
export const selectDimensionById = (id) => {
  const d = getDimensionById(id);
  if (d.id === current.id) return;
  setDimension(d);
  setEnergy(1);
  window.setTimeout(() => setEnergy(0), 700);
};

export const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };

export function useDimension() {
  return useSyncExternalStore(subscribe, getDimension, getDimension);
}
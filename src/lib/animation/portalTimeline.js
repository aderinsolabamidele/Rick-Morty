export const PORTAL_PHASES = [
  'idle', 'charging', 'darken', 'accelerate', 'energy', 'rings', 'particles', 'glitch', 'flash', 'complete',
];

// Milliseconds after the click when each phase begins.
export const PORTAL_TIMELINE = [
  { phase: 'charging', at: 0 },
  { phase: 'darken', at: 550 },
  { phase: 'accelerate', at: 950 },
  { phase: 'energy', at: 1650 },
  { phase: 'rings', at: 2250 },
  { phase: 'particles', at: 2700 },
  { phase: 'glitch', at: 3450 },
  { phase: 'flash', at: 3950 },
  { phase: 'complete', at: 4550 },
];

export const REDUCED_TIMELINE = [
  { phase: 'charging', at: 0 },
  { phase: 'flash', at: 300 },
  { phase: 'complete', at: 900 },
];

export const isAtLeast = (current, target) =>
  PORTAL_PHASES.indexOf(current) >= PORTAL_PHASES.indexOf(target);

export const EARTH_SCALE = {
  idle: 1, charging: 0.98, darken: 1.04, accelerate: 1.45, energy: 2, rings: 2.5,
  particles: 2.9, glitch: 3.2, flash: 3.6, complete: 3.6,
};

export const EARTH_OPACITY = { glitch: 0.55, flash: 0, complete: 0 };

export const EARTH_SPEED = {
  accelerate: 5, energy: 9, rings: 14, particles: 18, glitch: 20, flash: 20, complete: 20,
};

export const STAR_WARP = {
  accelerate: 0.15, energy: 0.15, rings: 0.5, particles: 1, glitch: 1, flash: 1, complete: 0.12,
};
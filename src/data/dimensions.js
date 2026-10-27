// Phase 5  the floating realities in the Multiverse map.
// Each has a unique procedural theme, palette, coordinate, status and position
// inside the pannable dimensional space (offsets from the map center).
export const DIMENSIONS = [
  {
    id: 'j19',
    coord: 'J19',
    status: 'COLLAPSING',
    label: 'UNSTABLE REALITY',
    theme: 'j19',
    palette: { primary: '#C084FC', secondary: '#7C3AED', bg: '#1a0b2e' },
    stability: 23,
    distance: '4.72 LY',
    position: { x: 540, y: -190, depth: 1 },
    desc: 'Strange purple environment. Floating objects. Particles that refuse to obey physics.',
  },
  {
    id: 'x420',
    coord: 'X-420',
    status: 'UNKNOWN',
    label: 'FUTURISTIC CITY',
    theme: 'x420',
    palette: { primary: '#22D3EE', secondary: '#3B82F6', bg: '#031429' },
    stability: 64,
    distance: '12.4 LY',
    position: { x: -560, y: -70, depth: 0.6 },
    desc: 'Futuristic skyline. Cyan/blue atmosphere. Everyone speaks in push notifications.',
  },
  {
    id: 'a12',
    coord: 'A-12',
    status: 'DO NOT ENTER',
    label: 'VOID SECTOR',
    theme: 'a12',
    palette: { primary: '#EF4444', secondary: '#7F1D1D', bg: '#0a0a0a' },
    stability: 8,
    distance: '99.99 LY',
    position: { x: 300, y: 330, depth: 1.4 },
    desc: 'Almost completely dark. Red warning indicators. The portal here is actively hostile.',
  },
  {
    id: 'unknown',
    coord: '????',
    status: 'CLASSIFIED',
    label: 'UNKNOWN',
    theme: 'unknown',
    palette: { primary: '#BEF264', secondary: '#22D3EE', bg: '#020617' },
    stability: 0,
    distance: '??? LY',
    position: { x: -330, y: 350, depth: 1.8 },
    desc: 'Distorted geometry. Broken UI. Visual glitches. Coordinates incomplete. Morty got lost here once.',
  },
  {
    id: 'd99',
    coord: 'D-99',
    status: 'STABLE',
    label: 'CRYSTAL REALM',
    theme: 'd99',
    palette: { primary: '#F472B6', secondary: '#FBBF24', bg: '#1a1030' },
    stability: 81,
    distance: '7.15 LY',
    position: { x: 660, y: 230, depth: 0.8 },
    desc: 'Crystalline growth. Warm pink-gold energy. Surprisingly chill, all things considered.',
  },
];

export const TRANSITION_COORDS = [
  'C-137', 'J19', 'A-12', 'D-99', 'X-420', 'UNKNOWN', 'REALITY LOST', 'RECALIBRATING...',
];
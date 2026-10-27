export const NAV_ITEMS = [
  { label: 'HOME', code: '00', to: '/', enabled: true },
  { label: 'MULTIVERSE', code: '01', to: '/multiverse', enabled: true },
  { label: 'CHARACTERS', code: '02', enabled: false },
  { label: 'EPISODES', code: '03', to: '/#episodes', enabled: true },
  { label: 'GENERATOR', code: '04', to: '/rick-yourself', enabled: true },
  { label: 'ABOUT', code: '05', enabled: false },
];

export const HERO_COPY = {
  primaryCta: 'ENTER THE MULTIVERSE',
  primaryCtaBusy: 'OPENING PORTAL',
};

export const EARTH_MARKERS = [
  { id: 'c137', label: 'C-137', lat: 47.6, lon: -122.3, primary: true },
  { id: 'm1', lat: 51.5, lon: -0.1 },
  { id: 'm2', lat: 35.7, lon: 139.7 },
  { id: 'm3', lat: -33.9, lon: 18.4 },
  { id: 'm4', lat: -23.5, lon: -46.6 },
  { id: 'm5', lat: 28.6, lon: 77.2 },
  { id: 'm6', lat: -33.8, lon: 151.2 },
  { id: 'm7', lat: 64.8, lon: -147.7 },
  { id: 'm8', lat: 6.5, lon: 3.4 },
];

export const PORTAL_COMPLETE_COPY = {
  label: 'DIMENSIONAL LINK ESTABLISHED',
  body: 'Destination coordinates are still calibrating. Stand by, traveler.',
  back: 'RETURN TO C-137',
};
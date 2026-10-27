// Modular character parts for the Rick Yourself forge. Each category is a set
// of options the editor renders as compact controls; the CharacterFigure reads
// the selected ids/colors to compose one coherent SVG figure.
// Anatomical build. Selecting one also loads its signature hair + outfit.
export const BASES = [
  { id: 'rick', label: 'RICK BUILD', preset: { hair: { style: 'spiky', color: '#a9dcea' }, outfit: 'labcoat', outfitColor: '#f4f4f5' } },
  { id: 'morty', label: 'MORTY BUILD', preset: { hair: { style: 'buzz', color: '#875b37' }, outfit: 'casual', outfitColor: '#fcf047' } },
];

export const SPECIES = [
  { id: 'human', label: 'HUMAN', skin: '#f0c39f' },
  { id: 'alien', label: 'ALIEN', skin: '#a3e635' },
  { id: 'mutant', label: 'MUTANT', skin: '#84cc16' },
  { id: 'robot', label: 'ROBOT', skin: '#94a3b8' },
  { id: 'original', label: 'ORIGINAL', skin: '#c084fc' },
];

export const SKIN_SWATCHES = [
  '#f0c39f', '#fde68a', '#a3e635', '#84cc16', '#22d3ee', '#94a3b8',
  '#c084fc', '#f472b6', '#f87171', '#e7e5e4', '#1f2937', '#0b1220',
];

export const EYE_STYLES = [
  { id: 'round', label: 'ROUND' },
  { id: 'oval', label: 'OVAL' },
  { id: 'wide', label: 'WIDE' },
  { id: 'visor', label: 'VISOR' },
  { id: 'compound', label: 'COMPOUND' },
  { id: 'one', label: 'CYCLOPS' },
];

export const PUPIL_STYLES = [
  { id: 'dot', label: 'DOT' },
  { id: 'slit', label: 'SLIT' },
  { id: 'cross', label: 'CROSS' },
  { id: 'star', label: 'STAR' },
  { id: 'none', label: 'NONE' },
];

export const EYE_COLORS = ['#3e2f24', '#22d3ee', '#84cc16', '#7c3aed', '#f43f5e', '#fbbf24', '#ffffff'];

export const EXPRESSIONS = [
  { id: 'neutral', label: 'NEUTRAL' },
  { id: 'happy', label: 'HAPPY' },
  { id: 'angry', label: 'ANGRY' },
  { id: 'worried', label: 'WORRIED' },
  { id: 'smug', label: 'SMUG' },
  { id: 'surprised', label: 'SURPRISED' },
];

export const HAIR_STYLES = [
  { id: 'none', label: 'NONE' },
  { id: 'spiky', label: 'SPIKY' },
  { id: 'flowing', label: 'FLOWING' },
  { id: 'mohawk', label: 'MOHAWK' },
  { id: 'buzz', label: 'SHORT' },
  { id: 'tendrils', label: 'TENDRILS' },
];

export const HAIR_COLORS = [
  '#a9dcea', '#6b4a2b', '#0b1220', '#facc15', '#f87171', '#a3e635', '#c084fc', '#e7e5e4', '#f472b6', '#65a30d',
];

export const OUTFITS = [
  { id: 'labcoat', label: 'LAB COAT' },
  { id: 'jumpsuit', label: 'JUMPSUIT' },
  { id: 'casual', label: 'CASUAL' },
  { id: 'armor', label: 'ARMOR' },
  { id: 'robe', label: 'ROBE' },
];

export const OUTFIT_COLORS = ['#f4f4f5', '#f6e04b', '#22d3ee', '#84cc16', '#7c3aed', '#f59e0b', '#1f2937', '#f472b6', '#0b1220'];

export const ACCESSORIES = [
  { id: 'none', label: 'NONE' },
  { id: 'goggles', label: 'GOGGLES' },
  { id: 'antenna', label: 'ANTENNA' },
  { id: 'headphones', label: 'HEADPHONES' },
  { id: 'crown', label: 'CROWN' },
  { id: 'cyber', label: 'CYBER-EYE' },
];

export const FEATURES = [
  { id: 'none', label: 'NONE' },
  { id: 'extra-eyes', label: 'EXTRA EYES' },
  { id: 'antennae', label: 'ANTENNAE' },
  { id: 'horns', label: 'HORNS' },
  { id: 'tentacles', label: 'TENTACLES' },
  { id: 'mech-arm', label: 'MECH ARM' },
];
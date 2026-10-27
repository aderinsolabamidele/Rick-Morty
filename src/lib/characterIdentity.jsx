import {
  BASES, SPECIES, SKIN_SWATCHES, EYE_STYLES, PUPIL_STYLES, EYE_COLORS,
  EXPRESSIONS, HAIR_STYLES, HAIR_COLORS, OUTFITS, OUTFIT_COLORS, ACCESSORIES, FEATURES,
} from '@/data/characterParts';

// All lore here is original fan-made material — not official Rick & Morty canon.
const FIRST = [
  'Rick', 'Morty', 'Squanch', 'Gloopy', 'Vlax', 'Krombix', 'Zorp', 'Nurple',
  'Blimblam', 'Chitz', 'Tammy', 'Pichael', 'Tinkles', 'Glarb', 'Snuffles', 'Doofus',
];
const LAST = [
  'Sanchez', 'Smith', 'Gazorpazorp', 'Flansworth', 'Krombopulous', 'Xenon',
  'Blimblon', 'Quib', 'Rick-Prime', 'Globbly', 'Vortigon', 'McMort',
];
const TRAITS = [
  'deeply unstable', 'aggressively chill', 'chronically anxious', 'unhinged genius',
  'passively hostile', 'weirdly optimistic', 'catastrophically curious', 'emotionally buffered',
  'suspiciously calm', 'mildly combustible', 'professionally evasive',
];
const BIOS = [
  'Built a portal gun out of a calculator and spite. Currently banned from seven dimensions.',
  'Once replaced their own liver with a smaller, angrier liver. Feels great, honestly.',
  'Runs a multiverse delivery service that has never delivered anything on time.',
  'Keeps a sentient houseplant as a therapist. The plant is doing better than they are.',
  'Was ejected from the Citadel for being too chaotic, which is really saying something.',
  'Owns three copies of the same shirt and considers this a personality.',
  'Sells lightly-used timelines out of a garage. No refunds, no questions, no warranty.',
  'Once high-fived a Cromulon and has not stopped talking about it since.',
  'Maintains a calm exterior through a combination of denial and a small device in their pocket.',
  'Has a nemesis who is just themselves from a Tuesday.',
];

export const SPECIES_LABELS = {
  human: 'Human', alien: 'Alien', mutant: 'Mutant', robot: 'Robot', original: 'Original',
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function dimensionalCode() {
  const letters = 'CJXADFR';
  const a = letters[Math.floor(Math.random() * letters.length)];
  const n = Math.floor(Math.random() * 900) + 100;
  const suffix = Math.random() < 0.5 ? '' : `-${String(Math.floor(Math.random() * 99)).padStart(2, '0')}`;
  return `${a}-${n}${suffix}`;
}

export function defaultCharacter() {
  return {
    base: 'rick',
    species: 'human',
    skin: '#f0c39f',
    eyes: { style: 'round', color: '#3e2f24', pupil: 'dot' },
    expression: 'neutral',
    hair: { style: 'spiky', color: '#a9dcea' },
    outfit: 'labcoat',
    outfitColor: '#f4f4f5',
    accessory: 'none',
    feature: 'none',
  };
}

export function randomCharacter() {
  const species = pick(SPECIES);
  const base = pick(BASES);
  const look = Math.random() < 0.45
    ? base.preset
    : { hair: { style: pick(HAIR_STYLES).id, color: pick(HAIR_COLORS) }, outfit: pick(OUTFITS).id, outfitColor: pick(OUTFIT_COLORS) };
  return {
    base: base.id,
    species: species.id,
    // skip the near-black swatches so outlines always stay readable
    skin: Math.random() < 0.6 ? species.skin : pick(SKIN_SWATCHES.slice(0, 10)),
    eyes: { style: Math.random() < 0.5 ? 'round' : pick(EYE_STYLES).id, color: pick(EYE_COLORS), pupil: Math.random() < 0.5 ? 'dot' : pick(PUPIL_STYLES).id },
    expression: pick(EXPRESSIONS).id,
    ...look,
    accessory: Math.random() < 0.5 ? 'none' : pick(ACCESSORIES).id,
    feature: Math.random() < 0.5 ? 'none' : pick(FEATURES).id,
  };
}

// dimension = the hero's currently selected dimension (ties identity to the site).
export function makeIdentity(character, dimension) {
  return {
    name: `${pick(FIRST)} ${pick(LAST)}`,
    species: SPECIES_LABELS[character.species],
    homeDimension: dimension?.name || 'PRIME REALITY',
    dimensionCode: dimension?.code || 'C-137',
    trait: pick(TRAITS),
    id: dimensionalCode(),
    bio: pick(BIOS),
    fanMade: true,
  };
}

export function formatIdentity(i) {
  return [
    `NAME: ${i.name}`,
    `SPECIES: ${i.species}`,
    `HOME DIMENSION: ${i.homeDimension} (${i.dimensionCode})`,
    `DIMENSIONAL ID: ${i.id}`,
    `PERSONALITY: ${i.trait}`,
    `BIO: ${i.bio}`,
    '',
    '// fan-made concept not official Rick & Morty canon',
  ].join('\n');
}
// Shared constants + per-build head geometry for the generator renderer.
// Each build (Rick / Morty) has its own anatomy; every part (hair, eyes,
// mouth, accessories) is placed from these anchors so it always fits.
export const INK = '#3e2f24';
export const MOUTH_DARK = '#3b0d14';

export const GEO = {
  rick: {
    face: 'M82 47 C79 30 94 20 112 20 C131 21 144 31 141 50 C142 72 141 95 135 110 C130 124 122 133 110 133 C97 132 88 124 84 111 C79 95 82 71 82 47 Z',
    cx: 111, top: 21, hw: 30, hh: 112, faceL: 81, faceR: 141, earY: 82, earK: 1,
    eyeY: 73, eyeL: 97, eyeR: 125, erx: 9, ery: 8.5, pr: 2.3, pdy: 1.5,
    browY: 60, mouthX: 111, mouthY: 116, mouthW: 32, chinY: 133, cheekY: 98,
    headTransform: 'rotate(-2 111 145) translate(111 150) scale(0.92) translate(-111 -150)',
    shirt: '#89d3d6', trousers: '#6f5a48', shoes: '#3f2a1c',
  },
  morty: {
    face: 'M61 98 C59 62 82 37 112 37 C142 37 163 60 161 96 C161 128 141 151 111 151 C82 151 61 130 61 98 Z',
    cx: 111, top: 37, hw: 50, hh: 114, faceL: 61, faceR: 161, earY: 104, earK: 1.25,
    eyeY: 99, eyeL: 97, eyeR: 125, erx: 13, ery: 13.5, pr: 3.3, pdy: 1,
    browY: 80, mouthX: 110, mouthY: 134, mouthW: 26, chinY: 151, cheekY: 122,
    headTransform: 'rotate(1.5 111 160)',
    shirt: '#fcf047', trousers: '#3e5ba9', shoes: '#f1f5f9',
  },
};

// Upper-lid position as a fraction of eye height (o = outer corner, i = inner).
// Rick: heavy half-closed lids. Morty: wide-open, lid barely visible.
export const LIDS = {
  rick: {
    neutral: { o: 0.06, i: -0.14 }, happy: { o: -0.35, i: -0.35, low: true },
    angry: { o: -0.5, i: 0.15 }, worried: { o: 0.05, i: -0.5 },
    smug: { o: 0.08, i: 0.18 }, surprised: null,
  },
  morty: {
    neutral: { o: -0.9, i: -0.82 }, happy: { o: -0.75, i: -0.75, low: true },
    angry: { o: -0.6, i: -0.18 }, worried: { o: -0.6, i: -0.92 },
    smug: { o: -0.25, i: -0.15 }, surprised: null,
  },
};

// Rick: unibrow heights [leftOuter, center, rightOuter].
// Morty: [leftOuter, leftInner, rightInner, rightOuter].
export const BROWS = {
  rick: {
    neutral: [62, 59, 58], happy: [59, 57, 58], angry: [56, 64, 55],
    worried: [64, 55, 64], smug: [61, 60, 54], surprised: [54, 52, 54],
  },
  morty: {
    neutral: [82, 78, 79, 81], happy: [80, 78, 78, 80], angry: [76, 83, 83, 77],
    worried: [83, 74, 75, 82], smug: [81, 81, 78, 74], surprised: [74, 72, 72, 74],
  },
};

export const LIDDED_STYLES = ['round', 'oval', 'wide', 'one'];
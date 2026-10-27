// Hair styles, each authored against one head frame and refit onto the active
// build (see Hair.jsx). `back` sits behind the face, `front` overlaps it.
export const RICK_FRAME = { cx: 111, top: 21, hw: 30, hh: 112 };
export const MORTY_FRAME = { cx: 111, top: 37, hw: 50, hh: 114 };

export const HAIR = {
  // Rick's swept-back spikes radiating behind the head + a high, jagged hairline.
  spiky: {
    frame: RICK_FRAME,
    back: ['M83 80 C71 77 58 78 46 83 C54 73 64 67 75 64 C62 60 52 52 45 42 C58 45 69 48 81 49 C75 37 73 26 75 13 C82 23 88 30 95 35 C95 22 99 10 107 1 C109 12 111 21 114 28 C118 16 125 7 137 2 C136 14 135 23 136 31 C143 21 151 16 162 14 C157 23 154 32 151 39 C160 37 170 38 181 42 C173 48 163 52 154 56 C163 59 171 64 177 71 C164 70 153 72 142 77 Z'],
    front: ['M80 46 C81 31 95 20 112 20 C129 20 142 31 142 47 C138 39 132 36 125 37 C121 31 116 29 111 31 C105 28 99 31 94 36 C88 35 83 39 80 46 Z'],
    strands: ['M75 64 C80 61 85 59 89 58', 'M81 49 C84 50 87 52 90 54', 'M136 31 C135 36 134 40 132 44', 'M154 56 C149 57 144 58 140 60', 'M107 1 C107 9 108 17 109 24'],
  },
  // Morty's short brown cap with an uneven, lumpy front hairline.
  buzz: {
    frame: MORTY_FRAME,
    back: [],
    front: ['M60 94 C56 58 80 31 112 31 C145 31 166 56 162 92 C159 84 155 78 150 74 C149 80 145 82 141 78 C137 72 131 69 125 71 C122 65 116 63 110 66 C104 63 97 66 94 72 C90 68 84 69 80 74 C76 72 72 75 70 80 C66 84 63 88 60 94 Z'],
    strands: ['M94 70 C96 60 102 51 112 45', 'M125 70 C127 61 134 54 144 52', 'M78 72 C80 64 84 58 90 54'],
  },
  flowing: {
    frame: MORTY_FRAME,
    back: ['M58 96 C52 60 80 30 112 30 C146 30 170 60 164 98 C166 126 170 150 176 170 C162 174 150 168 146 158 C142 150 140 140 140 130 L82 130 C82 140 80 150 76 158 C72 168 60 174 46 170 C52 150 56 126 58 96 Z'],
    front: ['M60 92 C58 58 82 32 112 32 C144 32 164 56 162 92 C154 76 140 62 120 58 C116 66 108 70 98 70 C82 72 70 80 60 92 Z'],
    strands: ['M120 58 C130 62 142 70 152 82', 'M98 70 C88 72 78 78 70 86'],
  },
  mohawk: {
    frame: MORTY_FRAME,
    back: [],
    front: ['M101 42 C99 28 101 16 106 4 C109 12 111 8 114 2 C116 12 119 10 123 6 C125 20 123 32 121 44 C114 40 107 40 101 42 Z'],
    strands: ['M110 40 C110 30 111 20 113 10'],
  },
  tendrils: {
    frame: MORTY_FRAME,
    back: ['M64 80 C54 96 52 118 58 136 C62 122 66 104 74 92 Z', 'M158 80 C168 96 170 118 164 136 C160 122 156 104 148 92 Z'],
    front: [
      'M62 88 C58 56 82 34 112 34 C142 34 164 56 160 88 C150 72 132 62 112 62 C92 62 72 72 62 88 Z',
      'M70 76 C64 88 64 102 68 114 C70 102 72 90 78 80 Z',
      'M152 76 C158 88 158 102 154 114 C152 102 150 90 144 80 Z',
    ],
    strands: [],
  },
};
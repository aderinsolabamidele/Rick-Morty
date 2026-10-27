import React from 'react';
import SciFiFilters from '@/components/characters/SciFiFilters';

// Code-drawn Morty — round head, big expressive eyes, short parted brown hair,
// yellow shirt. Bézier contours with natural overlaps and varied line weight.
// Animation classes (morty-legs / morty-body / morty-head / morty-eyes /
// morty-pupil) are preserved so existing loops keep driving the right parts.
const SKIN = '#f0c39f';
const SKIN_SHADE = '#d8a87f';
const HAIR = '#6b4a2b';
const HAIR_SHADE = '#4f3520';
const SHIRT = '#ffd23f';
const JEANS = '#2a3a6b';
const INK = '#0b1220';

export default function MortyCharacter() {
  return (
    <svg viewBox="0 0 220 380" className="char-svg" role="img" aria-label="Morty">
      <SciFiFilters idPrefix="morty" />
      <g id="mortyBody">
        {/* legs */}
        <g className="morty-legs">
          <path d="M88 276 C86 312 86 348 90 362 L106 362 C108 348 108 312 108 276 Z" fill={JEANS} stroke={INK} strokeWidth="3" />
          <path d="M112 276 C112 312 112 348 114 362 L130 362 C134 348 134 312 132 276 Z" fill={JEANS} stroke={INK} strokeWidth="3" />
          <path d="M84 358 C82 366 84 373 96 373 C104 373 108 371 108 364 L108 356 Z" fill="#f8fafc" stroke={INK} strokeWidth="2.5" />
          <path d="M112 356 L112 364 C112 371 116 373 124 373 C136 373 138 366 136 360 Z" fill="#f8fafc" stroke={INK} strokeWidth="2.5" />
        </g>

        {/* body — yellow shirt, breathing */}
        <g className="morty-body">
          <path d="M74 168 C62 230 66 270 72 286 L148 286 C154 270 158 230 146 168 C136 164 124 162 110 162 C96 162 84 164 74 168 Z" fill={SHIRT} stroke={INK} strokeWidth="3" />
          {/* collar / chest V */}
          <path d="M110 162 L101 180 L119 180 Z" fill={SKIN} />
          <path d="M101 180 L110 172 L119 180" stroke={INK} strokeWidth="2" fill="none" strokeLinejoin="round" />
          {/* sleeves */}
          <path d="M74 174 C56 206 60 238 64 254" stroke={SHIRT} strokeWidth="15" strokeLinecap="round" fill="none" />
          <path d="M146 174 C164 206 160 238 156 254" stroke={SHIRT} strokeWidth="15" strokeLinecap="round" fill="none" />
          {/* hands */}
          <circle cx="64" cy="256" r="8.5" fill={SKIN} stroke={INK} strokeWidth="2.5" />
          <circle cx="156" cy="256" r="8.5" fill={SKIN} stroke={INK} strokeWidth="2.5" />
          {/* shirt hem stitch */}
          <path d="M78 282 C96 286 124 286 142 282" stroke={HAIR_SHADE} strokeWidth="1.2" fill="none" opacity="0.4" />
        </g>

        {/* head */}
        <g className="morty-head">
          {/* neck */}
          <path d="M100 128 L99 162 L121 162 L120 128 Z" fill={SKIN} stroke={INK} strokeWidth="2.5" />
          {/* hair (behind face — short, rounded, parted) */}
          <path
            d="M60 86 C58 52 76 35 110 34 C144 35 162 52 160 86 C152 66 134 60 118 62 C115 53 105 53 102 62 C86 60 68 66 60 86 Z"
            fill={HAIR} stroke={INK} strokeWidth="2.5" strokeLinejoin="round"
          />
          {/* part line */}
          <path d="M112 36 C113 48 113 56 111 62" stroke={HAIR_SHADE} strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* face — rounded */}
          <path d="M62 86 C60 52 80 36 110 36 C140 36 160 52 158 86 C158 114 140 134 110 136 C80 134 62 114 62 86 Z" fill={SKIN} stroke={INK} strokeWidth="3" />
          {/* ears */}
          <path d="M60 86 C53 88 52 98 58 100 C60 96 61 90 60 86 Z" fill={SKIN} stroke={INK} strokeWidth="2" />
          <path d="M160 86 C167 88 168 98 162 100 C160 96 159 90 160 86 Z" fill={SKIN} stroke={INK} strokeWidth="2" />
          {/* eyebrows — thin, worried (angled up toward center) */}
          <path d="M73 80 C82 75 95 77 103 82" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M117 82 C125 77 138 75 147 80" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* big expressive eyes */}
          <g className="morty-eyes">
            <circle cx="90" cy="98" r="17" fill="#fff" stroke={INK} strokeWidth="2" />
            <circle cx="130" cy="98" r="17" fill="#fff" stroke={INK} strokeWidth="2" />
            <path d="M74 92 C82 88 98 88 106 92" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M114 92 C122 88 138 88 146 92" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <circle className="morty-pupil" cx="91" cy="100" r="5.5" fill={INK} />
            <circle className="morty-pupil" cx="131" cy="100" r="5.5" fill={INK} />
            <circle cx="93" cy="97" r="1.8" fill="#fff" />
            <circle cx="133" cy="97" r="1.8" fill="#fff" />
          </g>
          {/* small nose */}
          <path d="M107 108 C105 114 105 118 110 118 C115 118 115 114 113 108 Z" fill={SKIN} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <path d="M109 112 C108 115 108 117 110 117" stroke={SKIN_SHADE} strokeWidth="1.3" fill="none" />
          {/* worried mouth */}
          <path d="M100 130 C108 127 112 127 120 130" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M104 131 C108 134 112 134 116 131" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* cheek blush */}
          <path d="M74 108 C78 110 82 110 84 108" stroke={SKIN_SHADE} strokeWidth="1.3" fill="none" opacity="0.6" />
          <path d="M136 108 C138 110 142 110 146 108" stroke={SKIN_SHADE} strokeWidth="1.3" fill="none" opacity="0.6" />
        </g>
      </g>
      <use href="#mortyBody" filter="url(#mortyChromaR)" className="chroma-fringe" />
      <use href="#mortyBody" filter="url(#mortyChromaB)" className="chroma-fringe" />
      <rect x="0" y="0" width="220" height="380" fill="url(#mortyScan)" className="scan-overlay" />
    </svg>
  );
}
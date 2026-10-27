// import React from 'react';
// import SciFiFilters from '@/components/characters/SciFiFilters';

// // Code-drawn Rick — hand-crafted Bézier contours, varied line weight, organic
// // asymmetry, and natural overlaps (hair over forehead, coat over body, neck
// // emerging from the collar). Animation classes are preserved so the existing
// // blink / head-bob / coat-sway / gun-pulse loops still drive the right parts.
// const SKIN = '#f0c39f';
// const SKIN_SHADE = '#d8a87f';
// const HAIR = '#8fcfe0';
// const COAT = '#f4f4f5';
// const COAT_SHADE = '#eaeaec';
// const SHIRT = '#7f9a6a';
// const PANTS = '#2f4a7a';
// const INK = '#0b1220';

// export default function RickCharacter({ firing }) {
//   return (
//     <svg viewBox="0 0 220 380" className="char-svg" role="img" aria-label="Rick">
//       <SciFiFilters idPrefix="rick" />
//       <g id="rickBody">
//         {/* legs */}
//         <g className="rick-legs">
//           <path d="M86 292 C84 322 84 348 88 362 L106 362 C108 348 108 322 108 292 Z" fill={PANTS} stroke={INK} strokeWidth="3" />
//           <path d="M112 292 C112 322 112 348 114 362 L132 362 C136 348 136 322 134 292 Z" fill={PANTS} stroke={INK} strokeWidth="3" />
//           <path d="M84 360 C82 366 84 373 96 373 C104 373 108 371 108 364 L108 357 Z" fill="#1f2937" stroke={INK} strokeWidth="2.5" />
//           <path d="M112 357 L112 364 C112 371 116 373 124 373 C136 373 138 366 136 360 Z" fill="#1f2937" stroke={INK} strokeWidth="2.5" />
//         </g>

//         {/* coat + arms */}
//         <g className="rick-coat char-coat">
//           <path d="M68 150 C58 200 56 258 64 302 L156 302 C164 258 162 200 152 150 C140 145 128 143 110 143 C92 143 80 145 68 150 Z" fill={COAT} stroke={INK} strokeWidth="3" />
//           {/* under-shirt visible down the chest */}
//           <path d="M110 143 L93 236 L127 236 Z" fill={SHIRT} />
//           {/* lapels framing the shirt */}
//           <path d="M110 143 L91 200 L102 212 L110 164 Z" fill={COAT_SHADE} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
//           <path d="M110 143 L129 200 L118 212 L110 164 Z" fill={COAT_SHADE} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
//           {/* pocket + pen */}
//           <path d="M82 238 L104 238 L104 262 L82 262 Z" fill="none" stroke={INK} strokeWidth="2" />
//           <rect x="90" y="233" width="4" height="15" rx="1" fill="#facc15" stroke={INK} strokeWidth="1.5" />
//           {/* sleeves */}
//           <path d="M70 152 C52 182 48 222 60 256" stroke={COAT} strokeWidth="18" strokeLinecap="round" fill="none" />
//           <path d="M150 152 C168 176 176 198 178 214" stroke={COAT} strokeWidth="18" strokeLinecap="round" fill="none" />
//           {/* hands */}
//           <path d="M60 256 C54 261 54 271 62 272 C69 271 66 262 62 257 Z" fill={SKIN} stroke={INK} strokeWidth="2.5" />
//           <path d="M178 214 C185 211 191 215 188 223 C181 224 175 219 176 215 Z" fill={SKIN} stroke={INK} strokeWidth="2.5" />
//           {/* hem split */}
//           <path d="M108 300 L108 314 M112 300 L112 314" stroke={INK} strokeWidth="2" />
//         </g>

//         {/* portal gun */}
//         <g className="rick-gun">
//           <rect x="166" y="184" width="24" height="32" rx="5" fill="#9ca3af" stroke={INK} strokeWidth="2.5" transform="rotate(-12 178 200)" />
//           <rect x="170" y="190" width="6" height="16" rx="2" fill="#3f3f46" transform="rotate(-12 178 200)" />
//           <circle className={`gun-energy${firing ? ' gun-fire' : ''}`} cx="186" cy="188" r="7" fill="#bef264" />
//         </g>

//         {/* head */}
//         <g className="rick-head char-head-rick">
//           {/* neck */}
//           <path d="M100 116 L99 144 L121 144 L120 116 Z" fill={SKIN} stroke={INK} strokeWidth="2.5" />
//           {/* hair (behind face — spikes + sideburns show beyond the face edges) */}
//           <path
//             className="rick-hair"
//             d="M64 72 C58 44 62 20 76 12 C78 24 82 20 86 14 C90 26 94 20 98 13 C102 26 106 19 110 13 C114 26 118 20 122 14 C126 26 130 20 134 14 C138 26 142 21 146 14 C158 24 162 46 156 72 C148 60 130 54 110 56 C90 54 72 60 64 72 Z"
//             fill={HAIR} stroke={INK} strokeWidth="2.5" strokeLinejoin="round"
//           />
//           {/* face — elongated, slightly narrow at the jaw */}
//           <path d="M78 56 C76 36 90 26 110 26 C130 26 144 36 142 56 C142 86 136 106 110 120 C84 106 78 86 78 56 Z" fill={SKIN} stroke={INK} strokeWidth="3" />
//           {/* ear */}
//           <path d="M141 78 C150 80 153 90 146 95 C142 92 139 84 141 78 Z" fill={SKIN} stroke={INK} strokeWidth="2" />
//           {/* heavy unibrow — thick, slightly angled, asymmetric (Rick's signature) */}
//           <path d="M78 66 C86 59 101 59 110 64 C119 59 134 59 142 66 C138 71 128 72 110 69 C92 72 82 71 78 66 Z" fill={INK} />
//           {/* eyes — small, half-lidded */}
//           <g className="rick-eyes">
//             <path d="M84 79 C88 82 95 82 99 79" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
//             <path d="M121 79 C125 82 132 82 136 79" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
//             <ellipse cx="92" cy="81" rx="7" ry="4.6" fill="#fff" stroke={INK} strokeWidth="2" />
//             <ellipse cx="128" cy="81" rx="7" ry="4.6" fill="#fff" stroke={INK} strokeWidth="2" />
//             <circle className="rick-pupil" cx="92" cy="82" r="2.8" fill={INK} />
//             <circle className="rick-pupil" cx="128" cy="82" r="2.8" fill={INK} />
//             <circle cx="93.5" cy="80.5" r="1" fill="#fff" />
//             <circle cx="129.5" cy="80.5" r="1" fill="#fff" />
//           </g>
//           {/* tired eye-bag lines (weary, unimpressed) */}
//           <path d="M85 88 C89 90 95 90 99 88" stroke={SKIN_SHADE} strokeWidth="1.3" fill="none" opacity="0.7" strokeLinecap="round" />
//           <path d="M121 88 C125 90 131 90 135 88" stroke={SKIN_SHADE} strokeWidth="1.3" fill="none" opacity="0.7" strokeLinecap="round" />
//           {/* long distinctive nose */}
//           <path d="M104 82 C101 94 99 103 106 107 C111 109 115 106 113 100 C111 95 109 88 110 82 Z" fill={SKIN} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
//           <path d="M108 86 C107 95 106 101 108 105" stroke={SKIN_SHADE} strokeWidth="1.4" fill="none" />
//           <ellipse cx="109" cy="105" rx="1.5" ry="1.1" fill={INK} opacity="0.55" />
//           {/* mouth — unimpressed scowl, corners downturned */}
//           <path d="M100 113 C106 111 113 111 119 113" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
//           <path d="M104 114 C108 116 112 116 116 114" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
//           {/* subtle cheek shade */}
//           <path d="M82 96 C86 100 90 101 94 99" stroke={SKIN_SHADE} strokeWidth="1.2" fill="none" opacity="0.6" />
//         </g>
//       </g>
//       <use href="#rickBody" filter="url(#rickChromaR)" className="chroma-fringe" />
//       <use href="#rickBody" filter="url(#rickChromaB)" className="chroma-fringe" />
//       <rect x="0" y="0" width="220" height="380" fill="url(#rickScan)" className="scan-overlay" />
//     </svg>
//   );
// }
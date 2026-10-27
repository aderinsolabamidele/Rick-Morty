import React from 'react';

// Shared SVG defs for the code-drawn characters: chromatic-aberration fringes
// (red/blue channel offsets) + a scanline pattern. Reused by Rick & Morty.
export default function SciFiFilters({ idPrefix }) {
  const cr = `${idPrefix}ChromaR`;
  const cb = `${idPrefix}ChromaB`;
  const scan = `${idPrefix}Scan`;
  return (
    <defs>
      <filter id={cr} x="-10%" y="-10%" width="120%" height="120%">
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
        <feOffset dx="1.4" dy="0" />
      </filter>
      <filter id={cb} x="-10%" y="-10%" width="120%" height="120%">
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        <feOffset dx="-1.4" dy="0" />
      </filter>
      <pattern id={scan} width="4" height="3" patternUnits="userSpaceOnUse">
        <rect width="4" height="3" fill="transparent" />
        <line x1="0" y1="0.5" x2="4" y2="0.5" stroke="rgba(34,211,238,0.25)" strokeWidth="0.5" />
      </pattern>
    </defs>
  );
}
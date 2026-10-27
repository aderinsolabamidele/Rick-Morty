import React from 'react';

// "Slime" logotype style: a heavy cartoon font with a green fill, dark outline,
// soft drop shadow, and an SVG turbulence-displacement filter that melts the
// edges into an organic, unstable shape (approximating the hand-drawn drip
// aesthetic without a custom font file). MeltFilterDef must render once per page.
export function MeltFilterDef() {
  return (
    <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
      <defs>
        <filter id="meltFilter" x="-12%" y="-12%" width="124%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="11" result="t" />
          <feDisplacementMap in="SourceGraphic" in2="t" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

export default function SlimeTitle({ text, className = '', small = false, as: Tag = 'span' }) {
  return (
    <Tag className={`slime-title ${small ? 'slime-title-sm' : ''} ${className}`}>{text}</Tag>
  );
}
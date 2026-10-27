import React from 'react';

// One half of a tilted orbit ellipse — render "back" behind the globe and "front" above it.
export default function OrbitRing({ half }) {
  const front = half === 'front';
  return (
    <svg viewBox="0 0 200 200" className="pointer-events-none absolute inset-[-7%] h-[114%] w-[114%]" aria-hidden="true">
      <g transform="rotate(-16 100 100)">
        <path
          d={front ? 'M 2 100 A 98 26 0 0 0 198 100' : 'M 2 100 A 98 26 0 0 1 198 100'}
          fill="none"
          stroke={front ? 'rgba(34,211,238,0.38)' : 'rgba(34,211,238,0.12)'}
          strokeWidth="0.35"
          strokeDasharray={front ? '0' : '1 1.6'}
        />
        {front && (
          <>
            <circle cx="100" cy="126" r="1.1" fill="#BEF264" />
            <text x="103" y="132" fill="rgba(34,211,238,0.6)" fontSize="3.2" fontFamily="JetBrains Mono, monospace" letterSpacing="0.4">
              ORB-01
            </text>
          </>
        )}
      </g>
    </svg>
  );
}
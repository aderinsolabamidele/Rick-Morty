import React from 'react';

// Small deterministic star field used inside dimension previews.
const STARS = Array.from({ length: 14 }, (_, i) => ({
  l: `${(i * 37) % 100}%`,
  t: `${(i * 61) % 100}%`,
  s: (i % 3) + 1,
  o: 0.3 + (i % 5) * 0.12,
}));

function Stars({ color = '#ffffff' }) {
  return (
    <>
      {STARS.map((st, i) => (
        <span key={i} className="absolute rounded-full" style={{ left: st.l, top: st.t, width: st.s, height: st.s, background: color, opacity: st.o }} />
      ))}
    </>
  );
}

function C137({ palette }) {
  return (
    <>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(190,242,100,0.14), transparent 62%)' }} />
      <div className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle at 35% 30%, #3b82f6 0%, #0b3a1f 72%)', boxShadow: '0 0 30px rgba(190,242,100,0.45)' }} />
      <div className="portal-swirl absolute left-1/2 top-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <Stars />
    </>
  );
}

function J19({ palette }) {
  return (
    <>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 45%, rgba(192,132,252,0.22), transparent 64%)' }} />
      {[
        { l: '22%', t: '30%', r: 0, c: palette.primary },
        { l: '68%', t: '38%', r: 14, c: palette.secondary },
        { l: '40%', t: '68%', r: -8, c: palette.primary },
        { l: '74%', t: '70%', r: 22, c: palette.secondary },
      ].map((o, i) => (
        <div key={i} className="mv-drift absolute" style={{ left: o.l, top: o.t, animationDelay: `${i * 0.8}s` }}>
          <div className="h-6 w-6 opacity-80" style={{ background: o.c, transform: `rotate(${o.r}deg)`, clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', filter: `drop-shadow(0 0 6px ${o.c})` }} />
        </div>
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={`p${i}`} className="mv-drift absolute rounded-full" style={{ left: `${(i * 29) % 100}%`, top: `${(i * 47) % 100}%`, width: 2, height: 2, background: palette.primary, opacity: 0.6, animationDelay: `${i * 0.4}s` }} />
      ))}
    </>
  );
}

function X420({ palette }) {
  return (
    <>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #031429 0%, #062a4a 70%, #0a3a5e 100%)' }} />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-1 opacity-90">
        {[10, 16, 8, 22, 14, 28, 12, 20, 9, 24, 14, 18].map((h, i) => (
          <div key={i} className="w-3 rounded-t-sm" style={{ height: `${h * 3}px`, background: `linear-gradient(180deg, ${palette.primary}, ${palette.secondary})`, boxShadow: `0 0 8px ${palette.primary}80` }} />
        ))}
      </div>
      <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 3px, rgba(34,211,238,0.08) 3px 4px)' }} />
      <Stars color={palette.primary} />
    </>
  );
}

function A12({ palette }) {
  return (
    <>
      <div className="absolute inset-0 bg-black" />
      <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2" style={{ borderColor: palette.primary, boxShadow: `0 0 24px ${palette.primary}80, inset 0 0 18px ${palette.primary}50`, opacity: 0.5 }} />
      {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
        <div key={i} className={`mv-blink-red absolute ${pos} flex items-center gap-1.5`}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: palette.primary }} />
          <span className="font-mono text-[7px] tracking-[0.2em]" style={{ color: palette.primary }}>DANGER</span>
        </div>
      ))}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[0.3em]" style={{ color: palette.primary, opacity: 0.6 }}>NO EXIT</div>
    </>
  );
}

function Unknown({ palette }) {
  return (
    <>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 40% 60%, rgba(124,58,237,0.18), transparent 60%)' }} />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="glitch-band absolute h-2 w-full" style={{ top: `${20 + i * 18}%`, background: i % 2 ? palette.primary : palette.secondary, opacity: 0.18 }} />
      ))}
      {['??', 'ERR', '████', 'NULL'].map((t, i) => (
        <span key={i} className="absolute font-mono text-[8px] tracking-[0.2em] text-portal/60" style={{ left: `${15 + i * 22}%`, top: `${25 + ((i * 37) % 50)}%`, transform: `rotate(${(i % 2 ? 1 : -1) * 6}deg)` }}>{t}</span>
      ))}
      <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-portal/50" />
    </>
  );
}

function D99({ palette }) {
  return (
    <>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(244,114,182,0.18), transparent 64%)' }} />
      {[
        { l: '30%', t: '34%', r: 20 },
        { l: '64%', t: '40%', r: -14 },
        { l: '46%', t: '64%', r: 8 },
        { l: '70%', t: '70%', r: 30 },
      ].map((o, i) => (
        <div key={i} className="mv-float absolute" style={{ left: o.l, top: o.t, animationDelay: `${i * 0.7}s` }}>
          <svg width="26" height="30" viewBox="0 0 26 30" style={{ transform: `rotate(${o.r}deg)`, filter: `drop-shadow(0 0 5px ${palette.primary})` }}>
            <polygon points="13,0 26,15 13,30 0,15" fill={palette.primary} opacity="0.85" stroke={palette.secondary} strokeWidth="1" />
          </svg>
        </div>
      ))}
    </>
  );
}

// Procedural environment for a dimension. Used both as the clipped interior of
// a floating portal preview and (full=true) as the entered-reality backdrop.
export default function DimensionEnvironment({ theme, palette, full = false }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: `radial-gradient(ellipse at 50% 45%, ${palette.bg} 0%, #020617 100%)` }}>
      {theme === 'c137' && <C137 palette={palette} />}
      {theme === 'j19' && <J19 palette={palette} />}
      {theme === 'x420' && <X420 palette={palette} />}
      {theme === 'a12' && <A12 palette={palette} />}
      {theme === 'unknown' && <Unknown palette={palette} />}
      {theme === 'd99' && <D99 palette={palette} />}
      <div className="space-vignette absolute inset-0" />
      {full && <div className="grain absolute inset-0 opacity-[0.04] mix-blend-overlay" />}
    </div>
  );
}
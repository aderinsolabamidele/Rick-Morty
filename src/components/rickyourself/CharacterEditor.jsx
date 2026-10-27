import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  BASES, SPECIES, SKIN_SWATCHES, EYE_STYLES, PUPIL_STYLES, EYE_COLORS,
  EXPRESSIONS, HAIR_STYLES, HAIR_COLORS, OUTFITS, OUTFIT_COLORS, ACCESSORIES, FEATURES,
} from '@/data/characterParts';

const TABS = [
  { id: 'species', label: 'SPECIES' },
  { id: 'skin', label: 'SKIN' },
  { id: 'face', label: 'FACE' },
  { id: 'hair', label: 'HAIR' },
  { id: 'outfit', label: 'OUTFIT' },
  { id: 'extras', label: 'EXTRAS' },
];

function Swatch({ color, active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label || color}
      title={label || color}
      className={cn(
        'h-7 w-7 rounded-full border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
        active ? 'scale-110 ring-2 ring-portal' : 'border-white/15'
      )}
      style={{ background: color }}
    />
  );
}

function Opt({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'min-h-[40px] rounded border px-3 py-2 font-mono text-[10px] tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
        active ? 'border-portal bg-portal/15 text-portal' : 'border-white/10 text-slate-300 hover:border-white/25 hover:text-white'
      )}
    >
      {children}
    </button>
  );
}

function Row({ label, children }) {
  return (
    <div className="mb-4">
      <p className="mb-2 font-mono text-[9px] tracking-[0.24em] text-cyan-hud/70">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

// Compact, tabbed lab-device control panel. No long form, no generic dashboard.
export default function CharacterEditor({ character: c, onChange }) {
  const [tab, setTab] = useState('species');
  const set = (patch) => onChange({ ...c, ...patch });
  const setEyes = (patch) => onChange({ ...c, eyes: { ...c.eyes, ...patch } });
  const setHair = (patch) => onChange({ ...c, hair: { ...c.hair, ...patch } });

  return (
    <div className="relative border border-white/10 bg-void/50 backdrop-blur-md">
      {/* tabs */}
      <div className="flex overflow-x-auto border-b border-white/10" style={{ scrollbarWidth: 'none' }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            aria-selected={tab === t.id}
            className={cn(
              'min-h-[44px] flex-1 whitespace-nowrap px-3 font-mono text-[10px] tracking-[0.18em] transition-colors focus-visible:outline-none',
              tab === t.id ? 'border-b-2 border-portal text-portal' : 'text-slate-400 hover:text-white'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="max-h-[52vh] overflow-y-auto p-4 lg:max-h-[60vh]">
        {tab === 'species' && (
          <>
            <Row label="BUILD">
              {BASES.map((b) => <Opt key={b.id} active={(c.base || 'rick') === b.id} onClick={() => set({ base: b.id, ...b.preset })}>{b.label}</Opt>)}
            </Row>
            <Row label="SPECIES">
              {SPECIES.map((s) => <Opt key={s.id} active={c.species === s.id} onClick={() => set({ species: s.id })}>{s.label}</Opt>)}
            </Row>
            <Row label="SKIN / BODY COLOR">
              {SKIN_SWATCHES.map((col) => <Swatch key={col} color={col} active={c.skin === col} onClick={() => set({ skin: col })} />)}
            </Row>
          </>
        )}
        {tab === 'skin' && (
          <Row label="SKIN / BODY COLOR">
            {SKIN_SWATCHES.map((col) => <Swatch key={col} color={col} active={c.skin === col} onClick={() => set({ skin: col })} />)}
          </Row>
        )}
        {tab === 'face' && (
          <>
            <Row label="EYES">
              {EYE_STYLES.map((o) => <Opt key={o.id} active={c.eyes.style === o.id} onClick={() => setEyes({ style: o.id })}>{o.label}</Opt>)}
            </Row>
            <Row label="PUPILS">
              {PUPIL_STYLES.map((o) => <Opt key={o.id} active={c.eyes.pupil === o.id} onClick={() => setEyes({ pupil: o.id })}>{o.label}</Opt>)}
            </Row>
            <Row label="EYE COLOR">
              {EYE_COLORS.map((col) => <Swatch key={col} color={col} active={c.eyes.color === col} onClick={() => setEyes({ color: col })} />)}
            </Row>
            <Row label="EXPRESSION">
              {EXPRESSIONS.map((o) => <Opt key={o.id} active={c.expression === o.id} onClick={() => set({ expression: o.id })}>{o.label}</Opt>)}
            </Row>
          </>
        )}
        {tab === 'hair' && (
          <>
            <Row label="HAIRSTYLE">
              {HAIR_STYLES.map((o) => <Opt key={o.id} active={c.hair.style === o.id} onClick={() => setHair({ style: o.id })}>{o.label}</Opt>)}
            </Row>
            <Row label="HAIR COLOR">
              {HAIR_COLORS.map((col) => <Swatch key={col} color={col} active={c.hair.color === col} onClick={() => setHair({ color: col })} />)}
            </Row>
          </>
        )}
        {tab === 'outfit' && (
          <>
            <Row label="CLOTHING">
              {OUTFITS.map((o) => <Opt key={o.id} active={c.outfit === o.id} onClick={() => set({ outfit: o.id })}>{o.label}</Opt>)}
            </Row>
            <Row label="OUTFIT COLOR">
              {OUTFIT_COLORS.map((col) => <Swatch key={col} color={col} active={c.outfitColor === col} onClick={() => set({ outfitColor: col })} />)}
            </Row>
          </>
        )}
        {tab === 'extras' && (
          <>
            <Row label="ACCESSORY">
              {ACCESSORIES.map((o) => <Opt key={o.id} active={c.accessory === o.id} onClick={() => set({ accessory: o.id })}>{o.label}</Opt>)}
            </Row>
            <Row label="UNUSUAL FEATURE">
              {FEATURES.map((o) => <Opt key={o.id} active={c.feature === o.id} onClick={() => set({ feature: o.id })}>{o.label}</Opt>)}
            </Row>
          </>
        )}
      </div>
    </div>
  );
}
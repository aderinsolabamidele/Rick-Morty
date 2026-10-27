import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Nebula from '@/components/space/Nebula';
import Starfield from '@/components/space/Starfield';
import DimensionPortal from '@/components/multiverse/DimensionPortal';
import MultiverseHUD from '@/components/multiverse/MultiverseHUD';
import MultiverseCharacters from '@/components/multiverse/MultiverseCharacters';
import RealityView from '@/components/multiverse/RealityView';
import SlimeTitle, { MeltFilterDef } from '@/components/hero/SlimeTitle';
import { DIMENSIONS } from '@/data/dimensions';

// Phase 5 — the Multiverse: a pannable dimensional space of floating realities.
// Drag to drift between them, hover to read a dimension, click to enter it.
export default function Multiverse() {
  const navigate = useNavigate();
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(null);
  const [entered, setEntered] = useState(null);
  const [current, setCurrent] = useState(DIMENSIONS[0]);

  // Quick-jump navigation lets touch users bring any reality into view without dragging the map.
  const jumpToDimension = (dim) => {
    setCurrent(dim);
    setPan({ x: -dim.position.x, y: -dim.position.y });
  };

  const onPointerDown = (e) => {
    if (entered) return;
    setDrag({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };
  const onPointerMove = (e) => {
    if (!drag) return;
    setPan({ x: e.clientX - drag.x, y: e.clientY - drag.y });
  };
  const onPointerUp = () => setDrag(null);

  const enterDim = (d) => { setCurrent(d); setEntered(d); };
  const exitDim = () => setEntered(null);

  return (
    <div className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-void text-white">
      <MeltFilterDef />
      <Nebula />
      <Starfield phase="idle" />

      {/* pannable dimensional space */}
      <div
        className={`absolute inset-0 ${drag ? 'mv-grab' : 'mv-grab'}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div className="absolute left-1/2 top-1/2" style={{ transform: `translate(-50%,-50%) translate(${pan.x}px, ${pan.y}px)` }}>
          {DIMENSIONS.map((d) => (
            <DimensionPortal key={d.id} dim={d} onEnter={enterDim} />
          ))}
        </div>
      </div>

      {/* title and quick-jump navigation */}
      <div className="pointer-events-none absolute left-1/2 top-4 z-20 flex w-full -translate-x-1/2 flex-col items-center px-3 text-center sm:top-5">
        <div className="font-mono text-[9px] tracking-[0.28em] text-cyan-hud/80 sm:text-[10px] sm:tracking-[0.32em]">PHASE 5 · MULTIVERSE MAP</div>
        <SlimeTitle as="h1" text="THE MULTIVERSE" className="text-[clamp(1.5rem,3.4vw,2.6rem)]" />
        <div className="handwritten text-xs text-portal/70 sm:text-sm">drag to drift between realities</div>
        <nav aria-label="Quick jump to a reality" className="pointer-events-auto mt-4 flex max-w-full items-center gap-2 overflow-x-auto px-1 pb-2 sm:mt-6 sm:gap-2.5">
          {DIMENSIONS.map((dim) => {
            const active = current.id === dim.id;
            return (
              <button
                key={dim.id}
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => jumpToDimension(dim)}
                aria-current={active ? 'location' : undefined}
                className="min-h-11 shrink-0 rounded border px-3 font-mono text-[11px] tracking-[0.12em] backdrop-blur-md transition-colors sm:px-4 sm:text-xs"
                style={{
                  borderColor: active ? dim.palette.primary : 'rgba(148,163,184,0.3)',
                  color: active ? dim.palette.primary : '#cbd5e1',
                  background: active ? `${dim.palette.primary}18` : 'rgba(2,6,23,0.72)',
                  boxShadow: active ? `0 0 14px ${dim.palette.primary}30` : 'none',
                }}
              >
                {dim.coord}
              </button>
            );
          })}
        </nav>
      </div>

      <MultiverseCharacters />
      <MultiverseHUD current={current} onReturn={() => navigate('/')} />

      <AnimatePresence>
        {entered && <RealityView dim={entered} onExit={exitDim} />}
      </AnimatePresence>
    </div>
  );
}
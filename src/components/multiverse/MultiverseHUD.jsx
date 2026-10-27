import React from 'react';
import { ArrowLeft } from 'lucide-react';

function Row({ k, v, color }) {
  return (
    <div className="flex items-center justify-between gap-6 py-0.5">
      <span className="text-slate-500">{k}</span>
      <span style={{ color: color || '#e2e8f0' }}>{v}</span>
    </div>
  );
}

// Dimensional navigation HUD: current reality readouts + RETURN TO C-137.
export default function MultiverseHUD({ current, onReturn }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 p-4 md:p-6">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-end justify-between gap-4">
        <div className="pointer-events-auto rounded border border-white/10 bg-void/70 p-3 font-mono text-[10px] tracking-[0.2em] backdrop-blur-md">
          <Row k="CURRENT REALITY" v={current.coord} color={current.palette.primary} />
          <Row k="PORTAL STABILITY" v={`${current.stability}%`} />
          <Row k="DIMENSIONAL DISTANCE" v={current.distance} />
          <Row k="REALITY STATUS" v={current.status} />
        </div>
        <button
          type="button"
          onClick={onReturn}
          className="cta-clip pointer-events-auto group relative inline-flex min-h-[46px] items-center gap-2 bg-portal/10 px-4 font-mono text-[11px] tracking-[0.22em] text-portal transition-colors hover:bg-portal hover:text-void"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          RETURN TO C-137
        </button>
      </div>
    </div>
  );
}
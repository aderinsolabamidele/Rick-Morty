import React from 'react';
import DimensionModal from './DimensionModal';

export default function DimensionPreview({
  dim,
  onClose,
  onEnter,
  onReturnHome,
}) {
  if (!dim) return null;

  const dimension = {
    ...dim,
    color: dim.color || '#BEF264',
    accent: dim.accent || '#22D3EE',
    code: dim.code || dim.label || dim.id || 'UNKNOWN',
    status: dim.status || 'UNSTABLE',
    name: dim.name || dim.label || 'UNKNOWN DIMENSION',
    desc: dim.lore || dim.desc || 'The records for this reality are incomplete.',
    info: Array.isArray(dim.info) ? dim.info : [],
    env: dim.env || 'glitch',
  };

  return (
    <div>
      <DimensionModal
        dim={dimension}
        onClose={onClose}
        onEnter={onEnter}
      />

      <button
        type="button"
        onClick={onReturnHome}
        className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 border border-white/20 bg-slate-950/90 px-4 py-3 font-mono text-[10px] tracking-[0.18em] text-lime-300 backdrop-blur-md transition hover:border-lime-300/70 hover:bg-slate-900"
      >
        RETURN TO C-137
      </button>
    </div>
  );
}

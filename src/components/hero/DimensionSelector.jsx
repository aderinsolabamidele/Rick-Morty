import React from 'react';
import { cn } from '@/lib/utils';
import DimensionVisual from '@/components/multiverse/DimensionVisual';

// Minimal dimension tuner integrated into the bottom edge of the hero.
// Each item is a miniature environmental preview (not a generic dot);
// the active one gets a soft glow + subtle scale. Secondary to the portal.
// Horizontally swipeable on mobile, touch-friendly, keyboard accessible.
export default function DimensionSelector({ dimensions, activeId, onSelect }) {
  const active = dimensions.find((d) => d.id === activeId) || dimensions[0];
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
      <div className="pointer-events-auto mx-auto flex max-w-md flex-col items-center gap-2 px-4 pb-4 sm:pb-5">
        {/* active dimension readout */}
        <div className="text-center">
          <p className="slime-title slime-title-sm text-base leading-none sm:text-lg">{active.name}</p>
          <p className="mt-1 font-mono text-[8.5px] tracking-[0.26em] text-cyan-hud/70">
            {active.code} · {active.status} · <span className="text-slate-500">{active.fanLabel}</span>
          </p>
        </div>

        {/* miniature environment previews */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {dimensions.map((d) => {
            const on = d.id === activeId;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => onSelect(d.id)}
                aria-pressed={on}
                aria-label={`Tune portal to ${d.name}`}
                className={cn(
                  'group relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:h-10 sm:w-10',
                  on ? 'scale-110' : 'hover:scale-105'
                )}
              >
                {/* soft glow when active */}
                <span
                  className="absolute inset-[-4px] rounded-full transition-opacity duration-300"
                  style={{ opacity: on ? 1 : 0, background: `radial-gradient(circle, ${d.palette.slime}66, transparent 70%)`, filter: 'blur(6px)' }}
                />
                {/* ring */}
                <span
                  className="absolute inset-0 rounded-full transition-all duration-300"
                  style={{ boxShadow: on ? `inset 0 0 0 1.5px ${d.palette.slime}, 0 0 12px ${d.palette.slime}88` : 'inset 0 0 0 1px rgba(255,255,255,0.12)' }}
                />
                {/* mini environment preview */}
                <span className="absolute inset-[2px] overflow-hidden rounded-full">
                  <DimensionVisual env={d.env} color={d.palette.slime} accent={d.palette.accent} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
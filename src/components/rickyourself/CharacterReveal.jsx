import React from 'react';
import { Download, Copy, Shuffle, Pencil, RotateCcw } from 'lucide-react';

// Reveal screen: the finished creation + multiverse identity + real export.
function Action({ onClick, children, primary }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={primary ? 'cta-glitch group relative inline-flex min-h-[48px] items-center' : 'inline-flex min-h-[44px] items-center gap-2 rounded border border-white/10 px-4 font-mono text-[10px] tracking-[0.2em] text-slate-300 transition-colors hover:border-white/25 hover:text-white'}
    >
      {primary ? (
        <>
          <span className="cta-clip absolute inset-0 bg-portal/50" />
          <span className="cta-clip absolute inset-px bg-void" />
          <span className="relative flex items-center gap-2 px-6 font-mono text-[11px] font-semibold tracking-[0.22em] text-portal transition-colors group-hover:text-void">
            {children}
          </span>
        </>
      ) : children}
    </button>
  );
}

function Field({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-white/5 py-1.5">
      <dt className="font-mono text-[9px] tracking-[0.2em] text-cyan-hud/60">{label}</dt>
      <dd className="text-right text-sm text-slate-200">{value}</dd>
    </div>
  );
}

export default function CharacterReveal({ figure, identity, copied, onDownload, onRandomize, onEdit, onCopy, onNew }) {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
      {/* figure */}
      <div className="relative border border-white/10 bg-void/40 p-4 backdrop-blur-md">
        <CornerTicks />
        <div className="relative mx-auto aspect-[220/380] w-full max-w-[360px]">
          <div className="portal-swirl absolute inset-[-4%] rounded-full opacity-[0.06]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.55)]">{figure}</div>
          </div>
        </div>
      </div>

      {/* identity */}
      <div className="relative border border-white/10 bg-void/50 p-6 backdrop-blur-md sm:p-8">
        <CornerTicks />
        <p className="font-mono text-[10px] tracking-[0.3em] text-portal">DIMENSIONAL ID · {identity.id}</p>
        <h2 className="slime-title mt-2 text-4xl sm:text-5xl">{identity.name}</h2>

        <dl className="mt-5">
          <Field label="SPECIES" value={identity.species} />
          <Field label="HOME DIMENSION" value={`${identity.homeDimension} (${identity.dimensionCode})`} />
          <Field label="PERSONALITY" value={identity.trait} />
        </dl>

        <p className="mt-4 text-sm leading-relaxed text-slate-300/85">{identity.bio}</p>
        <p className="handwritten mt-3 text-sm text-portal/50">// fan-made concept not official Rick &amp; Morty canon</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Action onClick={onDownload} primary>
            <Download className="h-4 w-4" /> DOWNLOAD PNG
          </Action>
          <Action onClick={onCopy}>
            <Copy className="h-4 w-4" /> {copied ? 'COPIED' : 'COPY DETAILS'}
          </Action>
          <Action onClick={onRandomize}><Shuffle className="h-4 w-4" /> RANDOMIZE</Action>
          <Action onClick={onEdit}><Pencil className="h-4 w-4" /> EDIT AGAIN</Action>
          <Action onClick={onNew}><RotateCcw className="h-4 w-4" /> NEW</Action>
        </div>
      </div>
    </div>
  );
}

function CornerTicks() {
  const c = 'absolute h-3 w-3 border-portal/50';
  return (
    <span aria-hidden="true" className="pointer-events-none">
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}
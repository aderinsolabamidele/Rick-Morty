import React, { useRef, useState } from 'react';
import { Shuffle, Undo2, RotateCcw, Sparkles } from 'lucide-react';
import NavBar from '@/components/nav/NavBar';
import Starfield from '@/components/space/Starfield';
import SlimeTitle, { MeltFilterDef } from '@/components/hero/SlimeTitle';
import DimensionEnvironment from '@/components/multiverse/DimensionEnvironment';
import CharacterFigure from '@/components/rickyourself/CharacterFigure';
import CharacterEditor from '@/components/rickyourself/CharacterEditor';
import CharacterReveal from '@/components/rickyourself/CharacterReveal';
import { useDimension } from '@/lib/dimensionStore';
import { defaultCharacter, randomCharacter, makeIdentity, formatIdentity } from '@/lib/characterIdentity';
import { exportSvgAsPng } from '@/lib/exportSvg';

function LabButton({ onClick, disabled, children, primary }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={primary ? 'cta-glitch group relative inline-flex min-h-[48px] items-center disabled:opacity-40' : 'inline-flex min-h-[44px] items-center gap-2 rounded border border-white/10 px-4 font-mono text-[10px] tracking-[0.2em] text-slate-300 transition-colors hover:border-white/25 hover:text-white disabled:opacity-40'}
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

export default function RickYourself() {
  const dimension = useDimension();
  const [character, setCharacter] = useState(defaultCharacter());
  const [history, setHistory] = useState([]);
  const [identity, setIdentity] = useState(null);
  const [mode, setMode] = useState('edit');
  const [copied, setCopied] = useState(false);
  const figureRef = useRef(null);

  const pushAndSet = (next) => { setHistory((h) => [...h, character]); setCharacter(next); };
  const randomize = () => { setHistory((h) => [...h, character]); setCharacter(randomCharacter()); };
  const reset = () => { setHistory((h) => [...h, character]); setCharacter(defaultCharacter()); };
  const undo = () => {
    setHistory((h) => {
      if (!h.length) return h;
      setCharacter(h[h.length - 1]);
      return h.slice(0, -1);
    });
  };
  const generate = () => { setIdentity(makeIdentity(character, dimension)); setMode('reveal'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const edit = () => setMode('edit');
  const startNew = () => { setCharacter(defaultCharacter()); setHistory([]); setIdentity(null); setMode('edit'); };
  const copy = async () => {
    if (!identity) return;
    try { await navigator.clipboard.writeText(formatIdentity(identity)); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard unavailable */ }
  };
  const download = async () => {
    if (!figureRef.current) return;
    await exportSvgAsPng(figureRef.current, `${(identity?.name || 'character').replace(/\s+/g, '_').toLowerCase()}.png`);
  };

  const figure = (animate) => <CharacterFigure ref={figureRef} character={character} animate={animate} />;

  return (
    <div className="relative min-h-[100svh] bg-void text-white">
      <MeltFilterDef />
      <div className="fixed inset-0 z-0 overflow-hidden">
        <DimensionEnvironment theme={dimension.theme} palette={dimension.palette} />
        <Starfield phase="idle" tint={dimension.atm} />
      </div>
      <NavBar />

      <main className="relative z-10 mx-auto max-w-[1400px] px-4 pb-20 pt-24 md:px-8">
        <div className="text-center">
          <p className="font-mono text-[10px] tracking-[0.32em] text-cyan-hud/80">PHASE 10 · INTERDIMENSIONAL CHARACTER FORGE</p>
          <h1 className="font-cartoon leading-[0.85]">
            <SlimeTitle text="RICK YOURSELF" className="text-[clamp(2.4rem,7vw,5rem)]" />
          </h1>
          <p className="handwritten mt-2 text-base text-portal/45">// an experimental device. do not operate unsupervised.</p>
        </div>

        {mode === 'edit' ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
            {/* preview device */}
            <div className="relative border border-white/10 bg-void/40 p-4 backdrop-blur-md">
              <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-portal/50" />
              <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-portal/50" />
              <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-portal/50" />
              <span aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-portal/50" />
              <div className="relative mx-auto aspect-[220/380] w-full max-w-[360px]">
                <div className="portal-swirl absolute inset-[-4%] rounded-full opacity-[0.06]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.55)]">{figure(true)}</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <LabButton onClick={randomize}><Shuffle className="h-4 w-4" /> RANDOMIZE</LabButton>
                <LabButton onClick={undo} disabled={!history.length}><Undo2 className="h-4 w-4" /> UNDO</LabButton>
                <LabButton onClick={reset}><RotateCcw className="h-4 w-4" /> RESET</LabButton>
                <LabButton onClick={generate} primary><Sparkles className="h-4 w-4" /> GENERATE IDENTITY</LabButton>
              </div>
            </div>

            {/* controls */}
            <CharacterEditor character={character} onChange={pushAndSet} />
          </div>
        ) : (
          <CharacterReveal
            figure={figure(true)}
            identity={identity}
            copied={copied}
            onDownload={download}
            onRandomize={randomize}
            onEdit={edit}
            onCopy={copy}
            onNew={startNew}
          />
        )}
      </main>
    </div>
  );
}
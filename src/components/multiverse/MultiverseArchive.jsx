import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SlimeTitle from '@/components/hero/SlimeTitle';
import DimensionOrb from './DimensionOrb';
import DimensionPreview from './DimensionPreview';
import { HERO_DIMENSIONS } from '@/data/heroDimensions';
import { ARCHIVE_HUMOR } from '@/data/archiveDimensions';
import { selectDimensionById } from '@/lib/dimensionStore';

const FLOATERS = [
  { l: '15%', t: '20%', d: '0s' }, { l: '82%', t: '30%', d: '1.4s' },
  { l: '30%', t: '78%', d: '2.1s' }, { l: '74%', t: '72%', d: '0.7s' },
];

// The Multiverse Archive shares the hero's dimension state (dimensionStore).
// Opening a dimension tunes the hero portal to it and opens an immersive
// preview; ENTER returns to the hero to explore it, RETURN TO C-137 resets.
export default function MultiverseArchive() {
  const [preview, setPreview] = useState(null);

  const openDim = (d) => { selectDimensionById(d.id); setPreview(d); };
  const enterDim = () => { setPreview(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const returnHome = () => { selectDimensionById('c137'); setPreview(null); };

  const linePath = HERO_DIMENSIONS.map((d) => `M50 50 L${parseFloat(d.left)} ${parseFloat(d.top)}`).join(' ');

  return (
    <div className="relative mx-auto max-w-[1600px] px-6 pb-28 pt-24 md:px-10 lg:px-14">
      {/* portal seam continuing from the hero */}
      <div className="pointer-events-none absolute -top-1 left-1/2 z-0 -translate-x-1/2">
        <div className="archive-seam mx-auto h-24 w-px" />
        <div className="portal-swirl mx-auto mt-1 h-10 w-10 rounded-full opacity-40" />
      </div>

      {/* intro */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative z-10 text-center"
      >
        <h2 className="font-cartoon leading-[0.85]">
          <SlimeTitle text="THE MULTIVERSE" className="text-[clamp(2.6rem,7vw,6rem)]" />
        </h2>
        <p className="mt-4 font-mono text-[11px] tracking-[0.32em] text-cyan-hud/80">∞ realities. One universe too many.</p>
        <p className="handwritten mt-3 text-base text-portal/45">// select a reality to tune the portal above</p>
      </motion.div>

      {/* dimensional field */}
      <div className="relative mt-16 lg:mt-20">
        {/* connecting dimensional lines (desktop) */}
        <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <g stroke="rgba(190,242,100,0.12)" strokeWidth="0.15" fill="none">
            <path d={linePath} />
          </g>
        </svg>

        {/* small floating portal objects (desktop atmosphere) */}
        {FLOATERS.map((f, i) => (
          <span key={i} className="mv-float absolute hidden h-1.5 w-1.5 rounded-full bg-portal/60 shadow-[0_0_10px_2px_rgba(190,242,100,0.4)] lg:block" style={{ left: f.l, top: f.t, animationDelay: f.d }} aria-hidden="true" />
        ))}

        {/* orbs: horizontal swipe on mobile, scattered on desktop */}
        <div className="flex snap-x snap-mandatory gap-10 overflow-x-auto px-2 pb-10 lg:absolute lg:inset-0 lg:block lg:h-[74vh] lg:overflow-visible lg:px-0 lg:pb-0">
          {HERO_DIMENSIONS.map((d) => (
            <div
              key={d.id}
              className="flex shrink-0 snap-center items-start justify-center lg:absolute lg:w-auto"
              style={{ top: d.top, left: d.left, width: '80vw', maxWidth: 340 }}
            >
              <DimensionOrb dim={d} onOpen={() => openDim(d)} />
            </div>
          ))}
        </div>

        {/* subtle humorous labels (desktop only) */}
        {ARCHIVE_HUMOR.map((h, i) => (
          <span
            key={i}
            className="handwritten absolute hidden text-sm text-portal/45 lg:block"
            style={{ top: h.top, left: h.left, transform: `rotate(${h.rot}deg)` }}
            aria-hidden="true"
          >
            {h.text}
          </span>
        ))}
      </div>

      <DimensionPreview dim={preview} onClose={() => setPreview(null)} onEnter={enterDim} onReturnHome={returnHome} />
    </div>
  );
}
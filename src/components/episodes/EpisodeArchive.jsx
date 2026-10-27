import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import SlimeTitle from '@/components/hero/SlimeTitle';
import EpisodeEntry from './EpisodeEntry';
import { EPISODES, EPISODES_OFFICIAL_DEST } from '@/data/episodes';

export default function EpisodeArchive() {
  return (
    <div className="relative mx-auto max-w-[1600px] px-6 pb-28 pt-20 md:px-10 lg:px-14">
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative text-center"
      >
        <h2 className="font-cartoon leading-[0.85]">
          <SlimeTitle text="EPISODES" className="text-[clamp(2.6rem,7vw,6rem)]" />
        </h2>
        <p className="mt-4 font-mono text-[11px] tracking-[0.32em] text-cyan-hud/80">INTERDIMENSIONAL TRANSMISSIONS</p>
        {/* subtle signal static bar */}
        <div className="signal-static mx-auto mt-5 h-3 w-40" aria-hidden="true" />
      </motion.div>

      {/* archive meta row */}
      <div className="mt-10 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-slate-500">
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 animate-blink rounded-full bg-portal" />SIGNAL FOUND</span>
        <span className="hidden sm:block">ARCHIVE VERIFIED</span>
        <span>FILE STATUS: STABLE</span>
      </div>

      {/* horizontal transmission timeline */}
      <div className="relative mt-8">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8">
          {EPISODES.map((ep, i) => (
            <EpisodeEntry key={ep.id} ep={ep} index={i} />
          ))}
        </div>

        {/* timeline rail */}
        <div className="pointer-events-none mt-2 flex items-center gap-2">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-portal/30 to-transparent" />
          <div className="flex items-center gap-3">
            {EPISODES.map((ep) => (
              <span key={ep.id} className="h-1.5 w-1.5 rounded-full bg-portal/40" />
            ))}
          </div>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-portal/30 to-transparent" />
        </div>
      </div>

      {/* official full-episode destination (full episodes are not on YouTube) */}
      <div className="mt-12 flex flex-col items-center gap-2 text-center">
        <p className="font-mono text-[10px] tracking-[0.26em] text-slate-500">Created By Dvxillan</p>
        <a
          href={EPISODES_OFFICIAL_DEST}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.22em] text-portal transition-colors hover:text-cyan-hud"
        >
        <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Image } from '@/components/ui/image';

// Each card is a real link to a verified official Adult Swim YouTube video,
// opening in a new tab. The background is the video's real YouTube thumbnail.
export default function EpisodeEntry({ ep, index }) {
  const href = `https://www.youtube.com/watch?v=${ep.youtubeId}`;
  const thumb = `https://i.ytimg.com/vi/${ep.youtubeId}/hqdefault.jpg`;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.99 }}
      className="group relative h-[260px] w-[86vw] shrink-0 snap-center overflow-hidden border border-white/10 bg-void text-left sm:w-[400px] lg:w-[440px]"
      aria-label={`Watch "${ep.title}" on YouTube  ${ep.kind}`}
    >
      {/* real YouTube thumbnail */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
        <Image src={thumb} alt={ep.title} fittingType="fill" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-transparent" />

      {/* scanlines + hover scan beam */}
      <div className="scanlines pointer-events-none absolute inset-0 opacity-40" />
      <div className="scan-beam pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* portal swirl accent */}
      <div className="portal-swirl pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20" />

      {/* content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-5">
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-slate-300/85">
          <span className="rounded-sm border border-portal/40 px-1.5 py-0.5 text-portal">{ep.kind}</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-portal" />
            {ep.status}
          </span>
        </div>

        <div>
          <h3 className="slime-title slime-title-sm text-3xl leading-[0.9] sm:text-4xl">{ep.title}</h3>
          <p className="mt-2 font-mono text-[10px] tracking-[0.22em] text-cyan-hud/80">DIMENSION: {ep.dimension}</p>
          <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-slate-300/85 opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
            {ep.desc}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.22em] text-portal">
            WATCH ON YOUTUBE <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* index node */}
      <span className="absolute bottom-3 right-4 font-mono text-[9px] tracking-[0.2em] text-slate-500">
        REC {String(index + 1).padStart(2, '0')}
      </span>
    </motion.a>
  );
}
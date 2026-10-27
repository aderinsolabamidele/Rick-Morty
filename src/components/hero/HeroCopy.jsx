
import React from 'react';
import { motion } from 'framer-motion';
import PrimaryCTA from '@/components/hero/PrimaryCTA';
import SlimeTitle from '@/components/hero/SlimeTitle';
import { HERO_COPY } from '@/data/homeContent';

const reveal = {
  hidden: { opacity: 0, y: 26 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.12,
      duration: 0.9,
      ease: [0.2, 0.8, 0.2, 1],
    },
  }),
};

export default function HeroCopy({ busy, dimmed, onEnter }) {
  const c = HERO_COPY;

  const item = (i) => ({
    custom: i,
    variants: reveal,
    initial: 'hidden',
    animate: 'show',
  });

  return (
    <motion.div
      animate={{
        opacity: dimmed ? 0.18 : 1,
        scale: dimmed ? 0.97 : 1,
        filter: dimmed ? 'blur(2px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative z-20 origin-left"
    >
      <h1 className="font-cartoon leading-[0.82]">
        <motion.span {...item(0)} className="block">
          <SlimeTitle
            text="RICK &"
            className="text-[clamp(3.6rem,8.5vw,7.5rem)]"
          />
        </motion.span>

        <motion.span {...item(1)} className="-mt-2 block">
          <SlimeTitle
            text="MORTY"
            className="text-[clamp(3.6rem,8.5vw,7.5rem)]"
          />
        </motion.span>
      </h1>

      <motion.p
        {...item(2)}
        className="mt-6 font-mono text-[11px] tracking-[0.34em] text-cyan-hud/80"
      >
        {c.titleBottom}
      </motion.p>

      <motion.p
        {...item(3)}
        className="mt-5 max-w-md text-base leading-relaxed text-slate-300/85 md:text-lg"
      >
        {c.tagline}
      </motion.p>

      <motion.div {...item(4)} className="mt-9">
        <PrimaryCTA
          label={c.primaryCta}
          busyLabel={c.primaryCtaBusy}
          busy={busy}
          onClick={onEnter}
        />
      </motion.div>
    </motion.div>
  );
}

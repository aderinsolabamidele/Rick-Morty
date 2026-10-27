
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Starfield from '@/components/space/Starfield';
import NavBar from '@/components/nav/NavBar';
import HeroCopy from '@/components/hero/HeroCopy';
import Earth from '@/components/earth/Earth';
import CursorReticle from '@/components/hud/CursorReticle';
import PortalDarken from '@/components/portal/PortalDarken';
import PortalOverlay from '@/components/portal/PortalOverlay';
import SciFiHud from '@/components/hud/SciFiHud';
import { MeltFilterDef } from '@/components/hero/SlimeTitle';
import MultiverseArchive from '@/components/multiverse/MultiverseArchive';
import EpisodeArchive from '@/components/episodes/EpisodeArchive';
import DimensionEnvironment from '@/components/multiverse/DimensionEnvironment';
import DimensionSelector from '@/components/hero/DimensionSelector';
import HeroCharacters from '@/components/hero/HeroCharacters';

import usePortalSequence from '@/hooks/usePortalSequence';
import { bindPointer } from '@/lib/pointer';
import { triggerActivation } from '@/lib/energy';
import { useDimension, selectDimensionById } from '@/lib/dimensionStore';
import { HERO_DIMENSIONS } from '@/data/heroDimensions';
import { playActivation } from '@/lib/audio';
import { rgba } from '@/lib/color';

export default function Home() {
  const { phase, start, reset, reached } = usePortalSequence();
  const navigate = useNavigate();
  const dimension = useDimension();

  const [origin, setOrigin] = useState(null);
  const [activating, setActivating] = useState(false);

  const earthRef = useRef(null);
  const activationTimer = useRef(null);

  useEffect(() => {
    bindPointer();

    return () => {
      if (activationTimer.current !== null) {
        window.clearTimeout(activationTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (phase === 'flash') {
      navigate('/multiverse');
    }
  }, [phase, navigate]);

  const enter = () => {
    const earth = earthRef.current;

    if (!earth) return;

    const rect = earth.getBoundingClientRect();

    setOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });

    triggerActivation();
    playActivation();
    setActivating(true);

    if (activationTimer.current !== null) {
      window.clearTimeout(activationTimer.current);
    }

    activationTimer.current = window.setTimeout(() => {
      setActivating(false);
      activationTimer.current = null;
    }, 1600);

    start();
  };

  const dimmed = reached('darken');

  // Adapt the existing dimension data to the environment component's API.
  const environmentPalette = {
    ...dimension.palette,
    bg: dimension.sky?.[0] ?? '#020617',
    primary: dimension.palette?.slime ?? dimension.color ?? '#BEF264',
    secondary:
      dimension.palette?.accent ?? dimension.accent ?? '#22D3EE',
  };

  // Existing dimensions use env values such as "cronenberg", "frost",
  // "wasteland", and "replacement". Map them to supported environments.
  const environmentThemeMap = {
    c137: 'c137',
    cronenberg: 'unknown',
    frost: 'j19',
    wasteland: 'x420',
    replacement: 'a12',
  };

  const environmentTheme =
    environmentThemeMap[dimension.env] ?? 'unknown';

  return (
    <div className="relative min-h-[100svh] bg-void text-white">
      <MeltFilterDef />

      {/* Shared cosmic background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={dimension.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <DimensionEnvironment
              theme={environmentTheme}
              palette={environmentPalette}
            />
          </motion.div>
        </AnimatePresence>

        <Starfield
          phase={phase}
          origin={origin}
          tint={dimension.atm}
        />

        {/* Dimensional transition flash */}
        <AnimatePresence>
          <motion.div
            key={`flash-${dimension.id}`}
            initial={{ opacity: 0.45 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 42%, ${rgba(
                dimension.palette?.slime ?? '#BEF264',
                0.22
              )}, transparent 60%)`,
            }}
          />
        </AnimatePresence>
      </div>

      {/* Hero */}
      <section className="relative z-10 h-[100svh] min-h-[640px] w-full overflow-hidden">
        <PortalDarken active={dimmed} />
        <NavBar dimmed={dimmed} />

        <motion.main
          animate={{ scale: activating ? 1.03 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col items-center justify-center gap-10 px-6 pb-24 pt-24 md:px-10 lg:grid lg:grid-cols-12 lg:gap-0 lg:px-14 lg:pb-16 lg:pt-16"
        >
          <div className="order-2 w-full lg:order-1 lg:col-span-6">
            <HeroCopy
              busy={phase !== 'idle'}
              dimmed={dimmed}
              onEnter={enter}
            />
          </div>

          <div className="relative order-1 flex w-full items-center justify-center lg:order-2 lg:col-span-6">
            <Earth
              ref={earthRef}
              phase={phase}
              focused={false}
              onActivate={enter}
              palette={dimension.palette}
            />
          </div>
        </motion.main>

        <SciFiHud dimmed={dimmed} />

        <DimensionSelector
          dimensions={HERO_DIMENSIONS}
          activeId={dimension.id}
          onSelect={selectDimensionById}
        />

        <HeroCharacters />

        <PortalOverlay
          phase={phase}
          origin={origin}
          onReset={reset}
        />
      </section>

      {/* Multiverse archive */}
      <section className="relative z-10">
        <MultiverseArchive />
      </section>

      {/* Episode archive */}
      <section id="episodes" className="relative z-10">
        <EpisodeArchive />
      </section>

      <CursorReticle />
    </div>
  );
}

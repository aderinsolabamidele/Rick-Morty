import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { GEO } from './figure/constant';
import Body from './figure/Body';
import { HairBack, HairFront } from './figure/Hair';
import { Ears, HeadBack, Face } from './figure/Head';
import Eyes from './figure/Eyes';
import { Brows, Mouth } from './figure/Expression';
import FaceDetails from './figure/FaceDetails';
import { Accessory, HeadFeature } from './figure/Extras';

// Generator renderer. Both builds get desynced idle micro-animations so
// neither feels static. All styling is inline so the SVG exports to PNG.
const CharacterFigure = forwardRef(function CharacterFigure({ character: c, animate = true, className = '' }, ref) {
  const base = c.base === 'morty' ? 'morty' : 'rick';
  const g = GEO[base];
  const idle = (rickClass, mortyClass) =>
    animate ? (base === 'rick' ? rickClass : base === 'morty' ? mortyClass : '') : '';
  return (
    <svg ref={ref} viewBox="0 0 220 380" className={cn('block h-full w-full overflow-visible', className)} role="img" aria-label="Generated character">
      <g className={animate ? 'char-float' : ''}>
        <g className={idle('rick-breathe', 'morty-breathe')}>
          <Body c={c} base={base} animate={animate} />
          <g transform={g.headTransform}>
            <g className={idle('rick-head-idle', 'morty-head-idle')}>
              <HairBack c={c} g={g} />
              <HeadBack c={c} g={g} />
              <Ears c={c} g={g} />
              <Face c={c} g={g} />
              <HairFront c={c} g={g} />
              <Eyes c={c} g={g} base={base} />
              <g className={idle('rick-brow-idle', 'morty-brow-idle')}>
                <Brows base={base} expr={c.expression} />
              </g>
              <g className={idle('rick-mouth-idle', 'morty-mouth-idle')}>
                <Mouth g={g} base={base} expr={c.expression} />
              </g>
              <FaceDetails c={c} g={g} base={base} />
              <Accessory c={c} g={g} />
              <HeadFeature c={c} g={g} />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
});

export default CharacterFigure;
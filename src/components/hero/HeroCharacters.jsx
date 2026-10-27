import React from 'react';
import CharacterStage from '@/components/characters/CharacterStage';

// Rick loiters in the lower-left of the hero, reacting to the dimension
// selector beside him: portal light grades to the active universe and he
// startles subtly when you switch. Desktop-only and pointer-events-none so the
// clean hero composition is preserved on tablet/mobile.
export default function HeroCharacters() {
  return (
    <div
      className="pointer-events-none absolute bottom-24 left-1 z-10 hidden h-[14vh] lg:block"
      style={{ aspectRatio: '220 / 380' }}
      aria-hidden="true"
    >
      <CharacterStage>
      </CharacterStage>
    </div>
  );
}
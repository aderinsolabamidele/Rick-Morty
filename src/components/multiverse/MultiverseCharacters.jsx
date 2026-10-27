import React from 'react';
import CharacterStage from '@/components/characters/CharacterStage';
// Rick loiters near the dimensional navigation system. He does not dominate 
// small, off to the side, occasionally judging your choice of reality. The
// stage grades him to the active dimension's portal light and startles him
// subtly when you switch realities.
export default function MultiverseCharacters() {
  return (
    <div className="pointer-events-none fixed bottom-28 left-4 z-20 hidden md:block" style={{ height: '17vh', aspectRatio: '220 / 380' }}>
      <CharacterStage>
      </CharacterStage>
      <span className="handwritten absolute -right-10 top-2 -rotate-3 text-sm text-portal/70">pick one, broh</span>
    </div>
  );
}
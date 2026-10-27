import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { setAudioEnabled } from '@/lib/audio';
import { cn } from '@/lib/utils';

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const toggle = () => { const n = !on; setAudioEnabled(n); setOn(n); };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={on ? 'Mute ambient sound' : 'Enable ambient sound'}
      aria-pressed={on}
      className={cn(
        'flex h-11 w-11 items-center justify-center rounded-sm border transition-colors',
        on ? 'border-portal/60 text-portal' : 'border-slate-600/60 text-slate-400 hover:text-slate-200'
      )}
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
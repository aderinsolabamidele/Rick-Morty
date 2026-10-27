import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { setEnergy } from '@/lib/energy';

export default function PrimaryCTA({ label, busyLabel, busy, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      aria-busy={busy}
      onMouseEnter={() => setEnergy(1)}
      onMouseLeave={() => setEnergy(0)}
      onFocus={() => setEnergy(1)}
      onBlur={() => setEnergy(0)}
      className="cta-glitch group relative inline-flex min-h-[56px] items-center disabled:cursor-wait"
    >
      <span className="cta-clip absolute inset-0 bg-portal/50" />
      <span className="cta-clip absolute inset-px bg-void" />
      <span className={cn('cta-clip absolute inset-px origin-left bg-portal transition-transform duration-500 ease-in-out', busy ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100')} />
      <span className={cn('relative flex items-center gap-3 px-8 font-mono text-[12px] font-semibold tracking-[0.22em] transition-colors duration-300', busy ? 'text-void' : 'text-portal group-hover:text-void')}>
        {busy ? (
          <>
            <span className="h-3 w-3 animate-spin rounded-full border border-void border-t-transparent" />
            {busyLabel}
          </>
        ) : (
          <>
            {label}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </>
        )}
      </span>
    </button>
  );
}
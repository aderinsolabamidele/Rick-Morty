import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Archive-style nav entries: an index code + label + status marker, not plain links.
const base = 'nav-flicker group relative inline-flex min-h-[44px] items-center gap-1.5 px-3 font-mono text-[11px] tracking-[0.2em] transition-colors lg:px-4';

export default function NavItem({ item, onNavigate }) {
  if (item.enabled) {
    return (
      <Link to={item.to} aria-current="page" onClick={onNavigate} className={cn(base, 'text-portal')}>
        <span className="text-cyan-hud/50">{item.code}</span>
        {item.label}
        <span className="ml-1 h-1.5 w-1.5 rounded-full bg-portal shadow-[0_0_6px_2px_rgba(190,242,100,0.6)]" />
      </Link>
    );
  }
  return (
    <button type="button" aria-disabled="true" title="Sealed file" className={cn(base, 'cursor-not-allowed text-slate-400 hover:text-slate-200')}>
      <span className="text-slate-600">{item.code}</span>
      {item.label}
      <span className="ml-1 text-yellow-400/60">◌</span>
      <span className="pointer-events-none absolute bottom-0.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8.5px] tracking-[0.25em] text-cyan-hud/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        LOCKED // SEALED
      </span>
    </button>
  );
}
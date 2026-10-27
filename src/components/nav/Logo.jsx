import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

// Site logo: the uploaded Rick & Morty portal image, framed as a circular
// dimensional portal mark, with a small mono wordmark beside it.
const LOGO_URL = 'https://media.base44.com/images/public/6ab86ad3b432b3ab889d9652/37fb13be3__5.jpeg';

export default function Logo() {
  return (
    <Link to="/" aria-label="Rick and Morty Multiverse home" className="group flex min-h-[44px] items-center gap-3">
      <div className="relative h-11 w-11 shrink-0">
        <div className="absolute -inset-1 rounded-full bg-portal/20 blur-md transition-opacity duration-300 group-hover:bg-portal/40" />
        <div className="absolute inset-0 overflow-hidden rounded-full ring-2 ring-portal/70">
          <Image src={LOGO_URL} fittingType="fill" focalPointY={0.42} alt="Rick and Morty portal" className="h-full w-full" />
        </div>
        <div className="mv-ring-spin absolute -inset-[3px] rounded-full border border-dashed border-cyan-hud/50" />
      </div>
      <span className="font-mono text-[10.5px] leading-tight tracking-[0.2em]">
        <span className="block text-white">R&amp;M</span>
        <span className="block text-slate-500">MULTIVERSE X Dvxillan </span>
      </span>
    </Link>
  );
}
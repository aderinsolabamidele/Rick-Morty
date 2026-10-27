import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '@/components/nav/Logo';
import NavItem from '@/components/nav/NavItem';
import StatusIndicator from '@/components/nav/StatusIndicator';
import MobileMenu from '@/components/nav/MobileMenu';
import SoundToggle from '@/components/hud/SoundToggle';
import { NAV_ITEMS } from '@/data/homeContent';

export default function NavBar({ dimmed }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: dimmed ? 0.2 : 1, y: dimmed ? -6 : 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 top-0 z-40 bg-void/40 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:px-10 lg:px-14">
        <Logo />
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center">
            {NAV_ITEMS.map((item) => <li key={item.label}><NavItem item={item} /></li>)}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <SoundToggle />
          <StatusIndicator />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className={`h-px w-5 bg-slate-200 transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-5 bg-slate-200 transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-hud/20 to-transparent" />
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </motion.header>
  );
}
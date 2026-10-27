import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import NavItem from '@/components/nav/NavItem';
import { NAV_ITEMS } from '@/data/homeContent';

export default function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          id="mobile-menu"
          aria-label="Mobile"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="border-b border-cyan-hud/10 bg-void/95 px-6 py-3 backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}><NavItem item={item} onNavigate={onClose} /></li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
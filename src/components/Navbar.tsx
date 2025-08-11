"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION, ANIMATION_CONSTANTS } from '@/lib/constants';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  // Remove any stale dynamic variables for framer-motion (ensures clean build)
  // (No dynamic() usage here)

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom flex items-center justify-between py-2 px-4 min-h-[48px]">
        <Link href="/" className="flex items-center gap-2 md:gap-3 group">
          <Image src="/hasbahce-logo.png" alt="Hasbahçe Restoran Amasya - Geleneksel Türk Mutfağı" width={36} height={36} className="object-contain w-[36px] h-[36px] md:w-[60px] md:h-[60px] transition-transform group-hover:scale-105" priority />
          <div className="flex flex-col">
            <span className="text-base md:text-xl font-bold text-green-800 tracking-wide leading-tight">HASBAHÇE</span>
            <span className="text-[10px] md:text-sm text-gray-600 font-medium">Cafe & Restaurant</span>
          </div>
        </Link>
        
        {/* Mobil Menü Butonu */}
        <button
          className="md:hidden p-2 ml-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menüyü Aç/Kapat"
        >
          <motion.div
            animate={menuOpen ? "open" : "closed"}
            className="relative w-7 h-7"
          >
            <motion.span
              className="absolute top-0 left-0 w-7 h-0.5 bg-gray-700 rounded-full"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 8 }
              }}
              transition={{ duration: ANIMATION_CONSTANTS.DURATION.NORMAL }}
            />
            <motion.span
              className="absolute top-3 left-0 w-7 h-0.5 bg-gray-700 rounded-full"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              transition={{ duration: ANIMATION_CONSTANTS.DURATION.NORMAL }}
            />
            <motion.span
              className="absolute top-6 left-0 w-7 h-0.5 bg-gray-700 rounded-full"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -8 }
              }}
              transition={{ duration: ANIMATION_CONSTANTS.DURATION.NORMAL }}
            />
          </motion.div>
        </button>

        {/* Masaüstü Menü */}
        <nav className="hidden md:flex gap-2 md:gap-4" aria-label="Ana menü">
          {NAVIGATION.LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg font-medium text-sm md:text-base transition-colors
                ${pathname === link.href ? 'bg-red-600 text-white shadow' : 'text-gray-700 hover:bg-red-100 hover:text-red-700'}`}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobil Açılır Menü - Animasyonlu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: ANIMATION_CONSTANTS.DURATION.NORMAL, ease: "easeInOut" }}
            className="md:hidden bg-white shadow-lg border-t border-gray-100 overflow-hidden"
          >
            <motion.nav
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: ANIMATION_CONSTANTS.DURATION.NORMAL, delay: ANIMATION_CONSTANTS.DELAY.SMALL }}
              className="flex flex-col px-4 py-2 gap-1"
            >
              {NAVIGATION.LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: ANIMATION_CONSTANTS.DURATION.NORMAL, delay: index * ANIMATION_CONSTANTS.DELAY.SMALL }}
                >
                  <Link
                    href={link.href}
                    className={`block px-3 py-3 rounded-lg font-medium text-base transition-all duration-200
                      ${pathname === link.href 
                        ? 'bg-red-600 text-white shadow-lg scale-105' 
                        : 'text-gray-700 hover:bg-red-50 hover:text-red-700 hover:scale-105'
                      }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 
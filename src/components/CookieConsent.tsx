'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ANIMATION_CONSTANTS, COOKIE_CONSTANTS } from '@/lib/constants';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // localStorage'dan çerez durumunu kontrol et (sadece client-side'da)
    if (typeof window !== 'undefined') {
      const cookiesAccepted = localStorage.getItem(COOKIE_CONSTANTS.STORAGE_KEY);
      if (!cookiesAccepted) {
        setShowConsent(true);
      }
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSTANTS.STORAGE_KEY, 'true');
    }
    setShowConsent(false);

    // GA yüklemesi, global GoogleAnalytics bileşeni tarafından yapılacak.
    // Burada yalnızca kabul event'ini yayınlıyoruz.
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cookie:accepted'));
    }
  };

  const handleReject = () => {
    setShowConsent(false);
  };

  const handleMoreInfo = () => {
    if (typeof window !== 'undefined') {
      window.open(COOKIE_CONSTANTS.MORE_INFO_URL, '_blank', 'noopener,noreferrer');
    }
  };

  // Server-side rendering sırasında hiçbir şey render etme
  if (!isClient) {
    return null;
  }

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: ANIMATION_CONSTANTS.DURATION.NORMAL }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 lg:left-1/2 lg:right-auto lg:w-96 lg:-translate-x-1/2 z-50"
        >
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 md:p-6">
            <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed font-light">
              {COOKIE_CONSTANTS.MESSAGE}
            </p>
            <div className="space-y-3">
              <button
                onClick={handleAccept}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm md:text-base"
              >
                {COOKIE_CONSTANTS.BUTTONS.ACCEPT}
              </button>
              <button
                onClick={handleReject}
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm md:text-base"
              >
                {COOKIE_CONSTANTS.BUTTONS.REJECT}
              </button>
              <button
                onClick={handleMoreInfo}
                className="w-full text-gray-500 hover:text-gray-700 font-light text-xs md:text-sm transition-colors duration-200 underline"
              >
                {COOKIE_CONSTANTS.BUTTONS.MORE_INFO}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 
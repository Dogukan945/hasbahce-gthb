"use client";

import { CONTACT_CONSTANTS } from '@/lib/constants';

export default function MobileQuickActions() {
  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 safe-bottom">
      <div className="flex gap-3">
        <a
          href={`tel:${CONTACT_CONSTANTS.FEATURES.ILETISIM.PHONE.replace(/\s+/g, '')}`}
          className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold text-center shadow-lg active:scale-[0.98]"
          aria-label="Telefon ile ara"
        >
          Ara
        </a>
        <a
          href="/menu"
          className="flex-1 bg-black text-white py-3 rounded-xl font-semibold text-center shadow-lg active:scale-[0.98]"
          aria-label="Menüyü aç"
        >
          Menü
        </a>
        <a
          href={CONTACT_CONSTANTS.FEATURES.MERKEZI_KONUM.LOCATION_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold text-center shadow-lg active:scale-[0.98]"
          aria-label="Haritada aç"
        >
          Haritada Aç
        </a>
      </div>
    </div>
  );
}



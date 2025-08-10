'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { COOKIE_CONSTANTS } from '@/lib/constants';

/**
 * Google Analytics yüklemesini çerez onayına bağlar.
 * - İlk yüklemede localStorage kontrol edilir
 * - Onay anında `cookie:accepted` event'i dinlenir ve GA yüklenir
 */
const GoogleAnalytics = () => {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const accepted = localStorage.getItem(COOKIE_CONSTANTS.STORAGE_KEY) === 'true';
    if (accepted) {
      setConsented(true);
    }

    const onAccepted = () => setConsented(true);
    window.addEventListener('cookie:accepted', onAccepted);
    return () => window.removeEventListener('cookie:accepted', onAccepted);
  }, []);

  if (!consented) return null;

  return (
    <>
      <Script
        src={COOKIE_CONSTANTS.ANALYTICS.SCRIPT_URL}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date());
          gtag('config', '${COOKIE_CONSTANTS.ANALYTICS.ID}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
'use client';

import { useEffect } from 'react';

export default function DeferredStyles() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/deferred.css';
    link.media = 'all';
    document.head.appendChild(link);
    return () => {
      try {
        document.head.removeChild(link);
      } catch {
        // ignore
      }
    };
  }, []);
  return null;
}



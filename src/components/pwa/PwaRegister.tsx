'use client';

import { useEffect } from 'react';

export const PwaRegister = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('PWA service worker registration failed:', err);
      });
    }
  }, []);

  return null;
};

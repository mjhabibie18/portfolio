'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track if we have a valid pathname
    if (!pathname) return;

    // Send the tracking request in the background
    // We use a small timeout to ensure the page has mostly loaded
    const timeout = setTimeout(() => {
      fetch('/api/portfolio/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path: pathname })
      }).catch(err => {
        // Silently fail if tracking fails (e.g. adblocker)
        console.error('Failed to track visit', err);
      });
    }, 1500);

    return () => clearTimeout(timeout);
  }, [pathname]);

  // Handle scroll to top on refresh/mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      // Hanya scroll ke atas jika tidak ada hash (misal #about) di URL
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  return null; // This component doesn't render anything
}

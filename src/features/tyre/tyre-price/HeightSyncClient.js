'use client';

import { useEffect } from 'react';

const HeightSyncClient = () => {
  useEffect(() => {
    const syncHeights = () => {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        // lg breakpoint
        const leftContent = document.getElementById('left-content');
        const rightPriceList = document.querySelector('.right-price-container');

        if (leftContent && rightPriceList) {
          // Reset heights first
          rightPriceList.style.height = 'auto';

          // Get the actual height of left content
          const leftHeight = leftContent.offsetHeight;

          // Set right container to match left height
          rightPriceList.style.height = `${leftHeight}px`;
        }
      }
    };

    // Initial sync
    syncHeights();

    // Sync on window resize
    window.addEventListener('resize', syncHeights);

    // Sync when content changes (for read more/less functionality)
    const observer = new MutationObserver(syncHeights);
    const leftContent = document.getElementById('left-content');
    if (leftContent) {
      observer.observe(leftContent, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class'],
      });
    }

    return () => {
      window.removeEventListener('resize', syncHeights);
      observer.disconnect();
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default HeightSyncClient;

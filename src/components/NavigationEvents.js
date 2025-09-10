// app/components/NavigationEvents.js
'use client';

import { useEffect, useState, Suspense, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import PageLoader from './PageLoader';

function NavigationEventsContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const isInitialRender = useRef(true);
  const previousPath = useRef(pathname + searchParams.toString());

  useEffect(() => {
    const currentPath = pathname + searchParams.toString();

    if (isInitialRender.current) {
      isInitialRender.current = false;
      previousPath.current = currentPath; // Set initial path
      return;
    }

    // Only show loader if the path has actually changed
    if (previousPath.current !== currentPath) {
      window.scrollTo(0, 0);

      setIsLoading(true);
      previousPath.current = currentPath; // Update previous path

      // Option 1: Minimal loader visibility - hides very quickly
      // This makes the loader flash, indicating activity.
      // For a more noticeable loader, a short timeout is better.
      const timer = setTimeout(() => setIsLoading(false), 100); // Short delay to ensure it renders
      return () => clearTimeout(timer);

      // Option 2: Slightly longer, fixed duration loader (like before, but potentially shorter)
      // const timer = setTimeout(() => {
      //   setIsLoading(false);
      // }, 500); // Example: 500ms
      // return () => clearTimeout(timer);
    } else {
      // If the path hasn't changed (e.g. only a hash change, or a re-render for other reasons)
      // ensure loader is off.
      setIsLoading(false);
    }
  }, [pathname, searchParams]);

  return <PageLoader isLoading={isLoading} />;
}

// Wrap NavigationEventsContent with Suspense as useSearchParams usage requires it
export function NavigationEvents() {
  return (
    <Suspense fallback={null}>
      <NavigationEventsContent />
    </Suspense>
  );
}

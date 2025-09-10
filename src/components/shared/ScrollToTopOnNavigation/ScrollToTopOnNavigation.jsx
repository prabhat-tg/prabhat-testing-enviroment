"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const ScrollToTopOnNavigation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, searchParams.toString()]);

  return null;
};

export default ScrollToTopOnNavigation;

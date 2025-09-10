'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const GlobalCTA = ({
  isMobile,
  mediaURL
}) => {

  const [hideGlobalCta, setHideGlobalCta] = useState(false);
  const [checked, setChecked] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check if CTA was hidden within last 30 minutes
    const lastClosed = localStorage.getItem("ctaClosedAt");

    if (lastClosed) {
      const closedAt = parseInt(lastClosed, 10);
      const thirtyMinutes = 30 * 60 * 1000;
      // const thirtyMinutes = 10 * 1000; // Testing - 10 sec

      if (Date.now() - closedAt < thirtyMinutes) {
        setHideGlobalCta(true);
      }
    }
    setChecked(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClose = () => {
    localStorage.setItem("ctaClosedAt", Date.now().toString());
    setHideGlobalCta(true);
  };

  if (!isMobile) {
    return (
      <Link
        href="https://tr.ee/LDQEOm"
        // target="_blank"
        rel="noopener noreferrer"
        className="hidden md:flex flex-col items-center max-h-[45px] max-w-[150px] cursor-pointer"
      >
        <Image
          alt="profile-icon"
          title="profile-icon"
          width="112"
          height="56"
          className='w-full h-full object-contain'
          src={mediaURL}
        />
      </Link>
    );
  } else {
    // Don't render until localStorage is checked
    if (!checked) return null;
    return !hideGlobalCta ? (
      <div className={`${isScrolled ? 'bottom-[180px]' : 'bottom-[148px]'} fixed right-[-2px] z-[11]`}>
        {/* <div className="bottom-[148px] fixed right-[-2px] z-[11]"> */}
        <Link
          href="https://tr.ee/LDQEOm"
          // target="_blank"
          rel="noopener noreferrer"
          className="flex md:hidden flex-col items-center max-h-[60px] max-w-[120px] border-[2px] rounded-s cursor-pointer"
        >
          <Image
            alt="profile-icon"
            title="profile-icon"
            width="112"
            height="56"
            className='w-full h-full max-h-[56px] object-contain'
            src={mediaURL}
          />
        </Link>
        <button
          className="absolute -left-2 -top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full bg-white"
          // onClick={() => {
          //   setHideGlobalCta(true);
          // }}
          onClick={handleClose}
        >
          <Image
            src={'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'}
            height={50}
            width={50}
            alt="close icon"
            title="close icon"
          />
        </button>
      </div>
    ) : null
  }
};

export default GlobalCTA;

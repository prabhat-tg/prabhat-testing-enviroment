'use client';
import React, { useEffect, useState, forwardRef } from 'react';
import { setCookie } from '@/src/utils/cookies';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './LanguagePop.css';
import { fetchData } from '@/src/services/apiMethods';

const LanguagePopupMain = forwardRef(({ onClosePopup, currentLang }, ref) => {
  const [showPopup, setShowPopup] = useState(true);
  const [popupImage, setPopupImage] = useState(null);
  const router = useRouter();

  const handlePopupClose = e => {
    e?.stopPropagation();
    setShowPopup(false);
    onClosePopup?.();

    // Track popup close event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'language_popup_close', {
        event_category: 'engagement',
        event_label: 'language_popup',
      });
    }
  };

  const handleLanguageClick = async (lang, e) => {
    e.stopPropagation();
    setShowPopup(false);
    onClosePopup?.();

    // Track language selection event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'language_selection', {
        event_category: 'engagement',
        event_label: lang,
        custom_parameter_1: 'language_popup',
      });
    }

    const expiresInOneHour = new Date();
    expiresInOneHour.setTime(expiresInOneHour.getTime() + 1 * 60 * 60 * 1000);

    setCookie('skipLanguagePopup', lang, {
      path: '/',
      sameSite: 'Lax',
      secure: true,
    });

    if (lang === currentLang) return;

    await fetch('/nx-api/set-language', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang }),
    });

    setTimeout(() => {
      const currentPath = window.location.pathname;
      const newPath =
        lang === 'hi'
          ? `/hi${currentPath === '/' ? '' : currentPath}`
          : currentPath.replace(/^\/hi/, '') || '/';
      router.push(newPath);
    }, 100);
  };

  useEffect(() => {
    const fetchPopupImage = async () => {
      try {
        const res = await fetchData('/api/language_popup_image');
        console.log('Popup image response:', res);

        setPopupImage(res?.data?.[0]?.image);
      } catch (err) {
        console.error('Failed to fetch popup image', err);
      }
    };
    fetchPopupImage();
  }, []);

  // Track popup visibility when component mounts
  useEffect(() => {
    if (showPopup && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'language_popup_visible', {
        event_category: 'engagement',
        event_label: 'language_popup_shown',
      });
    }
  }, [showPopup]);

  if (!showPopup) return null;

  return (
    <section className="langPopupContainer">
      <div id="languagePopup" className="langPopupDiv">
        <div className="langSelectionDiv" ref={ref}>
          <button
            className="absolute right-2 top-2 flex h-6 w-6 min-w-6 items-center justify-center rounded-full"
            onClick={handlePopupClose}
          >
            <Image
              src={'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'}
              height={50}
              width={50}
              alt="close icon"
              title="close icon"
            />
          </button>
          <div className="langLeftDiv">
            <span className="langPopupHeading">
              <Image
                src="https://images.tractorgyan.com/uploads/114010/66a13cb3bf753-langIcon.webp"
                alt="Language Icon"
                width={100}
                height={100}
              />
              Select Language
            </span>
            <span className="languageTypeBtn" onClick={e => handleLanguageClick('hi', e)}>
              {`हिन्दी`}
            </span>
            <span className="languageTypeBtn" onClick={e => handleLanguageClick('en', e)}>
              English
            </span>
          </div>
          <div className="langRightDiv">
            {popupImage && (
              <Image
                src={`https://images.tractorgyan.com/uploads/${popupImage}`}
                alt="Language Banner"
                width={700}
                height={300}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default LanguagePopupMain;

'use client';
import Image from 'next/image';
import Link from 'next/link';
import menuItems from '@/src/data/menuItems.json';
import { useRef } from 'react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SecondNavbar from './SecondNavbar';
import { postData } from '@/src/services/apiMethods';
import SignInPopup from '../../auth/SignInPopup';
import LanguagePopupMain from '../Language-popup/LagnguagePop';
import { getCookie, setCookie, deleteCookie } from '@/src/utils/cookies';
// import GlobalCTA from './GlobalCTA';

const DesktopHeader = ({ translation, currentLang, isMobile, showLanguageSelector = true }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLang);

  const firstMenuLabel =
    menuItems.find(item => item.label !== 'home')?.label || menuItems?.[0]?.label;

  const [selectedMenu, setselectedMenu] = useState(
    isMobile ? firstMenuLabel : menuItems?.[0]?.label || 'Tractor Brands'
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [recentSearchesVisible, setRecentSearchesVisible] = useState(false);
  const [tractorBrands, setTractorBrands] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isShowSigninPopup, SetIsShowSigninPopup] = useState(false);
  const [isLanguagePopupVisible, setIsLanguagePopupVisible] = useState(false);

  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isSuggestionClickedRef = React.useRef(false);
  const router = useRouter();
  const popupRef = useRef(null);

  const showGlobalCTA = true; //TODO:: Update the GIF Visibility Condition

  const toggleDropdowns = () => setIsOpen(!isOpen);

  const [showAllSubMenu, setSubMenuShowAll] = useState(false);
  const [showAllSubMenu1, setSubMenuShowAll1] = useState(false);
  const [showAllSubMenu2, setSubMenuShowAll2] = useState(false);

  const handleSignInClick = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    SetIsShowSigninPopup(false);
  };
  const handleLoginSuccess = username => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (isNavbarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isNavbarOpen]);

  useEffect(() => {
    const fetchTractorBrands = async () => {
      if (inputValue.length < 2) {
        if (isActive) {
          setTractorBrands([]);
          setSuggestions([]);
        }
        return;
      }

      setIsLoadingSuggestions(true);
      try {
        const response = await postData(`api/home_search`, {
          query: inputValue,
        });

        let brandsArray = response.data ?? [];
        brandsArray = brandsArray.map(brand => {
          if (
            typeof brand.url === 'string' &&
            !brand.url.startsWith('http') &&
            brand.url.startsWith('/')
          ) {
            return { ...brand, url: `https://tractorgyan.com${brand.url}` };
          }
          return brand;
        });
        setTractorBrands(brandsArray);

        setTractorBrands(brandsArray);
        setSuggestions(brandsArray);
        setIsLoadingSuggestions(false);
      } catch (error) {
        if (isActive) {
          console.error('Error fetching tractor brands:', error);
          setTractorBrands([]);
          setSuggestions([]);
          setIsLoadingSuggestions(false);
        }
      }
    };
    if (inputValue) fetchTractorBrands();
  }, [inputValue]);

  useEffect(() => {
    const storedSearchesRaw = localStorage.getItem('recentSearches');
    let loadedSearches = [];
    if (storedSearchesRaw) {
      const parsedSearches = JSON.parse(storedSearchesRaw);
      loadedSearches = parsedSearches.map(item => {
        if (typeof item === 'string') {
          return { name: item, url: null };
        }
        return item;
      });
    }
    setRecentSearches(loadedSearches);
  }, []);
  const updateRecentSearches = searchItem => {
    let updatedSearches = recentSearches.filter(
      item => (typeof item === 'string' ? item : item.name) !== searchItem.name
    );
    updatedSearches = [searchItem, ...updatedSearches];

    if (updatedSearches.length > 5) {
      updatedSearches.pop();
    }
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleInputChange = e => {
    const value = e.target.value;
    setInputValue(value);
    setRecentSearchesVisible(false);
  };
  const handleInputFocus = () => {
    setIsDropdownOpen(true);
    setRecentSearchesVisible(inputValue?.length === 0);
  };
  const handleBlur = () => {
    setTimeout(() => {
      if (!isSuggestionClickedRef.current) {
        setIsDropdownOpen(false);
      }
      isSuggestionClickedRef.current = false;
    }, 150);
  };
  const handleSuggestionClick = suggestion => {
    if (suggestion.name === 'Related Blogs') return;
    setInputValue(suggestion.name);
    setSuggestions([]);
    updateRecentSearches({ name: suggestion.name, url: suggestion.url });
    router.push(suggestion.url);
    setIsDropdownOpen(false);
    isSuggestionClickedRef.current = false;
  };
  const handleRecentSearchClick = searchItem => {
    setInputValue(searchItem.name);
    setSuggestions([]);
    setRecentSearchesVisible(false);
    if (searchItem.url) {
      router.push(searchItem.url);
    }
    setIsDropdownOpen(false);
    isSuggestionClickedRef.current = false;
  };
  const clearRecentSearches = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  const handleLanguageChange = async lang => {
    setSelectedLanguage(lang);
    setIsOpen(false);
    if (lang === currentLang) return;

    await fetch('/nx-api/set-language', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lang }),
    });

    const currentPath = window.location.pathname;
    const newPath =
      lang === 'hi'
        ? `/hi${currentPath === '/' ? '' : currentPath}`
        : currentPath.replace(/^\/hi/, '') || '/';
    router.push(newPath);
  };

  const handleNavbarChange = e => {
    setIsNavbarOpen(pre => !pre);
  };

  const handleShowSignIn = () => {
    SetIsShowSigninPopup(true);
  };

  const handlePopupClose = e => {
    e?.stopPropagation();
    setIsLanguagePopupVisible(false);

    setCookie('closed', 'false', {
      path: '/',
      sameSite: 'Lax',
      secure: true,
    });
  };

  useEffect(() => {
    const preferredLang = getCookie('skipLanguagePopup');
    const isClosedPopUp = getCookie('closed');
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const skipForDetailPages =
      /^\/tractor-industry-news-blogs\/\d+/.test(pathname) ||
      /^\/tractor-videos\/[^/]+/.test(pathname) ||
      /^\/tractor-reels-and-shorts\/[^/]+/.test(pathname) ||
      /^(\/hi)?\/tractor\/[^/]+/.test(pathname);  // added this route because we are showing ad of reel in tractor listing page

    if (!preferredLang && !isClosedPopUp && !skipForDetailPages) {
      const timeout = setTimeout(() => {
        setIsLanguagePopupVisible(true);
      }, 5000);

      return () => clearTimeout(timeout);
    } else {
      setIsLanguagePopupVisible(false);
    }
  }, []);

  const handleManualLanguageButtonClick = () => {
    deleteCookie('closed');
    setIsLanguagePopupVisible(true);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handlePopupClose();
      }
    }

    if (isLanguagePopupVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguagePopupVisible]);

  const renderSubMenuItem = (item, index) => (
    <li
      key={index}
      className="flex h-[100px] w-[45%] flex-col items-center justify-center rounded-xl border-[1px] border-gray-light text-xs font-medium text-gray-main"
    >
      <Link
        href={`${currentLang === 'hi' ? '/hi' : ''}${item.link}`}
        title={translation.headerNavbar[item.label]}
        aria-label={`know more about ${translation.headerNavbar[item.label]}`}
        className="mb-1 flex flex-col items-center justify-center"
      >
        <Image
          src={item.imgUrl}
          height={100}
          width={100}
          title={`${translation.headerNavbar[item.label]} image`}
          alt={`${translation.headerNavbar[item.label]} image`}
          className="mt-1 h-auto w-auto min-w-5 max-w-[50px]"
        />
        <span className="text-center">{translation.headerNavbar[item.label]}</span>
      </Link>
    </li>
  );

  const renderSeeMoreButton = (showAll, setShowAll, truncatedLength, fullLength) => {
    if (truncatedLength >= fullLength) return null;

    return (
      <div className="mb-4 flex justify-center">
        <button
          className="flex items-center gap-2 text-sm font-medium text-green-dark"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'see less' : 'see more'}
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-dark text-xs text-white">
            <Image
              src="https://images.tractorgyan.com/uploads/119519/6847e5d814a79-up_arrow_button.webp"
              width={20}
              height={20}
              alt="up_arrow_button"
              title="up_arrow_button"
              className={`${showAll ? 'rotate-0' : 'rotate-180'
                } h-4 w-4 transition-transform duration-300 md:h-6 md:w-6`}
            />
          </span>
        </button>
      </div>
    );
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-20 hidden flex-col gap-3 bg-header pt-3 lg:flex">
        <div className="container flex justify-between">
          <Link href={'/'} className="me-[45px] max-h-[40px] min-w-[179px] max-w-[179px]">
            <Image
              src={
                'https://images.tractorgyan.com/uploads/115211/66e80b3c6d9ea-TractorGyan-logo.webp'
              }
              height={200}
              width={300}
              alt="TractorGyan-logo"
              title="TractorGyan-logo"
              className="object-contain"
            />
          </Link>
          <div className="relative h-full max-h-[38px] w-full max-w-[300px] xl:max-w-[599px]">
            <div className="flex h-full w-full items-center justify-between overflow-hidden rounded-full border-[1px] border-gray-silver px-2 ps-4">
              <input
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleBlur}
                type="text"
                placeholder={translation.placeholder.headerSearchBar}
                className="h-full w-full max-w-[480px] border-0 bg-transparent py-2 text-gray-lighter outline-none placeholder:text-gray-lighter"
              />

              <button>
                <Image
                  src={
                    'https://images.tractorgyan.com/uploads/113310/6661d1c1bb48d_searchIconReact.webp'
                  }
                  height={18}
                  width={18}
                  alt="search icon"
                  title="search icon"
                  className="min-h-[18px]"
                />
              </button>
            </div>
            {isDropdownOpen && (
              <ul className="custom-scroller relative z-20 mt-[2px] h-full max-h-[200px] w-full overflow-y-auto rounded-md bg-white px-4 shadow-main">
                {/* Recent Searches header and items */}
                {recentSearchesVisible && recentSearches?.length > 0 && (
                  <>
                    <li className="border-b-[1px] border-gray-light p-2 text-sm text-gray-main">
                      Recent Searches
                      <button
                        onClick={clearRecentSearches}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 ml-2 rounded px-2 py-1 text-xs font-semibold"
                      >
                        Clear
                      </button>
                    </li>
                    {recentSearches.map((searchItem, index) => (
                      <li
                        key={index}
                        onClick={() => handleRecentSearchClick(searchItem)}
                        onMouseDown={() => {
                          isSuggestionClickedRef.current = true;
                        }}
                        className="border-b-[1px] border-gray-light p-2 text-sm text-gray-main"
                      >
                        {searchItem.name}
                      </li>
                    ))}
                  </>
                )}

                {/* Loading Indicator */}
                {isLoadingSuggestions && !recentSearchesVisible && inputValue.length >= 2 && (
                  <li className="p-2 text-center text-sm text-gray-main">Loading...</li>
                )}

                {/* Suggestions List */}
                {!isLoadingSuggestions &&
                  !recentSearchesVisible &&
                  inputValue.length >= 2 &&
                  suggestions.length > 0 && (
                    <>
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          onMouseDown={() => {
                            isSuggestionClickedRef.current = true;
                          }}
                          className="border-b-[1px] border-gray-light p-2 text-sm text-gray-main"
                        >
                          <Link href={`${suggestion.url}`}>{suggestion.name}</Link>
                        </li>
                      ))}
                    </>
                  )}

                {/* No Results Found Message */}
                {!isLoadingSuggestions &&
                  !recentSearchesVisible &&
                  inputValue.length >= 2 &&
                  suggestions.length === 0 && (
                    <li className="p-2 text-center text-sm text-gray-main">No results found.</li>
                  )}
              </ul>
            )}
          </div>
          {/* Language Selector - Desktop */}

          <div
            style={{ visibility: showLanguageSelector ? 'visible' : 'hidden' }}
            className="relative flex h-[30px] w-[45px] cursor-pointer flex-col items-center"
            onClick={handleManualLanguageButtonClick}
          >
            <Image
              src={'https://images.tractorgyan.com/uploads/113313/6661d4614aa19_languageIcon.webp'}
              height={500}
              width={500}
              alt="language icon"
              title="language icon"
              className="w-full max-w-10"
            />
            {/* {isOpen && (
              <div className="absolute -right-3 top-10 z-40 mt-2 w-32 bg-white rounded-lg shadow-card before:content-[''] before:h-6 before:w-6 before:bg-white before:absolute before:-top-2 before:left-[50%] before:rotate-45 before:z-[-4]">
                <div role="radiogroup" className="flex flex-col gap-1 p-1 py-2">
                  <label
                    onClick={() => handleLanguageChange("en")}
                    className={`flex items-center gap-2 p-2 hover:bg-gray-lighter hover:bg-opacity-45 hover:rounded-md font-semibold cursor-pointer ${selectedLanguage === "en"
                      ? "text-black"
                      : "text-gray-secondary"
                      }`}
                  >
                    <input
                      type="radio"
                      name="language"
                      value="en"
                      aria-checked={
                        selectedLanguage === "en" ? "true" : "false"
                      }
                      className="accent-black w-5 h-5"
                    />
                    English
                  </label>
                  <label
                    onClick={() => handleLanguageChange("hi")}
                    className={`flex items-center gap-2 p-2 hover:bg-gray-lighter hover:bg-opacity-45 hover:rounded-md font-semibold cursor-pointer ${selectedLanguage === "hi"
                      ? "text-black"
                      : "text-gray-secondary"
                      }`}
                  >
                    <input
                      type="radio"
                      name="language"
                      value="hi"
                      checked={selectedLanguage === "hi"}
                      className="accent-black w-5 h-5"
                    />
                    Hindi
                  </label>
                </div>
              </div>
            )} */}
            {selectedLanguage ? (
              <span className="text-xs leading-4 text-white">
                {currentLang === 'hi' ? 'Hindi' : 'English'}
              </span>
            ) : (
              ''
            )}
          </div>

          {/* {showGlobalCTA ? (
            <GlobalCTA
              mediaURL={'https://images.tractorgyan.com/uploads/120879/68b689ff29431-Sales-Report-mini-image.gif'}
              isMobile={isMobile}
            />
          ) : null} */}

          <div onClick={handleShowSignIn} className="flex cursor-pointer items-center gap-2">
            <div className="h-[35px] w-[35px] overflow-hidden rounded-full border-[1px] border-gray-gainsboro">
              <Image
                alt="profile-icon"
                title="profile-icon"
                width="50"
                height="50"
                src="https://images.tractorgyan.com/uploads/116847/675056fa52ba7-profile-icon_small.webp"
              />
            </div>
            <div className="flex flex-col gap-0 text-white">
              <span className="text-md font-medium text-white">Login</span>
              <span className="text-nowrap text-xs font-normal text-white">New User? Register</span>
            </div>
          </div>
        </div>
        <SecondNavbar translation={translation} isMobile={isMobile} currentLang={currentLang} />
      </header>
      {/* BEGINS::Mobile Header */}
      <header className="relative z-20 block h-[90px] lg:hidden">
        <div className="fixed left-0 right-0 top-0 z-10 h-[90px]">
          <div className="h-[80px] rounded-b-[20px] bg-header px-0 pt-3">
            <div className="container">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Link href={'/'} className="h-5 min-w-[24px] max-w-[26px]">
                    <Image
                      src={
                        'https://images.tractorgyan.com/uploads/116660/6740838eac5ca-Mobile---Home.webp'
                      }
                      height={50}
                      width={50}
                      alt="tractorgyan home logo"
                      title="tractorgyan home logo"
                    />
                  </Link>
                  <Link href={'/'} className="h-auto w-full min-w-[123px] max-w-[131px]">
                    <Image
                      src={
                        'https://images.tractorgyan.com/uploads/115211/66e80b3c6d9ea-TractorGyan-logo.webp'
                      }
                      height={500}
                      width={500}
                      alt="tractorgyan logo"
                      title="tractorgyan logo"
                    />
                  </Link>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Link
                    href={'/tractor-on-road-price'}
                    className="w-full min-w-[26px] max-w-[30px]"
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/116659/674082cfcb042-Mobile---Rupee.webp"
                      height={50}
                      width={50}
                      alt="tractorgyan rupee logo"
                      title="tractorgyan rupee logo"
                      unoptimized={true}
                    />
                  </Link>

                  <div
                    className={`flex w-full min-w-[30px] max-w-[32px] flex-col items-center md:gap-1 ${showLanguageSelector ? 'flex' : 'hidden'
                      }`}
                    onClick={handleManualLanguageButtonClick}
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/113313/6661d4614aa19_languageIcon.webp"
                      height={50}
                      width={50}
                      alt="language icon"
                      title="language icon"
                    />

                    {selectedLanguage ? (
                      <span className="text-[11px] leading-4 text-white">
                        {currentLang === 'hi' ? 'Hindi' : 'English'}
                      </span>
                    ) : null}
                  </div>

                  <div
                    className="relative me-2 flex min-w-[20px] max-w-[20px] flex-col items-center"
                    onClick={handleNavbarChange}
                  >
                    <Image
                      src="https://images.tractorgyan.com/uploads/118095/67c15e9a0fc66-hamburger-icon.webp"
                      height={50}
                      width={50}
                      alt="hamburger icon"
                      title="hamburger icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="z-20 -mt-6 mb-4 h-[36px] w-full px-3">
            <div className="flex h-[36px] items-center justify-between rounded-full border border-gray-light bg-white px-1.5 pb-1.5 ps-4 pt-1">
              <input
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleBlur}
                type="text"
                placeholder={translation.placeholder.headerSearchBar}
                className="h-full w-full max-w-[370px] border-0 bg-transparent text-sm text-gray-aluminium outline-none placeholder:text-gray-grey"
              />
              <div className="flex w-full max-w-[30px]">
                <button className="px-1">
                  <Image
                    src="https://images.tractorgyan.com/uploads/113310/6661d1c1bb48d_searchIconReact.webp"
                    height={50}
                    width={50}
                    alt="search icon"
                    title="search icon"
                    className="custom-filter h-[18px] w-auto"
                  />
                </button>
              </div>
            </div>
            {/* Inserted suggestion list JSX starts here */}
            {isDropdownOpen && (
              <ul className="custom-scroller max-h-[200px] w-full overflow-y-auto rounded-md bg-white px-4 shadow-bottom">
                {/* Recent Searches header and items */}
                {recentSearchesVisible && recentSearches?.length > 0 && (
                  <>
                    <li className="border-b-[1px] border-gray-light p-2 text-sm text-gray-main">
                      Recent Searches
                      <button
                        onClick={clearRecentSearches}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 ml-2 rounded px-2 py-1 text-xs font-semibold"
                      >
                        Clear
                      </button>{' '}
                      {/* Added some basic styling for clear button */}
                    </li>
                    {recentSearches.map((searchItem, index) => (
                      <li
                        key={index}
                        onClick={() => handleRecentSearchClick(searchItem)}
                        onMouseDown={() => {
                          isSuggestionClickedRef.current = true;
                        }}
                        className="hover:bg-gray-100 w-full cursor-pointer border-b-[1px] border-gray-light p-2 text-sm text-gray-main" // Added cursor and hover
                      >
                        {searchItem.name}
                      </li>
                    ))}
                  </>
                )}

                {/* Loading Indicator */}
                {isLoadingSuggestions && !recentSearchesVisible && inputValue.length >= 2 && (
                  <li className="p-2 text-center text-sm text-gray-main">Loading...</li>
                )}

                {/* Suggestions List */}
                {!isLoadingSuggestions &&
                  !recentSearchesVisible &&
                  inputValue.length >= 2 &&
                  suggestions.length > 0 && (
                    <>
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          onMouseDown={() => {
                            isSuggestionClickedRef.current = true;
                          }}
                          className={`hover:bg-gray-100 w-full cursor-pointer border-b-[1px] border-gray-light p-2 text-sm ${suggestion.name === 'Related Blogs'
                            ? 'font-medium text-primary'
                            : 'text-gray-main'
                            }`}
                        >
                          {suggestion.name}
                        </li>
                      ))}
                    </>
                  )}

                {/* No Results Found Message */}
                {!isLoadingSuggestions &&
                  !recentSearchesVisible &&
                  inputValue.length >= 2 &&
                  suggestions.length === 0 && (
                    <li className="p-2 text-center text-sm text-gray-main">No results found.</li>
                  )}
              </ul>
            )}
            {/* Inserted suggestion list JSX ends here */}
          </div>
        </div>
      </header>
      {isNavbarOpen && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full bg-white transition-transform">
          <div className="h-full w-[47%] overflow-y-auto bg-[#002A17]">
            {' '}
            {/* Added overflow-y-auto */}
            <div className="ps-2">
              <div className="flex items-center pb-1.5 pt-4">
                <button
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xl shadow-card"
                  onClick={handleNavbarChange}
                >
                  <Image
                    src={'https://images.tractorgyan.com/uploads/119880/1751721362close-icon.webp'}
                    height={50}
                    width={50}
                    alt="close icon"
                    title="close icon"
                  />
                </button>
                <Image
                  src="https://images.tractorgyan.com/uploads/115211/66e80b3c6d9ea-TractorGyan-logo.webp"
                  height={500}
                  width={500}
                  title="TG logo"
                  alt="TG logo"
                  className="mx-auto max-w-[112px]"
                />
              </div>
              <ul className="pt-4">
                {menuItems
                  ?.filter(item => item.label !== 'home')
                  .sort((a, b) => a.index - b.index)
                  .map((item, index) => (
                    <li
                      key={index}
                      className={`${selectedMenu === item.label
                        ? 'selected-menu rounded-s-xl bg-white text-black'
                        : 'text-white'
                        } relative mb-2 flex cursor-pointer items-center gap-2 p-1 text-[13px] font-medium`}
                      onClick={() => setselectedMenu(item.label)}
                    >
                      <div className="h-10 w-10 rounded-full bg-white p-[2px]">
                        <Image
                          src={item.url}
                          height={200}
                          width={200}
                          alt={translation.headerNavbar[item.label]}
                          title={translation.headerNavbar[item.label]}
                        />
                      </div>
                      <span className="flex-1">{translation.headerNavbar[item.label]}</span>
                      <span className="selected-menu-block-t"></span>
                      <span className="selected-menu-block-b"></span>
                    </li>
                  ))}
              </ul>
              <div className="mt-2 px-1 pt-1 font-medium text-white">
                {/* Sign in register TODO*/}
                <div onClick={handleShowSignIn} className="flex cursor-pointer items-center gap-2">
                  <div className="h-full overflow-hidden rounded-full border-[1px] border-gray-gainsboro">
                    <Image
                      alt="profile-icon"
                      title="profile-icon"
                      width="50"
                      height="50"
                      src="https://images.tractorgyan.com/uploads/116847/675056fa52ba7-profile-icon_small.webp"
                      className="h-8 w-8"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 text-white">
                    <h6 className="text-sm font-medium leading-[10px] text-white">Login</h6>
                    <span className="text-[11px] font-normal leading-[6px] text-white">
                      New User? Register
                    </span>
                  </div>
                </div>
                <div className="pr-1">
                  <Link
                    href={'https://tractorgyan.com/career'}
                    title="career"
                    className="mt-4 flex w-full items-center gap-2 rounded-xl border-[1px] border-white px-2 py-2 pb-[10px] text-sm font-medium text-white"
                  >
                    <Image
                      src={'https://images.tractorgyan.com/uploads/117380/6780efb74f96d-Group.webp'}
                      height={100}
                      width={100}
                      alt="career-icon"
                      title="career-icon"
                      className="h-full max-h-5 w-5"
                    />
                    Career
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full w-1/2 flex-1 pb-6">
            <div className="h-full overflow-auto py-4 ps-2">
              {menuItems
                ?.filter(item => item.label === selectedMenu)
                .sort((a, b) => a.index - b.index)
                .map((menu, index) => {
                  return (
                    <>
                      {menu.submenu && (
                        <>
                          <ul key={index} className="mb-4 flex flex-wrap gap-2">
                            {menu.submenu
                              ?.sort((a, b) => a.index - b.index)
                              .map((item, index) => renderSubMenuItem(item, index))}
                          </ul>
                        </>
                      )}
                      <div className="h-full">
                        {menu.submenu1 && menu.submenuHeading1 && (
                          <>
                            <h4 className="mb-2 text-sm font-medium">
                              {translation.headerNavbar[menu.submenuHeading1] ||
                                menu.submenuHeading1}
                            </h4>
                            <ul className="mb-4 flex flex-wrap gap-2">
                              {menu.submenu1
                                ?.sort((a, b) => a.index - b.index)
                                .slice(0, showAllSubMenu1 ? 99 : menu.submenuTruncate1)
                                .map((item, index) => renderSubMenuItem(item, index))}
                            </ul>
                            {/* Show More Toggle Button */}
                            {menu.submenuTruncate1 < menu.submenu1.length &&
                              renderSeeMoreButton(
                                showAllSubMenu1,
                                setSubMenuShowAll1,
                                menu.submenuTruncate1,
                                menu.submenu1.length
                              )}
                          </>
                        )}
                        {menu.submenu2 && menu.submenuHeading2 && (
                          <>
                            <h4 className="mb-2 text-sm font-medium">
                              {translation.headerNavbar[menu.submenuHeading2] ||
                                menu.submenuHeading2}
                            </h4>
                            <ul className="mb-4 flex flex-wrap gap-2">
                              {menu.submenu2
                                ?.sort((a, b) => a.index - b.index)
                                .slice(0, showAllSubMenu2 ? 99 : menu.submenuTruncate2)
                                .map((item, index) => renderSubMenuItem(item, index))}
                            </ul>
                            {/* Show More Toggle Button */}
                            {menu.submenuTruncate2 < menu.submenu2.length &&
                              renderSeeMoreButton(
                                showAllSubMenu2,
                                setSubMenuShowAll2,
                                menu.submenuTruncate2,
                                menu.submenu2.length
                              )}
                          </>
                        )}
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* {showGlobalCTA && isMobile ? (
        <GlobalCTA
          mediaURL={'https://images.tractorgyan.com/uploads/120865/68b558208907f-Adobe-Express---Sales-min.gif'}
          isMobile={isMobile}
        />
      ) : null} */}


      {isShowSigninPopup && (
        <SignInPopup
          onClose={handleClosePopup}
          onLoginSuccess={handleLoginSuccess}
          translation={translation}
          currentLang={currentLang}
        />
      )}
      {isLanguagePopupVisible && (
        <LanguagePopupMain
          ref={popupRef}
          onClosePopup={handlePopupClose}
          currentLang={currentLang}
          a
        />
      )}
    </>
  );
};

export default DesktopHeader;
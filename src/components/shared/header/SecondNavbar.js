'use client';
import React, { useEffect, useState } from 'react';
// import { useIsMobile } from "@/src/utils/useIsMobile";
import Link from 'next/link';
import menuItems from '@/src/data/menuItems.json';
import Image from 'next/image';
// import { useTranslation } from "react-i18next";
// import '../../i18n';
const SecondNavbar = ({ translation, currentLang, isMobile }) => {
  // const isMobile = useIsMobile();
  // const { t, i18n } = useTranslation();
  // const currentLang = i18n.language;
  currentLang = currentLang === 'hi' ? '/hi' : '';
  // const [openMenus, setOpenMenus] = useState({});
  // const [timeoutIds, setTimeoutIds] = useState({});

  const [activeIndex, setActiveIndex] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to toggle image visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust the scroll threshold
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Show the menu
  // const handleMouseEnter = index => {
  //   // Clear any existing timeout for this menu
  //   if (timeoutIds[index]) {
  //     clearTimeout(timeoutIds[index]);
  //     setTimeoutIds(prev => ({ ...prev, [index]: null }));
  //   }
  //   setOpenMenus(prev => ({ ...prev, [index]: true }));
  // };
  // // Hide the menu with delay
  // const handleMouseLeave = index => {
  //   const timeoutId = setTimeout(() => {
  //     setOpenMenus(prev => ({ ...prev, [index]: false }));
  //   }, 50); // Adjust delay time as needed (200ms works well)

  //   setTimeoutIds(prev => ({ ...prev, [index]: timeoutId }));
  // };

  const handleMouseEnter = index => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    const id = window.setTimeout(() => {
      setActiveIndex(null);
    }, 50); // Delay

    setTimeoutId(id);
  };

  const NavbarItemContent = ({ item, isScrolled, translation }) => (
    <div className="group pt-2 px-3 overflow-x-auto flex flex-col items-center min-w-[68px] xl:min-w-[107px] md:hover:bg-green-light border-b-4 border-transparent md:hover:border-green-main">
      <div
        className={`h-[70px] w-[70px] md:h-[53px] md:min-w-[46px] md:w-[53px] flex items-center justify-center rounded-2xl md:rounded-[9px] border-[1px] md:border-gray-light group-hover:border-green-main mb-2 transition-all duration-300 ${
          isScrolled ? 'hidden' : 'block'
        }`}
      >
        <Image
          src={item.url}
          height={40}
          width={40}
          alt={translation.headerNavbar[item.label]}
          title={translation.headerNavbar[item.label]}
          className="min-w-[40px] w-auto h-auto"
        />
      </div>

      <span className="flex gap-1 items-center text-[11px] xl:text-sm md:text-base leading-4 font-semibold group-hover:text-black text-gray-main mb-1 whitespace-nowrap">
        <div>{translation.headerNavbar[item.label]}</div>
        {/* <div className="whitespace-nowrap">{translation.headerNavbar[item.label]}</div> */}

        {item.label !== 'home' && item.submenu1 && (
          <Image
            src="https://images.tractorgyan.com/uploads/117142/676901b0c9bf7-gray-arrow.webp"
            height={50}
            width={50}
            alt="open-button-img"
            title="open-button-img"
            className="hidden md:block w-3 h-2"
          />
        )}
      </span>
    </div>
  );

  return (
    <>
      <nav className="shadow-nav border-b-[2px] border-primary hidden lg:block z-[18] z-10 bg-white">
        <div className="container mx-auto">
          <ul className="flex justify-between gap-2 text-black">
            {menuItems &&
              menuItems
                ?.sort((a, b) => a.index - b.index)
                .map((item, index) => (
                  <li
                    key={index}
                    className="relative cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    // onMouseLeave={() => handleMouseLeave(index)}
                  >
                    {item.label === 'home' ? (
                      <Link href={item.link} title={item.label} alt={item.label}>
                        <NavbarItemContent
                          item={item}
                          isScrolled={isScrolled}
                          translation={translation}
                        />
                      </Link>
                    ) : (
                      <NavbarItemContent
                        item={item}
                        isScrolled={isScrolled}
                        translation={translation}
                      />
                    )}

                    {/* {openMenus[index] && item.submenu1 && ( */}
                    {activeIndex === index && item.submenu1 && (
                      <div
                        className={`absolute top-full z-50 mt-1 ${
                          // index <= 8 ? "-left-20" : "right-4"
                          index === 4 ? '-left-80' : index <= 8 ? '-left-20' : 'right-4'
                        }`}
                      >
                        <div
                          className={`${
                            item.submenu2 ? "max-h-[28rem]" : "max-h-[22rem]"
                          } shadow- mx-auto flex w-[max-content] min-w-[200px] overflow-hidden rounded-2xl bg-white text-gray-grey shadow-bottom`}
                        >
                          {item.submenuHeading && (
                            <div className={`max-w-[200px] p-3`}>
                              <h6 className="mb-2 font-semibold text-black">
                                {translation.headerNavbar[item.submenuHeading]}
                              </h6>
                              <ul
                                className={`${
                                  item.submenu
                                    ? "max-h-[23rem]"
                                    : "max-h-[18rem]"
                                } flex h-full flex-col flex-wrap gap-2`}
                              >
                                {item.submenu
                                  ?.sort((a, b) => a.index - b.index)
                                  .map((submenuItem, subIndex) => (
                                    <li
                                      key={subIndex}
                                      className="text-sm font-medium text-black hover:font-bold"
                                    >
                                      <Link
                                        href={`${currentLang}${submenuItem.link}`}
                                        className="flex items-center gap-3"
                                      >
                                        <div
                                          className={`${
                                            submenuItem.label.includes(
                                              "seeMore",
                                            )
                                              ? "min-w-10 max-w-10"
                                              : "min-w-10 max-w-10"
                                          } w-full`}
                                        >
                                          <Image
                                            src={submenuItem.imgUrl}
                                            height={100}
                                            width={100}
                                            alt={
                                              translation.headerNavbar[
                                                submenuItem.label
                                              ]
                                            }
                                            title={
                                              translation.headerNavbar[
                                                submenuItem.label
                                              ]
                                            }
                                            className="mx-auto h-auto w-auto min-w-5"
                                          />
                                        </div>
                                        <span
                                          className={`${
                                            submenuItem.label.includes(
                                              "seeMore",
                                            )
                                              ? "font-semibold text-black"
                                              : ""
                                          }`}
                                        >
                                          {translation.headerNavbar[submenuItem.label]}
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                          {item.submenuHeading1 && (
                            <div
                              className={`${
                                item.submenu2 ? "bg-gray-menubg" : ""
                              } p-3`}
                            >
                              <h6 className="mb-2 font-semibold text-black">
                                {translation.headerNavbar[item.submenuHeading1]}
                              </h6>
                              <ul
                                className={`${
                                  item.submenu2
                                    ? "max-h-[23rem]"
                                    : "max-h-[18rem]"
                                } flex h-full flex-col flex-wrap gap-2`}
                              >
                                {item.submenu1
                                  ?.sort((a, b) => a.index - b.index)
                                  .map((submenuItem, subIndex) => (
                                    <li
                                      key={subIndex}
                                      className="text-sm font-medium text-black hover:font-bold"
                                    >
                                      <Link
                                        href={`${currentLang}${submenuItem.link}`}
                                        className="flex items-center gap-3"
                                      >
                                        <div
                                          className={`${
                                            submenuItem.label.includes(
                                              "seeMore",
                                            )
                                              ? "mx-auto min-w-4 max-w-5"
                                              : "min-w-10 max-w-10"
                                          } w-full`}
                                        >
                                          <Image
                                            src={submenuItem.imgUrl}
                                            height={100}
                                            width={100}
                                            alt={
                                              translation.headerNavbar[
                                                submenuItem.label
                                              ]
                                            }
                                            title={
                                              translation.headerNavbar[
                                                submenuItem.label
                                              ]
                                            }
                                            className="mx-auto h-auto w-auto min-w-4"
                                          />
                                        </div>
                                        <span
                                          className={`${
                                            submenuItem.label.includes(
                                              "seeMore",
                                            )
                                              ? "text-sm font-semibold text-black"
                                              : ""
                                          } whitespace-nowrap`}
                                        >
                                          {translation.headerNavbar[submenuItem.label]}
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                          {item.submenuHeading2 && (
                            <div className={`p-3`}>
                              <h6 className="mb-2 font-semibold text-black">
                                {translation.headerNavbar[item.submenuHeading2]}
                              </h6>
                              <ul
                                className={`${
                                  item.submenu2
                                    ? "max-h-[23rem]"
                                    : "max-h-[18rem]"
                                } flex h-full flex-col flex-wrap gap-2`}
                              >
                                {item.submenu2
                                  ?.sort((a, b) => a.index - b.index)
                                  .map((submenuItem, subIndex) => (
                                    <li
                                      key={subIndex}
                                      className="text-sm font-medium text-black hover:font-bold"
                                    >
                                      <Link
                                        href={`${currentLang}${submenuItem.link}`}
                                        className="flex items-center gap-3"
                                      >
                                        <div
                                          className={`${
                                            submenuItem.label.includes(
                                              "seeMore",
                                            )
                                              ? "mx-auto min-w-4 max-w-5"
                                              : "min-w-10 max-w-10"
                                          } w-full`}
                                        >
                                          <Image
                                            src={submenuItem.imgUrl}
                                            height={100}
                                            width={100}
                                            alt={
                                              translation.headerNavbar[
                                                submenuItem.label
                                              ]
                                            }
                                            title={
                                              translation.headerNavbar[
                                                submenuItem.label
                                              ]
                                            }
                                            className="mx-auto h-auto w-auto min-w-4"
                                          />
                                        </div>
                                        <span
                                          className={`${
                                            submenuItem.label.includes(
                                              "seeMore",
                                            )
                                              ? "text-sm font-semibold text-black"
                                              : ""
                                          } whitespace-nowrap`}
                                        >
                                          {translation.headerNavbar[submenuItem.label]}
                                        </span>
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SecondNavbar;

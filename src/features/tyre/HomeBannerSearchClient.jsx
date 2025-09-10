"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const HomeBannerSearchClient = ({
  tyreBrands,
  uniqueTyreSize,
  translation,
  currentLang,
}) => {
  const router = useRouter();
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const dropdownRef = useRef(null);

  const allSize = [...uniqueTyreSize.front_tyres, ...uniqueTyreSize.rear_tyres];
  const frontTyreSize = uniqueTyreSize.front_tyres;
  const rearTyreSize = uniqueTyreSize.rear_tyres;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsBrandsDropdownOpen(false);
        setIsSizeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand === "Clear Selection" ? "" : brand);
    setSelectedSize("");
    setIsBrandsDropdownOpen(false);
  };
  const handleSizeChange = (size) => {
    setSelectedSize(size === "Clear Selection" ? "" : size);
    setSelectedBrand("");
    setIsSizeDropdownOpen(false);
  };
  const handleSearch = () => {
    if (selectedBrand) {
      const selectedBrandObj = tyreBrands.find((brand) =>
        currentLang == "/hi" ? brand.name_hi : brand.name === selectedBrand,
      );
      if (selectedBrandObj) {
        router.push(`${currentLang}${selectedBrandObj.url}`);
      }
    } else if (selectedSize) {
      const selectedSizeObj = allSize.find(
        (size) => size.tyre_size === selectedSize,
      );
      if (selectedSizeObj) {
        router.push(`${currentLang}${selectedSizeObj.page_url}`);
      }
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-28 top-0 ms-auto mt-7 hidden h-[251px] w-full max-w-[302px] rounded-xl bg-white p-[18px] shadow-[0px_2.89px_12.28px_0px_#50635054] md:block"
    >
      <h1 className="mb-4 text-lg font-semibold leading-5">
        {translation.headings.searchTyres}
      </h1>
      <p className="mb-1.5 text-xs font-bold text-gray-main">
        {translation.headings.searchByBrands}
      </p>
      <div className="mb-2.5 flex gap-2.5">
        <div className="relative inline-block w-full text-left">
          <div>
            <button
              type="button"
              className={`${
                selectedBrand
                  ? "font-semibold text-black"
                  : "text-gray-secondary"
              } shadow-sm inline-flex w-full items-center justify-between gap-x-1.5 rounded-md bg-white px-2 py-1.5 text-xs font-normal ring-1 ring-inset ring-gray-secondary hover:bg-green-lighter`}
              id="menu-button"
              aria-expanded={isBrandsDropdownOpen}
              aria-haspopup="true"
              onClick={() => {
                setIsBrandsDropdownOpen((pre) => !pre);
              }}
            >
              {selectedBrand || `${translation.placeholder.selectBrand}`}
              <svg
                className="-mr-1 h-5 w-5 text-gray-secondary"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {isBrandsDropdownOpen && selectedSize?.length == 0 && (
            <ul
              className="shadow-lg custom-scroller absolute right-0 z-10 mt-2 max-h-[250px] w-full origin-top-right overflow-y-auto rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <li
                className={`block w-full px-4 py-1 text-left text-xs text-black hover:bg-gray-lighter hover:font-bold ${
                  !selectedBrand ? "selected" : ""
                }`}
                onClick={() => handleBrandChange("Clear Selection")}
              >
                {translation.placeholder.selectBrand}
              </li>
              {tyreBrands?.length > 0 ? (
                tyreBrands.map((brand, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleBrandChange(
                        currentLang === "/hi" ? brand.name_hi : brand.name,
                      )
                    }
                    className="block w-full px-4 py-1 text-left text-xs text-black hover:bg-gray-lighter hover:font-bold"
                    role="menuitem"
                  >
                    {currentLang === "/hi" ? brand.name_hi : brand.name}
                  </li>
                ))
              ) : (
                <p className="text-gray-700 px-4 py-2 text-xs">
                  No brands available
                </p>
              )}
            </ul>
          )}
        </div>
      </div>
      <p className="mb-2.5 text-center text-xs font-bold text-gray-dark">OR</p>
      <p className="mb-1.5 text-xs font-bold text-gray-main">
        {translation.headings.searchBySize}
      </p>
      <div className="mb-2.5 flex gap-2.5">
        <div className="relative inline-block w-full text-left">
          <div>
            <button
              type="button"
              className={`${
                selectedSize
                  ? "font-semibold text-black"
                  : "text-gray-secondary"
              } shadow-sm inline-flex w-full items-center justify-between gap-x-1.5 rounded-md bg-white px-2 py-1.5 text-xs font-normal ring-1 ring-inset ring-gray-secondary hover:bg-green-lighter`}
              id="menu-button"
              aria-expanded={isSizeDropdownOpen}
              aria-haspopup="true"
              onClick={() => {
                setIsSizeDropdownOpen((pre) => !pre);
              }}
            >
              {selectedSize || `${translation.placeholder.selectSize}`}
              <svg
                className="-mr-1 h-5 w-5 text-gray-secondary"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {isSizeDropdownOpen && selectedBrand?.length == 0 && (
            <div
              className="shadow-lg custom-scroller absolute right-0 z-10 mt-2 max-h-[250px] w-full origin-top-right overflow-y-auto rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <span
                role="menuitem"
                className={`block w-full px-4 py-1 text-left text-sm text-black hover:text-black ${
                  !selectedSize ? "selected" : ""
                }`}
                onClick={() => handleSizeChange("Clear Selection")}
              >
                {translation.placeholder.selectSize}
              </span>
              {frontTyreSize?.length > 0 ? (
                <>
                  <div role="menuitem">
                    <h3 className="px-4 text-sm font-semibold">
                      {translation.headings.frontTyre}
                    </h3>
                    <ul>
                      {frontTyreSize.map((size, idx) => (
                        <li
                          key={idx}
                          onClick={() => handleSizeChange(size.tyre_size)}
                          className="block w-full px-4 py-1 text-left text-sm text-black hover:bg-gray-lighter hover:font-semibold"
                        >
                          {size.tyre_size}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div role="menuitem">
                    <h3 className="px-4 text-sm font-semibold">
                      {translation.headings.rearTyre}
                    </h3>
                    <ul>
                      {rearTyreSize.map((size, idx) => (
                        <li
                          key={idx}
                          onClick={() => handleSizeChange(size.tyre_size)}
                          className="block w-full px-4 py-1 text-left text-sm text-black hover:bg-gray-lighter hover:font-semibold"
                        >
                          {size.tyre_size}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <p className="text-gray-700 px-4 py-2 text-xs">
                  No brands available
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleSearch}
        disabled={!selectedBrand && !selectedSize}
        className="mx-auto flex min-w-16 justify-center rounded-md bg-primary px-4 py-1.5 text-sm text-white"
      >
        {translation.buttons.search}
      </button>
    </div>
  );
};

export default HomeBannerSearchClient;

"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "@/src/styles/blogs/blogsCategory.module.css";
import { useRouter } from "next/navigation";
import { getBrandWebStoryVideos } from "@/src/services/social/TyreBrandWebstory";
import TG_SearchInput from "@/src/components/ui/inputs/SearchInput";

const SearchBarWithFilterButton = ({ isMobile, parent, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  // const timeoutRef = useRef();
  // const isMounted = useRef(true);
  const inputRef = useRef();
  const wrapperRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (value) => {
    setSearchTerm(value);

    const trimmedValue = value.trim();
    if (trimmedValue.length === 0) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const payload = (() => {
      switch (parent) {
        case "tractor_videos":
          return {
            video_type: "videos",
            search_keyword: trimmedValue,
          };
        case "tractor_reels":
          return {
            video_type: "reels",
            search_keyword: trimmedValue,
          };
        case "webstory":
          return {
            search_keyword: trimmedValue,
          };
        default:
          return {};
      }
    })();

    const url =
      parent === "webstory"
        ? "/api/tyre_brand_webstory"
        : "/api/tyre_brand_videos";

    try {
      const res = await getBrandWebStoryVideos(url, payload);

      if (isMounted.current) {
        setResults(res?.data || []);
        setShowDropdown(true);
      }
    } catch (err) {
      if (isMounted.current) {
        setResults([]);
        setShowDropdown(false);
      }
    }
  };

  const handleSelect = (url) => {
    setShowDropdown(false);
    router.push(url);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-[550px] flex-1">
      {/* <input
        type="search"
        value={searchTerm}
        ref={inputRef}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder || "Search for Tractor Videos & Reels"}
        className={`${
          isMobile ? `${styles.mobile_search_input}` : ``
        } focus:border-gray-300 shadow-sm focus:shadow h-12 w-full rounded-[12px] border border-[#D3DAE0] px-5 pr-12 text-base outline-none transition-all`}
      />
      <button
        onClick={() => inputRef.current?.focus()}
        className="absolute right-0 top-0 flex h-full w-full max-w-[40px] items-center justify-center"
      >
        <div className={`text-gray-400 hover:text-gray-600 h-5`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </button> */}
      <TG_SearchInput
        inputRef={inputRef}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder || "Search for Tractor Videos & Reels"}
        value={searchTerm}
      />
      {showDropdown && (
        <ul className="shadow-md custom-scrollbar absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-[#D3DAE0] bg-[#fdfdfd] p-[5px]">
          {results?.length > 0 ? (
            results.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item.full_url)}
                className="cursor-pointer border-b-[1px] border-gray-light p-2 text-[13px] text-black hover:underline md:text-base"
              >
                {item.title}
              </li>
            ))
          ) : (
            <li className="text-gray-500 px-4 py-2 text-center text-sm">
              No Result Found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBarWithFilterButton;

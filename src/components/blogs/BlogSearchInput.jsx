"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "@/src/styles/blogs/blogsCategory.module.css";
import { useRouter } from "next/navigation";
import { getBlogSearch } from "@/src/services/blogs/blogSearch";
import TG_SearchInput from "../ui/inputs/SearchInput";

const BlogSearchInput = ({ isMobile, translation, onFocus, onBlur }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
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

    if (value.trim().length === 0) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const payload = {
      search_keyword: value,
    };

    try {
      const res = await getBlogSearch(payload);

      const data = await res;

      if (isMounted.current) {
        setResults(data?.data || []);
        setShowDropdown(true);
      }
    } catch (err) {
      console.error("Search API failed", err);
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
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={translation.placeholder.searchforBlogs}
        className={`${
          isMobile ? `${styles.mobile_search_input}` : ``
        } w-full h-12 px-5 pr-12 rounded-[12px] border border-gray-light focus:border-gray-300 outline-none shadow-sm focus:shadow transition-all text-base `}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.focus()}
        className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button> */}

      <TG_SearchInput
        onFocus={onFocus}
        onBlur={onBlur}
        inputRef={inputRef}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={translation.placeholder.searchforBlogs}
        value={searchTerm}
      />

      {showDropdown && (
        <div className="shadow-md absolute z-10 mt-2 w-full rounded-lg border border-gray-light bg-white px-1 pb-3 pt-1">
          <ul className="custom-scrollbar max-h-60 overflow-auto">
            {/* <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-light p-[5px] rounded-lg shadow-md max-h-60 overflow-auto custom-scrollbar"> */}
            {results.length > 0 ? (
              results.map((item, index) => (
                <li
                  key={item.id}
                  onClick={() => handleSelect(item.url)}
                  className={`${
                    index ? `pt-0` : `pt-2`
                  } cursor-pointer border-b-[1px] border-gray-light p-2 text-[13px] text-black hover:underline md:text-base`}
                >
                  {item.title}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-center text-sm text-black">
                No Result Found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogSearchInput;

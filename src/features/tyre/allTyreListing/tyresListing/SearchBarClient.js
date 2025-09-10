'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SearchBarClient = ({ initialSearchQuery = '', translation, basePath, searchPlaceholder }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inputRef = React.useRef(null);

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  // Memoized handleSearchSubmit
  const handleSearchSubmit = useCallback(() => {
    const currentParams = new URLSearchParams(window.location.search);
    const existingSearch = currentParams.get('search') || '';

    // If current input matches URL's search query, and it's not an empty initial state, do nothing.
    if (searchQuery === existingSearch) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    if (searchQuery) {
      currentParams.set('search', searchQuery);
    } else {
      // If searchQuery is empty, remove the search parameter
      currentParams.delete('search');
    }

    // Reset page to 1 on new search
    if (currentParams.has('page')) {
      currentParams.set('page', '1');
    }

    router.push(`${basePath}?${currentParams.toString()}`);

    // Reset loading state after navigation
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Reset after 1 second
  }, [router, searchQuery]); // searchQuery is needed here as it's used in the logic

  // Clear search function
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Handle search icon click to focus input
  const handleSearchIconClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // useEffect for debouncing
  useEffect(() => {
    const timerId = setTimeout(() => {
      // Call handleSearchSubmit directly.
      // The logic to prevent navigation if query hasn't changed is inside handleSearchSubmit.
      handleSearchSubmit();
    }, 0); // 500ms delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery, handleSearchSubmit]); // handleSearchSubmit is memoized

  return (
    <div className="w-full">
      <div className="relative w-full rounded-lg border-[1px] border-gray-light">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={handleSearchChange}
          ref={inputRef}
          // onKeyDown removed
          className="w-full bg-transparent p-2.5 pr-10 text-sm text-gray-main"
        />
        {isLoading ? (
          // Loader icon when loading
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 transform">
            <svg
              className="h-5 w-5 animate-spin text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : searchQuery ? (
          // Cross icon when there's a search value
          <button
            onClick={handleClearSearch}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 transform cursor-pointer"
            title="Clear search"
            type="button"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500 hover:text-gray-700 h-5 w-5"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        ) : (
          // Search icon when there's no search value
          <Image
            src="https://images.tractorgyan.com/uploads/114015/66a28560272fc-brandListingSearch.webp"
            alt="Search"
            title="Search"
            width={20}
            height={20}
            className="absolute right-2.5 top-1/2 h-auto min-h-5 w-auto min-w-5 -translate-y-1/2 transform cursor-pointer"
            onClick={handleSearchIconClick}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBarClient;

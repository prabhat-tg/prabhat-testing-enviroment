import React from "react";
import classNames from "classnames";

const TG_SearchInput = ({
  placeholder = "Search here...",
  value = "",
  onChange = () => {},
  onEnter = () => {},
  onFocus = () => {},
  onBlur = () => {},
  className = "",
  containerClass = "",
  icon = "https://images.tractorgyan.com/uploads/114015/66a28560272fc-brandListingSearch.webp",
  iconAlt = "Search",
  iconSize = 20,
  inputProps = {},
  disabled = false,
  inputRef,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onEnter(e);
    }
  };

  return (
    <div
      className={classNames(
        "w-full relative border border-gray-light rounded-lg bg-transparent",
        containerClass
       
      )}
    >
      <input
        type="search"
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        className={classNames(
          "w-full bg-transparent px-3 py-2.5 pe-8 text-sm text-black outline-none",
          className,
        )}
        disabled={disabled}
        {...inputProps}
      />
      {icon && (
        <span className="absolute right-1 top-0 flex h-full w-6 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5 text-gray-main"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
      )}
    </div>
  );
};

export default TG_SearchInput;

import React from "react";

const defaultStyle =
  "font-bold text-xl md:text-2xl border-b-3 border-secondary pb-1 leading-7 inline-block text-black";

const footerHeadingStyles = {
  5: "mb-3 text-sm md:text-lg text-black font-semibold border-b-[1px] border-gray-grey inline-block",
  6: "font-semibold text-sm text-black",
};

const headingStyles = {
  1: "font-bold w-fit text-black text-[18px] sm:text-[16px] md:text-[26px] border-b-3 border-secondary pb-1 mb-2 lg:mb-0 leading-[29px] mg:leading-[32px] inline-block",
  2: "font-bold text-xl md:text-2xl border-b-3 border-secondary pb-2 mb-8 leading-7 inline-block",
  3: "font-bold text-xl md:text-[32px] border-b-3 border-secondary pb-1 pb-1 leading-6 inline-block text-black",
  4: "font-bold text-xl md:text-2xl border-b-3 border-secondary pb-2 mb-8 leading-7 inline-block",
  5: "text-lg md:text-xl font-medium text-gray-700",
  6: "text-base md:text-lg font-normal text-gray-600",
};

const TG_Heading = ({
  level = 1,
  children,
  className = "",
  defaultCss = false,
  footer = false,
  styleOverride = "", // fully override all styles
}) => {
  const Tag = `h${level}`;

  let finalClass = defaultStyle;
  if (styleOverride) {
    finalClass = styleOverride;
  } else if (footer && footerHeadingStyles[level]) {
    finalClass = footerHeadingStyles[level];
  } else if (!defaultCss && headingStyles[level]) {
    finalClass = headingStyles[level];
  }

  return <Tag className={`${finalClass} ${className}`}>{children}</Tag>;
};

export default TG_Heading;

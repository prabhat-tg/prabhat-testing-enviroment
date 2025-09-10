import React from "react";

const MainHeadings = ({ text, marginBottom, extraCss = "" }) => {
  return (
    <h2
      className={`border-b-3 inline-block border-secondary pb-1 text-xl font-bold leading-6 md:text-2xl ${marginBottom ? marginBottom : "mb-4 md:mb-8"} ${extraCss ? extraCss : ""} `}
    >
      {text}
    </h2>
  );
};

export default MainHeadings;

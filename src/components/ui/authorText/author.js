import React from "react";

const TG_author = ({ author }) => {
  return (
    <span className="text-sm font-semibold text-black lg:text-base">
      {author || "By Tractor Gyan"}
    </span>
  );
};

export default TG_author;

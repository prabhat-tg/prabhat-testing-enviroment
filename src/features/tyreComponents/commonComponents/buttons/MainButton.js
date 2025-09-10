import Link from "next/link";
import React from "react";

const MainButton = ({ text, action, linkUrl }) => {
  return (
    <>
      {" "}
      {linkUrl ? (
        <Link
          href={linkUrl}
          title={text}
          className="mx-auto block w-fit rounded-lg bg-primary px-4 py-2 text-lg font-medium text-white text-center"
        >
          {text}{" "}
        </Link>
      ) : (
        <button
          className="mx-auto flex rounded-lg bg-primary px-4 py-2 md:text-lg text-white"
          onClick={action}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default MainButton;

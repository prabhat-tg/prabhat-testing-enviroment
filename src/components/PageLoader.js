// app/components/PageLoader.js
"use client";

import React from "react";

const PageLoader = ({ isLoading }) => {
  // Render nothing if not loading - this handles disappearance.
  if (!isLoading) return null;

  return (
    <>
      <style jsx>{`
        .page-loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px; /* Height of the loader bar */
          z-index: 9999; /* Ensure it's on top */
          background-color: transparent;
        }
        .loader-bar-fill {
          height: 100%;
          background-color: #fff; /* Next.js blue, or your brand color */
          animation: fill-animation 0.75s ease-out forwards; /* Fills and stays */
          width: 0%; /* Start at 0 width, animation will take it to 100% */
        }
        @keyframes fill-animation {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
      <div className="page-loader-container">
        <div className="loader-bar-fill"></div>
      </div>
    </>
  );
};

export default PageLoader;

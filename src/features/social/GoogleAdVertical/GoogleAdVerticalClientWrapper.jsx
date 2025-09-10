"use client";
// import dynamic from "next/dynamic";
import React from "react";
import GoogleAdVertical from "./GoogleAdVertical";

// const GoogleAdVertical = dynamic(
//   () => import("@/src/components/social/GoogleAdVertical/GoogleAdVertical"),
//   {
//     ssr: false,
//     // Optional: loading: () => <p>Loading ad...</p>
//   }
// );

export default function GoogleAdVerticalClientWrapper(props) {
  try {
    return <GoogleAdVertical {...props} />;
  } catch (error) {
    console.error("Error loading GoogleAdVertical:", error);
    return null; // Or fallback UI
  }
}

"use client";
import React from "react";
import GoogleAdHorizontal from "./GoogleAdHorizontal";

export default function GoogleAdHorizontalClientWrapper(props) {
  try {
    return <GoogleAdHorizontal {...props} />;
  } catch (error) {
    console.error("Error loading GoogleAdHorizontal:", error);
    return null; // Optional: show fallback UI instead of null
  }
}

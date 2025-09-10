"use client";
import { useEffect } from "react";

const GoogleAdHorizontal = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", width: 380, height: 100 }}
      data-ad-client="ca-pub-5083557383595231"
      data-ad-slot="7649069548"
    />
  );
};

export default GoogleAdHorizontal;

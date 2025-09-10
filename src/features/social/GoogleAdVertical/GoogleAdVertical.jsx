"use client";
import { useEffect } from "react";

const GoogleAdVertical = () => {
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
      style={{ display: "block", width: 300, height: 500 }}
      data-ad-client="ca-pub-5083557383595231"
      data-ad-slot="3483754940"
    />
  );
};

export default GoogleAdVertical;

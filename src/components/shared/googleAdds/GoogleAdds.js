"use client";
import Head from "next/head";
import React, { useEffect, useRef } from "react";

const GoogleAdds = () => {
  const adRef = useRef(null);

  useEffect(() => {
    // Only push if adsbygoogle is available and adRef is set
    if (window.adsbygoogle && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // Ignore errors
      }
    }
  }, []);

  return (
    <>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5083557383595231"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <section>
        <div className="container">
          <div className="h-full max-h-[208px] w-full overflow-hidden rounded-2xl">
            <ins
              className="adsbygoogle"
              style={{
                display: "inline-block",
                width: "1200px",
                height: "150px",
              }}
              data-ad-client="ca-pub-5083557383595231"
              data-ad-slot="1275232886"
              ref={adRef}
            ></ins>
          </div>
        </div>
      </section>
    </>
  );
};

export default GoogleAdds;

import { Inter } from 'next/font/google';
import Script from 'next/script'; // Import next/script
import './globals.css';
import { NavigationEvents } from '@/src/components/NavigationEvents';
import { readFileSync } from 'fs';
import LocationHandler from '../src/components/LocationHandler';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-5083557383595231" />
      </head>
      <body className={inter.className}>
        {/* Google Analytics (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-4ZRKV0FYM5"
        />
        <Script strategy="afterInteractive" id="gtag-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4ZRKV0FYM5');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script strategy="afterInteractive" id="gtm-init">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K32JVFB');
          `}
        </Script>
        {/* End Google Tag Manager */}

        {/* Google AdSense */}
        <Script
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5083557383595231"
          crossOrigin="anonymous"
        />
        <NavigationEvents />
        <LocationHandler />
        {children}
      </body>
    </html>
  );
}

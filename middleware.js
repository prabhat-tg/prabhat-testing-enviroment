import { NextResponse } from 'next/server';
import { obsoleteUrls as originalObsoleteUrls } from './src/data/obsolete-urls';

// Process obsolete URLs to keep full paths with query parameters
const processedObsoleteUrls = originalObsoleteUrls
  .map(fullUrl => {
    try {
      const urlObject = new URL(fullUrl);
      let path = urlObject.pathname;
      // Remove /amp if it exists at the end of the path
      if (path.endsWith('/amp')) {
        path = path.slice(0, -4);
      }
      // Ensure it starts with a slash
      path = path.startsWith('/') ? path : '/' + path;
      // Include query parameters for full URL matching
      const searchParams = urlObject.search;
      return path + searchParams;
    } catch (error) {
      console.error(`Invalid URL in obsoleteUrls: ${fullUrl}`, error);
      return null;
    }
  })
  .filter(url => url !== null); // Filter out any nulls from invalid URLs

export function middleware(req) {
  const { cookies } = req;
  const langCookie = cookies.get('NEXT_LOCALE');
  const lang = langCookie ? langCookie.value : 'en';
  const pathname = req.nextUrl.pathname;
  console.log('Pathname:', pathname);

  // Set NEXT_LOCALE to 'hi' if path starts with '/hi'
  if (pathname.startsWith('/hi') && lang !== 'hi') {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', 'hi', { path: '/' });
    return response;
  }

  // Obsolete URL check with full URL matching including parameters
  const currentUrl = req.nextUrl.pathname + req.nextUrl.search;

  // Normalize: remove /amp if present
  let normalizedCurrentUrl = currentUrl;
  if (normalizedCurrentUrl.includes('/amp')) {
    normalizedCurrentUrl = normalizedCurrentUrl.replace('/amp', '');
  }

  const isObsoleteUrl = processedObsoleteUrls.some(obsoleteUrl =>
    normalizedCurrentUrl === obsoleteUrl
  );

  if (isObsoleteUrl) {
    return new NextResponse(
      `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="robots" content="noindex, nofollow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Content No Longer Available (410)</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
        }
        h1 {
          font-size: 3rem;
          color: #343a40;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.1rem;
          color: #6c757d;
          max-width: 600px;
          margin: 0.5rem auto;
          line-height: 1.6;
        }
        .cta-button {
          display: inline-block;
          margin-top: 2rem;
          padding: 12px 25px;
          font-size: 1rem;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .cta-button:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <h1>Content Removed</h1>
      <p>The page you are looking for is no longer available.</p>
      <p>
        We apologize for any inconvenience. This content has been permanently removed from our website.
        You might find what you're looking for on our Tractor Industry News & Blogs page.
      </p>
      <a href="/tractor-industry-news-blogs" class="cta-button">Go to Tractor News & Blogs</a>
    </body>
    </html>
    `,
      {
        status: 410,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  }

  // AMP redirection (if not an obsolete URL, as that takes precedence)
  if (pathname.endsWith('/amp')) {
    let newPath = pathname.slice(0, -4);
    if (newPath === '' || newPath === '/') {
      newPath = '/';
    }
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = newPath;
    return NextResponse.redirect(redirectUrl);
  }

  // // Exclude news blog AMP pages from lang prefix
  // // Matches: /tractor-industry-news-blogs/[number]/[text]/amp
  // const isNewsBlogAmp = /^tractor-industry-news-blogs\/\d+\/[^/]+\/amp$/.test(
  //   pathname
  // );

  // // Prevent infinite redirect loops by checking if already redirected
  // // Only redirect if lang is not 'en' and path is not already prefixed
  // const isLocalePrefixed =
  //   pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`;
  // const isApiRoute = pathname.startsWith("/api/");
  // const isFile = pathname.includes(".");
  // const isNextInternal = pathname.startsWith("/_next/");
  // const isFavicon = pathname === "/favicon.ico";

  // // // Only redirect if lang is 'hi' (or any non-default) and not already prefixed
  // // if (
  // //   // lang !== "en" &&
  // //   !isLocalePrefixed &&
  // //   !isApiRoute &&
  // //   !isFile &&
  // //   !isNextInternal &&
  // //   !isFavicon &&
  // //   pathname !== "/"
  // //   // !isNewsBlogAmp // <-- do not add lang for news blog AMP pages
  // // ) {
  // //   const url = req.nextUrl.clone();
  // //   url.pathname = `${""}${
  // //     pathname.startsWith("/") ? pathname : "/" + pathname
  // //   }`;
  // //   return NextResponse.redirect(url);
  // // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
};

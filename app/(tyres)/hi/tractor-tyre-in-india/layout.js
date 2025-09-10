// import { fetchSeoData } from "@/src/lib/seo/fetchSeoData";
// import "@/src/lib/seo/fetchSeoData";
import '../../../tyreGlobals.css';

// export async function generateMetadata() {
//   const currentYear = new Date().getFullYear();

// You can fetch custom SEO data from your API if needed
//   const seoData = await fetchSeoData("tractor-tyre-in-india");

//   return {
//     title:
//       seoData?.title ||
//       `Tractor Tyres in India ${currentYear} | Price, Sizes & Brands`,
//     description:
//       seoData?.description ||
//       `Find the best tractor tyres in India ${currentYear}. Compare prices, sizes, and brands to choose the perfect tyre for your tractor at Tractor Gyan.`,
//     keywords:
//       seoData?.keywords ||
//       "tractor tyres, tractor tires india, tractor tyre price, tractor tyre brands, farm tyres",
//     alternates: {
//       canonical: "https://tractorgyan.com/tractor-tyre-in-india",
//       languages: {
//         hi: "https://tractorgyan.com/hi/tractor-tyre-in-india",
//       },
//     },
//     openGraph: {
//       title: `Tractor Tyres in India ${currentYear} | TractorGyan`,
//       description: `Find the best tractor tyres in India ${currentYear}. Compare prices, sizes, and brands.`,
//       url: "https://tractorgyan.com/tractor-tyre-in-india",
//       siteName: "Tractor Gyan",
//       images: [
//         {
//           url: "https://tractorgyan.com/images/tractor-tyres-og.jpg",
//           width: 1200,
//           height: 630,
//           alt: "Tractor Tyres in India",
//         },
//       ],
//       locale: "en_IN",
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `Tractor Tyres in India ${currentYear} | TractorGyan`,
//       description: `Find the best tractor tyres in India ${currentYear}. Compare prices, sizes, and brands.`,
//       images: ["https://tractorgyan.com/images/tractor-tyres-twitter.jpg"],
//     },
//   };
// }

export default function RootLayout({ children }) {
  return <>{children}</>;
}

import TractorBlogTagPage from '@/src/components/blogs/TractorBlogTag';
import React from 'react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const title = `लेटेस्ट ${slug} ब्लॉग देखे - ट्रैक्टरज्ञान`;
  const description = `सभी ${slug} ब्लॉग पढ़े। ट्रैक्टरज्ञान पर ${slug} ब्लॉग पर अधिक जानकारी प्राप्त करें।`;
  const keywords = `${slug} ब्लॉग, ${slug} कीमत ब्लॉग, ${slug} मिनी ट्रैक्टर कीमत ब्लॉग, ${slug} मिनी ट्रैक्टर ब्लॉग |`;
  const canonicalUrl = `https://tractorgyan.com/hi/tractorblogtag/${slug}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: 'index, follow',
    contentType: 'text/html; charset=utf-8',
    language: 'Hindi',
  };
}

export default async function Page({ params, searchParams }) {
  return (
    <>
      <TractorBlogTagPage params={params} searchParams={searchParams} prefLangs={'hi'} />
    </>
  );
}

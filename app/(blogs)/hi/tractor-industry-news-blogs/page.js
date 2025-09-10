import BlogListingPage from '@/src/components/blogs/BlogListingPage';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  const params = await searchParams;

  return (
    <>
      <BlogListingPage searchParams={params} prefLangs={'hi'} />
    </>
  );
}

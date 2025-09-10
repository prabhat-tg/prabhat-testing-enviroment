import BlogDetailsPage from '@/src/components/blogs/BlogDetailsPage';
import React from 'react';

const Page = async ({ params }) => {
  return (
    <>
      <BlogDetailsPage params={params} prefLangs={'hi'} />
    </>
  );
};

export default Page;

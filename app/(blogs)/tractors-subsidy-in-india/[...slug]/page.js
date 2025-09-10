import TractorsSubsidyIndiaPage from '@/src/components/blogs/TractorsSubsidyIndiaPage';
import React from 'react';

const page = async ({ params, searchParams }) => {
  const param = await params.slug[0];
  const searchParam = await searchParams;
  const subsidyID = await params.slug[1];
  return (
    <>
      <TractorsSubsidyIndiaPage params={param} searchParams={searchParam} subsidyID={subsidyID} />
    </>
  );
};

export default page;

import TyreBrandPage from '@/src/features/tyre/TyreBrandPage';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function page({ params, searchParams }) {
  const param = await params;
  const searchParamsObj = await searchParams;
  return (
    <>
      <TyreBrandPage params={param} searchParams={searchParamsObj} />
    </>
  );
}

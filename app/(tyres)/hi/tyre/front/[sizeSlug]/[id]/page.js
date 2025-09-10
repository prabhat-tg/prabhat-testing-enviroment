import TyreFrontDetailPage from '@/src/features/tyre/TyreFrontDetailPage';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function page({ params, searchParams }) {
  const param = await params;
  const searchParamsObj = await searchParams;
  return (
    <>
      <TyreFrontDetailPage params={param} searchParams={searchParamsObj} />
    </>
  );
}

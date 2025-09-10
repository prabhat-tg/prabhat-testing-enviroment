import TyreDetailPage from '@/src/features/tyre/TyreDetailPage';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function page({ params }) {
  const param = await params;
  // const searchParamsObj = await searchParams;
  return (
    <>
      <TyreDetailPage params={param} />
    </>
  );
}

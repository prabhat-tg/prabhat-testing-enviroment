import TyreFrontDetailPage from '@/src/features/tyre/TyreFrontDetailPage';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function page({ params, searchParams }) {
  return (
    <>
      <TyreFrontDetailPage params={params} searchParams={searchParams} />
    </>
  );
}

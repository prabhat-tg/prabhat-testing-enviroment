import TyreDealersSlugPage from '@/src/features/tyre/TyreDealersSlugPage';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function page({ params, searchParams }) {
  return (
    <>
      <TyreDealersSlugPage params={params} searchParams={searchParams} />
    </>
  );
}

import TyreDetailPage from '@/src/features/tyre/TyreDetailPage';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function page({ params }) {
  return (
    <>
      <TyreDetailPage params={params} />
    </>
  );
}

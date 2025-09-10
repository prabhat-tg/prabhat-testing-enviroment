import TyresPage from '@/src/features/tyre/TyresPage';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function Page({ params, searchParams }) {
  return (
    <>
      <TyresPage params={params} searchParams={searchParams} />
    </>
  );
}

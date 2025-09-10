import React from 'react';
import nextDynamic from 'next/dynamic';
const TG_HomePage = nextDynamic(() => import('@/src/features/home/HomePage'), {
  ssr: true,
}); // Changed to ssr: true
export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  const params = await searchParams;

  return (
    <>
      <TG_HomePage />
    </>
  );
}

import React from 'react';
import TractorsSubsidyPage from '@/src/features/TractorsSubsidy/TractorsSubsidyPage';

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  const params = await searchParams;

  return (
    <>
      <TractorsSubsidyPage searchParams={params} />
    </>
  );
}

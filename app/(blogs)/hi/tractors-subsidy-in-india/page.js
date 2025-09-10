import TractorsSubsidyPage from '@/src/features/TractorsSubsidy/TractorsSubsidyPage';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }) {
  const params = await searchParams;

  return (
    <>
      <TractorsSubsidyPage searchParams={params} prefLangs={'hi'} />
    </>
  );
}

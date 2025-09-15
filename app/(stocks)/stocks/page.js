import React from 'react';
import TG_StocksHomePage from '@/src/features/stocks/StocksHomePage';
export const dynamic = "force-dynamic";

export default async function Page() {

  return (
    <>
      <TG_StocksHomePage />
    </>
  );
}

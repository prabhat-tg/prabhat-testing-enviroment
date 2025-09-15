import React, { Suspense } from 'react';
import FrontTyrePage from '@/src/features/tyre/FrontTyrePage';
import ListingSkeleton from '@/src/components/ui/listingSkeleton/listingSkeleton';
export const dynamic = "force-dynamic";

const Page = ({ params, searchParams }) => {
  return (
    // <Suspense fallback={<ListingSkeleton />}>
    <FrontTyrePage params={params} searchParams={searchParams} />
    // </Suspense>
  );
};

export default Page;

import React, { Suspense } from 'react';
import RearTyrePage from '@/src/features/tyre/RearTyrePage';
import ListingSkeleton from '@/src/components/ui/listingSkeleton/listingSkeleton';

const Page = ({ params, searchParams }) => {
  return (
    // <Suspense fallback={<ListingSkeleton />}>
    <RearTyrePage params={params} searchParams={searchParams} />
    // </Suspense>
  );
};

export default Page;

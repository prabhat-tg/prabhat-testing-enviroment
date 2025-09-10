import React, { Suspense } from 'react';
import RearTyreDetailPage from '@/src/features/tyre/RearTyreDetailPage';
import ListingSkeleton from '@/src/components/ui/listingSkeleton/listingSkeleton';

const Page = ({ params, searchParams }) => {
  return (
    // <Suspense fallback={<ListingSkeleton />}>
    <RearTyreDetailPage params={params} searchParams={searchParams} />
    // </Suspense>
  );
};

export default Page;

import React from 'react';

const CommunityCardSkeleton = () => {
  return (
    <div
      className="animate-pulse rounded-lg bg-white p-3 shadow-card flex items-center justify-between md:w-full md:min-w-[180px] md:max-w-[280px] lg:min-w-[280px] lg:max-w-[300px]"
    >
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 bg-gray-300 rounded-full" />

        <div className="flex flex-col gap-1">
          <div className="h-3 w-20 bg-gray-300 rounded-sm" />
          <div className="h-4 w-24 bg-gray-400 rounded-md" />
        </div>
      </div>

      <div className="w-[58px] lg:w-[90px] text-center border-s-[1px] border-gray-light pl-2">
        <div className="h-4 w-10 bg-gray-400 rounded-md mx-auto mb-1" />
        <div className="h-3 w-12 bg-gray-300 rounded-sm mx-auto" />
      </div>
    </div>
  );
};

export default CommunityCardSkeleton;

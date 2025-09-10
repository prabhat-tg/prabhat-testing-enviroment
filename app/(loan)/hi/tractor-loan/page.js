import TractorLoanPages from '@/src/features/loan/pages/TractorLoanPages';
import React from 'react';
export const dynamic = 'force-dynamic';
const page = () => {
  return (
    <>
      <TractorLoanPages propsPrefLang={'hi'} />
    </>
  );
};

export default page;

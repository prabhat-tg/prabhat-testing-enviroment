'use client';
import { tg_getTittleFromNestedKey } from '@/src/utils';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const TyreFAQsServer = dynamic(() => import('./TyreFAQsServer'), {
  ssr: true,
});

const TyreFAQs = ({
  translation,
  faqs,
  headingKey,
  isDynamicTitle,
  brandName,
  faqsError,
  bgColor,
}) => {
  let headingTitle = tg_getTittleFromNestedKey(translation, headingKey);

  if (isDynamicTitle) {
    headingTitle = `${headingTitle.replace('{brandName}', brandName)}`;
  }
  // console.log('heading title', headingTitle);

  const formattedFaqs = faqs?.map((faq, index) => ({
    question: faq[`ques_${index + 1}`],
    answer: faq[`ans_${index + 1}`],
  }));

  if (!faqs || faqs.length === 0) {
    return <></>;
  }

  if (faqsError) {
    return (
      <div className="py-5 text-center">
        <p>{translation?.error_messages?.faqs_unavailable || 'FAQs are currently unavailable.'}</p>
      </div>
    );
  }

  const [openRows, setOpenRows] = useState([0, 1]); // Track open rows

  const columns = 2;

  const handleToggle = idx => {
    const row = Math.floor(idx / columns);
    if (openRows.includes(row)) {
      // Close the whole row
      setOpenRows(openRows.filter(r => r !== row));
    } else {
      // Open the whole row
      setOpenRows([...openRows, row]);
    }
  };

  // Compute openIndexes for the server component
  const openIndexes = [];
  for (let i = 0; i < formattedFaqs?.length; i++) {
    const row = Math.floor(i / columns);
    if (openRows.includes(row)) openIndexes.push(i);
  }

  return (
    <TyreFAQsServer
      faqs={formattedFaqs}
      openIndexes={openIndexes}
      onToggle={handleToggle}
      headingTitle={headingTitle}
      bgColor={bgColor}
    />
  );
};

export default TyreFAQs;

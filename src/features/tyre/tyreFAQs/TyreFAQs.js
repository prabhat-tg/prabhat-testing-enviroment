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
  tractorDealerPayload,
}) => {
  let headingTitle = tg_getTittleFromNestedKey(translation, headingKey);

  if (isDynamicTitle) {
    // Replace brandName parameter (legacy support)
    if (brandName) {
      headingTitle = headingTitle.replace('{brandName}', brandName);
    }

    // Replace parameters from tractorDealerPayload
    if (tractorDealerPayload) {
      console.log('TyreFAQs: Original headingTitle:', headingTitle);
      console.log('TyreFAQs: tractorDealerPayload:', tractorDealerPayload);

      // Replace {brand_name}
      if (tractorDealerPayload.brand_name) {
        headingTitle = headingTitle.replace('{brand_name}', tractorDealerPayload.brand_name);
      }

      // Replace {state}
      if (tractorDealerPayload.state) {
        headingTitle = headingTitle.replace('{state}', tractorDealerPayload.state);
      }

      // Replace {city}
      if (tractorDealerPayload.city) {
        headingTitle = headingTitle.replace('{city}', tractorDealerPayload.city);
      }

      console.log('TyreFAQs: Final headingTitle after replacements:', headingTitle);
    }
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

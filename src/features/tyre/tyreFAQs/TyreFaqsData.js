import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { getDictionary } from '@/src/lib/dictonaries';
import { getTyreFAQs } from '@/src/services/tyre/tyre-faq';
import TyreFAQs from './TyreFAQs';
import { getTractorDealerFAQs } from '@/src/services/tractor/get-delaer-faqs';

export default async function TyreFaqsData({
  pageSlug,
  brandName = '',
  headingKey = 'tyrefaqs.allTractorTyres',
  tractorDealerPayload = null
}) {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);
  let faqs;

  if (tractorDealerPayload) {
    faqs = await getTractorDealerFAQs(tractorDealerPayload);
  } else {
    faqs = await getTyreFAQs({
      langPrefix: currentLang,
      slug: pageSlug,
    });

  }

  return (
    <TyreFAQs
      faqs={faqs}
      translation={translation}
      headingKey={headingKey}
      isDynamicTitle={brandName !== '' || tractorDealerPayload !== null}
      brandName={brandName}
      tractorDealerPayload={tractorDealerPayload}
    />
  );
}

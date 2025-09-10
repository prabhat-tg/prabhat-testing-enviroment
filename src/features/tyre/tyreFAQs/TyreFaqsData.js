import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { getDictionary } from '@/src/lib/dictonaries';
import { getTyreFAQs } from '@/src/services/tyre/tyre-faq';
import TyreFAQs from './TyreFAQs';

export default async function TyreFaqsData({
  pageSlug,
  brandName = '',
  headingKey = 'tyrefaqs.allTractorTyres',
}) {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);

  const faqs = await getTyreFAQs({
    langPrefix: currentLang,
    slug: pageSlug,
  });

  return (
    <TyreFAQs
      faqs={faqs}
      translation={translation}
      headingKey={headingKey}
      isDynamicTitle={brandName !== ''}
      brandName={brandName}
    />
  );
}

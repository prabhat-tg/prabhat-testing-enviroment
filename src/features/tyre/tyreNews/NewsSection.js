'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import { categories, categoryMap } from './categories';

// dynamically import the server component, but keep SSR on
const NewsCategoryContent = dynamic(() => import('./NewsCategoryContent'), {
  ssr: true,
});

export default function NewsSection({
  news,
  translation,
  langPrefix,
  bgColor = '',
  title,
  showFilter = true,
}) {
  const [active, setActive] = useState('Tyres');

  return (
    <section className={bgColor}>
      <div className="container">
        {/* <MainHeadings text={translation.headings.tyreNews} /> */}
        <MainHeadings text={title} />
        {showFilter && (
          <div className="no-scrollbar mb-6 flex items-center gap-2 overflow-auto">
            <span className="font-bold">{translation.buttons.filter}:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-nowrap rounded-full border px-4 py-2 text-sm ${
                  active === cat ? 'bg-primary text-white' : 'border-gray-main text-black'
                } `}
              >
                {langPrefix === 'hi' ? categoryMap[cat] : cat}
              </button>
            ))}
          </div>
        )}

        {showFilter ? (
          categories.map(cat => (
            <div key={cat} className={active === cat ? 'block' : 'hidden'}>
              <NewsCategoryContent
                newsItems={news[cat === 'Tyres' ? 'tyre-news' : cat] || []}
                translation={translation}
                langPrefix={langPrefix}
              />
            </div>
          ))
        ) : (
          <NewsCategoryContent
            newsItems={Array.isArray(news) ? news : []}
            translation={translation}
            langPrefix={langPrefix}
          />
        )}
      </div>
    </section>
  );
}

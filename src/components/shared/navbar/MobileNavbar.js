import React from 'react';
import HeaderTabs from './HeaderTabs';
import { tgi_tractor_nav, tgi_tyre_nav } from '@/src/utils/assets/icons';

const MobileNavbar = ({ tabset, translation, currentLang = 'en' }) => {
  const langPrefix = currentLang === 'hi' ? '/hi' : '';

  const tractorTabs = [
    {
      tabHeading: translation.mobileNavbar.tractor.buyNew,
      linkUrl: `${langPrefix}/tractors`,
      imgUrl: tgi_tractor_nav.buy_new,
      altText: 'buy-new-tractor-img',
    },
    {
      tabHeading: translation.mobileNavbar.tractor.miniTractor,
      linkUrl: `${langPrefix}/mini-tractors-in-india`,
      imgUrl: tgi_tractor_nav.mini_tractor,
      altText: 'mini-tractor-img',
    },
    {
      tabHeading: translation.mobileNavbar.tractor.videos,
      linkUrl: `${langPrefix}/tractor-videos`,
      imgUrl: tgi_tractor_nav.videos,
      altText: 'tractor-videos-img',
    },
    {
      tabHeading: translation.mobileNavbar.tractor.reels,
      linkUrl: `${langPrefix}/tractor-reels-and-shorts`,
      imgUrl: tgi_tractor_nav.reels,
      altText: 'tractor-reels-img',
    },
    {
      tabHeading: translation.mobileNavbar.tractor.subsidy,
      linkUrl: `${langPrefix}/tractors-subsidy-in-india`,
      imgUrl: tgi_tractor_nav.subsidy,
      altText: 'tractor-subsidy-img',
    },
    {
      tabHeading: translation.mobileNavbar.tractor.webstory,
      linkUrl: `${langPrefix}/web-story-in-india`,
      imgUrl: tgi_tractor_nav.webstory,
      altText: 'tractor-webstory-img',
    },
    {
      tabHeading: translation.mobileNavbar.tractor.oldTractor,
      linkUrl: `${langPrefix}/second-hand-tractor`,
      imgUrl: tgi_tractor_nav.old_tractor,
      altText: 'old-tractor-img',
    },
    {
      tabHeading: translation.mobileNavbar.tractor.emiCalculator,
      linkUrl: `${langPrefix}/tractor-emi-calculator`,
      imgUrl: tgi_tractor_nav.emi_calculator,
      altText: 'tractor-emi-calculator-img',
    },
  ];

  const tyreTabs = [
    {
      tabHeading: translation.mobileNavbar.tyre.allTyres,
      linkUrl: `${langPrefix}/tyres`,
      imgUrl: tgi_tyre_nav.all_tyres,
      altText: 'all-tyre-img',
    },
    {
      tabHeading: translation.mobileNavbar.tyre.tyrePrice,
      linkUrl: `${langPrefix}/tyre-price`,
      imgUrl: tgi_tyre_nav.tyre_price,
      altText: 'tyre-price-img',
    },
    {
      tabHeading: translation.mobileNavbar.tyre.frontTyre,
      linkUrl: `${langPrefix}/tyre/front`,
      imgUrl: tgi_tyre_nav.front_tyre,
      altText: 'front-tyre-img',
    },
    {
      tabHeading: translation.mobileNavbar.tyre.rearTyre,
      linkUrl: `${langPrefix}/tyre/rear`,
      imgUrl: tgi_tyre_nav.rear_tyre,
      altText: 'rear-tyre-img',
    },
    {
      tabHeading: translation.mobileNavbar.tyre.tyreBlogs,
      linkUrl: `${langPrefix}/tractor-industry-news-blogs/category/tyre-news`,
      imgUrl: tgi_tyre_nav.tyre_blogs,
      altText: 'tyre-blog-img',
    },
  ];

  const implementTabs = [
    {
      tabHeading: translation.mobileNavbar.implement.allImplements,
      linkUrl: `${langPrefix}/tyres`,
      imgUrl: tgi_tyre_nav.all_tyres,
      altText: 'all-tyre-img',
    },
    // {
    //   tabHeading: 'Videos',
    //   linkUrl: '/tractor-videos',
    //   imgUrl: tgi_tractor_nav.videos,
    //   altText: 'implement-videos-img',
    // },
    // {
    //   tabHeading: 'Reels',
    //   linkUrl: '/tractor-reels-and-shorts',
    //   imgUrl: tgi_tractor_nav.reels,
    //   altText: 'implement-reels-img',
    // },
    // {
    //   tabHeading: 'EMI Calculator',
    //   linkUrl: '/tractor-emi-calculator',
    //   imgUrl: tgi_tractor_nav.emi_calculator,
    //   altText: 'implement-emi-calculator-img',
    // },
    {
      tabHeading: translation.mobileNavbar.implement.implementPrice,
      linkUrl: `${langPrefix}/implement-on-road-price`,
      imgUrl: tgi_tyre_nav.tyre_price,
      altText: 'implement-price-img',
    },
    {
      tabHeading: translation.mobileNavbar.implement.webstory,
      linkUrl: `${langPrefix}/web-story-in-india`,
      imgUrl: tgi_tractor_nav.webstory,
      altText: 'implement-webstory-img',
    },
    {
      tabHeading: translation.mobileNavbar.implement.implementBlogs,
      linkUrl: `${langPrefix}/tractor-industry-news-blogs/category/tyre-news`,
      imgUrl: tgi_tyre_nav.tyre_blogs,
      altText: 'implement-blog-img',
    },
  ];

  let tabs;
  if (tabset === 'TYRE') {
    tabs = tyreTabs;
  } else if (tabset === 'TRACTOR') {
    tabs = tractorTabs;
  } else if (tabset === 'IMPLEMENTS') {
    tabs = implementTabs;
  }
  return (
    <nav className="mt-3 lg:hidden">
      <div className="container">
        <div className="no-scrollbar overflow-auto">
          <ul className="flex gap-4">
            {tabs.map((tab, index) => (
              <HeaderTabs
                key={index}
                tabHeading={tab.tabHeading}
                linkUrl={tab.linkUrl}
                imgUrl={tab.imgUrl}
                altText={tab.altText}
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;

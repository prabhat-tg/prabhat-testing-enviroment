import React from 'react';
import { getSelectedLanguage } from '@/src/services/locale/index.js';
import { getDictionary } from '@/src/lib/dictonaries';
import {
  getTyreReels,
  getTyreVideos,
  getTyreWebstories,
} from '@/src/services/tyre/tyre-brand-webstore';
import UpdatesSection from './UpdatesSection';

export default async function UpdatesData({
  brandName = '',
  slug = 'tractor-tyre-in-india',
  linkUrls = {
    videos: '/tractor-videos',
    webstories: '/web-story-in-india',
    reels: '/tractor-reels-and-shorts',
  },
}) {
  const currentLang = await getSelectedLanguage();
  const translation = await getDictionary(currentLang);

  const [videos, reels, webstories] = await Promise.all([
    getTyreVideos(slug),
    getTyreReels(slug),
    getTyreWebstories(slug),
  ]);

  console.log('tyre front updates data', !videos, reels, webstories);

  if (videos.length == 0 && reels.length == 0 && webstories.length == 0) {
    return null; // Return null if no content is available
  }

  return (
    <UpdatesSection
      videos={videos}
      reels={reels}
      webstories={webstories}
      translation={translation}
      slug={slug}
      brandName={brandName}
      linkUrls={linkUrls}
    />
  );
}

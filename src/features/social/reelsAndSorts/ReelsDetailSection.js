'use client';

import { useEffect, useRef } from 'react';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import Image from 'next/image';
import React from 'react';
import TittleAndCrumbs from '../../../components/shared/TittleAndCrumbs/TittleAndCrumbs';
import Link from 'next/link';
import ReelsDetailsCard from './ReelsDetailsCard';
import { modifiedSubsCount } from '@/src/utils';
import { TG_ReelsDetailCard } from '@/src/components/ui/cards/reels/ReelsCards';

const ReelsDetailSection = ({ param, reelDetailData, isMobile, youtubeCount }) => {
  const reelData = reelDetailData?.data[0];
  const reelLatestVideo = reelDetailData?.latest_video;

  const videoRef = useRef(null);

  // Load YouTube platform script for subscribe button
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Scroll iframe into center on mount
  useEffect(() => {
    if (videoRef.current) {
      const rect = videoRef.current.getBoundingClientRect();
      const scrollY =
        window.scrollY +
        rect.top +
        rect.height / 2 -
        window.innerHeight / 2;
      window.scrollTo({ top: scrollY, behavior: 'smooth' });
    }
  }, []);

  const formattedTitle = formatSlugToTitle(reelData?.title);

  function formatSlugToTitle(slug) {
    if (!slug) return '';

    const words = slug.split('-');

    const minorWords = ['of', 'into', 'for', 'the', 'and', 'in', 'on', 'with', 'to'];

    const formatted = words
      .map((word, index) => {
        if (minorWords.includes(word) && index !== 0) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');

    return formatted;
  }

  return (
    <section className="pb-14 max-md:pt-3 lg:mt-[155px]">
      <div className="container relative">
        <TittleAndCrumbs
          title={formattedTitle}
          breadcrumbs={[
            { label: 'Home', href: '/', title: 'Home' },
            {
              label: 'Tractor & Implement Reels',
              href: '/tractor-reels-and-shorts',
              title: 'Tractor & Implement Reels',
            },
            {
              label: formattedTitle,
              title: formattedTitle,
              isCurrent: true,
            },
          ]}
        />
        <div className="mb-6 items-center md:flex md:justify-between">
          <div className="lg:w-[40%]">
            <div className="mx-auto mb-6 flex w-fit gap-3 rounded-3xl bg-red-subBg p-1 md:mb-0 md:ms-0">
              <div className="flex items-center justify-center gap-2">
                {/* <div
              className="g-ytsubscribe"
              data-channelid="YOUR_CHANNEL_ID_HERE"
              data-layout="default"
              data-count="default"
            ></div> */}
                <Link
                  target="_blank"
                  title="Visit Tractors Gyan YouTube channel"
                  aria-label="Visit the official YouTube channel of Tractors Gyan"
                  href="https://www.youtube.com/@TractorGyan"
                  className="rounded-full bg-[#d30000] px-4 py-1 text-sm text-white"
                >
                  <span>SUBSCRIBE</span>
                </Link>
                <Image
                  src="https://images.tractorgyan.com/uploads/119244/6835a9d8d41db-Bell-icon_small.webp"
                  height={30}
                  width={30}
                  alt="bell icon"
                  title="bell icon"
                  className="h-7 w-7"
                />
              </div>
              <div className="flex flex-col border-s-[1px] border-gray-main px-5">
                <span className="text-base font-bold leading-4 text-black">
                  {modifiedSubsCount(youtubeCount)} +
                </span>
                <span className="text-[10px] font-medium">
                  Tractor<span className="text-primary">Gyan</span> on YouTube
                </span>
              </div>
            </div>
          </div>
          {!isMobile && (
            <div className="hidden w-full flex-1 justify-center md:flex xl:w-[60%]">
              <MainHeadings text={'Latest reels'} marginBottom={'mb-0'} />
            </div>
          )}
        </div>
        <div className="grid w-full grid-cols-8 gap-4 md:grid-cols-9 lg:w-fit">
          <div className="col-span-8 md:col-span-4">
            <div
              ref={videoRef}
              className="relative mx-auto mb-2.5 h-full min-h-[500px] max-w-[280px] overflow-hidden rounded-[16px] md:max-h-[500px] md:min-h-[300px]"
            >
              {reelData?.url_of_video ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={
                    reelData.url_of_video.includes('autoplay=1')
                      ? reelData.url_of_video
                      : `${reelData.url_of_video}${reelData.url_of_video.includes('?') ? '&' : '?'}autoplay=1`
                  }
                  title={reelData.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="bg-gray-200 text-gray-600 flex h-full items-center justify-center text-center text-sm">
                  Video loading or unavailable.
                </div>
              )}
            </div>
          </div>

          <div className="col-span-8 md:col-span-5">
            {isMobile && (
              <div className="mt-2 w-full md:hidden">
                <MainHeadings text={'Latest reels'} />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 md:max-h-[500px] md:gap-6 md:overflow-auto lg:grid-cols-3">
              {reelLatestVideo?.map((item, index) => (
                <div key={index} className="col-span-1 lg:col-span-1">
                  {/* <ReelsDetailsCard data={item} /> */}
                  <TG_ReelsDetailCard data={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReelsDetailSection;

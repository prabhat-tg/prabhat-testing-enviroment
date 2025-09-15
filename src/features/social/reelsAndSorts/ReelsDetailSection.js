'use client';
import { useEffect, useRef, useState } from 'react';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import Image from 'next/image';
import React from 'react';
import TittleAndCrumbs from '../../../components/shared/TittleAndCrumbs/TittleAndCrumbs';
import { TG_ReelsDetailCard } from '@/src/components/ui/cards/reels/ReelsCards';
import { useRouter } from 'next/navigation';
import { postVideoReelButtons } from '@/src/services/social/VideoReelButtons';

const ReelsDetailSection = ({ param, reelDetailData, isMobile, youtubeCount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const reelData = reelDetailData?.data[0];
  const reelLatestVideo = reelDetailData?.latest_video;
  console.log("reelLatestVideo", reelLatestVideo)

  const router = useRouter();
  const videoRef = useRef(null);


  // Load YouTube platform script for subscribe button
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Scroll iframe into center on mount
  // useEffect(() => {
  //   if (videoRef.current) {
  //     const rect = videoRef.current.getBoundingClientRect();
  //     const scrollY =
  //       window.scrollY +
  //       rect.top +
  //       rect.height / 2 -
  //       window.innerHeight / 2;
  //     window.scrollTo({ top: scrollY, behavior: 'smooth' });
  //   }
  // }, []);
  // Check initial state on component mount for current state 
  useEffect(() => {
  }, []);

  const handleNavigation = async (btnType) => {
    setIsLoading(true);
    try {
      const payload = {
        video_id: reelData.id,
        video_type: 'reels',
        btn_type: btnType,
      };
      const response = await postVideoReelButtons(payload);
      // Update isFirst and isLast based on response
      if (response.hasOwnProperty('is_first')) {
        setIsFirst(response.is_first === 1);
      }
      if (response.hasOwnProperty(`is_last`)) {
        setIsLast(response.is_last === 1);
      }
      if (response.success && response.data && response.data.length > 0) {
        router.push(response.data[0].full_url);
      }
    } catch (error) {
      console.error('Error fetching navigation data:', error);
    } finally {
      setIsLoading(false);
    }
  };
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
    <section className="pb-14 max-md:pt-3 lg:mt-[153px]">
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
          customClass={`max-sm:leading-[22px] md:!text-xl`}
        />
        <div className="grid w-full grid-cols-8 gap-4 md:grid-cols-8 lg:w-fit md:-mt-3">
          <div className="col-span-8 bg-gradient-to-r from-[#DBF5DB] via-[#F5FBF5] to-[#C3EFC3] rounded-2xl py-4 px-2.5 md:p-4 flex justify-center items-center gap-3 md:gap-8">
            <button onClick={() => handleNavigation('prev')}
              disabled={isLoading || isFirst}
              className={`flex justify-center items-center md:gap-2 shadow-main font-medium md:text-lg rounded-xl bg-white p-3 md:px-3 md:py-2 text-gray-dark ${isLoading || isFirst
                ? ' cursor-not-allowed opacity-60'
                : ' hover:scale-105'
                }`}>
              <Image src={'https://images.tractorgyan.com/uploads/120941/68be875ce2b84-gray-next-arrow.webp'} height={100} width={200} alt='previous button icon' title='previous button icon' className=' w-auto max-w-8 h-3 min-h-3 rotate-90' />
              <span className='max-md:hidden'>Prev</span>
            </button>
            <div
              ref={videoRef}
              className="relative max-md:mx-auto h-full min-h-[360px] w-full max-w-[205px] md:max-w-[210px] overflow-hidden rounded-[16px] md:max-h-[600px] md:min-h-[370px] xl:min-h-[415px] xl:max-w-[235px] "
            >
              {reelData?.url_of_video ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={
                    reelData.url_of_video.includes("autoplay=1")
                      ? `${reelData.url_of_video}&mute=1&playsinline=1`
                      : `${reelData.url_of_video}${reelData.url_of_video.includes("?") ? "&" : "?"
                      }autoplay=1&mute=1&playsinline=1`
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
            <button onClick={() => handleNavigation('next')}
              disabled={isLoading || isLast} className={`flex justify-center items-center md:gap-2 shadow-main font-medium md:text-lg rounded-xl bg-white p-3 md:px-3 md:py-2 text-gray-dark ${isLoading || isLast
                ? ' cursor-not-allowed opacity-60'
                : ' hover:scale-105'
                }`}>
              <span className='max-md:hidden'>Next</span>
              <Image src={'https://images.tractorgyan.com/uploads/120941/68be875ce2b84-gray-next-arrow.webp'} height={100} width={100} alt='next button icon' title='next button icon' className='-rotate-90 w-auto max-w-8 h-3 min-h-3' />

            </button>
          </div>

          <div className="col-span-8">

            <div className="mt-2 w-full">
              <MainHeadings text={'Latest reels'} />
            </div>


            <div className="grid grid-cols-2 gap-4 md:gap-5 sm:grid-cols-3 lg:grid-cols-4  xl:grid-cols-6">
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

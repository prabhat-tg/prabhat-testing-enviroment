import React from 'react';
import TittleAndCrumbs from '../../../components/shared/TittleAndCrumbs/TittleAndCrumbs';
import CategoryComponent from '../CategoryComponent';
import SearchBarWithFilterButton from '../SearchBarWithFilterButton';
import WebstoryCard from '../../../components/ui/cards/webstory/WebstoryCard';
import Link from 'next/link';
import Image from 'next/image';
import BlogsMobileCategory from '../../../components/blogs/mobileView/MobileViewCategory';
import { tgi_arrow_right_white } from '@/src/utils/assets/icons';

const WebstoryListing = ({
  data,
  parent,
  categorySlug,
  currentPage,
  title,
  isShowCategory,
  isMobile,
  dataCount,
  placeholder,
  translation,
  currentLang,
  categoriesData = [],
  categoriesError,
}) => {
  const page = currentPage || 1;

  return (
    <section className="lg:mt-[155px]">
      <div className="container relative">
        {parent ? (
          <TittleAndCrumbs
            title={translation?.breadcrubm?.TractorgyanAllWebStories}
            breadcrumbs={[
              {
                label: translation?.breadcrubm?.home,
                href: '/',
                title: translation?.breadcrubm?.home,
              },
              {
                label: translation?.breadcrubm?.TractorgyanAllWebStories,
                title: translation?.breadcrubm?.TractorgyanAllWebStories,
                isCurrent: true,
              },
              // {
              //   label: `${categorySlug}`,
              //   title: `${categorySlug}`,
              //   isCurrent: true,
              // },
            ]}
          />
        ) : (
          <TittleAndCrumbs
            title={translation?.breadcrubm?.TractorGyanWebStory}
            breadcrumbs={[
              {
                label: translation?.breadcrubm?.home,
                href: '/',
                title: translation?.breadcrubm?.home,
              },
              {
                label: translation?.breadcrubm?.TractorGyanWebStory,
                title: translation?.breadcrubm?.TractorGyanWebStory,
              },
            ]}
          />
        )}
        {isMobile ? (
          <div className="grid gap-4">
            {/* <CategoryComponent
              categorySlug={categorySlug}
              title={title}
              isShowCategory={isShowCategory}
            /> */}

            <div className="flex h-fit w-auto items-center justify-between gap-3">
              <SearchBarWithFilterButton
                isMobile={isMobile}
                parent={parent}
                placeholder={placeholder}
                translation={translation}
              />
              <BlogsMobileCategory
                categorySlug={categorySlug}
                title={title}
                isShowCategory={isShowCategory}
                isWebListing={`webListing`}
                translation={translation}
                data={categoriesData}
                categoriesError={categoriesError}
              />
            </div>

            <main className="h-full w-full flex-1 items-end">
              {data?.length > 0 ? (
                <>
                  <div className="grid grid-cols-3 gap-6">
                    {data?.map((item, index) => (
                      <div key={index} className="col-span-3 sm:col-span-2 lg:col-span-1">
                        <WebstoryCard data={item} translation={translation} />
                      </div>
                    ))}
                  </div>
                  {dataCount > 9 && (
                    <div className="mt-6 flex justify-center gap-4">
                      <Link
                        href={`${
                          currentLang === 'en' ? '' : '/hi'
                        }/web-story-in-india?page=${page - 1}`}
                        scroll={false}
                        className={`flex items-center gap-2 rounded-md bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-main md:text-base ${
                          page <= 1 ? 'pointer-events-none opacity-50' : ''
                        }`}
                      >
                        <Image
                          src={tgi_arrow_right_white}
                          alt="icon"
                          height={50}
                          width={50}
                          className="inline-block h-3 w-3 rotate-180 transform"
                        />
                        {translation?.buttons.prev}{' '}
                      </Link>
                      <Link
                        href={`${
                          currentLang === 'en' ? '' : '/hi'
                        }/web-story-in-india?page=${page + 1}`}
                        scroll={false}
                        className="flex items-center gap-2 rounded-md bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-main md:text-base"
                      >
                        {translation?.buttons.next}
                        <Image
                          src={tgi_arrow_right_white}
                          alt="icon"
                          height={50}
                          width={50}
                          className="inline-block h-3 w-3 rotate-0 transform"
                        />
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div>No data found</div>
              )}
            </main>
          </div>
        ) : (
          <div className="flex flex-col gap-4 md:flex-row lg:gap-6 xl:gap-6">
            <CategoryComponent
              categorySlug={categorySlug}
              title={title}
              isShowCategory={isShowCategory}
              translation={translation}
              categoriesError={categoriesError}
            />

            <main className="h-full w-full flex-1 items-end">
              <div className="mb-6 flex justify-end">
                <SearchBarWithFilterButton parent={parent} placeholder={placeholder} />
              </div>
              {data?.length > 0 ? (
                <>
                  <div className="grid grid-cols-3 gap-6">
                    {data?.map((item, index) => (
                      <div key={index} className="col-span-3 sm:col-span-2 lg:col-span-1">
                        <WebstoryCard data={item} translation={translation} />
                      </div>
                    ))}
                  </div>
                  {dataCount > 9 && (
                    <div className="mt-6 flex justify-center gap-4">
                      <Link
                        href={`${
                          currentLang === 'en' ? '' : '/hi'
                        }/web-story-in-india?page=${page - 1}`}
                        scroll={false}
                        className={`flex items-center gap-2 rounded-md bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-main md:text-base ${
                          page <= 1 ? 'pointer-events-none opacity-50' : ''
                        }`}
                      >
                        <Image
                          src={tgi_arrow_right_white}
                          alt="icon"
                          height={50}
                          width={50}
                          className="inline-block h-3 w-3 rotate-180 transform"
                        />
                        {translation?.buttons.prev}{' '}
                      </Link>

                      <Link
                        href={`${
                          currentLang === 'en' ? '' : '/hi'
                        }/web-story-in-india?page=${page + 1}`}
                        scroll={false}
                        className="flex items-center gap-2 rounded-md bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-green-main md:text-base"
                      >
                        {translation?.buttons.next}
                        <Image
                          src={tgi_arrow_right_white}
                          alt="icon"
                          height={50}
                          width={50}
                          className="inline-block h-3 w-3 rotate-0 transform"
                        />
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div>No data found</div>
              )}
            </main>
          </div>
        )}
      </div>
    </section>
  );
};

export default WebstoryListing;

import React from 'react';
import Link from 'next/link';
import TittleAndCrumbs from '../../../components/shared/TittleAndCrumbs/TittleAndCrumbs';
import SearchBarWithFilterButton from '../SearchBarWithFilterButton';
import BlogsCategory from '../CategoryComponent';
import Image from 'next/image';
import WebstoryCard from '../../../components/ui/cards/webstory/WebstoryCard';
import BlogsMobileCategory from '../../../components/blogs/mobileView/MobileViewCategory';
import { tgi_arrow_right_white } from '@/src/utils/assets/icons';

const WebStoryCategoryListing = ({
  data,
  parent,
  categorySlug,
  currentPage,
  title,
  isShowCategory,
  translation,
  dataCount,
  isMobile,
  prefLang,
  categoriesData,
}) => {
  const page = currentPage || 1;

  const formatCategorySlug = slug => {
    if (!slug) return '';
    return slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const formattedCategory = formatCategorySlug(categorySlug);

  return (
    <section className="lg:mt-[155px]">
      <div className="container relative">
        {parent ? (
          <TittleAndCrumbs
            title={`${formattedCategory}`}
            breadcrumbs={[
              { label: 'Home', href: '/', title: 'Home' },
              {
                label: 'Tractorgyan All Web Stories',
                href: '/web-story-in-india',
                title: 'Tractorgyan All Web Stories',
              },
              {
                label: `${formattedCategory}`,
                title: `${formattedCategory}`,
                isCurrent: true,
              },
            ]}
          />
        ) : (
          <TittleAndCrumbs
            title={`${formattedCategory}`}
            breadcrumbs={[
              {
                label: translation?.breadcrubm?.home,
                href: '/',
                title: translation?.breadcrubm?.home,
              },
              {
                label: translation?.breadcrubm?.TractorgyanAllWebStories,
                href: '/web-story-in-india',
                title: translation?.breadcrubm?.TractorgyanAllWebStories,
              },
            ]}
          />
        )}
        {isMobile ? (
          <div className="flex flex-col gap-4 md:flex-row lg:gap-6 xl:gap-6">
            <div className="flex h-fit w-auto items-center justify-between gap-3">
              <SearchBarWithFilterButton
                isMobile={isMobile}
                parent={parent}
                placeholder={translation?.placeholder?.SearchforWebstory}
                translation={translation}
                prefLang={prefLang}
              />
              <BlogsMobileCategory
                categorySlug={categorySlug}
                title={title}
                isShowCategory={isShowCategory}
                isWebListing={`webListing`}
                translation={translation}
                data={categoriesData}
              />
            </div>
            <main className="h-full w-full flex-1 items-end">
              {data?.length > 0 ? (
                <>
                  <div className="grid grid-cols-3 gap-8">
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
                          prefLang === 'en' ? '' : '/hi'
                        }/web-story/category/${categorySlug}/?page=${page - 1}`}
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
                          prefLang === 'en' ? '' : '/hi'
                        }/web-story/category/${categorySlug}/?page=${page + 1}`}
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
            <BlogsCategory
              categorySlug={categorySlug}
              title={title}
              translation={translation}
              isShowCategory={isShowCategory}
            />
            <main className="h-full w-full flex-1 items-end">
              <div className="mb-6 flex justify-end">
                <SearchBarWithFilterButton
                  placeholder={translation?.placeholder?.SearchforWebstory}
                  translation={translation}
                />
              </div>
              {data?.length > 0 ? (
                <>
                  <div className="grid grid-cols-3 gap-8">
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
                          prefLang === 'en' ? '' : '/hi'
                        }/web-story/category/${categorySlug}/?page=${page - 1}`}
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
                          prefLang === 'en' ? '' : '/hi'
                        }/web-story/category/${categorySlug}/?page=${page + 1}`}
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

export default WebStoryCategoryListing;

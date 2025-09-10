import React from 'react';
import Image from 'next/image';
import style from '@/src/styles/blogs/blogsDetails.module.css';
import SocialMediaLinks from '../shared/social-media/SocialMedia';
import { TableOfContent } from './TableOfContent';
import ReadMoreBlogs from './ReadMoreBlogs';
import { postData } from '@/src/services/apiMethods';
import BlogContentDynamic from './BlogContentDynamic';
import QuickLinks from './QuickLinks';
import SocialMediaLinksShare from '../shared/social-media/SocialMediaShare';

const BlogDetail_Description = async ({
  blogs,
  translation,
  isMobile,
  blogUrl,
  blogDescriptionError,
}) => {
  if (blogDescriptionError) {
    return (
      <div className="py-10 text-center">
        <p>
          {translation?.error_messages?.blogs_load_error ||
            'Could not load blogs description at the moment. Please try again later.'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className={`pb-0 ${style.blog_details_card_image_container}`}>
          <div className="mx-auto h-auto w-full gap-2 md:flex md:justify-between">
            <div className="hidden w-full flex-col items-start gap-2 md:flex md:max-w-[100px]">
              <span className="text-sm font-semibold">Share</span>
              <SocialMediaLinksShare direction={'flex-col items-start'} url={blogUrl} />
            </div>
            <Image
              src={`https://images.tractorgyan.com/uploads/${blogs?.featured_image}`}
              alt={`${blogs?.title} image`}
              title={`${blogs?.title}`}
              width={1200}
              height={630}
              priority
              className={style.blog_details_card_image}
            />
          </div>
          <div className="flex flex-col items-center justify-between pb-0 pt-2 lg:flex-row">
            <div className="hidden w-full md:inline">
              <div className="flex items-center justify-between pt-2 md:mb-2">
                <span className="text-[14px] font-semibold text-black md:text-base">
                  {translation.headings.byTeamTractorGyan}
                </span>
                {/* <span className="font-semibold text-black text-base">views and icon</span> */}
                <span className="flex items-center gap-6 text-sm font-semibold text-gray-dark">
                  {blogs.created_at}
                </span>
              </div>
            </div>

            {isMobile && (
              <div className="w-full md:hidden">
                <h1 className="mg:leading-[32px] inline-block w-fit text-[18px] font-bold leading-[25px] text-black sm:text-[16px] md:text-[26px] lg:mb-0">
                  {blogs.title}
                </h1>
              </div>
            )}

            {/* <div className="md:hidden w-full">
              <div className="flex justify-end items-end pt-2 md:mb-2">
                <span className="font-semibold text-[13px] text-gray-dark">
                  {blogs.created_at}
                </span>
              </div>
            </div> */}
            <div className="mt-2 flex w-full items-center justify-between gap-2 md:hidden">
              <div className="flex flex-col gap-0">
                <span className="text-[13px] font-semibold text-black md:text-base">
                  {translation.headings.byTeamTractorGyan}
                </span>
                <span className="text-[13px] font-semibold text-gray-dark">{blogs.created_at}</span>
              </div>

              <div className="flex flex-col items-end gap-0">
                <span className="text-[13px] font-semibold text-black">Share</span>
                <SocialMediaLinksShare />
              </div>
            </div>
          </div>
        </div>
        <div className={style.blog_details_table_of_content_head_container}>
          {blogs?.table_of_contents && (
            <TableOfContent data={blogs?.table_of_contents} translation={translation} />
          )}
        </div>

        <div className={style.BlogContentDynamic_head_container}>
          <BlogContentDynamic
            pageText={isMobile ? blogs.mobile_text : blogs?.page_text}
            // pageText={blogs.mobile_text}
            translation={translation}
            blogsCreatedAt={blogs?.created_at}
            isMobile={isMobile}
          />
        </div>
      </div>
    </>
  );
};

export default BlogDetail_Description;

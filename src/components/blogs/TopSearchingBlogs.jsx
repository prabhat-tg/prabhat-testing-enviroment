import React from 'react';
import Image from 'next/image';
import styles from './blogsCSS/top_search_blogs.module.css';
import BlogCardLinkWrapper from './BlogCardLinkWrapper';
import { fetchData } from '@/src/services/apiMethods';
import Link from 'next/link';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import TG_BlogListItem from '../ui/listItem/BlogListItem';

const API_URL = '/api/top_searching_blog';

async function getTopBlogs() {
  const res = await fetchData(API_URL);
  if (!res.success) throw new Error('Failed to fetch top blogs');
  const json = await res;
  return json.data;
}

const TopSearchingBlogs = async ({ prefLang, translation }) => {
  const blogs = await getTopBlogs();

  const langPrefix = prefLang === 'hi' ? '/hi' : '';

  const half = Math.ceil(blogs.length / 2);
  const leftBlogs = blogs.slice(0, half);
  const rightBlogs = blogs.slice(half);

  const renderBlogs = list =>
    list?.map((blog, index) => (
      // <div
      //   key={index}
      //   className="pt-4 border-b border-b-gray-light md:last:border-none pb-4 flex justify-between items-center w-full"
      // >
      //   <div className="flex justify-between items-center gap-6">
      //     <div className="relative min-w-[130px] max-w-[200px] h-[78px]">
      //       <Link
      //         href={`/tractor-industry-news-blogs/${blog?.id}/${blog?.url}`}
      //         title={blog?.title}
      //         aria-label={blog?.title}
      //         className="text-[#182C3D] text-[14px] md:text-[18px] font-bold hover:underline"
      //       >
      //         <Image
      //           src={`https://images.tractorgyan.com/uploads/${blog?.image}`}
      //           alt={`${blog?.title} image`}
      //           title={`${blog?.title}`}
      //           fill
      //           className="rounded-[16px] object-cover"
      //         />
      //       </Link>
      //     </div>
      //     <div>
      //       <Link
      //         href={
      //           blog?.id != "na"
      //             ? `/tractor-industry-news-blogs/${blog.id}/${blog.url}`
      //             : `/${blog.url}`
      //         }
      //         title={blog.title}
      //         aria-label={blog.title}
      //         className="text-[#182C3D] text-[14px] md:text-[18px] font-bold hover:underline"
      //       >
      //         {blog.title}
      //       </Link>
      //       <p className="text-[#595959] text-[13px] md:text-[16px] min-h-6">
      //         {blog.date !== "na" && blog.date}
      //       </p>
      //     </div>
      //   </div>
      // </div>
      <TG_BlogListItem key={index} blog={blog} />
    ));

  return (
    <section className="pb-0 md:pb-6">
      <div className="container">
        {/* <h2 className="font-bold w-fit md:max-w-[70%] text-black text-lg md:text-2xl border-b-4 border-secondary pb-1 mb-0 leading-6 inline-block">
          Top searching blogs about Tractors and Agriculture
        </h2> */}
        <MainHeadings marginBottom={'mb-0'} text={translation.blogs.topSearchingBlogs} />
        <div className="grid w-full items-center gap-0 md:flex md:justify-between md:gap-24">
          <div className="grid w-full pt-4">{renderBlogs(leftBlogs)}</div>
          <div className="grid w-full pt-4">{renderBlogs(rightBlogs)}</div>
        </div>
      </div>
    </section>
  );
};

export default TopSearchingBlogs;

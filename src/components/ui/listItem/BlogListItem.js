import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TG_BlogListItem = ({ blog }) => {
  if (!blog) return null;

  const blogUrl =
    blog?.id !== 'na' ? `/tractor-industry-news-blogs/${blog.id}/${blog.url}` : `/${blog.url}`;

  return (
    <div className="flex w-full items-center justify-between border-b border-b-gray-light pb-4 pt-4 md:last:border-none">
      <div className="flex items-center justify-between gap-6">
        {/* Blog Image */}
        <div className="relative aspect-video min-w-[130px] max-w-[200px] overflow-hidden">
          <Link
            href={blogUrl}
            title={blog?.title}
            aria-label={blog?.title}
            className="text-[14px] font-bold text-[#182C3D] hover:underline md:text-[18px]"
          >
            <Image
              src={`https://images.tractorgyan.com/uploads/${blog?.image}`}
              alt={`${blog?.title} image`}
              title={`${blog?.title}`}
              fill
              className="rounded-[16px] object-contain"
            />
          </Link>
        </div>

        {/* Blog Title and Date */}
        <div>
          <Link
            href={blogUrl}
            title={blog.title}
            aria-label={blog.title}
            className="text-[14px] font-bold text-[#182C3D] hover:underline md:text-[18px]"
          >
            {blog.title}
          </Link>
          {blog.date !== 'na' && (
            <p className="min-h-6 text-[13px] text-[#595959] md:text-[16px]">{blog.date}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TG_BlogListItem;

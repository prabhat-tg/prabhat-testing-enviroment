import React from "react";
import Image from "next/image";
import styles from "./blogsCSS/top_search_blogs.module.css";
import BlogCardLinkWrapper from "./BlogCardLinkWrapper";
import { postData } from "@/src/services/apiMethods";
import Link from "next/link";
import PopularBlogItem from "../ui/listItem/PopularBlogListItem";
const PopularPostBlogs = async ({ prefLang, translation }) => {
  const langPrefix = prefLang === "hi" ? "/hi" : "";

  const res = await postData("/api/popular_blog_list", {});

  const data = await res;
  const blogs = data?.data || [];

  return (
    <section>
      <div className="container">
        <div className="rounded-[14px] border border-gray-light px-6 pb-3 pt-6 md:pb-6">
          {/* Section Heading */}
          <h2 className="text-md border-b-3 mb-0 inline-block w-fit max-w-[70%] border-secondary pb-1 font-bold leading-6 text-black md:text-2xl">
            {translation?.blogs?.popularPosts || "Popular Posts"}
          </h2>

          {/* Blog Grid */}
          <div className="w-full pt-1">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-8">
              {blogs.map((item, index) => (
                <PopularBlogItem
                  key={index}
                  item={item}
                  index={index}
                  isLast={index === blogs.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PopularPostBlogs;

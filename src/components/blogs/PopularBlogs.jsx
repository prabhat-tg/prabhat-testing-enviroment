"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "@/src/styles/blogs/blogsListing.module.css";
import Link from "next/link";
import MainHeadings from "@/src/features/tyreComponents/commonComponents/MainHeadings";
import TG_PopularBlogCard from "../ui/cards/PopularBlogCard";

export default function PopularBlogs({
  blogsPopular,
  isMobile,
  blogs_details,
  root,
  prefLang,
  translation,
  popularBlogsError, // New prop
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const langPrefix = prefLang === "hi" ? "/hi" : "";

  useEffect(() => {
    if (isMobile && blogsPopular && blogsPopular.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) =>
          prev === blogsPopular?.length - 1 ? 0 : prev + 1,
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isMobile, blogsPopular]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? blogsPopular?.length - 1 : prev - 1,
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      prev === blogsPopular?.length - 1 ? 0 : prev + 1,
    );
  };

  if (popularBlogsError) {
    return (
      <div className="py-5 text-center">
        <p>
          {translation?.error_messages?.popular_blogs_unavailable ||
            "Popular blogs are currently unavailable."}
        </p>
      </div>
    );
  }

  if (!blogsPopular || blogsPopular.length === 0) {
    return null; // Or a "No popular blogs to show" message if preferred
  }

  return (
    <section>
      <div className={root === "popular_blogs_details" ? "container" : ""}>
        <div className="m-auto lg:ms-[0px] lg:w-auto lg:max-w-[330px]">
          <MainHeadings
            text={translation?.blogs?.popularBlogs || "Popular Blogs"}
          />
          {isMobile ? (
            <div className="relative w-full pt-0">
              <div className="overflow-hidden rounded-lg">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {blogsPopular &&
                    blogsPopular?.map((blog, index) => (
                      <div key={index} className="h-full w-full flex-shrink-0">
                        <TG_PopularBlogCard key={blog.id} blog={blog} />
                      </div>
                    ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-8">
                <button
                  onClick={handlePrevSlide}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white font-semibold text-black shadow-[0_2px_6px_#00000040] transition-all duration-200 hover:shadow-[0_4px_8px_#00000040]"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className="flex gap-2">
                  {blogsPopular?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-[10px] w-[10px] rounded-full transition-colors duration-200 ${
                        index === currentSlide
                          ? "bg-[#46AA48]"
                          : "border border-gray-light bg-white"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextSlide}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white font-semibold text-black shadow-[0_2px_6px_#00000040] transition-all duration-200 hover:shadow-[0_4px_8px_#00000040]"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 pt-0">
              {blogsPopular?.slice(0, 3)?.map((blog) => (
                <TG_PopularBlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

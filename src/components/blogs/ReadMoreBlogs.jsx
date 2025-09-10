"use client";
import React, { useState, useEffect } from "react";
import styles from "@/src/styles/blogs/blogsListing.module.css";
import Image from "next/image";
import BlogCardLinkWrapper from "./BlogCardLinkWrapper";
import BlogRedirectButtons from "../shared/blogs/BlogsRedirectButtons";
import BlogsTagRedirectButtons from "../shared/blogs/BlogsTagRedirectButtons";
import Link from "next/link";
import MainHeadings from "@/src/features/tyreComponents/commonComponents/MainHeadings";
import TG_ReadMoreBlogCard from "../ui/cards/ReadMoreBlogCard";
import TG_Tags from "../ui/tags/BlogTags";

const ReadMoreBlogs = ({
  tagData,
  ReadMoredata,
  isMobile,
  prefLang,
  translation,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const langPrefix = prefLang === "hi" ? "/hi" : "";

  function stripAndLimit(htmlString, wordLimit) {
    const plainText = htmlString
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ");
    const words = plainText.trim().split(/\s+/).slice(0, wordLimit);
    return words.join(" ");
  }

  useEffect(() => {
    if (isMobile && ReadMoredata && ReadMoredata.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) =>
          prev === ReadMoredata.length - 1 ? 0 : prev + 1,
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isMobile, ReadMoredata]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? ReadMoredata.length - 1 : prev - 1,
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) =>
      prev === ReadMoredata.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <section>
      <div className="container">
        {ReadMoredata?.length > 0 && (
          <>
            <MainHeadings text={translation?.blogs?.readMoreBlogs} />

            {isMobile ? (
              <div className="relative w-full">
                <div className="rounded-lg overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {ReadMoredata &&
                      ReadMoredata?.map((value, index) => (
                        <div
                          key={index}
                          className="relative flex-shrink-0 w-full"
                        >
                          <TG_ReadMoreBlogCard
                            blog={value}
                            btnText={translation.blogs.continueReading}
                            translation={{
                              blogs: {
                                continueReading:
                                  translation.blogs.continueReading,
                              },
                            }} // or "Read More"
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex justify-center items-center gap-8 mt-6">
                  <button
                    onClick={handlePrevSlide}
                    className="flex justify-center items-center bg-white shadow-[0_2px_6px_#00000040] hover:shadow-[0_4px_8px_#00000040] rounded-full w-7 h-7 font-semibold text-black transition-all duration-200"
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
                    {ReadMoredata?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-[10px] w-[10px] rounded-full transition-colors duration-200 ${index === currentSlide
                            ? "bg-[#46AA48]"
                            : "border border-[#AFAFAF] bg-white"
                          }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNextSlide}
                    className="flex justify-center items-center bg-white shadow-[0_2px_6px_#00000040] hover:shadow-[0_4px_8px_#00000040] rounded-full w-7 h-7 font-semibold text-black transition-all duration-200"
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
              <div className="md:flex md:justify-between gap-6 grid grid-cols-1 w-full h-full">
                {console.log("ReadMoredata", ReadMoredata)}
                {ReadMoredata &&
                  ReadMoredata?.map((value, index) => (
                    <div className="flex-1" key={index}>
                      <TG_ReadMoreBlogCard
                        blog={value}
                        btnText={translation.blogs.continueReading}
                        translation={{
                          blogs: {
                            continueReading: translation.blogs.continueReading,
                          },
                        }} // or "Read More"
                      />
                    </div>
                  ))}
              </div>
            )}
          </>
        )}

        <TG_Tags
          title={translation.blogs.tags}
          tags={tagData} // array of { title: string, url: string }
          prefLang={prefLang}
        />
      </div>
    </section>
  );
};
export default ReadMoreBlogs;

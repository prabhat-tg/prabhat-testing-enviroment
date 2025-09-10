import React from "react";
import Image from "next/image";
import TittleAndCrumbs from "@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs";
import BlogsCategory from "@/src/components/shared/blogs-category/BlogsCategory";
import PopularBlogs from "@/src/components/blogs/PopularBlogs";
import BlogDetail_Description from "./BlogDetails_Description";
import ReadMoreBlogs from "./ReadMoreBlogs";
import SubmitReviewBlogs from "./SubmitReviewBlogs";
import TopSearchingBlogs from "./TopSearchingBlogs";
import PopularPostBlogs from "./PopularPostBlogs";
import JoinOurCommunity from "./JoinOurCommunity";
import { postData } from "@/src/services/apiMethods";
import styles from "@/src/styles/blogs/blogsCategory.module.css";
import ClientComponentsWithoutAbout from "../tyre/ClientComponents";
import FooterComponents from "../tyre/FooterComponents";
import DesktopHeader from "../shared/header/DesktopHeader";
import { getSelectedLanguage } from "@/src/services/locale";
import { isMobileView } from "@/src/utils";
import { getDictionary } from "@/src/lib/dictonaries";
import SeoHead from "@/src/components/shared/header/SeoHead";
import { getSEOByPage } from "@/src/services/seo/get-page-seo";
import { getTyreHomeBanner } from "@/src/services/tyre/home-banner";
import WhatsAppTopButton from "@/src/features/tyreComponents/commonComponents/WhatsAppTopButton";
import JoinOurCommunityServer from "../shared/community/JoinOurCommunityServer";
import TractorGyanOfferings from "../shared/offerings/TractorGyanOfferings";
import AboutTractorGyanServer from "@/src/components/shared/about/AboutTractorGyanServer";
import FooterServer from "../shared/footer/FooterServer";
import MobileFooter from "../shared/footer/MobileFooter";
import { getAllBlogCategory } from "@/src/services/blogs/BlogCategory";

const BlogDetail = async ({ blogId, blogSlug }) => {
  const seoSlug = `${blogSlug}`;

  const seoData = await getSEOByPage(seoSlug);
  const prefLang = await getSelectedLanguage();
  const isMobile = await isMobileView();
  const translation = await getDictionary(prefLang);
  const res = await postData(`api/blog_detail`, { id: blogId ? blogId : null });
  const data = await res;
  const blogs = data?.data[0] || [];

  const staticMetadata = {
    title: `${seoSlug}`,
    description:
      "Latest Tractor News,Agriculture News, Article  in India | Know more about Tractor News, Reviews, New Tractor Launch, Agriculture News, Tractor Farming & Many More | Tractor Blog | Tractorgyan",
    openGraph: {
      title:
        "Latest Tractor News, Agriculture News, Article  in India | Tractor Blog | Tractorgyan",
      description:
        "Latest Tractor News,Agriculture News, Article  in India | Know more about Tractor News, Reviews, New Tractor Launch, Agriculture News, Tractor Farming & Many More | Tractor Blog | Tractorgyan",
      url: `https://tractorgyan.com/tractor-industry-news-blogs/${blogId}/${seoSlug}`,
      type: "website",
      images: [
        {
          url: "https://tractorgyan.com/images/tractor-tyres-og.jpg",
          width: 1200,
          height: 630,
          alt: "Tractor Gyan Blogs",
        },
      ],
    },
  };

  const isValidId = /^\d+$/.test(blogId);

  let ReadMoredata = [];
  let tagData = [];

  if (isValidId) {
    const response = await postData(`api/read_more_blogs`, { id: blogId });
    ReadMoredata = await response?.data;

    const tagResponse = await postData(`api/blog_tag`, { id: blogId });
    tagData = await tagResponse?.data;
  }

  const resPopular = await postData(`api/popular_blog_list`, {});

  const dataPopular = await resPopular;
  const blogsPopular = dataPopular?.data || [];

  const categoriesRes = await getAllBlogCategory();
  const categoriesData = categoriesRes?.data || [];

  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      <SeoHead seo={seoData} staticMetadata={staticMetadata} preloadUrls={[]} />
      <DesktopHeader
        isMobile={isMobile}
        translation={translation}
        currentLang={prefLang}
      />
      <div className={`container mx-auto mt-0 lg:mt-[10rem]`}>
        <div className={`m-auto w-[90%] lg:w-[100%]`}>
          <TittleAndCrumbs
            title={`${blogs?.title}`}
            breadcrumbs={[
              { label: "Home", href: "/", title: "Home" },
              {
                label: "All Blogs",
                href: "/tractor-industry-news-blogs",
                title: "All Blogs",
              },
              {
                label: capitalizeWords(`${blogs?.title}`),
                title: capitalizeWords(`${blogs?.title}`),
                isCurrent: true,
              },
            ]}
          />
          {isMobile ? (
            <div className="grid justify-center gap-12">
              <div className="w-full">
                <BlogDetail_Description blogs={blogs} blogId={blogId} />
                <PopularBlogs
                  isMobile={isMobile}
                  blogsPopular={blogsPopular}
                  translation={translation}
                  prefLang={prefLang}
                  root={""}
                />
              </div>
            </div>
          ) : (
            <div className="flex w-full justify-start gap-12">
              <div className="w-full">
                <BlogDetail_Description
                  blogs={blogs}
                  blogId={blogId}
                  prefLang={prefLang}
                  translation={translation}
                />
              </div>
              <div className="grid h-fit w-auto gap-4">
                <BlogsCategory
                  categories={categoriesData}
                  translation={translation}
                  prefLang={prefLang}
                />
                <PopularBlogs
                  root={""}
                  isMobile={isMobile}
                  blogsPopular={blogsPopular}
                  prefLang={prefLang}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="pe-4 ps-4">
        <div className="pb-8 pt-8">
          <ReadMoreBlogs
            tagData={tagData}
            ReadMoredata={ReadMoredata}
            blogId={blogId}
            prefLang={prefLang}
            isMobile={isMobile}
          />
          <SubmitReviewBlogs prefLang={prefLang} />
          <TopSearchingBlogs prefLang={prefLang} />
          <PopularPostBlogs prefLang={prefLang} />
        </div>
      </div>
      <div className="pt-8">
        <WhatsAppTopButton
          translation={translation}
          currentLang={prefLang}
          tyreBrands={[]}
          isMobile={isMobile}
        />
        <JoinOurCommunityServer
          translation={translation}
          currentLang={prefLang}
        />
        <TractorGyanOfferings translation={translation} />
        <AboutTractorGyanServer
          slug={"tractor-industry-news-blogs"}
          translation={translation}
        />
      </div>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};

export default BlogDetail;

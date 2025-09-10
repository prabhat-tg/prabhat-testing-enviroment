import React from "react";
import TittleAndCrumbs from "../shared/TittleAndCrumbs/TittleAndCrumbs";
import BlogsCategory from "../shared/blogs-category/BlogsCategory";
import BlogsListing from "./BlogsListing";
import PopularBlogs from "./PopularBlogs";
import BlogSearchInput from "./BlogSearchInput";
import { isMobileView } from "@/src/utils";
import BlogsMobileCategory from "./mobileView/MobileViewCategory";
import ClientComponentsWithoutAbout from "../tyre/ClientComponents";
import FooterComponents from "../tyre/FooterComponents";
import styles from "@/src/styles/blogs/blogsCategory.module.css";
import { getDictionary } from "@/src/lib/dictonaries";
import { getSelectedLanguage } from "@/src/services/locale";
import DesktopHeader from "../shared/header/DesktopHeader";
import { postData } from "@/src/services/apiMethods";
import SeoHead from "@/src/components/shared/header/SeoHead";
import { getTyreHomeBanner } from "@/src/services/tyre/home-banner";
import { getSEOByPage } from "@/src/services/seo/get-page-seo";
import WhatsAppTopButton from "@/src/features/tyreComponents/commonComponents/WhatsAppTopButton";
import JoinOurCommunityServer from "../shared/community/JoinOurCommunityServer";
import TractorGyanOfferings from "../shared/offerings/TractorGyanOfferings";
import AboutTractorGyanServer from "@/src/components/shared/about/AboutTractorGyanServer";
import FooterServer from "../shared/footer/FooterServer";
import MobileFooter from "../shared/footer/MobileFooter";
import { getAllBlogCategory } from "@/src/services/blogs/BlogCategory";

const BlogsMain = async ({ allBlogPosts, currentPage }) => {
  const seoSlug = "tractor-industry-news-blogs";

  const prefLang = await getSelectedLanguage();
  const seoData = await getSEOByPage(seoSlug);
  const isMobile = await isMobileView();
  const translation = await getDictionary(prefLang);

  const data = await getAllBlogCategory();
  const categoriesData = data?.data || [];

  const staticMetadata = {
    title:
      "Latest Tractor News, Agriculture News, Article  in India | Tractor Blog | Tractorgyan",
    description:
      "Latest Tractor News,Agriculture News, Article  in India | Know more about Tractor News, Reviews, New Tractor Launch, Agriculture News, Tractor Farming & Many More | Tractor Blog | Tractorgyan",
    openGraph: {
      title:
        "Latest Tractor News, Agriculture News, Article  in India | Tractor Blog | Tractorgyan",
      description:
        "Latest Tractor News,Agriculture News, Article  in India | Know more about Tractor News, Reviews, New Tractor Launch, Agriculture News, Tractor Farming & Many More | Tractor Blog | Tractorgyan",
      url: "https://tractorgyan.com/tractor-industry-news-blogs",
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

  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const resPopular = await postData(`api/popular_blog_list`, {});

  const dataPopular = await resPopular;
  const blogsPopular = dataPopular?.data || [];

  return (
    <>
      <SeoHead seo={seoData} staticMetadata={staticMetadata} preloadUrls={[]} />
      <DesktopHeader
        isMobile={isMobile}
        translation={translation}
        currentLang={prefLang}
      />
      <div
        className={`container mx-auto ${styles.main_container_mobile} ${isMobile ? "mt-[-10rem]" : ""
          }`}
      >
        <div className={isMobile ? `m-auto w-[90%]` : ``}>
          <TittleAndCrumbs
            title={`Tractor Gyan Blogs`}
            breadcrumbs={[
              { label: "Home", href: "/", title: "Home" },
              {
                label: "All Blogs",
                href: "/tractor-industry-news-blogs",
                title: "All Blogs",
              },
              {
                label: capitalizeWords("Category Blogs"),
                title: capitalizeWords("Category Blogs"),
                isCurrent: true,
              },
            ]}
          />
        </div>
        {isMobile ? (
          <div className="m-auto grid w-[90%] items-center gap-4">
            <div className="flex h-fit w-auto items-center justify-between gap-4">
              <BlogSearchInput translation={translation} isMobile={isMobile} />
              <BlogsMobileCategory data={categoriesData} />
            </div>
            <div className="w-full">
              <BlogsListing
                isMobile={isMobile}
                allBlogPosts={allBlogPosts}
                currentPage={currentPage}
              />
              <PopularBlogs
                root={""}
                isMobile={isMobile}
                blogsPopular={blogsPopular}
              />
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-start gap-12">
            <div className="grid h-fit w-auto gap-4">
              <BlogsCategory
                categories={categoriesData}
                translation={translation}
                prefLang={prefLang}
              />
              <PopularBlogs root={""} blogsPopular={blogsPopular} />
            </div>
            <div className="w-full">
              <div className="mb-5 flex w-full justify-end">
                <BlogSearchInput translation={translation} />
              </div>

              <BlogsListing
                allBlogPosts={allBlogPosts}
                currentPage={currentPage}
              />
            </div>
          </div>
        )}
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

export default BlogsMain;

import { getDictionary } from "@/src/lib/dictonaries";
import { isMobileView } from "@/src/utils";
import { getSelectedLanguage } from "@/src/services/locale";
import WebstoryListing from "@/src/features/social/webstory/WebstoryListing";
import { getBrandWebStory } from "@/src/services/social/BrandWebstory";
import { getAllSocialStoryCategory } from "@/src/services/social/WebstoryCategory";
import HandleError from "@/src/components/shared/HandleError/HandleError";
import SeoHead from "@/src/components/shared/header/SeoHead";
import apiUrl from "@/src/services/apiUrl";
import { getSEOByPage } from "@/src/services/seo/get-page-seo";
import { getApiUrl } from "@/src/utils/utils";
import WebStoryCategoryListing from "../category/WebStoryCategoryListing";

export default async function WebstoryCategoryData({
  searchParams,
  porpsCurrentLang,
  params,
}) {
  const prefLang = porpsCurrentLang ? "hi" : await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();
  const apiUrl = getApiUrl();
  const slug = params.slug;
  const page = parseInt(searchParams.page || "1", 10);

  const start = (page - 1) * 9;
  const end = page * 9;

  let webstoryPosts = [];

  let BrandStoryData = [];
  let dataCount = 0;
  let categoriesData = [];
  let storyError = false;
  let categoryError = false;
  let seoData = null;
  let hasNextPage = false;

  try {
    const payload = {
      webstory_category_tag: slug,
      start_limit: start,
      end_limit: end,
    };
    const response = await getBrandWebStory(payload);
    if (response && response.data) {
      webstoryPosts = response?.data || [];
      hasNextPage = webstoryPosts?.length === end - start;
      dataCount = response?.count;
    } else {
      storyError = true;
    }
  } catch (err) {
    console.error("❌ Failed to fetch brand stories:", err);
    storyError = true;
  }

  try {
    const catResponse = await getAllSocialStoryCategory();
    if (catResponse && catResponse.data) {
      categoriesData = catResponse.data;
    } else {
      categoryError = true;
    }
  } catch (err) {
    console.error("❌ Failed to fetch story categories:", err);
    categoryError = true;
  }

  try {
    const seoSlug = `${
      porpsCurrentLang ? "hi/" : ""
    }web-story/category/${slug}`;
    seoData = await getSEOByPage(seoSlug);
  } catch (err) {
    console.error("⚠️ Failed to fetch SEO:", err);
  }

  const currentSlug = `${
    porpsCurrentLang ? "hi/" : ""
  }web-story/category/${slug}`;
  const baseUrl = `${apiUrl}${
    porpsCurrentLang ? "/hi" : ""
  }/web-story/category/${slug}`;

  return (
    <>
      <SeoHead
        seo={seoData}
        staticMetadata={{}}
        preloadUrls={[]}
        currentSlug={currentSlug}
        fullUrl={`${baseUrl}?page=${page}`}
        paginationLinks={{
          canonical: baseUrl,
          prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
          next: hasNextPage ? `${baseUrl}?page=${page + 1}` : null,
        }}
      />

      {storyError && categoryError ? (
        <HandleError
          isNoData={BrandStoryData.length === 0}
          title={translation?.error_messages?.UnablefetchData}
          description={translation?.error_messages?.tryAgainLater}
        />
      ) : (
        <WebStoryCategoryListing
          categorySlug={slug}
          data={webstoryPosts}
          currentPage={page}
          parent={"webstory_slug_category"}
          title={`Web-Stories`}
          isShowCategory={true}
          translation={translation}
          dataCount={dataCount}
          isMobile={isMobile}
          categoriesData={categoriesData}
          categoriesError={categoryError}
        />
      )}
    </>
  );
}

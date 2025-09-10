import React from 'react';
import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import { getSelectedLanguage } from '@/src/services/locale';
import { isMobileView } from '@/src/utils';
import { getDictionary } from '@/src/lib/dictonaries';
import SeoHead from '@/src/components/shared/header/SeoHead';
import WhatsAppTopButton from '@/src/features/tyreComponents/commonComponents/WhatsAppTopButton';
import DesktopHeader from '@/src/components/shared/header/DesktopHeader';
import ReadMoreBlogs from '@/src/components/blogs/ReadMoreBlogs';
import SubmitReviewBlogs from '@/src/components/blogs/SubmitReviewBlogs';
import TopSearchingBlogs from '@/src/components/blogs/TopSearchingBlogs';
import PopularPostBlogs from '@/src/components/blogs/PopularPostBlogs';
import TractorGyanOfferings from '@/src/components/shared/offerings/TractorGyanOfferings';
import FooterServer from '@/src/components/shared/footer/FooterServer';
import MobileFooter from '@/src/components/shared/footer/MobileFooter';
import JoinOurCommunityServer from '@/src/components/shared/community/JoinOurCommunityServer';
import ScrollToTopNavigate from '@/src/components/shared/ScrollToTop/ScrollToTopOnNavigation';
import GoogleAdVertical from '@/src/features/social/GoogleAdVertical/GoogleAdVertical';
import { getApiUrl } from '@/src/utils/utils';
import { getBlogFAQs } from '@/src/services/blogs/blog-faq';
import { getBlogDetails } from '@/src/services/blogs/blogDetail';
import { getReadMoreBlogs } from '@/src/services/blogs/readMoreBlogs';
import { getBlogTag } from '@/src/services/blogs/blogTag';
import { popularBlogList } from '@/src/services/blogs/popularBlogList';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';
import { getAllBlogCategory } from '@/src/services/blogs/BlogCategory';
import TyreFAQs from '@/src/features/tyre/tyreFAQs/TyreFAQs';
import BlogDetail_Description from './BlogDetails_Description';
import BlogsCategory from '../shared/blogs-category/BlogsCategory';
import PopularBlogs from '@/src/components/blogs/PopularBlogs';

const BlogDetailsPage = async ({ params, prefLangs, searchParams }) => {
  const { id, slug } = await params;
  const apiUrl = getApiUrl();
  const blogUrl = `${apiUrl}/tractor-industry-news-blogs/${id}/${slug}`;
  let isEnquiry_whatsapp = false;
  let tractorBrand;
  let tractorModel;

  const searchParam = await searchParams;

  if (searchParam?.enquiry_whatsapp == 'true') {
    isEnquiry_whatsapp = true;
    tractorBrand = searchParam?.tractor_brand?.slice(1, searchParam?.tractor_brand.length - 1);
    tractorModel = searchParam?.tractor_model?.slice(1, searchParam?.tractor_model.length - 1);
  }

  const prefLang = prefLangs ? 'hi' : await getSelectedLanguage();
  const isMobile = await isMobileView();
  const translation = await getDictionary(prefLang);

  const isValidId = /^\d+$/.test(id);
  const blogDetailsPayload = { id };

  let blogs = [];
  let ReadMoredata = [];
  let tagData = [];
  let seoDescription = null;
  let blogsPopular = [];
  let faqs = [];
  let categories = [];

  let blogDescriptionError = false;
  let readMoreError = false;
  let tagDataError = false;
  let seoError = false;
  let popularBlogsError = false;
  let categoriesError = false;

  const [blogDetailRes, readMoreRes, tagRes, popularRes, faqsRes, seoRes, categoryRes] =
    await Promise.allSettled([
      getBlogDetails(blogDetailsPayload),
      isValidId ? getReadMoreBlogs({ id }) : Promise.resolve({ data: [] }),
      isValidId ? getBlogTag({ id }) : Promise.resolve({ data: [] }),
      popularBlogList(),
      getBlogFAQs({
        slug: `tractor-industry-news-blogs/${id}/${slug}`,
        langPrefix: prefLang,
      }),
      slug ? getDetailPageHeaderSEO({ id, page_type: 'blog_detail' }) : Promise.resolve({}),
      getAllBlogCategory(),
    ]);

  if (blogDetailRes.status === 'fulfilled') {
    blogs = blogDetailRes.value?.data?.[0] || [];
  } else {
    blogDescriptionError = true;
    console.error('Error fetching blog detail:', blogDetailRes.reason);
  }

  if (popularRes.status === 'fulfilled') {
    blogsPopular = popularRes.value?.data || [];
  } else {
    popularBlogsError = true;
  }

  if (faqsRes.status === 'fulfilled') {
    faqs = faqsRes.value || [];
  }

  if (categoryRes.status === 'fulfilled') {
    categories = categoryRes.value?.data || [];
  } else {
    categoriesError = true;
  }

  if (readMoreRes.status === 'fulfilled') {
    ReadMoredata = readMoreRes.value?.data || [];
  } else {
    readMoreError = true;
    console.error('Error fetching read more blogs:', readMoreRes.reason);
  }

  if (tagRes.status === 'fulfilled') {
    tagData = tagRes.value?.data || [];
  } else {
    tagDataError = true;
    console.error('Error fetching blog tags:', tagRes.reason);
  }

  if (seoRes.status === 'fulfilled') {
    seoDescription = seoRes.value?.data || null;
  } else {
    seoError = true;
    console.error('Error fetching SEO data:', seoRes.reason);
  }

  // const capitalizeWords = (str) =>
  //   str
  //     ?.toLowerCase()
  //     .split(" ")
  //     .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  //     .join(" ") || "";

  return (
    <>
      <DesktopHeader
        showLanguageSelector={false}
        isMobile={isMobile}
        translation={translation}
        currentLang={prefLang}
      />
      <ScrollToTopNavigate />
      <SeoHead seo={{}} staticMetadata={{}} preloadUrls={[]} seoHTMLDescription={seoDescription} />
      <main className="lg:mt-[159px]">
        <div className={`container`}>
          <div className={`max-md:pt-3 lg:w-[100%] lg:pt-6`}>
            <TittleAndCrumbs
              title={isMobile ? `` : `${blogs?.title}`}
              breadcrumbs={[
                { label: 'Home', href: '/', title: 'Home' },
                {
                  label: 'All Blogs',
                  href:
                    prefLang === 'hi'
                      ? '/hi/tractor-industry-news-blogs'
                      : '/tractor-industry-news-blogs',
                  title: 'All Blogs',
                },
                {
                  label: blogs?.title,
                  title: blogs?.title,
                  isCurrent: true,
                },
              ]}
              isMobile={isMobile}
              hideTitle={isMobile}
            />
            {isMobile ? (
              <div className="w-full">
                <BlogDetail_Description
                  blogs={blogs}
                  translation={translation}
                  isMobile={isMobile}
                  blogUrl={blogUrl}
                  blogDescriptionError={blogDescriptionError}
                />
              </div>
            ) : (
              <div className="flex w-full justify-start gap-12">
                <div className="w-full">
                  <BlogDetail_Description
                    blogs={blogs}
                    translation={translation}
                    isMobile={isMobile}
                    blogUrl={blogUrl}
                    blogDescriptionError={blogDescriptionError}
                  />
                </div>
                <div className="grid h-fit w-auto gap-4">
                  <BlogsCategory
                    categorySlug={slug}
                    categories={categories}
                    prefLang={prefLang}
                    translation={translation}
                    categoriesError={categoriesError}
                  />
                  <PopularBlogs
                    isMobile={isMobile}
                    blogsPopular={blogsPopular}
                    root={'main_container'}
                    translation={translation}
                    prefLang={prefLang}
                    popularBlogsError={popularBlogsError}
                  />
                  <GoogleAdVertical />
                </div>
              </div>
            )}
          </div>
        </div>
        <ReadMoreBlogs
          tagData={tagData}
          ReadMoredata={ReadMoredata}
          blogId={id}
          isMobile={isMobile}
          prefLang={prefLang}
          translation={translation}
        />
        <SubmitReviewBlogs
          title={blogs.title}
          isMobile={isMobile}
          prefLang={prefLang}
          translation={translation}
        />
        <TopSearchingBlogs prefLang={prefLang} translation={translation} />
        {isEnquiry_whatsapp && (
          <WhatsAppTopButton
            translation={translation}
            currentLang={prefLang}
            tyreBrands={[]}
            openEnquiryForm={true}
            preFilledTractorBrand={tractorBrand}
            preFilledTractorModel={tractorModel}
            preFilledTractorModelId={null}
            isMobile={isMobile}
          />
        )}
        <WhatsAppTopButton translation={translation} currentLang={prefLang} tyreBrands={[]} />
        {isMobile && (
          <PopularBlogs
            isMobile={isMobile}
            blogsPopular={blogsPopular}
            root={'main_container'}
            translation={translation}
            prefLang={prefLang}
            popularBlogsError={popularBlogsError}

          />
        )}
        {faqs.length > 0 && (
          <TyreFAQs
            faqs={faqs}
            translation={translation}
            isDynamicTitle={true}
            brandName={blogs?.title}
            headingKey={'faqs.dynamicFaq'}
            prefLang={prefLang}
          />
        )}
        <JoinOurCommunityServer translation={translation} currentLang={prefLang} />
        {!isMobile && <PopularPostBlogs prefLang={prefLang} translation={translation} />}
        <TractorGyanOfferings translation={translation} />
      </main>
      <FooterServer translation={translation} />
      {isMobile && <MobileFooter translation={translation} />}
    </>
  );
};

export default BlogDetailsPage;

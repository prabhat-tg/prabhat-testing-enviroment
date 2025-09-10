"use client";
import style from "@/src/styles/blogs/blogsDetails.module.css";
import QuickLinks from "./QuickLinks";

const BlogContentDynamic = ({
  pageText,
  translation,
  blogsCreatedAt,
  isMobile,
}) => {
  const placeholder = "<p>tg_quick_links</p>";
  const [beforeLinks, afterLinks] = pageText?.includes(placeholder)
    ? pageText?.split(placeholder)
    : [pageText, null];

  let imageStyle = "";
  if (blogsCreatedAt && !isMobile) {
    const blogDate = new Date(blogsCreatedAt);
    const targetDate = new Date("2025-06-18");
    if (blogDate < targetDate) {
      imageStyle = `
        .${style.blog_dangerous_wrapper} img {
          max-width: 50% !important;
        }
      `;
    }
  }

  return (
    <>
      {imageStyle && <style>{imageStyle}</style>}
      <div
        className={`w-full ${style.blog_dangerous_wrapper}`}
        dangerouslySetInnerHTML={{ __html: beforeLinks }}
      />

      {afterLinks && (
        <div className="mt-6 h-fit">
          <QuickLinks translation={translation} />
        </div>
      )}

      {afterLinks && (
        <div
          className={`w-full ${style.blog_dangerous_wrapper}`}
          dangerouslySetInnerHTML={{ __html: afterLinks }}
        />
      )}
    </>
  );
};

export default BlogContentDynamic;

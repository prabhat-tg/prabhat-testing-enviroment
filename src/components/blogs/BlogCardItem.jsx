import React from "react";
// import { stripHtmlTagsAndLimit } from "@/src/utils/stringUtils"; // optional if you extract utility
import TG_BlogCardUnified from "../ui/cards/BlogsCard";

// Utility function (copied from original, can be reused)
function stripAndLimit(htmlString, wordLimit) {
  if (!htmlString) return "";
  const plainText = htmlString.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ");
  const words = plainText.trim().split(/\s+/).slice(0, wordLimit);
  return words.join(" ");
}

const BlogCardItem = ({ post, translation }) => {
  if (!post?.id || !post?.url) return null;

  return (
    <TG_BlogCardUnified
      title={post.title}
      excerpt={stripAndLimit(post.page_text, 42)}
      imageSrc={`https://images.tractorgyan.com/uploads/${post.featured_image}`}
      blogUrl={`/tractor-industry-news-blogs/${post.id}/${post.url}`}
      date={post.created_at}
      author={translation?.headings?.byTeamTractorGyan}
      readMoreText={translation?.buttons?.readMore}
      showSocial={true}
    />
  );
};

export default React.memo(BlogCardItem);

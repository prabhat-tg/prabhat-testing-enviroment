"use client";

import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { LoadMoreButton } from "./LoadMoreButton";

export default function BlogListClient({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [limit, setLimit] = useState(initialPosts.length);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog_list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_limit: 0,
          end_limit: limit + 6,
        }),
      });

      const data = await res.json();
      if (data?.data) {
        setPosts(data.data);
        setLimit(limit + 6);
        setHasMore(data.data.length >= limit + 6);
      }
    } catch (err) {
      console.error("Failed to load more blogs", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {posts.slice(1).map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <LoadMoreButton onClick={fetchMoreBlogs} loading={loading} />
        </div>
      )}
    </div>
  );
}

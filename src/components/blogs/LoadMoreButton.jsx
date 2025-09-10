"use client";
import { useState } from "react";
import { postData } from "@/src/services/apiMethods";

export default function LoadMoreBlogs({ categorySlug }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState({ start: 0, end: 7 });

  const fetchBlogs = async (start, end) => {
    setLoading(true);
    const url = categorySlug
      ? `/api/blog_list?blog_slug=${categorySlug}`
      : "/api/blog_list";

    const payload = {
      start_limit: 0,
      end_limit: end,
    };

    try {
      const response = await postData(url, payload);
      const newBlogs = response?.data || [];
      setBlogs((prev) => [...prev, ...newBlogs]);
    } catch (error) {
      console.error("Failed to load blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const newEnd = range.end + 6;
    fetchBlogs(range.end, newEnd); // fetch from current end to new end
    setRange({ start: range.start, end: newEnd });
  };

  return (
    <div>
      <button
        onClick={handleLoadMore}
        disabled={loading}
        className="bg-gray-200 hover:bg-gray-300 rounded-md px-6 py-2 transition"
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}

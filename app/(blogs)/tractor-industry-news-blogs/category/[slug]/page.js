import BlogsCategoriesPage from "@/src/components/blogs/BlogCategoriesMain";
import React from "react";
export const dynamic = "force-dynamic";

export default async function Page({ params, searchParams }) {
  return (
    <>
      <BlogsCategoriesPage params={params} searchParams={searchParams} />
    </>
  );
}

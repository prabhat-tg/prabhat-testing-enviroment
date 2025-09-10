import React from "react";
import TractorBlogTagPage from "@/src/components/blogs/TractorBlogTag";

export const dynamic = "force-dynamic";

export default async function Page({ params, searchParams }) {
  return (
    <>
      <TractorBlogTagPage params={params} searchParams={searchParams} />
    </>
  );
}

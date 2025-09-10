import React from "react";
import BlogDetailsPage from "@/src/components/blogs/BlogDetailsPage";


const Page = async ({ params, searchParams }) => {
  return (
    <>
      <BlogDetailsPage params={params} searchParams={searchParams} />
    </>
  );
};

export default Page;

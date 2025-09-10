import React from "react";
import Link from "next/link";

const TG_Tags = ({ title = "Tags", tags = [], prefLang = "" }) => {
  if (!tags?.length) return null;

  return (
    <section className="pb-2 pt-5 md:pb-8 md:pt-8">
      <div className="grid items-center justify-center text-center">
        <h2 className="text-base font-bold text-[#182C3D] md:text-lg">
          {title}
        </h2>

        <div className="mt-4 md:mt-6">
          <div className="flex flex-wrap justify-center gap-2 sm:grid sm:grid-cols-2 sm:gap-4 md:flex md:flex-wrap md:gap-6">
            {tags.map((tag, index) => (
              <div key={index}>
                <Link
                  href={`${prefLang === "hi" ? "/hi" : ""}${tag.url}`}
                  className="hover:bg-gray-300 rounded-[20px] border border-[#46AA48] px-4 py-1 text-[11px] font-semibold text-[#595959] transition-all duration-300 hover:border-secondary hover:bg-green-lighter md:px-6 md:py-2 md:text-[13px]"
                >
                  {tag.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TG_Tags;
//  if you want to use this component in a blog page, you can import it and pass the necessary props like this:

//  <TG_Tags
//   title={translation.blogs.tags}
//   tags={tagData} // array of { title: string, url: string }
//   prefLang={prefLang}
// />

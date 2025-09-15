import MainHeadings from "@/src/features/tyreComponents/commonComponents/MainHeadings";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const GroupCard = ({ imgUrl, name, url }) => {
  return (
    <Link
      href={url}
      title={name + " image"}
      className="col-span-1"
    >
      <div className="flex flex-col h-[120px] md:mb-4 items-center justify-center p-4 rounded-xl border-[2px] border-transparent bg-white shadow-[1px_5px_16px_0px_rgba(88,98,89,0.21)] hover:border-secondary hover:bg-green-lighter">
        {/* TODO:: Upload New Images */}
        <Image
          src={imgUrl}
          height={300}
          width={300}
          alt={name + "image"}
          title={name + " image"}
          className="h-[80px] w-auto"
        />
        <p className="mb-2 text-center text-xs font-semibold md:text-base">
          {name}
        </p>
      </div>
    </Link>
  );
};

const LeadingTractorGroup = ({
  langPrefix,
  leadingTractorGroups,
  isMobile,
  title
}) => {
  return (
    <section className="bg-section-gray">
      <div className="container">
        <MainHeadings text={title} />
        {/* {heading ? (
          <MainHeadings text={heading} />
        ) : (
          <MainHeadings text={translation.headings.tractorsbyBrands} />
        )} */}

        <div className="mb-8 grid grid-cols-4 gap-4">
          {leadingTractorGroups?.map((item, index) => (
            <GroupCard
              imgUrl={item.image}
              name={langPrefix == "hi" ? item.brand_name_hi : item.brand_name}
              key={index}
              url={langPrefix === "hi" ? '/hi' + item.url : item.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadingTractorGroup;

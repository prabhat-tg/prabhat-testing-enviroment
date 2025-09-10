import React from "react";
import VideoCard from "./VideoCard";
import CategoryComponent from "../CategoryComponent";
import SearchBarWithFilterButton from "../SearchBarWithFilterButton";
import TittleAndCrumbs from "../../../components/shared/TittleAndCrumbs/TittleAndCrumbs";
import Image from "next/image";
import YoutubeSubscribeButton from "../../../components/shared/youtubeSubscribeButton/YoutubeSubscribeButton";

const VideoListing = ({
  BrandVideoData,
  isMobile,
  currentPage,
  isShowCategory,
  parent,
  placeholder,
  translation,
  prefLang,
}) => {
  return (
    <section className="max-md:pt-3 lg:mt-[155px]">
      <div className="container relative">
        <TittleAndCrumbs
          title={`${translation?.breadcrubm?.TractorandImplementVideos}`}
          breadcrumbs={[
            {
              label: `${translation?.breadcrubm?.home}`,
              href: "/",
              title: `${translation?.breadcrubm?.home}`,
            },
            {
              label: translation?.breadcrubm?.TractorandImplementVideos,
              title: translation?.breadcrubm?.TractorandImplementVideos,
              isCurrent: true,
            },
          ]}
        />
        {isMobile ? (
          <div className="grid gap-4 lg:gap-2 xl:gap-6">
            <div className="grid justify-items-start gap-4">
              {/* <CategoryComponent
                title={"Videos-Category"}
                isShowCategory={isShowCategory}
              /> */}
              <SearchBarWithFilterButton
                parent={parent}
                placeholder={placeholder}
              />
              <YoutubeSubscribeButton translation={translation} />
            </div>
            <main className="h-full w-full">
              <div className="w-full">
                <VideoCard
                  data={BrandVideoData}
                  isMobile={isMobile}
                  currentPage={currentPage}
                  translation={translation}
                  prefLang={prefLang}
                />
              </div>
            </main>
          </div>
        ) : (
          <div className="flex flex-col gap-4 md:flex-row lg:gap-2 xl:gap-6">
            {/* Category filter */}
            <CategoryComponent
              title={"Videos-Category"}
              isShowCategory={isShowCategory}
            />
            {/* Story Listing */}
            <main className="h-full w-full flex-1">
              <div className="flex items-center justify-between">
                {/* <SearchBarWithFilterButton parent={parent} /> */}
                <SearchBarWithFilterButton
                  parent={parent}
                  placeholder={placeholder}
                />
                <YoutubeSubscribeButton translation={translation} />
              </div>
              <div className="w-full pt-4">
                <VideoCard
                  data={BrandVideoData}
                  isMobile={isMobile}
                  currentPage={currentPage}
                  translation={translation}
                  prefLang={prefLang}
                />
              </div>
            </main>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoListing;

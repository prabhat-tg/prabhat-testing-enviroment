"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import TG_VideoCardUnified from "@/src/components/ui/cards/videosCards/VideosCard";
import TG_Button from "@/src/components/ui/buttons/MainButtons";
import { tgi_arrow_right_white } from "@/src/utils/assets/icons";

const VideoCard = ({ data, isMobile, currentPage, translation, prefLang }) => {
  const route = useRouter();

  const page = currentPage || 1;
  const [isLoading, setIsLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, searchParams]);

  const handlePagination = (newPage, direction) => {
    setIsLoading(true);
    setLoadingButton(direction);

    let url = "";

    url =
      prefLang === "en"
        ? `/tractor-videos?page=${newPage}`
        : `/hi/tractor-videos?page=${newPage}`;

    route.push(url, { scroll: false });

    window.scrollTo({ top: 0, behavior: "smooth" });

    setTimeout(() => {
      setIsLoading(false);
      setLoadingButton(null);
    }, 3000);
  };

  return (
    <>
      <div className="grid w-full gap-4 pb-1">
        {data?.slice(0, 1).map((value, index) => (
          <TG_VideoCardUnified
            key={index}
            variant="featured"
            title={value?.title}
            image={value?.image}
            videoUrl={value?.full_url}
            views={value?.total_view}
            createdAt={value?.created_at}
            description={value?.description}
            isMobile={isMobile}
            showSocial
          />
        ))}
      </div>
      <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        {data?.slice(1, data?.length).map((value, index) => (
          <TG_VideoCardUnified
            key={index}
            title={value?.title}
            image={value?.image}
            videoUrl={value?.full_url}
            views={value?.total_view}
            createdAt={value?.created_at}
            description={value?.description}
            isMobile={isMobile}
            showSocial
          />
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <TG_Button
          onClick={() => handlePagination(page - 1, "prev")}
          disabled={page <= 1 || isLoading}
          icon={tgi_arrow_right_white}
          iconPosition="left"
          iconClass="rotate-180"
          className="px-6 py-2 text-[14px] md:text-[16px]"
        >
          {isLoading && loadingButton === "prev"
            ? translation?.buttons.Loading
            : translation?.buttons.prev}
        </TG_Button>

        <TG_Button
          onClick={() => handlePagination(page + 1, "next")}
          disabled={isLoading}
          icon={tgi_arrow_right_white}
          iconPosition="right"
          className="px-6 py-2 text-[14px] md:text-[16px]"
        >
          {isLoading && loadingButton === "next"
            ? translation?.buttons.Loading
            : translation?.buttons.next}
        </TG_Button>
      </div>
    </>
  );
};

export default VideoCard;

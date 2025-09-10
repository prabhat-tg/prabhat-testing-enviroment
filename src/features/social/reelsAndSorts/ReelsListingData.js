import HandleError from "@/src/components/shared/HandleError/HandleError";
import ReelsListing from "./ReelsListing";

export default function ReelListingData({
  ...props
}) {
 
  const { searchParams, translation, BrandReelData, isMobile, page, dataCount, reelError, prefLang } = props;
  return (
    <>
     

      {reelError ? (
        <HandleError
          title={translation?.error_messages?.UnablefetchData}
          isNoData={BrandReelData.length === 0}
          description={translation?.error_messages?.tryAgainLater}
        />
      ) : (
        <ReelsListing
          BrandReelData={BrandReelData}
          searchParams={searchParams}
          isMobile={isMobile}
          currentPage={page}
          translation={translation}
          prefLang={prefLang}
          parent={"tractor_reels"}
          dataCount={dataCount}
          placeholder={translation.buttons.SearchforTractorReelsShorts}
          categoriesError={reelError}
        />
      )}
    </>
  );
}

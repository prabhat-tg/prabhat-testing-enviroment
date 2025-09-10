
import HandleError from "@/src/components/shared/HandleError/HandleError";
import VideoListing from "./VideoListing";

export default function VideoListingData({
  ...props
}) {

  const { brandVideoData, isMobile, page, translation, prefLang,storyError } = props;
  return (
    <>

      {storyError ? (
        <HandleError
          isNoData={brandVideoData.length === 0}
          title={translation?.error_messages?.UnablefetchData}
          description={translation?.error_messages?.tryAgainLater}
        />
      ) : (
        <VideoListing
          BrandVideoData={brandVideoData}
          isMobile={isMobile}
          currentPage={page}
          translation={translation}
          prefLang={prefLang}
          parent={"tractor_videos"}
          placeholder={translation.placeholder.SearchforTractorVideos}
        />
      )}
    </>
  );
}

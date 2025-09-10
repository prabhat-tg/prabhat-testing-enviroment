import { getDictionary } from "@/src/lib/dictonaries";
import { isMobileView } from "@/src/utils";
import { getSelectedLanguage } from "@/src/services/locale";
import HandleError from "@/src/components/shared/HandleError/HandleError";
import { postVideoReelDetails } from "@/src/services/social/VideoReelDetail";
import { getSocialMediaSubsCount } from "@/src/services/social/SubscriberCounts";
import VideosDetailSection from "./VideosDetailSection";

export default async function VideosDetailsSectionData({ params }) {
  const prefLang = await getSelectedLanguage();
  const translation = await getDictionary(prefLang);
  const isMobile = await isMobileView();

  const param = params?.slug;

  let reelDetailError = false;
  let seoError = false;
  let youtubeError = false;

  let videoDetailData = null;
  let youtubeCount = null;

  try {
    const payload = {
      video_url: param,
      video_type: "videos",
    };

    const videoDetails = await postVideoReelDetails(payload);

    if (videoDetails && videoDetails) {
      videoDetailData = videoDetails;
    } else {
      reelDetailError = true;
    }
  } catch (err) {
    console.error("❌ Failed to fetch reel detail:", err);
    reelDetailError = true;
  }

  try {
    const response = await getSocialMediaSubsCount();
    if (response) {
      youtubeCount = response.youtube_count;
    } else {
      youtubeError = true;
    }
  } catch (err) {
    console.error("⚠️ YouTube count fetch failed:", err);
    youtubeError = true;
  }

  if (reelDetailError) {
    return (
      <HandleError
        title={
          translation?.error_messages?.UnablefetchData || "Something went wrong"
        }
        isNoData={true}
        description={
          translation?.error_messages?.tryAgainLater ||
          "Please try again later."
        }
      />
    );
  }

  return (
    <>
      <VideosDetailSection
        translation={translation}
        param={param}
        videoDetailData={videoDetailData}
        isMobile={isMobile}
      />
    </>
  );
}

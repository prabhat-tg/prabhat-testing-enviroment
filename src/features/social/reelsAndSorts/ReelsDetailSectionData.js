import { getDictionary } from '@/src/lib/dictonaries';
import { isMobileView } from '@/src/utils';
import { getSelectedLanguage } from '@/src/services/locale';
import HandleError from '@/src/components/shared/HandleError/HandleError';
import SeoHead from '@/src/components/shared/header/SeoHead';
import { postVideoReelDetails } from '@/src/services/social/VideoReelDetail';
import { getDetailPageHeaderSEO } from '@/src/services/detailPageHeaderSeo';
import ReelsDetailSection from './ReelsDetailSection';
import { getSocialMediaSubsCount } from '@/src/services/social/SubscriberCounts';

export default async function ReelsDetailSectionData({ ...props }) {
  const { param, reelDetailData, isMobile, youtubeCount, reelDetailError, youtubeError, seoError } =
    props;
  // 4. Return JSX with SEOHead always
  return (
    <>
      {reelDetailError ? (
        <HandleError
          title={translation?.error_messages?.UnablefetchData || 'Something went wrong'}
          isNoData={true}
          description={translation?.error_messages?.tryAgainLater || 'Please try again later.'}
        />
      ) : (
        <ReelsDetailSection
          param={param}
          reelDetailData={reelDetailData}
          isMobile={isMobile}
          youtubeCount={youtubeCount}
          reelDetailError={reelDetailError}
          youtubeError={youtubeError}
          seoError={seoError}
        />
      )}
    </>
  );
}

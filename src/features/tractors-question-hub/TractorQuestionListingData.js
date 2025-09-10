import TittleAndCrumbs from '@/src/components/shared/TittleAndCrumbs/TittleAndCrumbs';
import TractorQuestionListing from './TractorQuestionListing';

const TractorQuestionListingData = ({ translation, isMobile }) => {
  return (
    <>
      <TittleAndCrumbs
        title="Tractors Question Hub"
        breadcrumbs={[
          {
            label: 'Home',
            href: '/',
            title: 'Home',
          },
          {
            label: 'Tractors Question',
            title: 'Tractors Question',
            isCurrent: true,
          },
        ]}
      />
      <TractorQuestionListing translation={translation} isMobile={isMobile} />
    </>
  );
};
export default TractorQuestionListingData;

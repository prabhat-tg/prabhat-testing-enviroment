import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import ReviewsCard from '@/src/features/tyreComponents/components/tyreRatingAndReviews/ReviewsCard';
import TG_Button from '../../ui/buttons/MainButtons';

const CustomerReviews = ({
  title = "All Tractors's Customer Review",
  reviews,
  isMobile,
  buttonText = 'Show More',
  bgColor,
  itemsCount = 8,
}) => {
  return (
    <section className={`${bgColor ? bgColor : ''}`}>
      <div className="container">
        <MainHeadings text={title} />
        <div className="-mx-2 flex flex-wrap">
          {reviews.slice(0, itemsCount).map(review => (
            <div className="w-full px-2 pb-4 md:w-1/2">
              <ReviewsCard key={review.sr_no} review={review} />
            </div>
          ))}
        </div>
        {/* <div className='flex justify-center'>
                <TG_Button>{buttonText}</TG_Button>
            </div> */}
      </div>
    </section>
  );
};

export default CustomerReviews;

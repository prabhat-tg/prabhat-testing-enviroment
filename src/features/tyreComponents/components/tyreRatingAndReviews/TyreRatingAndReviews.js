import React from 'react';
import ReviewsCard from '@/src/features/tyreComponents/components/tyreRatingAndReviews/ReviewsCard';
import TyreRatingForm from '@/src/features/tyreComponents/components/tyreRatingAndReviews/TyreRatingForm';
import { tg_getTittleFromNestedKey } from '@/src/utils';
import Image from 'next/image';
import { getTractorReatingReviews, getTyreRatingReviews } from '@/src/services/tyre/ratingReviewService';

const TyreRatingAndReviews = async ({
  bgColor = 'bg-white',
  noReviewImg = 'https://images.tractorgyan.com/uploads/120267/68874f9862bd7-No-review-card-for-tyre.webp',
  headingTitleKey,
  dynamicTitle,
  translation,
  reviewTitleKey,
  modelId,
  brand,
  form_page_name = 'model_detail',
  model,
  showUserReviewTitle = true,
  isTractorReviewPage = false,
  // Implement-specific props
  mode = 'tyre',
  implementType,
  implementBrand,
  implementModel,
  formPageName
}) => {
  // const [reviews, setReviews] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  let reviews = [];
  try {
    // setLoading(true);
    if (isTractorReviewPage) {
      const result = await getTractorReatingReviews(modelId);
      console.log('Result from getTractorReatingReviews:', result);
      if (result.success) {
        reviews = (result.data);
      } else {
        // setError(result.message || 'Failed to fetch reviews.');
      }
    } else {
      const result = await getTyreRatingReviews(modelId);
      console.log('Result from getTyreRatingReviews:', result);
      if (result.success) {
        reviews = (result.data);
      } else {
        // setError(result.message || 'Failed to fetch reviews.');
      }
    }
  } catch (err) {
    // setError('An error occurred while fetching reviews.');
  } finally {
    // setLoading(false);
  }

  // useEffect(() => {
  //   if (modelId) {
  //     const fetchReviews = async () => {
  //     };
  //     fetchReviews();
  //   } else {
  //     setLoading(false);
  //   }
  // }, [modelId]);

  let title = tg_getTittleFromNestedKey(translation, headingTitleKey);
  title = title.replace('{title}', dynamicTitle);
  let userReviewTitle = tg_getTittleFromNestedKey(translation, reviewTitleKey);
  userReviewTitle = userReviewTitle.replace('{title}', dynamicTitle);

  const renderReviews = () => {
    // if (loading) {
    //   return <p>Loading reviews...</p>;
    // }

    // if (error) {
    //   return <p>{error}</p>;
    // }

    if (reviews.length === 0 || !reviews) {
      return (
        <div className="flex h-full min-h-[250px] w-full items-center justify-center md:min-h-[400px]">
          <Image
            src={noReviewImg}
            height={800}
            width={800}
            alt="no-review-image"
            title="no-review-image"
            className="h-auto max-h-[250px] w-full max-w-full object-contain md:max-h-[400px]"
          />
        </div>
      );
    }

    return (
      <>
        {reviews.slice(0, 4).map(review => (
          <ReviewsCard key={review.sr_no} review={review} />
        ))}
      </>
    );
  };

  return (
    <section id="review-section" className={bgColor}>
      <div className="container">
        <div className="space-y-12">
          <div className="rounded-2xl border-gray-light md:border-[1px] md:p-6">
            <h2 className="inline-block border-b-[3px] border-secondary pb-1 text-lg font-semibold leading-5 md:text-2xl md:leading-7">
              {title}
            </h2>
            <div className="grid grid-cols-7 gap-x-6 gap-y-8">
              <div className="col-span-7 border-gray-light md:col-span-3 md:border-e-[1px] md:pe-8">
                <TyreRatingForm
                  translation={translation}
                  brand={brand}
                  model={model}
                  form_page_name={formPageName || form_page_name}
                  mode={mode}
                  implementType={implementType}
                  implementBrand={implementBrand}
                  implementModel={implementModel}
                />
              </div>
              <div className="col-span-7 md:col-span-4">
                {showUserReviewTitle && (
                  <h2 className="inline-block border-b-[3px] border-secondary pb-1 text-lg font-semibold leading-5 md:text-2xl md:leading-7">
                    {userReviewTitle}
                  </h2>
                )}
                {renderReviews()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TyreRatingAndReviews;

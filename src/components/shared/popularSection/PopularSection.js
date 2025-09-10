import MainButton from '@/src/features/tyreComponents/commonComponents/buttons/MainButton';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import PopularCard from './PopularCard';

const PopularSection = ({
  bgColor,
  heading,
  cta,
  translation,
  isMobile,
  popularData,
  langPrefix,
  redirectRoute = '/tyres',
  popularDataError,
  type = 'tractor'
}) => {
  if (popularDataError) {
    return (
      <div className="py-5 text-center">
        <p>
          {translation?.error_messages?.popular_tractors_unavailable ||
            'Popular tractors are currently unavailable.'}
        </p>
      </div>
    );
  }

  return (
    <section className={`${bgColor ? bgColor : ''}`}>
      <div className="container">
        <MainHeadings text={heading || translation.headings.popularTractor} />
        {!isMobile ? (
          <div className="mb-8 grid grid-cols-4 gap-8">
            {popularData?.slice(0, 4).map((item, index) => {
              return (
                <PopularCard
                  key={index}
                  isMobile={isMobile}
                  langPrefix={langPrefix}
                  brand={item.brand}
                  model={item.model}
                  cylinder={item.cylinder}
                  lifting_capacity={item.lifting_capacity}
                  imgUrl={item.full_image}
                  linkUrl={item.tyre_url}
                  hp={item.hp}
                  pageUrl={item.page_url}
                  popularData={popularData}
                  translation={translation}
                  type={type}
                  power={item.power}
                  width={item.width}
                  warranty={item.warranty}
                />
              );
            })}
          </div>
        ) : (
          <PopularCard
            translation={translation}
            popularData={popularData}
            isMobile={isMobile}
            langPrefix={langPrefix}
            type={type}
          />
        )}
        <MainButton
          text={cta || translation.buttons.viewAllPopularTractor}
          linkUrl={`${langPrefix == 'en' ? '' : '/hi'}${redirectRoute}`}
        />
      </div>
    </section>
  );
};

export default PopularSection;

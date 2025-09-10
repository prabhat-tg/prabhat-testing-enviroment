import TyreByBrandsCard from '@/src/features/tyre/tyresByBrands/TyreByBrandsCard';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import TyreBrandsMobileToggle from './TyreBrandsMobileToggle';

const TyresByBrands = ({
  bgColor = [],
  isMobile,
  tyreBrands,
  translation,
  title,
  placedInFilter = false,
  prefLang,
}) => {
  return (
    <section className={`${bgColor || ''}`}>
      <div className="container">
        <MainHeadings text={title || translation.headings.tyresbyBrands} />
        <div
          className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:justify-start md:gap-[10px] xl:justify-between"
          id="tyre-brands-list"
        >
          {tyreBrands.map((item, index) => (
            <div
              key={index}
              // className={`tyre-brand-item h-full max-h-[117px] max-w-[30%] md:w-full md:max-w-[117px]`}
              className={`${placedInFilter ? 'w-1/3' : 'max-h-[117px] md:max-w-[117px]'} tyre-brand-item h-full max-w-[30%] md:w-full`}
              data-index={index}
            >
              <TyreByBrandsCard
                imgUrl={item.image}
                pageUrl={(prefLang === 'hi' ? '/hi/' : '/') + item.url}
                altText={item.name}
              />
            </div>
          ))}
        </div>
        {/* {placedInFilter && (
          <div className="flex w-full justify-center">
            <TG_Button>View All Brands</TG_Button>
          </div>
        )} */}
        {isMobile && (
          <TyreBrandsMobileToggle total={tyreBrands?.length} translation={translation} />
        )}
      </div>
    </section>
  );
};

export default TyresByBrands;

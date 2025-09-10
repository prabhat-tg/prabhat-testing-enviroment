import TyreByBrandsCard from '@/src/features/tyre/tyresByBrands/TyreByBrandsCard';
import MainHeadings from '@/src/features/tyreComponents/commonComponents/MainHeadings';
import TyreBrandsToggle from './TyreBrandsToggle'; // new client component
import './tyresByBrand.css';
const TyreDealersByBrands = ({ bgColor, translation, isMobile, tyreDealerBrands, currentLang }) => {
  return (
    <section className={`${bgColor || ''}`}>
      <div className="container">
        <MainHeadings text={`${translation.headings.TyreDealersByBrands}`} />
        <div id="tyre-brands-list" className="relative">
          <div
            className={`tyre-brands-list mb-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:justify-start md:gap-[10px] xl:justify-between ${
              isMobile ? 'collapsed' : ''
            }`}
          >
            {tyreDealerBrands &&
              tyreDealerBrands.map((item, index) => (
                <div
                  className="h-full max-h-[117px] max-w-[30%] md:w-full md:max-w-[117px]"
                  key={index}
                >
                  <TyreByBrandsCard
                    imgUrl={item.brand_logo}
                    pageUrl={(currentLang == 'hi' ? '/hi' : '') + item.page_url}
                    altText={item.brand_name}
                  />
                </div>
              ))}
          </div>
          {/* Only show toggle button on mobile */}
          {isMobile && <TyreBrandsToggle translation={translation} />}
        </div>
      </div>
    </section>
  );
};

export default TyreDealersByBrands;

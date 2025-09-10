import HomeBannerSlider from "./HomeBannerSlider";
import HomeBannerSearchClient from "./HomeBannerSearchClient";

const HomeBanner = ({
  tyreBrands,
  uniqueTyreSize,
  translation,
  currentLang,
  homeBanners,
}) => {
  const langPrefix = currentLang === "hi" ? "/hi" : "";

  return (
    <section className="m-0 h-[202px] w-full p-0 md:h-full md:max-h-[300px] md:min-h-[300px]">
      <div className="slider-container relative h-full md:max-h-[300px] md:min-h-[300px]">
        <HomeBannerSlider homeBanners={homeBanners} />
        <HomeBannerSearchClient
          tyreBrands={tyreBrands}
          uniqueTyreSize={uniqueTyreSize}
          translation={translation}
          currentLang={langPrefix}
        />
      </div>
    </section>
  );
};

export default HomeBanner;

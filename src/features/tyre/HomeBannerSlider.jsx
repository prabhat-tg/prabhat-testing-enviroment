"use client";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

const HomeBannerSlider = ({ homeBanners }) => {
  const settings = {
    dots: homeBanners?.length > 1,
    arrow: homeBanners?.length > 1,
    infinite: homeBanners?.length > 1,
    autoplay: homeBanners?.length > 1,
    lazyLoad: true,
    pauseOnHover: true,
    speed: 1000,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
  };

  return (
    <Slider
      {...settings}
      className={`tyre-home-banner ${
        homeBanners?.length <= 1 ? "single-slide" : ""
      }`}
    >
      {homeBanners?.length > 0
        ? homeBanners.map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className="h-[202px] w-full md:h-full md:max-h-[300px] md:min-h-[300px]"
            >
              <Image
                priority
                src={item.slider_image}
                height={300}
                width={1500}
                sizes="(max-width: 768px) 100vw, 1500px"
                title={item.url}
                alt={item.url}
                className="h-full min-h-[202px] w-full object-cover object-center md:max-h-[300px] md:min-h-[300px]"
              />
            </Link>
          ))
        : ""}
    </Slider>
  );
};

export default HomeBannerSlider;

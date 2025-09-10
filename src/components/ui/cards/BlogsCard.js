import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SocialMediaLinksShare from '../../shared/social-media/SocialMediaShare';
import TG_LinkButton from '../buttons/TgLinkButton';
import TG_Heading from '../headings/Heading';
import TG_author from '../authorText/author';

const TG_BlogCardUnified = ({
  variant = 'default', // "default" or "featured"
  title,
  excerpt,
  imageSrc,
  imageAlt,
  blogUrl,
  readMoreText = 'Read More',
  author = 'By Team TractorGyan',
  date,
  showSocial = false, // optional for 'featured'
}) => {
  const isFeatured = variant === 'featured';

  if (isFeatured) {
    return (
      <div className="shadow-sm hover:shadow-md col-span-1 h-fit w-full border-b-[1px] border-gray-light p-1 py-4 transition-all md:col-span-2 md:p-4">
        <Link href={blogUrl} title={title} aria-label={title}>
          <TG_Heading
            level={3}
            defaultCss
            className="mb-2 cursor-pointer font-semibold hover:underline md:border-none md:text-3xl"
          >
            {title}
          </TG_Heading>
        </Link>
        <div className="relative grid items-start gap-2 lg:flex lg:justify-between lg:gap-6">
          <div className="w-full lg:w-1/2">
            <div>
              <Link
                href={blogUrl}
                title={title}
                aria-label={title}
                // className="max-h-[250] min-h-[220px] w-full "
                className="block max-h-[250px] min-h-[165px] w-full overflow-hidden rounded-lg"
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt || title}
                  title={title}
                  width={472}
                  height={290}
                  className="h-full w-full object-fill"
                  priority
                />
              </Link>
            </div>
            <div className="flex items-center justify-between pt-2">
              <TG_author author={author} />
              <span className="text-sm text-gray-dark">{date}</span>
            </div>
          </div>
          <div className="mt-2 w-full lg:mt-0 lg:w-1/2">
            <div className="mb-4 text-sm text-gray-main">
              <p>{excerpt}</p>
            </div>
            <TG_LinkButton iconSrc href={blogUrl}>
              {readMoreText}
            </TG_LinkButton>

            {showSocial && (
              <div className="absolute bottom-2 right-1 mt-4 hidden flex-col items-end justify-end md:flex">
                <b>Share this blog:</b>
                <SocialMediaLinksShare />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default (compact) version
  return (
    <div className="shadow-sm hover:shadow-md relative rounded-2xl border border-gray-light p-4 transition-all">
      <div className="flex flex-col gap-1">
        <div className="mb-4 h-[200px] w-full overflow-hidden rounded-[10px] lg:h-[210px] 2xl:h-[250px]">
          <Link href={blogUrl} title={title} aria-label={title}>
            <Image
              src={imageSrc}
              alt={imageAlt || title}
              title={title}
              width={452}
              height={240}
              className="h-full w-full rounded-[10px] object-fill"
              loading="lazy"
            />
          </Link>
        </div>
        <h3 className="line-clamp-2 cursor-pointer text-base font-semibold text-black hover:underline md:h-[60px] md:text-lg">
          <Link href={blogUrl} title={title} aria-label={title}>
            {title}
          </Link>
        </h3>
        <div className="line-clamp-3 overflow-hidden text-sm text-gray-main">
          <p>{excerpt}</p>
        </div>
        <TG_LinkButton iconSrc href={blogUrl}>
          {readMoreText}
        </TG_LinkButton>
      </div>
    </div>
  );
};

export default TG_BlogCardUnified;
{
  /* Default blog card */
}
{
  /* <TG_BlogCardUnified
  title="Top 10 John Deere 2WD Tractors"
  excerpt="भारत में खेती की गुणवत्ता और उत्पादकता को बढ़ाने के लिए ट्रैक्टर एक अहम भूमिका निभाते हैं..."
  imageSrc="https://images.tractorgyan.com/uploads/119931/686e5baa5e962-top-john-deere-2wd-tractors-price-and-features.webp"
  blogUrl="/tractor-industry-news-blogs/1886/top-john-deere-2wd-tractors-price-and-features"
/>

 Featured blog card 
    <TG_BlogCardUnified
    variant="featured"
  title="क्या आप जानते हैं कि जॉन डियर 5105 सबसे ज्यादा बिकने वाला ट्रैक्टर है?"
  excerpt="इस लेख में जानें इसकी ताकत, विशेषताएं और किसानों के बीच इसकी लोकप्रियता का कारण..."
  imageSrc="https://images.tractorgyan.com/uploads/119945/featured-image.webp"
  blogUrl="/tractor-industry-news-blogs/1890/john-deere-5105-best-seller"
  author="By TractorGyan Team"
  date="11 July 2025"
  showSocial={true}
/> */
}

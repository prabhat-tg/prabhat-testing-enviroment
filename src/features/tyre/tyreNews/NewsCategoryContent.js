import Image from 'next/image';
import Link from 'next/link';
import NewsShareButton from './NewsShareButton';
import { IMAGE_URL } from '@/src/services/constants/url-constants';

export default function NewsCategoryContent({ newsItems, translation, langPrefix }) {
  const teaser = (html, maxWords = 30) => {
    const words = html.replace(/<\/?[^>]+>/g, '').split(/\s+/);
    return words.slice(0, maxWords).join(' ') + (words?.length > maxWords ? '…' : '');
  };

  // Helper function to get the correct URL field
  const getUrl = item => item.page_url || item.url;

  if (newsItems?.length === 0) {
    return <p className="text-center text-gray-main">{translation.noNews}</p>;
  }

  const first = newsItems[0];
  const rest = newsItems.slice(1, 6);

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      {/* Featured item */}
      <div className="flex flex-col gap-4 md:w-1/2">
        <Link href={getUrl(first)}>
          <Image
            src={IMAGE_URL + first.featured_image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
            width={640}
            height={360}
            alt={first.title}
            title={first.title}
            className="h-full max-h-[344px] w-full rounded-xl object-fill shadow-card"
          />
        </Link>
        <div className="flex items-center justify-between">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
            1
          </span>
          <time className="text-sm text-gray-main">{first.created_at}</time>
        </div>
        <h3 className="text-lg font-bold md:text-2xl">
          <Link href={getUrl(first)}>{first.title}</Link>
        </h3>
        <p className="text-gray-main">{teaser(first.page_text)}</p>
        <div className="flex items-center justify-between">
          <Link href={getUrl(first)} className="text-start text-base font-semibold text-gray-main">
            {translation.buttons.readMore} &gt;
          </Link>
          <NewsShareButton title={first.title} url={getUrl(first)} />
        </div>
      </div>

      {/* Next 5 items */}
      <div className="flex flex-col gap-6 md:w-1/2">
        {rest.map((item, idx) => (
          <div key={idx} className={`flex gap-4 pt-4 ${idx === 0 ? '' : 'border-t'}`}>
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm text-white">
                  {idx + 2}
                </span>
                <time className="text-sm text-gray-main">{item.created_at}</time>
              </div>
              <h3 className="font-bold">
                <Link href={getUrl(item)}>{item.title}</Link>
              </h3>
            </div>
            <Link
              href={getUrl(item)}
              className="overflow-hidden rounded-xl shadow-card"
              style={{ width: '40%', minWidth: 0, maxWidth: '256px', height: 'auto' }} // 30% of 640px = 192px
            >
              <Image
                src={IMAGE_URL + item.featured_image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}
                width={192}
                height={103}
                alt={item.title}
                title={item.title}
                className="h-full w-full object-fill"
                style={{ aspectRatio: '16/9' }}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

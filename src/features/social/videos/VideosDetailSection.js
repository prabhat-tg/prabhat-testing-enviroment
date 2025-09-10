import Image from "next/image";
import TittleAndCrumbs from "../../../components/shared/TittleAndCrumbs/TittleAndCrumbs";
import Link from "next/link";
import YoutubeSubscribeButton from "../../../components/shared/youtubeSubscribeButton/YoutubeSubscribeButton";

const VideosDetailSection = ({ param, videoDetailData, translation }) => {
  const reelData = videoDetailData?.data[0];
  const reelLatestVideo = videoDetailData?.latest_video;

  const formattedTitle = formatSlugToTitle(reelData?.title);

  function formatSlugToTitle(slug) {
    if (!slug) return "";

    const words = slug.split("-");

    const minorWords = [
      "of",
      "into",
      "for",
      "the",
      "and",
      "in",
      "on",
      "with",
      "to",
    ];

    const formatted = words
      .map((word, index) => {
        if (minorWords.includes(word) && index !== 0) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");

    return formatted;
  }

  return (
    <section className="max-md:pt-3 lg:mt-[155px]">
      <div className="container relative">
        <TittleAndCrumbs
          title={formattedTitle}
          breadcrumbs={[
            { label: "Home", href: "/", title: "Home" },
            {
              label: "Tractor & Implement Videos",
              href: "/tractor-videos",
              title: "Tractor & Implement Videos",
            },
            {
              label: formattedTitle,
              title: formattedTitle,
              isCurrent: true,
            },
          ]}
        />
        <div className="me-0 justify-end pb-4 lg:hidden">
          <YoutubeSubscribeButton translation={translation} />
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-5 md:col-span-3">
            <div className="relative h-auto min-h-fit w-full rounded-xl border-gray-light bg-white text-center md:min-h-[320px] md:border-[1px] md:p-4">
              <div className="mb-2.5 w-full">
                <div className="relative mb-2.5 aspect-video w-full overflow-hidden rounded-lg">
                  <iframe
                    height="100%"
                    width="100%"
                    className="absolute left-0 top-0 h-full w-full"
                    src={`${reelData?.url_of_video}`}
                    title={reelData?.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="flex items-start justify-between md:items-center">
                  <h2 className="text-left text-lg font-semibold text-black md:text-2xl">
                    {reelData?.title}
                  </h2>

                  <span className="cursor-pointer rounded-full bg-red-main px-1 py-1 text-xs font-semibold text-white md:px-2 md:text-sm">
                    Subscribe
                  </span>
                </div>
              </div>
              <p className="mb-2 line-clamp-2 text-left text-base text-gray-main">
                {reelData?.description}
              </p>
            </div>
          </div>
          <div className="col-span-5 md:col-span-2">
            <div className="me-0 hidden justify-end pb-3.5 lg:flex">
              <YoutubeSubscribeButton translation={translation} />
            </div>
            {reelLatestVideo?.slice(0, 3).map((value, index) => (
              <div
                key={index}
                className="mb-3 flex cursor-pointer justify-between gap-2 rounded-xl bg-white p-2.5 shadow-main md:p-4"
              >
                <div className="relative w-[48%] overflow-hidden rounded-lg">
                  <Link href={value.full_url}>
                    <Image
                      src={`https://images.tractorgyan.com/uploads/${value?.image}`}
                      height={500}
                      width={500}
                      alt={`img`}
                      title={`img`}
                      className="aspect-auto"
                    />
                  </Link>

                  <Link href={value.full_url}>
                    <Image
                      src="https://images.tractorgyan.com/uploads/113818/669109a809c8d-playButton.webp"
                      height={50}
                      width={50}
                      alt="play-button-icon"
                      title="play-button-icon"
                      className="absolute left-[42%] top-[22%] h-auto max-w-[26px] rounded-3xl md:top-[28%] md:max-w-[39px]"
                    />
                  </Link>
                </div>
                <div className="relative w-[48%]">
                  <Link
                    href={value.full_url}
                    className="mb-2.5 line-clamp-3 text-left text-sm font-semibold hover:underline md:text-lg md:leading-[25px]"
                  >
                    {value?.title}
                  </Link>
                  <div className="absolute bottom-0 w-full">
                    <div className="flex w-full items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-gray-dark md:text-sm">
                          {value?.created_at}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-main">
                        <Image
                          src={
                            "https://images.tractorgyan.com/uploads/117331/677cd475d38ef-show-hide-icon_small.webp"
                          }
                          height={100}
                          width={100}
                          alt="views-icon"
                          title="views-icon"
                          className="h-5 w-6"
                        />
                        <div>
                          <span className="text-xs font-normal md:text-sm">
                            {value?.total_view}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideosDetailSection;

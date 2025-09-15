import { getAboutContent, getTractorDealerContent } from "@/src/services/about/about-service";
import { processContent } from "@/src/lib/processContent";
import ReadMoreButton from "./ReadMoreButton";

export default async function AboutPage({
  slug,
  translation,
  isStatic = "",
  staticData = "",
  isTractorDealer = false,
  tractorDealerPayload = {}
}) {
  let rawHtml;
  if (isStatic) rawHtml = staticData;
  else if (isTractorDealer) {
    rawHtml = await getTractorDealerContent(tractorDealerPayload);
  }

  else rawHtml = await getAboutContent(slug);
  const { title, strippedContent } = processContent(rawHtml);

  if (!title && !strippedContent) {
    return <></>; // Return null if no content is available
  }
  return (
    <section className="bg-section-gray">
      <div className="container mx-auto">
        {title && (
          <h2
            className="border-b-3 mb-8 inline-block border-secondary pb-2 text-xl font-bold leading-7 md:text-2xl"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        <div className="dd">
          <div
            id="about-content"
            className="text flex max-h-[500px] flex-col gap-4 overflow-hidden py-4 pt-0 text-base text-gray-main transition-[max-height] duration-300"
            dangerouslySetInnerHTML={{ __html: strippedContent }}
          />
          <ReadMoreButton translation={translation} targetId="about-content" />
        </div>
      </div>
    </section>
  );
}

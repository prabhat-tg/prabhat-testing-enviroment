
import Link from 'next/link';
import React from 'react';
import TG_HorizontalCard from '@/src/components/ui/cards/ListingCard';
import SecondHandTractorCard from '@/src/components/ui/cards/secondHandTractorCards/SecondHandTractorCard';
import { TG_ReelsCard } from '@/src/components/ui/cards/reels/ReelsCards';
import ClientVideoWrapper from '@/src/components/ui/video/ClientVideoWrapper';

const TractorListing = ({
  pageType,
  initialTyres,
  totalTyresCount,
  currentPage,
  itemsPerPage,
  activeFilters,
  translation,
  currentLang,
  currentDate,
  basePath,
  pageOrigin = "https://tractorgyan.com",
  isMobile,
  reel
}) => {
  const noDataFound = !initialTyres || initialTyres.length === 0;
  const cp = Number(currentPage || 1);
  const ipp = Number(itemsPerPage || 1) || 1;
  const totalPages = Math.ceil((Number(totalTyresCount) || 0) / ipp);
  const showReelAfter = isMobile ? 1 : 3;

  console.log("Aniket : ", pageType);


  const buildPageLink = pageNumber => {
    const queryParams = new URLSearchParams();
    if (activeFilters?.brand) queryParams.set('brand', activeFilters.brand);
    if (activeFilters?.size) queryParams.set('size', activeFilters.size);
    if (activeFilters?.sortBy) queryParams.set('sortBy', activeFilters.sortBy);
    if (activeFilters?.hpRange) queryParams.set('hpRange', activeFilters.hpRange);

    if (activeFilters?.searchQuery) queryParams.set('search', activeFilters.searchQuery);
    else if (activeFilters?.search) queryParams.set('search', activeFilters.search);

    if (currentLang && currentLang !== 'en') {
      queryParams.set('lang', currentLang);
    } else if (activeFilters?.lang && activeFilters.lang !== 'en') {
      queryParams.set('lang', activeFilters.lang);
    }

    if (pageNumber > 1) queryParams.set('page', pageNumber.toString());
    return `${basePath || ''}${queryParams.toString() ? '?' : ''}${queryParams.toString()}`;
  };

  const toAbs = (path) => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    const origin = (pageOrigin || '').replace(/\/$/, '');
    if (!origin) return path.startsWith('/') ? path : `/${path}`;
    return path.startsWith('/') ? `${origin}${path}` : `${origin}/${path}`;
  };

  const itemsForSchema = (initialTyres || []).slice(0, 16);

  const productNodes = itemsForSchema.map((tractor, i) => {
    const pos = i + 1 + (cp - 1) * ipp;
    const itemUrl = toAbs((currentLang === 'hi' ? '/hi' : '') + (tractor?.page_url || ''));
    const idFragment = String(tractor?.id ?? pos).replace(/\s+/g, '-');
    const productId = `${itemUrl}#product-${encodeURIComponent(idFragment)}`;
    const name = `${(tractor?.brand || '').trim()} ${(tractor?.model || '').trim()}`.trim() || `Tractor ${pos}`;

    const image = tractor?.image ? toAbs(`https://images.tractorgyan.com/uploads${tractor.image}`) : undefined;

    const rawPrice = tractor?.price ?? tractor?.price_min ?? tractor?.price_max ?? null;
    let numericPrice = null;
    if (rawPrice !== null && rawPrice !== undefined && String(rawPrice).trim() !== '') {
      const n = Number(String(rawPrice).replace(/[, ]+/g, ''));
      if (!Number.isNaN(n)) numericPrice = n;
    }
    const hasPrice = numericPrice !== null && numericPrice > 0;

    const offers = hasPrice ? {
      "@type": "Offer",
      "url": itemUrl,
      "price": String(numericPrice),
      "priceCurrency": tractor?.currency || "INR",
      "availability": tractor?.in_stock !== undefined
        ? (tractor.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock")
        : "https://schema.org/InStock"
    } : undefined;

    const node = {
      "@type": "Product",
      "@id": productId,
      "name": name,
      "url": itemUrl,
      ...(image ? { "image": [image] } : {}),
      ...(tractor?.short_description ? { "description": String(tractor.short_description).slice(0, 300) } : {}),
      ...(tractor?.sku ? { "sku": String(tractor.sku) } : {}),
      ...(offers ? { "offers": offers || 0 } : {})
    };

    const avg = tractor?.avg_review ?? tractor?.total_reviews ?? tractor?.total_reviews ?? 0;
    const totalReviews = tractor?.total_reviews ?? tractor?.totalReview ?? tractor?.review_count;
    const avgNum = avg !== undefined && avg !== null ? Number(avg) : null;
    const totalNum = totalReviews !== undefined && totalReviews !== null ? Number(totalReviews) : null;
    node.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": String(avgNum || 0),
      "ratingCount": String(avgNum || 0)
    };

    return node;
  });

  const itemListNode = itemsForSchema.length > 0 ? {
    "@type": "ItemList",
    "itemListElement": itemsForSchema.map((tractor, i) => {
      const pos = i + 1 + (cp - 1) * ipp;
      const itemUrl = toAbs((currentLang === 'hi' ? '/hi' : '') + (tractor?.page_url || ''));
      const idFragment = String(tractor?.id ?? pos).replace(/\s+/g, '-');
      const productId = `${itemUrl}#product-${encodeURIComponent(idFragment)}`;
      return {
        "@type": "ListItem",
        "position": pos,
        "item": { "@id": productId }
      };
    })
  } : null;

  const graph = [];
  if (productNodes.length) productNodes.forEach(n => graph.push(n));
  if (itemListNode) graph.push(itemListNode);

  const jsonLd = graph.length > 0 ? JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph
  }).replace(/<\/script>/gi, '<\\/script>') : null;

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />}


      <div className="h-full w-full">
        {noDataFound ? (
          <div className="my-10 text-center md:mt-40">
            {translation?.headings?.noResultFound || 'No Result Found'}
          </div>
        ) : (
          <>
            {pageType === 'tractors' && (
              <>
                {reel ? (
                  <div
                    className="flex flex-col md:flex-row flex-wrap items-stretch gap-4 lg:gap-4 mb-4"
                  >
                    <div className='flex flex-1 flex-col gap-4 lg:gap-4 w-full max-w-[420px]'>
                      {initialTyres.slice(0, showReelAfter).map((tractor, index) => (
                        <TG_HorizontalCard
                          key={tractor.id}
                          title={`${tractor.brand} ${tractor.model}`}
                          total_reviews={tractor.total_reviews || tractor.total_review || 0}
                          avg_review={tractor.avg_review || 0}
                          imageSrc={`https://images.tractorgyan.com/uploads${tractor.image}`}
                          detailUrl={(currentLang == 'hi' ? '/hi' : '') + tractor.page_url}
                          specs={{
                            [translation?.tractorSpecs?.hp || 'HP']: tractor.hp,
                            [translation?.tractorSpecs?.cylinders || 'Cylinder']: tractor.cylinder,
                            [translation?.headerNavbar?.liftingCapacity || 'Lifting Capacity']: tractor.lifting_capacity,
                          }}
                          buttonText={translation?.headerNavbar?.checkPrice || "Check Price"}
                          buttonPrefix="₹ "
                          isPopular={tractor.popular_tractor === '1'}
                          showRatingOnTop={pageType === 'tractors'}
                          translation={translation}
                          position={index + 1 + (cp - 1) * ipp}
                          tractorId={tractor.id}
                        />
                      ))}
                    </div>

                    <div className='flex flex-1 w-full max-w-[420px] items-stretch'>
                      {reel && (
                        reel.url_of_video && reel.featured_image && !reel.image ? (
                          <div className="relative rounded-2xl border border-gray-light p-4 w-full h-full flex flex-col justify-between bg-white min-h-[360px] md:min-h-[540px]">
                            <ClientVideoWrapper
                              videoUrl={reel.url_of_video}
                              title={reel.title}
                              isMobile={isMobile}
                              className="bg-gray-lighter w-full h-full flex-1 rounded-xl overflow-hidden relative min-h-[200px] md:min-h-[360px]"
                            />
                          </div>
                        ) : (
                          <TG_ReelsCard data={reel} />
                        )
                      )}
                    </div>
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-4 lg:gap-4 xl:gap-4">
                  {(reel ? initialTyres.slice(showReelAfter) : initialTyres).map((tractor, index) => {
                    const position = index + 1 + (cp - 1) * ipp;
                    const imageUrl = tractor.image ? `https://images.tractorgyan.com/uploads${tractor.image}` : '';
                    return (
                      <TG_HorizontalCard
                        key={tractor.id}
                        title={`${tractor.brand} ${tractor.model}`}
                        total_reviews={tractor.total_reviews || tractor.total_review || 0}
                        avg_review={tractor.avg_review || 0}
                        imageSrc={imageUrl}
                        detailUrl={(currentLang == 'hi' ? '/hi' : '') + tractor.page_url}
                        specs={{
                          [translation?.tractorSpecs?.hp || 'HP']: tractor.hp,
                          [translation?.tractorSpecs?.cylinders || 'Cylinder']: tractor.cylinder,
                          [translation?.headerNavbar?.liftingCapacity || 'Lifting Capacity']: tractor.lifting_capacity,
                        }}
                        buttonText={translation?.headerNavbar?.checkPrice || "Check Price"}
                        buttonPrefix="₹ "
                        isPopular={tractor.popular_tractor === '1'}
                        showRatingOnTop={pageType === 'tractors'}
                        translation={translation}
                        position={position}
                        tractorId={tractor.id}
                      />
                    );
                  })}
                </div>
              </>
            )}

            {pageType === 'used_tractors' && (
              <div className="flex flex-wrap gap-4 lg:gap-4 xl:gap-4">
                {initialTyres.map((tractor, index) => (
                  <SecondHandTractorCard data={tractor} key={tractor.id || index} />
                ))}
              </div>
            )}

            {pageType === 'implements' && (
              <div className="flex flex-wrap gap-4 lg:gap-4 xl:gap-4">
                {initialTyres?.map((implement, index) => (
                  <TG_HorizontalCard
                    key={implement.id || index}
                    title={`${implement.brand_name} ${implement.model}`}
                    imageSrc={`https://images.tractorgyan.com/uploads${implement.image}`}
                    detailUrl={implement?.page_url}
                    specs={{ HP: implement?.implement_power }}
                    buttonText={translation.headerNavbar.ViewPrice}
                    buttonPrefix="₹ "
                    isPopular={implement?.popular_implement === "Yes" ? true : false}
                    translation={translation}
                  />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center space-x-4 text-center">
                {cp > 1 && (
                  <Link href={buildPageLink(cp - 1)} className="hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-lg text-white">
                    {translation?.buttons?.previous || 'Previous'}
                  </Link>
                )}
                <span className="text-gray-700 text-lg">
                  {translation?.headings?.page || 'Page'} {cp}{' '}
                  {translation?.headings?.of || 'of'} {totalPages}
                </span>
                {cp < totalPages && (
                  <Link href={buildPageLink(cp + 1)} className="hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-lg text-white">
                    {translation?.buttons?.next || 'Next'}
                  </Link>
                )}
              </div>
            )}

            {(pageType === 'implements' || pageType == 'implement-brand') && (
              <div className="flex flex-wrap gap-4 lg:gap-4 xl:gap-4">
                {initialTyres?.map((implement, index) => (
                  <TG_HorizontalCard
                    title={`${implement.brand_name} ${implement.model}`}
                    imageSrc={`https://images.tractorgyan.com/uploads${implement.image}`}
                    detailUrl={(currentLang == 'hi' ? '/hi' : '') + implement?.page_url}
                    specs={{ HP: implement?.implement_power }}
                    buttonText={translation.headerNavbar.ViewPrice}
                    buttonPrefix="₹ "
                    isPopular={implement?.popular_implement === "Yes" ? true : false}
                    translation={translation} // Pass translation
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && ( // Show pagination only if there's more than one page
              <div className="mt-8 flex items-center justify-center space-x-4 text-center">
                {currentPage > 1 && (
                  <Link
                    href={buildPageLink(currentPage - 1)}
                    className="hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-lg text-white"
                  >
                    {translation?.buttons?.previous || 'Previous'}
                  </Link>
                )}
                <span className="text-gray-700 text-lg">
                  {translation?.headings?.page || 'Page'} {currentPage}{' '}
                  {translation?.headings?.of || 'of'} {totalPages}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default TractorListing;
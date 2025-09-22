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
  activeFilters, // Used by buildPageLink
  translation,
  currentLang, // Used by buildPageLink
  currentDate, // Prop for "Data Last Updated On"
  basePath, // Add basePath prop for correct URL building
  pageOrigin = "https://tractorgyan.com", // Add pageOrigin to determine URL structure
  isMobile,
  reel // <-- Accept reel prop
}) => {
  const noDataFound = !initialTyres || initialTyres.length === 0;
  const cp = Number(currentPage || 1);
  const ipp = Number(itemsPerPage || 1);
  const totalPages = Math.ceil((Number(totalTyresCount) || 0) / ipp);
  const showReelAfter = isMobile ? 1 : 3;

  const buildPageLink = pageNumber => {
    const queryParams = new URLSearchParams();
    if (activeFilters?.brand) queryParams.set('brand', activeFilters.brand);
    if (activeFilters?.size) queryParams.set('size', activeFilters.size);
    if (activeFilters?.sortBy) queryParams.set('sortBy', activeFilters.sortBy);
    if (activeFilters?.hpRange) queryParams.set('hpRange', activeFilters.hpRange);

    // Handle search query: activeFilters might have 'searchQuery' from client or 'search' from server
    if (activeFilters?.searchQuery) queryParams.set('search', activeFilters.searchQuery);
    else if (activeFilters?.search) queryParams.set('search', activeFilters.search);

    // Preserve language
    if (currentLang && currentLang !== 'en') {
      queryParams.set('lang', currentLang);
    } else if (activeFilters?.lang && activeFilters.lang !== 'en') {
      queryParams.set('lang', activeFilters.lang);
    }

    if (pageNumber > 1) queryParams.set('page', pageNumber.toString());
    return `${basePath || ''}${queryParams.toString() ? '?' : ''}${queryParams.toString()}`;
  };

  const abs = (path) => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    const origin = (pageOrigin || '').replace(/\/$/, '');
    if (!origin) return path;
    return path.startsWith('/') ? `${origin}${path}` : `${origin}/${path}`;
  };

  // items used for schema must match UI slicing
  const itemsForSchema = (reel ? (initialTyres || []).slice(showReelAfter) : (initialTyres || []));

  // Build product nodes and itemlist node for JSON-LD @graph
  const productNodes = itemsForSchema.map((tractor, i) => {
    const pos = i + 1 + (cp - 1) * ipp;
    const itemUrl = abs((currentLang === 'hi' ? '/hi' : '') + (tractor?.page_url || ''));
    const productId = `${itemUrl}#product`; // use as @id
    const name = `${(tractor?.brand || '').trim()} ${(tractor?.model || '').trim()}`.trim() || `Tractor ${pos}`;
    const image = tractor?.image ? `https://images.tractorgyan.com/uploads${tractor.image}` : undefined;
    const brandName = tractor?.brand || undefined;

    // ratings
    const avg = tractor?.avg_review ?? tractor?.avgRating ?? tractor?.rating;
    const totalReviews = tractor?.total_reviews ?? tractor?.totalReview ?? tractor?.review_count;

    // price
    const rawPrice = tractor?.price ?? tractor?.price_min ?? tractor?.price_max ?? null;
    const hasPrice = rawPrice !== null && rawPrice !== undefined && rawPrice !== '';
    const priceValue = hasPrice ? String(rawPrice) : null;

    // Build offers (real if available else fallback pre-order)
    const offers = hasPrice ? {
      "@type": "Offer",
      "url": itemUrl,
      "price": priceValue,
      "priceCurrency": (tractor?.currency || 'INR'),
      "availability": tractor?.in_stock !== undefined ? (tractor.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock') : 'https://schema.org/InStock'
    } : {
      "@type": "Offer",
      "url": itemUrl,
      "price": "0",
      "priceCurrency": (tractor?.currency || 'INR'),
      "availability": "https://schema.org/PreOrder"
    };

    const node = {
      "@type": "Product",
      "@id": productId,
      "name": name,
      "url": itemUrl,
      ...(image ? { "image": [image] } : {}),
      ...(brandName ? { "brand": { "@type": "Brand", "name": brandName } } : {}),
      "offers": offers
    };

    // Add aggregateRating if we have real rating info
    if (avg !== undefined && avg !== null && totalReviews !== undefined && totalReviews !== null) {
      node.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": String(avg),
        "reviewCount": String(totalReviews)
      };
    }

    return node;
  });

  // ItemList node that references the product nodes by @id
  const itemListNode = itemsForSchema.length > 0 ? {
    "@type": "ItemList",
    "name": `${translation?.headings?.hpGroupName || 'Tractors'}${pageType ? ` - ${pageType}` : ''}`,
    "numberOfItems": Number(totalTyresCount || itemsForSchema.length),
    "itemListOrder": "https://schema.org/ItemListOrderAscending",
    "itemListElement": itemsForSchema.map((tractor, i) => {
      const pos = i + 1 + (cp - 1) * ipp;
      const itemUrl = abs((currentLang === 'hi' ? '/hi' : '') + (tractor?.page_url || ''));
      const productId = `${itemUrl}#product`;
      return {
        "@type": "ListItem",
        "position": pos,
        "item": { "@id": productId } // reference Product by @id
      };
    })
  } : null;

  // Build the @graph array: all products then ItemList (order doesn't matter)
  const graph = [];
  if (productNodes.length) productNodes.forEach(n => graph.push(n));
  if (itemListNode) graph.push(itemListNode);

  const jsonLd = graph.length > 0 ? JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph
  }).replace(/<\/script>/gi, '<\\/script>') : null;

  return (
    <>
      {/* Server-rendered JSON-LD: Products + ItemList (carousel). */}
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />}

      {/* Hidden microdata fallback for ItemList (Web-visible microdata kept minimal) */}
      {itemsForSchema.length > 0 && (
        <div itemScope itemType="https://schema.org/ItemList" style={{ display: 'none' }}>
          <meta itemProp="numberOfItems" content={String(totalTyresCount || itemsForSchema.length)} />
          <meta itemProp="itemListOrder" content="https://schema.org/ItemListOrderAscending" />
          {itemsForSchema.map((tractor, i) => {
            const pos = i + 1 + (cp - 1) * ipp;
            const itemUrl = abs((currentLang === 'hi' ? '/hi' : '') + (tractor?.page_url || ''));
            const name = `${(tractor?.brand || '').trim()} ${(tractor?.model || '').trim()}`.trim() || `Tractor ${pos}`;
            return (
              <div key={`md-${tractor?.id || pos}`} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <meta itemProp="position" content={String(pos)} />
                <div itemProp="item" itemScope itemType="https://schema.org/Product">
                  <meta itemProp="url" content={itemUrl} />
                  <meta itemProp="name" content={name} />
                  {tractor?.image && <meta itemProp="image" content={`https://images.tractorgyan.com/uploads${tractor.image}`} />}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Visible UI (unchanged) */}
      <div className="h-full w-full">
        {noDataFound ? (
          <div className="my-10 text-center md:mt-40">
            {translation?.headings?.noResultFound || 'No Result Found'}
          </div>
        ) : (
          <>
            {pageType === 'tractors' && (
              <>
                {/* Reels Section */}
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

            <div className="mt-1.5 text-center">
              <span className="mx-auto text-sm text-gray-main">
                {translation?.headings?.dataLastUpdatedOn || 'Data last updated on'}:{' '}
                {currentDate}{' '}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TractorListing;




// import Link from 'next/link';
// import React from 'react';
// import TG_HorizontalCard from '@/src/components/ui/cards/ListingCard';
// import SecondHandTractorCard from '@/src/components/ui/cards/secondHandTractorCards/SecondHandTractorCard';
// import { TG_ReelsCard } from '@/src/components/ui/cards/reels/ReelsCards';
// import ClientVideoWrapper from '@/src/components/ui/video/ClientVideoWrapper';

// const TractorListing = ({
//   pageType,
//   initialTyres,
//   totalTyresCount,
//   currentPage,
//   itemsPerPage,
//   activeFilters,
//   translation,
//   currentLang,
//   currentDate,
//   basePath,
//   pageOrigin = "https://tractorgyan.com",
//   isMobile,
//   reel
// }) => {
//   const noDataFound = !initialTyres || initialTyres.length === 0;
//   const totalPages = Math.ceil((totalTyresCount || 0) / (itemsPerPage || 1));
//   const showReelAfter = isMobile ? 1 : 3;

//   const buildPageLink = pageNumber => {
//     const queryParams = new URLSearchParams();
//     if (activeFilters?.brand) queryParams.set('brand', activeFilters.brand);
//     if (activeFilters?.size) queryParams.set('size', activeFilters.size);
//     if (activeFilters?.sortBy) queryParams.set('sortBy', activeFilters.sortBy);
//     if (activeFilters?.hpRange) queryParams.set('hpRange', activeFilters.hpRange);

//     if (activeFilters?.searchQuery) queryParams.set('search', activeFilters.searchQuery);
//     else if (activeFilters?.search) queryParams.set('search', activeFilters.search);

//     if (currentLang && currentLang !== 'en') {
//       queryParams.set('lang', currentLang);
//     } else if (activeFilters?.lang && activeFilters.lang !== 'en') {
//       queryParams.set('lang', activeFilters.lang);
//     }

//     if (pageNumber > 1) queryParams.set('page', pageNumber.toString());
//     return `${basePath || ''}${queryParams.toString() ? '?' : ''}${queryParams.toString()}`;
//   };

//   const abs = (path) => {
//     if (!path) return '';
//     if (/^https?:\/\//i.test(path)) return path;
//     const origin = (pageOrigin || '').replace(/\/$/, '');
//     if (!origin) return path;
//     return path.startsWith('/') ? `${origin}${path}` : `${origin}/${path}`;
//   };

//   // prepare items for schema the same way we render them
//   const itemsForSchema = (reel ? (initialTyres || []).slice(showReelAfter) : (initialTyres || []));

//   // build ItemList JSON-LD (ListItems point to WebPage to avoid Product validations)
//   const itemListSchema = itemsForSchema.length > 0 ? 
//   {
//     "@context": "https://schema.org",
//     "@type": "ItemList",
//     "name": `${translation?.headings?.hpGroupName || 'Tractors'}${pageType ? ` - ${pageType}` : ''}`,
//     "numberOfItems": Number(totalTyresCount || itemsForSchema.length),
//     "itemListOrder": "https://schema.org/ItemListOrderAscending",
//     "itemListElement": itemsForSchema.map((tractor, i) => {
//       const position = i + 1 + (Number(currentPage || 1) - 1) * (Number(itemsPerPage || 1));
//       const url = abs((currentLang === 'hi' ? '/hi' : '') + (tractor?.page_url || ''));
//       const name = `${tractor?.brand || ''} ${tractor?.model || ''}`.trim() || tractor?.page_url || `item-${position}`;
//       return {
//         "@type": "ListItem",
//         "position": position,
//         "item": {
//           "@type": "WebPage",
//           "url": url,
//           "name": name
//         }
//       };
//     })
//   } 
//   : null;

//   const itemListJson = itemListSchema ? JSON.stringify(itemListSchema).replace(/<\/script>/gi, '<\\/script>') : null;

//   return (
//     <>
//       {/* Server-rendered JSON-LD for ItemList (crawler-friendly). This does not remove or change any visible markup. */}
//       {itemListJson && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: itemListJson }} />}

//       {/* ========== VISIBLE UI (unchanged) ========== */}
//       <div className="h-full w-full">
//         {noDataFound ? (
//           <div className="my-10 text-center md:mt-40">
//             {translation?.headings?.noResultFound || 'No Result Found'}
//           </div>
//         ) : (
//           <>
//             {pageType === 'tractors' && (
//               <>
//                 {reel ? (
//                   <div
//                     className="flex flex-col md:flex-row flex-wrap items-stretch gap-4 lg:gap-4 mb-4"
//                     itemScope
//                     itemType="https://schema.org/ItemList"
//                   >
//                     <div className="flex flex-1 flex-col gap-4 lg:gap-4 w-full max-w-[420px]">
//                       {initialTyres.slice(0, showReelAfter).map((tractor, index) => (
//                         <TG_HorizontalCard
//                           key={tractor.id}
//                           title={`${tractor.brand} ${tractor.model}`}
//                           total_reviews={tractor.total_reviews || tractor.total_review || 0}
//                           avg_review={tractor.avg_review || 0}
//                           imageSrc={`https://images.tractorgyan.com/uploads${tractor.image}`}
//                           detailUrl={(currentLang == 'hi' ? '/hi' : '') + tractor.page_url}
//                           specs={{
//                             [translation?.tractorSpecs?.hp || 'HP']: tractor.hp,
//                             [translation?.tractorSpecs?.cylinders || 'Cylinder']: tractor.cylinder,
//                             [translation?.headerNavbar?.liftingCapacity || 'Lifting Capacity']: tractor.lifting_capacity,
//                           }}
//                           buttonText={translation?.headerNavbar?.checkPrice || "Check Price"}
//                           buttonPrefix="₹ "
//                           isPopular={tractor.popular_tractor === '1'}
//                           showRatingOnTop={pageType === 'tractors'}
//                           translation={translation}
//                           position={index + 1 + (currentPage - 1) * itemsPerPage}
//                           tractorId={tractor.id}
//                         />
//                       ))}
//                     </div>

//                     <div className="flex flex-1 w-full max-w-[420px] items-stretch">
//                       {reel && (
//                         reel.url_of_video && reel.featured_image && !reel.image ? (
//                           <div className="relative rounded-2xl border border-gray-light p-4 w-full h-full flex flex-col justify-between bg-white min-h-[360px] md:min-h-[540px]">
//                             <ClientVideoWrapper
//                               videoUrl={reel.url_of_video}
//                               title={reel.title}
//                               isMobile={isMobile}
//                               className="bg-gray-lighter w-full h-full flex-1 rounded-xl overflow-hidden relative min-h-[200px] md:min-h-[360px]"
//                             />
//                           </div>
//                         ) : (
//                           <TG_ReelsCard data={reel} />
//                         )
//                       )}
//                     </div>
//                   </div>
//                 ) : null}

//                 <div
//                   className="flex flex-wrap gap-4 lg:gap-4 xl:gap-4"
//                   itemScope
//                   itemType="https://schema.org/ItemList"
//                 >
//                   <meta itemProp="numberOfItems" content={totalTyresCount} />
//                   <meta itemProp="itemListOrder" content="https://schema.org/ItemListOrderAscending" />

//                   {(reel ? initialTyres.slice(showReelAfter) : initialTyres).map((tractor, index) => {
//                     const position = index + 1 + (currentPage - 1) * itemsPerPage;
//                     const itemUrl = abs((currentLang === 'hi' ? '/hi' : '') + (tractor.page_url || ''));
//                     const imageUrl = tractor.image ? `https://images.tractorgyan.com/uploads${tractor.image}` : '';
//                     const avg = tractor.avg_review ?? tractor.avgRating ?? tractor.rating;
//                     const totalReviews = tractor.total_reviews ?? tractor.totalReview ?? tractor.review_count;
//                     const hasRating = avg !== undefined && avg !== null && totalReviews !== undefined && totalReviews !== null;
//                     const hasPrice = (tractor.price !== undefined && tractor.price !== null && tractor.price !== '') ||
//                       (tractor.price_min !== undefined && tractor.price_min !== null && tractor.price_min !== '');

//                     const useFallbackOffer = !hasRating && !hasPrice;
//                     const priceValue = (tractor.price ?? tractor.price_min ?? tractor.price_max ?? 0);

//                     return (
//                       <div
//                         key={tractor.id || `${tractor.brand}-${tractor.model}-${index}`}
//                         itemProp="itemListElement"
//                         itemScope
//                         itemType="https://schema.org/ListItem"
//                         className="w-full"
//                       >
//                         <meta itemProp="position" content={position.toString()} />

//                         <div itemProp="item" itemScope itemType="https://schema.org/Product" className="w-full">
//                           <meta itemProp="name" content={`${tractor.brand || ''} ${tractor.model || ''}`.trim()} />
//                           <link itemProp="url" href={itemUrl} />
//                           {imageUrl && <meta itemProp="image" content={imageUrl} />}

//                           {tractor.brand && (
//                             <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
//                               <meta itemProp="name" content={tractor.brand} />
//                             </div>
//                           )}

//                           {hasRating && (
//                             <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
//                               <meta itemProp="ratingValue" content={String(avg)} />
//                               <meta itemProp="reviewCount" content={String(totalReviews)} />
//                             </div>
//                           )}

//                           {(hasPrice || useFallbackOffer) && (
//                             <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
//                               <meta itemProp="url" content={itemUrl} />
//                               <meta itemProp="priceCurrency" content={tractor.currency || 'INR'} />
//                               <meta itemProp="price" content={String(priceValue)} />
//                               <meta
//                                 itemProp="availability"
//                                 content={
//                                   tractor.in_stock !== undefined
//                                     ? (tractor.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock')
//                                     : (useFallbackOffer ? 'https://schema.org/PreOrder' : 'https://schema.org/OutOfStock')
//                                 }
//                               />
//                             </div>
//                           )}

//                           <TG_HorizontalCard
//                             title={`${tractor.brand} ${tractor.model}`}
//                             total_reviews={tractor.total_reviews || tractor.total_review || 0}
//                             avg_review={tractor.avg_review || 0}
//                             imageSrc={imageUrl}
//                             detailUrl={(currentLang == 'hi' ? '/hi' : '') + tractor.page_url}
//                             specs={{
//                               [translation?.tractorSpecs?.hp || 'HP']: tractor.hp,
//                               [translation?.tractorSpecs?.cylinders || 'Cylinder']: tractor.cylinder,
//                               [translation?.headerNavbar?.liftingCapacity || 'Lifting Capacity']: tractor.lifting_capacity,
//                             }}
//                             buttonText={translation?.headerNavbar?.checkPrice || "Check Price"}
//                             buttonPrefix="₹ "
//                             isPopular={tractor.popular_tractor === '1'}
//                             showRatingOnTop={pageType === 'tractors'}
//                             translation={translation}
//                             position={position}
//                             tractorId={tractor.id}
//                           />
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
//             )}

//             {pageType === 'used_tractors' && (
//               <div className="flex flex-wrap gap-4 lg:gap-4 xl:gap-4">
//                 {initialTyres.map((tractor, index) => (
//                   <SecondHandTractorCard data={tractor} key={tractor.id || index} />
//                 ))}
//               </div>
//             )}

//             {pageType === 'implements' && (
//               <div className="flex flex-wrap gap-4 lg:gap-4 xl:gap-4">
//                 {initialTyres?.map((implement, index) => (
//                   <TG_HorizontalCard
//                     key={implement.id || index}
//                     title={`${implement.brand_name} ${implement.model}`}
//                     imageSrc={`https://images.tractorgyan.com/uploads${implement.image}`}
//                     detailUrl={implement?.page_url}
//                     specs={{ HP: implement?.implement_power }}
//                     buttonText={translation.headerNavbar.ViewPrice}
//                     buttonPrefix="₹ "
//                     isPopular={implement?.popular_implement === "Yes" ? true : false}
//                     translation={translation}
//                   />
//                 ))}
//               </div>
//             )}

//             {totalPages > 1 && (
//               <div className="mt-8 flex items-center justify-center space-x-4 text-center">
//                 {currentPage > 1 && (
//                   <Link
//                     href={buildPageLink(currentPage - 1)}
//                     className="hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-lg text-white"
//                   >
//                     {translation?.buttons?.previous || 'Previous'}
//                   </Link>
//                 )}
//                 <span className="text-gray-700 text-lg">
//                   {translation?.headings?.page || 'Page'} {currentPage}{' '}
//                   {translation?.headings?.of || 'of'} {totalPages}
//                 </span>
//                 {currentPage < totalPages && (
//                   <Link
//                     href={buildPageLink(currentPage + 1)}
//                     className="hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-lg text-white"
//                   >
//                     {translation?.buttons?.next || 'Next'}
//                   </Link>
//                 )}
//               </div>
//             )}

//             <div className="mt-1.5 text-center">
//               <span className="mx-auto text-sm text-gray-main">
//                 {translation?.headings?.dataLastUpdatedOn || 'Data last updated on'}:{' '}
//                 {currentDate}{' '}
//               </span>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default TractorListing;




// import Link from 'next/link';
// import React from 'react';
// import TG_HorizontalCard from '@/src/components/ui/cards/ListingCard';
// import SecondHandTractorCard from '@/src/components/ui/cards/secondHandTractorCards/SecondHandTractorCard';
// import { TG_ReelsCard } from '@/src/components/ui/cards/reels/ReelsCards';
// import ClientVideoWrapper from '@/src/components/ui/video/ClientVideoWrapper';

// const TractorListing = ({
//   pageType,
//   initialTyres,
//   totalTyresCount,
//   currentPage,
//   itemsPerPage,
//   activeFilters, 
//   translation,
//   currentLang, 
//   currentDate, 
//   basePath, 
//   pageOrigin = "https://tractorgyan.com", 
//   isMobile,
//   reel 
// }) => {
//   const noDataFound = !initialTyres || initialTyres.length === 0;
//   const totalPages = Math.ceil(totalTyresCount / itemsPerPage);
//   const showReelAfter = isMobile ? 1 : 3;

//   const buildPageLink = pageNumber => {
//     const queryParams = new URLSearchParams();
//     if (activeFilters?.brand) queryParams.set('brand', activeFilters.brand);
//     if (activeFilters?.size) queryParams.set('size', activeFilters.size);
//     if (activeFilters?.sortBy) queryParams.set('sortBy', activeFilters.sortBy);
//     if (activeFilters?.hpRange) queryParams.set('hpRange', activeFilters.hpRange);

//     if (activeFilters?.searchQuery) queryParams.set('search', activeFilters.searchQuery);
//     else if (activeFilters?.search) queryParams.set('search', activeFilters.search);

//     if (currentLang && currentLang !== 'en') {
//       queryParams.set('lang', currentLang);
//     } else if (activeFilters?.lang && activeFilters.lang !== 'en') {
//       queryParams.set('lang', activeFilters.lang);
//     }

//     if (pageNumber > 1) queryParams.set('page', pageNumber.toString());
//     return `${basePath}${queryParams.size ? '?' : ''}${queryParams.toString()}`;

//   };

//   const abs = (path) => {
//     if (!path) return '';
//     if (/^https?:\/\//i.test(path)) return path;
//     const origin = (pageOrigin || '').replace(/\/$/, '');
//     if (!origin) return path;
//     return path.startsWith('/') ? `${origin}${path}` : `${origin}/${path}`;
//   };

//   return (
//     <div className="h-full w-full">
//       {noDataFound ? (
//         <div className="my-10 text-center md:mt-40">
//           {translation?.headings?.noResultFound || 'No Result Found'}
//         </div>
//       ) : (
//         <>
//           {pageType === 'tractors' && (
//             <>
//               {reel ? (
//                 <div
//                   className="flex flex-col md:flex-row flex-wrap items-stretch gap-4 lg:gap-4 mb-4"
//                   itemScope
//                   itemType="https://schema.org/ItemList"
//                 >
//                   <div className="flex flex-1 flex-col gap-4 lg:gap-4 w-full max-w-[420px]">
//                     {initialTyres.slice(0, showReelAfter).map((tractor, index) => (
//                       <TG_HorizontalCard
//                         key={tractor.id}
//                         title={`${tractor.brand} ${tractor.model}`}
//                         total_reviews={tractor.total_reviews || tractor.total_review || 0}
//                         avg_review={tractor.avg_review || 0}
//                         imageSrc={`https://images.tractorgyan.com/uploads${tractor.image}`}
//                         detailUrl={(currentLang == 'hi' ? '/hi' : '') + tractor.page_url}
//                         specs={{
//                           [translation?.tractorSpecs?.hp || 'HP']: tractor.hp,
//                           [translation?.tractorSpecs?.cylinders || 'Cylinder']: tractor.cylinder,
//                           [translation?.headerNavbar?.liftingCapacity || 'Lifting Capacity']: tractor.lifting_capacity,
//                         }}
//                         buttonText={translation?.headerNavbar?.checkPrice || "Check Price"}
//                         buttonPrefix="₹ "
//                         isPopular={tractor.popular_tractor === '1'}
//                         showRatingOnTop={pageType === 'tractors'}
//                         translation={translation}
//                         position={index + 1 + (currentPage - 1) * itemsPerPage}
//                         tractorId={tractor.id}
//                       />
//                     ))}
//                   </div>

//                   <div className="flex flex-1 w-full max-w-[420px] items-stretch">
//                     {reel && (
//                       reel.url_of_video && reel.featured_image && !reel.image ? (
//                         <div className="relative rounded-2xl border border-gray-light p-4 w-full h-full flex flex-col justify-between bg-white min-h-[360px] md:min-h-[540px]">
//                           <ClientVideoWrapper
//                             videoUrl={reel.url_of_video}
//                             title={reel.title}
//                             isMobile={isMobile}
//                             className="bg-gray-lighter w-full h-full flex-1 rounded-xl overflow-hidden relative min-h-[200px] md:min-h-[360px]"
//                           />
//                         </div>
//                       ) : (
//                         <TG_ReelsCard data={reel} />
//                       )
//                     )}
//                   </div>
//                 </div>
//               ) : null}

//               <div
//                 className="flex flex-wrap gap-4 lg:gap-4 xl:gap-4"
//                 itemScope
//                 itemType="https://schema.org/ItemList"
//               >
//                 <meta itemProp="numberOfItems" content={totalTyresCount} />
//                 <meta itemProp="itemListOrder" content="https://schema.org/ItemListOrderAscending" />

//                 {(reel ? initialTyres.slice(showReelAfter) : initialTyres).map((tractor, index) => {
//                   const position = index + 1 + (currentPage - 1) * itemsPerPage;
//                   const itemUrl = abs((currentLang === 'hi' ? '/hi' : '') + (tractor.page_url || ''));
//                   const imageUrl = tractor.image ? `https://images.tractorgyan.com/uploads${tractor.image}` : '';
//                   const avg = tractor.avg_review ?? tractor.avgRating ?? tractor.rating;
//                   const totalReviews = tractor.total_reviews ?? tractor.totalReview ?? tractor.review_count;
//                   const hasRating = avg !== undefined && avg !== null && totalReviews !== undefined && totalReviews !== null;
//                   const hasPrice = (tractor.price !== undefined && tractor.price !== null && tractor.price !== '') ||
//                     (tractor.price_min !== undefined && tractor.price_min !== null && tractor.price_min !== '');

//                   const useFallbackOffer = !hasRating && !hasPrice;

//                   const priceValue = (tractor.price ?? tractor.price_min ?? tractor.price_max ?? 0);

//                   return (
//                     <div
//                       key={tractor.id || `${tractor.brand}-${tractor.model}-${index}`}
//                       itemProp="itemListElement"
//                       itemScope
//                       itemType="https://schema.org/ListItem"
//                       className="w-full"
//                     >
//                       <meta itemProp="position" content={position.toString()} />

//                       <div itemProp="item" itemScope itemType="https://schema.org/Product" className="w-full">
//                         <meta itemProp="name" content={`${tractor.brand || ''} ${tractor.model || ''}`.trim()} />
//                         <link itemProp="url" href={itemUrl} />
//                         {imageUrl && <meta itemProp="image" content={imageUrl} />}

//                         {tractor.brand && (
//                           <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
//                             <meta itemProp="name" content={tractor.brand} />
//                           </div>
//                         )}

//                         {hasRating && (
//                           <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
//                             <meta itemProp="ratingValue" content={String(avg)} />
//                             <meta itemProp="reviewCount" content={String(totalReviews)} />
//                           </div>
//                         )}

//                         {(hasPrice || useFallbackOffer) && (
//                           <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
//                             <meta itemProp="url" content={itemUrl} />
//                             <meta itemProp="priceCurrency" content={tractor.currency || 'INR'} />
//                             <meta itemProp="price" content={String(priceValue)} />
//                             <meta
//                               itemProp="availability"
//                               content={
//                                 tractor.in_stock !== undefined
//                                   ? (tractor.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock')
//                                   : (useFallbackOffer ? 'https://schema.org/PreOrder' : 'https://schema.org/OutOfStock')
//                               }
//                             />
//                           </div>
//                         )}

//                         <TG_HorizontalCard
//                           title={`${tractor.brand} ${tractor.model}`}
//                           total_reviews={tractor.total_reviews || tractor.total_review || 0}
//                           avg_review={tractor.avg_review || 0}
//                           imageSrc={imageUrl}
//                           detailUrl={(currentLang == 'hi' ? '/hi' : '') + tractor.page_url}
//                           specs={{
//                             [translation?.tractorSpecs?.hp || 'HP']: tractor.hp,
//                             [translation?.tractorSpecs?.cylinders || 'Cylinder']: tractor.cylinder,
//                             [translation?.headerNavbar?.liftingCapacity || 'Lifting Capacity']: tractor.lifting_capacity,
//                           }}
//                           buttonText={translation?.headerNavbar?.checkPrice || "Check Price"}
//                           buttonPrefix="₹ "
//                           isPopular={tractor.popular_tractor === '1'}
//                           showRatingOnTop={pageType === 'tractors'}
//                           translation={translation}
//                           position={position}
//                           tractorId={tractor.id}
//                         />
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </>
//           )}

//           {pageType === 'used_tractors' && (
//             <div className="flex flex-wrap gap-4 lg:gap-4 xl:gap-4">
//               {initialTyres.map((tractor, index) => (
//                 <SecondHandTractorCard data={tractor} />
//               ))}
//             </div>
//           )}

//           {pageType === 'implements' && (
//             <div className="flex flex-wrap gap-4 lg:gap-4 xl:gap-4">
//               {initialTyres?.map((implement, index) => (
//                 <TG_HorizontalCard
//                   title={`${implement.brand_name} ${implement.model}`}
//                   imageSrc={`https://images.tractorgyan.com/uploads${implement.image}`}
//                   detailUrl={implement?.page_url}
//                   specs={{ HP: implement?.implement_power }}
//                   buttonText={translation.headerNavbar.ViewPrice}
//                   buttonPrefix="₹ "
//                   isPopular={implement?.popular_implement === "Yes" ? true : false}
//                   translation={translation} // Pass translation
//                 />
//               ))}
//             </div>
//           )}

//           {totalPages > 1 && ( 
//             <div className="mt-8 flex items-center justify-center space-x-4 text-center">
//               {currentPage > 1 && (
//                 <Link
//                   href={buildPageLink(currentPage - 1)}
//                   className="hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-lg text-white"
//                 >
//                   {translation?.buttons?.previous || 'Previous'}
//                 </Link>
//               )}
//               <span className="text-gray-700 text-lg">
//                 {translation?.headings?.page || 'Page'} {currentPage}{' '}
//                 {translation?.headings?.of || 'of'} {totalPages}
//               </span>
//               {currentPage < totalPages && (
//                 <Link
//                   href={buildPageLink(currentPage + 1)}
//                   className="hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-lg text-white"
//                 >
//                   {translation?.buttons?.next || 'Next'}
//                 </Link>
//               )}
//             </div>
//           )}

//           <div className="mt-1.5 text-center">
//             <span className="mx-auto text-sm text-gray-main">
//               {translation?.headings?.dataLastUpdatedOn || 'Data last updated on'}:{' '}
//               {currentDate}{' '}
//             </span>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TractorListing;
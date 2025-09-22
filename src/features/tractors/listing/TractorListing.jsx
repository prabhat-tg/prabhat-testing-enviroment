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
  const totalPages = Math.ceil((totalTyresCount || 0) / (itemsPerPage || 1));
  const showReelAfter = isMobile ? 1 : 3;

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

  const abs = (path) => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    const origin = (pageOrigin || '').replace(/\/$/, '');
    if (!origin) return path;
    return path.startsWith('/') ? `${origin}${path}` : `${origin}/${path}`;
  };

  // prepare items for schema the same way we render them
  const itemsForSchema = (reel ? (initialTyres || []).slice(showReelAfter) : (initialTyres || []));

  // build ItemList JSON-LD (ListItems point to WebPage to avoid Product validations)
  const itemListSchema = itemsForSchema.length > 0 ? 
  // {
  //   "@context": "https://schema.org",
  //   "@type": "ItemList",
  //   "name": `${translation?.headings?.hpGroupName || 'Tractors'}${pageType ? ` - ${pageType}` : ''}`,
  //   "numberOfItems": Number(totalTyresCount || itemsForSchema.length),
  //   "itemListOrder": "https://schema.org/ItemListOrderAscending",
  //   "itemListElement": itemsForSchema.map((tractor, i) => {
  //     const position = i + 1 + (Number(currentPage || 1) - 1) * (Number(itemsPerPage || 1));
  //     const url = abs((currentLang === 'hi' ? '/hi' : '') + (tractor?.page_url || ''));
  //     const name = `${tractor?.brand || ''} ${tractor?.model || ''}`.trim() || tractor?.page_url || `item-${position}`;
  //     return {
  //       "@type": "ListItem",
  //       "position": position,
  //       "item": {
  //         "@type": "WebPage",
  //         "url": url,
  //         "name": name
  //       }
  //     };
  //   })
  // } 
  {
	"@context": "https://schema.org/",
	"@type": "Product",
	"name": "All Tractor Price in India in 2025",

    "aggregateRating": {
		"@type": "AggregateRating",
		"reviewCount": "15548",
		"worstRating": "1",
		"bestRating": "5",
		"ratingValue": "4.5"
	},
  "review": [
    		{
			"@type": "Review",
			"author": {
				"@type": "Person",
				"name": "Anilkumar"
			},
			"description": "This tractor help in long farming work. It run smooth, no heat, and no refuel problem. Very comfy and good for daily use. Happy with it.",
			"reviewRating": {
				"@type": "Rating",
				"ratingValue": "5"
			}
		}
    ,    		{
			"@type": "Review",
			"author": {
				"@type": "Person",
				"name": "B  S  Sangwan"
			},
			"description": "Bale wrappers ko efficiently operate karte waqt yeh tractor kaafi strong hai. Yeh wrappers ko smoothly run kar ke hay ko tightly wrap kar leta hai.",
			"reviewRating": {
				"@type": "Rating",
				"ratingValue": "5"
			}
		}
    ,    		{
			"@type": "Review",
			"author": {
				"@type": "Person",
				"name": "Arjun waware"
			},
			"description": "Saving on fuel costs without sacrificing power, this tractor is perfect for those who need an eco-friendly, cost-effective solution.",
			"reviewRating": {
				"@type": "Rating",
				"ratingValue": "5"
			}
		}
    ,    		{
			"@type": "Review",
			"author": {
				"@type": "Person",
				"name": "Banti singh"
			},
			"description": "Built to handle long hours in the field, this tractor is as efficient as it is durable, making it ideal for everyday heavy-duty work.",
			"reviewRating": {
				"@type": "Rating",
				"ratingValue": "5"
			}
		}
    ,    		{
			"@type": "Review",
			"author": {
				"@type": "Person",
				"name": "Sunil sahani"
			},
			"description": "If you are interested in purchasing a tractor, then this tractor is the best choice for every manner.",
			"reviewRating": {
				"@type": "Rating",
				"ratingValue": "5"
			}
		}
    ,    		{
			"@type": "Review",
			"author": {
				"@type": "Person",
				"name": "Anil Kumar"
			},
			"description": "I have a small greenhouse, and this tractor is fantastic for hauling supplies like soil, fertilizers, and tools to and from the site. It saves me so much time moving things around.",
			"reviewRating": {
				"@type": "Rating",
				"ratingValue": "5"
			}
		}
    ,    		{
			"@type": "Review",
			"author": {
				"@type": "Person",
				"name": "maulik patel"
			},
			"description": "Cleaning and maintaining the tractor is very easy, which reduces downtime.",
			"reviewRating": {
				"@type": "Rating",
				"ratingValue": "4"
			}
		}
    ,    		{
			"@type": "Review",
			"author": {
				"@type": "Person",
				"name": "Parmar narendra"
			},
			"description": "kaafi fast aur reliable hai, jo distant fields tak easily pohonchne mein madad karta hai.",
			"reviewRating": {
				"@type": "Rating",
				"ratingValue": "5"
			}
		}
    ,    		{
			"@type": "Review",
			"author": {
				"@type": "Person",
				"name": "Sumit"
			},
			"description": "This tractor offers a 25 HP engine and perfect for many agricultural activities.",
			"reviewRating": {
				"@type": "Rating",
				"ratingValue": "5"
			}
		}
    ,    		{
			"@type": "Review",
			"author": {
				"@type": "Person",
				"name": "Rakesh bharvad"
			},
			"description": "This tractor is perfect for all  farming needs . So, if anyone is planning to buy 45 hp in 2024, then it is best for them.",
			"reviewRating": {
				"@type": "Rating",
				"ratingValue": "5"
			}
		}
        	],
  
	"offers": {
	  "@type": "AggregateOffer",
		"lowPrice": 244118,
		"highPrice": 2791800,
		"priceCurrency": "INR",
		"offerCount": 30,
		"offers": [
                {
                    "@type": "Offer",
          "name": "Swaraj 855 FE",
          "price": "Rs. 7.87 Lakh  - 8.37 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/swaraj-tractor/855-fe/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Massey Ferguson 241 DI MAHA SHAKTI",
          "price": "Rs. 6.33 Lakh  - 6.84 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/massey-ferguson-tractor/241-di-maha-shakti/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Mahindra 575 DI XP Plus",
          "price": "Rs. 6.94 Lakh  - 7.31 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/mahindra-tractor/575-di-xp-plus/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Swaraj 735 FE",
          "price": "Rs. 5.83 Lakh  - 6.18 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/swaraj-tractor/735-fe/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Swaraj 744 FE",
          "price": "Rs. 6.88 Lakh  - 7.37 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/swaraj-tractor/744-fe/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Swaraj 744 XT",
          "price": "Rs. 6.95 Lakh  - 7.47 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/swaraj-tractor/744-xt/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Powertrac Digitrac PP 46i",
          "price": "Rs. 8.23 Lakh  - 8.46 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/powertrac-tractor/digitrac-pp-46i/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "New Holland 3630 Tx Special Edition",
          "price": "Rs. 8.84 Lakh ",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/new-holland-tractor/3630-tx-special-edition/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "John Deere 5050 D",
          "price": "Rs. 7.96 Lakh  - 8.67 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/john-deere-tractor/5050-d/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Swaraj 855 FE 4WD",
          "price": "Rs. 9.27 Lakh  - 9.85 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/swaraj-tractor/855-fe-4wd/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Massey Ferguson 1035 DI",
          "price": "Rs. 5.65 Lakh  - 5.91 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/massey-ferguson-tractor/1035-di/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Sonalika DI 35",
          "price": "Rs. 5.31 Lakh  - 5.62 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/sonalika-tractor/di-35/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Farmtrac 60 PowerMaxx",
          "price": "Rs. 7.44 Lakh  - 7.74 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/farmtrac-tractor/60-epi-t20-powermaxx/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Mahindra 475 DI",
          "price": "Rs. 6.49 Lakh  - 6.79 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/mahindra-tractor/475-di/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Mahindra YUVO 585 MAT 4WD",
          "price": "Rs. 7.79 Lakh  - 8.10 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/mahindra-tractor/yuvo-585-mat-4wd/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Mahindra 575 DI",
          "price": "Rs. 6.84 Lakh  - 7.14 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/mahindra-tractor/575-di/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Mahindra Arjun 555 DI",
          "price": "Rs. 7.85 Lakh  - 8.10 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/mahindra-tractor/arjun-555-di/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Mahindra 275 DI TU",
          "price": "Rs. 5.78 Lakh  - 5.98 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/mahindra-tractor/275-di-tu/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Powertrac Euro 50",
          "price": "Rs. 7.61 Lakh  - 7.90 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/powertrac-tractor/euro-50/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "John Deere 5050 D - 4WD",
          "price": "Rs. 9.57 Lakh  - 10.46 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/john-deere-tractor/5050-d-4wd/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Sonalika 745 DI III Sikander",
          "price": "Rs. 6.47 Lakh  - 6.73 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/sonalika-tractor/745-di-iii-sikander/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Eicher 380",
          "price": "Rs. 5.88 Lakh  - 6.58 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/eicher-tractor/380-super-di/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "John Deere 5210",
          "price": "Rs. 8.36 Lakh  - 9.17 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/john-deere-tractor/5210/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Farmtrac 45 Powermaxx",
          "price": "Rs. 6.86 Lakh  - 7.43 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/farmtrac-tractor/45-powermaxx/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Swaraj Target 630",
          "price": "Rs. 5.33 Lakh ",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/swaraj-tractor/target-630/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Mahindra ARJUN NOVO 605 DI–i-4WD",
          "price": "Rs. 10.01 Lakh  - 10.71 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/mahindra-tractor/arjun-605-di-4wd/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Swaraj 735 XT",
          "price": "Rs. 5.93 Lakh  - 6.33 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/swaraj-tractor/735-xt/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Mahindra 265 DI",
          "price": "Rs. 5.16 Lakh  - 5.32 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/mahindra-tractor/265-di/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Swaraj 742 XT",
          "price": "Rs. 6.38 Lakh  - 6.73 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/swaraj-tractor/742-xt/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
        ,                {
                    "@type": "Offer",
          "name": "Massey Ferguson 245 DI",
          "price": "Rs. 7.01 Lakh  - 7.56 Lakh",
          "priceCurrency": "INR",
          "url":"https://www.tractorjunction.com/massey-ferguson-tractor/245-di/",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock"
        }
                    ]
	}
}
  : null;

  const itemListJson = itemListSchema ? JSON.stringify(itemListSchema).replace(/<\/script>/gi, '<\\/script>') : null;

  return (
    <>
      {/* Server-rendered JSON-LD for ItemList (crawler-friendly). This does not remove or change any visible markup. */}
      {itemListJson && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: itemListJson }} />}

      {/* ========== VISIBLE UI (unchanged) ========== */}
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
                    itemScope
                    itemType="https://schema.org/ItemList"
                  >
                    <div className="flex flex-1 flex-col gap-4 lg:gap-4 w-full max-w-[420px]">
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
                          position={index + 1 + (currentPage - 1) * itemsPerPage}
                          tractorId={tractor.id}
                        />
                      ))}
                    </div>

                    <div className="flex flex-1 w-full max-w-[420px] items-stretch">
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

                <div
                  className="flex flex-wrap gap-4 lg:gap-4 xl:gap-4"
                  itemScope
                  itemType="https://schema.org/ItemList"
                >
                  <meta itemProp="numberOfItems" content={totalTyresCount} />
                  <meta itemProp="itemListOrder" content="https://schema.org/ItemListOrderAscending" />

                  {(reel ? initialTyres.slice(showReelAfter) : initialTyres).map((tractor, index) => {
                    const position = index + 1 + (currentPage - 1) * itemsPerPage;
                    const itemUrl = abs((currentLang === 'hi' ? '/hi' : '') + (tractor.page_url || ''));
                    const imageUrl = tractor.image ? `https://images.tractorgyan.com/uploads${tractor.image}` : '';
                    const avg = tractor.avg_review ?? tractor.avgRating ?? tractor.rating;
                    const totalReviews = tractor.total_reviews ?? tractor.totalReview ?? tractor.review_count;
                    const hasRating = avg !== undefined && avg !== null && totalReviews !== undefined && totalReviews !== null;
                    const hasPrice = (tractor.price !== undefined && tractor.price !== null && tractor.price !== '') ||
                      (tractor.price_min !== undefined && tractor.price_min !== null && tractor.price_min !== '');

                    const useFallbackOffer = !hasRating && !hasPrice;
                    const priceValue = (tractor.price ?? tractor.price_min ?? tractor.price_max ?? 0);

                    return (
                      <div
                        key={tractor.id || `${tractor.brand}-${tractor.model}-${index}`}
                        itemProp="itemListElement"
                        itemScope
                        itemType="https://schema.org/ListItem"
                        className="w-full"
                      >
                        <meta itemProp="position" content={position.toString()} />

                        <div itemProp="item" itemScope itemType="https://schema.org/Product" className="w-full">
                          <meta itemProp="name" content={`${tractor.brand || ''} ${tractor.model || ''}`.trim()} />
                          <link itemProp="url" href={itemUrl} />
                          {imageUrl && <meta itemProp="image" content={imageUrl} />}

                          {tractor.brand && (
                            <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
                              <meta itemProp="name" content={tractor.brand} />
                            </div>
                          )}

                          {hasRating && (
                            <div itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                              <meta itemProp="ratingValue" content={String(avg)} />
                              <meta itemProp="reviewCount" content={String(totalReviews)} />
                            </div>
                          )}

                          {(hasPrice || useFallbackOffer) && (
                            <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                              <meta itemProp="url" content={itemUrl} />
                              <meta itemProp="priceCurrency" content={tractor.currency || 'INR'} />
                              <meta itemProp="price" content={String(priceValue)} />
                              <meta
                                itemProp="availability"
                                content={
                                  tractor.in_stock !== undefined
                                    ? (tractor.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock')
                                    : (useFallbackOffer ? 'https://schema.org/PreOrder' : 'https://schema.org/OutOfStock')
                                }
                              />
                            </div>
                          )}

                          <TG_HorizontalCard
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
                        </div>
                      </div>
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
                {currentPage < totalPages && (
                  <Link
                    href={buildPageLink(currentPage + 1)}
                    className="hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-lg text-white"
                  >
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
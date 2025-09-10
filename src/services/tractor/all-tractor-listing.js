import { postData } from '../apiMethods';

export async function getAllTractorListing(
  itemsPerPage,
  page,
  brandName,
  searchKeyword,
  popularTractor,
  latestTractor,
  hpRangeFilter,
  currentLang,
  page_url = null,
) {
  try {
    const startLimit = (page - 1) * itemsPerPage;
    const endLimit = page * itemsPerPage;

    const result = await postData('/api/v2/tractor_list_by_brand', {
      brand_name: brandName,
      search_keyword: searchKeyword,
      start_limit: startLimit,
      end_limit: endLimit,
      lang: currentLang,
      popular_tractor: popularTractor,
      latest_tractor: latestTractor,
      hp_range_filter: hpRangeFilter,
      page_url: page_url,
    });

    console.log("[getAllTractorListing] Result:", page_url, result);


    if (result && result.success) {
      return {
        items: result.data || [],
        totalCount: result.count || 0,
      };
    }

    return { items: [], totalCount: 0 };
  } catch (error) {
    console.error('Error fetching tractor listing:', error);
    throw error;
  }
}

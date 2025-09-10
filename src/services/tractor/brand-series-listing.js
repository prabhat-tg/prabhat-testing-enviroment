import { postData } from '../apiMethods';

export async function getBrandSeriesListing(
  itemsPerPage,
  page,
  brandName,
  seriesName,
  searchKeyword,
  popularTractor,
  latestTractor,
  hpRangeFilter,
  currentLang
) {
  try {
    const startLimit = (page - 1) * itemsPerPage;
    const endLimit = page * itemsPerPage;

    const result = await postData('/api/brand_series_listing', {
      brand_name: brandName,
      series_name: seriesName,
      search_keyword: searchKeyword,
      start_limit: startLimit,
      end_limit: endLimit,
      lang: currentLang,
      popular_tractor: popularTractor,
      latest_tractor: latestTractor,
      hp_range_filter: hpRangeFilter,
    });

    console.log('Brand series listing result:', {
      brand_name: brandName,
      series_name: seriesName,
      search_keyword: searchKeyword,
      start_limit: startLimit,
      end_limit: endLimit,
      lang: currentLang,
      popular_tractor: popularTractor,
      latest_tractor: latestTractor,
      hp_range_filter: hpRangeFilter,
    },);

    if (result && result.success) {
      return {
        items: result.data || [],
        totalCount: result.count || 0,
      };
    }

    return { items: [], totalCount: 0 };
  } catch (error) {
    console.error('Error fetching brand series listing:', error);
    throw error;
  }
}

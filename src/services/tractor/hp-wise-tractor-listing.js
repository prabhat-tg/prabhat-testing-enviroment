import { postData } from '../apiMethods';

export async function getHpWiseTractorListing(
  itemsPerPage,
  page,
  hpSlug,
  searchKeyword,
  popularTractor,
  latestTractor,
  currentLang,
  brand = null
) {
  try {
    const startLimit = (page - 1) * itemsPerPage;
    const endLimit = page * itemsPerPage;
    console.log('Fetching HP-wise tractor listing:', {
      hpSlug,
      searchKeyword,
      startLimit,
      endLimit,
      currentLang,
      popularTractor,
      latestTractor,
      brand
    });
    const result = await postData('/api/tractor_listing_hp_wise', {
      hp_slug: hpSlug,
      search_keyword: searchKeyword,
      start_limit: startLimit,
      end_limit: endLimit,
      lang: currentLang,
      popular_tractor: popularTractor,
      latest_tractor: latestTractor,
      brand_name: brand
    });

    if (result && result.success) {
      result.data = result.data.map(item => ({
        ...item,
        image: '/' + item.image,
      }));

      return {
        items: result.data || [],
        totalCount: result.count || 0,
      };
    }

    return { items: [], totalCount: 0 };
  } catch (error) {
    console.error('Error fetching HP-wise tractor listing:', error);
    throw error;
  }
}

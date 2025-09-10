import { postData } from '../apiMethods';

export async function getAllTractorsListing({
  lang,
  start_limit,
  end_limit,
  search_keyword = '',
  popular_tractor = null,
  latest_tractor = null,
  hp_range_filter = null,
  brand_name = null,
  sort_by = null,
  sectionName,
}) {
  try {

    console.log("Fetching all tractors listing with params:", {
      section_name: sectionName,
      lang,
      start_limit,
      end_limit,
      search_keyword,
      popular_tractor,
      latest_tractor,
      hp_range_filter,
      sort_by,
      brand_name,
    });

    const result = await postData('/api/new_tractor_section_listing', {
      section_name: sectionName,
      lang,
      start_limit,
      end_limit,
      search_keyword,
      popular_tractor,
      latest_tractor,
      hp_range_filter,
      sort_by,
      brand_name,
    });

    console.log(
      'All tractors listing result:',
      {
        lang,
        start_limit,
        end_limit,
        search_keyword,
        popular_tractor,
        latest_tractor,
        hp_range_filter,
        sort_by,
        sectionName,
        brand_name,
      },
      result.data.length
    );

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
    console.error('Error fetching all tractors listing:', error);
    throw error;
  }
}

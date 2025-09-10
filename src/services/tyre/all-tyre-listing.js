import { postData } from '../apiMethods';

export async function getAllTyreListing(
  itemsPerPage, // Changed from endLimit
  page, // New parameter
  pageType,
  pageName,
  brandSlug,
  selectedSize,
  popularTyre,
  latestTyre,
  search,
  currentLang,
  id
) {
  // const offset = (page - 1) * itemsPerPage; // Calculate offset if backend expects offset

  try {
    const result = await postData('/api/all_tyre_listing', {
      // Pagination parameters (assuming backend supports 'page' and 'limit')
      page: page,
      limit: itemsPerPage,
      start_limit: (page - 1) * itemsPerPage,
      end_limit: page * itemsPerPage,
      id: id,
      // Existing filter parameters
      page_type: pageType || null,
      slug: pageName,
      brand_name: brandSlug,
      size: selectedSize,
      popular_tyre: popularTyre,
      latest_tyre: latestTyre,
      search_keyword: search,
      lang: currentLang,
    });

    console.log(
      'getAllTyreListing result:',
      {
        // Pagination parameters (assuming backend supports 'page' and 'limit')
        page: page,
        limit: itemsPerPage,
        start_limit: (page - 1) * itemsPerPage,
        end_limit: page * itemsPerPage,
        id: id,
        // Existing filter parameters
        page_type: pageType || null,
        slug: pageName,
        brand_name: brandSlug,
        size: selectedSize,
        popular_tyre: popularTyre,
        latest_tyre: latestTyre,
        search_keyword: search,
        lang: currentLang,
      },
      result
    );

    // Process the 'result' to ensure the function returns { items: Array, totalCount: Number }
    // if (result && result.totalCount !== undefined) {
    if (result) {
      if (Array.isArray(result.data)) {
        // Case 2: Backend returns { data: [], totalCount: N }
        return { items: result.data, totalCount: result?.count || 0 };
      }
    }

    // If no valid structure with totalCount is found, log an error and return a default.
    // This indicates a mismatch with the backend or an error in the backend response.
    // Return a structure that won't break the calling code, but clearly indicates an issue.
    // If result.data is an array (old behavior), use it, otherwise empty array.
    const itemsArray = Array.isArray(result)
      ? result
      : Array.isArray(result?.data)
        ? result.data
        : [];
    return { items: itemsArray, totalCount: result?.count || 0 };
  } catch (error) {
    console.error('Error fetching tyre listing (exception caught):', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

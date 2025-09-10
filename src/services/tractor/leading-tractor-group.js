import { postData } from '../apiMethods';

export async function getLeadingTractorGroup(lang = 'en') {
  try {
    const result = await postData('/api/leading_tractor_group', { lang });

    if (result?.success && result?.data) {
      // Transform the data to match component expectations
      const transformedData = result.data.map(item => ({
        ...item,
        brand_name: item.name, // Map 'name' to 'brand_name' for component compatibility
        brand_name_hi: item.name_hi || item.name, // Use name_hi if available, fallback to name
        // Clean image path - remove leading slash if present and add base URL
        image: item.image.startsWith('/')
          ? `https://images.tractorgyan.com/uploads${item.image}`
          : item.image,
      }));

      console.log('Transformed Leading Tractor Group Data:', transformedData);

      return transformedData;
    }

    console.warn('Leading tractor group API returned no data');
    return [];
  } catch (error) {
    console.error('Error fetching leading tractor group:', error);
    return []; // Return empty array as fallback
  }
}

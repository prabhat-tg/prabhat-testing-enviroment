import { postData } from '../apiMethods';

export async function getAllPriceList({ lang: currentLang, tyre_slug: pageName }) {
  try {
    const result = await postData('/api/all_price_list', {
      lang: currentLang,
      tyre_slug: pageName,
    });

    console.log('Price list API response:', {
      lang: currentLang,
      tyre_slug: pageName,
    }, result);


    // Format tyre_price with comma separation for better readability
    if (result?.data && Array.isArray(result.data)) {
      const formattedData = result.data.map(item => ({
        ...item,
        tyre_price: item.tyre_price
          ? parseInt(item.tyre_price).toLocaleString('en-IN')
          : item.tyre_price,
      }));
      return formattedData;
    }

    return result?.data ? result.data : [];
  } catch (error) {
    console.error('Error fetching price list :', error);
    return [];
  }
}

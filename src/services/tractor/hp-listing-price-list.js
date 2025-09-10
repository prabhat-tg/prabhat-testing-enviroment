import { postData } from '../apiMethods';

// Helper function to format price with Indian currency formatting
function formatIndianPrice(price) {
  const numPrice = parseInt(price);
  if (isNaN(numPrice)) return price;

  // Convert to Indian currency format with commas
  const formattedPrice = numPrice.toLocaleString('en-IN');
  return `₹${formattedPrice}`;
}

// Helper function to format price range
function formatPriceRange(priceRange) {
  if (!priceRange || typeof priceRange !== 'string') return priceRange;

  // Split the price range by ' - ' or '-'
  const prices = priceRange.split(/\s*-\s*/);

  if (prices.length === 2) {
    const minPrice = formatIndianPrice(prices[0].trim());
    const maxPrice = formatIndianPrice(prices[1].trim());
    return `${minPrice} - ${maxPrice}`;
  }

  // If it's a single price, just format it
  return formatIndianPrice(priceRange);
}

export async function getHpListingPriceList(hpSlug, currentLang) {
  try {
    const result = await postData('/api/hp_listing_price_list', {
      hp_slug: hpSlug,
      lang: currentLang,
    });

    if (result && result.success) {
      // Format the price range in the response data
      const formattedData =
        result?.data?.map(item => ({
          ...item,
          price_range: formatPriceRange(item.price_range),
        })) || [];

      return formattedData;
    }

    return [];
  } catch (error) {
    console.error('Error fetching HP listing price list:', error);
    throw error;
  }
}

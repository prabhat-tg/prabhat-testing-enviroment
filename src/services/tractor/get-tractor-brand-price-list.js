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

export async function getTractorBrandPriceList(payload) {
  try {
    console.log('Tractor brand price list :', payload);
    const result = await postData('api/tractor_brand_price_list', payload);


    // Format the price range in the response data
    const formattedData =
      result?.data?.map(item => ({
        ...item,
        price_range: formatPriceRange(item.price_range),
      })) || [];

    return formattedData;
  } catch (error) {
    console.error('Error fetching tractor brand price list :', error);
    return []; // Return empty array on error
  }
}

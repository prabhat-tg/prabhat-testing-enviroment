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

export async function getNewTractorSectionPriceList({ section_name, lang = 'en' }) {
    try {
        const payload = {
            section_name,
            lang,
        };

        const response = await postData('api/new_tractor_section_price_list', payload);

        if (!response || !response.data) {
            console.error('No data received from new_tractor_section_price_list API');
            return [];
        }

        // Format the price data
        const formattedData = response.data.map(item => ({
            ...item,
            price_range: item.price_range ? formatPriceRange(item.price_range) : 'Price on Request',
        }));

        return formattedData;
    } catch (error) {
        console.error('Error fetching new tractor section price list:', error);
        throw error;
    }
}

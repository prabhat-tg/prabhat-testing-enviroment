import { postData } from '../apiMethods';

export async function getImplementTypePriceList({ implement_type: pageName }) {
    try {
        const result = await postData('/api/implement_type_common_main_list', {
            implement_type: pageName,
        });

        console.log('type Price list API response:', {
            implement_type: pageName,
        }, result);


        // Format price with proper handling of both tyre_price and price keys
        if (result?.data && Array.isArray(result.data)) {
            const formattedData = result.data.map(item => {
                // Check both tyre_price and price keys
                const priceValue = item.tyre_price || item.price;
                let formattedPrice = 'Price on Request';

                // Check if price exists and is not 'No' or empty
                if (priceValue && priceValue !== 'No' && priceValue.toString().trim() !== '') {
                    // Parse and format the price with comma separation and rupee symbol
                    const numericPrice = parseInt(priceValue.toString().replace(/[^\d]/g, ''));
                    if (!isNaN(numericPrice) && numericPrice > 0) {
                        formattedPrice = `₹ ${numericPrice.toLocaleString('en-IN')}`;
                    }
                }

                return {
                    ...item,
                    price: formattedPrice,
                };
            });
            return formattedData;
        }

        return result?.data ? result.data : [];
    } catch (error) {
        console.error('Error fetching price list :', error);
        return [];
    }
}

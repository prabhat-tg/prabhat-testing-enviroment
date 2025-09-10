import { postData } from '../apiMethods';

export async function getTyreNewsByBrand(brands) {
  console.log('Fetching tyre brand news...', brands);
  try {
    const encodedBrands = encodeURIComponent(brands);
    const result = await postData(`/api/tyre_brand_news?brand_name=${encodedBrands}`);

    // Key mapping
    const keyMap = {
      'tyre-news': 'tyre-news',
      mrf: 'Mrf Tyre',
      jk: 'Jk Tyre',
      apollo: 'Apollo Tyre',
      ceat: 'Ceat Tyre',
    };

    const data = result?.data || {};
    const mappedData = {};

    Object.keys(keyMap).forEach(key => {
      if (data[key]) {
        mappedData[keyMap[key]] = data[key];
      }
    });

    return mappedData;
  } catch (error) {
    console.error('Error fetching tyre brand news:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

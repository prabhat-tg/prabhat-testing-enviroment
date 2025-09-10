import { fetchData, } from '../apiMethods';

export async function getCompareTractorsList() {
  try {
    const result = await fetchData('/api/get_compare_tractor_list');

    console.log('Compare Tracotrs List::', result)
    if (result.success && result.data) {
      return result.data.map(item => ({
        tractor1: {
          id: item.id_1,
          brand: item.brand_1,
          model: item.model_1,
          hp: item.hp_1,
          cylinder: item.cylinder_1,
          lifting_capacity: item.lifting_capacity_1,
          image: item.image_1,
        },
        tractor2: {
          id: item.id_2,
          brand: item.brand_2,
          model: item.model_2,
          hp: item.hp_2,
          cylinder: item.cylinder_2,
          lifting_capacity: item.lifting_capacity_2,
          image: item.image_2,
        },
        page_url: item.page_url,
        sno: item.sno,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching compare tractors list:', error);
    throw error;
  }
};



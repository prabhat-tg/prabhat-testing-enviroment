import { postData } from '../apiMethods';

export async function getOtherTractorModels({
  id,
  lang = 'en',
  startLimit = 0,
  endLimit = 5,
}) {
  try {
    const result = await postData('/api/other_tractor_models', {
      id,
      lang: lang,
      start_limit: startLimit,
      end_limit: endLimit,
    });

    // Transform the data to match the format expected by RelatedTyres component
    const transformedData =
      result?.data?.map(tractor => ({
        id: tractor.id,
        brand: tractor.brand,
        model: tractor.model,
        title: tractor.model, // for compatibility with tyres
        brandName: tractor.brand, // for compatibility with tyres
        hp: tractor.hp,
        cylinder: tractor.cylinder,
        image: tractor.image?.startsWith('/') ? tractor.image.substring(1) : tractor.image,
        imgUrl: tractor.image?.startsWith('/') ? tractor.image.substring(1) : tractor.image, // for compatibility with tyres
        lifting_capacity: tractor.lifting_capacity,
        popular_tractor: tractor.popular_tractor,
        popularTyre: tractor.popular_tractor === '1' ? 'Yes' : 'No', // for compatibility with tyres
        page_url: tractor.page_url,
        pageUrl: tractor.page_url, // for compatibility with tyres
        total_review: tractor.total_review,
        reviews: tractor.total_review, // for compatibility with tyres
        avg_review: tractor.avg_review,
        rating: tractor.avg_review, // for compatibility with tyres
        created_at: tractor.created_at,
        sno: tractor.sno,
      })) || [];

    return transformedData;
  } catch (error) {
    console.error('Error fetching other tractor models:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

import { fetchData, postData } from '../apiMethods';

export async function getAllTractorNews(newsType = 'tractor-news') {
  console.log('Fetching tractor news...', newsType);
  try {
    const encodedNewsType = encodeURIComponent(newsType);
    const result = await postData(`/api/all_tractor_news?news_type=${encodedNewsType}`);
    return result.data;
  } catch (error) {
    console.error('Error fetching tractor news:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

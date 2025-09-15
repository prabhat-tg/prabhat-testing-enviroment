import { postData } from '../apiMethods';

export async function getRelatedImplements({ implement_type, id, lang }) {
  try {
    const result = await postData('/api/implement_related', {
      implement_type,
      id,
      lang,
    });
    console.log('Related Implements for', implement_type, '::', result);
    return result.data || [];
  } catch (error) {
    console.error('Error fetching related implement:', error);
    throw error;
  }
}

import { fetchData, postData } from '../apiMethods';

/**
 * Get home videos by video type
 * @param {string} videoType - Type of videos: "videos", "reels", or "webstories"
 * @returns {Promise<Array>} Array of video items
 */
export async function getHomeVideos(videoType = 'videos') {
  try {
    const endpoint = `api/home_videos?video_type=${videoType}`;
    const result = await postData(endpoint);

    if (!result?.data) {
      console.warn(`No ${videoType} data found`);
      return [];
    }

    return result.data;
  } catch (error) {
    console.error(`Error fetching home ${videoType}:`, error);
    return []; // Return empty array instead of throwing to prevent UI crashes
  }
}

/**
 * Convenience method for fetching home videos
 */
export async function getHomeVideosList() {
  return getHomeVideos('videos');
}

/**
 * Convenience method for fetching home reels
 */
export async function getHomeReelsList() {
  return getHomeVideos('reels');
}

/**
 * Convenience method for fetching home webstories
 */
export async function getHomeWebstoriesList() {
  return getHomeVideos('webstories');
}

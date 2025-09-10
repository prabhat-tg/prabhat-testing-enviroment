import { postData } from "../apiMethods";

/**
 * Get tyre brand media content (videos, reels, webstories)
 * @param {string} mediaType - Type of media: "videos", "reels", or "webstories"
 * @param {string} slug - The brand slug or tag to filter content
 * @returns {Promise<Array>} Array of media items
 */
export async function getImplementMedia(mediaType, slug) {
  try {
    let endpoint;
    let payload;

    if (mediaType === "webstories") {
      endpoint = "/api/implement_webstory";
      payload = { video_type: mediaType, webstory_tag: slug };
    } else {
      endpoint = "/api/implement_videos";
      payload = { video_type: mediaType, video_tag: slug };
    }

    const result = await postData(endpoint, payload);

    if (!result?.data) {
      console.warn(`No ${mediaType} data found for slug: ${slug}`);
      return [];
    }

    return result.data;
  } catch (error) {
    console.error(`Error fetching ${mediaType} for ${slug}:`, error);
    return []; // Return empty array instead of throwing to prevent UI crashes
  }
}

export async function getImplementVideos(slug) {
  return getImplementMedia("videos", slug);
}

export async function getImplementReels(slug) {
  return getImplementMedia("reels", slug);
}

export async function getImplementWebstories(slug) {
  return getImplementMedia("webstories", slug);
}

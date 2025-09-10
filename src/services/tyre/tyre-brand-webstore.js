import { fetchData, postData } from "../apiMethods";

/**
 * Get tyre brand media content (videos, reels, webstories)
 * @param {string} mediaType - Type of media: "videos", "reels", or "webstories"
 * @param {string} slug - The brand slug or tag to filter content
 * @returns {Promise<Array>} Array of media items
 */
export async function getTyreMedia(mediaType, slug) {
  try {
    let endpoint;
    let payload;

    if (mediaType === "webstories") {
      endpoint = "/api/tyre_brand_webstory";
      payload = { video_type: mediaType, webstory_tag: slug };
    } else {
      endpoint = "/api/tyre_brand_videos";
      payload = { video_type: mediaType, video_tag: slug };
    }

    console.log("Fetching tyre media with payload:", payload, endpoint);

    // Use the postData method for POST requests with payload
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

/**
 * Convenience method for fetching videos
 */
export async function getTyreVideos(slug) {
  return getTyreMedia("videos", slug);
}

/**
 * Convenience method for fetching reels
 */
export async function getTyreReels(slug) {
  return getTyreMedia("reels", slug);
}

/**
 * Convenience method for fetching webstories
 */
export async function getTyreWebstories(slug) {
  return getTyreMedia("webstories", slug);
}

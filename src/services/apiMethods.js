import { getApiUrl } from "../utils/utils";

// Blog-related endpoints that get 60s cache (Google Discover friendly)
const BLOG_ENDPOINTS = [
  'blog_detail',
  'blog_list',
  'blog_search',
  'blog_tag',
  'read_more_blogs',
  'popular_blog_list',
  'all_faq', // blog FAQs
  'webstory_category',
  'blog_category'
];

// Check if endpoint is blog-related
const isBlogEndpoint = (endpoint) => {
  return BLOG_ENDPOINTS.some(blogEndpoint =>
    endpoint.includes(blogEndpoint)
  );
};

// Get cache configuration
const getCacheConfig = (endpoint) => {
  if (isBlogEndpoint(endpoint)) {
    // 60s cache for blogs (fresh for Google Discover)
    return { next: { revalidate: 60 } };
  }

  // 600s cache for other endpoints (performance optimization)
  return { next: { revalidate: 600 } };
};

// GET requests - maintains existing functionality
export const fetchData = async (endpoint) => {
  // console.log("Fetch data hit for : ", endpoint);

  try {
    const cacheConfig = getCacheConfig(endpoint);

    const response = await fetch(
      `${getApiUrl()}/${endpoint}`,
      cacheConfig
    );

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// POST requests - maintains existing functionality
export const postData = async (endpoint, data) => {
  try {
    const cacheConfig = getCacheConfig(endpoint);

    const response = await fetch(`${getApiUrl()}/${endpoint}`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      ...cacheConfig
    });

    return response.json();
  } catch (error) {
    if (error.response) {
      // Handle specific status codes
      if (error.response.status === 404) {
        // console.error("Resource not found (404):", endpoint);
        // Optionally, return a custom value or throw a custom error
        return { data: null, message: "Resource not found" };
      }
      // Handle other status codes if needed
    }
    console.error("Error posting data:", error);
    throw error;
  }
};
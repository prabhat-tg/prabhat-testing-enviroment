import { postData } from "../apiMethods";

export const addTyreRatingReview = async (data) => {
  try {
    const response = await postData("api/rating_review_store", data);
    return response;
  } catch (error) {
    console.error("Error adding tyre rating and review:", error);
    throw error;
  }
};

export const getTyreRatingReviews = async (modelId) => {
  try {
    const response = await postData("api/get_model_reviews", { id: modelId });
    console.log("Rating and Reviews Response:", modelId, response);

    return response;
  } catch (error) {
    console.error("Error fetching tyre rating and reviews:", error);
    throw error;
  }
};

export const getTractorReatingReviews = async (modelId) => {
  try {
    const response = await postData("api/get_tractor_model_reviews", { product_id: modelId });
    console.log("Tractor Rating and Reviews Response:", modelId, response);

    return response;
  } catch (error) {
    console.error("Error fetching tractor rating and reviews:", error);
    throw error;
  }
}

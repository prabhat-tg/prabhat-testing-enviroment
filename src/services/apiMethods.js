import { getApiUrl } from "../utils/utils";

// export const revalidate = 600;

// get requests

export const fetchData = async (endpoint) => {
  // console.log("Fetch data hit for : ", endpoint);

  try {
    const response = (
      await fetch(
        `${getApiUrl()}/${endpoint}`,
        // { next: { revalidate: 300 } }
      )
    ).json();
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// post request

export const postData = async (endpoint, data) => {
  try {
    const response = (
      await fetch(`${getApiUrl()}/${endpoint}`, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        // next: { revalidate: 600 },
      })
    ).json();

    return response;
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

import axios from "axios";
import apiUrl from "./apiUrl";

// create an axios instance with the base url

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiClient;

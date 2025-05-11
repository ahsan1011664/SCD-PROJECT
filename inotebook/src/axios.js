import axios from "axios";
import BASE_URL from "./config";

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Function to get the access token
const getAccessToken = () => {
  return localStorage.getItem("accessToken") || ""; 
};

// Add the Authorization header to all requests
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Generic GET request
export const getRequest = async (url, params = {}) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("GET Request Error:", error);
    throw error;
  }
};

// Generic POST request
export const postRequest = async (url, data = {}) => {
  try {
    const response = await axiosInstance.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("POST Request Error:", error);
    throw error;
  }
};

// Generic PUT request
export const putRequest = async (url, data = {}) => {
  try {
    const response = await axiosInstance.put(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("PUT Request Error:", error);
    throw error;
  }
};

// Generic DELETE request
export const deleteRequest = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error("DELETE Request Error:", error);
    throw error;
  }
};

// Form data POST
export const postFormData = async (url, data = {}) => {
  try {
    const response = await axiosInstance.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("POST FormData Error:", error);
    throw error;
  }
};

export default axiosInstance;
 
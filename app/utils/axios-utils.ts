"use client";

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getTokens } from "./token-utils";

// Create a base axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://6nzdi9apbg.execute-api.us-east-1.amazonaws.com/dev/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to inject auth token
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const tokens = await getTokens();

      if (tokens?.accessToken) {
        // Set the auth header with the token
        config.headers.Authorization = `${tokens.accessToken}`;
      }

      return config;
    } catch (error) {
      console.error("Error setting auth token in axios:", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to get a fresh token
        const tokens = await getTokens();

        if (tokens?.accessToken) {
          // Set the new token in the retried request
          originalRequest.headers.Authorization = `${tokens.accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Helper function for GET requests
export const get = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return axiosInstance.get(url, config).then((response: AxiosResponse<T>) => response.data);
};

// Helper function for POST requests
export const post = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return axiosInstance.post(url, data, config).then((response: AxiosResponse<T>) => response.data);
};

// Helper function for PUT requests
export const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return axiosInstance.put(url, data, config).then((response: AxiosResponse<T>) => response.data);
};

// Helper function for DELETE requests
export const del = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return axiosInstance.delete(url, config).then((response: AxiosResponse<T>) => response.data);
};

// Helper function for PATCH requests
export const patch = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return axiosInstance.patch(url, data, config).then((response: AxiosResponse<T>) => response.data);
};

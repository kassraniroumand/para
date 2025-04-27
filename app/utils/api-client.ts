// "use server"
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';
import { fetchSessionFromServer } from './amplify-server-util';

// Create a base axios instance
export const apiClient = axios.create({
  baseURL: "https://6nzdi9apbg.execute-api.us-east-1.amazonaws.com/dev",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach authentication token
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const session = await fetchAuthSession();
      // const sessionFromServer = await fetchSessionFromServer()
      // console.log("sessionFromServer", sessionFromServer);
      const token = session.tokens?.accessToken.toString();
      console.log("token", token);
      if (token) {
        config.headers.Authorization = `${token}`;
      }

      return config;
    } catch (error) {
      // If there's an error getting the token, proceed without authentication
      console.error('Error setting auth token:', error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error scenarios
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API error response:', error.response.status, error.response.data);

      // Handle authentication errors
      if (error.response.status === 401) {
        // You could trigger a sign-out or refresh token flow here
        console.error('Authentication token expired or invalid');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request error:', error.message);
    }

    return Promise.reject(error);
  }
);

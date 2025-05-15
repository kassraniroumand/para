// "use server"
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';

// Create a base axios instance
export const apiClientBlog = axios.create({
  baseURL: "https://377i7v8sek.execute-api.us-east-1.amazonaws.com/Prod",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to attach authentication token
// apiClient.interceptors.request.use
//   async (config) => {
//     try {
//       // const session = await fetchAuthSession();
//       // const sessionFromServer = await fetchSessionFromServer()
//       const user = await fetchAuthSession()
//       const token = user.tokens?.accessToken.toString();
//
//       if (token) {
//         config.headers.Authorization = `${token}`;
//       }
//       return config;
//     } catch (error) {
//       // If there's an error getting the token, proceed without authentication
//       return config;
//     }
//   },
//   (error) => Promise.reject(error)
// );
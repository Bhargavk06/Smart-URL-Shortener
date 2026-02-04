import axios from 'axios';

// Create custom axios instance
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

// Request logging
axiosInstance.interceptors.request.use(
  (request) => {
    console.info(
      `[Request] ${request.method.toUpperCase()} ${request.url}`,
      request.data || ''
    );
    return request;
  },
  (error) => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

// Response logging
axiosInstance.interceptors.response.use(
  (response) => {
    console.info(
      `[Response] ${response.status} ${response.config.url}`,
      response.data || ''
    );
    return response;
  },
  (error) => {
    console.error('[Response Error]', error.response || error.message);
    return Promise.reject(error);
  }
);

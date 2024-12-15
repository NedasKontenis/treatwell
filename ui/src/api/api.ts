import { PRS_AUTH_TOKEN } from '../constants/constants.js';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Request interceptors to handle the token before making any requests, for now adding this as base
// However, as likely some other endpoints added in the future will not require token, should probably not add to all requests
// anyway, leaving this for now
api.interceptors.request.use(
  (config) => {
    // using local storage as its the easiest way for storing tokens + as this will not be deployed or anything, does not really matter
    const token = localStorage.getItem(PRS_AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(PRS_AUTH_TOKEN);
      // TODO: will need to handle this to refresh the page
    }
    return Promise.reject(error);
  }
);

export { api };

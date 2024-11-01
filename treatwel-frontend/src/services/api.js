// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',  // Adjust as per your backend URL
});

export const loginUser = (userData) => api.post('/users/login', userData);
export const searchServices = (query) => api.get(`/services?search=${query}`);
export const makeReservation = (reservationData) => api.post('/reservations', reservationData);
export const getAllServices = () => api.get(`/api/services`);
export const registerUser = async (userData) => api.post('/users/register', userData);

export const createCompany = async (companyData) => api.post('/api/companies', companyData);

export const createService = async (serviceData) => api.post('/api/services', serviceData);

export default api;

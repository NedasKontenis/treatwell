// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',  // Adjust as per your backend URL
});

export const loginUser = (userData) => api.post('/users/login', userData);
export const searchServices = (query) => api.get(`/services?search=${query}`);
export const makeReservation = (reservationData) => api.post('/reservations', reservationData);

export const registerUser = async (userData) => {
    // Assuming backend endpoint for registration
    await axios.post('/users/register', userData);
};

export const createCompany = async (companyData) => {
    await axios.post('/api/companies', companyData);
};

export const createService = async (serviceData) => {
    await axios.post('/api/services', serviceData);
};

export default api;

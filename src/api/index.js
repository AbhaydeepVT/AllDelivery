import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchProducts = (params) => API.get('/products', { params });
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (userData) => API.post('/auth/register', userData);
export const fetchUserCart = () => API.get('/cart');
export const saveUserCart = (items) => API.put('/cart', { items });
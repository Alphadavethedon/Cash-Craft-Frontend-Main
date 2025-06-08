import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token') ? \Bearer \\ : ''
  }
});

// Loan endpoints
export const getLoans = () => API.get('/loans');
export const createLoan = (loanData) => API.post('/loans', loanData);
export const getLoanStatus = (id) => API.get(\/loans/\\);

// Auth endpoints
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (userData) => API.post('/auth/register', userData);

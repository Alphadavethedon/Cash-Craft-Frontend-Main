import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/user');
    return response.data;
  },
  updateProfile: async (userData: any) => {
    const response = await api.put('/user', userData);
    return response.data;
  },
};

// Loan services
export const loanService = {
  applyForLoan: async (loanData: any) => {
    const response = await api.post('/loans', loanData);
    return response.data;
  },
  getLoans: async () => {
    const response = await api.get('/loans');
    return response.data;
  },
  getLoanById: async (id: string) => {
    const response = await api.get(`/loans/${id}`);
    return response.data;
  },
};

// Repayment services
export const repaymentService = {
  makeRepayment: async (repaymentData: any) => {
    const response = await api.post('/repayments', repaymentData);
    return response.data;
  },
  getRepayments: async (loanId?: string) => {
    const url = loanId ? `/repayments?loanId=${loanId}` : '/repayments';
    const response = await api.get(url);
    return response.data;
  },
};

// M-Pesa services
export const mpesaService = {
  initiateSTK: async (phoneNumber: string, amount: number, accountReference: string) => {
    const response = await api.post('/mpesa/stk-push', {
      phoneNumber,
      amount,
      accountReference,
    });
    return response.data;
  },
  checkSTKStatus: async (checkoutRequestId: string) => {
    const response = await api.get(`/mpesa/stk-status/${checkoutRequestId}`);
    return response.data;
  },
};

// Credit score services
export const creditService = {
  getUserScore: async () => {
    const response = await api.get('/score');
    return response.data;
  },
};

// Dashboard stats
export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },
};

export default api;
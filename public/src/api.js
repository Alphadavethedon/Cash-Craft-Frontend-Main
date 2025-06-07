import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // if using cookies for auth
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
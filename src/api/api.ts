import axios from 'axios';

export const xuperApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
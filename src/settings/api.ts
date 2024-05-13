import {HttpRoutes} from './HttpRoutes';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: HttpRoutes.route,
});

// Request Interceptor to add the Authorization token to every request
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

export const getProjects = () => api.get(HttpRoutes.project.getAll.url);
export const getInvestments = () => api.get(HttpRoutes.investment.getAll.url);
export const getSellers = () =>
  api.get(HttpRoutes.investment.getAllSellers.url);
export const getCompanies = () => api.get(HttpRoutes.company.getAll.url);
export const getAllInvestment = () =>
  api.get(HttpRoutes.investment.getTotalInvestment.url);

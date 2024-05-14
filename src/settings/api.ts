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

const extractTotal = (response: any) => {
  if (response?.data?.metadata?.metadata?.total !== undefined) {
    return response.data.metadata.metadata.total;
  } else {
    return 0;
  }
};

export const getProjects = async () => {
  const response = await api.get(HttpRoutes.project.getAll.url);
  return extractTotal(response);
};

export const getInvestments = async () => {
  const response = await api.get(HttpRoutes.investment.getAll.url);
  return extractTotal(response);
};

export const getSellers = async () => {
  const response = await api.get(HttpRoutes.investment.getAllSellers.url);
  return extractTotal(response);
};

export const getCompanies = async () => {
  const response = await api.get(HttpRoutes.company.getAll.url);
  return extractTotal(response);
};

export const getAllInvestment = async () => {
  const response = await api.get(HttpRoutes.investment.getTotalInvestment.url);
  if (response?.data?.metadata !== undefined) {
    return {
      totalInvested: response.data.metadata.totalInvested || 0,
      totalYield: response.data.metadata.totalYield || 0,
    };
  } else {
    return {
      totalInvested: 0,
      totalYield: 0,
    };
  }
};

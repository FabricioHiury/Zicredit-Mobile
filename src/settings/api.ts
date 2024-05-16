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

const extractData = (response: any) => {
  if (response?.data?.metadata?.data !== undefined) {
    return response.data.metadata.data;
  } else {
    return [];
  }
};

export const getTotalProjects = async () => {
  const response = await api.get(HttpRoutes.project.getAll.url);
  return extractTotal(response);
};

export const getTotalInvestments = async () => {
  const response = await api.get(HttpRoutes.investment.getAll.url);
  return extractTotal(response);
};

export const getTotalSellers = async () => {
  const response = await api.get(HttpRoutes.user.getUserSeller.url);
  return extractTotal(response);
};

export const getTotalCompanies = async () => {
  const response = await api.get(HttpRoutes.company.getAll.url);
  return extractTotal(response);
};

export const getAllInvestment = async () => {
  try {
    const response = await api.post(
      HttpRoutes.investment.getTotalInvestment.url,
    );

    if (response?.data !== undefined) {
      const totalInvested = response.data.totalInvested || 0;
      const totalYield = response.data.totalYield || 0;
      return {
        totalInvested,
        totalYield,
      };
    } else {
      return {
        totalInvested: 0,
        totalYield: 0,
      };
    }
  } catch (error) {
    console.error('Error fetching total investment:', error);
    return {
      totalInvested: 0,
      totalYield: 0,
    };
  }
};

export const getProjects = async () => {
  const response = await api.get(HttpRoutes.project.getAll.url);
  return extractData(response);
};

export const getInvestments = async () => {
  const response = await api.get(HttpRoutes.investment.getAll.url);
  return extractData(response);
};

export const getSellers = async () => {
  const response = await api.get(HttpRoutes.user.getUserSeller.url);
  return extractData(response);
};

export const getCompanies = async () => {
  const response = await api.get(HttpRoutes.company.getAll.url);
  return extractData(response);
};

export const getUserById = async (id: string) => {
  try {
    const response = await api.get(
      HttpRoutes.user.getById.url.replace(':id', id),
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const getCompanyById = async (id: string) => {
  try {
    const response = await api.get(
      HttpRoutes.company.getById.url.replace(':id', id),
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching company data:', error);
    throw error;
  }
};

export const getProjectById = async (id: string) => {
  try {
    const response = await api.get(
      HttpRoutes.project.getById.url.replace(':id', id),
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
};

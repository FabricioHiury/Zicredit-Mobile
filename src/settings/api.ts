import {HttpRoutes} from './HttpRoutes';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CompanyData {
  name: string;
  cnpj: string;
  address: string;
  bankData: string;
  phone: string;
  email: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userCpf: string;
  userPhone: string;
}

interface ProjectData {
  name: string;
  location: string;
  totalValue: string;
  companyId: string;
}

interface SellerData {
  name: string;
  cpf: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  companyId: string;
}

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
  } else if (response?.data !== undefined) {
    return response.data;
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

export const getProjects = async (page: number = 1, query: string = '') => {
  const response = await api.get(HttpRoutes.project.getAll.url, {
    params: {
      page,
      search: query,
    },
  });
  return extractData(response);
};

export const getInvestments = async () => {
  const response = await api.get(HttpRoutes.investment.getAll.url);
  console.log('getInvestments', extractData(response));
  return extractData(response);
};

export const getSellers = async () => {
  const response = await api.get(HttpRoutes.user.getUserSeller.url);
  return extractData(response);
};

export const getCompanies = async (page: number = 1, query: string = '') => {
  const response = await api.get(HttpRoutes.company.getAll.url, {
    params: {
      page,
      search: query,
    },
  });
  console.log('response: ', extractData(response));
  return extractData(response);
};

export const getUserById = async (id: string) => {
  try {
    const response = await api.get(
      HttpRoutes.user.getById.url.replace(':id', id),
    );
    console.log(response.data.investments);
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
    console.log(response.data);
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
};

export const getInvestorById = async (id: string) => {
  try {
    const response = await api.get(
      HttpRoutes.investment.getByUserId.url.replace(':id', id),
    );
    console.log(id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching investor data:', error);
    throw error;
  }
};

export const getSellerById = async (id: string) => {
  try {
    const response = await api.get(
      HttpRoutes.user.getSellerId.url.replace(':id', id),
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching seller data:', error);
    throw error;
  }
};

export const createCompany = async (companyData: any) => {
  try {
    const response = await api.post(
      HttpRoutes.company.createCompany.url,
      companyData,
    );
    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar construtora:', error.response.data);
    throw error;
  }
};

export const createProject = async (projectData: any) => {
  try {
    console.log('Project ', projectData);
    const response = await api.post(
      HttpRoutes.project.createProject.url,
      projectData,
    );
    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar empreendimento:', error.response.data);
    throw error;
  }
};

export const createUser = async (userData: any) => {
  try {
    console.log('Response User: ', userData);
    const response = await api.post(HttpRoutes.user.createUser.url, userData);
    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error.response.data);
    throw error;
  }
};

export const createInvestor = async (investorData: any) => {
  try {
    console.log('InvestorData: ', investorData);
    const response = await api.post(
      HttpRoutes.investment.createInvestor.url,
      investorData,
    );
    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar investidor:', error.response.data);
    throw error;
  }
};

export const patchUser = async (id: string, userData: any) => {
  try {
    const response = await api.patch(
      HttpRoutes.user.patchUser.url.replace(':id', id),
      userData,
    );
    return response.data;
  } catch (error: any) {
    console.error('Erro ao atualizar usuário:', error.response.data);
    throw error;
  }
};

export const getTotalInvestedByCompany = async (companyId: string) => {
  try {
    const url = HttpRoutes.investment.getTotalInvestmentByCompanyId.url.replace(
      ':companyId',
      companyId,
    );
    const response = await api.post(url);
    console.log(response.data);
    return response.data.totalInvested;
  } catch (error) {
    console.error('Error message:', error);
    throw error;
  }
};

export const getInvestorsByCompanyAndUserId = async (
  companyId: string,
  userId: string | null,
  paginationParams = {},
) => {
  try {
    const url = HttpRoutes.investment.getInvestorsByCompanyId.url.replace(
      ':companyId',
      companyId,
    );
    const response = await api.get(url, {
      params: {...paginationParams, userId},
    });
    console.log('comp: ', response.data.metadata.data);
    return response.data.metadata.data;
  } catch (error) {
    console.error('Error message:', error);
    throw error;
  }
};

export const getProjectsByCompanyId = async (
  companyId: string,
  paginationParams = {},
) => {
  try {
    const url = HttpRoutes.project.getProjectsByCompanyId.url.replace(
      ':companyId',
      companyId,
    );
    const response = await api.get(url, {params: paginationParams});
    console.log('companyID: ', response.data.metadata.data);
    return response.data.metadata.data;
  } catch (error) {
    console.error('Error message:', error);
    throw error;
  }
};

export const getInvestorsCountByCompanyId = async (companyId: string) => {
  try {
    const response = await api.get(
      HttpRoutes.investment.getInvestorsCountByCompanyId.url.replace(
        ':companyId',
        companyId,
      ),
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching investors count by company:', error);
    throw error;
  }
};

export const getActiveProjectsCountByCompanyId = async (companyId: string) => {
  try {
    const response = await api.get(
      HttpRoutes.project.getActiveProjectsCountByCompanyId.url.replace(
        ':companyId',
        companyId,
      ),
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching active projects count by company:', error);
    throw error;
  }
};

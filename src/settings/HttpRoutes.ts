const baseUrl = 'http://192.168.1.4:80/';

export const HttpRoutes = {
  route: baseUrl,
  auth: {
    login: {
      url: 'login',
      type: 'post',
    },
  },
  user: {
    getAll: {
      url: 'user',
      type: 'get',
    },
    getById: {
      url: 'user/:id',
      type: 'get',
    },
    getUserSeller: {
      url: 'user?typeUser=SELLER',
      type: 'get',
    },
    createUser: {
      url: 'user',
      type: 'post',
    },
    getSellerId: {
      url: 'user/seller/:id',
      type: 'get',
    },
    patchUser: {
      url: 'user/:id',
      type: 'patch',
    },
  },
  project: {
    getAll: {
      url: 'projects',
      type: 'get',
    },
    getById: {
      url: 'projects/:id',
      type: 'get',
    },
    getActiveProjectsCountByCompanyId: {
      url: 'projects/active-projects-count/:companyId',
      type: 'get',
    },
    createProject: {
      url: 'projects',
      type: 'post',
    },
    getProjectsByCompanyId: {
      url: '/projects/projects-by-company/:companyId',
      type: 'get',
    },
  },
  investment: {
    getAll: {
      url: 'investment',
      type: 'get',
    },
    getAllSellers: {
      url: 'investment/sellers',
      type: 'get',
    },
    getTotalInvestment: {
      url: 'investment/total-invested-overall',
      type: 'post',
    },
    getTotalInvestmentByCompanyId: {
      url: '/investment/total-by-company/:companyId',
      type: 'post',
    },
    getInvestorsCountByCompanyId: {
      url: 'investment/investors-count/:companyId',
      type: 'get',
    },
    createInvestor: {
      url: 'investment',
      type: 'post',
    },
    getByUserId: {
      url: 'investment/investor/:id',
      type: 'get',
    },
    getInvestorsByCompanyId: {
      url: '/investment/investors-by-company/:companyId',
      type: 'get',
    },
  },
  company: {
    getAll: {
      url: 'company',
      type: 'get',
    },
    getById: {
      url: 'company/:id',
      type: 'get',
    },
    createCompany: {
      url: 'company',
      type: 'post',
    },
  },
};

const baseUrl = 'http://192.168.1.4:80/';

export const HttpRoutes = {
  route: baseUrl,
  auth: {
    login: {
      url: 'login',
      type: 'post',
    },
  },
  project: {
    getAll: {
      url: 'projects',
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
      type: 'get',
    },
  },
  company: {
    getAll: {
      url: 'company',
      type: 'get',
    },
  },
};

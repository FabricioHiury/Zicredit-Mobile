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
    }
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
    createProject: {
      url: 'projects',
      type: 'post',
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
    createInvestor: {
      url: 'investment',
      type: 'post',
    }
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

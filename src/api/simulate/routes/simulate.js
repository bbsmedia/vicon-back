module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/simulate',
     handler: 'simulate.action',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};

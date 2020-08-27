module.exports = (app) => {
  const dashboard = require('../controller/dashboard/index.controller');

  //Dashboard Page
  app.get('/', dashboard.index);
};

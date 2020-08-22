module.exports = (app) => {
  const auth = require('../../../controller/auth.controller.js');
  const url_api = '/api/v1/auth';

  //Login User
  app.post(url_api + '/login', auth.login);
};

module.exports = (app) => {
  const users = require('../../../controller/user.controller.js');
  const middleware = require('../../../controller/middleware.controller.js');

  const url_api = '/api/v1/user';

  //create User
  app.post(url_api, users.create);

  // get All User
  app.get(url_api, middleware.check_token, users.findAll);

  // get UserById
  app.get(`${url_api}/:userId`, middleware.check_token, users.findOne);

  // Update User with userId
  app.put(`${url_api}/:userId`, middleware.check_token, users.update);

  // delete User with userId
  app.delete(`${url_api}/:userId`, middleware.check_token, users.delete);
};

module.exports = (app) => {
  const users = require('../../../controller/user.controller.js');

  const url_api = '/api/v1/user';

  //create User
  app.post(url_api, users.create);

  // get All User
  app.get(url_api, users.findAll);

  // get UserById
  app.get(`${url_api}/:userId`, users.findOne);

  // Update User with userId
  app.put(`${url_api}/:userId`, users.update);

  // delete User with userId
  app.delete(`${url_api}/:userId`, users.delete);
};

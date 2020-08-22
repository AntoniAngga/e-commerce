module.exports = (app) => {
  const account = require('../../../controller/account.controller.js');
  const url_api = '/api/v1/account';

  //Create Account
  app.post(url_api, account.create);

  //findbyId Account
  app.get(url_api + '/:accountId', account.findOne);

  //Find All Account
  app.get(url_api, account.findAll);

  //Update Account
  app.put(url_api + '/:accountId', account.update);

  //Delete Account
  app.delete(url_api + '/:accountId', account.delete);
};

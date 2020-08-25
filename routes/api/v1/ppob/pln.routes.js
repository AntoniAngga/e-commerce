module.exports = (app) => {
  const prePaid = require('../../../../controller/ppob/pln/prePaid.controller');
  const middleware = require('../../../../controller/middleware.controller');
  const urlApi = '/api/v1/ppob/pln';

  //GET Check price
  app.get(
    urlApi + '/prepaid/check_price',
    middleware.check_token,
    prePaid.check_pln_pricing
  );

  //POST Top Up Request
  app.post(
    urlApi + '/prepaid/top_up_request',
    middleware.check_token,
    prePaid.top_up_request
  );

  //GET check Status
  app.get(
    urlApi + '/prepaid/check_status',
    middleware.check_token,
    prePaid.check_status
  );
};

module.exports = (app) => {
  const prePaid = require('../../../../controller/ppob/pln/prePaid.controller');
  const postPaid = require('../../../../controller/ppob/pln/postPaid.controller');
  const middleware = require('../../../../controller/middleware.controller');
  const urlApi = '/api/v1/ppob/pln';

  // Prepaid
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

  //POSTPAID
  app.get(
    urlApi + '/postpaid/check_price',
    middleware.check_token,
    postPaid.check_bill_pln
  );
  app.post(
    urlApi + '/postpaid/payment',
    middleware.check_token,
    postPaid.payment_bill_pln
  );
};

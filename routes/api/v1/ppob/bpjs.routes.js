module.exports = (app) => {
  const postPaid = require('../../../../controller/ppob/bpjs/postPaid.controller');
  const middleware = require('../../../../controller/middleware.controller');
  const urlApi = '/api/v1/ppob/bpjs';

  //POSTPAID
  app.get(
    urlApi + '/postpaid/check_price',
    middleware.check_token,
    postPaid.check_bill_bpjs
  );
  app.post(
    urlApi + '/postpaid/payment',
    middleware.check_token,
    postPaid.payment_bill_bpjs
  );
};

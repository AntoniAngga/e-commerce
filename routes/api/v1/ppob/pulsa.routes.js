module.exports = (app) => {
  const postPaid = require('../../../../controller/ppob/pulsa/postPaid.controller');
  const middleware = require('../../../../controller/middleware.controller');
  const urlApi = '/api/v1/ppob/pulsa';

  //POSTPAID
  app.get(
    urlApi + '/postpaid/check_price',
    middleware.check_token,
    postPaid.check_bill_pulsa
  );
  app.post(
    urlApi + '/postpaid/payment',
    middleware.check_token,
    postPaid.payment_bill_pulsa
  );
};

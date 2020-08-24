module.exports = (app) => {
  const prePaid = require('../../../../controller/ppob/pln/prePaid.controller');
  const urlApi = '/api/v1/ppob/pln';

  //GET Check price
  app.get(urlApi + '/prepaid/check_price', prePaid.check_pln_pricing);

  //POST Top Up Request
  app.post(urlApi + '/prepaid/top_up_request', prePaid.top_up_request);

  //GET check Status
  app.get(urlApi + '/prepaid/check_status', prePaid.check_status);
};

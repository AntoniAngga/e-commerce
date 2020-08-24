const md5 = require('md5');
const apiClient = require('../../../services/axios');
const usernameTxt = '085385550999';
const passwordTxt = '6885ee24582e5804';

exports.check_pln_pricing = async (req, res) => {
  // Type : pln
  // List Of Operator : pln
  const plnUrlCheckPrice = '/pln/pln';
  const signTxt = md5(usernameTxt + passwordTxt + 'pl');

  const status = req.query.status || 'all';

  try {
    const priceList = await apiClient.requestPpob.post(plnUrlCheckPrice, {
      commands: 'pricelist',
      username: usernameTxt,
      sign: signTxt,
      status: status,
    });
    res.status(200).json({
      messages: 'Success get Pricelist PPOB PLN',
      result: priceList.data,
    });
  } catch (error) {
    res.status(500).json({
      messages: 'ERROR: get Pricelist PPOB PLN',
      result: error,
    });
  }
};

exports.top_up_request = async (req, res) => {
  const plnUrlTopUpPrice = '/';
  const refId = 'order1';
  const signTxt = md5(usernameTxt + passwordTxt + refId);
  const data = req.body;

  try {
    const requestToken = await apiClient.requestPpob.post(plnUrlTopUpPrice, {
      commands: 'topup',
      username: usernameTxt,
      sign: signTxt,
      ref_id: refId,
      hp: data.token_number,
      pulsa_code: data.pulsa_code,
    });
    res.status(200).json({
      messages: 'Success top up PPOB PLN PrePaid',
      result: requestToken.data,
    });
  } catch (error) {
    res.status(500).json({
      messages: 'ERROR: top up PPOB PLN PrePaid',
      result: error.error,
    });
  }
};

exports.check_status = async (req, res) => {
  const plnUrlCheckStatus = '/';
  const refId = 'order1';
  const signTxt = md5(usernameTxt + passwordTxt + refId);

  try {
    const tokenNumber = await apiClient.requestPpob.post(plnUrlCheckStatus, {
      commands: 'inquiry',
      username: usernameTxt,
      sign: signTxt,
      ref_id: refId,
    });
    res.status(200).json({
      messages: 'Success check PPOB PLN PrePaid',
      result: tokenNumber.data,
    });
  } catch (error) {
    res.status(500).json({
      messages: 'ERROR: check PPOB PLN PrePaid',
      result: error.error,
    });
  }
};

const md5 = require('md5');
const uniqid = require('uniqid');
const apiClient = require('../../../services/axios');
const { decode } = require('../../../services/decode');
const { PPOB_history_transaction } = require('../../../models/index');
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
  const refId = `PULSA-PLN-PREPAID-${uniqid()}`;
  const signTxt = md5(usernameTxt + passwordTxt + refId);
  const data = req.body;
  let status = '';

  try {
    const requestToken = await apiClient.requestPpob.post(plnUrlTopUpPrice, {
      commands: 'topup',
      username: usernameTxt,
      sign: signTxt,
      ref_id: refId,
      hp: data.token_number,
      pulsa_code: data.pulsa_code,
    });
    if (requestToken.status === 2) {
      status = 'Failed';
    } else if (requestToken.status === 1) {
      status = 'Success';
    } else if (requestToken.status === 0) {
      status = 'Process';
    }
    await PPOB_history_transaction.create({
      invoice: refId,
      status: status,
      category: 'PLN-Prepaid',
      payment_method: data.payment_type || 'Saldo',
      number: data.token_number,
      detail_transaction: requestToken.data,
      total_price: requestToken.data.data.price,
      userId: req.user_token.id,
    });
    res.status(200).json({
      messages: 'Success top up PPOB PLN PrePaid',
      result: requestToken.data,
    });
  } catch (err) {
    console.log('Error di sini');
    console.log(err);
    res.status(500).json({
      messages: 'ERROR: top up PPOB PLN PrePaid',
      result: err,
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

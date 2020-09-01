const apiClient = require('../../../services/axios');
const md5 = require('md5');
const uniqid = require('uniqid');
const usernameTxt = process.env.MOBILE_PULSA_USERNAME;
const passwordTxt = process.env.MOBILE_PULSA_PASSWORD;

exports.check_bill_pln = async (req, res) => {
  const plnCheckBill = '/';
  const plnNumber = req.query.plnNumber || '530000000001';
  const refId = `PULSA-PLN-POSTPAID-${uniqid()}`;
  const signTxt = md5(usernameTxt + passwordTxt + refId);
  try {
    const bill = await apiClient.requestPostPaidPpob.post(plnCheckBill, {
      commands: 'inq-pasca',
      username: usernameTxt,
      code: 'PLNPOSTPAID',
      hp: plnNumber,
      ref_id: refId,
      sign: signTxt,
    });

    res.status(200).json({
      messages: 'Success get Pricelist PPOB Postpaid PLN',
      result: bill.data,
    });
  } catch (error) {
    res.status(500).json({
      messages: 'ERROR: get Pricelist PPOB Postpaid PLN',
      result: error,
    });
  }
};

exports.payment_bill_pln = async (req, res) => {
  // Tr_id = get from check bill pln
  const plnPaymentBill = '/';
  const trId = req.body.trId;
  const signTxt = md5(usernameTxt + passwordTxt + trId);
  try {
    const bill = await apiClient.requestPostPaidPpob.post(plnPaymentBill, {
      commands: 'pay-pasca',
      username: usernameTxt,
      tr_id: trId,
      sign: signTxt,
    });

    if (bill.data.data.response_code === '00') {
      return res.status(200).json({
        messages: `Success Pay Pricelist PPOB Postpaid PLN with inquiry ID ${trId} `,
        result: bill.data,
      });
    }

    return res.status(500).json({
      messages: `ERROR: Pay Pricelist PPOB Postpaid PLN with inquiry ID ${trId} `,
      result: bill.data,
    });
  } catch (error) {
    res.status(500).json({
      messages: `ERROR: Pay Pricelist PPOB Postpaid PLN with inquiry ID ${trId} `,
      result: error,
    });
  }
};

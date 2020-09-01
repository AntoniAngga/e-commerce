const apiClient = require('../../../services/axios');
const md5 = require('md5');
const uniqid = require('uniqid');
const usernameTxt = process.env.MOBILE_PULSA_USERNAME;
const passwordTxt = process.env.MOBILE_PULSA_PASSWORD;

exports.check_bill_pulsa = async (req, res) => {
  const pulsaCheckBill = '/';
  const refId = `PULSA-POSTPAID-${uniqid()}`;
  const signTxt = md5(usernameTxt + passwordTxt + refId);

  const operator = req.query.operator;
  const phoneNumber = req.query.phone_number;

  try {
    const bill = await apiClient.requestPostPaidPpob.post(pulsaCheckBill, {
      commands: 'inq-pasca',
      username: usernameTxt,
      code: operator,
      hp: phoneNumber,
      ref_id: refId,
      sign: signTxt,
    });

    res.status(200).json({
      messages: 'Success get Pricelist PPOB Postpaid PULSA',
      result: bill.data,
    });
  } catch (error) {
    res.status(500).json({
      messages: 'ERROR: get Pricelist PPOB Postpaid PULSA',
      result: error,
    });
  }
};

exports.payment_bill_pulsa = async (req, res) => {
  // Tr_id = get from check bill pln
  const trId = req.body.trId;
  const signTxt = md5(usernameTxt + passwordTxt + trId);
  try {
    const bill = await apiClient.paymentPostPaid(trId, usernameTxt, signTxt);

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

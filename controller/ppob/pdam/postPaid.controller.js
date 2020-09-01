const apiClient = require('../../../services/axios');
const md5 = require('md5');
const uniqid = require('uniqid');
const usernameTxt = process.env.MOBILE_PULSA_USERNAME;
const passwordTxt = process.env.MOBILE_PULSA_PASSWORD;

exports.check_bill_pdam = async (req, res) => {
  const pdamCheckBill = '/';
  const locationPdam = req.query.locationPdam;
  const numberPdam = req.query.numberPdam;
  const refId = `PDAM-POSTPAID-${uniqid()}`;
  const signTxt = md5(usernameTxt + passwordTxt + refId);

  try {
    const bill = await apiClient.requestPostPaidPpob.post(pdamCheckBill, {
      commands: 'inq-pasca',
      username: usernameTxt,
      code: locationPdam,
      hp: numberPdam,
      ref_id: refId,
      sign: signTxt,
    });

    if (bill.data.data.response_code === '00')
      return res.status(200).json({
        messages: 'Success get Pricelist PPOB Postpaid PDAM',
        result: bill.data,
      });

    res.status(500).json({
      messages: 'ERROR: get Pricelist PPOB Postpaid PDAM',
      result: bill.data,
    });
  } catch (error) {
    res.status(500).json({
      messages: 'ERROR: get Pricelist PPOB Postpaid PDAM',
      result: error,
    });
  }
};

exports.payment_bill_pdam = async (req, res) => {
  // Tr_id = get from check bill pln
  const pdamPaymentBill = '/';
  const trId = req.body.trId;
  console.log(trId);
  const signTxt = md5(usernameTxt + passwordTxt + trId);
  try {
    const bill = await apiClient.requestPostPaidPpob.post(pdamPaymentBill, {
      commands: 'pay-pasca',
      username: usernameTxt,
      tr_id: trId,
      sign: signTxt,
    });

    if (bill.data.data.response_code === '00') {
      return res.status(200).json({
        messages: `Success Pay Pricelist PPOB Postpaid PDAM with inquiry ID ${trId}`,
        result: bill.data,
      });
    }

    return res.status(500).json({
      messages: `ERROR: Pay Pricelist PPOB Postpaid PDAM with inquiry ID ${trId}`,
      result: bill.data,
    });
  } catch (error) {
    res.status(500).json({
      messages: `ERROR: Pay Pricelist PPOB Postpaid PDAM with inquiry ID ${trId}`,
      result: error,
    });
  }
};

const apiClient = require('../../../services/axios');
const md5 = require('md5');
const uniqid = require('uniqid');
const usernameTxt = process.env.MOBILE_PULSA_USERNAME;
const passwordTxt = process.env.MOBILE_PULSA_PASSWORD;

exports.check_bill_bpjs = async (req, res) => {
  const bpjsCheckBill = '/';
  const refId = `BPJS-POSTPAID-${uniqid()}`;
  const signTxt = md5(usernameTxt + passwordTxt + refId);

  const numberBpjs = req.query.numberBpjs;
  const monthBpjs = req.query.mounthBpjs;

  try {
    const bill = await apiClient.requestPostPaidPpob.post(bpjsCheckBill, {
      commands: 'inq-pasca',
      username: usernameTxt,
      code: 'BPJS',
      hp: numberBpjs,
      ref_id: refId,
      sign: signTxt,
      month: monthBpjs,
    });

    if (bill.data.data.response_code === '00')
      return res.status(200).json({
        messages: 'Success get Pricelist PPOB Postpaid BPJS',
        result: bill.data,
      });

    res.status(500).json({
      messages: 'ERROR: get Pricelist PPOB Postpaid BPJS',
      result: bill.data,
    });
  } catch (error) {
    res.status(500).json({
      messages: 'ERROR: get Pricelist PPOB Postpaid BPJS',
      result: error,
    });
  }
};

exports.payment_bill_bpjs = async (req, res) => {
  // Tr_id = get from check bill pln
  const bpjsPaymentBill = '/';
  const trId = req.body.trId;
  const signTxt = md5(usernameTxt + passwordTxt + trId);
  try {
    const bill = await apiClient.paymentPostPaid(trId, usernameTxt, signTxt);

    if (bill.data.data.response_code === '00') {
      return res.status(200).json({
        messages: `Success Pay Pricelist BPJS Postpaid PDAM with inquiry ID ${trId}`,
        result: bill.data,
      });
    }

    return res.status(500).json({
      messages: `ERROR: Pay Pricelist BPJS Postpaid PDAM with inquiry ID ${trId}`,
      result: bill.data,
    });
  } catch (error) {
    res.status(500).json({
      messages: `ERROR: Pay Pricelist BPJS Postpaid PDAM with inquiry ID ${trId}`,
      result: error,
    });
  }
};

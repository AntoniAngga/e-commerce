const axios = require('axios');

const requestPostPaidPpobInstance = axios.create({
  baseURL: 'https://testpostpaid.mobilepulsa.net/api/v1/bill/check',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 1000,
});

exports.requestPrePaidPpob = axios.create({
  baseURL: 'https://testprepaid.mobilepulsa.net/v1/legacy/index',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 1000,
});

exports.requestPostPaidPpob = requestPostPaidPpobInstance;

exports.paymentPostPaid = (trId, username, sign, commands = 'pay-pasca') => {
  return requestPostPaidPpobInstance.post('/', {
    commands: commands,
    username: username,
    tr_id: trId,
    sign: sign,
  });
};

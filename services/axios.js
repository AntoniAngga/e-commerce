const axios = require('axios');

exports.requestPpob = axios.create({
  baseURL: 'https://testprepaid.mobilepulsa.net/v1/legacy/index',
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 1000,
});

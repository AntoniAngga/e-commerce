require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.decode = (token) => jwt.verify(token, process.env.SECRET_JWT);

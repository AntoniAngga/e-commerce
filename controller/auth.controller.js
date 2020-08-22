require('dotenv').config();
const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const secretJwt = process.env.SECRET_JWT;

exports.login = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: data.username || '' },
          { username: data.username || '' },
        ],
      },
    });
    // Check User is Exist or not
    if (!user) {
      res.status(401).json({
        messages: 'User not Found',
        result: 'Please Check your email or username',
      });
    }

    // Check Password is true or exists
    if (data.password) {
      const compare = bcrypt.compareSync(data.password, user.password); // password ( Plain Password, Password Hash )
      if (compare) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            username: user.username,
            gender: user.gender,
          },
          secretJwt,
          { expiresIn: '720h' }
        );

        res.status(200).json({
          messages: 'User valid',
          result: { user, token: token },
        });
      } else {
        res.status(401).json({
          messages: 'User Password not match',
          result: 'Please Check your password again.',
        });
      }
    } else {
      res.status(401).json({
        messages: 'User Password not match',
        result: 'Please Check your password again.',
      });
    }
  } catch (err) {
    res.status(500).json({
      messages: 'Error: Login Users',
      result: err,
    });
  }
};

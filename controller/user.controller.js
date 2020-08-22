require('dotenv').config();
const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const saltRounds = process.env.PASSWORD_SALT;

exports.findAll = async (_req, res) => {
  try {
    const users = await User.findAll({});
    res.status(200).json({
      messages: 'Complete Get Users',
      result: users,
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Error: Get All Users',
      result: err,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    // Create Password bcrypt
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data.password, salt);
    const users = await User.create({ ...data, password: hash });
    res.status(200).json({
      messages: 'Complete Created User',
      result: `Complete Created User with User Id ${users.id}`,
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Error: Create Users',
      result: err,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.status(200).json({
      messages: 'Complete Get User',
      result: user,
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Error: Get User',
      result: err,
    });
  }
};

exports.update = async (req, res) => {
  console.log(req.params.userId);
  try {
    const data = req.body;
    console.log(data);
    const user = await User.update(data, {
      where: {
        id: req.params.userId,
      },
    });
    res.status(200).json({
      messages: 'User Updated',
      result: `Complete update Users with User id ${user}`,
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Error: Update User',
      result: err,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.userId,
      },
    });
    res.status(200).json({
      messages: 'users Deleted',
      result: user,
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Error: Deleted User',
      result: err,
    });
  }
};

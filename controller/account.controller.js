const { Account } = require('../models/index');

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const account = await Account.create(data);
    res.status(200).send({
      messages: 'Complete Created Account',
      result: account,
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Error: Create Account',
      result: err,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.accountId);
    res.status(200).send({
      messages: 'Complete Get Account Find By Id',
      result: account,
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Error: Get Account Find By Id',
      result: err,
    });
  }
};

exports.findAll = async (_req, res) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json({
      messages: 'Complete Get Account Find By Id',
      result: accounts,
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Error: Get Account',
      result: err,
    });
  }
};

exports.update = async (req, res) => {
  const data = req.body;
  try {
    const account = await Account.update(data, {
      where: {
        id: req.params.accountId,
      },
    });
    res.status(200).json({
      messages: 'Complete Update Account',
      result: account,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      messages: 'Error: Update Account',
      result: err,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const account = await Account.destroy({
      where: {
        id: req.params.accountId,
      },
    });
    res.status(200).json({
      messages: 'Accounts Deleted',
      result: `Accounts Deleted with id ${account}`,
    });
  } catch (err) {
    res.status(500).json({
      messages: 'Error: Deleted Account',
      result: err,
    });
  }
};

const { PPOB_history_transaction } = require('../../models/index');

exports.view_ppob_history_transactions = async (req, res) => {
  try {
    const history_transactions = await PPOB_history_transaction.findAll({
      include: 'user',
    });
    res.render('ppob_history_transaction/index.ejs', {
      history_transactions: history_transactions,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.render('error');
  }
};

exports.view_detail_ppob_history_transaction = async (req, res) => {
  try {
    const history_transaction = await PPOB_history_transaction.findByPk(
      req.params.phtId,
      {
        include: 'user',
      }
    );

    res.render('ppob_history_transaction/detail.ejs', {
      ht: history_transaction,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.render('error');
  }
};

exports.action_login = (req, res) => {
  res.send('error');
};

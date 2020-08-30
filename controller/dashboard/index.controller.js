const { PPOB_history_transaction } = require('../../models/index');

exports.index = async (_req, res) => {
  try {
    const history_transactions = await PPOB_history_transaction.findAll({
      include: 'user',
    });
    res.render('dashboard/index.ejs', {
      history_transactions: history_transactions,
    });
  } catch (err) {
    res.status(err.status || 500);
    res.render('error');
  }
};

module.exports = (app) => {
  const ppob_history_transaction = require('../controller/dashboard/ppob-history-transaction.controller');

  //Dashboard Page
  app.get(
    '/ppob-history-transaction',
    ppob_history_transaction.view_ppob_history_transactions
  );

  app.get(
    '/ppob-history-transaction/:phtId',
    ppob_history_transaction.view_detail_ppob_history_transaction
  );
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PPOB_history_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PPOB_history_transaction.init(
    {
      invoice: DataTypes.STRING,
      status: DataTypes.ENUM('waiting', 'success', 'cancel'),
      category: DataTypes.STRING,
      number: DataTypes.STRING,
      payment_method: DataTypes.STRING,
      detail_transaction: DataTypes.JSON,
      total_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'PPOB_history_transaction',
    }
  );
  return PPOB_history_transaction;
};

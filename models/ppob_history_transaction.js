'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PPOB_history_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    convertToRupiah() {
      let rupiah = '';
      let angkarev = this.total_price.toString().split('').reverse().join('');
      for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
      return (
        'Rp. ' +
        rupiah
          .split('', rupiah.length - 1)
          .reverse()
          .join('')
      );
    }

    static associate(models) {
      // define association here
      PPOB_history_transaction.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  PPOB_history_transaction.init(
    {
      invoice: DataTypes.STRING,
      status: DataTypes.STRING,
      category: DataTypes.STRING,
      number: DataTypes.STRING,
      payment_method: DataTypes.STRING,
      detail_transaction: DataTypes.JSON,
      total_price: DataTypes.FLOAT,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'PPOB_history_transaction',
    }
  );
  return PPOB_history_transaction;
};

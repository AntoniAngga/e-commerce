'use strict';
const { Model } = require('sequelize');

const convertToRupiah = (angka) => {
  var rupiah = '';
  var angkarev = angka.toString().split('').reverse().join('');
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
  return (
    'Rp. ' +
    rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('')
  );
};

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static getRupiah() {
      return convertToRupiah(this.balance);
    }
    static associate(models) {
      // define association here
    }
  }
  Account.init(
    {
      name: DataTypes.STRING,
      balance: DataTypes.FLOAT,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Account',
    }
  );
  return Account;
};

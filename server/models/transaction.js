"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsToMany(models.Product, { through: models.TransactionProducts });
      Transaction.belongsTo(models.User);
    }
  }
  Transaction.init(
    {
      total_price: DataTypes.INTEGER,
      change: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};

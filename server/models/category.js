"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Product);
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },      
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};

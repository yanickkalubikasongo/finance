'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class config_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  config_transaction.init({
    minimum:DataTypes.DECIMAL,
    maximum:DataTypes.DECIMAL,
    frais  :DataTypes.DECIMAL,
    type   :DataTypes.STRING,
    devise :DataTypes.STRING
  }, {
    sequelize,
    modelName: 'config_transaction',
  });
  return config_transaction;
};
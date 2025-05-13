'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class operation_portefeuile_don extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  operation_portefeuile_don.init({
    type_operation : DataTypes.STRING,
    devise         : DataTypes.STRING,
    motif          : DataTypes.STRING,
    montant        : DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'operation_portefeuile_don',
  });
  return operation_portefeuile_don;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class depot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  depot.init({
    confirmation     : DataTypes.INTEGER,
    montant_depose   : DataTypes.STRING,
    pourc_preleve    : DataTypes.STRING,
    id_compte        : DataTypes.INTEGER,
    point_cash_type  : DataTypes.STRING,
    point_cash_id    : DataTypes.INTEGER,
    ref_operation    : DataTypes.STRING,
    id_user          : DataTypes.INTEGER,
    devise           : DataTypes.STRING,
    annule           : DataTypes.INTEGER,
    id_config_general: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'depot',
  });
  return depot;
};
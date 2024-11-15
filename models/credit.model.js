'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class credit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  credit.init({
    id_compte_money    : DataTypes.INTEGER,
    montant            : DataTypes.STRING,
    id_temoin          : DataTypes.INTEGER,
    echance            : DataTypes.STRING,
    devise             : DataTypes.STRING,
    id_config_generale : DataTypes.INTEGER,
    id_agence          : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'credit',
  });
  return credit;
};
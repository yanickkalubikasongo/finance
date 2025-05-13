'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paiement_charge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  paiement_charge.init({
	devise          : DataTypes.STRING,
	id_agence       : DataTypes.INTEGER,
	mois            : DataTypes.STRING,
	annee           : DataTypes.STRING,
	id_user         : DataTypes.INTEGER,
	montant         : DataTypes.INTEGER,
	id_charge       : DataTypes.INTEGER,
	id_compte_monney: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'paiement_charge',
  });
  return paiement_charge;
};
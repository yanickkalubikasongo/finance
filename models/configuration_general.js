'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class config_generale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  config_generale.init({
    penalite_remboursement  : DataTypes.DECIMAL,
    retrocession_agent      : DataTypes.DECIMAL,
    pourcentage_credit      : DataTypes.DECIMAL,
    montant_maximal_emprunt	: DataTypes.DECIMAL,
    taux_change           	: DataTypes.INTEGER,
    prix_im               	: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'config_generale',
  });
  return config_generale;
};
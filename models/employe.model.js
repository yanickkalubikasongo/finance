'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employe.init({
    id_user           : DataTypes.INTEGER,
    id_agence         : DataTypes.INTEGER,
    id_partenaire     : DataTypes.INTEGER,
    id_type_employe   : DataTypes.INTEGER,
    pseudo            : DataTypes.STRING,
    mot_de_passe      : DataTypes.STRING,
    etat_user         : DataTypes.INTEGER,
    etat_mot_de_passe : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'employe',
  });
  return employe;
};
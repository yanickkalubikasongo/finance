require('dotenv').config();

const Sequelize                     = require('sequelize');

const Agence_Model                  = require('../models/agence.model');
const Charge_model                  = require('../models/charge.model');
const Compte_money_Model            = require('../models/compte_money.model');
const Config_transaction_Model      = require('../models/config_transaction');
const Configuration_generale_Model  = require('../models/configuration_general');
const Connexion_Model               = require('../models/connexion');
const Credit_model                  = require('../models/credit.model');
const etat_civil_Model              = require('../models/etat_civil');
const Monnaie_electroniqueModel     = require('../models/monnaie_electronique');
const NationaliteModel              = require('../models/nationalite');
const Paiement_charge_model         = require('../models/paiement_charge.model');
const Partenaire_Model              = require('../models/partenaire.model');
const Partenaire_membre_model       = require('../models/partenaire_membre.model');
const Portefeuille_don_model        = require('../models/operation_portefeuile_don');
const ProvinceModel                 = require('../models/province');
const Temoin_model                  = require('../models/temoin.model');
const Type_piece_identite_Model     = require('../models/type_piece_identite');
const type_employeModel             = require('../models/type_employe');
const UserModel                     = require('../models/user');
const MembreModel                   = require('../models/membre.model');
const EmployeModel                  = require('../models/employe.model');
const DepotModel                    = require('../models/depot.model');

const sequelize = new Sequelize('loanme','root','',{
    host    : 'localhost',
    dialect : 'mysql'
});

const Connexion                     = Connexion_Model(sequelize,Sequelize);
const Depot                         = DepotModel(sequelize,Sequelize);
const Partenaire                    = Partenaire_Model(sequelize,Sequelize);
const compte_money                  = Compte_money_Model(sequelize,Sequelize)
const Agence                        = Agence_Model(sequelize,Sequelize)
const Config_transaction            = Config_transaction_Model(sequelize,Sequelize)
const Configuration_generale        = Configuration_generale_Model(sequelize,Sequelize)
const Nationalite                   = NationaliteModel(sequelize,Sequelize);
const Type_piece_identite           = Type_piece_identite_Model(sequelize,Sequelize);
const type_employe                  = type_employeModel(sequelize,Sequelize);
const Partenaire_membre             = Partenaire_membre_model(sequelize,Sequelize);
const etat_civil                    = etat_civil_Model(sequelize,Sequelize);
const User                          = UserModel(sequelize,Sequelize);
const Province                      = ProvinceModel(sequelize,Sequelize);
const Monnaie_electronique          = Monnaie_electroniqueModel(sequelize,Sequelize);
const Portef_don                    = Portefeuille_don_model(sequelize,Sequelize);
const Charge_                       = Charge_model(sequelize,Sequelize);
const Paiement                      = Paiement_charge_model(sequelize,Sequelize);
const Credit                        = Credit_model(sequelize,Sequelize);
const Temoin                        = Temoin_model(sequelize,Sequelize);
const Membre                        = MembreModel(sequelize,Sequelize);
const Employe                       = EmployeModel(sequelize,Sequelize);

const Op = Sequelize.Op

module.exports = {
    Connexion,
    Depot,
    Employe,
    User,
    Monnaie_electronique,
    Partenaire,
    Partenaire_membre,
    compte_money,
    Credit,
    Temoin,
    Agence,
    Membre,
    Config_transaction,
    Configuration_generale,
    Nationalite,
    Type_piece_identite,
    type_employe,
    etat_civil,
    Province,
    Portef_don,
    Charge_,
    Paiement,

    sequelize
};
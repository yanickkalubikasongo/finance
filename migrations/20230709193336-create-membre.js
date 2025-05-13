'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('membres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type_piece_id: {
        type: Sequelize.STRING
      },      
      numero_piece: {
        type: Sequelize.STRING
      },
      nom: {
        type: Sequelize.STRING
      },
      postnom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
      date_naissance: {
        type: Sequelize.STRING
      },
      lieu_naissance: {
        type: Sequelize.STRING
      },  
      etat_civil: {
        type: Sequelize.INTEGER
      }, 
      nationalite_id: {
        type: Sequelize.INTEGER
      }, 
      nom_pere: {
        type: Sequelize.STRING
      },
      nom_mere: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      avenue: {
        type: Sequelize.STRING
      },
      quartier: {
        type: Sequelize.STRING
      },  
      numero_parcel: {
        type: Sequelize.INTEGER
      },   
      commune_id: {
        type: Sequelize.INTEGER
      },    
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('membres');
  }
};

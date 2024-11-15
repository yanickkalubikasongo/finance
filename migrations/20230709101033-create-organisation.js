'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organisations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      denomination: {
        type: Sequelize.STRING
      },
      piece_jointe: {
        type: Sequelize.STRING
      },
      secteur_id: {
        type: Sequelize.INTEGER
      },
      date_creation: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      avenue: {
        type: Sequelize.STRING
      },
      numero_parcel: {
        type: Sequelize.STRING
      },
      quartier: {
        type: Sequelize.STRING
      },
      commune_id: {
        type: Sequelize.INTEGER
      }, 
      deletedAt: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('organisations');
  }
};
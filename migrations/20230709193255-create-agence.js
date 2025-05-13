'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('agences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      denomination: {
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
        type: Sequelize.STRING
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
    await queryInterface.dropTable('agences');
  }
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comptes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      im: {
        type: Sequelize.STRING
      },  
      devise_id: {
        type: Sequelize.INTEGER
      },
      type_compte_id: {
        type: Sequelize.INTEGER
      }, 
      piece_identite: {
        type: Sequelize.INTEGER
      },
      photo: {
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
    await queryInterface.dropTable('comptes');
  }
};

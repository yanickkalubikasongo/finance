'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mot_de_passe: {
        type: Sequelize.STRING
      },
      role_id:{
        type: Sequelize.INTEGER,
        allowNull: true
      },
      organisation_id:{
        type: Sequelize.INTEGER,
        allowNull: true
      },
      agence_id:{
        type: Sequelize.INTEGER,
        allowNull: true
      },
      agent_id:{
        type: Sequelize.INTEGER,
        allowNull: true
      },
      etat:{
        type: Sequelize.INTEGER,
        allowNull: true
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
    await queryInterface.dropTable('users');
  }
};
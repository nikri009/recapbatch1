'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) { 
    //"Async up" dapat merujuk pada skrip migrasi yang dilakukan saat kita menerapkan atau "meng-upgrade" skema database.
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      author: {
        type: Sequelize.INTEGER,
        references:"users",
        key: "id"
      },
      description: {
        type: Sequelize.TEXT
      },
      technologies: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      image: {
        type: Sequelize.STRING
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
    //"Async down" mungkin merujuk pada skrip migrasi yang dilakukan saat kita melakukan pembatalan atau "meng-downgrade" skema database. 
    await queryInterface.dropTable('projects');
  }
};
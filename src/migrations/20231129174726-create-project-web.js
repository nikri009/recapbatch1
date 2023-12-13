'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    //"Async up" dapat merujuk pada skrip migrasi yang dilakukan saat kita menerapkan atau "meng-upgrade" skema database.
    await queryInterface.createTable('projectWebs', {
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
      description: {
        type: Sequelize.TEXT
      },
      technologies: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      authorid: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        }
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
    await queryInterface.dropTable('projectWebs');
  }
};
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('user_roles', [
      {
        role_name: 'guest',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_name: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_name: 'operator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_name: 'marketing',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

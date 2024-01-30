'use strict';
const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: '2024-02-25',
        endDate:'2025-01-02',
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2024-05-03',
        endDate:'2024-07-16',
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2024-10-08',
        endDate:'2024-12-22',
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['2024-02-25', '2024-05-03', '2024-10-08'] }
    }, {});
  }
};

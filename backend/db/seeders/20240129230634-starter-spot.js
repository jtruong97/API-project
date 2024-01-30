'use strict';
const { Spot } = require('../models');

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
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Address Way',
        city:'city one',
        state:'california',
        country:'united states',
        lat:-34.343432,
        lng:-120.343432,
        name: 'first listing',
        description:'california home',
        price:453.00
      },
      {
        ownerId:2,
        address: '123 Address Ave',
        city:'city two',
        state:'new york',
        country:'US',
        lat:42.34325346,
        lng:150.33342423,
        name: 'second listing',
        description:'new york home',
        price:634.23
      },
      {
        ownerId:3,
        address: '123 Address Circle',
        city:'city three',
        state:'florida',
        country:'united states of america',
        lat: 12.35435,
        lng:145.3432343,
        name: 'third listing',
        description:'florida home',
        price:113.34
      }

    ], { validate: true })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 Address Way', '123 Address Ave', '123 Address Circle'] }
    }, {});
  }
};

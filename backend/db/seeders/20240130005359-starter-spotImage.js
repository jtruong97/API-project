'use strict';
const { SpotImage } = require('../models');

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
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url:'https://media.istockphoto.com/id/1318936929/photo/modern-luxurious-villa-with-garden.jpg?s=1024x1024&w=is&k=20&c=o4-4QSVjVvw9Eo_WDLRieGKdqqoSaqG66sFQaiohR6k=',
        preview: true
      },
      {
        spotId: 3,
        url:'https://media.istockphoto.com/id/1457567236/photo/modern-villa-exterior-with-air-heat-pumps-in-garden.jpg?s=1024x1024&w=is&k=20&c=abfDUS3MAhrz8leVWpPF-OkBjf4oxAFQzN991U_Loo0=',
        preview: false
      },
      {
        spotId: 2,
        url:'https://media.istockphoto.com/id/1026205392/photo/beautiful-luxury-home-exterior-at-twilight.jpg?s=1024x1024&w=is&k=20&c=_s4AQ2-vNONUaMT0izUGe_ykG3sg__QeUkvFaqu8jnc=',
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://media.istockphoto.com/id/1318936929/photo/modern-luxurious-villa-with-garden.jpg?s=1024x1024&w=is&k=20&c=o4-4QSVjVvw9Eo_WDLRieGKdqqoSaqG66sFQaiohR6k=',
      'https://media.istockphoto.com/id/1457567236/photo/modern-villa-exterior-with-air-heat-pumps-in-garden.jpg?s=1024x1024&w=is&k=20&c=abfDUS3MAhrz8leVWpPF-OkBjf4oxAFQzN991U_Loo0=',
      'https://media.istockphoto.com/id/1026205392/photo/beautiful-luxury-home-exterior-at-twilight.jpg?s=1024x1024&w=is&k=20&c=_s4AQ2-vNONUaMT0izUGe_ykG3sg__QeUkvFaqu8jnc='] }
    }, {});
  }
};

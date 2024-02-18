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
        spotId:1,
        url:'https://i.postimg.cc/sxfJzP4c/spring-front.jpg',
        preview: true
      },
      {
        spotId: 1,
        url:'https://i.postimg.cc/NGb3HpSQ/pink-farm-outside.jpg',
        preview: true
      },
      {
        spotId:1,
        url:'https://i.postimg.cc/CxfM73pG/pink-inside.jpg',
        preview: true
      },
      {
        spotId: 2,
        url:'https://i.postimg.cc/nLTdzYHC/Screenshot-2024-02-17-at-6-59-43-PM.png',
        preview: false
      },
      {
        spotId: 2,
        url:'https://i.postimg.cc/gJW6ff9h/beach-interior-2.webp',
        preview: true
      },
      {
        spotId: 2,
        url:'https://i.postimg.cc/vZxgDQb9/beach-interior.jpg',
        preview: true
      },{
        spotId: 3,
        url:'https://i.postimg.cc/vZgNHSTT/IMG-9232.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://i.postimg.cc/J0x81YTt/IMG-9237.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://i.postimg.cc/Hs8318V1/IMG-9233.jpg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://i.postimg.cc/htq8FCkV/nightmarket-home-copy.jpg',
        preview: true
      },
      {
        spotId: 7,
        url:'https://i.postimg.cc/PJdx6L3D/IMG-9239.jpg',
        preview: true
      },
      {
        spotId: 8,
        url:'https://i.postimg.cc/NFV0QNG6/IMG-9229.jpg',
        preview: true
      },
      {
        spotId: 9,
        url:'https://i.postimg.cc/LsWcxhDs/greenhouse.jpg',
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
      url: { [Op.in]: [
        'https://i.postimg.cc/sxfJzP4c/spring-front.jpg',
        'https://i.postimg.cc/NGb3HpSQ/pink-farm-outside.jpg',
        'https://i.postimg.cc/CxfM73pG/pink-inside.jpg',
        'https://i.postimg.cc/nLTdzYHC/Screenshot-2024-02-17-at-6-59-43-PM.png',
        'https://i.postimg.cc/gJW6ff9h/beach-interior-2.webp',
        'https://i.postimg.cc/vZxgDQb9/beach-interior.jpg',
        'https://i.postimg.cc/vZgNHSTT/IMG-9232.jpg',
        'https://i.postimg.cc/J0x81YTt/IMG-9237.jpg',
        'https://i.postimg.cc/Hs8318V1/IMG-9233.jpg',
        'https://i.postimg.cc/htq8FCkV/nightmarket-home-copy.jpg',
        'https://i.postimg.cc/PJdx6L3D/IMG-9239.jpg',
        'https://i.postimg.cc/NFV0QNG6/IMG-9229.jpg',
        'https://i.postimg.cc/LsWcxhDs/greenhouse.jpg'
      ]}
    }, {});
  }
};

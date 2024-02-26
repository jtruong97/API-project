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
        url:'https://i.postimg.cc/bwY2LKwZ/Screenshot-2024-02-25-at-5-40-41-PM.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://i.postimg.cc/nV7Vm0ZN/Screenshot-2024-02-25-at-5-38-22-PM.png',
        preview: true
      },
      {
        spotId: 1,
        url:'https://i.postimg.cc/50jBpjbK/Screenshot-2024-02-25-at-5-47-52-PM.png',
        preview: true
      },
      {
        spotId: 2,
        url:'https://i.postimg.cc/nLTdzYHC/Screenshot-2024-02-17-at-6-59-43-PM.png',
        preview: true
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
      },
      {
        spotId: 2,
        url:'https://i.postimg.cc/FFJqs6mk/Screenshot-2024-02-25-at-5-44-07-PM.png',
        preview: true
      },
      {
        spotId: 2,
        url:'https://i.postimg.cc/5y0RBfRf/Screenshot-2024-02-25-at-5-49-13-PM.png',
        preview: true
      },
      {
        spotId: 3,
        url:'https://i.postimg.cc/vZgNHSTT/IMG-9232.jpg',
        preview: true
      },
      {
        spotId: 3,
        url:'https://i.postimg.cc/bNJNVbtR/Screenshot-2024-02-25-at-5-56-03-PM.png',
        preview: true
      },
      {
        spotId: 3,
        url:'https://i.postimg.cc/VNcJhv1L/Screenshot-2024-02-25-at-5-56-11-PM.png',
        preview: true
      },
      {
        spotId: 3,
        url:'https://i.postimg.cc/kGt99Nvr/Screenshot-2024-02-25-at-5-56-19-PM.png',
        preview: true
      },
      {
        spotId: 3,
        url:'https://i.postimg.cc/NjvX3pkc/Screenshot-2024-02-25-at-5-56-28-PM.png',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://i.postimg.cc/J0x81YTt/IMG-9237.jpg',
        preview: true
      },
      {
        spotId: 4,
        url:'https://i.postimg.cc/hGdGb7Yt/Screenshot-2024-02-25-at-6-04-24-PM.png',
        preview: true
      },
      {
        spotId: 4,
        url:'https://i.postimg.cc/tTMQS9MC/Screenshot-2024-02-25-at-6-07-09-PM.png',
        preview: true
      },
      {
        spotId: 4,
        url:'https://i.postimg.cc/mrrFCwff/Screenshot-2024-02-25-at-6-07-04-PM.png',
        preview: true
      },
      {
        spotId: 4,
        url:'https://i.postimg.cc/hGdGb7Yt/Screenshot-2024-02-25-at-6-04-24-PM.png',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://i.postimg.cc/Hs8318V1/IMG-9233.jpg',
        preview: true
      },
      {
        spotId: 5,
        url:'https://i.postimg.cc/GhvNn3sS/Screenshot-2024-02-25-at-6-00-51-PM.png',
        preview: true
      },
      {
        spotId: 5,
        url:'https://i.postimg.cc/y6369Rwg/Screenshot-2024-02-25-at-6-00-59-PM.png',
        preview: true
      },
      {
        spotId: 5,
        url:'https://i.postimg.cc/J4W8k2Nv/Screenshot-2024-02-25-at-6-01-16-PM.png',
        preview: true
      },
      {
        spotId: 5,
        url:'https://i.postimg.cc/MTR4ZzFT/Screenshot-2024-02-25-at-6-01-28-PM.png',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://i.postimg.cc/htq8FCkV/nightmarket-home-copy.jpg',
        preview: true
      },
      {
        spotId: 6,
        url:'https://i.postimg.cc/cHvV2VYx/Screenshot-2024-02-25-at-6-10-10-PM.png',
        preview: true
      },
      {
        spotId: 6,
        url:'https://i.postimg.cc/X7ST11vW/Screenshot-2024-02-25-at-6-10-26-PM.png',
        preview: true
      },
      {
        spotId: 6,
        url:'https://i.postimg.cc/W3Z5Mjgk/Screenshot-2024-02-25-at-6-10-39-PM.png',
        preview: true
      },
      {
        spotId: 6,
        url:'https://i.postimg.cc/G3kMtLc0/Screenshot-2024-02-25-at-6-10-52-PM.png',
        preview: true
      },
      {
        spotId: 7,
        url:'https://i.postimg.cc/PJdx6L3D/IMG-9239.jpg',
        preview: true
      },
      {
        spotId:7,
        url:'https://i.postimg.cc/cLvywB8V/Screenshot-2024-02-25-at-5-52-33-PM.png',
        preview:true
      },
      {
        spotId: 7,
        url:'https://i.postimg.cc/nrNK5x0K/Screenshot-2024-02-25-at-5-52-41-PM.png',
        preview: true
      },
      {
        spotId: 7,
        url:'https://i.postimg.cc/hGKLNpbY/Screenshot-2024-02-25-at-5-52-48-PM.png',
        preview: true
      },
      {
        spotId: 7,
        url:'https://i.postimg.cc/tTw20FgV/Screenshot-2024-02-25-at-5-52-56-PM.png',
        preview: true
      },
      {
        spotId: 8,
        url:'https://i.postimg.cc/NFV0QNG6/IMG-9229.jpg',
        preview: true
      },
      {
        spotId: 8,
        url:'https://i.postimg.cc/gcgWSF7Z/Screenshot-2024-02-25-at-6-17-47-PM.png',
        preview: true
      },
      {
        spotId: 8,
        url:'https://i.postimg.cc/Xvkhr9SC/Screenshot-2024-02-25-at-6-17-54-PM.png',
        preview: true
      },
      {
        spotId: 8,
        url:'https://i.postimg.cc/pr4cwZ8g/Screenshot-2024-02-25-at-6-18-00-PM.png',
        preview: true
      },
      {
        spotId: 8,
        url:'https://i.postimg.cc/DwT3mvJR/Screenshot-2024-02-25-at-6-18-06-PM.png',
        preview: true
      },
      {
        spotId: 9,
        url:'https://i.postimg.cc/LsWcxhDs/greenhouse.jpg',
        preview: true
      },
      {
        spotId: 9,
        url:'https://i.postimg.cc/5yhY8d56/Screenshot-2024-02-25-at-6-14-21-PM.png',
        preview: true
      },
      {
        spotId: 9,
        url:'https://i.postimg.cc/G2Njtp2D/Screenshot-2024-02-25-at-6-15-37-PM.png',
        preview: true
      },
      {
        spotId: 9,
        url:'https://i.postimg.cc/s2gPJWGS/Screenshot-2024-02-25-at-6-14-39-PM.png',
        preview: true
      },
      {
        spotId: 9,
        url:'https://i.postimg.cc/gJfvdBSq/Screenshot-2024-02-25-at-6-16-03-PM.png',
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
        // 'https://i.postimg.cc/sxfJzP4c/spring-front.jpg',
        // 'https://i.postimg.cc/NGb3HpSQ/pink-farm-outside.jpg',
        // 'https://i.postimg.cc/bwY2LKwZ/Screenshot-2024-02-25-at-5-40-41-PM.png',
        // 'https://i.postimg.cc/nLTdzYHC/Screenshot-2024-02-17-at-6-59-43-PM.png',
        // 'https://i.postimg.cc/nV7Vm0ZN/Screenshot-2024-02-25-at-5-38-22-PM.png',
        // 'https://i.postimg.cc/gJW6ff9h/beach-interior-2.webp',
        // 'https://i.postimg.cc/vZxgDQb9/beach-interior.jpg',
        // 'https://i.postimg.cc/vZgNHSTT/IMG-9232.jpg',
        // 'https://i.postimg.cc/J0x81YTt/IMG-9237.jpg',
        // 'https://i.postimg.cc/Hs8318V1/IMG-9233.jpg',
        // 'https://i.postimg.cc/htq8FCkV/nightmarket-home-copy.jpg',
        // 'https://i.postimg.cc/PJdx6L3D/IMG-9239.jpg',
        // 'https://i.postimg.cc/NFV0QNG6/IMG-9229.jpg',
        // 'https://i.postimg.cc/LsWcxhDs/greenhouse.jpg'
        'https://i.postimg.cc/sxfJzP4c/spring-front.jpg',
        'https://i.postimg.cc/NGb3HpSQ/pink-farm-outside.jpg',
        'https://i.postimg.cc/bwY2LKwZ/Screenshot-2024-02-25-at-5-40-41-PM.png',
        'https://i.postimg.cc/nV7Vm0ZN/Screenshot-2024-02-25-at-5-38-22-PM.png',
        'https://i.postimg.cc/50jBpjbK/Screenshot-2024-02-25-at-5-47-52-PM.png',
        'https://i.postimg.cc/nLTdzYHC/Screenshot-2024-02-17-at-6-59-43-PM.png',
        'https://i.postimg.cc/gJW6ff9h/beach-interior-2.webp',
        'https://i.postimg.cc/vZxgDQb9/beach-interior.jpg',
        'https://i.postimg.cc/FFJqs6mk/Screenshot-2024-02-25-at-5-44-07-PM.png',
        'https://i.postimg.cc/5y0RBfRf/Screenshot-2024-02-25-at-5-49-13-PM.png',
        'https://i.postimg.cc/vZgNHSTT/IMG-9232.jpg',
        'https://i.postimg.cc/bNJNVbtR/Screenshot-2024-02-25-at-5-56-03-PM.png',
        'https://i.postimg.cc/VNcJhv1L/Screenshot-2024-02-25-at-5-56-11-PM.png',
        'https://i.postimg.cc/kGt99Nvr/Screenshot-2024-02-25-at-5-56-19-PM.png',
        'https://i.postimg.cc/NjvX3pkc/Screenshot-2024-02-25-at-5-56-28-PM.png',
        'https://i.postimg.cc/J0x81YTt/IMG-9237.jpg',
        'https://i.postimg.cc/hGdGb7Yt/Screenshot-2024-02-25-at-6-04-24-PM.png',
        'https://i.postimg.cc/tTMQS9MC/Screenshot-2024-02-25-at-6-07-09-PM.png',
        'https://i.postimg.cc/mrrFCwff/Screenshot-2024-02-25-at-6-07-04-PM.png',
        'https://i.postimg.cc/hGdGb7Yt/Screenshot-2024-02-25-at-6-04-24-PM.png',
        'https://i.postimg.cc/Hs8318V1/IMG-9233.jpg',
        'https://i.postimg.cc/GhvNn3sS/Screenshot-2024-02-25-at-6-00-51-PM.png',
        'https://i.postimg.cc/y6369Rwg/Screenshot-2024-02-25-at-6-00-59-PM.png',
        'https://i.postimg.cc/J4W8k2Nv/Screenshot-2024-02-25-at-6-01-16-PM.png',
        'https://i.postimg.cc/MTR4ZzFT/Screenshot-2024-02-25-at-6-01-28-PM.png',
        'https://i.postimg.cc/htq8FCkV/nightmarket-home-copy.jpg',
        'https://i.postimg.cc/cHvV2VYx/Screenshot-2024-02-25-at-6-10-10-PM.png',
        'https://i.postimg.cc/X7ST11vW/Screenshot-2024-02-25-at-6-10-26-PM.png',
        'https://i.postimg.cc/W3Z5Mjgk/Screenshot-2024-02-25-at-6-10-39-PM.png',
        'https://i.postimg.cc/G3kMtLc0/Screenshot-2024-02-25-at-6-10-52-PM.png',
        'https://i.postimg.cc/PJdx6L3D/IMG-9239.jpg',
        'https://i.postimg.cc/cLvywB8V/Screenshot-2024-02-25-at-5-52-33-PM.png',
        'https://i.postimg.cc/nrNK5x0K/Screenshot-2024-02-25-at-5-52-41-PM.png',
        'https://i.postimg.cc/hGKLNpbY/Screenshot-2024-02-25-at-5-52-48-PM.png',
        'https://i.postimg.cc/tTw20FgV/Screenshot-2024-02-25-at-5-52-56-PM.png',
        'https://i.postimg.cc/NFV0QNG6/IMG-9229.jpg',
        'https://i.postimg.cc/gcgWSF7Z/Screenshot-2024-02-25-at-6-17-47-PM.png',
        'https://i.postimg.cc/Xvkhr9SC/Screenshot-2024-02-25-at-6-17-54-PM.png',
        'https://i.postimg.cc/pr4cwZ8g/Screenshot-2024-02-25-at-6-18-00-PM.png',
        'https://i.postimg.cc/DwT3mvJR/Screenshot-2024-02-25-at-6-18-06-PM.png',
        'https://i.postimg.cc/LsWcxhDs/greenhouse.jpg',
        'https://i.postimg.cc/5yhY8d56/Screenshot-2024-02-25-at-6-14-21-PM.png',
        'https://i.postimg.cc/G2Njtp2D/Screenshot-2024-02-25-at-6-15-37-PM.png',
        'https://i.postimg.cc/s2gPJWGS/Screenshot-2024-02-25-at-6-14-39-PM.png',
        'https://i.postimg.cc/gJfvdBSq/Screenshot-2024-02-25-at-6-16-03-PM.png',

      ]}
    }, {});
  }
};

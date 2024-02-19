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
        address: '9 Egg Festival Way',
        city:'Cindersap',
        state:'Forest',
        country:'Stardew',
        lat:-34.343432,
        lng:-120.343432,
        name: 'Spring home',
        description:'A pink Spring themed home with lots of wild honey ready for harvest',
        price:553.00
      },
      {
        ownerId:2,
        address: '1212 Moonlight Jellies Ave',
        city:'Crimsonfish',
        state:'Beach',
        country:'Stardew',
        lat:42.34325346,
        lng:150.33342423,
        name: 'Beach home',
        description:'A waterfront beach home where you can watch migrating jellyfish every Summer between 10pm-12am',
        price:734.23
      },
      {
        ownerId:3,
        address: '9496 Marnie Ave',
        city:'Pelican Town',
        state:'Forest',
        country:'Stardew',
        lat: 12.35435,
        lng:145.3432343,
        name: "Marnie's Ranch",
        description:'A cute barn-style home with petting zoo on site',
        price:213.34
      },
      {
        ownerId: 1,
        address:'24 Winter Star Lane',
        city:'Crocus',
        state: 'Backwoods',
        country: 'Stardew',
        lat:54.23156,
        lng:-23.1232,
        name: 'Winter lodge',
        description: 'Cozy lodge home perfect for a family winter vacation, and only 10 minutes away from a ski resort',
        price: 385.33
      },
      {
        ownerId: 2,
        address: '5006 Wizard Tower Circle',
        city:'Salmonberry',
        state:'Backwoods',
        country:'Stardew',
        lat:10.234356,
        lng:-62.34235,
        name:'Wizards Tower',
        description: 'A fairytale home with unique antique collectibles',
        price: 463.34
      },
      {
        ownerId: 3,
        address: '1517 Night Market Way',
        city:'Glacierfish',
        state:'Beach',
        country:'Stardew',
        lat:34.234356,
        lng:-13.34235,
        name:'Night market beach house',
        description: 'Not your average water front home, perfect for entertaining guests',
        price: 463.34
      },
      {
        ownerId: 1,
        address:'2020 Golden Walnut Street',
        city:'Beach Resort',
        state:'Ginger',
        country:'Ginger Island',
        lat:64.2345,
        lng:42.3423,
        name:'Ginger island hut',
        description:'A small island home with river and beach access',
        price: 234.23
      },
      {
        ownerId: 2,
        address:'9040 Blacksmith Lane',
        city:'Prismatic',
        state:'Mountain',
        country:'Stardew',
        lat:-45.93802,
        lng:23.56478,
        name:'Blacksmith home',
        description:'Cottage style home',
        price: 234.23
      },
      {
        ownerId: 3,
        address:'35000 Greenhouse Ave',
        city:'Iridium',
        state:'Forest',
        country:'Stardew',
        lat:88.56365,
        lng:73.34573,
        name:'Greenhouse',
        description:'A pefect home for stargazing and plant lovers',
        price: 234.23
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
      address: { [Op.in]: ['9 Egg Festival Way', '1212 Moonlight Jellies Ave', '9496 Marnie Ave',
      '24 Winter Star Lane','5006 Wizard Tower Circle','1517 Night Market Way', '2020 Golden Walnut Street'] }
    }, {});
  }
};

'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Amenities';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        kitchen: true,
        privateBeachAccess: true,
        firePlace: true,
        parking: true,
        pool: false,
        hotTub: true,
        pets: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        kitchen: true,
        privateBeachAccess: true,
        firePlace: true,
        parking: true,
        pool: false,
        hotTub: false,
        pets: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        kitchen: true,
        privateBeachAccess: true,
        firePlace: true,
        parking: true,
        pool: false,
        hotTub: false,
        pets: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        kitchen: true,
        privateBeachAccess: true,
        firePlace: true,
        parking: true,
        pool: false,
        hotTub: true,
        pets: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        kitchen: true,
        privateBeachAccess: true,
        firePlace: true,
        parking: true,
        pool: false,
        hotTub: true,
        pets: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        kitchen: true,
        privateBeachAccess: false,
        firePlace: false,
        parking: true,
        pool: false,
        hotTub: true,
        pets: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 7,
        kitchen: true,
        privateBeachAccess: true,
        firePlace: true,
        parking: true,
        pool: true,
        hotTub: true,
        pets: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 8,
        kitchen: true,
        privateBeachAccess: true,
        firePlace: true,
        parking: true,
        pool: false,
        hotTub: true,
        pets: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 9,
        kitchen: true,
        privateBeachAccess: true,
        firePlace: true,
        parking: true,
        pool: false,
        hotTub: true,
        pets: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Amenities';
    return queryInterface.bulkDelete(options, null, {});

  }
};

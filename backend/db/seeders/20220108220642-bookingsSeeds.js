'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 5,
        startDate: new Date(),
        endDate: new Date(),
        guestCount: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        userId: 6,
        startDate: new Date(),
        endDate: new Date(),
        guestCount: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        userId: 7,
        startDate: new Date(),
        endDate: new Date(),
        guestCount: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, null, {});
  }
};

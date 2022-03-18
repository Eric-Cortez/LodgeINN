'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkInsert('Bookings', [
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

      return queryInterface.bulkDelete('Bookings', null, {});
  }
};

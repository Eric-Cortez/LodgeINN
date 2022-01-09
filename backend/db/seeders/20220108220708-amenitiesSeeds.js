'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('Amenities', [
        {
          spotId: 1,
          kitchen: true,
          privateBeachAccess: true,
          firePlace: true,
          parking: true,
          pool: false,
          hotTub: true,
          pets:true,
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
          pets: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkDelete('Amenities', null, {});

  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
      return queryInterface.bulkInsert('Images', [
        {
         spotId: 1,
         url: "https://a0.muscache.com/im/pictures/8f77a963-8535-4320-8b2b-64285c27079b.jpg?im_w=960", 
         createdAt: new Date(),
         updatedAt: new Date()
        },
        {
          spotId: 2,
          url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffloridatrippers.com%2Fwp-content%2Fuploads%2F2020%2F09%2Fbest-cabins-in-florida-nature-house.jpg&f=1&nofb=1",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 3,
          url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.uniqueholidaycottages.co.uk%2Fmedia%2Fcache%2Fx-large%2F1521_6fc46872362eecb755ea5c8655e8d5a2.jpg&f=1&nofb=1",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
 
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Images', null, {});
   
  }
};

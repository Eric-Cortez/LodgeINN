'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
      return queryInterface.bulkInsert('Images', [
        {
         spotId: 1,
          url: "https://images.unsplash.com/photo-1547393429-098dd122091a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGNhYmlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", 
         createdAt: new Date(),
         updatedAt: new Date()
        },
        {
          spotId: 2,
          url: "https://images.unsplash.com/photo-1525113990976-399835c43838?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2FiaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 3,
          url: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FiaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
 
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Images', null, {});
   
  }
};

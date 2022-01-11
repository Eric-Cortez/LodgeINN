'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
      return queryInterface.bulkInsert('Images', [
        {
         spotId: 1,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDL6I9H1Ap5leiurWjreSmNPluxqPvp6Atlw&usqp=CAU", 
         createdAt: new Date(),
         updatedAt: new Date()
        },
        {
          spotId: 2,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScBK92RrBBGaaKiywOHF85brKjjcMq8ThdQQ&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 3,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn_oDgA3XdpVGp8siSS4fF6jatkrWcteYfLw&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
 
  },

  down: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkDelete('Images', null, {});
   
  }
};

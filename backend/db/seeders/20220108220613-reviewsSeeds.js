'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
    return queryInterface.bulkInsert('Reviews', [
      {
       userId: 5,
       spotId: 1,
       rating: 4,
       review: "The cabin was nice. It is was very close to Leavenworth downtown. Was clean so that was nice, however there is a very bad foul smell coming out of the bathroom, just made me throw up every morning I hope they can fix it before anyone else rent the cabin again. Also the time we where there it was very cold and snowy, I asked on how we can turn on the fire heater inside and Frank told us if we never used it before then we should not use it, so we spent to nights in the cold hahahh. Also it would be nice if they had shuffled the snow a little bit on the grill and the outside area, we gad to do that ourselves.", 
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
        userId: 6,
        spotId: 3,
        rating: 5,
        review: "We had a wonderful stay at the Cabin. The cabin was clean and surprisingly well insulated for the very low temperatures that happened during our stay. Someone was kind enough to leave us some firewood to get started, so we paid it forward and hope the next guests do the same. I think the cabin would have stayed warm without the wood stove, but it was nice to have. The description given of the cabin was correct and the House rules were easy to follow. It is a short drive into Leavenworth or up to Plain. ",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 7,
        spotId: 2,
        rating: 2,
        review: "The cabin is wonderful, only a few minutes from town. Hosts are wonderful folks as well. Highly highly recommended.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});

  },
  down: (queryInterface, Sequelize) => {
   
     
      return queryInterface.bulkDelete('Reviews', null, {});
  
  }
};

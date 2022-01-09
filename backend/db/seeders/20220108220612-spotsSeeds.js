'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('Spots', [
        {
          userId: 1,
          address: "940 US Highway 2",
          city: "Leavenworth",
          state: "WA",
          country: "USA",
          title: "R&R Retreat - Intimate, Quaint and Cozy Cabin",
          description: "Welcome to the “R&R Retreat”. Nestled in the pines of a quiet country neighborhood, this adorable modest, studio A-Frame cabin offers all the basics you need to enjoy our beautiful area. The cabin features an open concept dining, living and kitchen area where you can prepare your favorite meals, play a board game or curl up on the couch and watch a great movie. On the front deck you will find a gas BBQ ready for you and there is a table and chairs out there for dining al fresco. When the sun sets and you are ready to call it a night, adventurous travelers may head up the ladder and crawl into the comfortable queen bed that is awaiting you in the loft. There is also a comfortable sleeper sofa for those not wishing to sleep in the loft. The cabin is ideal for two guests but we allow a maximum of four guests for those travelers who don’t mind getting cozy with friends or family.",
          price: 124,
          zipCode: 98826,
          guests: 2,
          bedrooms: 2,
          bathrooms: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          address: "715 Front St, Leavenworth",
          city: "Leavenworth",
          state: "WA",
          country: "USA",
          title: "Hansel Creek Loft Cabin! Creek Views on 150 Acres",
          description: "Escape into the woods next to Hansel Creek! 15 minutes from Leavenworth & walking distance to the Alpine Lakes Wilderness trail-head! Sitting on pristine Hansel Creek this is a historic gem! Beautifully restored from the original 1930's cabin, the loft cabin displays timber-frame craftsmanship & custom details! Enjoy Hansel Creeks beauty and serenity just outside the cabin. After the sun disappears behind the mountains the twinkling stars come out and dance in the sky!",
          price: 128,
          zipCode: 98826,
          guests: 4,
          bedrooms: 1,
          bathrooms: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 3,
          address: "220 8th St",
          city: "Leavenworth",
          state: "WA",
          country: "USA",
          title: "Entire cabin hosted",
          description: "This one-level home has been completely updated and there is a extra table area for working if you need it. The grounds are very private and there's about an acre of flat land to play ball, have fun in the snow or soak in the sun! There is a gas BBQ in the back-yard for grilling and a fire pit for sitting around and making memories!",
          price: 299,
          zipCode: 98826,
          guests: 4,
          bedrooms: 2,
          bathrooms: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkDelete('Spots', null, {});
  
  }
};

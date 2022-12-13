'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
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
        guests: 3,
        bedrooms: 2,
        bathrooms: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 4,
        address: "220 8th St",
        city: "Forks",
        state: "WA",
        country: "USA",
        title: "Cozy Getaway house with outdoor hot tub",
        description: "Cozy home minutes away from the beautiful ocean beaches of the Olympic Peninsula, Hoh rainforest and 3 rivers for fishing and recreation.",
        price: 185,
        zipCode: 98826,
        guests: 6,
        bedrooms: 5,
        bathrooms: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 5,
        address: "220 8th St",
        city: "Forks",
        state: "WA",
        country: "USA",
        title: "Sol Duc Den-West, A tiny cabin with big adventures",
        description: "Welcome to the Sol Duc Den! This tiny cabin in the woods is the ideal base camp to your local adventures. Located just minutes from the town of Forks, and the Sol Duc River, this is a prime location for all.",
        price: 350,
        zipCode: 98826,
        guests: 4,
        bedrooms: 2,
        bathrooms: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 6,
        address: "220 8th St",
        city: "Snoqualmie",
        state: "WA",
        country: "USA",
        title: "Rustic cabin on the beautiful Olympic Peninsula",
        description: "Come and enjoy the beautiful Pacific Northwest in this peaceful yet centrally-located cabin. Within walking distance of local restaurants and only 1 mile from the local grocery store. Many hiking trails, rivers and beach access all with in 15 miles.",
        price: 550,
        zipCode: 98826,
        guests: 5,
        bedrooms: 3,
        bathrooms: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 7,
        address: "220 8th St",
        city: "Forks",
        state: "WA",
        country: "USA",
        title: "Scenic Inn - Woodland Inns",
        description: "Decorated with Beautiful local scenes. LIVING AREA WITH FULL MEMORY BED SOFA, BEDROOM WITH 1 KING BED. THIS CABIN HAS EXTRA ROOM TO MOVE AROUND. BATHROOM HAS TILED SHOWER/JACUZZI TUB.",
        price: 289,
        zipCode: 98826,
        guests: 3,
        bedrooms: 2,
        bathrooms: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 8,
        address: "220 8th St",
        city: "Leavenworth",
        state: "WA",
        country: "USA",
        title: "Cottage on the Eagle Creek - Cozy Home with Hot Tub",
        description: "Welcome to Cottage on the Creek, the perfect place to gather with loved ones and enjoy the serenity of our gorgeous area. This two bedroom home sits on the edge of peaceful Eagle Creek just a few short miles from downtown",
        price: 389,
        zipCode: 98826,
        guests: 4,
        bedrooms: 2,
        bathrooms: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 9,
        address: "220 8th St",
        city: "Forks",
        state: "WA",
        country: "USA",
        title: "Elegant & secluded home w/ a wood deck, gas grill, & private hot tub",
        description: "Book your next stay at Tivoli Chalet and experience a memorable all-season getaway! With two levels full of comfort, rural accents, incredible amenities, and a secluded location, this mountain retreat has it all. Step inside and let the large windows and vaulted ceiling wow you.",
        price: 700,
        zipCode: 98826,
        guests: 8,
        bedrooms: 6,
        bathrooms: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options, null, {});

  }
};

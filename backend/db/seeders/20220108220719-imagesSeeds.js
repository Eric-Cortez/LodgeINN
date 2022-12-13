'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Images';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://images.unsplash.com/photo-1547393429-098dd122091a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGNhYmlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: "https://images.unsplash.com/photo-1604609165678-096d20fab1ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhYmlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FiaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: "https://images.unsplash.com/photo-1548704806-0c20f7ea6474?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9kZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: "https://images.unsplash.com/photo-1536209604112-c4f045f94729?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bG9kZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        url: "https://images.unsplash.com/photo-1595521624992-48a59aef95e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGxvZGdlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 7,
        url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FiaW58ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 8,
        url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 9,
        url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Y2FiaW58ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});

  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Images';
    return queryInterface.bulkDelete(options, null, {});

  }
};

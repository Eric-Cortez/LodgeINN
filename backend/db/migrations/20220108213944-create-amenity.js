'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Amenities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Spots' }
      },
      kitchen: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      privateBeachAccess: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      firePlace: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      parking: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      pool: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      hotTub: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      pets: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Amenities', options);
  }
};
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'sam@user.io',
        username: 'Sam Smith',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'bri@user.io',
        username: 'Bri Cortez',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'aaron@user.io',
        username: 'Aaron Short',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'andres@user.io',
        username: 'Andres Soca',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'ken@user.io',
        username: 'Ken Knapp',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'barry@user.io',
        username: 'Barry Mattern',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'matt@user.io',
        username: 'Matt Sattewhite',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'katerina@user.io',
        username: 'Katerina Kreibich',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'bill@user.io',
        username: 'Bill Adams',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'Milo@user.io',
        username: 'Milo Chavez',
        hashedPassword: bcrypt.hashSync('password'),
      }, {
        email: 'Felix@user.io',
        username: 'Felix Ramirez',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
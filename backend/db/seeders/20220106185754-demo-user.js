'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: "https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg"
      },
      {
        email: 'aaron@user.io',
        username: 'Aaron Short',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: "https://media-exp1.licdn.com/dms/image/C5603AQEFn_iC3gLehA/profile-displayphoto-shrink_100_100/0/1647232976526?e=1654128000&v=beta&t=iS5hCE247INd2p18MrtlagFa67LVJg7uJ5v5q_dROQg"
      },
      {
        email: 'sam@user.io',
        username: 'Sam Smith',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
      },
      {
        email: 'bri@user.io',
        username: 'Bri Cortez',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: "https://media-exp1.licdn.com/dms/image/C5603AQF9yk0Tn6-lHg/profile-displayphoto-shrink_100_100/0/1618798364313?e=2147483647&v=beta&t=CQnj4cGBhNwzsFM1LfeMr9D-0yVUO2ol69Ye7Gt8rYg"
      },
      {
        email: 'andres@user.io',
        username: 'Christian Buehner',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
      },
      {
        email: 'ken@user.io',
        username: 'Ken Knapp',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: "https://media-exp1.licdn.com/dms/image/D5635AQE2zjTzgIj-sg/profile-framedphoto-shrink_400_400/0/1646363327996?e=1648512000&v=beta&t=eN8pV1F3EAMspW4UbyXUpZb5ph-rElgrWsn7Xu3-EQg"
      },
      {
        email: 'barry@user.io',
        username: 'Barry Mattern',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: "https://media-exp1.licdn.com/dms/image/C5603AQHZtSRyBRPwBw/profile-displayphoto-shrink_100_100/0/1517556282752?e=1654128000&v=beta&t=yMhbJGoFtj0H4lHseZxZLw2wzQ1rywyyyIftsoPQlv4"
      },
      {
        email: 'matt@user.io',
        username: 'Matt Sattewhite',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: "https://media-exp1.licdn.com/dms/image/C5603AQGkf8P49uIs7Q/profile-displayphoto-shrink_100_100/0/1642576769869?e=1654128000&v=beta&t=RHNxpDQRjY8UwJG0DNm8u81KPq9_K6Q-S6uqCxyLE1U"
      },
      {
        email: 'katerina@user.io',
        username: 'Katerina Kreibich',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: "https://media-exp1.licdn.com/dms/image/C5603AQEcr-ATfyfcCA/profile-displayphoto-shrink_100_100/0/1559829838144?e=2147483647&v=beta&t=SW-b2LSoGRwMD8lfKQ6nqgET48rfNEjM8w_QSOf_J3E"
      },
      {
        email: 'bill@user.io',
        username: 'Bill Adams',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: "https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
      },
      {
        email: 'Milo@user.io',
        username: 'Milo Chavez',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
      }, {
        email: 'Felix@user.io',
        username: 'Felix Cortez',
        hashedPassword: bcrypt.hashSync('password'),
        imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
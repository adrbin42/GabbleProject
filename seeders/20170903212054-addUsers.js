'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users',[{
      firstname : 'John',
      lastname : 'Whitehall',
      username : 'jwhite',
      password : 'winnerswin',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('users',[{
        firstname : 'John'
    }])
  }
};

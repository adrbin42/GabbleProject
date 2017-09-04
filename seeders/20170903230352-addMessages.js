'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('messages', [{
      title : 'Pick up',
      message : 'Pick your daughter up from school',
      userid : 4,
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('messages',[{
      title : 'Pick up'
    }])
  }
};

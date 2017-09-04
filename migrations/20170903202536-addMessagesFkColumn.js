'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.addColumn(
      'messages',
      'userid',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:'users',
          key: 'id'
        }
      }
    )
  },
  onDelete: 'cascade',
  onUpdate: 'cascade'

  down: function (queryInterface, Sequelize) {

    return queryInterface.removeColumn(
      'messages',
      'userid'
    )
  }
};

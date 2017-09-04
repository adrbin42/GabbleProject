'use strict';
module.exports = function(sequelize, DataTypes) {
  var message = sequelize.define('message', {
    title: DataTypes.STRING,
    message: DataTypes.STRING,
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:'users',
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return message;
};

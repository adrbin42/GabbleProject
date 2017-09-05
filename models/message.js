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
  }, {});
    message.associate = function(models) {
    message.belongsTo(models.user, {as: 'gabs', foreignKey: 'userid'});
    message.hasMany(models.like, {as: "gabsliked", foreignKey: 'msgid'});
  }
  return message;
};

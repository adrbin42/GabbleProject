'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  user.associate = function(models) {
  user.hasMany(models.message, {as: 'users', foreignKey: 'userid'});
  user.hasMany(models.like, {as: 'usersliked', foreignKey: 'userid'});
}
  return user;
};

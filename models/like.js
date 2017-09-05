'use strict';
module.exports = function(sequelize, DataTypes) {
  var like = sequelize.define('like', {
    msgid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {});

    like.associate = function(models) {
    like.belongsTo(models.user, { as: "likeusers", foreignKey: 'userid'});
    like.belongsTo(models.message, {as: "likegabs", foreignKey: 'msgid'});
    }
  return like;
};

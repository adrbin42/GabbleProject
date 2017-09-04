'use strict';
module.exports = function(sequelize, DataTypes) {
  var like = sequelize.define('like', {
    msgid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {});

    likes.associate = function(models) {
    likes.belongsTo(models.tbl_user, { as: "likeusers", foreignKey: 'user_id'});
    likes.belongsTo(models.tbl_messages, {as: "likegabs", foreignKey: 'messsage_id'});
    }
  return like;
};

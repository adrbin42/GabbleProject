const routes = require('express').Router();
const models = require('../models');
const sequelize = require("sequelize");

//Get messages of users that have logged in
const getUserMessages = function(req, res, next) {
   models.message.findAll({
        order: [['createdAt','DESC']],
         where: {
           userid: req.session.userid
         },
         include: [{
           model: models.user,
           as: "gabs"
         }],

   }).then(function(userMsg) {
     if (userMsg) {
       req.userMsg = userMsg;
       next();
     } else {
       res.status(404).send("Record not found - User Message");
     }
   });
 }
//Get Messages of all users
const getAllMessages = function(req, res, next) {
   models.message.findAll({
        order: [['createdAt','DESC']],
         include: [{
           model: models.user,
           as: "gabs"
         }]
   }).then(function(userMsg) {
     if (userMsg) {
       req.AllMsg = userMsg;
       next();
     } else {
       res.status(404).send("No messages found");
     }
   });
 }

//Display Gabble
routes.get("/index", getUserMessages, getAllMessages, function(req, res){

  res.render("index",{allMsg:req.AllMsg,
                     userMsg:req.userMsg,
                     username:req.session.username,
                     firstname:req.session.firstname,
                     lastname: req.session.lastname});
});
//Delete and like functionality of user Messages
routes.post("/index", getUserMessages, getAllMessages, function(req, res){

  let allMsg = req.AllMsg;
  let userMsg = req.userMsg;

  if(req.body.action =="likeOthersMsg" || req.body.action =="likeUserMsg" )
  {
      models.like.findOrCreate({
      where: {
        messsage_id: req.body.id_hidden,
        userid: req.session.userid
      }
    }).catch(sequelize.ValidationError, function(err) {
      console.log("Not Valid! ", err);
    }).catch(sequelize.UniqueConstraintError, function(err) {
      console.log("Not Unique! ", err);
    }).spread(function(like, created){
        res.redirect("/like?msgid=" + req.body.id_hidden);
    });
  }
  else if(req.body.action =="delUserMsg"){
    models.message.findById(req.body.id_hidden).then(function(msg){
      msg.destroy().then(function(){
        res.redirect("/index");
      });
    });
  }
});
module.exports = routes;

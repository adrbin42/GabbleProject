const routes = require('express').Router();
const models = require('../models');

//Get the message based on the message clicked
const getMessage = function(req, res, next) {
   models.message.findOne({
         where: {
           id: req.query.msgid
         },
         include: [{
           model: models.user,
           as: "gabs"
         }]
   }).then(function(userMsg) {
     if (userMsg) {
       req.Msg = userMsg;
       next();
     } else {
       res.status(404).send("Record not found - User Message");
     }
   });
 }
//Display all the users liked the message so far
  const getLikedUsersList = function(req,res, next){
     models.like.findAll({
       where:{
          messsage_id:req.query.msgid
         },
       include: [{
          model: models.user,
          as: "likeusers",
       include: [{
            model: models.message,
            as: "users"
          }]
        }]
      }).then(function(users){
       if(users){
         req.likedUsersList = users;
         next();
       } else {
          res.status(404).send("Records not found - List of users liked the message");
      }
   });
  }
//Get number of persons liked the message , the count
  const getNumberOfLikes = function(req, res, next){
    models.message.findAndCountAll({
      where:{
        id : req.query.msgid
      },
      include: [{
         model: models.like,
         as: "gabsliked",
       }]
     }).then(function(users){
      if(users){
        if(users.count == 0){
            req.countUsersLiked  = false;
        }
        else{
            req.countUsersLiked  = users.count;
        }
       next();
     }
     else {
       res.status(404).send("Records not found - Error in the count");
      }
   });
  }

// Page Display
routes.get('/likes', getMessage, getLikedUsersList, getNumberOfLikes, function(req, res) {
                      res.render("likes", {allMsg:req.Msg,
                       likedUsersList: req.likedUsersList,
                       getNumberOfLikes: req.countUsersLiked,
                       firstname: req.session.firstname});
});


module.exports = routes;

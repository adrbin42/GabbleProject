const routes = require('express').Router();
const models = require('../models');
const sequelize = require("sequelize");

routes.get("/signup", function(req, res){
  res.render("signup");
});
//Get the display name, username, password from the user
//New user registration with validations
routes.post("/signup", function(req, res){

  let errors = "";
  let messages = [];

  req.checkBody("yourname", "Please enter your name").notEmpty().isLength({max: 30});
  req.checkBody("username", "Please enter a valid username").notEmpty().isLength({max: 30});
  req.checkBody("password", "Please enter a Password").notEmpty();
  req.checkBody("confirmpassword","Please enter a confirm Password").notEmpty();
  req.checkBody("confirmpassword","Passwords do not match").equals(req.body.password);

  errors = req.validationErrors();
  if(errors) {
    errors.forEach(function(error){
    messages.push(error.msg);
  });
  res.render("signup", {messages: messages});
  }
  else {
    models.user.findOrCreate({
      where: {
        username: req.body.username
      },
      defaults:{
        name: req.body.yourname,
        password:req.body.password
      }
    }).catch(sequelize.ValidationError, function(err) {
      console.log("Not Valid! ", err);
    }).catch(sequelize.UniqueConstraintError, function(err) {
      console.log("Not Unique! ", err);
    }).spread(function(user, created){
      if(!created) {
        res.render("signup", {messages: "Username already exists"});
      }
      else{
        res.render("login");
      }
    });
  }
  });
module.exports = routes;

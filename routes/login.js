const routes = require('express').Router();
const models = require('../models');

//Show login page
routes.get("/", function(req, res){
  res.render("login");
});

//Login to Gabble
routes.post('/login',function(req, res){
  let errors = "",
      errorMsgs = [];

  req.checkBody("username", "Please Enter a valid username.").notEmpty();
  req.checkBody("username", "Password must be atleast 5 characters.").isLength({min: 5, max: 20});
  req.checkBody("password", "Please Enter a Password.").notEmpty();
  req.checkBody("username", "Invalid password and username combination.").equals(req.body.username);
  req.checkBody("password", "Invalid password and username combination.").equals(req.body.password);

  errors = req.validationErrors();
  if(errors) {
    errors.forEach(function(error){
    errorMsgs.push(error.msg);
  });
  console.log("There are errors: "+errorMsgs);
  res.render("login", {errors: errorMsgs});
  }
  else {
    models.user.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }})
    .then(function(user){
          req.session.username = user.username;
          req.session.userid = user.id;
          req.session.firstname = user.firstname;
          req.session.lastname = user.lastname;
          console.log("All is fine!")
          res.redirect("/index");

     });
   }
});
module.exports = routes;

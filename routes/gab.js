const routes = require('express').Router();
const models = require('../models');

 routes.get("/newgab", function(req, res){
  res.render("newgab", {firstname: req.session.firstname});
});
// create a new gab
routes.post("/newgab", function(req, res){
  let errors = "";
  req.checkBody("newgab", "Enter gab and submit").notEmpty();
  req.getValidationResult().then(function(errors) {
    if(errors.isEmpty()){
        models.message.create({
          messages: req.body.newgab,
          userid: req.session.userid
        }).then(function(gab) {
        res.redirect("/index");
        });
      }
      else {
          console.log("errors");
          res.render("newgab",  {messages: errors.array(),
                                firstname: req.session.firstname});
      }
  });
});

module.exports = routes;

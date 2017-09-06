const routes = require('express').Router();
const models = require('../models');

 routes.get("/newgab", function(req, res){
  res.render("newgab", {firstname: req.session.firstname
  });
});
// create a new gab
routes.post("/newgab", function(req, res){
  console.log("Id of user that is logged in "+req.session.id);
  console.log("Username of user that is logged in "+ req.session.username);
  models.message.create({title:req.body.gabtitle, message: req.body.newgab, userid:req.session.userid})
  .then(function(message){
      res.redirect("/index");
  })
});

module.exports = routes;

// Task.create({ title: 'foo', description: 'bar', deadline: new Date() }).then(task => {
//   // you can now access the newly created task via the variable task
// })

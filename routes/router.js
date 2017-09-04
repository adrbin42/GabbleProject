const express = require('express');
const router = express.Router();
const models = require('../models');
const session = require('express-session');

// models.message.findOne().then(function(message){
//   console.log(message);
// })

router.use(session({
  secret:'winnerswin',
  resave: false,
  saveUninitialized: false
}));


//Render app home page
router.get('/', function(req,res){
  if(req.session.username){
    models.message.findAll({where:{userid:req.session.id}}).then(function(message){
      include:[
        {
          model:models.user,
          as:'usermessage'
        }
      ]
      res.render("index",
      {
        user:usermessage.username,
        messages:models.message.message,
        msgscreated:models.message.createdAt
      });
    })

  }else{
    res.redirect("/login");
  }
});

router.get('/login', function(req,res){
  res.render('login');
});

router.post('/login', function(req,res){
  models.user.findOne({where:{username:req.body.username}}).then(function(user) {

    let errorMsgs = [];

    req.checkBody("username", "Please Enter a valid username.").notEmpty().isLength({min: 5, max: 20});
    req.checkBody("password", "Please Enter a Password.").notEmpty();
    req.checkBody("username", "Invalid password and username combination.").equals(user.username);
    req.checkBody("password", "Invalid password and username combination.").equals(user.password);

    let errors = req.getValidationResult();
      if (errors) {
        errors.forEach(function(error) {
          errorMsgs.push(error.msg);
    });
        res.render("login", {errors: errorMsgs});
      } else {
        req.session.username = models.user.username;
        req.session.id = models.user.id;
        req.session.firstname = models.user.firstname;
        req.session.lastname = models.user.lastname;
        req.session.createdat = models.user.createdAt;
        res.redirect("/");
        }
      })//end promise for finding a user



    });

router.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect('/');
});

router.get('/signup',function(req,res){
  res.render('signup');
});

router.post('/signup',function(req,res,next){
  const user = models.user.build({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password
  });

  user.save().then(function(newUser){
    console.log(newUser);
    res.render("login");
  });

});

router.get('/newgab', function(req,res){
  res.render('newgab',{user:req.session.username,userid:req.session.id});
});

router.post('/newgab', function(req,res){
  if(req.session.username){
    const newgab = models.message.build({
      message:req.body.msgBox,
      userid:req.session.id
    });
    newgab.save().then(function(newGab){
      console.log(newGab);
      req.session.newmsg = req.body.msgBox;
      res.render('index',
      {user:req.session.username,
      newmessage:req.session.newmsg}
      );
    });
  }else{
    res.render('login');
  }
});

router.post('/likes', function(req,res){
  let counter = 0;
  counter++;
  req.session.counter = counter;
  res.render('index',{user:req.session.username,counter:req.session.counter});
});

// router.post('/msg/delete/:id', function(req,res){

//   models.message.destroy({where:{id:req.params.msgid}).then(function(message){
//   res.render('index',{message});
//   console.log('show all message on home page');
//   });
//
// });

module.exports = router;

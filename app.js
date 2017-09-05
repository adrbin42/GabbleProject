const fs = require('fs');
const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const morgan = require("morgan");
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const gabRoutes = require("./routes/gab");
const homeRoutes = require("./routes/home");
const likeRoutes = require("./routes/like");
const logoutRoutes = require("./routes/logout");
const session = require('express-session');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.use('/static', express.static('static'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(morgan('dev'))

app.use(session({
  secret: 'winnerswin',
  resave: false,
  saveUninitialized: false
}));

app.use(signupRoutes);
app.use(loginRoutes);
app.use(gabRoutes);
app.use(homeRoutes);
app.use(likeRoutes);
app.use(logoutRoutes);

app.listen(3100, function(){
  console.log('App running on http://localhost:3100');
});

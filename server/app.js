//Standard Node.js/Express.js imports
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');

//Session management imports
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//Auth purposes
const passport = require('passport');
const passportAuth = require("./authentication/passportAuth");

//DB connection imports
const db = require('./database/connection');

//Environment file
require('dotenv').config();

//Establish database connection
db.dbConnection();

//Routers
var authRouter = require('./routes/auth');
var spotifyRouter = require('./routes/spotify');

//Express app
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Basic security
app.use(helmet());

//Session management
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, //one day
  }
}));

//Configure passport authentication
passportAuth.initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/spotify', spotifyRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
});

module.exports = app;

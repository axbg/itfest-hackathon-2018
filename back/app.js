var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let model = require('./models');
let uploader = require('express-fileupload');
let session = require('client-sessions');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(uploader());
app.use('/public', express.static('public'))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315dfergewegsdggsdf35234235235323125sdfwemgro8',
  duration: 432000000, //5 days cookie
  activeDuration: 172800000, //2 days renewal
  httpOnly: true,
  ephemeral: false,
  secure: false
}));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send("nothin' here bruh");
});

model.sequelize.sync();

//create a general error handler

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;

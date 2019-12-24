var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

const stickers = require('./api/sticker');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/v1/stickers', stickers);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('not Found');
  err.status = 404,
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
 
  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;

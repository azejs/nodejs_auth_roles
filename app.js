const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
 
const User = require('./models/user');
const app = express();
require('./database/db');
require("dotenv").config({
  path: path.join(__dirname, "./.env")
 });
 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(usersRouter);
 
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
const PORT = process.env.PORT || 3000;
// error handler
// connectDB();
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 3000);
  res.render('error');
});

 
app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});

module.exports = app;

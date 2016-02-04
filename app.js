var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var db = require('./db/knex.js');
var session = require('express-session');
var passconfig = require('./config/passport.js')

// require('./config/passport')(passport); // pass passport for configuration

var routes = require('./routes/index');
var users = require('./routes/users');
var builder = require('./routes/builder');
var authorization = require('./routes/authorization')
var poses = require('./routes/poses')
var api = require('./routes/api')
var sequences = require('./routes/sequences')
var favorites = require('./routes/favorites')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser());
app.use(session({ secret: 'secret secret' })); // session secret
app.use(passport.initialize())
app.use(passport.session()); // persistent login sessions
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
    next()
  }
  else{
    res.redirect('/auth')
  }
}


app.use('/', routes);
app.use('/users', checkAuthentication)
app.use('/users', users)
app.use('/auth', authorization)
app.use('/poses', poses)
app.use('/api', api)

//Paths for users
app.use('/users', users);
app.use('/users', builder);
app.use('/users', sequences);
app.use('/users', favorites);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

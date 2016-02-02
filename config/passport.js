var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var knex = require('../db/knex.js')
var bcrypt = require('bcrypt')

function users() {
  return knex('users')
}

passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback : true,
},
  // 3 parts to LocalStrategy authentication


  // 1. Is username good?
  // 2. Is password good?
  // 3. Put user object into req.user
  function(username, password, done) {
    users().select().where(username, username).then(function(results){
      if(!results) {
        console.log(results);
        return done(err,false, req.flash('username', "Cannot find username"))
      }
      if(!bcrypt.compareSync(password , results.password)) {
        return done(null, false, req.flash('password-message', "Cannot find password"))
      }
      return done(null, results)

    })
  }
));


passport.serializeUser(function(user, done) {
 // later this will be where you selectively send to the browser an identifier for your user,
 // like their primary key from the database, or their ID from linkedin
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  //here is where you will go to the database and get the user each time from it's id, after you set up your db
  done(null, user)
});

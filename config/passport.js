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
  function(req, username, password, done) {
    users().select().where('usernamed', username).first()
      .then(function(results){
      if(!results) {
        return done(err,false)
        console.log("hit");
      }
      if(!bcrypt.compareSync(password , results.password)) {
        return done(null, false)
      }
      // logged in
      return done(null, results)

    })
      .catch(function(err){
        console.log('hitttttttttt');
        return done(null, false);
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

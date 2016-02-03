var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var knex = require('../db/knex.js')
var bcrypt = require('bcrypt')

function Users() {
  return knex('users')
}

// passport.use('google', new GoogleStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/callback",
//     profileFields: ['id', 'displayName', 'photos', 'email']
//   },
//   function(accessToken, refreshToken, profile, done) {
//
//     console.log("Google Auth Done");
//     return done(null, profile);
//   }
// ));

passport.use('facebook', new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {

    console.log("Facebook Auth Done");
    return done(null, profile);
  }
));






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
    Users().select().where('username', username).first()
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
        return done(null, false);
    })
  }
));


passport.serializeUser(function(user, done) {
 // later this will be where you selectively send to the browser an identifier for your user,
 // like their primary key from the database, or their ID from linkedin
 // console.log(user._json.picture.data.url);

  done(null, user);
});

passport.deserializeUser(function(user, done) {
  if (user._json.picture.data.url) {
    done(null, user)
  }
  else {
  Users().select().where('id', user.id).first().then(function(results){
    // console.log("DB RESULTS ", results);

    done(null, results)
  });
}
  //here is where you will go to the database and get the user each time from it's id, after you set up your db
});

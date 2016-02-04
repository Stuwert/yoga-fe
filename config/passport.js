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
}, function(req, username, password, done) {
  // 3 parts to LocalStrategy authentication

  // 1. Is username good?
  // 2. Is password good?
  // 3. Put user object into req.user
  Users()
    .select()
    .where('username', username)
    .first()
    .then(function(results){
      if(!results) {
        console.log("LOGIN: no such username");
        return done(err,false);
      }
      if(!bcrypt.compareSync(password , results.password)) {
        console.log("LOGIN: password does not match");
        return done(null, false)
      }
      console.log("LOGIN: successful");
      return done(null, results);
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
  if (user._json) {
    // console.log('Facebook Name', user._json.name);
    // console.log("Facebook Id", user._json.id);
    // console.log("Facebook Picture", user._json.picture.data.url);
    // console.log("Facebook Email", user._json.email);
    var named = user._json.name
    var name = named.split(' ')
    var insertedObject = {
      first_name: name[0],
      last_name: name[1],
      email: user._json.email,
      fb_id: user._json.id,
      image: user._json.picture.data.url
}


    Users().select().where('fb_id', user._json.id ).then(function(results){
      if(results.length == 0) {
        Users().insert(insertedObject).then(function(inserted){
        return done(null, user)
        })
      }


      return done(null, results)
    })
  }

  else {
  Users().select().where('id', user.id).first().then(function(results){

    return done(null, results)
  });
}
  //here is where you will go to the database and get the user each time from it's id, after you set up your db
});

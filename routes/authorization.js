var express = require('express');
var router = express.Router();
var bcrypt   = require('bcrypt');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash')
var passconfig = require('../config/passport')
var knex = require('../db/knex.js')
/* GET home page. */


function users() {
  return knex('users')
}

router.get('/', function(req, res, next) {

  res.render('auth/signupLanding')

});
router.get('/login', function(req, res, next) {

  res.render('auth/login')

});

// router.post('/login',
// passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/auth/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/profile');
//     });
//   })(req, res, next);
// // });

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/auth/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/profile/' + user.username);
    });
  })(req, res, next);
});


router.get('/facebook',
  passport.authenticate('facebook', {authType: 'rerequest', scope: ['user_friends', 'manage_pages'], failureRedirect: '/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/facebook/callback', function(req,res,next){;
  res.redirect('/')
})



router.get('/signup', function(req,res,next) {

  res.render('auth/signup')
})

router.post('/signup', function(req,res,next){


// Need to create a req.user


/* Function to compare B.crypt
var p = bcrypt.compareSync(req.body.password , hash)
*/
var pass = req.body.password
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(req.body.password, salt);


var insertObj = {
  first_name: req.body.firstName,
  last_name: req.body.lastName,
  email: req.body.email,
  username: req.body.username,
  password: hash
}
users().insert(insertObj).then(function(results){


// Redirect user to their profile page
  res.redirect('/users/profile')
});
})


router.get('/logout', function(req,res,next){
  req.logout()
  res.render('auth/logout')
})



module.exports = router;

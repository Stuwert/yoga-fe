var express = require('express');
var router = express.Router();
var bcrypt   = require('bcrypt');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var passconfig = require('../config/passport')
var knex = require('../db/knex.js')
/* GET home page. */


function Users() {
  return knex('users')
}

router.get('/', function(req,res,next){
  res.redirect('/auth/login')
})

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
    if (err) 
      return next(err);
    if (!user) 
      return res.redirect('/auth/login');

    req.logIn(user, function(err) {
      if (err) 
        return next(err);
      console.log('logging in user ' + user.id);
      return res.redirect('/users/profile/' + user.id);
    });

  })(req, res, next);
});


router.get('/facebook', passport.authenticate('facebook'), function(req,res,next){
  res.redirect('/auth')
});

// router.get('/home', function(req, res, next){
//   res.send("You did it!")
//   //req.query.option would equal 'my-cool-option'
//   // var usersName = localStorage.getItem('name').replace(/['"]+/g, '');
//   // var originalUrl = localStorage.getItem('photo');
//   // var url = originalUrl.replace(/['"]+/g, '');
// });


router.get('/facebook/callback',
    passport.authenticate('facebook', {
        // successRedirect : '/users/profile/hello',
        failureRedirect : '/'
    }), function(req,res,next){
      console.log("HITTERED*****",req.user)
      // console.log('Facebook Name', user._json.name);
      // console.log("Facebook Id", user._json.id);
      // console.log("Facebook Picture", user._json.picture.data.url);
      // console.log("Facebook Email", user._json.email);
      res.redirect('/')
    });
//  function(req,res,next){;
//   res.redirect('/')
// })


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
console.log('Bing Bong');
Users().insert(insertObj).then(function(results){


// Redirect user to their profile page
  res.redirect('/users/profile/' + req.body.username)
});
})


router.get('/logout', function(req,res,next){
  console.log("Hittted");
  req.logout()
  req.user = null
  req.session = null
  res.redirect('/')
})



module.exports = router;

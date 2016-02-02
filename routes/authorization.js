var express = require('express');
var router = express.Router();
var bcrypt   = require('bcrypt');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash')
var passconfig = require('../config/passport.js')
var knex = require('../db/knex.js')
/* GET home page. */


function users() {
  return knex('users')
}

router.get('/login', function(req, res, next) {
  res.render('auth/login')
});

router.post('/login', /*passport.authenticate('local', {  failureRedirect: '/'}),*/ function(req, res, next){
  res.redirect('/users/' + req.body.username)
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

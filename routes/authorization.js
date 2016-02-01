var express = require('express');
var router = express.Router();
var bcrypt   = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('auth/signupLanding')

});
router.get('/login', function(req, res, next) {

  res.render('auth/login')

});

router.post('/login', function(req,res,next){
  passport.use()
  res.redirect('/users/profile')
})


router.get('/signup', function(req,res,next) {
  res.render('auth/signup')
})

router.post('/signup', function(req,res,next){
  var pass = req.body.password


// Hashes password
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(req.body.password, salt);

// Need to create a req.user


/* Function to compare B.crypt
var p = bcrypt.compareSync(req.body.password , hash)
*/


// Redirect user to their profile page
  res.redirect('/users/profile')
})


router.get('/logout', function(req,res,next){
  req.logout()
  res.render('auth/logout')
})

router.post('/login', function(req,res,next){
  if(req.body.login) {
    console.log('login');
  }
  if(req.body.signup) {
    console.log('signup');
  }
})



module.exports = router;

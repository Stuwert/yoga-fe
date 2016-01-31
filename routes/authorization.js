var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('auth/login')

});

router.get('/signup', function(req,res,next) {
  res.render('auth/signup')
})


router.get('/logout', function(req,res,next){
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

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.send('This will be the login page');

});

router.get('/signup', function(req,res,next) {
  res.send('Signup Page')
})


router.get('/logout', function(req,res,next){
  res.send("This will be the logout page")
})



module.exports = router;

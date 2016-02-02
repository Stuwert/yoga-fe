var express = require('express');
var router = express.Router();

/* GET users listing. */
<<<<<<< HEAD
router.get('/:id', function(req, res, next) {
  res.render('user/index')
=======
router.get('/profile', function(req, res, next) {
  res.render('users/profile', {user: req.user})
>>>>>>> 4e6f9b2ee950b4b4605c51198580f18164dac687
});





module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/profile', function(req, res, next) {
  res.render('users/profile', {user: req.user})
});





module.exports = router;

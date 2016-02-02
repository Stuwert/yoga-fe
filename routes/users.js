var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  console.log("Bing Bong");
  res.render('user/index')
});





module.exports = router;

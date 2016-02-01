var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  res.send("this will be the profile page")
});





module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:username', function(req, res, next) {
  res.render('user/index', )
});

//This will need to have a knex call in here to pull up the user information.  Also some authentication to validate it.



module.exports = router;

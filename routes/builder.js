var express = require('express');
var router = express.Router();

var results = require('../tmp/results')

/* GET home page. */
router.get('/:user_id/builder/new', function(req, res, next) {
  res.render('builder', {results: results.results});
});

module.exports = router;

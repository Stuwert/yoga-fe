var express = require('express');
var router = express.Router();

var results = require('../tmp/results')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('builder', {results: results.results});
});

module.exports = router;

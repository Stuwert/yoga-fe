var express = require('express');
var unirest = require('unirest');
var router = express.Router();

var poses = require('../tmp/results').results;

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  res.render('poses/pose', {pose: poses[0]})
});





module.exports = router;

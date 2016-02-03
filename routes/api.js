var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var results = require('../tmp/results')

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Gets all sequences favorited by the user.
router.get('/:username/favorites', function(req, res, next){

})

//Gets one unique sequence favorited by user.
router.get('/:username/favorites/:id', function(req, res, next){

})

//Gets all routes the user has created
router.get('/:username/sequences/', function(req, res, next){
  res.send(results.results);
})

//Gets one route the user has created
router.get('/:username/sequences/:id', function(req, res, next){

})

module.exports = router;

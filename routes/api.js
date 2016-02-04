var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../lib/db_favorites');

var results = require('../tmp/results')

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Gets all sequences favorited by the user.
router.get('/:user_id/favorites', function(req, res, next){
  db.get_user_favorites(req.params.uid, function(result){
    res.send(result)
  })
})

router.post('/derp', function(req, res, next){
  console.log(req.body.sequence);
})

//Gets one unique sequence favorited by user.
router.get('/:user_id/favorites/:id', function(req, res, next){

})

//Gets all routes the user has created
router.get('/:user_id/sequences/', function(req, res, next){
  res.send(results.results);
})

//Gets one route the user has created
router.get('/:user_id/sequences/:sequence_id', function(req, res, next){

})

module.exports = router;

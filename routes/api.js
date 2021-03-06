var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../lib/db_favorites');

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

//Gets one unique sequence favorited by user.
router.get('/:user_id/favorites/:id', function(req, res, next){

})

//Gets all routes the user has created
router.get('/:user_id/sequences/', function(req, res, next){
  db.get_user_sequences(req.params.uid, function(result){
    res.send(result);
  })
})

//Gets one route the user has created
router.get('/:user_id/sequences/:sequence_id', function(req, res, next){

})

module.exports = router;

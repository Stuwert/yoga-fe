var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../lib/db_favorites');

router.get('/:uid/favorites', function(req, res, next){
  db.get_user_favorites(req.params.uid, function(result){
    res.render('user/favorites', {
      user: req.params.uid,
      favorites: result
    });
  });
})

module.exports = router;

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../lib/db_favorites');

router.get('/:user_id/favorites', function(req, res, next){
  db.get_user_favorites(req.params.user_id, function(result){
    res.render('user/favorites', {
      user: req.params.user_id,
      favorites: result
    });
  });
})

module.exports = router;

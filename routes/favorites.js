var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var db = require('../lib/db_favorites');

// router.get('/:user_id/favorites', function(req, res, next){
//   db.get_user_favorites(req.params.user_id, function(result){
//     res.render('user/favorites', {
//       user: req.params.user_id,
//       favorites: result
//     });
//   });
// })

router.post('/:user_id/favorites', function(req, res, next){
  var obj = {
    user_id : req.params.user_id,
    user_sequence_id : req.body.sequence_id
  }
  db.addFavorite(obj, function(){
    res.redirect('/users/' + req.params.user_id  + '/profile')
  })
})

module.exports = router;

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var passport = require('passport')
var multer  =   require('multer');
var capitalize = require('../lib/capitalize');
var db = require('../lib/db_user');
var helper_data = require('../serverlogic/serverlogic');
var states = helper_data.states;
var styles = helper_data.yogaStyles;

function Sequences(){
  return knex('user_sequences');
}

function Users(){
  return knex('users');
}

function Favorites(){
  return knex('user_favorites')
}

router.get('/:user_id', function(req, res, next){
  res.redirect('/users/' + req.params.user_id + '/profile');
});

// READ user page //
router.get('/:user_id/profile', function(req, res, next) {
  Users().where('id', req.params.user_id).first().then(function(user){
    Sequences().where('user_id', req.params.user_id).then(function(sequences){
      Favorites().where('user_favorites.user_id', req.params.user_id).leftJoin('user_sequences','user_favorites.user_sequence_id', 'user_sequences.id').then(function(favorites){
        console.log(favorites);
          res.render('user/index', {
            user: user,
            sequences: sequences,
            capitalize: capitalize,
            favorites: favorites
          })
      })
    })
  });
});

// GET edit form //
router.get('/:user_id/profile/edit', function(req, res, next){
  db.getUser(req.params.user_id, function(result){
    res.render('user/edit',{
      user: result,
      states: states,
      styles: styles,
      capitalize: capitalize
    });
  });
});

// UPDATE user //
router.post('/:user_id', function(req, res, next){
  var update_object = {};
  update_object['id'] = req.params.user_id;
  for (var k in req.body) {
    if( req.body[k].length )
      update_object[k] = req.body[k];
  }

  db.updateUser(update_object, function(result){
    res.redirect('/users/'+req.params.user_id);
  });
});

module.exports = router;

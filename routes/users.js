var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var passport = require('passport')
var multer  =   require('multer');
var capitalize = require('../lib/capitalize');

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


module.exports = router;
